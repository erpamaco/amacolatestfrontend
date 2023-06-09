import React, { useState, useEffect, useRef } from "react";
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Header from '../../views/statements/Header';
import Footer from '../../views/statements/Footer';
import './new.css';
import '../Newinvoice/print.css';
import ViewDailog from './ViewDailog';
import Pdff from './po.png'

import {
  Icon,
  Divider,
  Grid,
  Avatar,
  Table,
  TextField,
  ClickAwayListener,
  InputAdornment,
  TableHead,
  TableFooter,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
  Button
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { getInvoiceById, navigatePath, basePathd } from "../invoice/InvoiceService";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import { cond } from "lodash";
import logo from './../invoice/amaco-logo.png';
import logos from './../invoice/vision2030.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
import useSettings from '../../hooks/useSettings';
import apiurl from '../../../config';
import url, { basePath } from "../invoice/InvoiceService";
import Arabic from '../../../lang/ar.json';
import { IntlProvider, FormattedNumber } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import Swal from "sweetalert2";
import Axios from "axios";
import { useHistory } from 'react-router';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { ToWords } from 'to-words';
import { numberToWords } from 'number-to-words';
import { useReactToPrint } from 'react-to-print';
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import useAuth from "app/hooks/useAuth";
// import "../../../app/views/Newinvoice/print.css";
const locale = navigator.language;



// import Image from 'react-image-resizer';



const useStyles = makeStyles(({ palette, ...theme }) => ({


  "@global": {



    "@media print": {


      "body, html,div,h3,h4,h5,h6": {
        visibility: "hidden",
        size: "auto",

        content: 'none !important',
        "-webkit-print-color-adjust": "exact !important",
        // marginTop:'10px',
        counterIncrement: 'page',
        fontSize: '11pt',







        // marginTop: "50px",
      },

      "#table": {
        'font-family': "Calibri",
        'font-size': '11pt',
        'empty-cells': "hide"
      },
      /* You can add additional styles here which you need */
      "#abc": {
        height: '1px !important', /* overwrites any other rules */
        backgroundColor: '#FFFFFF',
      },
      "#editIcon": {
        display: 'none'
      },
      "#headerup": {
      
        marginTop: "-68px",
        // position : "relative !important"
      },
      "#headerup2": {
      
        marginTop: "-48px",
        // position : "relative !important"
      },


      "#header": {
        // padding: "10px",

        /* These do the magic */
        position: "fixed",
        marginTop: '100px',
        left: 0,
        paddingTop: 130,
        justifySelf: "end"

      },
      ".empty-header": {
        height: "100px",
        marginTop: '10px',


      },
      ".empty-footer": {
        height: "100px",
        marginTop: '10px',



      },
      ".header": {
        position: "fixed",
        height: "100px",
        top: 0,


      },
      ".footer": {
        position: "fixed",
        height: "100px",
        bottom: 0,
        width: "100%",

      },



      "#footer": {

        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",

        bottom: "0",
        position: 'fixed',
        width: "100%",
        justifySelf: "end"
        // 'counter-increment': page,
        // eslint-disable-next-line no-undef

        // content: counter(pageBreakAfter),


      },

      // "#table": {
      //   // display: "-webkit-box",
      //   // display: "-ms-flexbox",
      //   // // display: "right",
      //   // width: "650px",
      //   // margin: "15px",
      //   // position: "absolute",
      //   fontSize:6



      //   // top: "38.9cm !important",
      //   // paddingRight: "24cm !important"
      // },
      //   "#footer": {
      //     display:"-webkit-box",
      // display: "-ms-flexbox",
      // display: "center",
      // width: "100%",
      // position: "absolute",

      // top: "38.9cm !important",
      // paddingRight: "12cm !important"
      //    },
      "#print-area": {
        // top: 10,
        left: 0,
        right: 0,

        // height: "100%",
        // marginTop: "10px",
        // marginBottom:'30px',
        boxDecorationBreak: 'clone',
        position: 'absolute',



        "& *": {
          visibility: "visible",
        },
      },


    },

  },invoiceViewer: {},

}))


const InvoiceViewer = ({ toggleInvoiceEditor, list = [],
  handleAddList,
  handleAddNewCard, }) => {
  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // const foo =parseInt(params.get('s'));
  // const [state, setState] = useState({});
  const [rfq, setrfq] = useState();
  const [psdate, setpsdate] = useState([]);
  const [sizeset, setsizeset] = useState([]);
  const [ddate, setddate] = useState([]);
  const [contactaddress, setcontactaddress] = useState([]);
  const [company, setcompany] = useState("");
  const [city, setcity] = useState("");
  const [street, setstreet] = useState("");
  const [pono, setpo] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [vatno, setvatno] = useState("");
  const [regno, setregno] = useState("");
  const [qdetails, setqdetails] = useState([]);
  const [net_amount, setnet_amount] = useState("");
  const [vat_in_value, setvat_in_value] = useState("");
  const [total_value, settotal_value] = useState("");
  const [validity, setvalidity] = useState()
  const [payment_terms, setpayment_terms] = useState('')
  const [warranty, setwarranty] = useState('')
  const [delivery_time, setdelivery_time] = useState()
  const [qid, setqid] = useState()
  const [inco_terms, setinco_terms] = useState()
  const [contactperson, setcontactperson] = useState('');
  const [mcode, setmcode] = useState('');
  const [contactpersonemail, setcontactpersonemail] = useState('');
  const [contactpersoncontact, setcontactpersoncontact] = useState('');
  const [is_revised, setis_revised] = useState('');
  const [designation, setdesignation] = useState('')
  const [fileurl, setfileurl] = useState('')
  const [vendor_id, setvendor_id] = useState('')
  const { id, s ,t} = useParams();
  const { user } = useAuth();
  const classes = useStyles();
  const componentRef = useRef();
  const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false);
  const [file, setFile] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileType2, setFileType2] = useState('');
  const fType = ["jpg", "png", "peg"];
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [shouldOpenAddList, setShouldOpenAddList] = useState(false);
  const [rfq_no, setrfq_no] = useState("");
  const [prefix, setprefix] = useState("");
  const routerHistory = useHistory();

  const [srcfile, setsrcfile] = useState("");
  // const [sign, setsign] = useState("");
  const [sign, setsign] = useState([]);
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState(false);
  const [loading, setloading] = useState(false);
  const [discount_per, setdiscount_per] = useState('');
  const [discount, setdiscount] = useState('');
  const [other, setother] = useState('');
  const [fFile, setFfile] = useState('');
  const [transport, settransport] = useState('');
  const [notes, setnotes] = useState([]);
  const [pageNumber, setPageNumber] = useState([])

  let pos = 0;
  const [state, setState] = React.useState({

    open: false,
    vertical: "top",
    horizontal: "center"
  });
  const [bank, setbank] = useState({
    bank_name: " ",
    acc_no: " ",
    iban_no: " "
  })

  const { vertical, horizontal, open } = state;

  const handleClicks = newState => () => {

    setState({ open: true, ...newState });
  };
  const handleClicks2 = (urll) => {
    window.open(urll);
  };

  function handleClose() {
    setState({ ...state, open: false });
  }
  const handleDialogClose = () => {
    setShouldOpenDialog(false);
    setShouldOpenViewDialog(false);
  };

  const handleAddListToggle = (value) => {
    setShouldOpenAddList(value);
  };

  const handlePrintingCur = useReactToPrint({
    content: () => componentRef.current,
    header: () => componentRef.current
  });

