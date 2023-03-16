import React, { useState, useEffect } from "react";
import useDynamicRefs from 'use-dynamic-refs';
import UOMDialog from '../invoice/UOMDialog';

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
  Checkbox,
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
import url, { getInvoiceById, addInvoice, getUnitOfMeasure, updateInvoice, getCustomerList, ApiKey, navigatePath, data } from "../invoice/InvoiceService";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import axios from "axios";
import { getVendorList, capitalize_arr, divisionId ,basePath} from "../invoice/InvoiceService";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// expandable table
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Pdff from './po.png'
// import Select from 'react-select';
import Axios from "axios";
import Swal from "sweetalert2";
import { Breadcrumb, ConfirmationDialog } from "matx";
import FormDialog from "../product/productprice";
import MemberEditorDialog from "../product/productprice";
import FormDialog_product from "../../views/product/Addproduct_popup"
import MemberEditorDialog_product from "../../views/product/Addproduct_popup";
import moment from "moment";
import { sortedLastIndex } from "lodash";
import ListSubheader from '@material-ui/core/ListSubheader';
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import useAuth from 'app/hooks/useAuth';

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


// const data = [
//   {
//     value: "TONNES",
//     label: "TON-TONNES"
//   },
//   {
//     value: "TUBES",
//     label: "TUB-TUBES"
//   },
//   {
//     value: "UNITS",
//     label: "UNT-UNITS"
//   },

//   {
//     value: "YARDS",
//     label: "YDS-YARDS"
//   },
//   {
//     value: "SETS",
//     label: "SET-SETS"
//   },
//   {
//     value: "SQUARE FEET",
//     label: "SQF-SQUARE FEET"
//   },
//   {
//     value: "KILOGRAM",
//     label: "KG-KILOGRAM"
//   },
//   {
//     value: "SQUARE YARDS",
//     label: "SQY-SQUARE YARDS"
//   },
//   {
//     value: "THOUSANDS",
//     label: "THD-THOUSANDS"
//   },

//   {
//     value: "KILOLITER",
//     label: "KLR-KILOLITER"
//   },
//   {
//     value: "KILOMETER",
//     label: "KME-KILOMETER"
//   },
//   {
//     value: "MILLILITER",
//     label: "MLT-MILLILITER"
//   },
//   {
//     value: "METERS",
//     label: "MTR-METERS"
//   },
//   {
//     value: "NUMBERS",
//     label: "NOS-NUMBERS"
//   },
//   {
//     value: "PACKS",
//     label: "PAC-PACKS"
//   },
//   {
//     value: "PIECES",
//     label: "PCS-PIECES"
//   },
//   {
//     value: "PAIRS",
//     label: "PAIRS"
//   },
//   {
//     value: "QUINTAL",
//     label: "QTL-QUINTAL"
//   },
//   {
//     value: "ROLLS",
//     label: "ROLLS"
//   },
//   {
//     value: "CENTIMETER",
//     label: "CENTIMETER"
//   },
//   {
//     value: "CARTONS",
//     label: "CTN-CARTONS"
//   },
//   {
//     value: "DOZEN",
//     label: "DOZ-DOZEN"
//   },
//   {
//     value: "DRUM",
//     label: "DRM-DRUM"
//   },
//   {
//     value: "GRAMS",
//     label: "GRAMS"
//   },

//   {
//     value: "GROSS",
//     label: "GRS-GROSS"
//   },

// ];
const filter = createFilterOptions();
const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
  const { user } = useAuth();
  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(initialValues);
  const [rfq, setrfq] = useState([]);
  const [rdate, setrdate] = useState([]);
  const [ddate, setddate] = useState([]);
  const [cname, setcname] = useState('');
  const [party_id, setparty_id] = useState('');
  const [submitStatus, setsubmitStatus] = useState('');
  const [rfq_details, setrfqdetails] = useState([]);
  const [Cond, setCond] = useState([]);
  const [discounts, setdiscounts] = useState('0');
  const [proList, setproList] = useState([]);
  const [proListAll, setproListAll] = useState([]);
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
  const [contactname, setcontactname] = useState("");
  const [companybank, setcompanybank] = useState([]);
  const [bank_id, setbank_id] = useState("");
  const [PriceList, setPriceList] = useState([]);
  const [rfqstatus, setrfqstatus] = useState(false);
  const [pricestatus, setpricestatus] = useState(false);
  const [ponumber, setponumber] = useState('');
  const [fstatus, setfstatus] = useState(-1);
  let calculateAmount = [];
  const routerHistory = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [checked, setchecked] = useState(false);
  const [checked1, setchecked1] = useState(true);
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
  const [vatExclude,setVatExclude] = useState(false);
  const [vatExclude2,setVatExclude2] = useState(false);


  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);
  const [catid, setcatid] = useState('')
  const [srcfile, setsrcfile] = useState("");
  const [fileurl, setfileurl] = useState('')
  const [productprice, setproductprice] = useState([])
  const [fileType, setFileType] = useState('');
  const [fileType2, setFileType2] = useState('');
  const fType = ["jpg", "png", "peg"];
  const formData = new FormData()
  const handleChanges = (event, newValue, index) => {

    const price = PriceList?.filter(el => el.product_id === newValue?.id);

    let tempItemList = [...state.item];
    if (!newValue) {
      setproList(proListAll?.filter(obj => obj?.name?.toLowerCase()?.includes(event.target.value?.toLowerCase())))

    }
    tempItemList.map((element, i) => {
      let sum = 0;


      if (index === i) {


        element['product'] = newValue?.id ? newValue?.name : newValue ? newValue : event.target.value
        element['description'] = newValue?.id ? newValue?.name : newValue ? newValue : event.target.value
        element['product_id'] = newValue?.id ? newValue?.id : null
        element['product_price_list'] = price ? price : null
        element['arabic_description'] = null



      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });


  };


  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    // if (params.inputValue !== "") {
    filtered.push({
      inputValue: params.inputValue,
      name: `Add "${params.inputValue}"`
    });
    // }
    return filtered;
  };



  const filterProduct = (options, params) => {


    const filtered = filter(options, params);

    const { inputValue } = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.name);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        inputValue: params.inputValue,
        name: `Add "${inputValue}"`,
      });
    }

    return filtered;
  };

