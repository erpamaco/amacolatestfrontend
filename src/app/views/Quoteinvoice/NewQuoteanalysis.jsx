import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  Divider,
  Card,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputLabel,
  Icon,
  TextField,
  Tooltip,
  Grid,
  FormGroup,
  IconButton,
  useMediaQuery,
  List,
ListItem,
ListItemIcon,
ListItemSecondaryAction
} from "@material-ui/core";
import useDynamicRefs from 'use-dynamic-refs';

import useSettings from "app/hooks/useSettings";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getCustomerList, navigatePath } from "../invoice/InvoiceService";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import url, { getusers, divisionId, getUnitOfMeasure, data, getcompanybank } from "../invoice/InvoiceService";
import UOMDialog from '../invoice/UOMDialog';

import DragHandleIcon from "@material-ui/icons/DragHandle";
import { arrayMove } from "react-sortable-hoc";
import { Container, Draggable } from "react-smooth-dnd";

// expandable table

// import Select from 'react-select';
import useAuth from 'app/hooks/useAuth';
// import logo from "../../views/invoice/amaco-logo(1).png"
import Swal from "sweetalert2";
import { ConfirmationDialog } from "matx";
// import FormDialog from "../product/productprice";
import MemberEditorDialog from "../product/productprice";
import MemberEditorDialogcontact from "../party/partycontact";

// import FormDialog_product from "../../views/product/Addproduct_popup"
import MemberEditorDialog_product from "../../views/product/Addproduct_popup";
import moment from "moment";
import CurrencyTextField from "@unicef/material-ui-currency-textfield/dist/CurrencyTextField";

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
//     value: "SQUAREYARDS",
//     label: "SQY-SQUAREYARDS"
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
//     value: "KILOMETRE",
//     label: "KME-KILOMETRE"
//   },
//   {
//     value: "MILLILITRE",
//     label: "MLT-MILLILITRE"
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
//     value: "PECIES",
//     label: "PCS-PECIES"
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

