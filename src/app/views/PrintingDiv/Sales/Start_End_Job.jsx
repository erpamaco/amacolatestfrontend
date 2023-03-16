import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Divider,
  RadioGroup,
  Grid,
  Dialog,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  Fab,
  TableCell,
  TableBody,
  Link,
  Icon,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import axios from "axios";
import url, {
  getVendorList,
  getInvoiceById,
  addInvoice,
  updateInvoice,
  getCustomerList,
} from "../../invoice/InvoiceService";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// expandable table
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import Select from "react-select";
import Axios from "axios";
import Swal from "sweetalert2";
import { Breadcrumb, ConfirmationDialog } from "matx";
import moment from "moment";
import { sortedLastIndex } from "lodash";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  invoiceEditor: {
    "& h5": {
      fontSize: 15,
    },
  },
  root: {
    width: "100px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const proList = [
  {
    name: "File",
    value: "file",
  },
  {
    name: "Date",
    value: "date",
  },
  {
    name: "Text",
    value: "text",
  },
];
const MemberEditorDialog1 = ({
  uid,
  open,
  handleClose,
  accounttype,
  catid,
  catname,
  setcat,
  jobname,
  jobtime,
}) => {
  const [state, setState] = useState(initialValues);
  const [isAlive, setIsAlive] = useState(true);
  const routerHistory = useHistory();

  const [field, setfield] = useState([]);
  const { id } = useParams();
  const classes = useStyles();
  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);
  const styles = {
    customMaxWidth: {
      maxWidth: "900px", // arbitrary value
    },
  };
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const removeData = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this Field?",
      // text: 'Any products, services, or categories in it will be uncategorised.',
      icon: "warning",
      showCancelButton: true,
      customClass: {
        zIndex: 1000,
      },
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`columns/${id}`).then((res) => {
          getrow();

          Swal.fire("Deleted!", "Field has been deleted.", "success");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass: {
            zIndex: 1000,
          },
          title: "Cancelled",
          // 'Cancelled',
          // 'Your imaginary file is safe :)',
          // 'error',
        });
      }
    });
  };

  function getrow(e) {
    if (catid) {
      setIsAlive(false);
      url.get(`columns/${catid}`).then(function (response) {
        setfield(response.data[0].column);
      });
    }
  }

  const handleSubmit = () => {

    // setState({ ...state, loading: true });

    // let tempState = { ...state };
    // let arr = [];
    // delete tempState.loading;
    // let tempItemList = [...state.item];
    // tempItemList.account_category_id = catid;
    // const json = Object.assign({}, tempItemList);
    // url.post("columns", json).then(({ data }) => {
    //   Swal.fire({
    //     title: "Success",
    //     type: "success",
    //     icon: "success",
    //     text: "Data saved successfully.",
    //   });
    //   handleClose();
    // });
    Swal.fire({
      title: "Success",
      type: "success",
      icon: "success",
      text: "Data saved successfully.",
    });

    handleClose();
    if (jobtime === "StartTime")
      routerHistory.push(`/print_Joborder_tabid/1`);
    else
      routerHistory.push(`/print_Joborder_tabid/2`);
  };
  const addItemToInvoiceList = () => {
    let tempItemList = [...state.item];

    tempItemList.push({
      //   product_id: "",
      //   description:"",
      //   descriptions:"",
      //   quantity:0,
      //   product_price_list:[
      //     {
      //       price:""
      //     }
      //   ],
      //   purchase_price:0.00,
      //   margin:0,
      //   sell_price:0.00,
      //   remark:"",
      //   total_amount:0.00
    });
    setState({
      ...state,
      item: tempItemList,
    });
  };
  const handleIvoiceListChange = (event, index) => {
    event.persist();

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {
        // element['sell_price']=parseFloat((event.target.value * element.purchase_price/100)+parseFloat(element.purchase_price)).toFixed(2);
        // element['total_amount']=((element['sell_price'])*element.quantity_required).toFixed(2);
        element[event.target.name] = event.target.value;
      }
      return element;
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

  useEffect(() => {
    url.get(`columns/${catid}`).then(({ data }) => {
      setfield(data[0].column);
    });
  }, [id, isAlive, generateRandomId]);
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={50}>
              <span style={{ marginLeft: 15 }}>S.No.</span>
            </TableCell>
          );
        },
      },
    },
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={350}>
              <span style={{ marginLeft: 15 }}>Name</span>
            </TableCell>
          );
        },
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton onClick={() => removeData(tableMeta.rowData[2])}>
              <Icon color="error">delete</Icon>
            </IconButton>
          );
        },
      },
    },
  ];

  let subTotalCost = 0;
  let GTotal = 0;
  let dis_per = 0;
  let {
    orderNo,
    net_amount,
    buyer,
    seller,
    item: fieldList = [],
    quote: quoteList = [],
    status,
    vat,
    date,
    currency,
    loading,
    margin,
    remark,
    quantity,
    type,
    name,
  } = state;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className="px-6 pt-2 pb-4"
      style={{ zIndex: 1000 }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <div className="m-sm-30">
        <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
          <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
            <div className="viewer_actions px-4 flex justify-between"></div>

            <h4 className="mb-5">
              {catid && "Field For"} {catname}
            </h4>

            <TextValidator
              className="mb-4 w-full"
              label={jobname}
              // onChange={handleChange}
              type="text"
              name="username"
              variant="outlined"
              // value={username || ""}

              errorMessages={["this field is required"]}
            />

            <TextField
              id="time"
              label={jobtime}
              type="datetime-local"
              defaultValue="07:30"
              fullWidth
              className="mb-4 w-full"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              variant="outlined"
            />

            <div className="flex">
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                onClick={() => handleSubmit}
                className="py-2 mr-4"
              >
                <Icon>save</Icon> Save
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                className="py-2 mr-4"
                onClick={() => handleClose()}
              >
                <Icon>cancel</Icon>Cancel
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className="py-2 mr-4"
                onClick={() => getrow()}
              >
                <Icon>remove_red_eye</Icon>view
              </Button>
            </div>
          </ValidatorForm>

          {!isAlive && (
            <MUIDataTable
              // title={catid &&("Subcategory List")|| (Category  Li)}
              columns={columns}
              data={field.map((item, index) => {
                return [++index, item.name, item.type, item.id];
              })}
              options={{
                filterType: "textField",
                responsive: "simple",
                selectableRows: "none", // set checkbox for each row
                elevation: 0,
                rowsPerPageOptions: [10, 20, 40, 80, 100],
              }}
            />
          )}
          {/* {!isAlive&&(
      <Table className="mb-4">
          <TableHead>
            <TableRow className="bg-default">
              <TableCell className="pl-sm-24" style={{width:70}} align="left">S.No.</TableCell>
              <TableCell className="px-0" style={{width:'200px'}}>Type</TableCell>
              <TableCell className="px-0" style={{width:'200px'}}>Name</TableCell>
        </TableRow>
          </TableHead>
          <TableBody>
            {field.map((item, index) => {
              
              return (
                <TableRow key={index}>
                  
                 
                  <TableCell className="pl-sm-24 capitalize" align="left" style={{width:50}}>
                    {index + 1}
                    
                  </TableCell>
                  <TableCell className="pl-sm-24 capitalize" align="left" style={{width:50}}>
                    {item.type}
                    
                  </TableCell>
                  <TableCell className="pl-sm-24 capitalize" align="left" style={{width:50}}>
                    {item.name}
                    
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left" style={{width:'50px'}}>
               
                        <Icon color="error" fontSize="small" onClick={() => removeData(item.id)}>
                          delete
                      </Icon>
                      
                </TableCell>
                  </TableRow>
              )}
            )}
                  </TableBody>

        </Table>
      )} */}
        </div>
      </div>
    </Dialog>
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

export default MemberEditorDialog1;