const handleClicks2 = () => {
    window.open(basePath + opofile2);
  };
  const filterPrice = (options, params) => {
    const filtered = filter(options, params);

    // if (params.inputValue == "") {
    filtered.push({
      inputValue: params.inputValue,
      price: params.inputValue,
      amount: params.inputValue
    });
    // }
    return filtered;
  };

  const handleFileSelect2 = (event, f) => {
    let files = event.target.files[0];
    const filename = URL.createObjectURL(event.target.files[0]);
    // console.log(filename);
    setfileurl(filename);
    setsrcfile(files)

    if (filename) {
      // console.log("fillll",files?.type)
      var type = files?.type.slice(-3);
      type = type.toLowerCase();

      setFileType2(type);
    }
   








  };

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
  const calculatemargin = (event, index, value) => {
    let tempItemList = [...state.item];
    let d_val = value ? (value !== null ? value : 0) : (event.target.value ? event.target.value : 0);

    tempItemList.map((element, i) => {
      let sum = 0;



      if (index == i) {
        element['sell_price'] = value
        if (parseInt(element.purchase_price) !== 0) {

          element['margin'] = ((parseFloat(d_val) - parseFloat(element.purchase_price)) / parseFloat(element.purchase_price)) * 100;
          element.margin_val = ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)
          // element.sell_price = d_val?d_val:0.00
          // console.log((parseFloat(event.target.value)-parseFloat(element.purchase_price))/parseFloat(element.purchase_price)*100)
          // element.sell_price=parseFloat((element.margin * parseFloat(element.purchase_price)/100)+parseFloat(element.purchase_price)).toFixed(3)-((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price)/100)+parseFloat(element.purchase_price)).toFixed(3))/100)).toFixed(3));
          // element['discount']=((parseFloat(element.purchase_price)*parseFloat(element.margin))/100)*parseFloat(element.quantity);
          element.total_amount = ((parseFloat(d_val) * element.quantity).toFixed(2));
        }
        else {

          // element['margin']=parseFloat(0.00);
          element.total_amount = ((parseFloat(d_val) * element.quantity).toFixed(2))
          // element.sell_price = d_val?d_val:0.00
        }




      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }

  const addItemToInvoiceList = () => {
    let tempItemList = [...state.item];
    setproList(proListAll)
    tempItemList.push({
      id: 0,
      product_id: "",
      src: '',
      description: "",
      invoice_id: 0,
      descriptions: " ",
      quantity: 0,
      quotation_detail_id: " ",
      product_price_list: [
        {
          price: ""
        }
      ],
      purchase_price: 0.00,
      margin: 0,
      sell_price: parseFloat(0.00).toLocaleString(undefined, {
        minimumFractionDigits: 2
      }),
      remark: "",
      total_amount: parseFloat(0.00).toLocaleString(undefined, {
        minimumFractionDigits: 2
      })

    });
    setState({
      ...state,
      item: tempItemList,
    });
  };

  const deleteItemFromInvoiceList = (index, id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Delete this Invoice Details!',
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
        if (id) {
          // url.delete(`invoice-detail/${id}`).then(data)
        }

      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Invoice Details is safe :)',
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
  const calcualtep = (event, index, newValue, name) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;


      if (index == i) {
        if (parseFloat(element.purchase_price) !== null && !isNaN(element.purchase_price)) {

          // element.sell_price=parseFloat((element.margin * element.purchase_price/100)+parseFloat(element.purchase_price)).toFixed(2);
          // element.total_amount=((element.sell_price)*element.quantity).toFixed(2);
          element[name] = newValue ? (isNaN(newValue) ? 0 : newValue) : (isNaN(event.target.value) ? 0 : event.target.value)
          element.sell_price = parseFloat((element.margin * element.purchase_price / 100) + parseFloat(element.purchase_price)).toFixed(3);
          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);

          // element['id']=null;
        }
        else {
          element[name] = newValue ? newValue : event.target.value

          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);

          // element['id']=null;
        }


      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }

  const calcualte_margin = (event, index, newValue, name) => {


    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;


      if (index == i) {
        if (parseFloat(element?.purchase_price)) {
          // element.sell_price=parseFloat((element.margin * element.purchase_price/100)+parseFloat(element.purchase_price)).toFixed(2);
          // element.total_amount=((element.sell_price)*element.quantity).toFixed(2);
          let dval = newValue ? newValue : event.target.value;

          element[name] = parseFloat(dval)
          element.sell_price = parseFloat((element.margin * element.purchase_price / 100) + parseFloat(element.purchase_price)).toFixed(3);
          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);

          // element['id']=null;
        }
        else {
          element[name] = newValue ? newValue : event.target.value

          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);

          // element['id']=null;
        }


      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }


  const calcualte_qty = (event, index, newValue, name) => {


    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;


      if (index == i) {

        element[name] = newValue ? newValue : event.target.value

        element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);

        // element['id']=null;



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
    let tempItemList = [...state.item];
    //     tempItemList.map((element, i) => {
    //       let sum=0;


    //     Axios.post(`https://translation.googleapis.com/language/translate/v2?key=${ApiKey}&q=${element.description}&target=ar`, {
    //       method: 'POST',
    //       headers: { 
    //         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
    // "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
    // "Access-Control-Max-Age": 86400
    //       },
    //     })
    //       .then(({ data }) => {
    //           element['arabic_description']=data.data.translations[0].translatedText;
    //           // console.log(data.data.translations[0].translatedText);

    //       })
    //       return element;
    //     })


    setState({
      ...state,
      item: tempItemList,
    })
    setState({ ...state, loading: true });

    let tempState = { ...state };
    let arr = []
    delete tempState.loading;


    // arr.push({
    // Quotedetails:tempItemList,
    // });
    ;
    arr.invoice_details = tempItemList
    formData.append('discount_in_p', discount)
    formData.append('total_value', parseFloat(subTotalCost).toFixed(2))
    formData.append('net_amount', GTotal)
    formData.append('vat_in_value', isNaN(parseFloat(vat)) ? 0 :  parseFloat(vat).toFixed(2))
    formData.append('po_number', ponumber)
    formData.append('grand_total', GTotal)
    formData.append('vatExclude', vatExclude ? 1 : 0)
    formData.append('party_id', party_id ? party_id : 0)
    formData.append('validity', validity)
    formData.append('warranty', warranty)
    formData.append('delivery_time', delivery_time)
    formData.append('inco_terms', inco_terms)
    formData.append('payment_terms', payment_terms)
    formData.append("bank_id", parseInt(bank_id))
    formData.append('contact_id', contactid ? contactid : '')
    formData.append('ps_date', Quote_date)
    formData.append('old_date', oldDate)
    formData.append('rfq_id', null)
    formData.append('transaction_type', "sale")
    formData.append('id', id)
    formData.append('div_id', localStorage.getItem('division'))
    formData.append('user_id', user.id)
    formData.append('file', srcfile)
    formData.append('qtid', qtid)
    const json = Object.assign({}, arr);
    // console.log(arr)
    // formData.append('discount_in_p',discount)
    // formData.append('total_value',parseFloat(subTotalCost).toFixed(2))
    // formData.append('net_amount',GTotal)
    // formData.append('vat_in_value',parseFloat(vat).toFixed(2))
    // formData.append('po_number',ponumber)
    // formData.append('party_id',party_id)
    // formData.append('validity',validity)
    // formData.append('warranty',warranty)
    // formData.append('delivery_time',delivery_time)
    // formData.append('inco_terms',inco_terms)
    // formData.append('payment_terms',payment_terms)
    // formData.append('contact_id',contactid)
    // formData.append('ps_date',Quote_date)
    // formData.append('rfq_id',null)
    // formData.append('transaction_type',"sale")
    // console.log(arr)

    // console.log(tempItemList)
    // tempItemList.map((answer, i) => {  
    formData.append(`invoice_details`, JSON.stringify(tempItemList))
    //   answer.files&& (formData.append(`file${i}`,answer.files))
    // })

    // setTimeout(() => { 
    url.post('Invoiceupdate', formData)
      .then(function (response) {

        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            routerHistory.push(navigatePath + "/inv")
          })
        // window.location.href="../quoateview"
      })
      .catch(function (error) {
        Swal.fire({
          title: "Error",
          type: "error",
          icon: "warning",
          text: "Something Went Wrong.",
        }).then((result) => {
          setState({ ...state, loading: false });
        });
      })
    // },5000)
  };
  function cancelform() {
    routerHistory.push(navigatePath + "/inv")
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
      setproList(data.filter(obj => obj.div_id == localStorage.getItem('division')))
    });


  };

  const controlKeyPress = (e, id, nextid, prev,dropdown) => {
    if(e.key === 'Enter' && !dropdown){
      const a = id.split(parseInt(id));
      let i = parseInt(id)
      // const r = ++i + 'product_id';
      // console.log(r)
        try {
          addItemToInvoiceList();
          // if (r.includes('product_id')) {
            inputRef[parseInt(++i)].focus();
            // console.log(i)
          // }
        } catch (error) {
          // console.log(i)
          // console.log('error')
        }
      //  inputRef[parseInt(r)].focus();
    }
    if (e?.keyCode == 39) {
      if (nextid?.includes('product_id')) {
        // if (false) {
        inputRef[parseInt(nextid)].focus();
      } else if (nextid == null) {
        // if (e?.keyCode == 13) {

        // }
      } else {
        getRef(nextid).current.focus();
      }
    } else if (e?.keyCode == 38 && !dropdown) {
      const a = id.split(parseInt(id));
      let i = parseInt(id)
      if (--i >= 0) {
        const r = i + a[1];
        // if (r?.includes('purchase_price')) {
        if (false) {
          priceRef[parseInt(r)].focus();
        } else if (r.includes('product_id')) {
          // } else if (false) {
          inputRef[parseInt(r)].focus();
        } else {
          getRef(r).current.focus();
        }

      }

    } else if (e?.keyCode == 40 && !dropdown) {
      const a = id.split(parseInt(id));
      let i = parseInt(id)
      // if (++i) {
      const r = ++i + a[1];
      try {
        if (r?.includes('product_id')) {
          // if (false) {
          inputRef[parseInt(r)].focus();
          // } else if (r.includes('product_id')) {
        } else if (false) {
          inputRef[parseInt(r)].focus();

          // inputRef.focus();
        } else {
          getRef(r).current.focus();
        }
      } catch (error) {
        // console.error('eror')
        // addItemToInvoiceList(invoiceItemList);
      }

      // }

    } else if (e?.keyCode == 37) {
      if (prev == null) {

      } else {
        if (prev.includes('product_id')) {
          // if (false) {
          inputRef[parseInt(prev)].focus();

          // inputRef.focus();
          // } else if (prev?.includes('purchase_price')) {
        } else if (false) {
          priceRef[parseInt(prev)].focus();
        } else {
          getRef(prev).current.focus();
        }
      }
    }
  }
  const [getRef, setRef] = useDynamicRefs();

  let inputRef = [];
  let priceRef = [];
  const setcontact = (event, newValue) => {


    url.get("parties/" + newValue?.id).then(({ data }) => {
      setcustomercontact(data[0].contacts);

      setparty_id(newValue?.id)
      setcname(newValue?.firm_name)

      setrfqstatus(true);


    });
  }
  const [data, setData] = useState([])
  const [uom, setUOM] = useState(false)
  const [opofile, setopofile] = useState('')
  const [opofile2, setopofile2] = useState('')
  const [qtid, setqtid] = useState('')
  const [oldDate,setOldDate] = useState()
  useEffect(() => {


    url.get(`mjrEditInc/${localStorage.getItem('division')}/${id}`).then(({ data }) => {
      console.log("asasas",data)
      setCond(data?.inv[0]?.vat_in_value)
      if (data?.inv[0]?.quotation?.file) {
        var type = data?.inv[0]?.quotation?.file.slice(17);
      

        setopofile(type)
        setopofile2(data?.inv[0]?.quotation?.file)
      }
      
      setproList(data?.products.filter(obj => obj.div_id == localStorage.getItem('division')))
      setproListAll(data?.products.filter(obj => obj.div_id == localStorage.getItem('division')))
      setData(data?.uom);
      setqtid(data?.inv[0]?.quotation_id)
      setCustomerList(data?.customer)
      setPriceList(data?.productPrice)
      setcompanybank(data?.banks);

        setdiscount(data?.inv[0].discount_in_percentage ? data?.inv[0].discount_in_percentage == null || data?.inv[0].discount_in_percentage == 'null' ? 0 : data?.inv[0].discount_in_percentage : 0);
      setparty_id(data?.inv[0]?.party_id)
      setsubmitStatus(data?.inv[0]?.submit_status)
      setQuote_date(data?.inv[0]?.issue_date)
      // if (data?.inv[0]?.contact_id !== null) {
        let f = data?.inv[4]?.fname ? data?.inv[4]?.fname  : ''
        let l = data?.inv[4]?.lname ?  ' ' +data?.inv[4]?.lname : ''
        f = f + l
        setcontactname(f)

        setcontactid(data?.inv[0]?.contact_id);
        url.get("parties/" + data?.inv[0]?.party_id).then(({ data }) => {
          setcustomercontact(data[0]?.contacts);
          // setcustomercontact(data[0].contacts);

          setrfqstatus(true);
        });
      // }
      // setcontactid(data?.inv[0]?.contact_id)
      setOldDate(data?.inv[0]?.issue_date)
      setVatExclude(parseInt(data?.inv[0]?.exclude_from_vat) == 1 ? true : false)
      setcname(data?.inv[0]?.party?.firm_name)
      setbank_id(parseInt(data?.inv[0]?.bank?.id));

      setrfqstatus(true)
      setcontactid(data?.inv[0]?.contact?.id)
      if (data?.inv[0]?.po_number) {
        setponumber(data?.inv[0]?.po_number)
      }

      setState({
        ...state,
        item: data?.inv[0]?.invoice_detail,
      });

    
    });


    // getUnitOfMeasure().then(({ data }) => {
    //   setData(data);
    // });
    // getCustomerList().then(({ data }) => {
    //   setCustomerList(data);


    // });


    // url.get("products").then(({ data }) => {
    //   setproList(data.filter(obj => obj.div_id == localStorage.getItem('division')))
    //   setproListAll(data.filter(obj => obj.div_id == localStorage.getItem('division')))


    //   // setState({
    //   //     ...state,
    //   //     item: data,
    //   //   }); 

    // });
    // url.get("invoice/" + id).then(({ data }) => {
    //   // setproList(data)
    //   setdiscount(data[0].discount_in_percentage);
    //   setparty_id(data[0]?.party_id)
    //   setcname(data[0]?.party?.firm_name)

    //   setrfqstatus(true)
    //   setcontactid(data[0]?.contact?.id)
    //   if (data[0]?.po_number) {
    //     setponumber(data[0]?.po_number)
    //   }

    //   setState({
    //     ...state,
    //     item: data[0]?.invoice_detail,
    //   });

    // });
    // url.get("product-price").then(({ data }) => {
    //   setPriceList(data)


    //   // setState({
    //   //     ...state,
    //   //     item: data,
    //   //   }); 

    // });

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
  const setProductdescription = (event, index, id, newValue) => {

    //   if(newValue!=="false")
    //   {
    //   url.get("products/" + event.target.value).then(({ data }) => {
    //       let tempItemList = [...state.item];
    //       data.prices.map((element, i) => {

    //       })
    //       setProductList1(data.prices)



    //   tempItemList.map((element, i) => {
    //     let sum=0;

    //     if (index === i) 
    //     {
    //       element['id']=null;
    //       element['product_id']= event.target.value;
    //       element['description']= data.product[0].description;

    //       if(element.product_price_list.length>=1)
    //       {



    //           element.product_price_list.splice(id, element.product_price_list.length);

    //           data.prices.map((v, i) => {

    //             element.product_price_list.push({
    //               price:v.price,
    //               firm_name:v.firm_name,
    //               id:v.product_id
    //             })

    //           })


    //       }
    //       else{
    //       data.prices.map((v, i) => {

    //         element.product_price_list.push({
    //           price:v.price,
    //           firm_name:v.firm_name,
    //           id:v.product_id
    //         })

    //       })
    //     }
    //       setproductid(id)



    //     }
    //     return element;

    //   });

    //   setState({
    //     ...state,
    //     item: tempItemList,
    //   }); 
    //   })
    // }
    // else
    // {

    //   setshouldOpenEditorDialogproduct(true)
    // }
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
  let GTotal = parseFloat(0.00).toLocaleString(undefined, {
    minimumFractionDigits: 2
  });
  let dis_per = parseFloat(0.00).toLocaleString(undefined, {
    minimumFractionDigits: 2
  });
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
          <ValidatorForm autocomplete="off" onSubmit={e => { e.preventDefault(); }}   onError={(errors) => null}>
            <div className="viewer_actions px-4 flex justify-between">
              <div className="mb-6">
                <h3 align="left"> EDIT SALES INVOICE</h3>
              </div>
              <div className="mb-6">

                <Button
                  className="mr-4 py-2"
                  variant="outlined"
                  color="secondary"
                  onClick={cancelform}
                >
                  <Icon>cancel</Icon> CANCEL
                </Button>
                {vatExclude ? <>
                  <Button
                  className="mr-4 py-2"
                  variant="outlined"
                  color="error"
                  onClick={() => {setVatExclude(false)}}
                >
                  <Icon>check_circle_outline</Icon> VAT EXCLUDED
                </Button>

                </> : <>
                <Button
                  className="mr-4 py-2"
                  variant="outlined"
                  color="primary"
                  onClick={()=>{setVatExclude(true)}}
                >
                  <Icon>error_outline</Icon> EXCLUDE FROM VAT
                </Button>

                </>}

                <Button
                  // type="submit"
                  className="py-2"
                  onClick={() => handleSubmit()}

                  variant="outlined"
                  color="primary"
                  disabled={loading}
                >
                  <Icon>save</Icon> SAVE & PRINT INVOICE
                </Button>
              </div>
            </div>




            <Grid container spacing={2} className="mb-4">
              <Grid item className="ml-4">


                {/* <TextField

label="Customer Name"
style={{ minWidth: 200, maxWidth: '250px' }}
name="party_id"
size="small"
variant="outlined"


onClick={(event) => setcontact(event)}
required
select
>
<MenuItem onClick={() => {
  routerHistory.push("/party/addparty");
}}>

  <Icon>add</Icon>New

</MenuItem>
{CustomerList.map((item) => (
  <MenuItem value={item.id} key={item.id}>
    {item.firm_name}
  </MenuItem>
))}
</TextField> */}
                <Autocomplete
                  id="filter-demo"
                  variant="outlined"
                  options={CustomerList}

                  style={{ width: 350 }}
                  value={cname}
                  getOptionLabel={(option) => option.firm_name ? option.firm_name : cname}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== " ") {
                      filtered.unshift({
                        inputValue: params.inputValue,
                        firm_name: (<Button variant="outlined" color="primary" size="small" onClick={() => routerHistory.push(navigatePath + "/party/addparty")}>+Add New</Button>)
                      });
                    }


                    return filtered;
                  }}
                  onChange={(event, newValue) => setcontact(event, newValue)}
                  size="small"
                  renderInput={(params) => <TextField {...params}
                    variant="outlined" label="Customer Name" />}
                />


              </Grid>
              <Grid item >
                {/*   
  {rfqstatus &&
                  <TextField

                    label="Contact Person"
                    className="ml-2"
                    style={{ minWidth: 200, maxWidth: '250px' }}
                    name="contact_id"
                    size="small"
                    variant="outlined"
                    select
                    
                    onChange={(e) => setcontactid(e.target.value)}

                  >
                    <MenuItem value=" "> <em>None</em></MenuItem>
                    {customercontact.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.fname}
                      </MenuItem>
                    ))}

                  </TextField>
                } */}

