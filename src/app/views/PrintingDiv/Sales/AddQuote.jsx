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
  FormGroup
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import { getCustomerList} from "../invoice/InvoiceService";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import useAuth from "app/hooks/useAuth";
import url, { getusers, divisionId, getCustomerList, data, getcompanybank, navigatePath } from "../../invoice/InvoiceService";

// expandable table

// import Select from 'react-select';
import Swal from "sweetalert2";
import { ConfirmationDialog } from "matx";
// import FormDialog from "../product/productprice";
// import MemberEditorDialog from "../product/productprice";
import FormDialog_product from "../../../views/product/Addproduct_popup"
// import MemberEditorDialog_product from "../../views/product/Addproduct_popup";
import moment from "moment";
import CurrencyTextField from "@unicef/material-ui-currency-textfield/dist/CurrencyTextField";
import { Response } from "cross-fetch";
import { Subject } from "@material-ui/icons";
import MemberEditorDialog from '../../party/partycontact';
import { element } from "prop-types";






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
const useStyles = makeStyles(({ palette, ...theme }) => ({
  QuickQuote: {
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

const QuickQuote = ({ isNewInvoice, toggleInvoiceEditor }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(initialValues);
  const [rfq, setrfq] = useState([]);
  const [rdate, setrdate] = useState([]);
  const [ddate, setddate] = useState([]);
  const [cname, setcname] = useState('abcd');
  const [party_id, setparty_id] = useState('');
  const [rfq_details, setrfqdetails] = useState([]);
  const [testArr, setTestArr] = useState([{ 'note': 'Quoted prices are for complete lot,any partial order is subject to reconfirmation.' }, { 'note': 'This is a system generated quote and hence does not required any signature.' }])
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
  const [productid, setproductid] = useState('');
  const [unit_of_measure, setunit_of_measure] = useState('');
  const [companybank, setcompanybank] = useState([]);
  const [bank_id, setbank_id] = useState('');
  const [indexset, setindex] = useState(0);
  const [productname, setproductname] = useState('');
  const [indexvalue, setindexvalue] = useState();
  const [CustomerList, setCustomerList] = useState([]);
  const [partyDivision, setpartyDivision] = useState([]);
  const [customercontact, setcustomercontact] = useState([]);
  const [rfqstatus, setrfqstatus] = useState(false);
  const [users, setusers] = useState([]);
  const [sign, setsign] = useState();
  const [rfq_no, setrfq_no] = useState('');
  const routerHistory = useHistory();
  const { id } = useParams();
  const { user, division } = useAuth();
  const classes = useStyles();
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenEditorDialogproduct, setshouldOpenEditorDialogproduct] = useState(false);
  const [Quote_date, setQuote_date] = useState(moment(new Date()).format('DD MMM YYYY'))
  const [transport, settransport] = useState('0.00')
  const [other, setother] = useState('0.00')
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const [
    shouldOpenConfirmationDialogproduct,
    setshouldOpenConfirmationDialogproduct,
  ] = useState(false);
  const [
    shouldOpenConfirmationDialogparty,
    setshouldOpenConfirmationDialogparty,
  ] = useState(false);

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);
  const [catid, setcatid] = useState('')
  const [subject, setsubject] = useState('')
  const [productprice, setproductprice] = useState([])
  const formData = new FormData()


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

  const addItemToInvoiceList = () => {
    let tempItemList = [...state.item];

    tempItemList.push({
      product_id: "",
      src: '',
      description: "",
      descriptions: "",
      product_description: "",
      uom: "",
      quantity: parseFloat(0),
      product_price_list: [
        {
          price: ""
        }
      ],
      purchase_price: parseFloat(0.00).toLocaleString(undefined, {
        minimumFractionDigits: 2
      }),
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

  const deleteItemFromNoteList = (index) => {
    let tempItemList = [...testArr];
    tempItemList.splice(index, 1);

    setTestArr([...tempItemList])
  }



  const calculatemargin = (event, index, value) => {
    let tempItemList = [...state.item];
    let d_val = value ? value : event.target.value;
    tempItemList.map((element, i) => {
      let sum = 0;



      if (index == i) {


        element['margin'] = ((parseFloat(d_val) - parseFloat(element.purchase_price)) / parseFloat(element.purchase_price)) * 100;

        element.margin_val = ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)

        // console.log((parseFloat(event.target.value)-parseFloat(element.purchase_price))/parseFloat(element.purchase_price)*100)
        element.sell_price = parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3));
        // element['discount']=((parseFloat(element.purchase_price)*parseFloat(element.margin))/100)*parseFloat(element.quantity);
        element.total_amount = ((parseFloat(element.sell_price) * element.quantity).toFixed(2));
        element.discount_val = ((parseFloat(parseFloat(element.d_val) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))
        console.log(((parseFloat(parseFloat(element.d_val) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)))

      }
      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }



  const calcualtep = (event, index, value) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {


        element[event.target.name] = value ? value : event.target.value;

        element.sell_price = parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3));
        element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
        element.cost_qty = ((element.purchase_price) * element.quantity).toFixed(2);
        element.margin_val = ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)
        element.discount_val = ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))
        console.log(element.margin)
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


        element[event.target.name] = value ? value : event.target.value;
        element.sell_price = parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3) - (parseFloat(parseFloat(event.target.value) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3);

        element.total_amount = ((element.sell_price) * element.quantity).toFixed(2);
        element.cost_qty = ((element.purchase_price) * element.quantity).toFixed(2);
        element.discount_val = ((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3) * parseFloat(element.quantity))
        console.log(((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price) / 100) + parseFloat(element.purchase_price)).toFixed(3)) / 100)).toFixed(3)))


      }

      return element;

    });

    setState({
      ...state,
      item: tempItemList,
    });
  }

  const handleSubmit = () => {

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
    arr.inco_terms = inco_terms
    arr.payment_terms = payment_terms
    arr.contact_id = contactid
    arr.ps_date = Quote_date
    arr.rfq_id = null
    arr.currency_type = "SAR"
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
    formData.append('rfq_id', 0)
    formData.append('transaction_type', "sale")
    formData.append('sign', sign)
    formData.append('notes', JSON.stringify(testArr))
    formData.append('bank_id', bank_id)
    formData.append('subject', subject)
    formData.append('rfq_no', rfq_no ? rfq_no : " ")
    formData.append('transport', transport)
    formData.append('other', other)
    formData.append('div_id', localStorage.getItem('division'))
    formData.append('user_id', user.id)


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
            routerHistory.push(navigatePath + "/print_quote_tab")
          })
      })
      .catch(function (error) {

      })
  };
  function cancelform() {
    routerHistory.push(navigatePath + "/quoateview")
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
      // console.log(data)
      setCustomerList(data);


    });
    getusers().then(({ data }) => {
      setusers(data)
      setsign(user.name)
    })
    getcompanybank().then(({ data }) => {
      setcompanybank(data);
    });


    url.get("products").then(({ data }) => {
      setproList(data)




    });
    // console.log("division"+user.division);

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

  let costTotal = 0;
  let totalmargin = 0;
  let margin_per = 0;
  let margin_val = 0;
  let subTotalCost = 0;
  let sellTotal = 0;
  let subCost = 0;
  let GTotal = 0;
  let dis_per = 0;
  let dis_val = 0;
  let totaldiscount = 0;
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
        <div className={clsx("invoice-viewer py-4", classes.QuickQuote)}>
          <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
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
                  type="submit"
                  className="py-2"
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                >
                  <Icon>save</Icon> SAVE & PRINT QUOTATION
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


                  onClick={(event) => setcontact(event)}
                  required
                  select
                >
                  <MenuItem onClick={() => {
                    routerHistory.push("/party/addparty");
                  }}>

                    <Icon>add</Icon>New

                  </MenuItem>

                  {CustomerList.filter(obj => obj.party_division[0]?.div_id === divisionId).map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.firm_name}
                    </MenuItem>
                  ))}
                  {/* {CustomerList.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.firm_name}
                      </MenuItem>
                    ))} */}

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
                    <MenuItem>
                      <Button onClick={() => setshouldOpenConfirmationDialogparty(true)}><Icon>add</Icon>New</Button>
                    </MenuItem>
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
                      // return date
                    }}

                  >

                  </TextField>
                  {/* <h5 className="font-normal">
                <strong>Quote Date: </strong>
              </h5> */}
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
                        // return date
                      }}
                    />
                  </MuiPickersUtilsProvider>


                </div>

              </div>
            </div>
            <div>
              {/* <div style={{display:'inline-block'}}><h6 className="px-4"><strong>Subject</strong></h6></div> */}
              <div className="pl-4">
                <h5 className="font-normal capitalize">
                  <strong>Subject: </strong>{" "}

                </h5>
                <TextValidator
                  label="Subject"
                  className="mb-4"
                  type="text"
                  variant="outlined"
                  size="small"
                  style={{ width: 500 }}
                  onChange={e => setsubject(e.target.value)
                  }
                  value={subject}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                /></div>
            </div>

            <Divider />

            <Table className="mb-4">
              <TableHead>
                <TableRow className="bg-default">
                  <TableCell className="pl-sm-24" style={{ width: 70 }} align="left">S.NO.</TableCell>
                  <TableCell className="px-0" style={{ width: '50px' }}></TableCell>
                  {/* <TableCell className="px-0" style={{width:'150px'}}>ITEM NAME</TableCell> */}
                  {/* <TableCell className="px-0" style={{width:'150px'}} align="center">RFQ DESCRIPTION</TableCell> */}
                  <TableCell className="px-0" style={{ width: '150px' }} align="center">OUR DESCRIPTION</TableCell>
                  <TableCell className="px-0" style={{ width: '70px' }} align="center">QUANTITY</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }} align="center">UOM</TableCell>
                  <TableCell className="px-0" style={{ width: '150px' }} align="center">PRICE</TableCell>
                  <TableCell className="px-0" style={{ width: '80px' }} align="center">MARGIN %</TableCell>
                  <TableCell className="px-0" style={{ width: '80px' }} align="center">DISCOUNT %</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }} align="center">SELL PRICE</TableCell>
                  <TableCell className="px-0" style={{ width: '100px' }} align="center">TOTAL</TableCell>
                  {/* <TableCell className="px-0"style={{width:'140px'}}>REMARK</TableCell> */}
                  <TableCell className="px-0" style={{ width: '50px' }} ><Icon>delete</Icon></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceItemList.map((item, index) => {

                  if (!dstatus) {
                    costTotal += parseFloat(item.purchase_price) * parseFloat(item.quantity);
                    totalmargin += parseFloat(item.margin);

                    // subCost += parseFloat(item.total_amount)
                    // subTotalCost = parseFloat(subCost)+parseFloat(other)+parseFloat(transport)

                    // margin_per=((subCost-costTotal)/costTotal)*100;

                    margin_val += ((item.margin_val));

                    margin_per = (margin_val / costTotal) * 100;
                    subCost = costTotal + margin_val;
                    subTotalCost = parseFloat(subCost) + parseFloat(other) + parseFloat(transport)

                    // margin_val=((subCost-costTotal));
                    dis_val += (item.discount_val)


                    dis_per = ((parseFloat(dis_val) / parseFloat(subCost)) * 100).toFixed(3);



                    sellTotal = subTotalCost - dis_val
                    vat = (((parseFloat(sellTotal) - parseFloat(other + transport)) * 15) / 100).toFixed(2);

                    // GTotal=(subTotalCost+(subTotalCost * 15) / 100).toFixed(2);
                    GTotal = (parseFloat(vat) + parseFloat(sellTotal))

                  }
                  else {
                    costTotal += parseFloat(item.purchase_price) * parseFloat(item.quantity);
                    totalmargin += parseFloat(item.margin);

                    // subCost += parseFloat(item.total_amount)
                    // subTotalCost = parseFloat(subCost)+parseFloat(other)+parseFloat(transport)

                    // margin_per=((subCost-costTotal)/costTotal)*100;

                    margin_val += ((item.margin_val));

                    margin_per = (margin_val / costTotal) * 100;
                    subCost = costTotal + margin_val;
                    subTotalCost = parseFloat(subCost) + parseFloat(other) + parseFloat(transport)

                    // margin_val=((subCost-costTotal));
                    dis_val += (item.discount_val)


                    dis_per = ((parseFloat(dis_val) / parseFloat(subCost)) * 100).toFixed(3);



                    sellTotal = subTotalCost - dis_val
                    vat = (((parseFloat(sellTotal) - parseFloat(other + transport)) * 15) / 100).toFixed(2);

                    // GTotal=(subTotalCost+(subTotalCost * 15) / 100).toFixed(2);
                    GTotal = (parseFloat(vat) + parseFloat(sellTotal))

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
                      {/* <TableCell className="pl-0 capitalize" align="left" style={{width:'150px'}}>
                    <TextValidator
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
                    </TextValidator>
                  </TableCell>
                   */}

                      {/* <TableCell className="pl-0 capitalize" align="left" style={{width:'150px'}}>
                    <TextField
                      label="description"
                      required
                      onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      name="description"
                      fullWidth
                      variant="outlined"
                      // inputProps={{style: {textTransform: 'capitalize'}}}
                      multiline
                      size="small"
                      value={item? item.description: null}
                      
                    />
                  </TableCell> */}
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '150px' }}>
                        <TextField
                          label="Our description"
                          required
                          // onChange={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          onChange={(event) => handleIvoiceListChange(event, index)}
                          variant="outlined"

                          size="small"
                          name="descriptionss"
                          // inputProps={{style: {textTransform: 'capitalize'}}}
                          fullWidth
                          multiline
                          value={item.descriptionss ? item.descriptionss : ""}

                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                        <TextValidator
                          label="Qty"
                          onChange={(event) => calcualtep(event, index)}
                          type="number"
                          requried
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputProps={{ min: 0, style: { textAlign: 'center' } }}

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
                          variant="outlined"
                          validators={[
                            "required",
                          ]}
                          fullWidth
                          errorMessages={["this field is required"]}
                          select
                        // validators={["required"]}
                        // errorMessages={["this field is required"]}
                        >
                          {data.map((item, ind) => (
                            <MenuItem value={item.value} key={item}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
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
                      {/* {<><FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Price</InputLabel> */}
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '100px' }}>
                        <CurrencyTextField
                          // native

                          // onChange={handleChange}
                          required
                          variant="outlined"
                          currencySymbol="SAR"
                          decimalPlaces={3}
                          onChange={(event, value) => calcualtep(event, index, value)}
                          value={item.purchase_price}
                          label="Price"
                          size="small"
                          inputProps={{
                            name: 'purchase_price',
                            id: 'outlined-age-native-simple',
                            style: { textAlign: 'right' }
                          }}


                        >
                          {/* <option></option>
          
       
          {item.product_price_list.map((item, id) => (
          <optgroup label={item.firm_name} style={{fontSize:12}}>
            <option value={item.price}>{item.price}</option>
          </optgroup>
          ))} */}

                        </CurrencyTextField>
                        {/* </FormControl> */}
                        {/* {item.product_id?(<Tooltip title="add price"><Icon onClick={()=>setproductids(item.product_id,index)}>add</Icon></Tooltip>):''}</>} */}








                      </TableCell>



                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                        <TextValidator
                          label="Margin"
                          onChange={(event) => calcualtep(event, index)}
                          // onBlur={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          decimalPlaces={2}
                          variant="outlined"
                          inputProps={{ min: 0, style: { textAlign: 'center' } }}
                          size="small"
                          name="margin"
                          // style={{width:'75%',float:'left'}}
                          fullWidth
                          value={item.margin}
                          validators={["required"]}
                          errorMessages={["this field is required"]}

                        />


                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                        <TextValidator
                          label="Discount"
                          onChange={(event) => discountPer(event, index)}
                          // onBlur={(event) => handleIvoiceListChange(event, index)}
                          type="text"
                          decimalPlaces={2}
                          variant="outlined"
                          inputProps={{ min: 0, style: { textAlign: 'center' } }}
                          size="small"
                          name="discount"
                          // style={{width:'75%',float:'left'}}
                          fullWidth
                          value={item.discount}
                          validators={["required"]}
                          errorMessages={["this field is required"]}

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
                          decimalPlaces={3}
                          variant="outlined"
                          fullWidth
                          size="small"
                          currencySymbol="SAR"
                          name="sell_price"
                          value={item.sell_price}
                          onBlur={(e, value) => calculatemargin(e, index, value)}
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
                          currencySymbol="SAR"
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
            {/* {testArr.map((item, index) => {
              
              return (
                <div>
                
                     <TextField  label={'Note'}
                  className="mb-4 ml-4"
                  multiline
                  type="text"
                  variant="outlined"
                  value={item.note}
                  size="small"
                  style={{width:500}}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
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



                  <p className="mb-6">Quotation Validity:</p>
                  <p className="mb-8">payment Terms:</p>
                  <p className="mb-10">Warranty:</p>
                  <p className="mb-10">Delivery Time:</p>
                  <p className="mb-8">Inco-Term:</p>
                  <p className="mb-8">Signature:</p>
                  <p className="mb-8">Bank:</p>


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
                  <FormGroup>
                    <FormControl variant="outlined" minWidth="120" size="small">
                      <InputLabel htmlFor="outlined-age-native-simple" className="mr-5" width="20px">Signature</InputLabel>
                      <Select
                        native
                        required
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
                          <option value={item.id} defaultValue={item.id}>{item.name}</option>
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
                        required
                        value={bank_id}
                        // onChange={handleChange}
                        onChange={e => setbank_id(e.target.value)}
                        size="small"
                        label="Bank"
                        inputProps={{
                          name: 'Bank',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option value="" disabled>
                          --select--
                        </option>
                        {companybank.map((item, ind) => (
                          <option value={item.id}>{item.name}-{item.ac_no}</option>
                        ))}
                      </Select>
                    </FormControl>

                  </FormGroup>



                </div>


              </div>
              <div className="pl-4 pr-4 pb-4  flex justify-end">
                <div className="flex " >
                  <div className="pr-12">
                    <p className="mb-8">Total Cost:</p>
                    <p className="mb-8">Margin%:</p>
                    <p className="mb-8 pt-0">Sub Total:</p>
                    <p className="mb-8">Transport:</p>
                    <p className="mb-8">Other:</p>
                    <p className="mb-8 pt-0">Net Total:</p>
                    <p className="mb-8">Discount:</p>
                    <p className="mb-8">Selling Total:</p>
                    <p className="mb-8 pt-2">VAT(15%):</p>
                    {/* <p className="mb-5">currency:</p> */}
                    <strong>
                      <p className="mb-8">Grand Total:</p>
                    </strong>
                  </div>
                  <div>

                    {/* <p className="mb-4">{costTotal?parseFloat(costTotal).toLocaleString(undefined,{minimumFractionDigits:2}):0.00}</p> */}
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
                        // onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol=" "
                        name="net_amount"
                        value={margin_per}

                      />
                      <CurrencyTextField
                        className="w-full "
                        readOnly
                        label="Margin Value"
                        variant="outlined"
                        fullWidth
                        size="small"
                        style={{ width: '150px' }}
                        currencySymbol="SAR"
                        name="dis_per"
                        value={margin_val}
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
                        value={subTotalCost ? subTotalCost : parseFloat(0.00).toLocaleString(undefined, {
                          minimumFractionDigits: 2
                        })}

                      />

                    </div>
                    <div>
                      <TextField
                        className="mb-4 mr-2"
                        label="Discount %"
                        type="text"
                        variant="outlined"
                        size="small"
                        style={{ width: '90px' }}
                        // onChange={(event) => handleChange(event, "discount")}
                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                        value={(dis_per)}

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
               
                value={discount?dis_per:0.00}
               
              /> */}
                      <CurrencyTextField
                        className="w-full "
                        label="Discount"
                        variant="outlined"
                        fullWidth
                        size="small"
                        style={{ width: '150px' }}
                        currencySymbol="SAR"
                        name="dis_per"
                        value={parseFloat(dis_val)}
                      />
                    </div>
                    <div>
                      <CurrencyTextField
                        className="w-full mb-4 "
                        label="Selling Total"
                        readOnly
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol="SAR"
                        name="net_amount"
                        value={(parseFloat(sellTotal)).toLocaleString(undefined, {
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
                      size="small"
                      currencySymbol="SAR"
                      name="vat"
                      value={vat} />

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
            {testArr.map((item, index) => {

              return (
                <div>

                  <TextField label={'Note'}
                    className="mb-4 ml-4"
                    multiline
                    type="text"
                    variant="outlined"
                    value={item.note}
                    size="small"
                    style={{ width: 500 }}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    name="note"
                    onChange={(e) => noteList(e.target.value, index)}></TextField>
                  <Button onClick={() => deleteItemFromNoteList(index)}>
                    <Icon color="error" className="mt-2" >delete</Icon>
                  </Button>

                </div>
              )
            })}
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
        {/* {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            contactid={status}
            open={shouldOpenEditorDialog}
            catid={catid}
            productprice={setproductprice}
          />
        )} */}
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            text="Are you sure to delete?"
          />
        )}
        {/* {shouldOpenEditorDialogproduct && (
          <MemberEditorDialog_product
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialogproduct}
            
            
          />
        )} */}
        {shouldOpenConfirmationDialogproduct && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialogproduct}
            onConfirmDialogClose={handleDialogClose}

            text="Are you sure to delete?"
          />
        )}
        {shouldOpenConfirmationDialogparty && (
          <MemberEditorDialog
            open={shouldOpenConfirmationDialogparty}
            onConfirmDialogClose={handleDialogClose}
            handleClose={() => { setshouldOpenConfirmationDialogparty(false); setIsAlive(false) }}
            customercontact={setcustomercontact}
            partyid={party_id}

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

export default QuickQuote;
