import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Axios from "axios";
import Swal from "sweetalert2";
import NestedMenuItem from "material-ui-nested-menu-item";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import moment from "moment";
import Addpaidaccount from "./Addpaidaccount";

// import ImageZoom from "react-medium-image-zoom";

import { useHistory } from 'react-router';
import {
  Grid,
  RadioGroup,
  Chip,
  Select,
  CardActionArea,
  FormControlLabel,
  Radio,
  Card,
  Divider,
  TextField,
  InputLabel,
  FormControl,
  FormGroup,
  MenuItem,
  Button,
  Icon,
  Menu,
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "matx";
import { useParams } from "react-router-dom";
// import FormDialog from "./paymentaccount";
import MemberEditorDialog from "./paymentaccount";
import clsx from "clsx";
// import FormDialog1 from "./AddField";
import MemberEditorDialog1 from "./AddField";
import Checkbox from "@material-ui/core/Checkbox";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import url, {
  getpaymentaccount,
  urlphp,
  getcompanybank,
  getpaidDivision,
  getVendorList,
  getEmployee,
  navigatePath
} from "../../../../views/invoice/InvoiceService";
import FormLabel from "@material-ui/core/FormLabel";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete, createFilterOptions } from "@material-ui/lab"
import Adddivision from "./Adddivision";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { CheckBox } from "@material-ui/icons";
import useAuth from "app/hooks/useAuth";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const role = localStorage.getItem("role");