{rfqstatus && (
                  <Autocomplete
                    id="filter-demo"
                    variant="outlined"
                    style={{ minWidth: 250, maxWidth: "300px" }}
                    options={customercontact}
                    value={contactname}
                    getOptionLabel={(option) =>
                      option?.fname
                        ? option?.fname
                        : contactname
                        ? contactname
                        : " "
                    }
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      if (params.inputValue !== " ") {
                        filtered.unshift({
                          inputValue: params.inputValue,
                          fname: (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              // onClick={() =>
                              //   // setshouldOpenConfirmationDialogparty(true)
                              // }
                            >
                              +Add New
                            </Button>
                          ),
                        });
                      }

                      return filtered;
                    }}
                    onChange={(event, newValue) => {
                      setcontactid(newValue?.id);
                      setcontactname(newValue?.fname);
                    }}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Contact Person"
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid item>
                {submitStatus !== 'Invoice Submitted' && <>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className=""
                    margin="none"
                    label="Date"
                    format="dd MMMM yyyy"
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
                </>}
                


              </Grid>
              <Grid item xs>
                <TextField

                  label="P.O Number"
                  className=""
                  style={{ minWidth: 200, maxWidth: '250px' }}
                  name="contact_id"
                  size="small"
                  variant="outlined"
                  value={ponumber}
                  onChange={(e) => setponumber(e.target.value)}

                />
              </Grid>
              {/* <Grid item style={{marginLeft:"16px"}}>
              <Select
                        native
                        value={bank_id ? bank_id : 2}
                        defaultValue={bank_id}
                        // onChange={handleChange}
                        onChange={(e) => setbank_id(e.target.value)}
                        size="small"
                        variant="outlined"
                        label="Bank"
                        inputProps={{
                          name: "Bank",
                          id: "outlined-age-native-simple",
                        }}
                      >
                        <option value={0}>--select--</option>
                        {companybank.map((item, ind) => (
                          <option value={item.id}>
                            {item.name}-{item.ac_no}
                          </option>
                        ))}
                      </Select>
                      </Grid> */}

                      <Grid item style={{marginLeft:"16px"}}>
                      <FormControl
            variant="outlined"
            margin={"1"}
            style={{ width: "349px" }}
            sx={{ m: 1, minWidth: 120 }} size="small"
          >
            <InputLabel id="test-select-label">Select Bank</InputLabel>
            <Select
                value={bank_id ? bank_id : 2}
                defaultValue={bank_id}
                // onChange={handleChange}
                onChange={(e) => setbank_id(e.target.value)}
              label="Select Bank" // here is the difference
            >
            {/* <MenuItem value={0}>
              --Select Bank--
            </MenuItem> */}
            {companybank.map((item, ind) => (
              <MenuItem key={1} value={item.id}>
              {item.name}-{item.ac_no}
              </MenuItem>
              ))}
              
            </Select>
          </FormControl>
         
                      </Grid>
                      <Grid item xs>{opofile2 ? <u><a style={{cursor:'pointer'}} onClick={handleClicks2}>{opofile}</a></u> :opofile2 == '' && qtid ?   <label htmlFor="upload-multiple-file">
                  <Button
                    className=""
                    color="primary"
                    component="span"
                    variant="contained"
                  >
                    <div className="flex items-center">
                      <Icon className="pr-8">cloud_upload</Icon>
                      <span>Upload File</span>
                    </div>
                  </Button>
                </label> : ""} <input
                  className="hidden"
                  onChange={(e) => handleFileSelect2(e)}
                  id="upload-multiple-file"
                  type="file"
                  multiple
                /> {fileurl && <img
                  width="50px"
                  height="50px"
                  // className={classes.media}
                  src={fType.includes(fileType2) ? fileurl : Pdff}
                />}</Grid>
            </Grid>

            <Divider />

            <Table className="mb-4">
              <TableHead>
                <TableRow className="bg-default">
                  <TableCell className="pl-sm-24" style={{ width: 20 }} align="left">S.NO.</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }} align="center">ITEM </TableCell>
                  <TableCell className="px-0" style={{ width: '50px' }} align="center">QUANTITY</TableCell>
                  <TableCell className="px-0" width={50} align="center">UOM</TableCell>
                  <TableCell className="px-0" style={{ width: '50px' }} align="center">COST PRICE</TableCell>
                  <TableCell className="px-0" style={{ width: '30px' }} align="center">MARGIN %</TableCell>
                  <TableCell className="px-0" style={{ width: '50px' }} align="center">SELL PRICE</TableCell>
                  <TableCell className="px-0" style={{ width: '50px' }} align="center">TOTAL</TableCell>
                  <TableCell className="px-0" style={{ width: '20px' }}>ACTION</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceItemList.map((item, index) => {
                  {/* console.log("dswsdsd",item) */}


                  if (!dstatus) {
                    if(vatExclude2 == true || Cond == 0){
                      subTotalCost += parseFloat(item.total_amount)
                    {/* vat = ((subTotalCost * 15) / 100).toFixed(2) */}
                    GTotal = (subTotalCost).toFixed(2)
                    }
                    else if(vatExclude2 == false){
                      subTotalCost += isNaN(item?.total_amount) ? 0 : parseFloat(item?.total_amount)
                    dis_per = parseFloat(discount * subTotalCost / 100).toFixed(2)
                    // discount=subTotalCost-parseFloat(discounts * subTotalCost/100);
                    vat = (((subTotalCost - parseFloat(discount * subTotalCost / 100)) * 15) / 100).toFixed(2)
                    GTotal = ((subTotalCost - parseFloat(discount * subTotalCost / 100)) + parseFloat(vat)).toFixed(2);


                    }
                  }
                  else {

                    subTotalCost += parseFloat(item?.total_amount)
                    dis_per = parseFloat(discounts * subTotalCost / 100).toFixed(2)
                    // discount=subTotalCost-parseFloat(discounts * subTotalCost/100);
                    vat = (((subTotalCost - parseFloat(discounts * subTotalCost / 100)) * 15) / 100).toFixed(2)
                    GTotal = ((subTotalCost - parseFloat(discounts * subTotalCost / 100)) + parseFloat(vat)).toFixed(2);
                  }
                  // vat= (discount * 15) / 100
                  // GTotal=item.discount + item.vat;

                  return (
                    <TableRow key={index}>


                      <TableCell className="pl-sm-24 capitalize" align="left" style={{ width: 20 }}>
                        {index + 1}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                        {/* <TextValidator autoComplete="none"
                      label="Item"
                      onChange={(event) => setProductdescription(event, index)}
                      type="text"
                      name="product_id"
                      fullWidth
                      variant="outlined"
                      inputProps={{style: {textTransform: 'capitalize'}}}
                      
                      size="small"
                      value={item.product_id?item.product_id:""}
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
                    </TextValidator> */}

                        <Autocomplete
                          className="w-full"
                          size="small"
                          options={proList ? proList : []}
                          name="product_id"
                          value={item?.description}
                          // filterOptions={filterOptions?filterOptions:[]}
                          // renderOption={option => option.name}

                          onKeyDown={(e) => { controlKeyPress(e, index + 'product_id', index + 'quantity', null,true) }}

                          getOptionLabel={option => {

                            // e.g value selected with enter, right from the input
                            if (typeof option === "string") {
                              return option;
                            }
                            if (option?.inputValue) {
                              return option?.inputValue;
                            }

                            return option?.name ? option?.name : (item?.description ? item?.description : " ");
                          }}
                          freeSolo
                          renderInput={(params) => (
                            <TextField {...params} multiline inputRef={input => {
                              inputRef[index] = input;
                            }}
                              onChange={(event, newValue) => handleChanges(event, newValue, index)}
                              variant="outlined" name="product_id" required fullWidth />
                          )}
                          // onChange={handleChanges}
                          onChange={(event, newValue) => handleChanges(event, newValue, index)}
                        // onInputChange={(event, newValue) => handleChanges(event, newValue, index)}


                        />
                      </TableCell>



                      {/* <TableCell className="pl-0 capitalize" align="left" style={{width:'150px'}}>
                    <TextValidator autoComplete="none"
                      label="description"
                      onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      name="description"
                      fullWidth
                      variant="outlined"
                      inputProps={{style: {textTransform: 'capitalize'}}}
                      
                      size="small"
                      value={item? item.description: null}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </TableCell> */}
                      {/* <TableCell className="pl-0 capitalize" align="left" style={{width:'150px'}}>
                    <TextValidator autoComplete="none"
                      label="Our description"
                      // onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      
                      variant="outlined"
                      size="small"
                      name="quotedescription"
                      inputProps={{style: {textTransform: 'capitalize'}}}
                      fullWidth
                      value={item.descriptionss?item.descriptionss :"" }
              
                    />
                  </TableCell> */}
                      {/* <TableCell className="pl-0 capitalize" align="left" style={{width:'100px'}}>
                    <TextValidator autoComplete="none"
                      label="UOM"
                      // onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                     
                      variant="outlined"
                      size="small"
                      
                      name="sell_price"
                      inputProps={{min: 0, style: { textAlign: 'right' }}}
                      
                    //   value={item.sell_price}
      
                    />
                  </TableCell> */}
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '50px' }}>
                        <TextValidator
                          autoComplete="none"
                          label="Qty"
                          onChange={(event, newValue) => calcualte_qty(event, index, newValue = null, 'quantity')}
                          type="text"
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{ ref: setRef(index + 'quantity'), min: 0, style: { textAlign: 'center' } }}

                          onKeyDown={(e) => { controlKeyPress(e, index + 'quantity', index + 'unit_of_measure', index + 'product_id') }}

                          name="quantity"
                          value={item?.quantity}
                          validators={["isNumber"]}
                          errorMessages={["Invalid Number"]}
                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        <TextField
                          className="mr-2"
                          label="UOM"
                          onChange={(event) => handleIvoiceListChange(event, index)}
                          // onChange={e => setunit_of_measure(e.target.value)}
                          type="text"
                          size="small"
                          value={item?.unit_of_measure}
                          name="unit_of_measure"
                          variant="outlined"
                          onKeyDown={(e) => { controlKeyPress(e, index + 'unit_of_measure', index + 'purchase_price', index + 'quantity',true) }}
                          inputProps={{
                            ref: setRef(index + 'unit_of_measure')
                          }}
                          validators={[
                            "required",
                          ]}
                          fullWidth
                          errorMessages={["this field is required"]}
                          select
                        // validators={["required"]}
                        // errorMessages={["this field is required"]}
                        >
                          <MenuItem onClick={(e) => { setUOM(true) }}><Icon>add</Icon> ADD UOM</MenuItem>

                          {data.sort((a, b) => a.value > b.value ? 1 : -1).map((item, ind) => (
                            <MenuItem value={item.value} key={item}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" >

                        {/* {<><FormControl variant="outlined" className={classes.formControl}>
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
         
          style={{width:150,height:40}}
        >
          <option></option>
          
       
          {item.product_price_list.map((item, id) => (
          <optgroup label={item.firm_name} style={{fontSize:12}}>
            <option value={item.price}>{item.price}</option>
          </optgroup>
          ))}
          
        </Select>
        </FormControl>{item.product_id?(<Tooltip title="add price"><Icon onClick={()=>setproductids(item.product_id,index)}>add</Icon></Tooltip>):''}</>}
                   
                     */}
                        {/* <Autocomplete

                          className="w-full"
                          size="small"
                          options={item?.product_price_list ? item?.product_price_list : []}
                          name="purchase_price"
                          value={item?.purchase_price}
                          filterOptions={filterPrice}
                          renderOption={option => option?.price}
                          getOptionLabel={option => {
                            // e.g value selected with enter, right from the input
                            if (typeof option === "string") {
                              return option;
                            }
                            if (option.inputValue) {
                              return option.inputValue;
                            }
                            return option.price;
                          }}
                          freeSolo
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" name="purchase_price" fullWidth />
                          )}
                          // onKeyUp={(event,newValue) => calcualtep(event, index,newValue,'purchase_price')}
                          onInputChange={(event, newValue) => calcualtep(event, index, newValue, 'purchase_price')}

                        /> */}

                        <CurrencyTextField
                          className="w-full"
                          autoComplete="none"
                          label="Purchase Price"
                          decimalPlaces={3}
                          variant="outlined"
                          fullWidth
                          size="small"
                          onKeyDown={(e) => { controlKeyPress(e, index + 'purchase_price', index + 'margin', index + 'unit_of_measure') }}
                          inputProps={{
                            ref: setRef(index + 'purchase_price')
                          }}
                          name="purchase_price"
                          currencySymbol=""
                          // inputProps={{ min: 0, style: { textAlign: 'center' } }}

                          onChange={(event, newValue) => calcualtep(event, index, newValue, 'purchase_price')}
                          // onChange={(e, value) => calculatemargin(e, index, value)}
                          // value={item.sell_price}
                          value={(isNaN(item?.purchase_price) || item?.purchase_price == null) ? parseFloat(0) : parseFloat(item?.purchase_price)}
                        />





                      </TableCell>


                      <TableCell className="pl-0 capitalize" align="left">
                        <TextValidator autoComplete="none"
                          label="Margin"
                          onChange={(event, newValue) => calcualte_margin(event, index, newValue, 'margin')}
                          // onBlur={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          variant="outlined"
                          inputProps={{ ref: setRef(index + 'margin'), min: 0, style: { textAlign: 'center' } }}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'margin', index + 'sell_price', index + 'purchase_price') }}

                          size="small"
                          name="margin"
                          fullWidth
                          value={isNaN(item?.margin) ? " " : item?.margin}
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

                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '200px' }}>
                        {/* <TextValidator autoComplete="none"
                      label="price"
                      // onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                     
                      variant="outlined"
                      size="small"
                      
                      name="sell_price"
                      inputProps={{min: 0, style: { textAlign: 'right' }}}
                      
                      value={item.sell_price}
      
                    /> */}
                        <CurrencyTextField
                          className="w-full"
                          autoComplete="none"
                          label="Sell Price"
                          decimalPlaces={3}
                          variant="outlined"
                          fullWidth
                          inputProps={{
                            ref: setRef(index + 'sell_price')
                          }}

                          onKeyDown={(e) => { controlKeyPress(e, index + 'sell_price', index + 'total_amount', index + 'margin') }}

                          size="small"
                          currencySymbol=""
                          name="sell_price"
                          onChange={(e, value) => calculatemargin(e, index, value)}
                          value={(item?.sell_price) ? (isNaN(item?.sell_price) ? 0 : item.sell_price) : 0}
                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '150px' }}>
                        {/* <TextValidator autoComplete="none"
                      label="QTotal"
                      
                      // onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      variant="outlined"
                      size="small"
                     
                      name="total_amount"
                      inputProps={{min: 0, style: { textAlign: 'right' }}}
                     
                      value={item.total_amount.toLocaleString(undefined,{
                        minimumFractionDigits:2
                      })}
                      
                    /> */}
                        <CurrencyTextField
                          className="w-full"
                          label="Total"
                          readOnly
                          autoComplete="none"
                          variant="outlined"
                          fullWidth
                          size="small"
                          inputProps={{
                            ref: setRef(index + 'total_amount')
                          }}

                          onKeyDown={(e) => { controlKeyPress(e, index + 'total_amount', null, index + 'sell_price') }}

                          currencySymbol=""
                          name="total_amount"
                          value={isNaN(item.total_amount) ? 0 : item?.total_amount?.toLocaleString(undefined, {
                            minimumFractionDigits: 2
                          })}
                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="center" style={{ width: '5px' }}>

                        <Icon color="error" fontSize="small" onClick={() => deleteItemFromInvoiceList(index, item.id)}>
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


            <div className="px-4 flex justify-between">
              <div className="flex">

                <div className="pr-12">




                </div>
                <div>

                </div>

              </div>

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

                    {/* <p className="mb-4">{subTotalCost ? subTotalCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2
                    }) : '0.00'}</p> */}


                    <CurrencyTextField
                        className="w-full mb-4"
                        label="Sub Total"
                        style={{ width: '250px' }}
                   
                        variant="outlined"
                        fullWidth
                        readOnly
                        size="small"
                        currencySymbol="SAR"
                        value={subTotalCost ? subTotalCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2
                    }) : '0.00'}
                      />
                    <div className="flex">
                      <TextValidator
                        className="mb-4 mr-2"
                        label="Discount %"
                        type="text"
                        variant="outlined"
                        size="small"
                        onChange={(event) => handleChange(event, "discount")}
                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                        value={discount}
                      style={{width:90}}
                      validators={["isNumber"]}
                      errorMessages={["Please Enter Digits Only"]}
                      />


                      {/* <TextField
                className="mb-4 ml-2"
                label="Discount"
                type="text"
                variant="outlined"
                size="small"
                name="dis_per"
                style={{width:'90px'}}
                inputProps={{min: 0, style: { textAlign: 'right' }}}
                // onChange={(event) => handleChange(event, "discount")}
                value={discount?dis_per:0.00}
                // validators={["required"]}
                // errorMessages={["this field is required"]}
              /> */}
                      <CurrencyTextField
                        className="w-full"
                        label="Discount"
                        style={{ width: '150px' }}
                        name="dis_per"
                        readOnly
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol="SAR"
                        value={discount ? dis_per : 0.00}
                      />
                    </div>

                    {/* <TextValidator autoComplete="none"
                className="mb-4 "
                label="Vat"
                // onChange={handleChange}
                type="text"
                variant="outlined"
                size="small"
                name="vat"
                value={subTotalCost?vat:parseFloat(0.00).toLocaleString(undefined,{
                  minimumFractionDigits:2
                })}
                inputProps={{min: 0, style: { textAlign: 'right' }}}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}
                    {/* <TextValidator autoComplete="none"
                label="Grand Total"
                onChange={handleChange}
                type="text"
                className="mb-4"
                variant="outlined"
                size="small"
                name="net_amount"
                value={subTotalCost?GTotal:parseFloat(0.00).toLocaleString(undefined,{
        minimumFractionDigits:2
      })}
                validators={["required"]}
                errorMessages={["this field is required"]}
                inputProps={{min: 0, style: { textAlign: 'right' }}}
              /> */}
                   {vatExclude2 == true ? <>
                    <CurrencyTextField
                      className="w-full mb-4"
                      label="VAT"
                      style={{ width: '250px' }}
                      name="vat"
                      variant="outlined"
                      fullWidth
                      readOnly
                      size="small"
                      currencySymbol="SAR"
                      value={0.00}
                    />
                    </> : <>
                    <CurrencyTextField
                      className="w-full mb-4"
                      label="VAT"
                      style={{ width: '250px' }}
                      name="vat"
                      variant="outlined"
                      fullWidth
                      readOnly
                      size="small"
                      currencySymbol="SAR"
                      value={subTotalCost ? vat : parseFloat(0.00).toLocaleString(undefined, {
                        minimumFractionDigits: 2
                      })}
                    />

                    </>
              }
                    <br />

