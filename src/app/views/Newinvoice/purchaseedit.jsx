import React, { useState, useEffect } from "react";
import MemberEditorDialogcontact from "../party/partycontact";
import UOMDialog from "../invoice/UOMDialog";

import {
  Button,
  Divider,
  Card,
  Grid,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Icon,
} from "@material-ui/core";
import useDynamicRefs from "use-dynamic-refs";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import Annexure from "../Quoteinvoice/Annexure";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import url, {
  // divisionId,
  // getCustomerList,
  // getUnitOfMeasure,
  // getVendorList,
  // data,
  currency,
  navigatePath,
} from "../invoice/InvoiceService";
import Swal from "sweetalert2";
import { ConfirmationDialog } from "matx";

import MemberEditorDialog from "../product/productprice";
import moment from "moment";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { TextField } from "@material-ui/core";

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
const filter = createFilterOptions();
const QuickPo = ({ isNewInvoice, toggleInvoiceEditor }) => {
  let inputRef = [];
  let priceRef = [];
  let descriptionRef = [];
  let qtyRef = [];
  let unit_of_measureRef = [];
  let purchase_priceRef = [];
  
  const [getRef, setRef] = useDynamicRefs();

  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(initialValues);
  const [party_id, setparty_id] = useState(""); /*party id*/
  const [discounts, setdiscounts] = useState("0"); /*discounts */
  const [proList, setproList] = useState([]); /*ProductList */
  const [validity, setvalidity] = useState("3 Days"); /* Validity */
  const [payment_terms, setpayment_terms] =
    useState("100% Advance"); /*Payment_terms */
  const [freight, setfreight] = useState("Air Freight"); /*Freight charge */
  const [warranty, setwarranty] = useState("NA"); /*warranty */
  const [delivery_time, setdelivery_time] = useState(
    "Within 2-3 Days from the Date of PO"
  ); /*delivery time */

  const [showother,setShowOther] =useState('')
  const [ofreight, setOfreight] = useState('')
  const [inco_terms, setinco_terms] = useState(
    "DDP-Delivery Duty Paid To Customer Office"
  ); /* Inco terms */
  // const [discount, setdiscount] = useState('0')
  const [contactid, setcontactid] = useState(0); /*contact id */
  const [dstatus, setdstatus] = useState(false);
  // const [productid, setproductid] = useState('1');
  // const [indexset, setindex] = useState(0);
  // const [productname, setproductname] = useState('');
  const [partyids, setpartyids] = useState(); /*partyids */
  const [productprice, setproductprice] = useState([]);
  const [contacts, setcontacts] = useState([]); /*contacts */
  const [PriceList, setPriceList] = useState([]); /*price List */
  const [DataList, setDataList] = useState("ghhhhh");
  const [currency_type, setcurrency_type] = useState("SAR"); /*currency type */
  const [charge, setcharge] = useState(0.0); /*Freight charge */
  const [total, settotal] = useState(0.0); /*total */
  const [catid, setcatid] = useState(); /*catid */

  // customer name and contact person name
  const [cname, setcname] = useState(" ");//set the customer name to null
  const [contactname, setcontactname] = useState(" ");//set the contact person name
  const [proListAll, setproListAll] = useState([]);//set the product list

  const [Quote_date, setQuote_date] = useState(
    moment(new Date()).format("DD MMM YYYY")
  ); /*Quote date */

  const history = useHistory();//It lets you access the history instance used by React Router. 
  const formData = new FormData();// The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values
  const { id } = useParams();//Returns an object of the params for the route rendered.
  const classes = useStyles();// a library created with the purpose of solving a recurring problem that developers usually have in React Native:
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenEditorDialogAnnexure, setShouldOpenEditorDialogAnnexure] =
    useState(false);
    const [vatExclude,setVatExclude] = useState(0)

  const [values, setvalues] = useState({
    vendorList: [],//set the vendorList
    contacts: [],//set the contact details
    supplier_id: " ",//set the supplier id
  });
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [
    shouldOpenConfirmationDialogparty,
    setshouldOpenConfirmationDialogparty,
  ] = useState(false);

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);

  /*Add New Row  */
  const addItemToInvoiceList = () => {
    let tempItemList = [...state.item];//assign the previous purchase order details
    setproList(proListAll);//adds one or more elements to the end of an array and returns the new length of the array.

    tempItemList.push({
      product_id: "",
      product_name: "",
      src: "",
      id: 0,
      description: "",
      descriptions: " ",
      quantity: 0,
      product_price_list: [
        {
          price: "",
        },
      ],
      product: [
        {
          description: "",
        },
      ],
      purchase_price: 0.0,
      margin: 0,
      sell_price: parseFloat(0.0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      }),
      remark: "",
      total_amount: parseFloat(0.0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      }),
    });
    setState({
      ...state,
      item: tempItemList,
    });//set the updated purchase order details
  };

  // const setremark = (event, index) => {
  //   event.persist()
  //   let tempItemList = [...state.item];

  //   tempItemList.map((element, i) => {
  //     let sum = 0;

  //     if (index === i) {
  //       element[event.target.name] = event.target.value;

  //     }
  //     return element;

  //   });

  //   setState({
  //     ...state,
  //     item: tempItemList,
  //   });

  // }

  // const filterOptions = (options, params) => {
  //   const filtered = filter(options, params);
  //   // if (params.inputValue !== "") {
  //   filtered.push({
  //     inputValue: params.inputValue,
  //     name: `Add "${params.inputValue}"`
  //   });
  //   // }
  //   return filtered;
  // };
  // const charges = (e) => {
  //   vat = e.target.value
  //   GTotal = 50 + vat
  // }

  /*Set the product name,description,product id*/
  const handleChanges = (event, newValue, index) => {
   console.log(event.target.value)
    const price = PriceList?.filter(
      (el) => el.product_id === newValue?.id && el.party_id == party_id
    );

    let tempItemList = [...state.item];//create the copy of state array

    if (!newValue) {
      setproList(
        proListAll?.filter((obj) =>
          obj?.name?.toLowerCase()?.includes(event.target.value?.toLowerCase())
        )//if the product name is entered manually then filter the product name from the product list
      );
    }
    tempItemList.map((element, i) => {//allows you to iterate over an array and modify its elements using a callback function
      let sum = 0;

      if (index === i) {
        element["product"] = newValue?.id//set the product name 
          ? newValue?.name
            ? newValue?.name
            : event?.target?.value
          : event?.target?.value;
        element["descriptions"] = newValue?.id//set the product name
          ? newValue?.name
            ? newValue?.name
            : event?.target?.value
          : event?.target?.value;
        element["description"] = newValue?.id//set the product name
          ? newValue?.name
            ? newValue?.name
            : event?.target?.value
          : event?.target?.value;
        element["product_name"] = newValue?.id//set the product name
          ? newValue?.name
          : event?.target?.value;
        element["product_id"] = newValue?.id ? newValue?.id : 0;//set the product id
        element["product_price_list"] = price ? price : null;//set the product price
        element["arabic_description"] = null;//set the arabic description
      }
      return element;
    });
    setState({
      ...state,
      item: tempItemList,
    });//enqueues all of the updates made to the component state and instructs React to re-render the component and its children with the updated state.
  };

  /* set the purchase price and calculate total amount */
  const handleIvoiceListChange = (event, index, newValue) => {
    let tempItemList = [...state.item];//create the copy of state array

    tempItemList.map((element, i) => {//allows you to iterate over an array and modify its elements using a callback function
      let sum = 0;

      if (index === i) {
        element["total_amount"] = (
          (newValue?.price ? newValue?.price : newValue) * element.quantity
        ).toFixed(2);//set the total amount by multiplying the amount and quantity
        element["purchase_price"] = newValue?.price
          ? newValue?.price
          : newValue;//set the purchase price
        element.margin = "";//set the margin
        element.sell_price = "";//set the sell_price
        element["remark"] = "";//set the remark
      }
      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });//enqueues all of the updates made to the component state and instructs React to re-render the component and its children with the updated state.
  };

  /*Delete the Purchase Order detail */
  const deleteItemFromInvoiceList = (index, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Purchase Details!",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {//If the result.value is true
        let tempItemList = [...state.item];//create the copy of state array
        tempItemList.splice(index, 1);//delete the index wise purchse order detail
        console.log(tempItemList)
        setState({
          ...state,
          item: tempItemList,
        });//enqueues all of the updates made to the component state and instructs React to re-render the component and its children with the updated state.
        // if (id) {//If the purchase order details id exists
        //   // url.delete(`quotation_details/${id}`).then(data);//delete the quotation detail id

        // }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Purchase Details is safe :)", "error");
      }
    });
  };
  // const filterPrice = (options, params) => {

  //   // const filtered = filter(options, params);

  //   // // if (params.inputValue == "") {
  //   //   filtered.push({
  //   //     inputValue: params.inputValue,
  //   //     price: params.inputValue,
  //   //     amount: params.inputValue
  //   //   });
  //   // }
  //   // return filtered;
  // };

  /*Set the quantity and total =(purchase_price *quantity) */
  const calcualteprice = (event, index) => {
    event.persist();
    let tempItemList = [...state.item];//create the copy of state array

    tempItemList.map((element, i) => {//allows you to iterate over an array and modify its elements using a callback function
      let sum = 0;

      if (index === i) {
        element["total_amount"] = (
          event.target.value * element.purchase_price
        ).toFixed(2);//set the purchase price
        element[event.target.name] = event.target.value;//set the quantity text field name
        element["remark"] = "";//set the remark to null
      }

      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });//enqueues all of the updates made to the component state and instructs React to re-render the component and its children with the updated state.
  };

  /* Set the our descriptions */
  const po_description = (event, index) => {
    let tempItemList = [...state.item];//create the copy of state array

    tempItemList.map((element, i) => {//allows you to iterate over an array and modify its elements using a callback function
      // let sum = 0;

      if (index === i) {
        element[event.target.name] = event.target.value;//set the our description
      }

      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });//enqueues all of the updates made to the component state and instructs React to re-render the component and its children with the updated state.
  };

  // const setproductids = (id, index) => {
  //   setcatid(id)
  //   setpartyids(party_id)
  //   setShouldOpenEditorDialog(true)
  // }

  /* Keyboard event */
  const controlKeyPress = (e, id, nextid, prev,dropdown) => {

    if(e.key === 'Enter' && !dropdown){
     
      let i = parseInt(id)
      // const r = ++i + 'product_id';
      // console.log(r)
        try {
          addItemToInvoiceList();
          // if (r.includes('product_id')) {
            inputRef[parseInt(++i)].focus();
            console.log(i)
          // }
        } catch (error) {
          console.log(i)
          // console.log('error')
        }
      //  inputRef[parseInt(r)].focus();
    }


    if (e?.keyCode == 39) {
      if (false) {
        priceRef[parseInt(nextid)].focus();
      } else if (nextid?.includes("description")) {
        descriptionRef[parseInt(nextid)].focus();
      } else if (nextid?.includes("unit_of_measure")) {
        unit_of_measureRef[parseInt(nextid)].focus();
      } else if (nextid?.includes("purschases_price")) {
        console.log(purchase_priceRef[parseInt(nextid)]?.current);
      } else if (nextid?.includes("quantity")) {
        qtyRef[parseInt(nextid)].focus();
      } else if (nextid == null) {
      } else {
        console.log(getRef(nextid).current?.focus());
      }
    } else if (e?.keyCode == 38 && !dropdown) {
      const a = id.split(parseInt(id));
      let i = parseInt(id);
      if (--i >= 0) {
        const r = i + a[1];
        if (r?.includes("purchase_pridce")) {
          priceRef[parseInt(r)].focus();
        } else if (r?.includes("description")) {
          descriptionRef[parseInt(r)].focus();
        } else if (r?.includes("purchase_prsiceRef")) {
          purchase_priceRef[parseInt(r)].focus();
        } else if (r?.includes("unit_of_measure")) {
          unit_of_measureRef[parseInt(r)].focus();
        } else if (r?.includes("quantity")) {
          qtyRef[parseInt(r)].focus();
        } else if (r.includes("product_id")) {
          inputRef[parseInt(r)].focus();
        } else {
          console.log(getRef(r).current?.focus());
        }
      }
    } else if (e?.keyCode == 40 && !dropdown) {
      const a = id.split(parseInt(id));
      let i = parseInt(id);

      const r = ++i + a[1];
      try {
        if (r?.includes("purchasse_price")) {
          priceRef[parseInt(r)].focus();
        } else if (r.includes("product_id")) {
          inputRef[parseInt(r)].focus();
        } else if (r?.includes("description")) {
          descriptionRef[parseInt(r)].focus();
        } else if (r?.includes("unit_of_measure")) {
          unit_of_measureRef[parseInt(r)].focus();
        } else if (r?.includes("purchase_pricseRef")) {
          purchase_priceRef[parseInt(r)].focus();
        } else if (r?.includes("quantity")) {
          qtyRef[parseInt(r)].focus();
        } else {
          console.log(getRef(r).current?.focus());
        }
      } catch (error) {
        console.error("eror");
        // addItemToInvoiceList();
      }
    } else if (e?.keyCode == 37) {
      if (prev == null) {
      } else {
        if (prev.includes("product_id")) {
          inputRef[parseInt(prev)].focus();
        } else if (prev?.includes("description")) {
          descriptionRef[parseInt(prev)].focus();
        } else if (prev?.includes("unit_of_measure")) {
          unit_of_measureRef[parseInt(prev)].focus();
        } else if (prev?.includes("quantity")) {
          qtyRef[parseInt(prev)].focus();
        } else if (prev?.includes("purchasse_pricseRef")) {
          purchase_priceRef[parseInt(prev)].focus();
        } else if (false) {
          priceRef[parseInt(prev)].focus();
        } else {
          console.log(getRef(prev).current?.focus());
        }
      }
    }
  };

  /*Submit the data */
  const handleSubmit = (e) => {
    e.preventDefault()
    setState({ ...state, loading: true });//create the copy of state array disable the save button

    let tempState = { ...state };//copy of state array is assigned to tempState 
    let arr = [];//initialize the arr to emty array
    delete tempState.loading;
    let tempItemList = [...state.item];//create the copy of state array

    formData.append("discount_in_p", 0);//discount in percentage is 0 
    formData.append("total_value", parseFloat(subTotalCost).toFixed(2));//total value 
    formData.append("net_amount", GTotal);//Net amount 
    formData.append("freight", ofreight ? ofreight : freight);//Freight charges
    formData.append("vat_in_value", parseFloat(vat).toFixed(2));//vat in value
    formData.append("freight_charges", parseFloat(charge).toFixed(2));//vat in value
    formData.append("rfq_id", id);//rfq id
    formData.append("po_number", id);//purchase order 
    formData.append("party_id", party_id);//party id
    formData.append("warranty", warranty);//warranty
    formData.append("validity", validity);//validity
    formData.append("delivery_time", delivery_time);//delivery time
    formData.append("inco_terms", inco_terms);//inco terms
    formData.append("payment_terms", payment_terms);//payment terms
    formData.append("contact_id", contactid ? contactid : 0);//contact id
    formData.append("transaction_type", "purchase");//transaction type is purchase
    formData.append("status", "New");//status is New
    
    formData.append("exclude_from_vat", parseInt(vatExclude));
    formData.append("ps_date", Quote_date);//purchase order date 
    formData.append("currency_type", currency_type);//currency type
    formData.append("id", id);//purchase order id
    tempItemList.map((answer, i) => {//allows you to iterate over an array and modify its elements using a callback function
      formData.append(`quotation_detail${i}`, JSON.stringify(answer));//append the puchase order details
    });
    const json = Object.assign({}, arr);
   

    url
      .post(`purchaseUpdate`, formData)
      .then((response) => {
        Swal.fire({
          title: "Success",
          type: "success",
          icon: "success",
          text: "Data saved successfully.",
        });
        history.push("/PoTab/0");
      })
      .catch(function (error) {
        Swal.fire({
          title: "Error",
          type: "error",
          icon: "warning",
          text: "Something Went Wrong.",
        }).then((result) => {
          setState({ ...state, loading: false });//disable the save button
        });
      });
  };

  /*Cancel form */
  function cancelform() {
    history.push(navigatePath + "/poTab/0");
  }

  /*Close the dialogBox */
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    setIsAlive(true);
  };

  function handleChange(newValue) {
    setDataList(newValue);
  }

  /* CloseAnnexure Dialog Box */
  const handleDialogCloseAnnexure = () => {
    setShouldOpenEditorDialogAnnexure(false);
  };
  const [data, setData] = useState([]);

  const [uom, setUOM] = useState(false);//set the unit of measure

  useEffect(() => {
   
    url.get(`mjrPurchase/${localStorage.getItem('division')}/${id}`).then(({ data }) => {
      setData(data?.uom);
      setproList(data?.products.filter(obj => obj.div_id == localStorage.getItem('division')))
      setproListAll(data?.products.filter(obj => obj.div_id == localStorage.getItem('division')))
      setvalues({
        ...values,
        vendorList: data?.vendor,
        status: true
      })

      setPriceList(data?.productPrice)

      setcname(data?.sales?.party?.firm_name)

      // setvalues({ ...values, status: true });
      setcontactname(data?.sales?.contact?.fname)
      setQuote_date(moment(data?.sales.ps_date).format('DD MMM YYYY'))
      updateCont(data?.sales?.party_id, data?.sales.contact?.id);
      setcurrency_type(data?.sales?.currency_type)
      setcharge(data?.sales?.freight_charges)
      settotal(data?.sales?.net_amount)
      setpayment_terms(data?.sales?.payment_terms)
      console.log(data?.sales?.freight_type)
      if(data?.sales?.freight_type == 'Air Freight' || data?.sales?.freight_type == 'Sea Freight' || data?.sales?.freight_type == 'Road Freight'){
        setfreight(data?.sales?.freight_type)
      }else{
        setfreight('Other')
        setShowOther('Other')
        setOfreight(data?.sales?.freight_type)
      }
     
      setVatExclude(parseInt(data?.sales?.exclude_from_vat))
      setinco_terms(data?.sales?.inco_terms)
      setdelivery_time(data?.sales?.delivery_time)
      setState({
        ...state,
        item: data?.sales?.quotation_details,
      });

    });


    // url.get("products").then(({ data }) => {
    //   setproList(data.filter(obj => obj.div_id == localStorage.getItem('division')))

    // });
    // getVendorList().then(({ data }) => {
    //   setvalues({
    //     ...values,
    //     vendorList: data,
    //     status: true
    //   })



    // });
    // url.get("product-price").then(({ data }) => {
    //   setPriceList(data)
    // });
    // url.get("purchase-quotation/" + id).then(({ data }) => {
    //   // setparty_id(data[0]?.party_id)
    //   setcname(data[0]?.party?.firm_name)

    //   // setvalues({ ...values, status: true });
    //   setcontactname(data[0]?.contact?.fname)
    //   setQuote_date(moment(data[0].ps_date).format('DD MMM YYYY'))
    //   updateCont(data[0]?.party_id, data[0].contact?.id);
    //   setcurrency_type(data[0]?.currency_type)
    //   setcharge(data[0]?.vat_in_value)
    //   settotal(data[0]?.net_amount)
    //   setState({
    //     ...state,
    //     item: data[0]?.quotation_details,
    //   });
    // });

    return setIsAlive(false)
  }, []);

  // const setMargin = (id, index, name) => {

  //   setproductid(id)
  //   setproductname(name)
  //   setindex(index)
  //   setShouldOpenEditorDialog(true);

  // }
  /* set the contact person when party is selected */
  const setcontact = (event, newValue) => {
    if (newValue?.id) {
      url.get("parties/" + newValue?.id).then(({ data }) => {
        setcontacts(data[0].contacts);
        setpayment_terms(data[0]?.payment_term ? data[0]?.payment_term : '100% Advance')

        setparty_id(newValue?.id);
        setcname(newValue.firm_name);
        setcontactname();

        setvalues({ ...values, status: true });
      });
    } else {
      setcontacts([]);
      setparty_id();

      setvalues({ ...values, status: false });
    }
  };

  const updateCont = async (id, cid) => {
    await url.get("parties/" + id).then(({ data }) => {
      setcontacts(data[0].contacts);
      setparty_id(id);
      setcontactid(cid);
    });
  };

  let subTotalCost = 0;
  let GTotal = 0;
  let dis_per = 0;
  let {
    item: invoiceItemList = [],
    quote: quoteList = [],
    status,
    vat,
    loading,
  } = state;

  return (
    <div className="m-sm-30">
      <Card elevation={3}>
        <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
          <ValidatorForm
            autocomplete="off"
            onSubmit={e => { e.preventDefault(); }}
            onError={(errors) => null}
          >
            <div className="viewer_actions px-4 flex justify-between">
              <div className="mb-6">
                <h4 align="left"> UPDATE PURCHASE ORDER</h4>
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
                  onClick={() => {setVatExclude(0)}}
                >
                  <Icon>check_circle_outline</Icon> VAT EXCLUDED
                </Button>

                </> : <>
                <Button
                  className="mr-4 py-2"
                  variant="outlined"
                  color="primary"
                  onClick={()=>{setVatExclude(1)}}
                >
                  <Icon>error_outline</Icon> EXCLUDE FROM VAT
                </Button>

                </>}
                <Button
                  // type="submit"
                  className="py-2"
                  variant="outlined"
                  color="primary"
                  onClick={(e)=>{handleSubmit(e)}}
                  disabled={loading}
                >
                  <Icon>save</Icon> SAVE & PRINT PURCHASEORDER
                </Button>
              </div>
            </div>

            <Grid container spacing={2} className="p-4">
              <Grid item>
                <TextField
                  label="Currency Type"
                  style={{ minWidth: 200, maxWidth: "250px" }}
                  name="party_id"
                  size="small"
                  variant="outlined"
                  value={currency_type}
                  onChange={(event) => setcurrency_type(event.target.value)}
                  required
                  select
                >
                  {currency.map((item) => (
                    <MenuItem value={item.value} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <Autocomplete
                  id="filter-demo"
                  variant="outlined"
                  options={values?.vendorList}
                  value={cname}
                  style={{ minWidth: 350, maxWidth: "350px" }}
                  getOptionLabel={(option) =>
                    option.firm_name ? option?.firm_name : cname
                  }
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== " ") {
                      filtered.unshift({
                        inputValue: params.inputValue,
                        firm_name: (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() =>
                              history.push(navigatePath + "/party/addparty")
                            }
                          >
                            +Add New
                          </Button>
                        ),
                      });
                    }

                    return filtered;
                  }}
                  onChange={(event, newValue) => setcontact(event, newValue)}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      value={cname}
                      label="Vendor Name"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  id="filter-demo"
                  variant="outlined"
                  options={contacts}
                  value={contactname}
                  style={{ minWidth: 250, maxWidth: "300px" }}
                  getOptionLabel={(option) =>
                    option.fname
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
                            onClick={() =>
                              history.push(navigatePath + "/party/addparty")
                            }
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
                      value={cname}
                      label="Contact Person"
                    />
                  )}
                />
              </Grid>
              <Grid item>
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
                      setQuote_date(moment(date).format("DD MMM YYYY"));
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>

            <Divider />

            <Table className="mb-4" style={{ width: "100%" }}>
              <TableHead>
                <TableRow className="bg-default">
                  <TableCell
                    className="pl-2"
                    style={{ width: 100 }}
                    align="center"
                  >
                    S.NO.
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "250px" }}>
                    ITEM
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "250px" }}>
                    OUR DESCRIPTION
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "100px" }}>
                    QTY
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "130px" }}>
                    UOM
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "150px" }}>
                    PRICE
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "150px" }}>
                    TOTAL
                  </TableCell>

                  <TableCell className="pr-2" style={{ textAlign: "right" }}>
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceItemList?.map((item, index) => {
                  if (!dstatus) {
                    subTotalCost += parseFloat(item?.total_amount);
                    // vat = ((subTotalCost * 15) / 100).toFixed(2);
                    vat = vatExclude ? 0 : parseFloat((subTotalCost * 15) / 100).toFixed(2)


                    GTotal = parseFloat(subTotalCost) + parseFloat(charge) + parseFloat(vat);
                  } else {
                    subTotalCost += parseFloat(item?.total_amount);
                    dis_per = parseFloat(
                      (discounts * subTotalCost) / 100
                    ).toFixed(2);
                    // vat = (
                    //   ((subTotalCost -
                    //     parseFloat((discounts * subTotalCost) / 100)) *
                    //     15) /
                    //   100
                    // ).toFixed(2);
                    vat = vatExclude ? 0 : parseFloat((subTotalCost * 15) / 100).toFixed(2)


                    GTotal = parseFloat(subTotalCost) + parseFloat(charge) + parseFloat(vat);
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell
                        className="pl-2 capitalize"
                        align="center"
                        style={{ width: 100 }}
                      >
                        {index + 1}
                      </TableCell>

                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "250px" }}
                      >
                        <Autocomplete
                          className="w-full"
                          size="small"
                          options={proList ? proList : []}
                          name="product_id"
                          value={item?.description}
                          multiline
                          getOptionLabel={(option) => {
                            // e.g value selected with enter, right from the input
                            if (typeof option === "string") {
                              return option;
                            }
                            if (option.inputValue) {
                              return option.inputValue;
                            }
                            return option?.name
                              ? option?.name
                              : item?.description
                              ? item?.description
                              : "";
                          }}
                          freeSolo
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "product_id",
                              index + "description",
                              null,
                              true
                            );
                          }}
                          inputProps={{
                            ref: setRef(index + "product_id"),
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              multiline
                              inputRef={input => {
                                inputRef[index] = input;
                              }}
                              name="product_id"
                              // onInputChange={(event, newValue) =>
                              //   handleChanges(event, newValue, index)
                              // }
                              
                              required
                              fullWidth
                            />
                          )}
                          onChange={(event, newValue) =>
                            handleChanges(event, newValue, index)
                          }
                          onKeyUp={(event, newValue) =>
                            handleChanges(event, newValue, index)
                          }
                         
                        />
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "250px" }}
                      >
                        <TextField
                          label="Our description"
                          type="text"
                          variant="outlined"
                          size="small"
                          name="descriptionss"
                          required
                          inputRef={(input) => {
                            descriptionRef[index] = input;
                          }}
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "description",
                              index + "quantity",
                              index + "product_id",
                              true
                            );
                          }}
                          multiline
                          fullWidth
                          onChange={(event) => po_description(event, index)}
                          value={item?.descriptionss ? item?.descriptionss : ""}
                        />
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "100px" }}
                      >
                        <TextValidator
                          label="Qty"
                          onChange={(event) => calcualteprice(event, index)}
                          type="text"
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                          }}
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "quantity",
                              index + "unit_of_measure",
                              index + "description"
                            );
                          }}
                          inputRef={(input) => {
                            qtyRef[index] = input;
                          }}
                          name="quantity"
                          value={item?.quantity ? item?.quantity : ""}
                          validators={["isNumber"]}
                          errorMessages={["Input is not Valid"]}
                        />
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "150px" }}
                      >
                        <TextField
                          label="UOM"
                          required
                          type="text"
                          variant="outlined"
                          size="small"
                          name="unit_of_measure"
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "unit_of_measure",
                              index + "purchase_price",
                              index + "quantity",
                              true
                            );
                          }}
                          inputRef={(input) => {
                            unit_of_measureRef[index] = input;
                          }}
                          style={{ width: "100%", float: "left" }}
                          fullWidth
                          value={
                            item?.unit_of_measure ? item?.unit_of_measure : null
                          }
                          onChange={(event) => po_description(event, index)}
                          select
                        >
                          <MenuItem
                            onClick={(e) => {
                              setUOM(true);
                            }}
                          >
                            <Icon>add</Icon> ADD UOM
                          </MenuItem>

                          {data?.map((item, ind) => (
                            <MenuItem value={item?.value} key={item}>
                              {item?.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "100px" }}
                      >
                        <CurrencyTextField
                          className="w-full"
                          size="small"
                          name="purchase_price"
                          value={
                            isNaN(item?.purchase_price)
                              ? 0
                              : parseFloat(item?.purchase_price)
                          }
                          currencySymbol=""
                          variant="outlined"
                          label="Price"
                          inputProps={{
                            ref: setRef(index + "purchase_price"),
                          }}
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "purchase_price",
                              index + "total_amount",
                              index + "unit_of_measure"
                            );
                          }}
                          inputRef={(input) => {
                            purchase_priceRef[index] = input;
                          }}
                          onChange={(event, newValue) =>
                            handleIvoiceListChange(event, index, newValue)
                          }
                        />
                      </TableCell>

                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "120px" }}
                      >
                        <CurrencyTextField
                          className="w-full"
                          label="Total"
                          readOnly
                          variant="outlined"
                          fullWidth
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "total_amount",
                              null,
                              index + "purchase_price"
                            );
                          }}
                          inputProps={{
                            ref: setRef(index + "total_amount"),
                          }}
                          size="small"
                          currencySymbol=""
                          name="total_amount"
                          value={item?.total_amount ? item?.total_amount : ""}
                        />
                      </TableCell>

                      <TableCell
                        className="pl-2 capitalize"
                        align="left"
                        style={{ textAlign: "right" }}
                      >
                        <Icon
                          color="error"
                          fontSize="small"
                          onClick={() =>
                            deleteItemFromInvoiceList(index, item?.id)
                          }
                        >
                          delete
                        </Icon>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="flex justify-end px-4 mb-4">
              <Button
                className="mt-4 py-2"
                color="primary"
                variant="contained"
                size="small"
                onClick={addItemToInvoiceList}
              >
                <Icon>add</Icon>Add Item
              </Button>
            </div>

            <h6 className="pl-4">
              <strong>Terms</strong>
            </h6>
            <div className="px-4 flex justify-between">
              <div className="flex">
                <div className="pr-12">
                  {/* <p
                    className="mb-8"
                    style={{ position: "relative", top: "10px" }}
                  >
                    Quotation Validity:
                  </p> */}
                  <p
                    className="mb-8"
                    style={{ position: "relative", top: "10px" }}
                  >
                    Payment Terms:
                  </p>
                  <p
                    className="mb-8"
                    style={{ position: "relative", top: "13px" }}
                  >
                    Freight type:
                  </p>
                  {showother == 'Other' && <>
                  <p className="mb-8" style={{ position: 'relative', top: '13px' }}>Other Freight type:</p>
                  </>}
                  <p
                    className="mb-8"
                    style={{ position: "relative", top: "14px" }}
                  >
                    Delivery Time:
                  </p>
                  <p
                    className="mb-8"
                    style={{ position: "relative", top: "14px" }}
                  >
                    Inco-Term:
                  </p>
                </div>
                <div>
                  {/* <TextValidator
                    label="Quotation Validity"
                    className="mb-4"
                    type="text"
                    variant="outlined"
                    size="small"
                    style={{ width: 500 }}
                    onChange={(e) => setvalidity(e.target.value)}
                    value={validity}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  /> */}
                  <TextValidator
                    label="Payment Terms"
                    className="mb-4"
                    onChange={(e) => setpayment_terms(e.target.value)}
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
                    label="Freight"
                    onChange={(e)=>{setfreight(e.target.value);
                      if(e.target.value == 'Other'){ setShowOther('Other') }else{setShowOther(''); setOfreight('')}} }
                    className="mb-4"
                    type="text"
                    variant="outlined"
                    size="small"
                    select
                    name="net_amount"
                    style={{ width: 500 }}
                    value={freight}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  >
                    <MenuItem value='Air Freight'>Air Freight</MenuItem>
                    <MenuItem value='Sea Freight'>Sea Freight</MenuItem>
                    <MenuItem value='Road Freight'>Road Freight</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                  </TextValidator>
                  {showother == 'Other' && <>
                    <TextValidator
                    label="Freight"
                    className="mb-4"
                    onChange={e => setOfreight(e.target.value)
                    }
                    type="text"
                    variant="outlined"
                    size="small"
                    style={{ width: 500 }}
                    name="net_amount"
                    value={ofreight}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  
                  </>}

                  <TextValidator
                    label="Delivery Time"
                    className="mb-4"
                    onChange={(e) => setdelivery_time(e.target.value)}
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
                    onChange={(e) => setinco_terms(e.target.value)}
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
                <div className="flex ">
                  <div className="pr-12">
                    <p className="mb-8">Total Amount ({currency_type}) :</p>

                    <p className="mb-8">Freight Charges ({currency_type})</p>
                    <p className="mb-8">VAT (15%) ({currency_type})</p>

                    <strong>
                      <p
                        className="mb-8"
                        style={{ position: "relative", top: "-4px" }}
                      >
                        Net Total ({currency_type})
                      </p>
                    </strong>
                  </div>
                  <div>
                    {/* <p className="mb-4" align="right">
                      {subTotalCost
                        ? subTotalCost.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })
                        : "0.00"}
                    </p> */}
                    
                    <CurrencyTextField
                      className="w-full mb-4"
                      label="Total Amount"
                      variant="outlined"
                      fullWidth
                      size="small"
                      currencySymbol={currency_type}
                      
                      
                      value={subTotalCost
                        ? subTotalCost.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })
                        : "0.00"}
                        readOnly
                    />
                    <div>

                    <CurrencyTextField
                      className="w-full mb-4"
                      label="Freight Charges"
                      variant="outlined"
                      fullWidth
                      size="small"
                      currencySymbol={currency_type}
                      name="vat"
                      onChange={(e, value) => {
                        setcharge(value);
                        settotal(value + subTotalCost);
                      }}
                      value={charge}
                    />
                    </div>
 <div>
                      <CurrencyTextField
                        className="w-full mb-4"
                        label="VAT"
                        variant="outlined"
                        fullWidth
                        readOnly
                        size="small"
                        currencySymbol={currency_type}
                        name="vat_amount"
                        value={vat}
                      />
                    </div>
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4"
                        label="Grand Total"
                        readOnly
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol={currency_type}
                        name="net_amount"
                        value={charge ? GTotal : GTotal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </div>
      </Card>

      {shouldOpenEditorDialog && (
        <MemberEditorDialog
          handleClose={handleDialogClose}
          contactid={status}
          open={shouldOpenEditorDialog}
          catid={catid}
          partyids={partyids}
          productprice={setproductprice}
        />
      )}

      {shouldOpenConfirmationDialogparty && (
        <MemberEditorDialogcontact
          open={shouldOpenConfirmationDialogparty}
          onConfirmDialogClose={handleDialogClose}
          handleClose={() => {
            setshouldOpenConfirmationDialogparty(false);
            setIsAlive(false);
          }}
          customercontact={setcontacts}
          partyid={party_id}
          text="Are you sure to delete?"
        />
      )}

      {uom && (
        <UOMDialog
          open={uom}
          handleClose={() => {
            setUOM(false);
          }}
          setData={setData}
        />
      )}
      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}
          text="Are you sure to delete?"
        />
      )}
      {shouldOpenEditorDialogAnnexure && (
        <Annexure
          handleClose={handleDialogClose}
          onChange={handleChange}
          value={DataList}
          open={shouldOpenEditorDialogAnnexure}
          handleDialogClose={handleDialogCloseAnnexure}
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
  date: new Date(),
  currency: "",
  loading: false,
};

export default QuickPo;
