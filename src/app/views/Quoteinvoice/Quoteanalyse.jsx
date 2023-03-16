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
  Link,
  Icon,
  TextField,
  Tooltip
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
import url from "../invoice/InvoiceService";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// expandable table
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select';
import Axios from "axios";
import Swal from "sweetalert2";
import { Breadcrumb, ConfirmationDialog } from "matx";
import FormDialog from "./Addmargin";
import MemberEditorDialog from "./Addmargin";
import moment from "moment";
import { sortedLastIndex } from "lodash";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  invoiceEditor: {
    "& h5": {
      fontSize: 15,
    },
  },
  root: {
    width: "100px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(initialValues);
  const [rfq, setrfq] = useState([]);
  const [rdate, setrdate] = useState([]);
  const [ddate, setddate] = useState([]);
  const [cname, setcname] = useState('abcd');
  const [party_id, setparty_id] = useState('');
  const [rfq_details, setrfqdetails] = useState([]);
  const [discounts, setdiscounts] = useState('0');
  const [proList, setproList] = useState([]);
  const [ProductList, setProductList] = useState([]);
  const [validity, setvalidity] = useState('3 Days')
  const [payment_terms, setpayment_terms] = useState('100% Advance')
  const [warranty, setwarranty] = useState('NA')
  const [delivery_time, setdelivery_time] = useState('Within 2-3 Days from the Date of PO')
  const [inco_terms, setinco_terms] = useState('DDP-Delivery Duty Paid To Customer Office')
  const [discount, setdiscount] = useState('0')
  const [contactid, setcontactid] = useState('')
  const [dstatus, setdstatus] = useState(false);
  const [price, setprice] = useState(0);
  const [pprice, setpprice] = useState(0);
  const [marginprice, setmarginprice] = useState(0);
  const [productid, setproductid] = useState('1');
  const [indexset, setindex] = useState(0);
  const [productname, setproductname] = useState('');

  let calculateAmount = [];
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);

  const handleChange = (event, fieldName) => {
    // setState({ ...state, ['discount']:event.target.value });
    event.persist();

    // discount=subTotalCost-parseFloat(event.target.value * subTotalCost/100);
    // vat= ((discount * 15) / 100).toFixed(2);
    // GTotal=discount + vat;


    // setState({ ...state, ['fieldname']:event.target.value });
    let tempItemList = [...state.item];
    setdstatus(true)
    setdiscount(event.target.value)
    setdiscounts(event.target.value)

    // setState({ ...state, ['vat']: vat });
    // setState({ ...state, ['net_amount']: GTotal });
    // setdstatus(true)



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
  const setremark = (event, index) => {
    event.persist()
    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {
        element[event.target.name] = event.target.value;



      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });


  }

  const handleIvoiceListChange = (event, index) => {
    event.persist()
    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {

        // element['purchase_price']=price;
        element['sell_price'] = parseFloat((event.target.value * element.purchase_price / 100) + parseFloat(element['purchase_price'])).toFixed(2);
        element['total_amount'] = ((element['sell_price']) * element.quantity_required).toFixed(2);
        element[event.target.name] = event.target.value;



      }
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
      quotedescription: "",
      qtotal: "",
      qprice: "",
      margin: "",
      remark: ""
    });
    setState({
      ...state,
      item: tempItemList,
    });
  };

  const deleteItemFromInvoiceList = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Delete this Quotation Details!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let tempItemList = [...state.item];
        tempItemList.splice(index, 1);

        setState({
          ...state,
          item: tempItemList,
        });
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Quotation Details is safe :)',
          'error'
        )
      }
    })
  };

  const handleDateChange = (rdate) => {
    setState({
      rdate: date
    });
  };
  const calcualteprice = (pprice, marginprice) => {
    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (indexset === i) {

        element['purchase_price'] = pprice;
        element['sell_price'] = parseFloat((marginprice * pprice / 100) + parseFloat(element['purchase_price'])).toFixed(2);
        element['total_amount'] = ((element['sell_price']) * element.quantity_required).toFixed(2);
        element['margin'] = marginprice;
        element['name'] = pprice;



      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });

    // setprice(parseInt(event.target.value))
  }
  const priceset = (a, b, c) => {
    url.get("parties/" + c).then(({ data }) => {
      setproList(data[0].contacts);

    });
    alert(c)
  };
  const expandData = (id) => {

    var filtered = proList.filter(a => a.id == id);

    setProductList(filtered)

  };
  const calcualtep = (event, index) => {
    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {


        element['purchase_price'] = event.target.value;



      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }

  const handleSubmit = () => {

    // setState({ ...state, ['subTotalCost']: subTotalCost });
    setState({ ...state, loading: true });

    let tempState = { ...state };
    let arr = []
    delete tempState.loading;
    let tempItemList = [...state.item];

    // arr.push({
    // Quotedetails:tempItemList,
    // });
    arr.quotation_details = tempItemList
    arr.discount_in_p = discount
    arr.total_value = parseFloat(subTotalCost).toFixed(2)
    arr.net_amount = GTotal
    arr.vat_in_value = parseFloat(vat).toFixed(2)
    arr.rfq_id = id
    arr.po_number = id
    arr.party_id = party_id
    arr.validity = validity
    arr.warranty = warranty
    arr.delivery_time = delivery_time
    arr.inco_terms = inco_terms
    arr.payment_terms = payment_terms
    arr.contact_id = contactid
    const json = Object.assign({}, arr);

    url.post('quotation', json)
      .then(function (response) {


        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        });
        // routerHistory.push("/product/viewproduct")
        window.location.href = "../quoateview"
      })
      .catch(function (error) {

      })
  };
  const routerHistory = useHistory();

  function cancelform() {
    routerHistory.push("/quoateview")
  }

  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);

  };

  useEffect(() => {

    url.get("products").then(({ data }) => {
      setproList(data)
      // setState({
      //     ...state,
      //     item: data,
      //   }); 
    });
    url.get("rfq/" + id).then(({ data }) => {

      setcname(data[0].party[0].firm_name)
      setcontactid(data[0].contact.id)
      setrdate(moment(data[0].created_at).format('DD MMM YYYY'))
      setddate(moment(data[0].require_date).format('DD MMM YYYY'))
      setparty_id(data[0].party_id)
      setState({
        ...state,
        item: data[0].rfq_details,
      });
    });
  }, [id, isNewInvoice, isAlive, generateRandomId]);


  const setMargin = (id, index, name) => {

    setproductid(id)
    setproductname(name)
    setindex(index)
    setShouldOpenEditorDialog(true);

  }
  let subTotalCost = 0;
  let GTotal = 0;
  let dis_per = 0;
  let {
    orderNo,
    net_amount,
    buyer,
    seller,
    item: invoiceItemList = [],
    quote: quoteList = [],
    status,
    vat,
    date,
    currency,
    loading,
    margin,
    remark

  } = state;

  return (

    <div className="m-sm-30">
      <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
        <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
          <div className="viewer_actions px-4 flex justify-between">
            <div className="mb-6">
              <h3 align="left"> Create Quotation</h3>
            </div>
            <div className="mb-6">

              <Button
                className="mr-4 py-2"
                variant="outlined"
                color="secondary"
                onClick={cancelform}
              >
                <Icon>cancel</Icon> Cancel
              </Button>


              <Button
                type="submit"
                className="py-2"
                variant="outlined"
                color="primary"
                disabled={loading}
              >
                <Icon>save</Icon> Save & Print Quotation
              </Button>
            </div>
          </div>

          <div className="viewer__order-info px-4 mb-4 flex justify-between">
            <div>
              <h5 className="font-normal capitalize">
                <strong>RFQ ID: </strong>{" "}
                <span>
                  {id}
                </span>
              </h5>

              <h5 className="font-normal capitalize">
                <strong>Company Name: </strong>{" "}
                <span>
                  {cname}
                </span>
              </h5>


            </div>
            <div>


              <div className="text-right">
                <h5 className="font-normal">
                  <strong>RFQ Date: </strong>
                  <span>
                    {rdate}
                  </span>
                </h5>
                <h5 className="font-normal">
                  <strong>Bid Closing Date: </strong>
                  <span>
                    {ddate}
                  </span>
                </h5>
              </div>

            </div>
          </div>

          <Divider />

          <Table className="mb-4">
            <TableHead>
              <TableRow className="bg-default">
                <TableCell className="pl-sm-24" style={{ width: 50 }} align="left">S.No.</TableCell>
                <TableCell className="px-0" style={{ width: '180px' }}>Rfq description</TableCell>
                <TableCell className="px-0" style={{ width: '180px' }}>Our Description</TableCell>
                <TableCell className="px-0" style={{ width: '80px' }}>Quantity</TableCell>
                <TableCell className="px-0" style={{ width: '100px' }}>Pprice</TableCell>
                <TableCell className="px-0" style={{ width: '100px' }}>Margin %</TableCell>
                <TableCell className="px-0" style={{ width: '80px' }}>Sprice</TableCell>
                <TableCell className="px-0" style={{ width: '80px' }}>Total</TableCell>
                <TableCell className="px-0" style={{ width: '180px' }}>Remark</TableCell>
                <TableCell className="px-0">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoiceItemList.map((item, index) => {

                if (!dstatus) {
                  subTotalCost += parseFloat(item.total_amount)
                  vat = ((subTotalCost * 15) / 100).toFixed(2)
                  GTotal = (subTotalCost + (subTotalCost * 15) / 100).toFixed(2)
                }
                else {

                  subTotalCost += parseFloat(item.total_amount)
                  dis_per = parseFloat(discounts * subTotalCost / 100).toFixed(2)
                  // discount=subTotalCost-parseFloat(discounts * subTotalCost/100);
                  vat = (((subTotalCost - parseFloat(discounts * subTotalCost / 100)) * 15) / 100).toFixed(2)
                  GTotal = ((subTotalCost - parseFloat(discounts * subTotalCost / 100)) + parseFloat(vat)).toFixed(2);
                }
                // vat= (discount * 15) / 100
                // GTotal=item.discount + item.vat;

                return (
                  <TableRow key={index}>


                    <TableCell className="pl-sm-24 capitalize" align="left" style={{ width: 50 }}>
                      {index + 1}

                    </TableCell>



                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '180px' }}>
                      <TextValidator
                        label="description"
                        // onChange={(event) => handleIvoiceListChange(event, index)}
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
                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '180px' }}>
                      <TextValidator
                        label="Our description"
                        // onChange={(event) => handleIvoiceListChange(event, index)}
                        type="text"

                        variant="outlined"
                        size="small"
                        name="quotedescription"
                        fullWidth
                        value={item ? item.product[0].description : null}

                      />
                    </TableCell>
                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                      <TextValidator
                        label="Quantity"
                        // onChange={(event) => handleIvoiceListChange(event, index)}
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth

                        name="quantity_requried"
                        value={item ? item.quantity_required : null}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </TableCell>
                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                      <TextValidator
                        label="Unit Price"
                        variant="outlined"
                        onChange={(event) => calcualtep(event, index)}
                        type="text"
                        name="name"
                        size="small"

                        fullWidth
                        value={item.purchase_price ? item.purchase_price : ""}
                        select


                      >
                        {item.product[0].product_price.map((item) => (
                          <MenuItem value={item.price} key={item.id}>
                            {item.price}-{item.party.firm_name}
                          </MenuItem>
                        ))}
                      </TextValidator>

                    </TableCell>



                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                      <TextValidator
                        label="Margin"
                        onChange={(event) => handleIvoiceListChange(event, index)}
                        // onBlur={(event) => handleIvoiceListChange(event, index)}
                        type="text"
                        variant="outlined"
                        size="small"
                        name="margin"
                        style={{ width: '75%', float: 'left' }}
                        fullWidth
                        value={item.margin ? item.margin : ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}

                      />
                      <Tooltip title="Reference">
                        <Icon aria-label="expand row" size="small" style={{ width: '25%', float: 'left', cursor: 'pointer' }} onClick={() => {
                          setMargin(item.product_id, index, item.product[0].name);
                        }}>
                          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </Icon>
                      </Tooltip>

                    </TableCell>
                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                      <TextValidator
                        label="price"
                        // onChange={(event) => handleIvoiceListChange(event, index)}
                        type="text"

                        variant="outlined"
                        size="small"

                        name="sell_price"

                        value={item.sell_price ? item.sell_price : ""}

                      />
                    </TableCell>
                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                      <TextValidator
                        label="QTotal"

                        // onChange={(event) => handleIvoiceListChange(event, index)}
                        type="text"
                        variant="outlined"
                        size="small"

                        name="total_amount"

                        value={item.total_amount ? item.total_amount : ""}

                      />
                    </TableCell>
                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                      <TextValidator
                        label="Remark"
                        onChange={(event) => setremark(event, index)}
                        // onBlur={(event) => handleIvoiceListChange(event, index)}
                        type="text"
                        variant="outlined"
                        size="small"
                        name="remark"
                        style={{ width: '75%', float: 'left' }}
                        fullWidth
                        value={item.remark ? item.remark : ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}

                      />

                    </TableCell>
                    <TableCell className="pl-0 capitalize" align="left" style={{ width: '50px' }}>

                      <Icon color="error" fontSize="small" onClick={() => deleteItemFromInvoiceList(index)}>
                        delete
                      </Icon>

                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <h6><strong>Terms</strong></h6>
          <div className="px-4 flex justify-between">
            <div className="flex">

              <div className="pr-12">



                <p className="mb-8">Quotation Validity:</p>
                <p className="mb-8">Payment Terms:</p>
                <p className="mb-8">Warranty:</p>
                <p className="mb-8">Delivery Time:</p>
                <p className="mb-8">Inco-Term:</p>
              </div>
              <div>
                <TextValidator
                  label="Quotation Validity"
                  className="mb-4"
                  type="text"
                  variant="outlined"
                  size="small"
                  style={{ width: 500 }}
                  onChange={e => setvalidity(e.target.value)
                  }
                  value={validity}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  label="Payment Terms"
                  className="mb-4"
                  onChange={e => setpayment_terms(e.target.value)
                  }
                  type="text"
                  style={{ width: 500 }}
                  variant="outlined"
                  size="small"
                  name="net_amount"
                  value={payment_terms}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  label="Warranty"
                  onChange={e => setwarranty(e.target.value)
                  }
                  className="mb-4"
                  type="text"
                  variant="outlined"
                  size="small"
                  name="net_amount"
                  style={{ width: 500 }}
                  value={warranty}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  label="Delivery Time"
                  className="mb-4"
                  onChange={e => setdelivery_time(e.target.value)
                  }
                  type="text"
                  variant="outlined"
                  size="small"
                  style={{ width: 500 }}
                  name="net_amount"
                  value={delivery_time}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  label="Inco-Term"
                  onChange={e => setinco_terms(e.target.value)
                  }
                  type="text"
                  className="mb-4"
                  variant="outlined"
                  size="small"
                  name="net_amount"
                  style={{ width: 500 }}
                  value={inco_terms}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </div>

            </div>
            <div className="px-4 flex justify-end">
              <div className="flex " >
                <div className="pr-12">
                  <p className="mb-8">Sub Total:</p>
                  <p className="mb-8">Discount:</p>
                  <p className="mb-8">VAT(15%):</p>
                  {/* <p className="mb-5">currency:</p> */}
                  <strong>
                    <p className="mb-8">Grand Total:</p>
                  </strong>
                </div>
                <div>

                  <p className="mb-4">{subTotalCost ? subTotalCost.toFixed(2) : '0.00'}</p>
                  <div>
                    <TextField
                      className="mb-4 mr-2"
                      label="Discount %"
                      type="text"
                      variant="outlined"
                      size="small"
                      style={{ width: '90px' }}
                      onChange={(event) => handleChange(event, "discount")}
                      value={discount}
                    // style={{width:50}}
                    // validators={["required"]}
                    // errorMessages={["this field is required"]}
                    />


                    <TextField
                      className="mb-4 ml-2"
                      label="Discount"
                      type="text"
                      variant="outlined"
                      size="small"
                      name="dis_per"
                      style={{ width: '90px' }}
                      // onChange={(event) => handleChange(event, "discount")}
                      value={discount ? dis_per : 0.00}
                    // validators={["required"]}
                    // errorMessages={["this field is required"]}
                    />
                  </div>

                  <TextValidator
                    className="mb-4 "
                    label="VAT"
                    // onChange={handleChange}
                    type="text"
                    variant="outlined"
                    size="small"
                    name="vat"
                    value={subTotalCost ? vat : 0}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    label="Grand Total"
                    onChange={handleChange}
                    type="text"
                    className="mb-4"
                    variant="outlined"
                    size="small"
                    name="net_amount"
                    value={subTotalCost ? GTotal : 0.00}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />


                </div>
              </div>
            </div>
          </div>
        </ValidatorForm>
      </div>

      {shouldOpenEditorDialog && (
        <MemberEditorDialog
          handleClose={handleDialogClose}
          open={shouldOpenEditorDialog}
          productid={productid}
          margin={margin}
          marginprice={setmarginprice}
          pprice={setpprice}
          calcualteprice={calcualteprice}
          productname={productname}

        />
      )}
      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}

          text="Are you sure to delete?"
        />
      )}
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
  // discount:"",
  date: new Date(),
  currency: "",
  loading: false,
};

export default InvoiceEditor;