let sizepage;
  const handlePrinting = () => {

    var totalPages = Math.ceil(componentRef.current.scrollHeight / 1123);
    sizepage = componentRef.current.scrollHeight;
    console.log("componentRef.current.scrollHeight",componentRef.current.scrollHeight)
    console.log("totalPages",totalPages)
    // totalPages = totalPages - 2 + 2;
    if (componentRef.current.scrollHeight < 1610) {
      totalPages = 1;
      console.log("totalPages1",totalPages)
      // totalPages = totalPages - 2+1
    }else if(componentRef.current.scrollHeight > 1520 && componentRef.current.scrollHeight < 2500){
      totalPages = 2
      console.log("totalPageselse2",totalPages)
    }else if(componentRef.current.scrollHeight > 2500 && componentRef.current.scrollHeight < 3480){
      totalPages = 3
      console.log("totalPageselse3",totalPages)
    }else if(componentRef.current.scrollHeight >= 3481 && componentRef.current.scrollHeight < 4340){
      totalPages = 4
      console.log("totalPageselse4",totalPages)
    }else{
      totalPages = Math.ceil(componentRef.current.scrollHeight / 1123);
      console.log("totalPagesrandom",totalPages)
    }
    console.log("totalPagesfinal",totalPages)
    
    let a = [];
    for (var i = 0; i < totalPages; i++) {
      console.log("1p",i)
      var j = i;
      console.log("2p",j)
      j = ++j;
      console.log("3p",j)
      console.log("4p",totalPages)
      var q = "Page " + j + " of " + totalPages;
      a[i] = q;
      console.log("a[i]",a[i])
    }
    // console.log('sd', a)
    setPageNumber(a);
    setTimeout(() => {
      handlePrintingCur();
    }, 500);
  };
  const handleFileSelect = (event, f) => {
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




  var fval = 10;
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
    }
  });
  const [res, setres] = useState("");
  const [ress, setress] = useState("");
  const [po_no, setpo_no] = useState("");
  const [tab, settab] = useState(0);
  const { settings, updateSettings } = useSettings();
  var nf = new Intl.NumberFormat();

  // Menu Button function
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }


  function handleClose() {
    setAnchorEl(null);
  }

  const [buildNumber,setBuildNumber] = useState('');
  const [post_box_no,setpost_box_no] = useState('');
  const [country,setcountry] = useState('');
  // let sizeset;
  useEffect(() => {
    // updateSidebarMode({ mode: "close" })
    url.get("sale-quotation/" + id).then(({ data }) => {
      // console.log("merssi",data[0]?.quotation_details?.length)
      console.log("sadh",data)
      setsizeset(data[0]?.quotation_details?.length)
      if (s == "new") {
        settab(0)
      }
      else if (s == "draft") {
        settab(3)
      }
      else if (s == "accept") {
        settab(1)
      }
      else if (s == "history") {
        settab(4)
      }
      else {
        settab(2)
      }

      document.title = `AMACO-${data[0]?.quotation_no}-${data[0]?.party?.firm_name}`
      setrfq(data[0]?.rfq_id)
      setFfile(data[0]?.file)
      setrfq_no(data[0]?.rfq_no)
      setqid(data[0]?.quotation_no)
      setpsdate(moment(data[0]?.ps_date).format('DD MMM YYYY'))
      setcontactaddress(data[0]?.party)
      // setddate(moment(data[0].rfq.require_date).format('DD MMM YYYY'))
      setcompany(data[0]?.party?.firm_name)
      setdiscount_per(data[0]?.discount_in_p)

      setsubject(data[0]?.subject)
      setsign(data[0]?.sign)
      setcity(data[0]?.party?.city)
     
      setBuildNumber(data[0]?.party?.building_no)
      setcountry(data[0]?.party?.country)
      setpost_box_no(data[0]?.party?.post_box_no)
      setstreet(data[0]?.party?.street)
      setzipcode(data[0]?.party?.zip_code)
      setpo(data[0]?.party?.post_box_no)
      setregno(data[0]?.party?.registration_no)
      setvatno(data[0]?.party?.vat_no)
      setFile(data[0]?.file);
      console.log("data[0]?.file",data[0]?.file)
      if (data[0].file) {
        var type = data[0].file.slice(-3);
        type = type.toLowerCase();

        setFileType(type);
      }



      const uniqueAddresses = Array.from(new Set(data[0]?.quotation_details.map(a => a.index1)))
        .map(id => {
          return data[0]?.quotation_details.find((a) => a.index1 === id)
        })

      let res = uniqueAddresses.map((item) => {
        item['count'] = 2
        item['bottom'] = 'hide';
        return item
      })



      let result = data[0]?.quotation_details.filter(function (o1) {
        return res.some(function (o2) {
          if (o1.id === o2.id) {


            return o1
          }
          else {
            return o1
          } // return the ones with equal id
        });

      })
      setqdetails(result)
      // setqdetails(data[0]?.quotation_details)
      setnet_amount(data[0]?.net_amount)
      setvat_in_value(data[0]?.vat_in_value)
      settotal_value(data[0]?.total_value)
      setvalidity(data[0]?.validity)
      setwarranty(data[0]?.warranty)
      setinco_terms(data[0]?.inco_terms)
      setis_revised(data[0]?.is_revised)
      setpayment_terms(data[0]?.payment_terms)
      setdelivery_time(data[0]?.delivery_time)
      settransport((isNaN(data[0]?.transport) || data[0]?.transport == null) ? 0 : parseFloat(data[0]?.transport))
      setother((isNaN(data[0].other) || data[0]?.other == null) ? 0 : parseFloat(data[0]?.other))
      setnotes(data[0]?.notes)
      if (data[0].bank) {
        setbank({ ...bank, 'bank_name': data[0]?.bank.name, 'acc_no': data[0]?.bank.ac_no, 'iban_no': data[0]?.bank.iban_no })

      }
      if (data[0].contact !== null) {
        setcontactperson(data[0].contact.fname)
        setprefix(data[0].contact.prefix)
        setdesignation(data[0].contact.designation)
        setcontactpersonemail(data[0].contact.email)
      }

      setcontactpersoncontact(data[0]?.contact?.mobno)
      setmcode(data[0]?.contact?.mcode)
      // console.log(data[0])
      var item = data[0].party?.party_division?.find(item => item.div_id === 75);
      setvendor_id(data[0]?.party?.party_code)
      let words1 = numberToWords.toWords(data[0].net_amount);
      let decimal = parseFloat(parseFloat(data[0].net_amount).toFixed(2).split('.')[1]);

      // numberToWords.toWords(data[0].net_amount.split('.')[1]);
      // console.log(1004567.67.split('.')[1])
      // console.log(words1+" Riyals and "+((parseFloat(data[0].net_amount.split('.')[1])!==0)?(numberToWords.toWords(data[0].net_amount.split('.')[1])+" Halalas"):" "))
      let words = toWords.convert(parseFloat(data[0].net_amount), { ignoreDecimal: false });
      let riyal = words.replace("Rupees", "Riyals");
      let halala = riyal.replace("Paise", "Halala")

      setress(words1.split(",").join(" ") + " Riyals " + ((parseFloat(data[0].net_amount.split('.')[1]) !== NaN) ? (parseFloat(data[0].net_amount.split('.')[1]) == 0.00 ? "." : " & " + (numberToWords?.toWords(decimal) + " Halalas.")) : " "));
      // setress(words1+" Riyals and "+((parseFloat(data[0].net_amount.split('.')[1])!==NaN)?(numberToWords.toWords(data[0].net_amount.split('.')[1])+" Halalas"):" "));



    });

    // if (id !== "add")
    //   getInvoiceById(id).then((res) => {
    //     setState({ ...res.data });
    //   });
  }, [id]);
  const updateSidebarMode = (sidebarSettings) => {
    if (sidebarSettings.mode == "close") {
      let activeLayoutSettingsName = settings.activeLayout + "Settings";
      let activeLayoutSettings = settings[activeLayoutSettingsName];
      updateSettings({
        ...settings,
        [activeLayoutSettingsName]: {
          ...activeLayoutSettings,
          leftSidebar: {
            ...activeLayoutSettings.leftSidebar,
            ...sidebarSettings,
          },
        },
      });
    }
    else {
      window.location.href = "/quoateview"
      let activeLayoutSettingsName = settings.activeLayout + "Settings";
      let activeLayoutSettings = settings[activeLayoutSettingsName];
      updateSettings({
        ...settings,
        [activeLayoutSettingsName]: {
          ...activeLayoutSettings,
          leftSidebar: {
            ...activeLayoutSettings.leftSidebar,
            ...sidebarSettings,
          },
        },
      });
      // routerHistory.push("/quoateview")

    }

  }
  const deletequote = () => {
    handleClose()
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Quotation!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`sale-quotation/${id}`)
          .then(res => {


            Swal.fire(
              'Deleted!',
              ' Quotation has been deleted.',
              'success'
            )
            routerHistory.push(navigatePath + "/quoateview/3")

          })



      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Quotation is safe :)',
          'error'
        )
      }
    })
  }
  const invoicegenrate = (sidebarSettings) => {


    routerHistory.push(navigatePath + `/Quoteinvoice/${id}`)




  }
  const dnotegenrate = (sidebarSettings) => {


    routerHistory.push(navigatePath + `/dnote/${id}`)

  }
  const editqoute = () => {

    // window.location.href = `/Quoteedit/${id}`
    routerHistory.push(navigatePath + `/Quoteedit/${id}/${t}/${s}`)
  }
  const reviseqoute = () => {

    // window.location.href = `/Quoteedit/${id}`
    routerHistory.push(navigatePath + `/revisequote/${id}/${t}`)
  }

  const handlePrint = () => {
    // var prtContent = document.getElementById('print-area');
    // dummyContent.innerHTML = prtContent.contentWindow.document.body.innerHTML
    // var WinPrint = window.open('', '', 'left=0,top=0,width=1800,height=1200,toolbar=1,scrollbars=1,status=0');
    // WinPrint.document.write('<html><head><title></title>');
    // WinPrint.document.write(' <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">');
    // WinPrint.document.write('<head>');
    // WinPrint.document.write('<body>');
    // WinPrint.document.write(prtContent.innerHTML);
    // WinPrint.document.write('</body></html>');
    // WinPrint.document.close();
    // WinPrint.focus();
    // WinPrint.print();
    // WinPrint.close();
    // prtContent.innerHTML = "";
    //             var content = document.getElementById("print-area");
    // var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    // pri.document.open();
    // pri.document.write(content.innerHTML);
    // pri.document.close();
    // pri.focus();
    // pri.print();

    window.print()

  };
  window.onafterprint = function () {
    window.close()
    window.location.href = ``
  };
  const statuschange = (status, name) => {

    let tab_status;
    if (name == "accept") {
      settab(1)
      tab_status = 1
    }
    else if (name == "reject") {
      settab(2)
      tab_status = 2
    }
    else {
      settab(0)
      tab_status = 0
    }
    setloading(true)
    const json = {
      status: status,
      po_number: po_no,
      file: srcfile
    }
    let formData = new FormData()
    formData.append('status', status)
    formData.append('po_number', po_no)
    formData.append('file', srcfile)
    formData.append('id', id)
    // console.log(formData)
    // Swal.fire({
    //   // title: 'Are you sure?',
    //   text: `Are you sure want to ${status} the Quotation!`,
    //   icon: 'danger',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes,',
    //   icon: 'warning',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    url.post(`updateQuotestatus`, formData)
      .then(res => {

        // console.log("ertt",res)
        // if (res.data.msg) {
        //   setmessage(true)
        //   handleClicks({ vertical: "top", horizontal: "center" })
        // }
        // else {
          Swal.fire({
            title: 'Success',
            type: 'success',
            icon: 'success',
            text: `Quotation has been ${status}ed.`,
          })
          
          routerHistory.push(navigatePath + '/quoateview/' + t)
        // }
      })





    // })



    // } else if (result.dismiss === Swal.DismissReason.cancel) {

    // }
    // })

  };

  let subTotalCost = 0;
  let {
    orderNo,
    buyer,
    seller,
    item: invoiceItemList = [],
    status,
    vat,
    date,
  } = state;

  return (
    <div className={clsx("invoice-viewer py-4", classes.invoiceViewer)}>
      <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
        <Link to={navigatePath + "/quoateview/" + t}>
          <IconButton>
            <Icon>arrow_back</Icon>
          </IconButton>
        </Link>
        <div>
          {/* <Button
            className="mr-4 py-2"
            color="primary"
            variant="outlined"
            onClick={() => toggleInvoiceEditor()}
          >
            Edit Quote
          </Button> */}
         
          {localStorage.getItem('role') == 'SA' && s == 'history' && <Button
            variant="outlined"
            color="primary"
            className="mr-4 py-2"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            ACTION<Icon>expand_more</Icon>
          </Button>}
          {s !== "history" && <Button
            variant="outlined"
            color="primary"
            className="mr-4 py-2"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            ACTION<Icon>expand_more</Icon>
          </Button>}
          <Menu

            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <MenuItem  onClick={() => invoicegenrate({ mode: "on" })}>
                    Generate Purchase Order
                      </MenuItem> */}

            {s == "accept" || s == "New" ? <MenuItem onClick={() => statuschange('reject', 'deleted')}>
              DELETE QUOTATION
            </MenuItem> : <MenuItem onClick={() => deletequote()}>
              DELETE QUOTATION
            </MenuItem>}
            <MenuItem
              onClick={() => handlePrinting()}
            // onClick={() => window.print()}
            >
              PRINT QUOTATION
            </MenuItem>
            <MenuItem onClick={() => editqoute()}>
              EDIT QUOTAION
            </MenuItem>
            {s !== "accept" ? !is_revised && <MenuItem onClick={() => reviseqoute()}>
              REVISE QUOTAION
            </MenuItem> : ''}
            {s === "reject" && <MenuItem onClick={() => {

              statuschange('New', 'restored')
            }}>
              RESTORE
            </MenuItem>}

          </Menu>
          {s === "accept" &&
            <>
              {/* <Link
                to={{ pathname: basePath + fFile }}
                target="_blank" >
                <Button
                  className="mr-4 py-2"
                  color="primary"
                  variant="outlined"
                >
                  VIEW QUOTATION
                </Button>
              </Link> */}

              <Button
                className="mr-4 py-2"
                color="primary"
                variant="outlined"
                onClick={() => invoicegenrate({ mode: "on" })}
              >
                GENERATE INVOICE
              </Button>
            </>
          }
          {s === "accept" &&
            <Button
              className="mr-4 py-2"
              color="primary"
              variant="outlined"
              onClick={() => dnotegenrate({ mode: "on" })}
            >
              GENERATE DELIVERY NOTE
            </Button>
          }
          {s === "New" &&
            <Button
              className="mr-4 py-2"
              style={{ border: '1px solid #ff3d57', color: '#ff3d57' }}
              variant="outlined"
              onClick={() => statuschange('reject', 'reject')}
            >
              <Icon>cancel</Icon> REJECTED
            </Button>
          }
          {fType.includes(fileType) ?
              <Button
                className="mr-4 py-2"
                color="primary"
                variant="outlined"
                onClick={e => setShouldOpenViewDialog(true)}
              >
                VIEW UPLOAD
              </Button>
              : file ? <> <Button
                onClick={(e) => {
                  handleClicks2(basePath + file);
                }}
                  className="mr-4 py-2"
                  color="primary"
                  variant="outlined"
                >
                  VIEW UPLOAD
                </Button></>: ""
               
              }


          {shouldOpenAddList ? (
            <ClickAwayListener onClickAway={() => handleAddListToggle(false)}>
              <Card
                className="mx-3 border-radius-0 cursor-pointer p-4 min-w-288"
                elevation={3}
              >

                <TextField
                  size="small"
                  className="mb-3"
                  variant="outlined"
                  name="po_no"
                  value={po_no}
                  fullWidth
                  onChange={e => { setpo_no(e.target.value); setmessage(''); setloading('') }}
                  label="Enter P.O. Number"
                  onKeyDown={e => { setpo_no(e.target.value); setmessage(''); setloading('') }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => handleAddListToggle(false)}
                        >
                          <Icon fontSize="small">clear</Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {po_no && <label htmlFor="upload-multiple-file">
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
                </label>}

                <input
                  className="hidden"
                  onChange={(e) => handleFileSelect(e)}
                  id="upload-multiple-file"
                  type="file"
                  multiple
                />
                {fileurl && <img
                  width="50px"
                  height="50px"
                  // className={classes.media}
                  src={fType.includes(fileType2) ? fileurl : Pdff}
                />}
      {console.log("jah",fileType2)}

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      // handleAddList(columnTitle);
                      // setColumnTitle("");
                      statuschange('accept')
                    }}
                    variant="outlined"
                    color="primary"
                    disabled={loading}
                  >
                    <Icon>add</Icon> ADD
                  </Button>
                  <Button
                    onClick={() => {
                      // handleAddList(columnTitle);
                      // setColumnTitle("");
                      statuschange('accept')
                    }}
                    variant="outlined"
                    color="secondary"
                    className="ml-2"
                  >
                    <Icon>cancel</Icon>Skip
                  </Button>


                  {message &&
                    <h6 color="error">P.O. Number already exits</h6>
                  }

                </div>
              </Card>
            </ClickAwayListener>
          ) : (
            <span>

              {s === "New" &&
                !is_revised && <Button
                  className="mr-4 py-2"
                  variant="outlined"
                  onClick={() => handleAddListToggle(true)}
                  style={{ border: '1px solid #119144', color: '#119144' }}
                >
                  <Icon>check_circle</Icon> ACCEPTED
                </Button>

              }
            </span>
          )}





        </div>
      </div>

      <div id="print-area" ref={componentRef} style={{ fontFamily: "Calibri", fontSize: '11pt' }} >

        {pageNumber.map((item, i) => {
          if (i == 0) {
            pos = 1557;
          } else {
            pos = pos + 1568;
          }

          return (
            <span className="showPageNumber" style={{
              position: 'relative',
              top: pos,
              // left: '50%',
              display: 'none',
            }}> <center>{item}</center></span>
          )
        })}
        {console.log("sizeset",sizeset)}
        <table id={sizeset == 1 ? "headerup2":"headerup"}>
        <div  style={{ marginTop: "23px" }}>
          <Header></Header>

          <tbody style={{ marginBottom: '50px' }}>
            <tr>
              <td>
                <div>
                  <div className="pl-2 pt-5 flex justify-center">

                    <div className="flex">
                      <div className="pl-0 px-0 mb-4 mr-24 justify-center">
                        <h1><strong> QUOTATION</strong></h1>
                        {vat}
                      </div>
                    </div>
                  </div>
                  {/* 
         <div className="px-2 flex justify-between justify-content">
          <div className="flex-start">
            <div className="pl-2 px-4 mb-4">
              <h5 style={{fontWeight:1000}}>Customer Name</h5>
              {company}
            </div>
          </div>
          <div className="flex justify-center item-center">
            <div className="justify-center">
              <h5 style={{fontWeight:1000,textAlign:'center'}}>Attention</h5>
              {contactperson}
            </div>
          </div>
          <div className="flex">
            <div className="mr-4" align="right">
              <h5 style={{fontWeight:1000}}>
               Quotation Date
              </h5>
              {moment(psdate).format('DD MMM YYYY')}
            </div>
          </div>
        </div>
      
        <div className="px-2 flex justify-between space-between">
          <div className="flex">
            <div className="pr-12 px-4 mb-4">
              <h5 style={{fontWeight:1000}}>Customer Address</h5>
              {street},{city},{zipcode}
            </div>
          </div>
          <div className="flex">
          <div className="justify-center">
              <h5 style={{fontWeight:1000}}>Designation</h5>
              {designation}
            </div>
          </div>
          <div className="flex">
            <div className="mr-4" align="right">
              <h5 style={{fontWeight:1000}}>
              Quotation Number
              </h5>
             
              {qid}
            </div>
          </div>
        </div>
        <div className="px-2 flex justify-between">
          <div className="flex">
            <div className="pr-12 px-4 mb-4">
              <h5 style={{fontWeight:1000}}>Vendor Id</h5>
              {vendor_id}
            </div>
          </div>
          <div className="flex">
            <div className="">
              <h5 style={{fontWeight:1000}}>Email Id</h5>
              {contactpersonemail}
            </div>
          </div>
          <div className="flex">
            <div className="mr-4" align="right">
              <h5 style={{fontWeight:1000}}>
             RFQ Number
              </h5>
             
              {qid}
            </div>
          </div>
        </div> */}
                  {/* <div className="px-2 flex justify-between"> */}
                  {/* <div className="px-2 flex justify-end">
                      <div className="flex " >
                        <div className="">
                          {
                            localStorage.getItem('division') == 3 ? <></> : <>
                              <div className="pl-2 pb-4">
                                <span style={{ fontWeight: 1000 }}>RFQ NO</span>
                                <br></br>
                                {rfq_no !== null ? rfq_no : "--"}

                              </div>
                            </>
                          }
                          <div className="pl-2 pb-4">
                            <span style={{ fontWeight: 1000 }}>CUSTOMER</span>
                            <br></br>
                            {company ? company : "--"}

                          </div>
                          <div className="pl-2 pb-4">
                            <span style={{ fontWeight: 1000 }}>CUSTOMER ADDRESS</span>
                            <br></br>
                         
                            {street ? street + (city ? "," + city + (zipcode ? "," + zipcode : " ") : (zipcode ? "," + zipcode : " ")) : (city ? city + (zipcode ? " ," + zipcode : " ") : (zipcode ? zipcode : " "))}



                          </div>
                          <div className="pl-2 ">

                            <span style={{ fontWeight: 1000 }}>CONTACT NUMBER</span>
                            <br></br>
                            {contactpersoncontact ? contactpersoncontact : "--"}

                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 flex justify-center">
                      <div className="flex " >
                        <div className="pb-2">
                          <div className="pb-4">
                            <span style={{ fontWeight: 1000, paddingBottom: 0 }}>ATTENTION</span>
                            <br></br>
                            {prefix ? prefix + ". " : " "}{contactperson ? contactperson : '--'}


                          </div>
                          <div className="justify-center pb-4">
                            <span style={{ fontWeight: 1000 }}>DESIGNATION</span>
                            <br></br>
                            {designation ? designation : '--'}

                          </div>
                          <div className="">
                            <span style={{ fontWeight: 1000 }}>EMAIL ID</span>
                            <br></br>
                            {contactpersonemail ? contactpersonemail : '--'}

                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 mr-1 flex justify-end">
                      <div className="flex " >
                        <div className="">
                          <div className="mr-1 pb-4" align="left">
                            <span style={{ fontWeight: 1000 }}>
                              QUOTATION DATE
                            </span>
                            <br></br>
                            {moment(psdate).format('DD MMM YYYY')}


                          </div>
                          <div className="mr-1 pb-4" align="left">
                            <span style={{ fontWeight: 1000 }}>
                              QUOTATION NUMBER
                            </span>
                            <br></br>

                            {qid ? qid : "--"}

                          </div>
                          {localStorage.getItem('division') == 3 ? <>
                            <div className="mr-1 " align="left">
                              <span style={{ fontWeight: 1000 }}>
                                RFQ REFERENCE
                              </span>
                              <br></br>

                              {vendor_id ? vendor_id : "--"}
                            </div>
                          </> : <>
                            <div className="mr-1 " align="left">
                              <span style={{ fontWeight: 1000 }}>
                                VENDOR ID
                              </span>
                              <br></br>

                              {vendor_id ? vendor_id : "--"}
                            </div>
                          </>}
                        </div>
                        <div>
                        </div>
                      </div>
                    </div> */}
                  <Box display="flex" p={1} bgcolor="background.paper" className="pl-2 pr-2 flex justify-between">
                    <Grid container spacing={3} className="p-4">
                      <Grid className="pl-2 pb-4 pr-2 mr-2" xs={5} style={{ wordBreak: 'break-word' }}>
                        <span style={{ fontWeight: 1000 }}>RFQ NO</span><br></br>
                        {rfq_no !== null ? rfq_no : "---"}


                      </Grid>
                      <Grid className="pl-0 pb-4" xs={4}>
                        <span style={{ fontWeight: 1000 }}>ATTENTION</span><br></br>
                        {prefix ? prefix + ". " : " "}{contactperson ? contactperson : '---'}


                      </Grid>
                      <Grid className="pl-2 pb-4 pr-0 mr-1" align="right" xs>
                        <span style={{ fontWeight: 1000 }}>
                          QUOTATION DATE
                        </span><br></br>

                        {moment(psdate).format('DD MMM YYYY')}

                      </Grid>

                    </Grid>
                  </Box>
                  <Box display="flex" p={1} bgcolor="background.paper" className="pl-2 pr-2 flex justify-between">
                    <Grid container spacing={3} className="p-4">
                      <Grid className="pl-2 pb-4 pr-2 mr-2" xs={5} style={{ wordBreak: 'break-word' }}>
                        <span style={{ fontWeight: 1000 }}>CUSTOMER</span><br></br>
                        {company ? company : "---"}


                      </Grid>
                      <Grid className="pl-0 pb-4" xs={4}>
                        <span style={{ fontWeight: 1000 }}>DESIGNATION</span><br></br>
                        {designation ? designation : '---'}


                      </Grid>
                      <Grid className="pl-2 pb-4 pr-0 mr-1" align="right" xs>
                        <span style={{ fontWeight: 1000 }}>
                          QUOTATION NUMBER
                        </span><br></br>

                        {qid ? qid : "---"}

                      </Grid>

                    </Grid>
                  </Box>
                  <Box display="flex" p={1} bgcolor="background.paper" className="px-2 flex justify-between">
                    <Grid container spacing={3} className="p-4">
                      <Grid className="pl-2 pb-0" xs={4} style={{ wordBreak: 'break-word' }}>
                        <span style={{ fontWeight: 1000 }}>CUSTOMER ADDRESS</span><br></br>
                         {/* { buildNumber ? (buildNumber +', ') : ''}{street ? street + (city ? "," + city + (zipcode ? "," + zipcode : " ") : (zipcode ? "," + zipcode : " ")) : (city ? city + (zipcode ? " ," + zipcode : " ") : (zipcode ? zipcode : " "))}{post_box_no ? (' ,'+post_box_no) : ''}{country ? ' ,'+ country : ''} */}
                         {post_box_no ? 'PO BOX NUMBER '+ post_box_no + ", " : ""}
                        {buildNumber ? ", " + buildNumber : ""}
                        {street
                          ? street +
                            (city
                              ? ", " + city + (zipcode ? "-" + zipcode : " ")
                              : zipcode
                              ? "-" + zipcode
                              : " ")
                          : city
                          ? city + (zipcode ? "-" + zipcode : " ")
                          : zipcode
                          ? zipcode
                          : " "}

                      </Grid>
                      <Grid className="pl-2 pb-0" xs={1} ></Grid>
                      <Grid className="pl-2 pb-4" xs={4}>
                        <span style={{ fontWeight: 1000 }}>EMAIL ID</span><br></br>
                        {contactpersonemail ? contactpersonemail : '---'}

                      </Grid>

                      <Grid className="pl-2 pb-4 pr-0 mr-1" align="right" xs>
                        <span style={{ fontWeight: 1000 }}>
                          VENDOR ID
                        </span><br></br>

                        {vendor_id}

                      </Grid>
                    </Grid>
                  </Box>
                  <Box display="flex" p={1} bgcolor="background.paper" className="px-2 flex justify-between">
                    <Grid container spacing={3} className="p-4">
                      <Grid className="pl-2 pb-0" xs={6} style={{ wordBreak: 'break-word' }} >
                        <span style={{ fontWeight: 1000 }}>CONTACT NUMBER</span><br></br>
                        {contactpersoncontact ? (mcode!==null?"+"+mcode:"")+" "+contactpersoncontact : "---"}

                      </Grid>
                      <Grid className="pl-2 pb-4" xs={2}>
                        {/* <span style={{ fontWeight: 1000 }}>INCO TERMS</span><br></br>
                        {inco_terms} */}

                      </Grid>
                      <Grid className="pl-2 pb-4 pr-20 mr-1" align="right" xs>
                        {/* <span style={{ fontWeight: 1000 }}>
                        </span><br></br> */}



                      </Grid>

                    </Grid>
                  </Box>

                  {/* </div> */}



                  <hr></hr>
                  <div className="viewer__order-info px-4 mb-4 flex justify-between" >
                    <Table>
                      <TableRow style={{ marginBottom: 200 }} >
                        Subject: {subject == null || subject == 0 || subject == 'null' ? '---' : subject}
                      </TableRow>
                    </Table>
                  </div>
                  <div className="viewer__order-info px-4 flex justify-between">
                    <Table id="table" >
                      <TableRow className="pl-4">
                        {prefix ? (prefix === "Mr" ? "Dear Sir," : "Dear Madam,") : 'Dear Sir/Madam,'}
                        <br></br>
                        Thank you for requesting us for the quotation of below mentioned items, please find our best price for the supply of requested
                        items.<br></br>
                        We look forward for our valued P.O.
                      </TableRow>
                    </Table>
                  </div>
                  <div className="px-4 mb-2 pl-4 pt-4 flex justify-between" id="table">
                    <Table style={{ width: "100%", fontSize: '10pt', border: "none", fontFamily: 'Calibri',zIndex:'1000' }} className="pl-4" id="table" >
                      <TableHead style={{ backgroundColor: '#1d2257', display: 'table-row-group' }}>
                        <TableRow style={{ pageBreakInside: 'avoid' }} id="table">
                          <TableCell className="pr-0" colspan={1} style={{ border: "1px solid #ccc", width: "50px", fontFamily: "Calibri", color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center"> <span style={{ fontSize: 16 }}>رقم</span>
                              <br></br>S.No.</TableCell>
                          {
                            localStorage.getItem('division') == 3 ? <></> :localStorage.getItem('division') == 5 ? <>
                              {/* <TableCell className="px-0" colspan={2} style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">ITEM</TableCell> */}
                              <TableCell className="px-0" colspan={4} style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">RFQ DESCRIPTION</TableCell>

                            </>:<><TableCell className="px-0" colspan={2} style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center"> <span style={{ fontSize: 16 }}>غرض</span>
                              <br></br>ITEM</TableCell>
                              <TableCell className="px-0" colspan={4} style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center"> <span style={{ fontSize: 16 }}>وصف </span>
                              <br></br>RFQ DESCRIPTION</TableCell>
</>
                          }
                          {
                            localStorage.getItem('division') == 3 ? <>
                              <TableCell className="px-0" colspan={4} style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center"><span style={{ fontSize: 16 }}>وصف </span>
                              <br></br>AMACO OFFERED DESCRIPTION </TableCell>

                            </> : <>
                              <TableCell className="px-0" colspan={4} style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center"><span style={{ fontSize: 16 }}>وصف </span>
                              <br></br>AMACO DESCRIPTION</TableCell>

                            </>
                          }

                          <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", width: 80, color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center"> <span style={{ fontSize: 16 }}>كمية</span>
                              <br></br>QTY</TableCell>
                          <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", color: '#fff', fontWeight: 1000, fontSize: '11pt' }} colSpan={2} align="center"><span style={{ fontSize: 16 }}>وحدة</span>
                              <br></br>UOM</TableCell>

                          <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", width: 110, color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center"><span style={{ fontSize: 16 }}>سعر الوحدة</span>
                              <br></br>UNIT PRICE</TableCell>
                          <TableCell className="px-0" style={{ border: "1px solid #ccc", fontFamily: "Calibri", width: 110, color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center"><span style={{ fontSize: 16 }}>المجموع</span>
                              <br></br>TOTAL</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody >

                        {qdetails.sort((a, b) => (a.index1 - b.index1)).map((item, index) => {

                          return (

                            <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                              {item.count > 0 ? <TableCell className={(qdetails.length - 1) === index ? "pr-0" : "pr-0 hideBottomLine"} align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt', borderTop: '2px solid #ccc' }} >
                                {item.index1}
                              </TableCell> : <TableCell className={qdetails.length - 1 === index ? "pr-0" : "pr-0 hideBottomLine"} align="center" colspan={1} style={{ fontFamily: "Calibri", fontSize: '11pt' }} >
                                {/* {item?.file ? <img className="w-60" src={item.file} /> : ""} */}
                              </TableCell>}
                              {
                                localStorage.getItem('division') == 1 &&
                                <TableCell className="pr-0" align="center" colspan={2} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                  {item?.file ? <img className="w-60" src={item.file} /> : ""}
                                </TableCell>
                              }

                                <TableCell className="pr-0" align="center" colspan={4} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >


                                  {/* <TableRow  style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                                          <TableCell width='500' className="pr-0 nClass" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                            {item?.description}
                                          </TableCell>
                                        </TableRow> */}

                                  {item?.description}


                                </TableCell>

                              <TableCell className="pr-0" align="center" colspan={4} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                {/* {(obj).map((item, ind) => {
                                        return (
                                          <TableRow key={index} style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                                            <TableCell width='500' className="pr-0 nClass" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                              {item?.product_description}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      })} */}
                                {item?.descriptionss}
                              </TableCell>
                              <TableCell className="pr-0" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                {/* {(obj).map((item, ind) => {
                                        return (
                                          <TableRow key={index} style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                                            <TableCell width='500' className="pr-0 nClass" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                              {item.quantity}
                                            </TableCell>
                                          </TableRow>

                                        )
                                      })} */}
                                      {parseFloat(item?.quantity).toLocaleString(undefined, { minimumFractionDigits: 0})}

                                {/* {item?.quantity} */}
                              </TableCell>
                              <TableCell className="pr-0" align="center" colspan={2} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                {/* {(obj).map((item, ind) => {
                                        return (
                                          <TableRow key={index} style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                                            <TableCell width='500' className="pr-0 nClass" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                              {item?.unit_of_measure}
                                            </TableCell>
                                          </TableRow>

                                        )
                                      })} */}
                                {item?.unit_of_measure}
                              </TableCell>
                              <TableCell className="pr-2" align="right" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                {/* {(obj).map((item, ind) => {
                                        return (
                                          <TableRow key={index} style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                                            <TableCell width='500' className="pr-0 nClass" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                              {parseFloat(item.sell_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </TableCell>
                                          </TableRow>

                                        )
                                      })} */}
                                {isNaN(parseFloat(item?.sell_price)) ? 0 : parseFloat(item?.sell_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </TableCell>
                              <TableCell className="pr-2" align="right" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                {/* {(obj).map((item, ind) => {
                                        return (
                                          <TableRow key={index} style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                                            <TableCell width='500' className="pr-0 nClass" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                              {parseFloat(item.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </TableCell>
                                          </TableRow>

                                        )
                                      })} */}
                                {isNaN(parseFloat(item?.total_amount)) ? 0 : parseFloat(item?.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </TableCell>
                            </TableRow>
                          )

                        })}

                        {/* {qdetails.map((item, index) => {
                          return (
                            <TableRow key={index} style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                              <TableCell className="pr-0" align="center" colspan={1} style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                {index + 1}
                              </TableCell>

                              {
                                localStorage.getItem('division') == 3 ? <></> : <>
                                  <TableCell className="pr-0" align="center" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} colspan={2}>

                                    {item.file ? <img className="w-60" src={item.file} alt="" /> : ''}

                                  </TableCell>
                                  <TableCell className="pl-2" align="left" colspan={4} style={{ border: "1px solid #ccc", wordBreak: 'break-word', fontFamily: "Calibri", fontSize: '11pt' }}>
                                    {item.description}
                                  </TableCell>
                                </>
                              }

                              <TableCell className="pl-2" align="left" colspan={4} style={{ border: "1px solid #ccc", wordBreak: 'break-word', fontFamily: "Calibri", fontSize: '11pt' }}>
                                {item?.descriptionss}
                              </TableCell>
                             

                              <TableCell className="pr-0 " align="center" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }}>
                                {nf.format(item.quantity)}


                              </TableCell>
                              <TableCell className="pr-0 " colSpan={2} align="center" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }}>
                                {item?.unit_of_measure}
                              </TableCell>
                              <TableCell className="pl-0 " style={{ textAlign: "right", border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} >
                                {parseFloat(item.sell_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </TableCell>
                              <TableCell className="pl-0 " style={{ textAlign: "right", border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }}>

                                {parseFloat(item.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}



                              </TableCell>



                            </TableRow>
                          );
                        })} */}
                      </TableBody>
                    </Table>
                  </div>
                  <div  className="viewer__order-info px-4 mb-4 flex justify-between" style={{pageBreakInside: 'avoid'}}>
                    <Table className="bandkDetTop" style={{position:'relative',top:'-57px'}}>
                    <TableHead style={{ backgroundColor: 'trasparent',visibility:'hidden' }}>
                        <TableRow style={{ pageBreakInside: 'avoid' }} id="table">
                          <TableCell className="pr-0" colspan={1} style={{  width: "50px", fontFamily: "Calibri", color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">S.No.</TableCell>
                          {
                            localStorage.getItem('division') == 3 ? <></> :localStorage.getItem('division') == 5 ?  <>
                              {/* <TableCell className="px-0" colspan={2} style={{  fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">ITEM</TableCell> */}
                              <TableCell className="px-0" colspan={4} style={{  fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">RFQ DESCRIPTION</TableCell>

                            </>:<><TableCell className="px-0" colspan={2} style={{  fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">ITEM</TableCell>
                              <TableCell className="px-0" colspan={4} style={{  fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">RFQ DESCRIPTION</TableCell>
</>
                          }
                          {
                            localStorage.getItem('division') == 3 ? <>
                              <TableCell className="px-0" colspan={4} style={{  fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">AMACO OFFERED DESCRIPTION </TableCell>

                            </> : <>
                              <TableCell className="px-0" colspan={4} style={{  fontFamily: "Calibri", color: '#fff', fontColor: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">AMACO DESCRIPTION</TableCell>

                            </>
                          }

                          <TableCell className="px-0" style={{  fontFamily: "Calibri", width: 80, color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">QTY</TableCell>
                          <TableCell className="px-0" style={{  fontFamily: "Calibri", color: '#fff', fontWeight: 1000, fontSize: '11pt' }} colSpan={2} align="center">UOM</TableCell>

                          <TableCell className="px-0" style={{  fontFamily: "Calibri", width: 110, color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">UNIT PRICE</TableCell>
                          <TableCell className="px-0" style={{  fontFamily: "Calibri", width: 110, color: '#fff', fontWeight: 1000, fontSize: '11pt' }} align="center">TOTAL</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid', pageBreakAfter: 'always', pageBreakBefore: 'always' }}>
                          <TableCell className="pl-0 " align="center" style={{ border: "1px solid #ccc", fontFamily: "Calibri" }} rowspan={3} colspan={localStorage.getItem('division') == 3 ? 5 : localStorage.getItem('division') == 5 ? 9 : 11}>
                            <div className="px-4 flex justify-between" style={{ fontFamily: "Calibri" }}>
                              <div className="flex">
                                <div className="pr-12">
                                  <TableRow>
                                    <td>
                                      <h5 className="font-normal ">
                                        <strong>BANK DETAILS</strong>{" "}
                                      </h5>
                                    </td>
                                  </TableRow>
                                  <tr style={{ fontSize: '11pt', textAlign: 'left' }} >
                                    <td><strong>Bank Name</strong></td>
                                    <td >{bank?.bank_name}</td>
                                  </tr>
                                  <tr style={{ fontSize: '11pt', textAlign: 'left' }}>
                                    <td ><strong>Account No</strong></td>
                                    <td >{bank?.acc_no}</td>
                                  </tr>
                                  <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                                    <td ><strong>IBAN No</strong></td>
                                    <td >{bank?.iban_no}</td>
                                  </tr>
                                </div>
                              </div>
                            </div>

                          </TableCell>
                          <TableCell className="pr-0 " align="center" style={{ border: "1px solid #ccc", wordBreak: 'break-word', fontFamily: "Calibri", fontSize: '11pt' }} colspan={3}>

                          االمجموع الفرعي
                              <br></br>
                              SUB TOTAL

                          </TableCell>
                          {/* <TableCell className="pl-0 " align="center" style={{ border: "1px solid #ccc",width: "500px",fontFamily: "Calibri",borderRight:"1px solid #fff"}}>
                    SAR
                  </TableCell> */}
                          <TableCell className="pl-0 " align="right" style={{ border: "1px solid #ccc", wordBreak: 'break-word', fontFamily: "Calibri", fontSize: '11pt' }} colspan={2}>
                            <div>
                              <div style={{ float: "left" }} className="pl-10">SAR</div>
                              <div style={{ float: "right" }}>
                                {parseFloat(total_value).toLocaleString(undefined, { minimumFractionDigits: 2 })}

                              </div>
                              <div style={{ clear: "left" }} />
                            </div>

                          </TableCell>

                        </TableRow>

                        <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }} id="abc">
                          {(parseFloat(discount_per) !== 0.00 && !isNaN(parseFloat(discount_per))) && (<>
                            <TableCell className="pr-0 " align="center" style={{ border: "1px solid #ccc", wordBreak: 'break-word', fontFamily: "Calibri", fontSize: '11pt' }} colspan={3} >
                            تخفيض
                              <br></br>
                              
                              DISCOUNT
                            </TableCell>

                            <TableCell className="pl-0 " align="right" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} colspan={2}>
                              <div>
                                <div style={{ float: "left" }} className="pl-10">SAR</div>
                                <div style={{ float: "right" }}>
                                  {discount_per == 0 ? 0.00 : parseFloat(discount_per * (total_value + other + transport) / 100).toFixed(2)}

                                </div>
                                <div style={{ clear: "left" }} />
                              </div>
                              {/* {discount_per==0?0.00:parseFloat(discount_per * (total_value+other+transport)/100).toFixed(2)} SAR */}
                            </TableCell>
                          </>)}
                        </TableRow>

                        <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                          <TableCell className="pr-0 " align="center" style={{ border: "1px solid #ccc", wordBreak: 'break-word', fontFamily: "Calibri", fontSize: '11pt' }} colspan={3}>

                          القيمة الضريبية
                              <br></br>
                              TOTAL VAT AMOUNT (15%)
                          </TableCell>
                        
                          <TableCell className="pl-0 " align="right" style={{ border: "1px solid #ccc", fontFamily: "Calibri", fontSize: '11pt' }} colspan={2}>
                            <div>
                              <div style={{ float: "left" }} className="pl-10">SAR</div>
                              <div style={{ float: "right" }}>
                                {isNaN(parseFloat(vat_in_value)) ? 0.00 : parseFloat(vat_in_value).toLocaleString(undefined, { minimumFractionDigits: 2 })}

                              </div>
                              <div style={{ clear: "left" }} />
                            </div>
                          </TableCell>
                        </TableRow>

                        <TableRow style={{ border: "1px solid #ccc", pageBreakInside: 'avoid' }}>
                          <TableCell colspan={localStorage.getItem('division') == 3 ? 5 : localStorage.getItem('division') == 5 ? 9 : 11} style={{ border: "1px solid #ccc", fontFamily: "Calibri" }} className="pl-0 capitalize">
                            <div className="px-4 flex justify-between">
                              <div className="flex">
                                <div className="pr-12" style={{ wordBreak: 'break-word', fontSize: '11pt' }}>

                                  <strong>TOTAL IN WORDS</strong><br></br>{ress}
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="pr-0 " align="center" style={{ border: "1px solid #ccc", fontFamily: "Calibri", wordBreak: 'break-word', fontSize: '14pt', fontweight: 1000 }} colspan={3}>

                          المجموع الكلي <br></br>
                              GRAND TOTAL
                          </TableCell>
                      
                          <TableCell className="pl-0 " align="right" style={{ border: "1px solid #ccc", width: "500px", fontFamily: "Calibri", fontSize: '14pt' }} colspan={2}>

                            <div>
                              <div style={{ float: "left" }} className="pl-10">SAR</div>
                              <div style={{ float: "right" }}>
                             {parseFloat(net_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}

                              </div>
                              <div style={{ clear: "left" }} />
                            </div>

                          </TableCell>
                        </TableRow>

                      </TableBody>
                    </Table>
                  </div>
                  <div class='onepage' style={{pageBreakInside: 'avoid',
                //  pageBreakAfter: 'always', pageBreakBefore: 'always'
                }}>


                    <div style={{height:'235px',marginTop:'10px'}} className="viewer__order-info pt-2 px-4 mb-2 flex justify-between" >
                      <div >
                        <div class="break" >




                          <p>

                            {/* <td style={{color:"red"}} colspan={2}>NOTES</td>
          <tr style={{ height: 5,    fontSize:'11pt',textAlign: 'left'}}>
              
              <td colspan={2}><li>Quoted prices are for complete lot, any partial order is subject to reconfirmation.</li></td>
            </tr>
      <tr style={{ height: 5,    fontSize:'11pt',textAlign: 'left'}}>
              <td colspan={2}><li>This is a system generated quote and hence does not required any signature.</li></td>
        </tr> */}
                            <td style={{ color: "red" }} colspan={2}>TERMS</td>
                            <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>

                              <td style={{ fontSize: '11pt', color: '#1d2257', height: 20 }}>
                                <Icon style={{ fontSize: 16, color: '#1d2257', paddingTop: 2 }} >timelapse</Icon> Quotation Validity
                              </td>
                              <td className="pl-4">{validity}</td>
                            </tr>
                            <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                              <td ><Icon style={{ fontSize: 16, color: '#1d2257', paddingTop: 2 }}>monetization_on</Icon> Payment Terms  </td>
                              <td className="pl-4">{payment_terms}</td>
                            </tr>
                            <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                              <td><Icon style={{ fontSize: 16, color: '#1d2257', paddingTop: 2 }} >verified_user</Icon> Warranty </td>
                              <td className="pl-4">{warranty}</td>
                            </tr>
                            <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                              <td ><Icon style={{ fontSize: 16, color: '#1d2257', paddingTop: 2 }} >watch_later</Icon> Delivery Time </td>
                              <td className="pl-4">{delivery_time}</td>
                            </tr>

                            <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                              <td ><Icon style={{ fontSize: '11pt', color: '#1d2257' }} className="pt-1">local_shipping</Icon> Inco-Term </td>
                              <td className="pl-4">{inco_terms}</td>
                            </tr>
                          </p>
                          <p>


                            <td style={{ color: "red" }} colspan={2}>NOTES</td>
                            {notes.map((item, i) => (


                              <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>

                                <td colspan={2}><li style={{ fontSize: '11pt', }}>{item.notes}</li></td>
                              </tr>
                            ))}
                            {/* <tr style={{ height: 5,    fontSize:'11pt',textAlign: 'left'}}>
              <td colspan={2}><li style={{   fontSize:'11pt',}}>This is a system generated quote and hence does not required any signature.</li></td>
        </tr> */}


                            {/* <p style={{   fontSize:'11pt'}}>
             Inco-Term {inco_terms}
            </p> */}
                          </p>
                        </div>

                        <div>


                        </div>
                      </div>
                    </div>
                    <p>
                      <div className="viewer__order-info px-4 mb-2 flex justify-between">
                        <div >
                          <h5>We trust our offer falls in line with your requirements. For any clarification please contact under signed.</h5>

                          <h5>Best Regards,</h5>
                          <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                            <td style={{ height: 'auto !important', fontWeight: 1000 }}>{sign[0]?.name}</td>
                          </tr>
                          <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                            <td >{sign[0]?.designation}</td>
                          </tr>
                          <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                            <td>{sign[0]?.email} | {sign[0]?.contact?.slice(0, 4)} {sign[0]?.contact?.slice(4, 6)} {sign[0]?.contact?.slice(6, 9)} {sign[0]?.contact?.slice(9, 13)}</td>
                          </tr>
                          <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                            {/* <td>{sign[0]?.contact?.slice(0, 4)} {sign[0]?.contact?.slice(4, 6)} {sign[0]?.contact?.slice(6, 9)} {sign[0]?.contact?.slice(9, 13)}</td> */}
                          </tr>
                          {/* <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                            <td></td>
                          </tr> */}
                          {/* <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                            <td>Amaco Group Of Companies</td>
                          </tr>
                          <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                            <td>King Faisal St. Al-Jawrah Dist.</td>
                          </tr>

                          <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                            <td>P.O BOX 9290 | Al Jubail - 31951 | Kingdom Of Saudi Arabia</td>
                          </tr> */}
                        </div>


                      </div>
                      <br></br>
                    </p>
                  </div>
                </div>

              </td>
            </tr>
          </tbody>
          </div>
          <tfoot><div class="empty-footer"></div>
          </tfoot>
        </table>
        <div class="footer">
          {/* <footer style={{visibility: "hidden" }}>
            
          <div >
        <div id="outer" style={{"position": "relative", width:'1050px', backgroundColor:'#c1c1c1',"transform": "skew(-20deg)",marginLeft:'40px',marginRight:'50px'}}>
        <p style={{color:'#fff',paddingTop:5,paddingBottom:5,"transform": "skew(20deg)"}} align="center"> Tel.: +966 13 363 2387| Fax: +966 13 363 2387 | P.O.Box 9290 | Jubail 31951 | Kingdom of Saudi Arabia</p>
        <div id="spacer" style={{width: "200px", height: "10px", marginRight:0,}}></div>
        <div style={{"position": "fixed", bottom: 0, width: "100%", height: 30, backgroundColor:"#1d2257",}}> <p   style={{textAlign: 'center',color:'white',fontFamily: "Calibri",paddingTop:5,paddingBottom:10,"transform": "skew(20deg)"}}>E-mail: sales@amaco.com.sa | Website: www.amaco.com.sa</p></div>
    </div> 
           </div>
            </footer> */}
          <Footer></Footer>
        </div>




      </div>
      {shouldOpenViewDialog && (
      <ViewDailog
        handleClose={handleDialogClose}
        open={shouldOpenViewDialog}
        file={file}

      />
    )}


    </div>
     

  );
};


export default InvoiceViewer;