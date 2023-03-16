import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Divider,
  RadioGroup,
  Grid,
  Card,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  InputLabel,
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
import url, { getInvoiceById, addInvoice, updateInvoice, getCustomerList, getVendorList, capitalize_arr } from "../../invoice/InvoiceService";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// expandable table
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
// import Select from 'react-select';
import Axios from "axios";
import Swal from "sweetalert2";
import { Breadcrumb, ConfirmationDialog } from "matx";
// import FormDialog from "../product/productprice";
// import MemberEditorDialog from "../product/productprice";
// import FormDialog_product from "../../views/product/Addproduct_popup"
// import MemberEditorDialog_product from "../../views/product/Addproduct_popup";
import moment from "moment";
import { sortedLastIndex } from "lodash";
import ListSubheader from '@material-ui/core/ListSubheader';
import { Autocomplete } from "@material-ui/lab";

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
  const [ProductList1, setProductList1] = useState([]);
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
  const [productid, setproductid] = useState('');
  const [indexset, setindex] = useState(0);
  const [productname, setproductname] = useState('');
  const [indexvalue, setindexvalue] = useState();
  const [CustomerList, setCustomerList] = useState([]);
  const [customercontact, setcustomercontact] = useState([]);
  const [PriceList, setPriceList] = useState([]);
  const [rfqstatus, setrfqstatus] = useState(false);
  const [pricestatus, setpricestatus] = useState(false);
  const [fstatus, setfstatus] = useState(-1);
  let calculateAmount = [];
  const { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenEditorDialogproduct, setshouldOpenEditorDialogproduct] = useState(false);
  const [Quote_date, setQuote_date] = useState(moment(new Date()).format('DD MMM YYYY'))
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const [
    shouldOpenConfirmationDialogproduct,
    setshouldOpenConfirmationDialogproduct,
  ] = useState(false);

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);
  const [catid, setcatid] = useState('')
  const [productprice, setproductprice] = useState([])
  const formData = new FormData()
  const handleFileSelect = (event, index) => {




    event.persist()

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {

        // element['sell_price']=parseFloat((event.target.value * element.purchase_price/100)+parseFloat(element.purchase_price)).toFixed(2);
        // element['total_amount']=((element['sell_price'])*element.quantity_required).toFixed(2);
        element['src'] = URL.createObjectURL(event.target.files[0]);
        let files = event.target.files[0];
        // formData.append('files',event.target.files[0])



        element[`files`] = event.target.files[0]


        return element;

      }


    });

    setState({
      ...state,
      item: tempItemList,
    });





  };
  const deleteFileSelect = (event, index) => {




    event.persist()

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {

        // element['sell_price']=parseFloat((event.target.value * element.purchase_price/100)+parseFloat(element.purchase_price)).toFixed(2);
        // element['total_amount']=((element['sell_price'])*element.quantity_required).toFixed(2);
        element['src'] = null;
        element[`files`] = null;


        return element;

      }


    });

    setState({
      ...state,
      item: tempItemList,
    });





  };



  const handleChange = (event, fieldName) => {
    // setState({ ...state, ['discount']:event.target.value });
    event.persist();


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

  const addItemToInvoiceList = () => {
    let tempItemList = [...state.item];

    tempItemList.push({
      product_id: "",
      src: '',
      description: "",
      descriptions: "",
      quantity: 0,
      product_price_list: [
        {
          price: ""
        }
      ],
      purchase_price: 0.00,
      margin: 0,
      sell_price: 0.00,
      remark: "",
      total_amount: 0.00

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


        element['sell_price'] = parseFloat((marginprice * pprice / 100) + parseFloat(element['purchase_price'])).toFixed(2);
        element['total_amount'] = ((element['sell_price']) * element.quantity).toFixed(2);
        element['margin'] = marginprice;
        // element['name'] = pprice;

        element['purchase_price'] = pprice;




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

  };
  const expandData = (id) => {

    var filtered = proList.filter(a => a.id == id);

    setProductList(filtered)

  };
  const routerHistory = useHistory();

  const calcualtep = (event, index) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {

        // element.sell_price=parseFloat((element.margin * element.purchase_price/100)+parseFloat(element.purchase_price)).toFixed(2);
        // element.total_amount=((element.sell_price)*element.quantity).toFixed(2);
        element[event.target.name] = event.target.value;
        element.sell_price = parseFloat((element.margin * element.purchase_price / 100) + parseFloat(element.purchase_price)).toFixed(2);
        element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);



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
    arr.po_number = id
    arr.party_id = party_id
    arr.validity = validity
    arr.warranty = warranty
    arr.delivery_time = delivery_time
    arr.inco_terms = inco_terms
    arr.payment_terms = payment_terms
    arr.contact_id = contactid
    arr.ps_date = Quote_date
    arr.rfq_id = null
    arr.transaction_type = "sale"
    const json = Object.assign({}, arr);
    formData.append('discount_in_p', discount)
    formData.append('total_value', parseFloat(subTotalCost).toFixed(2))
    formData.append('net_amount', GTotal)
    formData.append('vat_in_value', parseFloat(vat).toFixed(2))
    formData.append('po_number', id)
    formData.append('party_id', party_id)
    formData.append('validity', validity)
    formData.append('warranty', warranty)
    formData.append('delivery_time', delivery_time)
    formData.append('inco_terms', inco_terms)
    formData.append('payment_terms', payment_terms)
    formData.append('contact_id', contactid)
    formData.append('ps_date', Quote_date)
    formData.append('rfq_id', null)
    formData.append('transaction_type', "sale")
    // JSON.stringify(values.rfq_details)


    tempItemList.map((answer, i) => {
      formData.append(`quotation_detail${i}`, JSON.stringify(answer))
      answer.files && (formData.append(`file${i}`, answer.files))
    })


    url.post('sale-quotation', formData)
      .then(function (response) {


        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            routerHistory.push("/quoateview")
          })
        // window.location.href="../quoateview"
      })
      .catch(function (error) {

      })
  };
  function cancelform() {
    routerHistory.push("/quoateview")
  }

  const handleDialogClose = () => {

    setShouldOpenEditorDialog(false);


    url.get("products/" + catid).then(({ data }) => {
      let tempItemList = [...state.item];
      data.prices.map((element, i) => {

      })
      setProductList1(data.prices)
      tempItemList.map((element, i) => {
        let sum = 0;

        if (indexvalue === i) {

          element['product_id'] = catid;
          element['descriptionss'] = data.product[0].description;





          element.product_price_list.splice(id, element.product_price_list.length);

          data.prices.map((v, i) => {

            element.product_price_list.push({
              price: v.price,
              firm_name: v.firm_name,
              id: v.product_id
            })

          })


        }
        return element
      })
      setState({
        ...state,
        item: tempItemList,
      });


    })



    setshouldOpenEditorDialogproduct(false);
    url.get("products").then(({ data }) => {
      setproList(data)


    });


  };
  const setcontact = (event) => {


    url.get("parties/" + event.target.value).then(({ data }) => {
      setcustomercontact(data[0].contacts);

      setparty_id(event.target.value)

      setrfqstatus(true);


    });
  }

  useEffect(() => {
    getCustomerList().then(({ data }) => {
      setCustomerList(data);


    });


    url.get("products").then(({ data }) => {
      setproList(data)


      // setState({
      //     ...state,
      //     item: data,
      //   }); 

    });

    return setIsAlive(false)


    //     url.get(url+"rfq/"+ id).then(({ data }) => {

    //       setcname(data[0].party[0].firm_name)
    //       setcontactid(data[0].contact.id)
    //       setrdate(moment(data[0].created_at).format('DD MMM YYYY'))
    //       setddate(moment(data[0].require_date).format('DD MMM YYYY'))
    //       setparty_id(data[0].party_id)
    //      setState({
    //       ...state,
    //       item: data[0].rfq_details,
    //     });
    //    });
    let tempItemList = [...state.item];

    tempItemList.push({
      product_id: "",
      description: "",
      descriptions: "",
      files: [],
      quantity: 0,
      product_price_list: [
        {
          price: "",
          firm_name: "",
          id: ""
        }
      ],
      purchase_price: 0.00,
      margin: 0,
      sell_price: 0.00,
      remark: "",
      total_amount: 0.00


    });
    setState({
      ...state,
      item: tempItemList,
    });


  }, [id, isNewInvoice, isAlive, generateRandomId]);


  const setMargin = (id, index, name) => {

    setproductid(id)
    setproductname(name)
    setindex(index)
    setShouldOpenEditorDialog(true);

  }
  const product_popup = () => {
    setshouldOpenConfirmationDialogproduct(true)
  }
  const setProductdescription = (event, index, id) => {
    if (event.target.value !== "false") {
      url.get("products/" + event.target.value).then(({ data }) => {
        let tempItemList = [...state.item];
        data.prices.map((element, i) => {

        })
        setProductList1(data.prices)
        // setProductList1(data.prices)


        tempItemList.map((element, i) => {
          let sum = 0;

          if (index === i) {

            element['product_id'] = event.target.value;
            element['descriptionss'] = data.product[0].description;

            if (element.product_price_list.length >= 1) {



              element.product_price_list.splice(id, element.product_price_list.length);

              data.prices.map((v, i) => {

                element.product_price_list.push({
                  price: v.price,
                  firm_name: v.firm_name,
                  id: v.product_id
                })

              })


            }
            else {
              data.prices.map((v, i) => {

                element.product_price_list.push({
                  price: v.price,
                  firm_name: v.firm_name,
                  id: v.product_id
                })

              })
            }
            setproductid(id)



          }
          return element;

        });

        setState({
          ...state,
          item: tempItemList,
        });
      })
    }
    else {

      setshouldOpenEditorDialogproduct(true)
    }
  }
  const setproductids = (id, index) => {
    setcatid(id)
    setindexvalue(index)
    setShouldOpenEditorDialog(true)
  }
  var cars = [
    { id: 1, model: "CRV", company: "Honda" },
    { id: 2, model: "Accord", company: "Honda" },
    { id: 3, model: "800", company: "Maruti" },
    { id: 4, model: "Civic", company: "Honda" },
    { id: 5, model: "Model S", company: "Tesla" }
  ]

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
    remark,
    quantity

  } = state;

  return (

    <div className="m-sm-30">
      <Card elevation={3}>
        <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
          <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
            <div className="viewer_actions px-4 flex justify-between">
              <div className="mb-6">
                <h3 align="left"> Create Sales Quotation</h3>
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
                  <strong>Customer: </strong>{" "}
                  <span>
                    {id}
                  </span>
                </h5>

                <TextField

                  label="Customer Name"
                  style={{ minWidth: 200, maxWidth: '250px' }}
                  name="party_id"
                  size="small"
                  variant="outlined"

                  // value={values.CustomerList}
                  // onChange={handleChange}
                  onClick={(event) => setcontact(event)}
                  required
                  select
                >
                  <MenuItem onClick={() => {
                    routerHistory.push("/party/addparty");
                  }}>

                    <Icon>add</Icon>New
                    {/* </Button> */}
                  </MenuItem>
                  {CustomerList.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.firm_name}
                    </MenuItem>
                  ))}
                </TextField>





                {rfqstatus &&
                  <TextField

                    label="Contact Person"
                    className="ml-2"
                    style={{ minWidth: 200, maxWidth: '250px' }}
                    name="contact_id"
                    size="small"
                    variant="outlined"
                    select
                    // value={values.contact_id}
                    onChange={(e) => setcontactid(e.target.value)}

                  >

                    {customercontact.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.fname}
                      </MenuItem>
                    ))}

                  </TextField>
                }
              </div>


              <div>


                <div className="text-right pt-4">
                  {/* <h5 className="font-normal">
                <strong>Quote Date: </strong>
              </h5> */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="m-2"
                      margin="none"
                      label="Quote Date"
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      selected={Quote_date}
                      value={Quote_date}
                      onChange={(date) => {
                        setQuote_date(moment(date).format('DD MMM YYYY'))
                        // return date
                      }}
                    />
                  </MuiPickersUtilsProvider>


                </div>

              </div>
            </div>

            <Divider />

            <Table className="mb-4">
              <TableHead>
                <TableRow className="bg-default">
                  <TableCell className="pl-sm-24" style={{ width: 70 }} align="left">S.No.</TableCell>
                  <TableCell className="px-0" style={{ width: '50px' }}></TableCell>
                  <TableCell className="px-0" style={{ width: '150px' }}>Item Name</TableCell>
                  <TableCell className="px-0" style={{ width: '150px' }}>Rfq description</TableCell>
                  <TableCell className="px-0" style={{ width: '150px' }}>Our Description</TableCell>
                  <TableCell className="px-0" style={{ width: '70px' }}>Quantity</TableCell>
                  <TableCell className="px-0" style={{ width: '150px' }}>Price</TableCell>
                  <TableCell className="px-0" style={{ width: '80px' }}>Margin %</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }}>Sell price</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }}>Total</TableCell>
                  <TableCell className="px-0" style={{ width: '140px' }}>Remark</TableCell>
                  <TableCell className="px-0" style={{ width: '50px' }}><Icon>delete</Icon></TableCell>
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
                      <TableCell className="px-0" style={{ width: '150px' }}>
                        {/* <label htmlFor="upload-single-file">
            
              <div className="flex items-center">
                <Icon className="pr-8">cloud_upload</Icon>
         
              </div>
            
          </label>
          <input
            // className="hidden"
            onChange={(event) => handleFileSelect(event,index)}
            id="upload-single-file"
            type="file"
            name="file"
            
          
    
            // value={item.files}
          />
          <img className="w-48" src={item.src} alt="" /> */}
                        {!item.src ? (<Icon
                          variant="contained"
                          component="label"
                          onChange={(event) => handleFileSelect(event, index)}
                        >
                          file_upload
                          <input
                            type="file"
                            hidden
                          />
                        </Icon>)

                          : (<span><Icon color="error" onClick={(event) => deleteFileSelect(event, index)}>close</Icon><img className="w-48" src={item.src} alt="" ></img></span>)}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '150px' }}>
                        <TextValidator
                          label="Item"
                          onChange={(event) => setProductdescription(event, index)}
                          type="text"
                          name="product_id"
                          fullWidth
                          variant="outlined"
                          inputProps={{ style: { textTransform: 'capitalize' } }}

                          size="small"
                          value={item.product_id ? item.product_id : ""}
                          required
                          // validators={["required"]}

                          // errorMessages={["this field is required"]}
                          select
                        >
                          <MenuItem value="false">
                            <Icon>add</Icon>Add New
                          </MenuItem>
                          {proList.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </TextValidator>
                      </TableCell>


                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '150px' }}>
                        <TextValidator
                          label="description"
                          onChange={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          name="description"
                          fullWidth
                          variant="outlined"
                          inputProps={{ style: { textTransform: 'capitalize' } }}

                          size="small"
                          value={item ? item.description : null}
                          validators={["required"]}
                          errorMessages={["this field is required"]}
                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '150px' }}>
                        <TextValidator
                          label="Our description"
                          // onChange={(event) => handleIvoiceListChange(event, index)}
                          type="text"

                          variant="outlined"
                          size="small"
                          name="quotedescription"
                          inputProps={{ style: { textTransform: 'capitalize' } }}
                          fullWidth
                          value={item.descriptionss ? item.descriptionss : ""}

                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '70px' }}>
                        <TextValidator
                          label="Qty"
                          onChange={(event) => calcualtep(event, index)}
                          type="text"
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{ min: 0, style: { textAlign: 'center' } }}

                          name="quantity"
                          value={item.quantity}
                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '250px' }}>
                        {/* <TextField
                      label="Unit Price"
                      variant="outlined"
                      // onChange={(event) => calcualtep(event,index)}
                      onChange={(event) => calcualtep(event, index)}
                      type="text"
                      name="purchase_price"
                      size="small"
                      
                      fullWidth
                     
                      value={item.purchase_price?item.purchase_price:""}
                      select
                   
                      
                    >
                      
                      {item.product_price_list.map((e, key) => (
                        <datalist id="some-list">
                        <option value="first_value">Some Description</option>
                        <option value="another_value">Another Thing Here</option>
                        <option value="first_second_third">More Stuff</option>
                      </datalist>
                      
        
                      ))}
                       
                    </TextField> */}
                        {/* <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel> */}
                        {<><FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel htmlFor="outlined-age-native-simple">Price</InputLabel>
                          <Select
                            native

                            // onChange={handleChange}
                            required
                            onChange={(event) => calcualtep(event, index)}
                            label="Price"
                            inputProps={{
                              name: 'purchase_price',
                              id: 'outlined-age-native-simple',
                              style: { textAlign: 'right' }
                            }}

                            style={{ width: 110, height: 40 }}
                          >
                            <option></option>


                            {item.product_price_list.map((item, id) => (
                              <optgroup label={item.firm_name} style={{ fontSize: 12 }}>
                                <option value={item.price}>{item.price}</option>
                              </optgroup>
                            ))}

                          </Select>
                        </FormControl>{item.product_id ? (<Tooltip title="add price"><Icon onClick={() => setproductids(item.product_id, index)}>add</Icon></Tooltip>) : ''}</>}








                      </TableCell>



                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                        <TextValidator
                          label="Margin"
                          onChange={(event) => calcualtep(event, index)}
                          // onBlur={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          variant="outlined"
                          inputProps={{ min: 0, style: { textAlign: 'center' } }}
                          size="small"
                          name="margin"
                          style={{ width: '75%', float: 'left' }}
                          fullWidth
                          value={item.margin}
                          validators={["required"]}
                          errorMessages={["this field is required"]}

                        />
                        {/* <Tooltip title="Reference">
                  <Icon aria-label="expand row" size="small" style={{width:'25%',float:'left',cursor:'pointer'}} onClick={() => {
                        setMargin(item.product_id,index,item.name);
                      }}>
                   {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Icon>
                </Tooltip> */}

                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                        <TextValidator
                          label="price"
                          // onChange={(event) => handleIvoiceListChange(event, index)}
                          type="text"

                          variant="outlined"
                          size="small"

                          name="sell_price"
                          inputProps={{ min: 0, style: { textAlign: 'right' } }}

                          value={item.sell_price}

                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                        <TextValidator
                          label="QTotal"

                          // onChange={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          variant="outlined"
                          size="small"

                          name="total_amount"
                          inputProps={{ min: 0, style: { textAlign: 'right' } }}

                          value={item.total_amount}

                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '140px' }}>
                        <TextValidator
                          label="Remark"
                          onChange={(event) => setremark(event, index)}
                          // onBlur={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          variant="outlined"
                          size="small"
                          name="remark"

                          fullWidth
                          value={item.remark ? item.remark : ""}


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
            <div className="flex justify-end px-4 mb-4">
              <Button className="mt-4 py-2"
                color="primary"
                variant="contained"
                size="small" onClick={addItemToInvoiceList}><Icon>add</Icon>Add Item</Button>
            </div>

            {/* <h6 className="px-4"><strong>Terms</strong></h6>
        <div className="px-4 flex justify-between">
        <div className="flex">
        
        <div className="pr-12">
        

        
        <p className="mb-8">Quotation Validity:</p>
              <p className="mb-8">payment Terms:</p>
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
                style={{width:500}}
                onChange={e => setvalidity(e.target.value)
                }
                value={validity}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                label="payment Terms"
                className="mb-4"
                onChange={e => setpayment_terms(e.target.value)
                }
                type="text"
                style={{width:500}}
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
                style={{width:500}}
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
                style={{width:500}}
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
                style={{width:500}}
                value={inco_terms}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
          </div>
          
          </div> */}
            <div className="px-4 flex justify-end">
              <div className="flex " >
                <div className="pr-12">
                  <p className="mb-8">Sub Total:</p>
                  <p className="mb-8">Discount:</p>
                  <p className="mb-8">VAT (15%):</p>
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
                      inputProps={{ min: 0, style: { textAlign: 'center' } }}
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
                      inputProps={{ min: 0, style: { textAlign: 'right' } }}
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
                    inputProps={{ min: 0, style: { textAlign: 'right' } }}
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
                    inputProps={{ min: 0, style: { textAlign: 'right' } }}
                  />


                </div>
              </div>
            </div>
            {/* </div> */}
          </ValidatorForm>
        </div>

        {/* {shouldOpenEditorDialog && (
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
        )} */}
        {/* {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            contactid={status}
            open={shouldOpenEditorDialog}
            catid={catid}
            productprice={setproductprice}
          />
        )}
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            text="Are you sure to delete?"
          />
        )}
        {shouldOpenEditorDialogproduct && (
          <MemberEditorDialog_product
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialogproduct}
            
            
          />
        )}
        {shouldOpenConfirmationDialogproduct && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialogproduct}
            onConfirmDialogClose={handleDialogClose}
            
            text="Are you sure to delete?"
          />
        )} */}
      </Card>
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
