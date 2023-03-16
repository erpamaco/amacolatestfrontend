import React, { useState, useEffect } from "react";
import {
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  Divider,
  RadioGroup,
  Grid,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Icon
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getInvoiceById, addInvoice, updateInvoice } from "../invoice/InvoiceService";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import axios from "axios";
import url from "../invoice/InvoiceService"

const useStyles = makeStyles(({ palette, ...theme }) => ({
  invoiceEditor: {
    "& h5": {
      fontSize: 15,
    },
  },
}));

const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(initialValues);
  const [rfq, setrfq] = useState([]);
  const [rdate, setrdate] = useState([]);
  const [ddate, setddate] = useState([]);
  const [cname, setcname] = useState([]);
  const [rfq_details, setrfqdetails] = useState([]);
  const [CustomerList, setCustomerList] = useState([]);

  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSellerBuyerChange = (event, fieldName) => {
    event.persist();
    setState({
      ...state,
      [fieldName]: {
        ...state[fieldName],
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleIvoiceListChange = (event, index) => {
    
    let tempItemList = [...state.item];
    tempItemList.map((element, i) => {
      if (index === i) element[event.target.name] = event.target.value;
      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });
  };

  const addItemToInvoiceList = () => {
    let tempItemList = [...state.item];
    
    tempItemList.push({
      name: "",
      unit: "",
      price: "",
    });
    setState({
      ...state,
      item: tempItemList,
    });
  };

  const deleteItemFromInvoiceList = (index) => {
    let tempItemList = [...state.item];
    tempItemList.splice(index, 1);

    setState({
      ...state,
      item: tempItemList,
    });
  };

  const handleDateChange = (rdate) => {
    setState({
      rdate: date
    } );
  };

  const handleSubmit = () => {
    setState({ ...state, loading: true });
    let tempState = { ...state };
    delete tempState.loading;
    
  };

  useEffect(() => {
    url.get("products").then(({ data }) => {
      setCustomerList(data)
    });
  
    url.get("rfq/"+id).then(({ data }) => {
      setcname(data[0].party[0].fname)
      setrdate(data[0].requested_date)
      setddate(data[0].require_date)
    
     setState({
      ...state,
      item: data[0].rfq_details,
    });
    });
  }, [id, isNewInvoice, isAlive, generateRandomId]);

  

  let subTotalCost = 0;
  let {
    orderNo,
    buyer,
    seller,
    item: invoiceItemList = [],
    status,
    vat,
    date,
    currency,
    loading,
  } = state;

  return (
    <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
      <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
        <div className="viewer_actions px-4 flex justify-end">
          <div className="mb-6">
            <Button
              type="button"
              className="mr-4 py-2"
              variant="text"
              onClick={() => toggleInvoiceEditor()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="py-2"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="viewer__order-info px-4 mb-4 flex justify-between">
          <div>
            <h5 className="mb-2">Customer Name</h5>
            {/* <p className="mb-4">Order Number</p> */}
            <TextValidator
              label="Customer Name."
              type="text"
              size="small"
              variant="outlined"
              fullWidth
              name="cname"
              value={cname}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <h5 className="mb-2">Address</h5>
            <TextValidator
                label="Buyer Address"
                onChange={(event) => handleSellerBuyerChange(event, "buyer")}
                type="text"
                name="address"
                size="small"
                fullWidth
                multiline={true}
                rowsMax={4}
                variant="outlined"
                value={buyer ? buyer.address : null}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
          </div>
          <div>
           
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // id="mui-pickers-date"
                label="Requested Date"
                inputVariant="outlined"
                type="text"
                name="rdate"
                value={rdate}
                size="small"
                fullWidth
                onChange={rdate => setrdate(rdate)} 
                
              />
            </MuiPickersUtilsProvider>
            <div className="text-right">
              <h5 className="font-normal">
                <strong>Due date: </strong>
              </h5>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="none"
                // id="mui-pickers-date"
                label="Due Date"
                inputVariant="outlined"
                type="text"
                autoOk={true}
                variant="outlined"
                value={date}
                size="small"
                fullWidth
                format="MMMM dd, yyyy"
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>

        <Divider />

          <Table className="mb-4">
          <TableHead>
            <TableRow className="bg-default">
              <TableCell className="pl-sm-24">#</TableCell>
              <TableCell className="px-0">Item Name</TableCell>
              <TableCell className="px-0">description</TableCell>
              <TableCell className="px-0">Quantity</TableCell>
              {/* <TableCell className="px-0">Cost</TableCell> */}
              <TableCell className="px-0">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoiceItemList.map((item, index) => {
              subTotalCost += item.price * item.unit;
              
              return (
                <TableRow key={index}>
                  <TableCell className="pl-sm-24 capitalize" align="left">
                    {index + 1}
                  </TableCell>

                  <TableCell className="pl-0 capitalize" align="left">
                    <TextValidator
                      label="Item Name"
                      variant="outlined"
                      size="small"
                      defaultValue={item.description}
                      onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      name="name"
                      fullWidth
                      value={item ? item.name : null}
                      validators={["required"]}
                      select
                      errorMessages={["this field is required"]}
                    >
                       {CustomerList.map((item) => (
                                            <MenuItem value={item.id} key={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                    </TextValidator>
                  </TableCell>

                  <TableCell className="pl-0 capitalize" align="left">
                    <TextValidator
                      label="Item Price"
                      onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      name="description"
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={item ? item.description : null}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </TableCell>

                  <TableCell className="pl-0 capitalize" align="left">
                    <TextValidator
                      label="Item Unit"
                      onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      variant="outlined"
                      size="small"
                      name="quantity_requried"
                      fullWidth
                      value={item ? item.quantity_required : null}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </TableCell>

                  {/* <TableCell className="pl-0 capitalize" align="left">
                    {item.unit * item.price}
                  </TableCell> */}

                  <TableCell className="pl-0 capitalize" align="left">
                    <Button onClick={() => deleteItemFromInvoiceList(index)}>
                    <Icon color="error" fontSize="small">
                        delete
                      </Icon>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex justify-end px-4 mb-4">
          <Button  className="mt-4"
            color="primary"
            variant="contained"
            size="small" onClick={addItemToInvoiceList}>Add Item</Button>
        </div>
      </ValidatorForm>
    </div>
  );
};

const initialValues = {
  id: "",
  orderNo: "",
  buyer: {
    name: "",
    address: "",
  },
  seller: {
    name: "",
    address: "",
  },
  item: [],
  status: "",
  vat: "",
  date: new Date(),
  currency: "",
  loading: false,
};

export default InvoiceEditor;