{vatExclude == true && (
  
                <>
                {vatExclude2 == true ? <>
                  <FormControlLabel
                    control={<Checkbox  />}
                    label="Want To Remove VAT From Total"
                    name="religious_education"
                    value={checked}
                    style={{
                    
                      width: 206,
                      height: 36,
                      fontSize: 20,
                    }}
                    
                    
                    onClick={() => {setVatExclude2(false)}}
                    // checked={values.religious_education || false}
                    // onChange={handleChange}
                  />

                </> : <>
                <FormControlLabel
                    //  control={ <Checkbox  />  }
                    control={Cond ==  0 ? <Checkbox  checked={checked1} /> :<Checkbox  checked={checked} /> }

                    label="Want To Remove VAT From Total"
                    name="religious_education"
                    // value={checked}
                  
                    style={{
                    
                      width: 206,
                      height: 36
                    }}
                    onClick={() => {setVatExclude2(true)}}
                    // checked={values.religious_education || false}
                    // onClick={() => {setVatExclude2(false)}}
                  />

                </>}
                </>
              
                
              )}
                    <div>
                      <CurrencyTextField
                        className="w-full"
                        label="Grand Total"
                        style={{ width: '250px' }}
                        name="net_amount"
                        variant="outlined"
                        fullWidth
                        readOnly
                        size="small"
                        currencySymbol="SAR"
                        value={subTotalCost ? GTotal : parseFloat(0.00).toLocaleString(undefined, {
                          minimumFractionDigits: 2
                        })}
                      />
                    </div>




                  </div>
                </div>
              </div>
            </div>
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
        {shouldOpenEditorDialog && (
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
        {uom && (
          <UOMDialog
            open={uom}
            handleClose={() => { setUOM(false) }}
            setData={setData}
          />
        )}
        {shouldOpenConfirmationDialogproduct && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialogproduct}
            onConfirmDialogClose={handleDialogClose}

            text="Are you sure to delete?"
          />
        )}
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