const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { settings, updateSettings } = useSettings();
  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(initialValues);
  // const [rfq, setrfq] = useState([]);
  const [testArr, setTestArr] = useState([{ 'note': 'This is a system generated quote and hence does not required any signature.' },{ 'note': 'Quoted prices are for complete lot,any partial order is subject to reconfirmation.' }])
  // const [rdate, setrdate] = useState([]);
  // const [ddate, setddate] = useState([]);
  // const [cname, setcname] = useState('abcd');
  const [party_id, setparty_id] = useState('');
  const [showother2,setShowOther2] =useState('')
  // const [rfq_details, setrfqdetails] = useState([]);
  const [discounts, setdiscounts] = useState('0');
  const [proList, setproList] = useState([]);
  // const [ProductList, setProductList] = useState([]);
  const [ProductList1, setProductList1] = useState([]);
  const [validity, setvalidity] = useState('')
  const [payment_terms, setpayment_terms] = useState('')
  const [warranty, setwarranty] = useState('NA')
  const [delivery_time, setdelivery_time] = useState('Within 2-3 Days from the Date of PO')
  const [inco_terms, setinco_terms] = useState('0')
  const [discount, setdiscount] = useState('0')
  const [contactid, setcontactid] = useState('')
  const [dstatus, setdstatus] = useState(false);
  const [productid, setproductid] = useState('');
  const [indexset, setindex] = useState(0);
  const [productname, setproductname] = useState('');
  const [indexvalue, setindexvalue] = useState();
  const [CustomerList, setCustomerList] = useState([]);
  // const [partyDivision, setpartyDivision] = useState([]);
  const [customercontact, setcustomercontact] = useState([]);
  const [rfqstatus, setrfqstatus] = useState(false);
  const [users, setusers] = useState([]);
  const [sign, setsign] = useState();
  const routerHistory = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenEditorDialogproduct, setshouldOpenEditorDialogproduct] = useState(false);
  const [Quote_date, setQuote_date] = useState(moment(new Date()).format('DD MMM YYYY'))
  const [companybank, setcompanybank] = useState([]);
  const [oinco, setOinco] = useState('')
  const [bank_id, setbank_id] = useState('');
  const [subject, setsubject] = useState('');
  const [subject2, setsubject2] = useState('Thank you for requesting us for the quotation of below mentioned items, please find our best price for the supply of requested items. We look forward for our valued P.O.');
  const [rfq_no, setrfq_no] = useState('');
  const [transport, settransport] = useState('0.00');
  const [other, setother] = useState('0.00');
  const [shouldOpenConfirmationDialogparty, setshouldOpenConfirmationDialogparty] = useState(false);
  const filter = createFilterOptions();
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const [
    shouldOpenConfirmationDialogproduct,
    setshouldOpenConfirmationDialogproduct,
  ] = useState(false);

  const [getRef, setRef] = useDynamicRefs();

  let inputRef = [];
  let priceRef = [];
  const onDrop = ({ removedIndex, addedIndex }) => {
    setTestArr((items) => arrayMove(items, removedIndex, addedIndex));
  };

  const controlKeyPress = (e, id, nextid, prev, invoiceItemList,dropdown) => {
    if(e.key === 'Enter' && !dropdown){
     
      const a = id.split(parseInt(id));
      let i = parseInt(id)
      // const r = ++i + 'product_id';
      // console.log(r)


      // setTimeout(() => 
      // try {
        
      // } catch (error) {
        
      // };
      // , 0);
      
        try {
          addItemToInvoiceList(invoiceItemList);
          // if (r.includes('product_id')) 
            inputRef[parseInt(++i)].focus();
          
        } catch (error) {
         
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
        // if (r?.includes('purchase_price')) {
        if (false) {
          priceRef[parseInt(r)].focus();
        } else if (r.includes('product_id')) {
          // } else if (false) {
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

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);
  const [catid, setcatid] = useState('')
  const [productprice, setproductprice] = useState([]);
  const { user } = useAuth()

  const formData = new FormData();
  const addRow = async e => {
    var obj = {
      // id: 1,
      // start: inputFrom,
      // stop: inputTo
    };

    var data = testArr;
    data.push(obj);

    setTestArr([...data]);
  };
  const noteList = (val, index) => {


    let tempItemList = [...testArr];

    tempItemList.map((element, i) => {


      if (index === i) {


        element['note'] = val


        return element;

      }


    });

    // setState({
    //   ...state,
    //   item: tempItemList,
    // });

    setTestArr([...tempItemList])

  };
  const handleFileSelect = (event, index) => {




    event.persist()

    let tempItemList = [...state.item];
    tempItemList.map((element, i) => {
      if (index === i) {
        element['src'] = URL.createObjectURL(event.target.files[0]);
        let files = event.target.files[0];
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

      if (index === i) {


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
    event.persist();


    let tempItemList = [...state.item];
    setdstatus(true)
    setdiscount(event.target.value)
    setdiscounts(event.target.value)




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


      if (index === i) {


        element[event.target.name] = event.target.value;



      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });



  };


  const addItemToInvoiceList = (arr) => {

    let tempItemList = [...state.item];
    let lastIndex = Object.keys(arr).length - 1;
    let lastIndexarr = lastIndex < 0 ? 0 : tempItemList[lastIndex]?.index1;

    tempItemList.push({
      product_id: "",
      item_name: " ",
      src: '',
      index1: lastIndexarr + 1,
      description: "",
      descriptions: "",
      descriptionss: "",
      quantity: 0,
      unit_of_measure: ' ',
      product_price_list: [
        {
          price: ""
        }
      ],
      purchase_price: 0.00,
      margin: 0,
      margin_val: 0,
      discount_val: 0,
      discount: 0,
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


  const addItemToInvoiceList_Index = (id) => {
    let tempItemList = [...state.item];
    // console.log(tempItemList)
    tempItemList.push({
      product_id: "",
      src: '',
      item_name: "  ",
      index1: id,
      description: "",
      descriptions: "",
      descriptionss: "",
      quantity: 0,
      unit_of_measure: ' ',
      product_price_list: [
        {
          price: ""
        }
      ],
      purchase_price: 0.00,
      margin: 0,
      margin_val: 0,
      discount_val: 0,
      discount: 0,
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


  const deleteItemFromInvoiceList = (index, i) => {
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
        let count = tempItemList.filter(obj => obj.index1 == i).length;
        if (count > 1) {


          tempItemList.splice(index, 1);

          setState({
            ...state,
            item: tempItemList,
          });
        }
        else {
          tempItemList.splice(index, 1);
          let newArr = tempItemList.map((item) => {
            if (item.index1 > i) {
              item['index1'] = item.index1 - 1;
            }
            return item
          })
          setState({
            ...state,
            item: newArr,
          });
        }
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

  const deleteItemFromNoteList = (index) => {
    let tempItemList = [...testArr];
    tempItemList.splice(index, 1);

    setTestArr([...tempItemList])
  }



  const calcualtep = (event, index, value) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index == i) {

        if (parseFloat(element.purchase_price)) {

          element['purchase_price'] = event.target.value ? event.target.value : (event.target.value == null ? 0 : event.target.value);

          element.sell_price = parseFloat(element.purchase_price) ? (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)) ? parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)) : element.purchase_price) : parseFloat(element.purchase_price) * parseFloat(element.quantity);

          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
          element.cost_qty = ((element.purchase_price) * element.quantity).toFixed(2);
          element.margin_val = ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)
          element.discount_val = ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))


        }
        else {


          element['purchase_price'] = event.target.value ? event.target.value : (event.target.value == null ? 0 : event.target.value);
          element['sell_price'] = event.target.value;



          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
          element.cost_qty = ((element.purchase_price) * element.quantity).toFixed(2);
          element.margin_val = ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)
          element.discount_val = ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))



        }


      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }


  const calcualte_qty = (event, index, value) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index == i) {

        if (parseFloat(element.purchase_price)) {

          element[event.target.name] = value ? value : event.target.value;

          element.sell_price = parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)) ? parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)) : element.purchase_price;

          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
          element.cost_qty = ((element.purchase_price) * element.quantity).toFixed(2);
          element.margin_val = ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)

          element.discount_val = element.purchase_price ? ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity)) : (((parseFloat(element.discount) * element.sell_price) / 100) * element.quantity)


        }
        else {
          let m = element.margin ? element.margin : 100
          element['costprice'] = element.purchase_price;

          element[event.target.name] = value ? value : event.target.value;



          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
          element.cost_qty = ((element.costprice) * element.quantity).toFixed(2);
          element.margin_val = element.purchase_price ? ((parseFloat(element.costprice) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity) : element.sell_price * element.quantity;
          element.discount_val = element.purchase_price ? ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.costprice) / 100) + parseFloat(element.costprice)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity)) : (((parseFloat(element.discount) * element.sell_price) / 100) * element.quantity)



        }


      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }

  const discountPer = (event, index, value) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {






        // element['discount'] = !isNaN(parseFloat(value)) ? (parseFloat(value)? 0 :value) : event.target.value;


        // element.sell_price = element.purchase_price?(parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - (parseFloat((element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100)).toFixed(3)) / 100)).toFixed(3)):element.sell_price-((element.discount*element.sell_price)/100);




        // element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
        // element.cost_qty = ((element.purchase_price) * element.quantity).toFixed(2);

        // element.discount_val = element.purchase_price?((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity)):(((element.discount*element.sell_price)/100)*element.quantity)
        const dumy_sellPrice = element.sell_price;
        // element['discount'] = !isNaN(parseFloat(value)) ? (parseFloat(value)? 0 :value) : event.target.value;
        element['discount'] = (isNaN(parseFloat(event.target.value))) ? 0 : parseFloat(event.target.value);


        element.sell_price = (element.purchase_price ? parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - (parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) : element.sell_price - ((element.discount * element.sell_price) / 100));

        element.margin_val = element.purchase_price ? ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity) : dumy_sellPrice * element.quantity



        element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
        element.cost_qty = ((element.purchase_price) * element.quantity).toFixed(2);
        element.discount_val = element.purchase_price ? ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity)) : ((((element.discount * dumy_sellPrice) / 100) * element.quantity))






      }

      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }

  const calculatemargin = (event, index, value) => {

    let tempItemList = [...state.item];
    let d_val = value ? value : event.target.value;
    tempItemList.map((element, i) => {

      let sum = 0;



      if (index == i) {
        // 29-1-2022
        let m = element.margin ? element.margin : 100;
        element['costprice'] = parseFloat(element.purchase_price) ? element.purchase_price : 0
        element['margin'] = parseFloat(element.purchase_price) ? (isNaN((((parseFloat(d_val) - parseFloat(element.costprice)) / parseFloat(element.costprice)) * 100).toFixed(3)) ? 0 : (isFinite((((parseFloat(d_val) - parseFloat(element.costprice)) / parseFloat(element.costprice)) * 100).toFixed(3))) ? (((parseFloat(d_val) - parseFloat(element.costprice)) / parseFloat(element.costprice)) * 100).toFixed(3) : 0) : 100;

        // element.margin_val = element.purchase_price?element.purchase_price:d_val*element.quantity
        element.margin_val = element.purchase_price ? ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity) : d_val * element.quantity

        // console.log((parseFloat(event.target.value)-parseFloat(element.purchase_price))/parseFloat(element.purchase_price)*100)
        // element.sell_price = parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)) ? parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)) : d_val;
        // element['discount']=((parseFloat(element.purchase_price)*parseFloat(element.margin))/100)*parseFloat(element.quantity);
        element.sell_price = d_val
        element.total_amount = ((parseFloat(d_val) * element.quantity).toFixed(2));
        // element.discount_val = ((parseFloat(parseFloat(d_val) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))
        element.discount = 0
        element.discount_val = 0
        // element.discount_val = ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))


      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }

  const calcualte_margin = (event, index, value) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index == i) {

        if (parseFloat(element.purchase_price)) {

          element[event.target.name] = value ? value : event.target.value;

          element.sell_price = (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)) ? parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)) : element.purchase_price);

          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
          element.cost_qty = ((element.purchase_price) * element.quantity).toFixed(2);
          element.margin_val = ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)
          element.discount_val = ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))


        }
        else {

          element['costprice'] = element.sell_price - (100 / (100 + 100) * element.sell_price);
          element[event.target.name] = value ? value : event.target.value;



          element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
          element.cost_qty = ((element.costprice) * element.quantity).toFixed(2);
          element.margin_val = ((parseFloat(element.costprice) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)
          element.discount_val = ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.costprice) / 100) + parseFloat(element.costprice)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))



        }


      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }


  const handleSubmit = (e,s) => {
    if(!validity  && s !== 'draft'){
      Swal.fire({
        title: 'Warning',
        type: 'warning',
        icon: 'warning',
        text: 'Please Enter Quotation Validity',
      })
        .then((result) => {
        
        })
    }else if(!payment_terms && s !== 'draft'){

      Swal.fire({
        title: 'Warning',
        type: 'warning',
        icon: 'warning',
        text: 'Please Enter Payment Terms',
      })
        .then((result) => {
        
        })
    }else if(inco_terms == '0' && s !== 'draft'){

      Swal.fire({
        title: 'Warning',
        type: 'warning',
        icon: 'warning',
        text: 'Please Enter Inco-Term',
      })
        .then((result) => {
        
        })


    }else{
    e.preventDefault();
    let mode = "full"
    updateSidebarMode({ mode })

    setState({ ...state, loading: true });

    let tempState = { ...state };
    let arr = []
    delete tempState.loading;
    let tempItemList = [...state.item];


    arr.quotation_details = tempItemList
    arr.discount_in_p = discount
    arr.total_value = parseFloat(subTotalCost).toFixed(2)
    arr.net_amount = GTotal
    arr.vat_in_value = parseFloat(vat).toFixed(2)
    arr.po_number = id
    arr.party_id = party_id
    arr.validity = validity
    arr.warranty = warranty
    arr.freight = null
    arr.delivery_time = delivery_time
    arr.inco_terms = oinco ? oinco : inco_terms
    arr.payment_terms = payment_terms
    arr.contact_id = contactid
    arr.ps_date = Quote_date
    arr.rfq_id = null
    arr.currency_type = "SAR"
    arr.transaction_type = "sale"
    const json = Object.assign({}, arr);
    formData.append('discount_in_p', isNaN(dis_per) ? 0 : dis_per)
    formData.append('total_value', isNaN(parseFloat(subTotalCost).toFixed(2)) ? 0 : parseFloat(subTotalCost).toFixed(2))
    formData.append('net_amount', isNaN(GTotal) ? 0 : parseFloat(GTotal).toFixed(2))
    formData.append('vat_in_value', isNaN(parseFloat(vat).toFixed(2)) ? 0 : parseFloat(vat).toFixed(2))
    formData.append('po_number', id)
    formData.append('party_id', party_id)
    formData.append('validity', validity)
    formData.append('warranty', warranty)
    formData.append('delivery_time', delivery_time)
    formData.append('inco_terms', inco_terms)
    formData.append('payment_terms', payment_terms)
    formData.append('contact_id', contactid ? contactid : 0)
    formData.append('ps_date', Quote_date)
    formData.append('rfq_id', 0)
    formData.append('transaction_type', "sale")
    formData.append('sign', sign ? sign : user.id)
    formData.append('bank_id', bank_id)
    formData.append('subject', subject)
    formData.append('subject2', subject2)
    formData.append('rfq_no', rfq_no ? rfq_no : " ")
    formData.append('notes', JSON.stringify(testArr))
    formData.append('transport', transport)
    formData.append('other', other)
    formData.append('user_id', user.id)
    formData.append('status', s)
    formData.append('div_id', localStorage.getItem('division'))
    formData.append('qstatus', '1')


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
            if (s == "New") {
              routerHistory.push(navigatePath + "/quote/" + response.data + "/New/1")

            }
            else {
              routerHistory.push(navigatePath + "/quoateview/4")
            }
          })
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
    }
  };
  function cancelform() {
    let mode = "full"
    updateSidebarMode({ mode })
    routerHistory.push(navigatePath + "/quoateview/0")
  }

  const handleDialogClose = () => {

    setShouldOpenEditorDialog(false);


    url.get("products/" + catid).then(({ data }) => {
      let tempItemList = [...state.item];

      setProductList1(data.prices)
      tempItemList.map((element, i) => {
        let sum = 0;

        if (indexvalue === i) {

          element['product_id'] = catid;
          // element['descriptionss'] = data.product[0].description;





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
  const setcontact = (event, newValue) => {

    if (newValue?.id) {
      url.get("parties/" + newValue?.id).then(({ data }) => {
        setcustomercontact(data[0].contacts);
        setpayment_terms(data[0]?.payment_term ? data[0]?.payment_term : '')
        setparty_id(newValue?.id)

        setrfqstatus(true);


      });
    }
    else {
      setcustomercontact([]);

      setparty_id()

      setrfqstatus(false);
    }
  }
  const [data, setData] = useState([])
  const [uom, setUOM] = useState(false)

  useEffect(() => {


    url.get(`mjrQuoteInc/${localStorage.getItem('division')}`).then(({ data }) => {
      setData(data?.uom);
      const d = data?.customer?.filter(obj => obj.div_id == localStorage.getItem('division'))
      setCustomerList(d)
      setcompanybank(data?.banks);

      let user_val = data?.users?.filter(obj => obj.user_id == user.id)
      setsign(user_val[0]?.id)
      setusers(data?.users)
      setproList(data?.products?.filter(obj => obj.div_id == localStorage.getItem('division')))
    })


    // getUnitOfMeasure().then(({ data }) => {
    //   setData(data);
    // });
    // getCustomerList().then(({ data }) => {

    //   const d = data.filter(obj => obj.div_id == localStorage.getItem('division'))
    //   setCustomerList(d);

    //   // setsign(user.id)


    // });
    // getcompanybank().then(({ data }) => {
    //   setcompanybank(data);
    // });

    // url.get('designation').then(({ data }) => {

    //   let user_val = data.filter(obj => obj.user_id == user.id)
    //   setsign(user_val[0].id)
    //   setusers(data)
    // })


    // url.get("products").then(({ data }) => {
    //   setproList(data)




    // });

    return setIsAlive(false)


    //     
    // let tempItemList = [...state.item];

    // tempItemList.push({
    //   product_id: "",
    //   description:"",
    //   descriptions:"",
    //   files:[],
    //   quantity:0,
    //   product_price_list:[
    //     {
    //       price:"",
    //       firm_name:"",
    //       id:""
    //     }
    //   ],
    //   purchase_price:0.00,
    //   margin:0,
    //   sell_price:0.00,
    //   remark:"",
    //   total_amount:0.00


    // });
    // setState({
    //   ...state,
    //   item: tempItemList,
    // });


  }, [id, isNewInvoice, isAlive, generateRandomId]);
  const [show, setShow] = useState(false);
  const [discPer, setDiscPer] = useState(0);
  const handleDiscountChange = (event, oldper) => {
    // setDiscPer(event.target.value)
    console.log(oldper);
    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      element["discount"] = isNaN(parseFloat(event)) ? 0 : parseFloat(event);
      const dumy_sellPrice = element.sell_price;
      element.sell_price = element.purchase_price
        ? parseFloat(
            (element.margin * parseFloat(element.purchase_price)) / 100 +
              parseFloat(element.purchase_price)
          ).toFixed(3) -
          parseFloat(
            (parseFloat(element.discount) *
              parseFloat(
                (element.margin * parseFloat(element.purchase_price)) / 100 +
                  parseFloat(element.purchase_price)
              ).toFixed(3)) /
              100
          ).toFixed(3)
        : element.sell_price - (event * element.sell_price) / 100;
      element.margin_val = element.purchase_price
        ? ((parseFloat(element.purchase_price) * parseFloat(element.margin)) /
            100) *
          parseFloat(element.quantity)
        : dumy_sellPrice * element.quantity;
      element.total_amount = (element.sell_price * element.quantity).toFixed(2);
      element.cost_qty = (element.purchase_price * element.quantity).toFixed(2);
      element.discount_val = element.purchase_price
        ? parseFloat(
            (parseFloat(element.discount) *
              parseFloat(
                (element.margin * parseFloat(element.purchase_price)) / 100 +
                  parseFloat(element.purchase_price)
              ).toFixed(3)) /
              100
          ).toFixed(3) * parseFloat(element.quantity)
        : ((element.discount * dumy_sellPrice) / 100) * element.quantity;

      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });
  };


  const setMargin = (id, index, name) => {

    setproductid(id)
    setproductname(name)
    setindex(index)
    setShouldOpenEditorDialog(true);

  }
  const product_popup = () => {
    setshouldOpenConfirmationDialogproduct(true)
  }
  const setProductdescription = (event, index, newValue) => {
    console.log(newValue)
    if (newValue !== false) {
      url.get("products/" + newValue?.id).then(({ data }) => {
        console.log("data",data)
        let tempItemList = [...state.item];
        data.prices.map((element, i) => {

        })
        setProductList1(data.prices)
        // setProductList1(data.prices)


        tempItemList.map((element, i) => {
          let sum = 0;

          if (index === i) {

            element['product_id'] = newValue?.id;
            element['item_name'] = newValue?.name;
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
  // toggle 
  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;

    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }

    updateSidebarMode({ mode });
  };
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    });
  };

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
  let costTotal = 0;
  let margin_per = 0;
  let totalmargin = 0;
  let subTotalCost = 0;
  let subCost = 0;
  let margin_val = 0;
  let sellTotal = 0;
  let adjust = 0;

  let afterMargin = 0;


  let GTotal = 0;
  let dis_per = 0;
  let dis_val = 0;
  let {
    orderNo,
    net_amount,
    buyer,
    seller,
    item: invoiceItemList = [],
    quote: quoteList = [],
    notes: notesList = [],
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
        <IconButton onClick={handleSidebarToggle}>
          <Icon>arrow_back</Icon>
        </IconButton>
        <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
          <ValidatorForm autocomplete="off" onSubmit={e => { e.preventDefault(); }} onError={(errors) => null}>
            <div className="viewer_actions px-4 flex justify-between">
              <div className="mb-6">
                <h3 align="left"> CREATE SALES QUOTATION</h3>
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
                <Button
                  // type="submit"
                  className="mr-4 py-2"
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                  onClick={(e) => handleSubmit(e,'draft')}
                >
                  <Icon>drafts</Icon> DRAFT
                </Button>

                <Button
                  // type="submit"
                  className="py-2"
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                  onClick={(e) => handleSubmit(e,'New')}
                >
                  <Icon>save</Icon> SAVE & PRINT QUOTATION
                </Button>
              </div>
            </div>

            {/* <div className="viewer__order-info px-4 mb-4 flex justify-between">
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
                  required

                  onClick={(event) => setcontact(event)}
                  required
                  select
                >
                  <MenuItem onClick={() => {
                    routerHistory.push(navigatePath + "/party/addparty");
                  }}>

                    <Icon>add</Icon>New

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
                   
                    onChange={(e) => setcontactid(e.target.value)}

                  >
                    <Button onClick={() => setshouldOpenConfirmationDialogparty(true)}><Icon>add</Icon>New</Button>
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
                 
                  <TextField
                    name="rfq_no"
                    value={rfq_no}
                    className="m-2"
                    label="RFQ No"
                    size="small"
                    variant="outlined"
                    onChange={(e) => {
                      setrfq_no(e.target.value)
                     
                    }}

                  >

                  </TextField>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="m-2"
                      margin="none"
                      label="Quote Date"
                      format="dd MMMM yyyy"
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      selected={Quote_date}
                      value={Quote_date}
                      onChange={(date) => {
                        setQuote_date(moment(date).format('DD MMM YYYY'))
                       
                      }}
                    />
                  </MuiPickersUtilsProvider>



                </div>



              </div>
            </div> */}

            <Grid container spacing={2}>
              <Grid item className="ml-4">


                <Autocomplete
                  id="filter-demo"
                  variant="outlined"
                  style={{ minWidth: 360, maxWidth: '550px' }}
                  options={CustomerList}


                  getOptionLabel={(option) => option.firm_name}
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

                {rfqstatus && <Autocomplete
                  id="filter-demo"
                  variant="outlined"
                  style={{ minWidth: 250, maxWidth: '300px' }}
                  options={customercontact}


                  getOptionLabel={(option) => option?.fname}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== " ") {
                      filtered.unshift({
                        inputValue: params.inputValue,
                        fname: (<Button variant="outlined" color="primary" size="small" onClick={() => setshouldOpenConfirmationDialogparty(true)}>+Add New</Button>)
                      });
                    }


                    return filtered;
                  }}
                  onChange={(event, newValue) => setcontactid(newValue?.id)}

                  size="small"
                  renderInput={(params) => <TextField {...params}
                    variant="outlined" label="Contact Person" />}
                />}
              </Grid>
              {!rfqstatus && <Grid item xs ></Grid>}
              
              <Grid item xs ></Grid>
              <Grid item>
                <TextField
                  name="rfq_no"
                  value={rfq_no}
                  className="pr-4"
                  label="RFQ No"
                  size="small"
                  variant="outlined"
                  onChange={(e) => {
                    setrfq_no(e.target.value)
                    // return date
                  }}

                >

                </TextField>

              </Grid>
              <Grid item xs >
                <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="pr-4"
                    margin="none"
                    label="Quote Date"
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
              </Grid>
            </Grid>
            <div className="pl-4 pt-4 flex">
              <h5 className="font-normal capitalize">
                {/* <strong>Subject: </strong>{" "} */}

              </h5>
              <TextValidator
                label="Subject"
                className="mb-4"
                type="text"
                variant="outlined"
                size="small"
                style={{ width: 360 }}
                onChange={e => setsubject(e.target.value)
                }
                value={subject}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />       </div>
                <TextValidator
                label="Quotation Description"
                className="mb-4 ml-4 mr-4"
                type="text"
                variant="outlined"
                size="small"
                style={{ width: '1334px'}}
                onChange={e => setsubject2(e.target.value)
                }
                value={subject2}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />




            <Divider />

            <Table className="mb-4">
              <TableHead>
                <TableRow className="bg-default">
                  <TableCell className="pl-sm-24" style={{ width: 70 }} align="left">S.NO.</TableCell>
                  <TableCell className="px-0" style={{ width: '50px' }}></TableCell>
                  <TableCell className="px-0" style={{ width: '150px' }} align="center">ITEM NAME</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }} align="center">OUR DESCRIPTION</TableCell>
                  {
                    localStorage.getItem('division') == 3 ? <></> : <>
                      <TableCell className="px-0" style={{ width: '100px' }} align="center">RFQ DESCRIPTION</TableCell>

                    </>
                  }
                  
                  <TableCell className="px-0" style={{ width: '70px' }} align="center">QUANTITY</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }} align="center">UOM</TableCell>
                  <TableCell className="px-0" style={{ width: '150px' }} align="center">PRICE</TableCell>
                  <TableCell className="px-0" style={{ width: '80px' }} align="center">MARGIN %</TableCell>
                  <TableCell className="px-0" style={{ width: '80px' }} align="center">DISCOUNT %</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }} align="center">SELL PRICE</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }} align="center">TOTAL</TableCell>
                  <TableCell className="px-0" style={{ width: '20px' }}><Icon>delete</Icon></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceItemList.sort((a, b) => a.index1 - b.index1).map((item, index) => {
                  // console.log(item.product_id)
                  if (!dstatus) {
                    // 29-1-2022
                    costTotal += item.purchase_price ? item.purchase_price * item.quantity : 0;
                    // costTotal += item.purchase_price?parseFloat(item.purchase_price) * parseFloat(item.quantity):(item.costprice*item.quantity);
                    totalmargin += parseFloat(item.margin);

                    // subCost += parseFloat(item.total_amount)
                    // subTotalCost = parseFloat(subCost)+parseFloat(other)+parseFloat(transport)

                    // margin_per=((subCost-costTotal)/costTotal)*100;
                    adjust =
                    adjust +
                    (Math.round(item.margin_val) - item.margin_val);

                    margin_val += Math.round(item.margin_val);

                    margin_per = costTotal ? (margin_val / costTotal) * 100 : 100;
                    subCost = (costTotal + margin_val);
                    subTotalCost = parseFloat(subCost) + parseFloat(other) + parseFloat(transport)

                    // margin_val=((subCost-costTotal));
                    dis_val += (item?.discount_val ? item?.discount_val : 0)



                    dis_per = ((parseFloat(dis_val) / parseFloat(subCost)) * 100).toFixed(3);


                    afterMargin = parseFloat(margin_val - dis_val).toFixed(2)

                    sellTotal = subTotalCost - dis_val
                    vat = (((parseFloat(sellTotal) - parseFloat(other + transport)) * 15) / 100).toFixed(2);

                    // GTotal=(subTotalCost+(subTotalCost * 15) / 100).toFixed(2);
                    GTotal = (parseFloat(vat) + parseFloat(sellTotal))


                  }
                  else {
                    costTotal += parseFloat(item.purchase_price) * parseFloat(item.quantity);
                    totalmargin += parseFloat(item.margin);
                    subCost += parseFloat(item.total_amount)
                    subTotalCost = parseFloat(subCost) + parseFloat(other) + parseFloat(transport)
                    dis_per = parseFloat(item.discount * subTotalCost / 100).toFixed(2)
                    margin_per = ((subCost - costTotal) / costTotal) * 100;
                    margin_val = ((subCost - costTotal));
                    sellTotal = subTotalCost - dis_per;

                    // discount=subTotalCost-parseFloat(discounts * subTotalCost/100);
                    vat = (((subTotalCost - parseFloat(discounts * subTotalCost / 100)) * 15) / 100)
                    // GTotal=((subTotalCost-parseFloat(discounts * subTotalCost/100))+ parseFloat(vat)).toLocaleString(undefined,{
                    //   minimumFractionDigits:2
                    // });
                    GTotal = (parseFloat(vat) + parseFloat(sellTotal))
                  }
                  // vat= (discount * 15) / 100
                  // GTotal=item.discount + item.vat;

                  return (
                    <TableRow key={item.index}>


                      <TableCell className="pl-sm-24 capitalize" align="left" style={{ width: 50 }}>
                        {item.index1}
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


                        {localStorage.getItem('division') == 3 ? (
                          <>

                          </>

                        ) : <>
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
                            : (<span><Icon color="error" onClick={(event) => deleteFileSelect(event, index)}>close</Icon><img className="w-48" src={item.src} alt="" ></img></span>)
                          }
                        </>}

                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '150px' }}>
                        {/* <TextValidator
                          label="Item"
                          onChange={(event) => setProductdescription(event, index)}
                          type="text"
                          name="product_id"
                          fullWidth
                          variant="outlined"
                          // inputProps={{style: {textTransform: 'capitalize'}}}
                          inputProps={{
                            ref: setRef(index + 'product_id'),

                          }}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'product_id', index + 'description', null, invoiceItemList) }}

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

                          {proList.filter(obj => obj.div_id == localStorage.getItem('division')).map((item) => (


                            <MenuItem value={item.id} >
                              {item.name}
                            </MenuItem>

                          ))}
                        </TextValidator> */}
                        <Autocomplete
                          id="filter-demo"
                          variant="outlined"
                          style={{ minWidth: 100, maxWidth: '150px' }}
                          options={proList}

                          value={item.item_name}
                          getOptionLabel={(option, index) => option?.name ? option?.name : item.item_name}
                          filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            if (params?.inputValue !== " ") {
                              filtered.unshift({
                                inputValue: params?.inputValue,
                                name: (<Button variant="outlined" color="primary" size="small" value="false" onClick={(event, newValue) => setProductdescription(event, index, false)}>+Add New</Button>)
                              });
                            }


                            return filtered;
                          }}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'product_id', index + 'description', null, invoiceItemList,true) }}
                          onChange={(event, newValue) => setProductdescription(event, index, newValue)}
                          size="small"
                          renderInput={(params) => <TextField
                            inputRef={input => {
                              inputRef[index] = input;
                            }}
                            {...params} multiline
                            variant="outlined" label="Item" />}
                        />

                        {/* <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          name="product_id"
          // multiple
          // value={personName}
          value={item.product_id ? item.product_id : ""}
          onChange={handleChange}
          // input={<OutlinedInput label="Name" />}
          // MenuProps={MenuProps}
        >
          
          {proList.filter(obj => obj.div_id == localStorage.getItem('division')).map((item) => (


<MenuItem value={item.id} >
  {item.name}
</MenuItem>

))}

        </Select> */}
                      </TableCell>
                      {
                        localStorage.getItem('division') == 3 ? <></> : <>

                        <TableCell className="pl-0 capitalize" align="left" style={{ width: '150px' }}>
                        <TextField
                          label="Our description"
                          // onChange={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          onChange={(event) => handleIvoiceListChange(event, index)}
                          variant="outlined"
                          required
                          size="small"
                          name="descriptionss"
                          inputProps={{
                            ref: setRef(index + 'descriptionss')
                          }}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'descriptionss', index + 'quantity', index + 'description', invoiceItemList,true) }}

                          // inputProps={{style: {textTransform: 'capitalize'}}}
                          fullWidth
                          multiline
                          value={item.descriptionss ? item.descriptionss : ""}

                        />
                      </TableCell>
                        
                        </>
                      }


                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '150px' }}>
                            <TextField
                              label="description"
                              onChange={(event) => handleIvoiceListChange(event, index)}
                              type="text"
                              name="description"
                              required
                              inputProps={{
                                ref: setRef(index + 'description')
                              }}
                              onKeyDown={(e) => { controlKeyPress(e, index + 'description', index + 'descriptionss', index + 'product_id', invoiceItemList,true) }}

                              fullWidth
                              variant="outlined"
                              // inputProps={{style: {textTransform: 'capitalize'}}}
                              multiline
                              size="small"
                              value={item ? item.description : null}

                            />
                          </TableCell>

                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '70px' }}>
                        <TextValidator
                          label="Qty"
                          onChange={(event) => calcualte_qty(event, index)}
                          type="text"
                          variant="outlined"
                          size="small"
                          // onFocus={(e)=>{console.log(getRef(index + 'quantity').current.select())}}
                          onFocus={event => {
                            // event properties must be copied to use async
                            const target = event.target;
                            setTimeout(() => target.select(), 0);
                      }}
                          fullWidth
                          inputProps={{ref: setRef(index + 'quantity'), min: 0, style: { textAlign: 'center' } }}
                         
                          onKeyDown={(e) => { controlKeyPress(e, index + 'quantity', index + 'unit_of_measure', index + 'descriptionss', invoiceItemList) }}
                          validators={["isNumber"]}
                          errorMessages={[
                            "Input is not Valid",
                          ]}
                          name="quantity"
                          value={item.quantity}
                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                        <TextField
                          className="mr-2"
                          label="UOM"
                          onChange={(event) => handleIvoiceListChange(event, index)}
                          // onChange={e => setunit_of_measure(e.target.value)}
                          type="text"
                          size="small"
                          value={item.unit_of_measure}
                          name="unit_of_measure"
                          inputProps={{
                            ref: setRef(index + 'unit_of_measure')
                          }}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'unit_of_measure', index + 'purchase_price', index + 'quantity', invoiceItemList,true) }}

                          variant="outlined"
                          required
                          fullWidth
                          errorMessages={["this field is required"]}
                          select
                        // validators={["required"]}
                        // errorMessages={["this field is required"]}
                        >
                          <MenuItem onClick={(e) => { setUOM(true) }}><Icon>add</Icon> ADD UOM</MenuItem>

                          {data.map((item, ind) => (
                            <MenuItem value={item.value} key={item}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextField>
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
                            value={item.purchase_price}
                            onKeyDown={(e) => { controlKeyPress(e, index + 'purchase_price', index + 'margin', index + 'unit_of_measure', invoiceItemList,true) }}

                            inputProps={{
                              name: 'purchase_price',
                              ref: setRef(index + 'purchase_price'),
                              id: 'outlined-age-native-simple',
                              style: { textAlign: 'right' }
                            }}

                            style={{ width: 110, height: 40 }}
                          >




                            <option value={0}>----</option>
                            {item?.product_price_list?.map((item, id) => (
                              <optgroup label={item.firm_name} style={{ fontSize: 12 }}>
                                <option value={item.price}>{item.price}</option>
                              </optgroup>
                            ))}

                          </Select>
                        </FormControl>{item.product_id ? (<Tooltip title="add price" fontSize="1.2em"><Icon onClick={() => setproductids(item.product_id, index)}>add</Icon></Tooltip>) : ''}</>}








                      </TableCell>
{/* {console.log("item.purchase_price",item.purchase_price)} */}


                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                        <TextValidator
                          label="Margin"
                          onChange={(event) => calcualte_margin(event, index)}
                          requried
                          disabled={item.purchase_price == 0 ? true : false}
                          // onBlur={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          variant="outlined"
                          inputProps={{ min: 0, style: { textAlign: 'center' } }}
                          size="small"
                          inputProps={{
                            ref: setRef(index + 'margin')
                          }}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'margin', index + 'discount', index + 'purchase_price', invoiceItemList) }}

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
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                        <CurrencyTextField
                          label="Discount"
                          // onChange={(event) => discountPer(event, index)}
                          onBlur={(e, value) => discountPer(e, index, value)}
                          // onBlur={(event) => handleIvoiceListChange(event, index)}

                          decimalPlaces={2}
                          variant="outlined"
                          inputProps={{ ref: setRef(index + 'discount'), min: 0, style: { textAlign: 'center' } }}
                          size="small"
                          name="discount"
                        
                          onKeyDown={(e) => { controlKeyPress(e, index + 'discount', index + 'sell_price', index + 'margin', invoiceItemList) }}

                          currencySymbol=""
                          // style={{width:'75%',float:'left'}}
                          fullWidth
                          value={item.discount}
                        // validators={["required"]}
                        // errorMessages={["this field is required"]}

                        />



                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                        {/* <TextValidator
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
                          className="w-full "
                          label="Price"
                          variant="outlined"
                          fullWidth
                          inputProps={{
                            ref: setRef(index + 'sell_price')
                          }}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'sell_price', index + 'total_amount', index + 'discount', invoiceItemList) }}

                          size="small"
                          currencySymbol=""
                          name="sell_price"
                          value={parseFloat(item.sell_price)}
                          onChange={(e, value) => calculatemargin(e, index, value)}
                        // onBlur={(e, value) => calculatemargin(e, index, value)}
                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                        {/* <TextValidator
                      label="QTotal"
                      
                      // onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      variant="outlined"
                      size="small"
                     
                      name="total_amount"
                      inputProps={{min: 0, style: { textAlign: 'right' }}}
                     
                      value={item.total_amount}
                      
                    /> */}
                        <CurrencyTextField
                          className="w-full "
                          label="Total"
                          variant="outlined"
                          fullWidth
                          size="small"
                          readOnly={true}
                          inputProps={{
                            ref: setRef(index + 'total_amount')
                          }}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'total_amount', null, index + 'sell_price', invoiceItemList) }}

                          currencySymbol=""
                          name="total_amount"
                          value={item.total_amount}
                        />
                      </TableCell>
                      {/* <TableCell className="pl-0 capitalize" align="left" style={{width:'140px'}}>
                    <TextValidator
                      label="Remark"
                      onChange={(event) => setremark(event, index)}
                      // onBlur={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      variant="outlined"
                      size="small"
                      name="remark"
                      multiline
          
                      fullWidth
                      value={item.remark ?item.remark:"" }
                      
              
                    />
  
                  </TableCell> */}
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '50px' }}>

                        <Icon color="error" fontSize="small" onClick={() => deleteItemFromInvoiceList(index, item.index1)}>
                          delete
                        </Icon>
                        <Icon color="primary" fontSize="small" onClick={() => addItemToInvoiceList_Index(item.index1)}>
                          add
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
                size="small" onClick={() => addItemToInvoiceList(invoiceItemList)}><Icon>add</Icon>Add Item</Button>
            </div>


            {/* {testArr.map((item, index) => {
              
            return (
              <div>
              
                   <TextField  label={'Note'}
                className="mb-4 ml-4"
                type="text"
                variant="outlined"
                value={item.note}
                size="small"
                style={{width:500}}
                validators={["required"]}
                errorMessages={["this field is required"]}
                multiline
                name="note"
                onChange={(e)=>noteList(e.target.value,index)}></TextField>
                <Button onClick={() => deleteItemFromNoteList(index)}>
                  <Icon color="error" className="mt-2" >delete</Icon>
                  </Button>
                  
              </div>
            )
          })}
          <Button className="mt-4 py-2 mb-2 ml-4"
              color="primary"
              variant="contained"
              size="small" onClick={addRow}><Icon>add</Icon>Add Note</Button> */}

            {/* <div> 
<div style={{display:'inline-block'}}><h6 className="px-4"><strong>Subject</strong></h6></div>
<div style={{display:'inline-block',marginLeft:100}}><TextValidator
                label="Subject"
                className="mb-4"
                type="text"
                variant="outlined"
                size="small"
                style={{width:500}}
                onChange={e => setsubject(e.target.value)
                }
                value={subject}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /></div>
</div> */}


            <h6 className="px-4"><strong>Terms</strong></h6>
            <div className="px-4 flex justify-between">
              <div className="flex">


                <div className="pr-12">



                  <p className="mb-6" style={{ position: 'relative', top: '10px' }}>Quotation Validity:</p>
                  <p className="mb-8" style={{ position: 'relative', top: '17px' }}>Payment Terms:</p>
                  <p className="mb-10" style={{ position: 'relative', top: '18px' }}>Warranty:</p>
                  <p className="mb-10" style={{ position: 'relative', top: '15px' }}>Delivery Time:</p>
                  <p className="mb-8" style={{ position: 'relative', top: '10px' }}>Inco-Term:</p>
                  <p className="mb-8" style={{ position: 'relative', top: '10px' }}>Signature:</p>
                  <p className="mb-8" style={{ position: 'relative', top: '10px' }}>Bank:</p>

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
                    required
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
                    required
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
                    onChange={(e)=>{setinco_terms(e.target.value);
                      if(e.target.value == 'Other'){ setShowOther2('Other') }else{setShowOther2(''); setOinco('')}} }
                    className="mb-4"
                    type="text"
                    variant="outlined"
                    size="small"
                    select
                    name="net_amount"
                    style={{ width: 500 }}
                    value={inco_terms}
                    required
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  >
           
                    <MenuItem value={0}>--- Select ---</MenuItem>
                    <MenuItem value='DDP-Delivery Duty Paid To Customer Office'>DDP(Delivery Duty Paid To Customer Office)</MenuItem>
                    <MenuItem value='Ex-Works'>Ex-Works</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                  </TextValidator>
                  {showother2 == 'Other' && <>
                    <TextValidator
                    label="Inco-Term"
                    className="mb-4"
                    onChange={e => setOinco(e.target.value)
                    }
                    type="text"
                    variant="outlined"
                    size="small"
                    style={{ width: 500 }}
                    name="net_amount"
                    value={oinco}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  
                  </>}
                  <FormGroup>
                    <FormControl variant="outlined" minWidth="120" size="small">
                      <InputLabel htmlFor="outlined-age-native-simple" className="mr-5" width="20px">Signature</InputLabel>
                      <Select
                        native
                        value={sign ? sign : ""}
                        // onChange={handleChange}
                        onChange={e => setsign(e.target.value)}
                        size="small"
                        label="Signature"
                        inputProps={{
                          name: 'Bank',
                          id: 'outlined-age-native-simple',

                        }}

                      >
                        {users.map((item, ind) => (
                          <option value={item.id}>{item.name} -- {item.designation}</option>
                        ))}
                      </Select>
                    </FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormControl variant="outlined" size="small"
                      className="mt-4">
                      <InputLabel htmlFor="outlined-age-native-simple">Bank</InputLabel>
                      <Select
                        native
                        value={bank_id ? bank_id : ''}
                        // onChange={handleChange}
                        onChange={e => setbank_id(e.target.value)}
                        size="small"
                        label="Bank"
                        inputProps={{
                          name: 'Bank',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option value={0}>--- Select ---</option>
                        {companybank.map((item, ind) => (
                          <option value={item.id}>{item.name}-{item.ac_no}</option>
                        ))}
                      </Select>
                    </FormControl>

                  </FormGroup>


                </div>

              </div>
              <div className="px-4 flex justify-end">
                <div className="flex " >
                  <div className="pr-12">
                    <p style={{ position: 'relative', top: '10px' }} className="mb-8">Total Cost:</p>
                    <p style={{ position: 'relative', top: '13px' }} className="mb-8">Margin%:</p>
                    <p
                      style={{ position: "relative", top: "13px" }}
                      className="mb-8"
                    >
                      Adjusted Margin Value:
                    </p>
                    <p style={{ position: 'relative', top: '13px' }} className="mb-8 pt-0">Sub Total:</p>
                    <p style={{ position: 'relative', top: '14px' }} className="mb-8">Transport:</p>
                    <p style={{ position: 'relative', top: '16px' }} className="mb-8">Other:</p>
                    <p style={{ position: 'relative', top: '18px' }} className="mb-8">Discount:</p>
                    {dis_val > 0 &&  <p
                      style={{ position: "relative", top: "18px" }}
                      className="mb-8 pt-0"
                    >
                      Margin After Discount:
                    </p> }
                    <p style={{ position: 'relative', top: '22px' }} className="mb-8">Net Total:</p>
                    <p style={{ position: 'relative', top: '18px' }} className="mb-8 pt-2">VAT (15%):</p>
                    {/* <p className="mb-5">currency:</p> */}
                    <strong>
                      <p style={{ position: 'relative', top: '18px' }} className="mb-8">Grand Total:</p>
                    </strong>
                  </div>
                  <div>
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4 "
                        label="Cost"
                        readOnly
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol="SAR"
                        name="net_amount"
                        value={costTotal ? costTotal : parseFloat(0.00).toLocaleString(undefined, {
                          minimumFractionDigits: 2
                        })}

                      />
                      

                    </div>

                    {/* <p className="mb-4 pt-4">{margin_per?parseFloat(margin_per).toLocaleString(undefined,{minimumFractionDigits:2}):0.00}</p> */}
                    <div>
                      <CurrencyTextField
                        className="mb-4 mr-2"
                        label="Margin %"
                        readOnly
                        style={{ width: '90px' }}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol=" "
                        name="net_amount"
                        value={margin_per ? margin_per : 0}

                      />
                      <CurrencyTextField
                        className="w-full"
                        readOnly
                        label="Margin Value"
                        variant="outlined"
                        fullWidth
                        size="small"
                        style={{ width: '168px' }}
                        currencySymbol="SAR"
                        name="dis_per"
                        value={margin_val}
                      />

                    </div>
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4 "
                        label="Adjusted Value"
                        readOnly
                        // onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol="SAR"
                        name="net_amount"
                        value={adjust}
                      />
                    </div>
                    {/* <p className="mb-4 pt-4">{subTotalCost?subTotalCost.toFixed(2):'0.00'}</p> */}
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4 "
                        label="Sub Total"
                        readOnly
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol="SAR"
                        name="net_amount"
                        value={subCost ? subCost : parseFloat(0.00).toLocaleString(undefined, {
                          minimumFractionDigits: 2
                        })}

                      />

                    </div>
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4 "
                        label="Transport"
                        onChange={(e, value) => settransport(parseFloat(value))}
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol="SAR"
                        name="net_amount"
                        value={transport}

                      />

                    </div>
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4 "
                        label="Other"


                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol="SAR"
                        onChange={(e, value) => setother(parseFloat(value))}
                        name="net_amount"
                        value={other}

                      />

                    </div>
                  
                    <div>
                    {show ? (
                        <TextField
                          className="mb-4 mr-2"
                          label="Discount %"
                          type="text"
                          variant="outlined"
                          size="small"
                          // readOnly
                          style={{ width: "90px" }}
                          onBlur={() => {
                            handleDiscountChange(discPer, dis_per);
                          }}
                          onChange={(event) => setDiscPer(event.target.value)}
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                          }}
                          value={
                            discPer
                              ? isNaN(discPer)
                                ? 0
                                : discPer
                              : isNaN(dis_per)
                              ? 0
                              : dis_per
                          }
                        />
                      ) : (
                        <TextField
                          className="mb-4 mr-2"
                          label="Discount %"
                          type="text"
                          variant="outlined"
                          size="small"
                          // readOnly
                          style={{ width: "90px" }}
                          // onBlur={()=>{handleDiscountChange(discPer,dis_per)}}
                          // onChange={(event) => setDiscPer(event.target.value)}
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                          }}
                          value={isNaN(dis_per) ? 0 : dis_per}
                        />
                      )}
                    {show ? <>
                        <Tooltip title='Done'>

                        <Icon
                        style={{
                          fontSize: "18px",
                          position: "relative",
                          left: "-5px",
                          cursor:'pointer',
                          top: "-7px",
                        }}
                        onClick={()=>{setShow(!show)
                          setDiscPer(0)
                        }}
                      >
                        done
                      </Icon></Tooltip> </>: <>
                      <Tooltip title='Edit Discount'>
                      <Icon
                        style={{
                          fontSize: "18px",
                          position: "relative",
                          left: "-5px",
                          cursor:'pointer',
                          top: "-7px",
                        }}
                        onClick={()=>{setShow(!show)
                          setDiscPer(dis_per)
                        }}
                      >
                        edit
                      </Icon>
                      </Tooltip>
                      </>}


                      {/* <TextField
                className="mb-4 ml-2"
                label="Discount"
                type="text"
                variant="outlined"
                size="small"
                name="dis_per"
                style={{width:'90px'}}
                inputProps={{min: 0, style: { textAlign: 'right' }}}
               

                value={discount?dis_per:0.00}
               
              /> */}
                      <CurrencyTextField
                        className="w-full "
                        label="Discount"
                        variant="outlined"
                        fullWidth
                        size="small"
                        readOnly
                        style={{ width: '150px' }}
                        currencySymbol="SAR"
                        name="dis_per"
                        value={parseFloat(dis_val)}
                      />
                    </div>
                    {dis_val > 0 && (
                      <div>
                        <CurrencyTextField
                          className="w-full mb-4 "
                          label="Margin After Discount"
                          readOnly
                          // onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          currencySymbol="SAR"
                          name="net_amount"
                          value={afterMargin}
                        />
                      </div>
                    )}
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4 "
                        label="Net Total"
                        readOnly
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol="SAR"
                        name="net_amount"
                        value={parseFloat(sellTotal).toLocaleString(undefined, {
                          minimumFractionDigits: 2
                        })}

                      />

                    </div>

                    {/* <TextValidator
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
                    <CurrencyTextField
                      className="w-full mb-4 "
                      label="VAT"
                      variant="outlined"
                      fullWidth
                      readOnly
                      size="small"
                      currencySymbol="SAR"
                      name="vat"
                      value={subTotalCost ? vat : parseFloat(0.00).toLocaleString(undefined, {
                        minimumFractionDigits: 2
                      })} />

                    {/* <TextValidator
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
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4 "
                        label="Grand Total"
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        readOnly
                        size="small"
                        currencySymbol="SAR"
                        name="net_amount"
                        value={subTotalCost ? GTotal : parseFloat(0.00).toLocaleString(undefined, {
                          minimumFractionDigits: 2
                        })} />

                    </div>


                  </div>
                </div>
              </div>
            </div>
            <Container
              dragHandleSelector=".drag-handle"
              lockAxis="y"
              onDrop={onDrop}
            >
              {testArr?.map((item, index) => {
                return (
                  <Draggable key={index}>
                    <ListItem>
                      <div>
                        <TextField
                          label={"Note"}
                          className="mb-4 ml-4"
                          multiline
                          type="text"
                          variant="outlined"
                          value={item?.note}
                          size="small"
                          style={{ width: 500 }}
                          // validators={["required"]}
                          // errorMessages={["this field is required"]}
                          name="note"
                          onChange={(e) => noteList(e.target.value, index)}
                        ></TextField>
                        <Button onClick={() => deleteItemFromNoteList(index)}>
                          <Icon color="error" className="mt-2">
                            delete
                          </Icon>
                        </Button>
                        <div>
                          <ListItemSecondaryAction>
                            <ListItemIcon className="drag-handle">
                              <DragHandleIcon />
                            </ListItemIcon>
                          </ListItemSecondaryAction>
                        </div>
                      </div>
                    </ListItem>
                  </Draggable>
                );
              })}
            </Container>
            {/* {testArr.map((item, index) => {

              return (
                <div>

                  <TextField label={'Note'}
                    className="mb-4 ml-4"
                    type="text"
                    variant="outlined"
                    value={item.note}
                    size="small"
                    style={{ width: 500 }}
                    required
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    multiline
                    name="note"
                    onChange={(e) => noteList(e.target.value, index)}></TextField>
                  <Button onClick={() => deleteItemFromNoteList(index)}>
                    <Icon color="error" className="mt-2" >delete</Icon>
                  </Button>

                </div>
              )
            })} */}
            <Button className="mt-4 py-2 mb-2 ml-4"
              color="primary"
              variant="contained"
              size="small" onClick={addRow}><Icon>add</Icon>Add Note</Button>


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
        {
          shouldOpenEditorDialog && (
            <MemberEditorDialog
              handleClose={handleDialogClose}
              contactid={status}
              open={shouldOpenEditorDialog}
              catid={catid}
              productprice={setproductprice}
            />
          )
        }
        {
          shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={handleDialogClose}
              text="Are you sure to delete?"
            />
          )
        }
        {uom && (
          <UOMDialog
            open={uom}
            handleClose={() => { setUOM(false);setIsAlive(false)}}
            setData={setData}
          />
        )}
        {
          shouldOpenEditorDialogproduct && (
            <MemberEditorDialog_product
              handleClose={handleDialogClose}
              open={shouldOpenEditorDialogproduct}


            />
          )
        }
        {
          shouldOpenConfirmationDialogproduct && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialogproduct}
              onConfirmDialogClose={handleDialogClose}

              text="Are you sure to delete?"
            />
          )
        }
        {
          shouldOpenConfirmationDialogparty && (
            <MemberEditorDialogcontact
              open={shouldOpenConfirmationDialogparty}
              onConfirmDialogClose={handleDialogClose}
              handleClose={() => { setshouldOpenConfirmationDialogparty(false); setIsAlive(false) }}
              customercontact={setcustomercontact}
              partyid={party_id}

              text="Are you sure to delete?"
            />
          )
        }
      </Card >
    </div >


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