const usestyles = makeStyles(({ palette, ...theme }) => ({
  dropZone: {
    transition: "all 350ms ease-in-out",
    border: "2px dashed rgba(var(--body),0.3)",
    "&:hover": {
      background: "rgba(var(--body), 0.2) !important",
    },
  },
}));
const option = [
  {
    name: 'Cash',
    value: 'cash'
  },
  {
    name: 'Cheque',
    value: 'cheque'
  },
  {
    name: 'Bank Transfer',
    value: 'banktransfer'
  }
]
const CustomerForm = () => {
  let formData = new FormData();
  const [created_by, setcreated_by] = useState(1);
  const [
    shouldOpenConfirmationDialogbox,
    setShouldOpenConfirmationDialogbox,
  ] = useState(false);
  const [paid_date, setpaid_date] = useState(new Date());
  const { id } = useParams();
  const { user } = useAuth();
  const [paid_by, setpaid_by] = useState('');
  const [paid_to, setpaid_to] = useState();
  const [amount, setamount] = useState("");
  const [payment_account_id, setpayment_account_id] = useState("");
  const [payment_account_name, setpayment_account_name] = useState("");
  const [description, setdescription] = useState('');
  const [taxamount, settaxamount] = useState(0.0);
  const [referrence_bill_no, setreferrence_bill_no] = useState();
  const [tax, settax] = useState(false);
  const [accounttype, setaccounttype] = useState([]);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenEditorDialog1, setShouldOpenEditorDialog1] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const [cat, setcat] = useState([]);
  const [field, setfield] = useState([]);
  const [catid, setcatid] = useState("");
  const [catname, setcatname] = useState("");
  const [index1, setindex1] = useState("");
  const [files, setFiles] = useState([]);
  const [file_path, setfile_path] = useState();
  const [payment_account, setpayment_account] = useState([]);
  const [accountstatus, setaccountstatus] = useState(false);
  const [close, setclose] = useState(false);
  const [list, setList] = useState([]);
  const [bank_ref_no, setbank_ref_no] = useState("");
  const [bank_slip, setbank_slip] = useState();
  const [company, setcompany] = useState(false);
  const [isAlive, setisAlive] = useState(false);
  const { eid } = useParams();
  const [demo, setdemo] = useState("");
  const [ref_billno, setref_billno] = useState();
  const [billtype, setbilltype] = useState(false);
  const [divPositionutilize, setdivPositionutilize] = useState(null);
  const [divPosition, setdivPosition] = useState(null);
  const [division_account, setdivision_account] = useState([]);
  const [utilize_id, setutilize_id] = useState();
  const [utilize_name, setutilize_name] = useState('');
  const [paid_by_list, setpaid_by_list] = useState([]);
  const [div_id, setdiv_id] = useState(null);
  const [div_name, setdiv_name] = useState('');
  const [div_company, setdiv_company] = useState('');
  const [vatno, setvatno] = useState('');
  const [inv_no, setinv_no] = useState('');
  const [payment_mode, setpayment_mode] = useState('');
  const [cheque_no, setcheque_no] = useState('');
  const [bank_id, setbank_id] = useState('');
  const [companybank, setcompanybank] = useState([]);
  const [fileurl, setfileurl] = useState('');
  const [arrVal, setarrVal] = useState([]);
  const [message, setmessage] = useState('');
  const [amountVal, setamountVal] = useState('');
  const [statearr, setstatearr] = useState([]);
  const [paymentarr, setpaymentarr] = useState([]);
  const [filterArr, setfilterArr] = useState([]);
  const [paiddivision_account, setpaiddivision_account] = useState([]);
  const [Isopen, setIsopen] = useState(true);
  const [disableVal, setdisableVal] = useState(false);
  const [loading, setloading] = useState(false);
  const [vendor_id, setvendor_id] = useState('');
  const [vendorList, setvendorList] = useState([]);
  const [vendor_status, setvendor_status] = useState(false);
  const [employee_id, setemployee_id] = useState('0');
  const [employeeList, setemployeeList] = useState([]);
  const [employee_status, setemployee_status] = useState(false);

  var demoArr = [];


  const [
    DialogAdddivision,
    setDialogAdddivision,
  ] = useState(false);
  let arr;
  // const { getRootProps, isDragActive } = useDropzone({ accept: "image/*" });
  // const classes = usestyles();
  // const handlebankSelect = (event, f) => {
  //   setclose(true);
  //   setindex1(f);
  //   setbank_slip(event.target.files[0]);
  // };
  const handleBankSelect = (event, f) => {
    let files = event.target.files[0];
    const filename = URL.createObjectURL(event.target.files[0]);

    setbank_slip(files);
    setfileurl(filename)






  };

  const routerHistory = useHistory();


  const handlebillSelect = (event, f) => {
    let files = event.target.files;

    const src = URL.createObjectURL(event.target.files[0]);
    setfile_path(event.target.files[0]);
    setref_billno(src);
  };
  const utilizedivisionation = (id, name) => {

    setutilize_id(id);
    setutilize_name(name);
    setdivPositionutilize(null)
  };
  const deletehandlebillSelect = (event) => {
    setbilltype(false)
    setfile_path(null);
    setref_billno(null);
  };
  const handleDialogClosepayee = () => {
    setShouldOpenConfirmationDialogbox(false);
    setisAlive(false);
  };

  let sum = 0;

  const handleMultipleList = (index) => {


    // sum=paiddivision_account.reduce((a,v) =>  a = a + parseFloat(v.balance) , 0 )
    // statearr?.filter(function(e) { return e !== 'seven' })
    // sum=paiddivision_account.reduce((a,v) =>  a = a + parseFloat(v.balance) , 0 )
    // statearr?.filter(function(e) { return e !== 'seven' })

    setstatearr([])
    var calSum = 0;
    var count = 0;
    for (var ind in index) {

      // eslint-disable-next-line no-loop-func
      paiddivision_account.filter(f => f.name == index[ind]).map((item) => {


        // map array to replace the old comment with the new one

        if (amount > calSum && count <= 0) {
          calSum = calSum + item.balance
          item.isdisable = false
          if (item.type === "personal") {
            count++;
          }
          statearr.push([
            item.id,

            item.name,
            item.balance,
            item.div_id,
            item.type
          ]
          )
        }
        else {
          item.isdisable = true
        }










      })

    }

    arr = statearr
    sum = sum + statearr.reduce((a, v) => a = a + parseFloat(v[2]), 0)


    setpaymentarr(statearr)
    setamountVal(sum)
    if (sum < amount) {

      // setmessage("Insufficient Amount")

      // setamountVal(sum)
    }
    else {

      // setmessage("success")

      // setdisableVal(true)


      setIsopen(false)

    }



  };
  let count = 0;
  const handleMultipleListDemo = (index) => {
    setfilterArr(index);

    setstatearr([])
    var calSum = 0;

    for (var ind in index) {

      // eslint-disable-next-line no-loop-func
      paiddivision_account.filter(f => f.name == index[ind].name).map((item) => {


        // map array to replace the old comment with the new one

        if (amount > calSum && count <= 0) {

          calSum = calSum + item.balance
          item.isdisable = false
          if (item.type === "personal") {
            count = count + 1;

          }


          statearr.push([
            item.id,

            item.name,
            item.balance,
            item.div_id,
            item.type
          ]
          )
        }

        else {
          item.isdisable = true
        }




        return item;





      })

    }

    arr = statearr
    sum = sum + statearr.reduce((a, v) => a = a + parseFloat(v[2]), 0)


    setpaymentarr(statearr)
    setamountVal(sum)
    if (sum < amount) {


    }
    else {


      setIsopen(false)

    }



  };


  const handleFileSelect = (event, f) => {
    let files = event.target.files;

    setclose(true);
    setindex1(f);

    for (const iterator of files) {
      list.push({
        file: event.target.files[0],
        column_id: f,
        src: URL.createObjectURL(event.target.files[0]),
        progress: f,
      });
    }

    field.map((element, i) => {
      if (element.id === f) {
        element.file = event.target.files[0];
        element.column_id = f;
      }
    });

    setFiles(list);
  };


  const Menu1 = ({ data }) => {
    return (
      <li>
        {data.map((m, ind) => {
          return (
            <NestedMenuItem
              label={m.category.name}
              parentMenuOpen={handleItem}
              value="1"
              onClick={(e) =>
                searchcat(
                  m.sub_categories.length > 0,
                  m.category.name,
                  m.category.id
                )
              }
            >
              <MenuItem
                onClick={(e) => Addnewsubcat(m.category.id, m.category.name)}
              >
                <Icon align="left">add</Icon> Add Subcategory
              </MenuItem>

              {m.sub_categories.length > 0 ? (
                <Menu1 data={m.sub_categories} />
              ) : (
                <MenuItem
                  onClick={(e) => AddField(m.category.id, m.category.name)}
                >
                  <Icon align="left">add</Icon> Add Field
                </MenuItem>
              )}
            </NestedMenuItem>
          );
        })}
      </li>
    );
  };

  const handleRightClick = (event: React.MouseEvent) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX,
    });
  };
  const handleRight = (event: React.MouseEvent) => {
    if (divPosition) {
      return;
    }
    event.preventDefault();
    setdivPosition({
      top: event.pageY,
      left: event.pageX,
    });
  };
  const handlePostion = (event: React.MouseEvent) => {
    if (divPositionutilize) {
      return;
    }
    event.preventDefault();
    setdivPositionutilize({
      top: event.pageY,
      left: event.pageX,
    });
  }
  const adddiv = () => {
    setDialogAdddivision(true);
    setdivPositionutilize(null);
    setdivPosition(null)

  }


  const searchcat = (event, name, i) => {
    if (event) {
      setaccountstatus(false);
    } else {
      url.get(`columns/${i}`).then(({ data }) => {
        let arr = data[0].column.map((item, i) => {
          if (item.type === "date") {
            item.date = moment(new Date()).format('dd MMM YYYY');
            item.column_id = item.id
          }
          return item
        })
        setfield(arr);



      });
      setemployee_status(false)
      setvendor_status(false)
      if (i == 33) {
        setvendor_status(true)
      }
      if ((name.toUpperCase()).includes('SALARY')) {
        setemployee_status(true)
      }
      else {
        setemployee_status(false)
      }
      setaccountstatus(true);
      // setvendor_status(true);
      setpayment_account_id(i);
      setpayment_account_name(name);
      setMenuPosition(null);
    }
  };
  const Addnewsubcat = (i, n) => {
    setcatid(i);
    setcatname(n);
    setShouldOpenEditorDialog(true);
    setMenuPosition(null);
  };
  const AddField = (i, n) => {
    setcatid(i);
    setcatname(n);
    setShouldOpenEditorDialog1(true);
    setMenuPosition(null);
  };
  const handleItem = (e) => {
    setpayment_account_id(e);
  };
  const handleDialogDivisionClose = () => {
    setDialogAdddivision(false);
    setisAlive(false);
    setdivPositionutilize(false)
  };
  const paidivisionation = (id, name) => {

    setdiv_id(id);
    setdiv_name(name);
    setdivPosition(null)
  };

  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    setisAlive(true);
  };
  const [shouldOpenConfirmationDialog1, setShouldOpenConfirmationDialog1] =
    useState(false);
  const handleDialogClose1 = () => {
    setShouldOpenEditorDialog1(false);
    setisAlive(true);
  };

  useEffect(() => {
    // getpaymentaccount().then(({ data }) => {
    //   setaccounttype(data);

    // });
    // url.get('mjrExpense/'+localStorage.getItem('division')).then(({data})=>{
    //   setvendorList(data.vendor)
    //   setaccounttype(data.payment_account);
    //   setemployeeList(data.employee.getData);
    //   setcat(data.account_categories);
    //   setpayment_account(data.payment_account);
    //   setdivision_account(data.division);
    //   var arrVal = data.paidDivision.sort(function (obj1, obj2) {
    //     return obj1?.type?.localeCompare(obj2?.type);
    //   });
    //   var res = arrVal.map((item) => {
    //     item.isdisable = false;
    //   })

    //   setpaiddivision_account(arrVal);
    //   setcompanybank(data.companyBank);
     
    // })
    // getVendorList().then(({ data }) => {
    //   setvendorList(data)
    // })
    var arrVals

    // url.get("division").then(({ data }) => {
    //   setdivision_account(data);

    // });
    // getcompanybank().then(({ data }) => {
    //   setcompanybank(data);
    // });
    // getEmployee().then(({ data }) => {
    //   setemployeeList(data.getData);
    // });

    if (localStorage.getItem("role") !== "SA") {
      setpaid_by(localStorage.getItem("user_id"));
    }
    // url.get("account-categories").then(({ data }) => {
    //   setcat(data);
    // });


    const datas = getpaidDivision().then(({ data }) => {

      //   arrVals = data.sort(function (obj1, obj2) {
      //     return obj1.type.localeCompare(obj2.type);
      //  });



      //   setpaiddivision_account(arrVals);
      return data;

    })
    // var obj;
    // getpaidDivision()

    //   .then(response => response)
    //   .then(data => obj = data)
    //   .then(() =>

    //     url.get(`expense/${id}`).then(({ data }) => {
    //       arrVals = obj.data.sort(function (obj1, obj2) {
    //         return obj1.type.localeCompare(obj2.type);
    //       });

    //       console.log(data)

    //       setpaiddivision_account(arrVals);
    //       setvendor_id(data[0].vendor_id);
    //       setcompany(data[0].company_name);
    //       setpaid_to(data[0].paid_to != 'null' ? data[0].paid_to : null);

    //       setamount(parseInt(data[0]?.amount));
    //       setpaid_date(data[0]?.paid_date);
    //       setemployee_id(data[0]?.employee_id)
    //       setpaid_by(data[0]?.payment_account_id);
    //       setreferrence_bill_no(data[0]?.referrence_bill_no);
    //       setdescription(data[0].paid_to != 'null' ? data[0].description : null);
    //       setclose(true);
    //       setfield(data[0].column_data);
    //       setpayment_mode(data[0].payment_type)
    //       var payList;
    //       payList = data.mapdata.map((item, i) => {


    //         return item
    //       })

    //       var merged = [].concat.apply([], payList);
    //       var demo = merged.map((item) => {
    //         item.isdisable = true
    //         return item
    //       })
    //       setfilterArr(demo)
    //       // setpaid_by_list(merged)

    //       setstatearr([])
    //       var calSum = 0;
    //       var count = 0;
    //       for (var ind in merged) {

    //         // eslint-disable-next-line no-loop-func
    //         obj.data.filter(f => f.name == merged[ind].name).map((item) => {


    //           // map array to replace the old comment with the new one


    //           statearr.push([
    //             item.id,

    //             item.name,
    //             item.balance,
    //             item.div_id,
    //             item.type
    //           ]
    //           )












    //         })

    //       }

    //       arr = statearr
    //       sum = sum + statearr.reduce((a, v) => a = a + parseFloat(v[2]), 0)


    //       setpaymentarr(statearr)

    //       setamountVal(sum)
    //       // setpaid_by_list(payList)


    //       if (data[0].payment_type === "cheque") {
    //         setcheque_no(data[0].check_no)
    //       }
    //       let arr = [...data[0].column_data];
    //       arr.map((element, i) => {
    //         if (element.column_id == element.column['id']) {

    //           element['type'] = element.column['type'];
    //           if (!element.date) {
    //             element.date = new Date()
    //           }
    //           element[element.column['type']] = element.value;

    //         }
    //         return element;

    //       });


    //       setutilize_id(data[0]?.utilize_div_id);

    //       setdiv_id(data[0]?.div_id);
    //       setvatno(data[0]?.vatno);
    //       setdiv_company(data[0]?.company);
    //       setinv_no(data[0]?.inv_no);

    //       url.get("payment-account").then(({ data }) => {
    //         setarrVal(data)
    //         setpayment_account(data);
    //         setaccounttype(data);


    //       })








    //       if (data[0]?.tax) {
    //         settax(true);
    //         settaxamount(data[0]?.tax);
    //       }
    //       else {
    //         settax(false);
    //         settaxamount('0.00')
    //       }

    //       setaccountstatus(true);


    //       setdemo(data[0]?.account_category_id);

    //     }))



    // url.get(`columns/${eid}`).then(({ data }) => {
    //   setpayment_account_name(data[0]?.name);
    //   if ((data[0]?.name.toUpperCase()).includes('SALARY')) {
    //     setemployee_status(true)

    //   }
    //   setpayment_account_id(eid);
    //   if (eid == 33) {
    //     setvendor_status(true)

    //   }
    //   let result = data[0].column;

    //   const sum = result.map((item, index) => ({
    //     ...item,
    //     date: arr[index]?.value,
    //     text: arr[index]?.value,
    //     value: arr[index]?.value,
    //   }));



    // });
    var obj;
    // getpaidDivision()

    //   .then(response => response)
    //   .then(data => obj = data)
    //   .then(() =>

        url.get("mjrExpenseUpdate/"+localStorage.getItem('division')+"/"+id+"/"+eid).then(({ data }) => {


          setvendorList(data.vendor)
          setaccounttype(data.payment_account);
          setemployeeList(data.employee.getData);
          setcat(data.account_categories);
          setpayment_account(data.payment_account);
          setdivision_account(data.division);
          var arrVal = data.paidDivision.sort(function (obj1, obj2) {
            return obj1?.type?.localeCompare(obj2?.type);
          });
          var res = arrVal.map((item) => {
            item.isdisable = false;
          })
    
          setpaiddivision_account(arrVal);
          setcompanybank(data.companyBank);
          arrVals = data.paidDivision.sort(function (obj1, obj2) {
            return obj1.type.localeCompare(obj2.type);
          });

          
          setpaiddivision_account(arrVals);
          setvendor_id(data.expense[0].vendor_id);
          setcompany(data.expense[0].company_name);
          setpaid_to(data.expense[0].paid_to != 'null' ? data.expense[0].paid_to : null);

          setamount(parseInt(data.expense[0]?.amount));
          setpaid_date(data.expense[0]?.paid_date);
          setemployee_id(data.expense[0]?.employee_id)
          setpaid_by(data.expense[0]?.payment_account_id);
          setreferrence_bill_no(data.expense[0]?.referrence_bill_no);
          setdescription(data.expense[0].paid_to != 'null' ? data.expense[0].description : null);
          setclose(true);
          setfield(data.expense[0].column_data);
          setpayment_mode(data.expense[0].payment_type)
          var payList;
          console.log(data.expense.mapdata)
          payList = data.expense.mapdata.map((item, i) => {


            return item
          })

          var merged = [].concat.apply([], payList);
          var demo = merged.map((item) => {
            item.isdisable = true
            return item
          })
          setfilterArr(demo)
          // setpaid_by_list(merged)

          setstatearr([])
          var calSum = 0;
          var count = 0;
          for (var ind in merged) {

            // eslint-disable-next-line no-loop-func
            data.paidDivision.filter(f => f.name == merged[ind].name).map((item) => {


              // map array to replace the old comment with the new one


              statearr.push([
                item.id,

                item.name,
                item.balance,
                item.div_id,
                item.type
              ]
              )












            })

          }

          arr = statearr
          sum = sum + statearr.reduce((a, v) => a = a + parseFloat(v[2]), 0)


          setpaymentarr(statearr)

          setamountVal(sum)
          // setpaid_by_list(payList)


          if (data.expense[0].payment_type === "cheque") {
            setcheque_no(data.expense[0].check_no)
          }
          let arr = [...data.expense[0].column_data];
          arr.map((element, i) => {
            if (element.column_id == element.column['id']) {

              element['type'] = element.column['type'];
              if (!element.date) {
                element.date = new Date()
              }
              element[element.column['type']] = element.value;

            }
            return element;

          });


          setutilize_id(data.expense[0]?.utilize_div_id);

          setdiv_id(data.expense[0]?.div_id);
          setvatno(data.expense[0]?.vatno);
          setdiv_company(data.expense[0]?.company);
          setinv_no(data.expense[0]?.inv_no);

          // url.get("payment-account").then(({ data }) => {
            setarrVal(data.payment_account)
            setpayment_account(data.payment_account);
            setaccounttype(data.payment_account);


          // })








          if (data.expense[0]?.tax) {
            settax(true);
            settaxamount(data.expense[0]?.tax);
          }
          else {
            settax(false);
            settaxamount('0.00')
          }

          setaccountstatus(true);


          setdemo(data.expense[0]?.account_category_id);
          setpayment_account_name(data.columns[0]?.name);
          if ((data.columns[0]?.name.toUpperCase()).includes('SALARY')) {
            setemployee_status(true)
    
          }
          setpayment_account_id(eid);
          if (eid == 33) {
            setvendor_status(true)
    
          }
          let result = data.columns[0].column;
    
          let sum = result.map((item, index) => ({
            ...item,
            date: arr[index]?.value,
            text: arr[index]?.value,
            value: arr[index]?.value,
          }));

        })
        // )



    // url.get(`columns/${eid}`).then(({ data }) => {
     



    // });




    return setisAlive(true);

  }, []);

  const handleSubmit = async (values, { isSubmitting, resetForm }) => {

    const newItem = new FormData();
    for (const key of Object.keys(files)) {
      newItem.append("item", files[key].file);
    }
    if (tax) {
      formData.append("tax", tax ? (parseFloat(amount) * 15) / (100 + 15).toFixed(2) : null);
      formData.append("company_name", company);
    }
    formData.append("paid_date", paid_date);
    formData.append("referrence_bill_no", referrence_bill_no);
    formData.append("amount", amount);
    formData.append("paid_to", paid_to ? paid_to : " ");
    formData.append("description", description ? description : " ");
    formData.append("created_by", created_by);
    formData.append("account_category_id", payment_account_id);
    formData.append("paid_by", paid_by);
    formData.append("payment_account_id", paid_by);
    formData.append("created_by", created_by);

    formData.append("status", "new");
    formData.append("data", JSON.stringify(field));
    formData.append("bank_ref_no", bank_ref_no);
    formData.append("bank_slip", bank_slip);
    formData.append("file_path", file_path);
    formData.append("company", div_company ? div_company : '');
    formData.append("div_id", localStorage.getItem('division'));
    formData.append("user_id", user.id);
    formData.append("utilize_div_id", utilize_id);

    formData.append("vatno", vatno);
    formData.append("inv_no", inv_no);
    formData.append("payment_type", payment_mode);
    formData.append("bank_slip", bank_slip);
    formData.append("cheque_no", cheque_no);
    formData.append("bank_id", bank_id);
    formData.append("id", id);
    formData.append("vendor_id", vendor_id ? vendor_id : 0);
    formData.append("employee_id", employee_id);
    files.map((answer, i) => {
      formData.append(`file${answer.column_id}`, answer.file);

    });

    // Axios.post(`${urlphp}/php_file/controller/expenseupdate.php`, formData, {
    //   method: "post",
    //   headers: {
    //     "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
    //     "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
    //     "Access-Control-Max-Age": 86400,
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    var sum = 0;
    var count = 0;
    var bal = 0;
    var temp = amount;
    var utilze_divAmount = 0;

    var status = true;
    var personExist = paymentarr.some(obj => obj[4] === "personal")

    utilze_divAmount = paymentarr.filter(obj => obj[0] === utilize_id).reduce((a, v) => a = a + parseFloat(v[2]), 0)
    if (utilze_divAmount === 0) {
      // utilize division doesn't exists 
      temp = amount

    }
    else {
      // utilize division  exists 
      temp = amount - utilze_divAmount
      //do a copy of selected account list without utilized div
    }

    // sum=sum+key[2];
    // bal=key[2];

    if (amount > amountVal) {
      //insufficient

      if (personExist || !personExist) {
        for (const key of paymentarr) {
          if (key[0] !== utilize_id) {
            //its not utilized div

            if (temp > key[2]) {
              if (key[4] === "personal") {
                formData.append('payment_account_ids[]', [key[0], key[1], temp, key[3], key[4]])
              }
              else {
                formData.append('payment_account_ids[]', key)
                temp = temp - key[2];
              }

            }
            else {
              formData.append('payment_account_ids[]', [key[0], key[1], temp, key[3], key[4]])
            }

          }
          else {
            formData.append('payment_account_ids[]', key)
          }
        }
      }

      else {
        status = false;

      }
    }

    else {
      //Sufficicent


      // consider full list
      for (const key of paymentarr) {
        if (key[0] !== utilize_id) {
          //its not utilized div

          if (temp > key[2]) {
            formData.append('payment_account_ids[]', key)
            temp = temp - key[2];
          }
          else {
            formData.append('payment_account_ids[]', [key[0], key[1], temp, key[3], key[4]])
          }

        }
        else {
          formData.append('payment_account_ids[]', key)
        }



      }







    }


    if (status) {
      url.post('expenseUpdate', formData).then(({ data }) => {

        Swal.fire({
          title: "Success",
          type: "success",
          icon: "success",
          text: "Data updated successfully.",
        }).then(({ data }) => {

          routerHistory.push(navigatePath + `/expenseview`);
        });
      });
    }
    else {
      setmessage("Insufficient Amount")
    }

  };

  const handleField_Fileremove = (index) => {
    let tempList = [...files];
    // tempList.splice(index, 1);
    tempList.map((element, i) => {
      if (index === i) {
        element["file"] = null;
        element["progress"] = null;
      }
    });
    setFiles([...tempList]);
  };

  const handleDateChange = (date) => {
    setpaid_date(date);
  };

  const handleComment = (e, item, i) => {
    e.preventDefault();
    let result = field; // copy state
    result = result.map((el) => {
      // map array to replace the old comment with the new one
      if (el.name === item.name) {
        el.value = e.target.value;
        el.text = e.target.value;
        el.column_id = i;
      }
      return el;
    });
    setfield(result);
    // set state with new comment
  };
  const handleCommentdate = (e, item, i) => {
    let result = field; // copy state
    result = result.map((el) => {
      // map array to replace the old comment with the new one
      if (el.name === item.name) {
        el.date = e;
        el.column_id = i;
      } else {
        el.date = new Date();
        el.column_id = i;
      }
      return el;
    });
    setfield(result);

    // set state with new comment
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "EXPENSE", path: navigatePath + "/expenseview" },
            { name: "UPDATE EXPENSE" },
          ]}
        />
      </div>
      {shouldOpenEditorDialog && (
        <MemberEditorDialog
          handleClose={handleDialogClose}
          open={shouldOpenEditorDialog}
          accounttype={setaccounttype}
          catid={catid}
          catname={catname}
          setcat={setcat}
        />
      )}
      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}
          text="Are you sure to delete?"
        />
      )}
      {shouldOpenEditorDialog1 && (
        <MemberEditorDialog1
          handleClose={handleDialogClose1}
          open={shouldOpenEditorDialog1}
          accounttype={setaccounttype}
          catid={catid}
          catname={catname}
          setcat={setcat}
        />
      )}
      {shouldOpenConfirmationDialog1 && (
        <ConfirmationDialog
          open={shouldOpenConfirmationDialog1}
          onConfirmDialogClose={handleDialogClose1}
          text="Are you sure to delete?"
        />
      )}
      {DialogAdddivision && (
        <Adddivision
          handleClose={handleDialogDivisionClose}
          open={DialogAdddivision}
          paymentaccount={setpayment_account}
          division={setdivision_account}



        />
      )}
      {shouldOpenConfirmationDialogbox && (
        <Addpaidaccount
          // handleClose={handleDialogClose}
          open={shouldOpenConfirmationDialogbox}
          paymentaccount={setpayment_account}
          handleClose={handleDialogClosepayee}


        />
      )}

      <Card elevation={3}>
        <div className="flex p-4">
          <h4 className="m-0">UPDATE EXPENSE</h4>
        </div>
        <Divider className="mb-2" />

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setSubmitting,
            setFieldValue,
            resetForm,
          }) => (
            <form className="p-4" onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div className="px-0 flex justify-between">
                    <div>
                      {/* <Button
                    className="mb-4 ml-0"
                    variant="outlined"
                    size="small"
                    onClick={handlePostion}
                    style={{width:320,height:37}}
                  >
                    <span style={{ textAlign: "left" }}>
                      Utilized Division
                      <Menu
                        open={!!divPositionutilize}
                        onClose={() => setdivPositionutilize(null)}
                        anchorReference="anchorPosition"
                        anchorPosition={divPositionutilize}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        
                        <MenuItem  onClick={()=>adddiv()}>
                      <Icon >
                          add
                      </Icon>ADD NEW
                      </MenuItem>
                        {arrVal.filter(obj=>obj.type==="division").map((items, index) => (
                          (<MenuItem id={items.id} onClick={(e) => utilizedivisionation(items.id,items.name)}>{items.name} </MenuItem>)
                        ))}
                        
                      </Menu>
                    </span>
                  </Button> */}
                      <FormGroup variant="outlined" style={{ width: 320, height: 37 }}>
                        <FormControl variant="outlined" size="small"
                          className="mb-4" style={{ width: 320, height: 37 }} >
                          <InputLabel htmlFor="outlined-age-native-simple">Utilized Division</InputLabel>
                          <Select
                            native
                            value={utilize_id ? utilize_id : ''}
                            // onChange={handleChange}
                            onChange={e => setutilize_id(e.target.value)}
                            size="small"
                            label="Utilized Division"
                            inputProps={{
                              name: 'utilize_id',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            {arrVal.filter(obj => obj.type === "division").map((item, ind) => (
                              <option value={item.id}>{item.name}</option>
                            ))}
                          </Select>
                        </FormControl>

                      </FormGroup>
                    </div>
                    <div style={{ paddingLeft: '5px' }}>
                      <Button
                        className="mb-4 w-full"
                        variant="outlined"
                        size="small"
                        onClick={handleRightClick}
                        style={{ width: 235, height: 37 }}
                      >
                        <span style={{ textAlign: "left" }}>
                          Expenses Category
                          <Menu
                            open={!!menuPosition}
                            onClose={() => setMenuPosition(null)}
                            anchorReference="anchorPosition"
                            anchorPosition={menuPosition}
                          >
                            {" "}
                            <MenuItem onClick={(e) => Addnewsubcat(null)}>
                              <Icon align="left">add</Icon>Add Expenses Category
                            </MenuItem>
                            <Menu1 data={cat}></Menu1>
                          </Menu>
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="px-0 flex justify-between">
                    {/* <div>
                      {utilize_id&&(<TextField
                        className="mb-4 w-full"
                        label="Utilized Division"
                        name="payment_account_name"
                        inputProps={{style: {textTransform: 'capitalize'}}}
                        size="small"
                        variant="outlined"
                        autoComplete="none"
                        style={{width:320}}
                        value={utilize_name}
                        required
                        // onChange={e => setpayment_account_id(e.target.value)}
                      />)}
                      </div> */}

                    <TextField
                      className="mb-4 w-full"
                      label="Payment Account"
                      name="payment_account_name"
                      size="small"
                      variant="outlined"
                      autoComplete="none"

                      value={payment_account_name}
                    />
                  </div>
                  {field.map((item, index) => {

                    return (
                      <span>
                        {item.type === "file" && (
                          <div>
                            <label htmlFor="upload-multiple-file">
                              {item.name}
                            </label>
                            <TextField
                              className="mb-4 w-full"
                              onChange={(e) => handleFileSelect(e, item.id)}
                              id="upload-multiple-file"
                              type="file"
                              variant="outlined"
                              size="small"
                              autoComplete="none"

                            />

                            {close && (
                              <span>
                                {files.map((items, index) => {

                                  return (
                                    <span>
                                      {items.progress === item.id && (
                                        <span>
                                          {item.src ? (
                                            <>
                                              <img
                                                src={items.src}
                                                width="50px"
                                                height="50px"
                                              />
                                              <Icon
                                                className="bg-error"
                                                onClick={() =>
                                                  handleField_Fileremove(
                                                    index
                                                  )
                                                }
                                              >
                                                cancel
                                              </Icon>
                                            </>
                                          ) : (
                                            <>
                                              <img
                                                src={items.file}
                                                width="50px"
                                                height="50px"
                                              />
                                              <Icon
                                                className="bg-error"
                                                onClick={() =>
                                                  handleField_Fileremove(
                                                    index
                                                  )
                                                }
                                              >
                                                cancel
                                              </Icon>
                                            </>
                                          )}
                                        </span>
                                      )}
                                    </span>
                                  );
                                })}
                              </span>
                            )}
                          </div>
                        )}
                        {item.type === "text" && (
                          <TextField
                            className="mb-4 w-full"
                            label={item.name ? item.name : item.column.name}
                            name="payment_account_id"
                            size="small"
                            variant="outlined"
                            name={item.name}
                            value={item.value}
                            autoComplete="none"
                            onChange={(e) => {
                              handleComment(e, item, item.id);
                            }}
                            required
                          />
                        )}
                        {item.type === "date" && (
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              className="mb-4 w-full"
                              margin="none"
                              label={item.name ? item.name : item.column.name}
                              inputVariant="outlined"
                              name="date"

                              size="small"
                              autoOk={false}
                              hintText="Portrait Dialog"
                              errorText="This is an error message."
                              value={item?.date}
                              onChange={(e) => {
                                handleCommentdate(e, item, item.id);
                              }}
                              format="MMMM dd yyyy"
                              required
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </span>
                    );
                  })}


                  {vendor_status && (<TextField
                    className="mb-4 w-full"
                    label="Vendor"
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    name="firstName"
                    size="small"
                    variant="outlined"
                    autoComplete="none"
                    value={vendor_id}
                    onChange={(e) => setvendor_id(e.target.value)}
                    select
                  >
                    {vendorList.map((item, ind) => (
                      <MenuItem value={item.id} key={item}>
                        {item.firm_name}
                      </MenuItem>
                    ))}
                  </TextField>)}
                  {employee_status && (<TextField
                    className="mb-4 w-full"
                    label="Employee"
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    name="firstName"
                    size="small"
                    variant="outlined"
                    autoComplete="none"
                    value={vendor_id}
                    onChange={(e) => setvendor_id(e.target.value)}
                    select
                  >
                    {employeeList.map((item, ind) => (
                      <MenuItem value={item.emp_id} key={item}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>)}


                  <TextField
                    className="mb-4 w-full"
                    label="Paid To"
                    name="firstName"
                    size="small"
                    variant="outlined"
                    type="text"
                    // autoComplete="none"
                    value={paid_to ? paid_to : ''}
                    onChange={(e) => setpaid_to(e.target.value)}
                  />

                  <CurrencyTextField
                    className="mb-4 w-full"
                    label="Amount"
                    name="Amount"
                    size="small"
                    variant="outlined"
                    value={amount}
                    currencySymbol="SAR"
                    autoComplete="none"
                    onChange={(event, value) => setamount(value)}
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="mb-4 w-full"
                      margin="none"
                      label="Payment Date"
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      value={paid_date}
                      format="MMMM dd, yyyy"
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>

                  {/* <div className="px-0 flex justify-between">
                  <div>
                <Button
                    className="mb-4 w-full"
                    variant="outlined"
                    size="small"
                    onClick={handleRight}
                    style={{width:320,height:37}}
                  >
                    <span style={{ textAlign: "left" }}>
                      Paid Division
                      <Menu
                        open={!!divPosition}
                        onClose={() => setdivPosition(null)}
                        anchorReference="anchorPosition"
                        anchorPosition={divPosition}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        
                        <MenuItem  onClick={()=>adddiv()}>
                      <Icon >
                          add
                      </Icon>ADD NEW
                      </MenuItem>
                        {division_account.map((items, index) => (
                          (<MenuItem id={items.id} onClick={(e) => paidivisionation(items.id,items.name)}>{items.name} </MenuItem>)
                        ))}
                        
                      </Menu>
                    </span>
                  </Button>
                  </div>
                  <div>
                  {div_id&&(<TextField
                      className=" w-full"
                      label="Paid Division"
                      name="payeename"
                      size="small"
                      variant="outlined"
                      value={div_name}
                      inputProps={{style: {textTransform: 'capitalize'}}}
                      autoComplete="none"
                      style={{width:320}}
                      onChange={(e) => setdiv_name(e.target.value)}
                    ></TextField>)}
                    </div>
                    </div> */}
                  {/* <FormGroup>
         
         {div_id &&(<FormControl variant="outlined" size="small"
         className="mb-4">
<InputLabel htmlFor="outlined-age-native-simple">Paid Division</InputLabel>
<Select
native
value={div_id}
// onChange={handleChange}
onChange={e => setdiv_id(e.target.value)}
size="small"
label="Paid Division"
inputProps={{
  name: 'div_id',
  id: 'outlined-age-native-simple',
}}
>
              
              
               {division_account.map((item, ind) => (
<option value={item.id} >{item.name}-{parseFloat(item.opening_bal).toLocaleString(undefined,{minimumFractionDigits:2})}</option>
))}
              </Select>
              </FormControl>)}
              </FormGroup> */}

                  {role === "SA" ? (
                    //                     <FormGroup variant="outlined">
                    //                     <FormControl variant="outlined" size="small"
                    //        className="mb-4" >
                    // <InputLabel 

                    // >PAID ACCOUNT</InputLabel>
                    // <Select

                    // multiple
                    // autoClose={amountVal}

                    // displayEmpty
                    // onMenuClose={amountVal}
                    // className="mb-4"
                    // disabled={!amount}
                    // inputProps={{
                    // name: 'Bank',
                    // id: 'outlined-age-native-simple',
                    // }}

                    // label="PAID ACCOUNT"



                    // value={paid_by_list}
                    // onChange={(e,ind) => {setpaid_by_list(e.target.value);handleMultipleList(e.target.value)}}
                    // // input={<Input />}
                    // renderValue={(selected,id) =>{  if (selected.length === 0) {
                    // return <span>PAID ACCOUNT</span>;
                    // };return selected.join(',')}}
                    // // MenuProps={MenuProps}
                    // >

                    // <MenuItem  onClick={()=>setShouldOpenConfirmationDialogbox(true)}>
                    //           <Icon >
                    //               add
                    //           </Icon>ADD NEW
                    //           </MenuItem>
                    // {paiddivision_account.sort(obj=>obj.type).map((item, ind) => (

                    //            <MenuItem value={item.name} key={ind} disabled={item.isdisable}  style={{"text-transform": 'uppercase'}} >
                    //              <Checkbox checked={paid_by_list.indexOf(item.name) > -1} />

                    //              <td width="100px">{item.name}</td><td align="center" width="200px" >{item.type}</td><td style={{textAlign:'right'}}>{parseFloat(item.balance).toLocaleString(undefined,{minimumFractionDigits:2})}</td>
                    //            </MenuItem>


                    //          ))}
                    // </Select>
                    // {message &&(<div className="flex-column items-start">
                    // <div className="flex items-center ">
                    // {message=="Insufficient Amount"?(<Icon className="mr-2" fontSize="small" color="error">
                    // info
                    // </Icon>):<Icon className="mr-2 text-green" fontSize="small" color=".bg-green">
                    // info
                    // </Icon>}
                    // <small className="text-black">
                    // {message} {amountVal}
                    // </small>
                    // </div>
                    // </div>)}
                    // </FormControl>

                    //                  </FormGroup>
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      className="mb-4"
                      inputProps={{ style: { width: '15px' } }}
                      disabled={!amount}
                      value={filterArr}
                      options={paiddivision_account}
                      getOptionSelected={(option, value) => option.id === value.id}
                      // getOptionSelected={(option) => option.name}
                      // defaultValue={[filterArr]}
                      // onChange={(event, newValue) => {

                      //   setfilterArr(newValue);
                      // }}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (

                          <Chip
                            label={option.name}
                            {...getTagProps({ index })}
                          // disabled={filterArr.indexOf(option) !== -1}
                          />
                        ))
                      }
                      size="small"
                      getOptionLabel={(option) => option.name}
                      getOptionDisabled={(option) => option.isdisable === true || amount < amountVal}


                      onChange={(event: any, value: string | null) => handleMultipleListDemo(value)}



                      renderOption={(option, { selected }) => (

                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}

                          />

                          <td width="100px">{option.name}</td><td align="center" width="200px" >
                            {option.type === "division" && (<small
                              style={{ cursor: 'pointer' }}
                              className={clsx({
                                "border-radius-4  text-white px-2 py-2 w-30 pl-4 pr-3 bg-error": true,

                              })}
                            >

                              {option.type}


                            </small>)}
                            {option.type === "personal" && (<small
                              style={{ cursor: 'pointer' }}
                              className={clsx({
                                "border-radius-4  text-white px-2 py-2 w-30  bg-secondary": true,

                              })}
                            >

                              {option.type}


                            </small>)}
                          </td><td style={{ textAlign: 'right' }}>{parseFloat(option.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>

                        </React.Fragment>

                      )}
                      // style={{ width: 500 }}

                      renderInput={(params) => (

                        <TextField {...params} variant="outlined" label="Paid Account" />)
                      }
                    />
                  ) : (
                    <TextField
                      className="mb-4 w-full"
                      label="Paid By"
                      name="firstName"
                      size="small"
                      variant="outlined"
                      value={localStorage.getItem("user_name")}
                      autoComplete="off"
                      selected
                    >
                      {payment_account.map((item, ind) => (
                        <MenuItem value={item.id} key={item}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  {/* {(paid_by === 11 || paid_by === 12) && (
                    <TextField
                      className="mb-4 w-full"
                      label="Reference Number"
                      name="firstName"
                      size="small"
                      variant="outlined"
                      value={bank_ref_no}
                      autoComplete="none"
                      onChange={(e) => setbank_ref_no(e.target.value)}
                    ></TextField>
                  )} */}
                  <TextField
                    className="w-full mb-4"
                    label="Payment Mode"
                    onChange={e => setpayment_mode(e.target.value)
                    }
                    variant="outlined"
                    type="text"
                    name="cdescription"
                    size="small"
                    value={payment_mode}
                    select
                  >
                    {option.map((item, ind) => (
                      <MenuItem value={item.value} key={item}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {payment_mode === 'cheque' && (<TextField
                    className="w-full mb-4"
                    label="Cheque Number"
                    onChange={e => setcheque_no(e.target.value)
                    }
                    variant="outlined"
                    type="text"
                    name="cdescription"
                    size="small"
                    value={cheque_no}

                  ></TextField>
                  )}
                  <FormGroup>
                    {payment_mode === 'banktransfer' &&
                      <FormControl variant="outlined" size="small"
                        className="mb-4">
                        <InputLabel htmlFor="outlined-age-native-simple">Bank</InputLabel>
                        <Select
                          native
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
                          {companybank.map((item, ind) => (
                            <option value={item.id}>{item.name}-{item.ac_no}</option>
                          ))}
                        </Select>
                      </FormControl>
                    }
                  </FormGroup>

                  {payment_mode === 'banktransfer' &&
                    <>
                      <label htmlFor="upload-multiple-file">
                        Upload Bank Slip
                      </label>
                      <TextField
                        //  className="hidden"
                        className="mb-4 w-full"
                        onChange={(e) => handleBankSelect(e)}
                        id="upload-multiple-file"
                        type="file"
                        variant="outlined"
                        name="file"
                        size="small"
                        autoComplete="none"

                      //  value={item.name}
                      />
                      <div
                        onClick={() => { setfileurl(null); setbank_slip(null) }}
                        style={{
                          padding: "5px 5px 5px 5px",
                          cursor: "pointer"
                        }}
                      >
                        {fileurl && <CardActionArea>
                          <img
                            width="50%"
                            height="50%"
                            // className={classes.media}
                            src={fileurl}
                          />
                        </CardActionArea>}
                      </div>
                    </>

                  }

                  <label for="myfile">Upload Reference Bill :</label>
                  <TextField
                    //  className="hidden"
                    className="mb-4 w-full"
                    id="upload-multiple-file"
                    type="file"
                    variant="outlined"
                    size="small"
                    autoComplete="none"
                    onChange={(event) => handlebillSelect(event)}


                  />

                  {/* {billtype&&(<span>
                                              <img
                                                src={ref_billno}
                                                width="50px"
                                                height="50px"
                                              />
                                              <Icon
                                                className="bg-error"
                                                onClick={() =>
                                                  deletebillSelect()
                                                }
                                              >
                                                cancel
                                              </Icon>
                                            </span>)} */}
                  <div
                    onClick={() => { setref_billno(null); setfile_path(null) }}
                    style={{
                      padding: "5px 5px 5px 5px",
                      cursor: "pointer"
                    }}
                  >
                    {ref_billno && <CardActionArea>
                      <img
                        width="50%"
                        height="50%"
                        // className={classes.media}
                        src={ref_billno}
                      />
                    </CardActionArea>}
                  </div>
                  {/* <div
                    className={clsx({
                      "border-radius-4 h-160 w-full flex justify-center items-center cursor-pointer mb-4": true,
                      [classes.dropZone]: true,
                      "bg-light-gray": !isDragActive,
                      "bg-gray": isDragActive,
                    })}
                    {...getRootProps()}
                    onChange={(e) => handlebillSelect(e)}
                  >
                    <div className="flex-column items-center">
                      {!ref_billno ? (
                        <Icon
                          variant="contained"
                          component="label"
                          onChange={(event) => handlebillSelect(event)}
                        >
                          file_upload
                          <input type="file" hidden />
                        </Icon>
                      ) : (
                        <>
                          <ImageZoom
                            image={{
                              src: `${ref_billno}`,
                              alt: "Golden Gate Bridge",
                              className: "img",
                              style: { width: "50em" },
                            }}
                            zoomImage={{
                              src: `${ref_billno}`,
                              alt: "Golden Gate Bridge",
                            }}
                          ></ImageZoom>
                          <Icon
                            color="error"
                            style={{ position: "absolute", marginTop: 250 }}
                            onClick={(e) => deletehandlebillSelect()}
                          >
                            delete
                          </Icon>
                        </>
                      )}
                    </div>
                  </div> */}
                  {/* <TextField
                    className="mb-4 w-full"
                    label="Referrence Bill No"
                    name="website"
                    size="small"
                    type="text"
                    variant="outlined"
                    autoComplete="none"
                    value={referrence_bill_no}
                    onChange={(e) => setreferrence_bill_no(e.target.value)}
                  /> */}

                  {/* {(paid_by === 11 || paid_by === 12) && (
                    <span>
                      <label for="myfile">Upload Bank Slip :</label>
                      <TextField
                        className="mb-4 w-full"
                        onChange={(e) => handlebankSelect(e)}
                        id="upload-multiple-file"
                        type="file"
                        label=""
                        variant="outlined"
                        autoComplete="none"
                        size="small"
                      />
                    </span>
                  )} */}

                  <TextField
                    className="mb-4 w-full"
                    label="Description"
                    name="workPhone"
                    size="small"
                    variant="outlined"
                    multiline
                    value={description ? description : ''}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    // autoComplete="Disabled"
                    onChange={(e) => setdescription(e.target.value)}
                  />

                  <FormLabel component="legend" labelPlacement="start">
                    Tax paid?
                  </FormLabel>
                  <RadioGroup
                    className="mb-4"
                    name="gender"
                    // onChange={handleChange}
                    value={tax}
                    row
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio color="secondary" />}
                      label="Yes"
                      onChange={() => settax(true)}
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio color="secondary" />}
                      label="No"
                      onChange={() => settax(false)}
                      labelPlacement="end"
                    />{" "}
                    {/* {tax && (
                      <CurrencyTextField
                        label="Tax Amount"
                        name="website"
                        size="small"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={taxamount}
                        currencySymbol="SAR"
                        onChange={(event, value) => settaxamount(value)}
                      />
                    )} */}
                    {tax && <TextField
                      className="mb-4 w-full"
                      label="Company Name"
                      name="workPhone"
                      size="small"
                      variant="outlined"
                      value={div_company}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                      onChange={(e) => setdiv_company(e.target.value)}
                    />}
                    {tax &&
                      (<TextField
                        className="mb-4 w-full"
                        label="VAT Number"
                        name="workPhone"
                        size="small"
                        type="text"
                        variant="outlined"
                        value={vatno}
                        onChange={(e) => setvatno(e.target.value)}
                      />)}
                    {tax &&
                      (<TextField
                        className="mb-4 w-full"
                        label="Invoice Number"
                        name="workPhone"
                        size="small"
                        variant="outlined"
                        value={inv_no}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                        autoComplete="Disabled"
                        onChange={(e) => setinv_no(e.target.value)}
                      />)}
                  </RadioGroup>

                  {tax && (
                    <div className="mb-4">
                      <FormControlLabel
                        style={{ fontWeight: 1000 }}
                        className="block h-32"
                        control={<Checkbox />}
                        label="I agree The above mentioned?"
                        value={company}
                        onChange={(e) => setcompany(!company)}
                      />
                      <label>Company name</label><br></br>
                      <label>Invoice Number</label><br></br>
                      <label>VAT Number is as per the uploaded file</label>
                    </div>
                  )}
                </Grid>
              </Grid>
              {message && (<div className="flex-column items-start">
                <div className="flex items-center ">
                  {message == "Insufficient Amount" ? (<Icon className="mr-2" fontSize="small" color="error">
                    info
                  </Icon>) : <Icon className="mr-2 text-green" fontSize="small" color=".bg-green">
                    info
                  </Icon>}
                  <small className="text-black">
                    {message} {amountVal}
                  </small>
                </div>
              </div>)}
              <div className="mt-6">
                <Button className="mr-4 py-2" color="primary" variant="outlined" type="submit" disabled={loading}>
                  <Icon>save</Icon> SAVE
                </Button>
                <Button
                  className="mr-4 py-2"
                  color="secondary"
                  variant="outlined"
                  type="submit"
                  onClick={() => routerHistory.push(navigatePath + "/expenseview")}
                >
                  <Icon>cancel</Icon>
                  <span className="pl-2 capitalize">CANCEL</span>
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Card>
    </div >
  );
};

const initialValues = {
  customerType: "",
};

export default CustomerForm;
