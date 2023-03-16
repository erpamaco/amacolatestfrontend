import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import NestedMenuItem from "material-ui-nested-menu-item";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { useHistory } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import './Style.css'

import clsx from "clsx";
// import { useDropzone } from "react-dropzone";
// import clsx from "clsx";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
// import ImageZoom from "react-medium-image-zoom";
import {
  Grid,
  RadioGroup,
  // TableCell,
  FormControlLabel,
  FormControl,
  // Input,
  FormGroup,
  Select,
  CardActionArea,
  InputLabel,
  Radio,
  Card,
  Divider,
  TextField,
  MenuItem,
  Button,
  Icon,
  Menu,
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "matx";

import MemberEditorDialog from "./paymentaccount";
import Addpaidaccount from "./Addpaidaccount";
import Adddivision from "./Adddivision";

import MemberEditorDialog1 from "./AddField";
import Checkbox from "@material-ui/core/Checkbox";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import url, {
  getpaymentaccount,
  getcompanybank,
  getpaidDivision,
  getVendorList,
  getEmployee,
  navigatePath,
} from "../../../../views/invoice/InvoiceService";
import FormLabel from "@material-ui/core/FormLabel";
// import { Table } from "@material-ui/core";
// import { sumBy } from "lodash";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import useAuth from "app/hooks/useAuth";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));
const role = localStorage.getItem("role");
const option = [
  {
    name: "Cash",
    value: "cash",
  },
  {
    name: "Cheque",
    value: "cheque",
  },
  {
    name: "Bank Transfer",
    value: "banktransfer",
  },
];

const CustomerForm = () => {
  let formData = new FormData();
  const classes = useStyles();
  const { user } = useAuth();

  const [created_by, setcreated_by] = useState(1);
  const [paid_date, setpaid_date] = useState(new Date());

  const [paid_by, setpaid_by] = useState("");
  const [paid_by_list, setpaid_by_list] = useState([]);
  const [paid_to, setpaid_to] = useState("");
  const [amount, setamount] = useState("");
  const [payment_account_id, setpayment_account_id] = useState("");
  const [payment_account_name, setpayment_account_name] = useState("");
  const [description, setdescription] = useState("");
  const [taxamount, settaxamount] = useState(0.0);
  const [referrence_bill_no, setreferrence_bill_no] = useState("");
  const [tax, settax] = useState(false);
  const [accounttype, setaccounttype] = useState([]);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenEditorDialog1, setShouldOpenEditorDialog1] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const [divPosition, setdivPosition] = useState(null);
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
  const [ref_billno, setref_billno] = useState();
  const [company, setcompany] = useState(false);
  const [isAlive, setisAlive] = useState(false);
  const [billtype, setbilltype] = useState(false);
  const [payee, setpayee] = useState(false);
  const [payeename, setpayeename] = useState();
  const [div_id, setdiv_id] = useState(null);
  const [utilize_id, setutilize_id] = useState(null);
  const [div_name, setdiv_name] = useState(null);
  const [utilize_name, setutilize_name] = useState(null);
  const [divPositionutilize, setdivPositionutilize] = useState(null);
  const [division_account, setdivision_account] = useState([]);
  const [paiddivision_account, setpaiddivision_account] = useState([]);
  const [div_company, setdiv_company] = useState("");
  const [vatno, setvatno] = useState("");
  const [inv_no, setinv_no] = useState("");
  const [payment_mode, setpayment_mode] = useState("");
  const [cheque_no, setcheque_no] = useState("");
  const [bank_id, setbank_id] = useState("");
  const [companybank, setcompanybank] = useState([]);
  // /const [paymentaccount, setpaymentaccount] = useState([]);
  const [fileurl, setfileurl] = useState("");
  const [statearr, setstatearr] = useState([]);
  const [paymentarr, setpaymentarr] = useState([]);
  const routerHistory = useHistory();

  const [Isopen, setIsopen] = useState(true);
  const [message, setmessage] = useState("");
  const [disableVal, setdisableVal] = useState(false);
  const [amountVal, setamountVal] = useState("");
  const [vendor_id, setvendor_id] = useState("0");
  const [employee_id, setemployee_id] = useState("0");
  const [vendorList, setvendorList] = useState([]);
  const [filtervendorList, setfiltervendorList] = useState([]);
  const [filtervendorList2, setfiltervendorList2] = useState([]);
  const [employeeList, setemployeeList] = useState([]);
  const [loading, setloading] = useState(false);
  const [vendor_status, setvendor_status] = useState(false);
  const [employee_status, setemployee_status] = useState(false);
  const [state, setState] = useState([]);

  const [shouldOpenConfirmationDialogbox, setShouldOpenConfirmationDialogbox] =
    useState(false);
  const [DialogAdddivision, setDialogAdddivision] = useState(false);

  const handlebillSelect = (event, f) => {
    setref_billno();
    const src = URL.createObjectURL(event.target.files[0]);

    setfile_path(event.target.files[0]);
    event.target.files[0].type.split("/")[1] !== "pdf" && setbilltype(true);
    var type = event.target.files[0].name
      .substring(event.target.files[0].name.lastIndexOf("."))
      .split(".")[1];
    if (type == "png" || type == "jpeg" || type == "jpg") {
      setref_billno(src);
    }
  };
  // const deletebillSelect = (event, f) => {
  //   setbilltype(false)

  //   setref_billno(null);
  // };
  // const utilizedivisionation = (id,name) => {

  //   setutilize_id(id);
  //   setutilize_name(name);
  //   // setpaid_by_list([name])

  //   setdivPositionutilize(null)
  //   // handleMultipleList([name])
  // };
  // const paidivisionation = (id,name) => {

  //   setdiv_id(id);
  //   setdiv_name(name);
  //   // setdivPosition(null)
  // };
  // const adddiv =()=>{
  //   setDialogAdddivision(true);
  //   setdivPositionutilize(null);
  //   setdivPosition(null)

  // }

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

  const filterPo = (vid) => {
    

    
   const  filterpi = vendorList?.filter(obj => obj.id == vid).map((item)=>{
      return item.p_invoice[0]
    })
    const filterfinal = filterpi?.filter(obj => obj.party_id == vid).map((item)=>{
      return item 
    })
 
  setfiltervendorList(filterfinal)
  //   console.log("vid",vid)

  }


  const filterPorder = (vid) => {
    console.log("vcc",vendorList)

    
   const  filterpo = vendorList?.filter(obj => obj.id == vid).map((item)=>{
      return item.p_order[0]
    })
    const filterpofinal = filterpo?.filter(obj => obj.party_id == vid).map((item)=>{
      return item 
    })
  

  //   console.log("shohratrh",filterpi)
  setfiltervendorList2(filterpofinal)
  //   console.log("vid",vid)

  }




  const handleBankSelect = (event, f) => {
    setfileurl();
    let files = event.target.files[0];
    const filename = URL.createObjectURL(event.target.files[0]);

    setbank_slip(files);
    // filename.lastIndexOf('.').split('.')[1];
    var type = event.target.files[0].name
      .substring(event.target.files[0].name.lastIndexOf("."))
      .split(".")[1];
    if (type == "png" || type == "jpeg" || type == "jpg") {
      setfileurl(filename);
    }
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
              disableGutters={true}
              onClick={(e) =>
                searchcat(
                  m.sub_categories.length > 0,
                  m.category.name,
                  m.category.id
                )
              }
              style={{ justifyContent: "space-between", marginLeft: "10px" }}
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
      bottom: event.pageY,
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
  };

  const searchcat = (event, name, i) => {
    if (event) {
      setaccountstatus(false);
    } else {
      url.get(`columns/${i}`).then(({ data }) => {
        setfield(data[0].column);
      });

      setaccountstatus(true);
      setpayment_account_id(i);
      setemployee_status(false);
      setvendor_status(false);
      if (i == 33) {
        setvendor_status(true);
      }

      if (name.toUpperCase().includes("SALARY")) {
        setemployee_status(true);
      }
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

  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    setisAlive(false);
  };
  const handleDialogDivisionClose = () => {
    setDialogAdddivision(false);
    setisAlive(false);
    setdivPositionutilize(false);
  };
  const [shouldOpenConfirmationDialog1, setShouldOpenConfirmationDialog1] =
    useState(false);
  const handleDialogClose1 = () => {
    setShouldOpenEditorDialog1(false);
    setisAlive(false);
  };
  const handleDialogClosepayee = () => {
    setShouldOpenConfirmationDialogbox(false);
    setisAlive(false);
  };

  const [parties, setParties] = useState([]);
  const [ck, setChecked] = useState("");

  useEffect(() => {
    // getVendorList().then(({ data }) => {
    //   setvendorList(data)
    // })
    url
      .get("mjrExpense/" + localStorage.getItem("division"))
      .then(({ data }) => {
        console.log("databaa",data)
        setvendorList(data.vendor);
        setParties(data.parties);
        setvendorList(data.vendor);
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
        });

        setpaiddivision_account(arrVal);
        setcompanybank(data.companyBank);
      });
    // getpaymentaccount().then(({ data }) => {
    //   setaccounttype(data);
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
    // url.get("payment-account").then(({ data }) => {
    //   setpayment_account(data);
    // });
    // url.get("division").then(({ data }) => {
    //   setdivision_account(data);
    // });
    // getpaidDivision().then(({ data }) => {

    //   var arrVal = data.sort(function (obj1, obj2) {
    //     return obj1?.type?.localeCompare(obj2?.type);
    //   });
    //   var res = arrVal.map((item) => {
    //     item.isdisable = false;
    //   })

    //   setpaiddivision_account(arrVal);
    // });
    // getcompanybank().then(({ data }) => {
    //   setcompanybank(data);
    // });

    return setisAlive(true);
  }, [isAlive]);

  const resetform = () => {
    setpayment_account_name("");
    setreferrence_bill_no("");
    setpaid_by("");
    setbank_id("");
    setpayment_mode("");
    setcheque_no("");
    setpaid_date(new Date());
    setpaid_to("");
    setdescription("");
    settax(false);
    setutilize_id("");
    setpaid_by_list([]);
    setutilize_name("");
    setmessage("");
    settaxamount("");
    setcompany(false);
    setref_billno("");
    setfileurl("");
    setaccountstatus(false);
  };

  const handleSubmit = async (values, { isSubmitting, resetForm }) => {
    setloading(true);
    const newItem = new FormData();
    for (const key of Object.keys(files)) {
      newItem.append("item", files[key].file);
    }
    if (tax) {
      formData.append("tax", (parseFloat(amount) * 15) / (100 + 15).toFixed(2));
      formData.append("company_name", company);
    }
    formData.append(
      "paid_date",
      paid_date ? moment(paid_date).format("Y-MM-DD") : ""
    );
    formData.append("referrence_bill_no", referrence_bill_no);
    formData.append("amount", parseFloat(amount).toFixed(2));
    formData.append("paid_to", paid_to);
    formData.append("description", description);
    formData.append("created_by", created_by);
    formData.append("account_category_id", payment_account_id);

    formData.append("created_by", created_by);
    formData.append("payeename", payeename);
    formData.append("status", "new");
    formData.append("data", JSON.stringify(field));
    formData.append("bank_ref_no", bank_ref_no);
    formData.append("file_path", file_path);
    formData.append("company", div_company ? div_company : "");
    formData.append("div_id", localStorage.getItem("division"));
    formData.append("utilize_div_id", utilize_id);
    formData.append("payment_type", payment_mode);
    formData.append("bank_slip", bank_slip);
    formData.append("cheque_no", cheque_no);
    formData.append("bank_id", bank_id);

    formData.append("vatno", vatno ? vatno : "");
    formData.append("q_i_number", ck ? ck : "");
    formData.append("inv_no", inv_no ? inv_no : "");
    formData.append("vendor_id", vendor_id);
    formData.append("employee_id", employee_id);
    formData.append("user_id", user.id);

    files.map((answer, i) => {
      formData.append(`file${answer.column_id}`, answer.file);
    });
    var sum = 0;
    var count = 0;
    var bal = 0;
    var temp = amount;
    var utilze_divAmount = 0;

    var status = true;
    var personExist = paymentarr.some((obj) => obj[4] === "personal");

    utilze_divAmount = paymentarr
      .filter((obj) => obj[0] === utilize_id)
      .reduce((a, v) => (a = a + parseFloat(v[2])), 0);
    if (utilze_divAmount === 0) {
      // utilize division doesn't exists
      temp = amount;
    } else {
      // utilize division  exists
      temp = amount - utilze_divAmount;
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
                formData.append("payment_account_ids[]", [
                  key[0],
                  key[1],
                  temp,
                  key[3],
                  key[4],
                ]);
              } else {
                formData.append("payment_account_ids[]", key);
                temp = temp - key[2];
              }
            } else {
              formData.append("payment_account_ids[]", [
                key[0],
                key[1],
                temp,
                key[3],
                key[4],
              ]);
            }
          } else {
            formData.append("payment_account_ids[]", key);
          }
        }
      } else {
        status = false;
      }
    } else {
      //Sufficicent

      // consider full list
      for (const key of paymentarr) {
        if (key[0] !== utilize_id) {
          //its not utilized div

          if (temp > key[2]) {
            formData.append("payment_account_ids[]", key);
            temp = temp - key[2];
          } else {
            formData.append("payment_account_ids[]", [
              key[0],
              key[1],
              temp,
              key[3],
              key[4],
            ]);
          }
        } else {
          formData.append("payment_account_ids[]", key);
        }
      }
    }
    if (status) {
      url
        .post("expense", formData)
        .then(function (response) {
          Swal.fire({
            title: "Success",
            type: "success",
            icon: "success",
            text: "Data saved successfully.",
          }).then((result) => {
            routerHistory.push(navigatePath + `/expenseview`);
          });
        })
        .catch(function (error) {});
    } else {
      setmessage("Insufficient Amount");
    }
  };

  let sum = 0;
  let arr = [];

  const handleMultipleList = (index) => {
    // sum=paiddivision_account.reduce((a,v) =>  a = a + parseFloat(v.balance) , 0 )
    // statearr?.filter(function(e) { return e !== 'seven' })

    setstatearr([]);
    var calSum = 0;
    var count = 0;
    for (var ind in index) {
      // eslint-disable-next-line no-loop-func
      paiddivision_account
        .filter((f) => f.name == index[ind])
        .map((item) => {
          // map array to replace the old comment with the new one

          if (amount > calSum && count <= 0) {
            calSum = calSum + item.balance;
            item.isdisable = false;
            if (item.type === "personal") {
              count++;
            }
            statearr.push([
              item.id,

              item.name,
              item.balance,
              item.div_id,
              item.type,
            ]);
          } else {
            item.isdisable = true;
          }
        });
    }

    arr = statearr;
    sum = sum + statearr.reduce((a, v) => (a = a + parseFloat(v[2])), 0);

    setpaymentarr(statearr);
    setamountVal(sum);
    if (sum < amount) {
      // setmessage("Insufficient Amount")
      // setamountVal(sum)
    } else {
      // setmessage("success")

      // setdisableVal(true)

      setIsopen(false);
    }
  };

  let count = 0;
  const handleMultipleListDemo = (index) => {
    setstatearr([]);
    var calSum = 0;

    for (var ind in index) {
      // eslint-disable-next-line no-loop-func
      paiddivision_account
        .filter((f) => f.name == index[ind].name)
        .map((item) => {
          // map array to replace the old comment with the new one

          if (amount > calSum && count <= 0) {
            calSum = calSum + item.balance;
            item.isdisable = false;
            if (item.type === "personal") {
              count = count + 1;
            }

            statearr.push([
              item.id,

              item.name,
              item.balance,
              item.div_id,
              item.type,
            ]);
          } else {
            item.isdisable = true;
          }

          return item;
        });
    }

    arr = statearr;
    sum = sum + statearr.reduce((a, v) => (a = a + parseFloat(v[2])), 0);

    setpaymentarr(statearr);
    setamountVal(sum);
    if (sum < amount) {
    } else {
      setIsopen(false);
    }
  };

  const handleField_Fileremove = (index) => {
    let tempList = [...files];
    tempList.map((element, i) => {
      let sum = 0;

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
            { name: "EXPENSE ENTRY" },
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

      {shouldOpenConfirmationDialogbox && (
        <Addpaidaccount
          // handleClose={handleDialogClose}
          open={shouldOpenConfirmationDialogbox}
          paymentaccount={setpayment_account}
          handleClose={handleDialogClosepayee}
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

      <Card elevation={3}>
        <div className="flex px-4">
          <h4 className="m-0 mr-4 mt-4 mb-4"></h4>
          {/* <Button
                    className="mb-4 ml-4"
                    variant="outlined"
                    size="small"
                    onClick={handleRight}
                  >
                    <span style={{ textAlign: "left" }}>
                      Account Division
                      <Menu
                        open={!!divPosition}
                        onClose={() => setdivPosition(null)}
                        anchorReference="anchorPosition"
                        anchorPosition={divPosition}
                      >
                        
                        
                        {division_account.map((items, index) => (
                          (<MenuItem id={items.id} onClick={(e) => setdiv_id(items.id,setdivPosition(null))}>{items.name} </MenuItem>)
                        ))}
                        
                      </Menu>
                    </span>
                  </Button> */}
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
                        {paiddivision_account.filter(obj=>obj.type=="division").map((items, index) => (
                          (<MenuItem id={items.id} onClick={(e) => utilizedivisionation(items.id,items.name)}>{items.name}</MenuItem>)
                        ))}
                        
                      </Menu>
                    </span>
                  </Button> */}
                      <FormGroup
                        variant="outlined"
                        style={{ width: 200, height: 37 }}
                      >
                        <FormControl
                          variant="outlined"
                          size="small"
                          className="mb-4 mr-20 mr-20"
                          style={{
                            width: 280,
                            height: 37,
                            marginRight: "20px",
                          }}
                        >
                          {/* <InputLabel htmlFor="outlined-age-native-simple">Utilized Division</InputLabel> */}
                          <TextField
                            select
                            value={utilize_id}
                            // onChange={handleChange}
                            onChange={(e) => setutilize_id(e.target.value)}
                            size="small"
                            variant="outlined"
                            label="Utilized Division"
                            // inputProps={{
                            //   name: 'utilize_id',
                            //   id: 'outlined-age-native-simple',
                            // }}
                            required
                          >
                            <MenuItem value="">
                              Choose Utilized Division
                            </MenuItem>
                            {localStorage.getItem('role') == "SA" ? paiddivision_account
                              .filter((obj) => obj.type === "division" && obj.name != "Manufacturing" && obj.name != "HQ")
                              .map((item, ind) => {
                                return (
                                  <MenuItem value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              }) : paiddivision_account
                              .filter((obj) => obj.type === "division" && obj.name === localStorage.getItem('bottle'))
                              .map((item, ind) => {
                                return (
                                  <MenuItem value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </TextField>
                        </FormControl>
                      </FormGroup>
                    </div>
                    <div style={{ paddingLeft: "73px" }}>
                      <Button
                        className="px-4 mb-4 w-full ml-4"
                        variant="outlined"
                        size="small"
                        onClick={handleRightClick}
                        style={{ width: 267, height: 37 }}
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
                              <Icon align="left">add</Icon>ADD EXPENSES CATEGORY
                            </MenuItem>
                            <Menu1
                              data={cat}
                              inputProps={{
                                style: { justifyContent: "space-between" },
                              }}
                              style={{ justifyContent: "space-between" }}
                            ></Menu1>
                          </Menu>
                        </span>
                      </Button>
                    </div>
                  </div>
                  {payment_account_name == 'Material Purchase' &&  <> Choose Purchase Order or Purchase Invoice : <br /></>}
                  <span className='expenseStyle'>
{payment_account_name == 'Material Purchase' &&   <div className="px-0">
  
                    <div>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>PURCHASE ORDER</Typography>
                        </AccordionSummary >
                        <AccordionDetails className='accc'>
                          {vendorList?.map((item, i) => {
                            return (
                              <Accordion key={i}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  onClick={() => {filterPorder(item?.id)}}
                                >
                                  <Typography>{item?.firm_name}</Typography>
                                </AccordionSummary>
 
                                {filtervendorList2?.map((k, j) => {
                                  return (
                                    <AccordionDetails>
                                      {" "}
                                      <Typography key={j}>
                                      <Icon
                                          onClick={(e) => {
                                            setChecked(k?.po_number);
                                          }}
                                          style={{
                                            backgroundColor:
                                              k?.po_number == ck
                                                ? "green"
                                                : "black",
                                            color: "white",
                                            float: "left",
                                          }}
                                        >
                                          checkBox
                                        </Icon> &nbsp; {' '} <b> {k?.po_number}{" | "} </b>{parseFloat(k?.net_amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{'/- '}{k?.subject == 'null' ? '' : k?.subject ? <>| ({k?.subject})</> : ''}
                                        
                                      </Typography>
                                    </AccordionDetails>
                                  );
                                })}
                              </Accordion>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <br />
                    <div>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>PURCHASE INVOICE</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='accc'>
                          {vendorList?.map((item, i) => {
                            return (
                              <Accordion key={i}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  onClick={() => {filterPo(item?.id)}}
                                >
                                  <Typography>{item?.firm_name}</Typography>
                                </AccordionSummary>

                                {filtervendorList?.map((k, j) => {
                                  return (
                                    <AccordionDetails>
                                      {" "}
                                      <Typography key={j}>
                                      <Icon
                                          onClick={(e) => {
                                            setChecked(k?.po_number);
                                          }}
                                          style={{
                                            backgroundColor:
                                              k?.po_number == ck
                                                ? "green"
                                                : "black",
                                            color: "white",
                                            float: "left",
                                          }}
                                        >
                                          checkBox
                                        </Icon> &nbsp;
                                        <b> {k?.po_number}{" | "} </b>{parseFloat(k?.grand_total).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{'/- '}
                                       
                                      </Typography>
                                    </AccordionDetails>
                                  );
                                })}
                              </Accordion>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div></div>
                    <br /><br />
                  </div>  }
                  </span>
                

                  <span>
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
                      {accountstatus && (
                        <TextField
                          className="mb-4 w-full "
                          label="Expense Category"
                          name="payment_account_name"
                          inputProps={{
                            style: { textTransform: "capitalize" },
                          }}
                          size="small"
                          variant="outlined"
                          autoComplete="none"
                          // style={{width:320}}
                          value={payment_account_name}
                          required
                          // onChange={e => setpayment_account_id(e.target.value)}
                        />
                      )}
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
                                //  className="hidden"
                                className="mb-4 w-full"
                                onChange={(e) => handleFileSelect(e, item.id)}
                                id="upload-multiple-file"
                                type="file"
                                variant="outlined"
                                size="small"
                                autoComplete="none"
                                required
                                //  label={item.name}
                                //  value={item.name}
                              />

                              {close && (
                                <span>
                                  {files.map((items, index) => {
                                    return (
                                      <span>
                                        {items.progress === item.id && (
                                          <span>
                                            <img
                                              src={items.src}
                                              width="50px"
                                              height="50px"
                                            />
                                            <Icon
                                              className="bg-error"
                                              onClick={() =>
                                                handleField_Fileremove(index)
                                              }
                                            >
                                              cancel
                                            </Icon>
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
                              label={item.name}
                              name="payment_account_id"
                              size="small"
                              variant="outlined"
                              inputProps={{
                                style: { textTransform: "capitalize" },
                              }}
                              name={item.name}
                              value={item.text}
                              autoComplete="none"
                              onChange={(e) => {
                                handleComment(e, item, item.id);
                              }}
                              required
                              // onChange={(event) => handleIvoiceListChange(event, index)}
                            />
                          )}
                          {item.type === "date" && (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                className="mb-4 w-full"
                                margin="none"
                                label={item.name}
                                inputVariant="outlined"
                                name="date"
                                type="text"
                                size="small"
                                autoOk={false}
                                hintText="Portrait Dialog"
                                errorText="This is an error message."
                                value={item.date ? item.date : null}
                                onChange={(e) => {
                                  handleCommentdate(e, item, item.id);
                                }}
                                format="MMMM dd, yyyy"
                                required
                                // onChange={handleIvoiceListChange}
                              />
                            </MuiPickersUtilsProvider>
                          )}
                        </span>
                      );
                    })}
                  </span>

                  {vendor_status && (
                    <TextField
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
                    </TextField>
                  )}
                  {employee_status && (
                    <TextField
                      className="mb-4 w-full"
                      label="Employee"
                      inputProps={{ style: { textTransform: "capitalize" } }}
                      name="firstName"
                      size="small"
                      variant="outlined"
                      autoComplete="none"
                      value={employee_id}
                      onChange={(e) => setemployee_id(e.target.value)}
                      select
                    >
                      {employeeList.map((item, ind) => (
                        <MenuItem value={item.emp_id} key={item}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  {!vendor_status && (
                    <TextField
                      className="mb-4 w-full"
                      label="Paid To(Company/Person)"
                      inputProps={{ style: { textTransform: "capitalize" } }}
                      name="firstName"
                      size="small"
                      variant="outlined"
                      autoComplete="none"
                      value={paid_to}
                      onChange={(e) => setpaid_to(e.target.value)}
                    />
                  )}

                  <CurrencyTextField
                    className="mb-4 w-full"
                    label="Amount"
                    name="Amount"
                    size="small"
                    variant="outlined"
                    value={values.amount}
                    currencySymbol="SAR"
                    autoComplete="none"
                    required
                    onChange={(event, value) => setamount(value)}
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="mb-4 w-full"
                      margin="none"
                      inputVariant="outlined"
                      label="Payment Date"
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
                  {/* <TextField
                    className="mb-4 w-full"
                    label="Payment Account"
                    name="email"
                    size="small"
                    type="text"
                    variant="outlined"
                    value={payment_account_id}
                    onClick={handleRightClick}
                   
                    select
                    
                  >
                      choose categories */}
                  {/* <div className="px-0 flex justify-between">
                  <div> */}
                  {/* <Button
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
                         */}
                  {/* <FormGroup>
         
                   <FormControl variant="outlined" size="small"
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
            name: 'Bank',
            id: 'outlined-age-native-simple',
          }}
        >
                       
                        <option aria-label="None" value="" />
                         {paiddivision_account.map((item, ind) => (
          <option value={item?.id} >{item?.name}-{parseFloat(item.balance).toLocaleString(undefined,{minimumFractionDigits:2})}</option>
         ))}
                        </Select>
                        </FormControl>
                        </FormGroup> */}

                  {/* </Menu>
                    </span>
                  </Button> */}
                  {/* </div>
                  <div> */}
                  {/* {div_id&&(<TextField
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
                    ></TextField>)} */}
                  {/* </div>
                  </div> */}

                  {role === "SA" ? (
                    <>
                      {/* <FormGroup variant="outlined">
                                <FormControl variant="outlined" size="small"
                   className="mb-4" >
        <InputLabel 
        
         >PAID ACCOUNT</InputLabel>
        <Select

          multiple
          autoClose={amountVal}
         
          displayEmpty
          onMenuClose={amountVal}
          className="mb-4"
          disabled={!amount}
          inputProps={{
            name: 'Bank',
            id: 'outlined-age-native-simple',
          }}
         
          label="PAID ACCOUNT"
         

          
          value={paid_by_list}
          onChange={(e,ind) => {setpaid_by_list(e.target.value);handleMultipleList(e.target.value)}}
          // input={<Input />}
          renderValue={(selected,id) =>{  if (selected.length === 0) {
            return <span>PAID ACCOUNT</span>;
          };return selected.join(',')}}
          // MenuProps={MenuProps}
        >
         
         <MenuItem  onClick={()=>setShouldOpenConfirmationDialogbox(true)}>
                      <Icon >
                          add
                      </Icon>ADD NEW
                      </MenuItem>
           {paiddivision_account.sort(obj=>obj.type).map((item, ind) => (
                       
                       <MenuItem value={item.name} key={ind} disabled={item.isdisable}  style={{"text-transform": 'uppercase'}} >
                         <Checkbox  checked={paid_by_list.indexOf(item.name) > -1} />
                         
                         <td width="100px">{item.name}</td><td align="center" width="200px" >
                         {item.type==="division"&&(<small 
                style={{cursor:'pointer'}}
                    className={clsx({
                      "border-radius-4  text-white px-2 py-2 w-30 pl-4 pr-3 bg-error": true,
                     
                    })}
                  >
                  
                  {item.type} 
                    
                
                  </small>)}
                  {item.type==="personal"&&(<small 
                style={{cursor:'pointer'}}
                    className={clsx({
                      "border-radius-4  text-white px-2 py-2 w-30  bg-secondary": true,
                     
                    })}
                  >
                  
                  {item.type}
                    
                
                  </small>)}
  </td><td style={{textAlign:'right'}}>{parseFloat(item.balance).toLocaleString(undefined,{minimumFractionDigits:2})}</td>
  
                       </MenuItem>
                       
                   
                     ))}
        </Select>
        
      </FormControl>
                              
                             </FormGroup> */}

                      <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        className="mb-4"
                        disabled={!amount}
                        options={paiddivision_account}
                        size="small"
                        getOptionLabel={(option) => option.name}
                        getOptionDisabled={(option) =>
                          option.isdisable === true || amount < amountVal
                        }
                        onChange={(event: any, value: string | null) =>
                          handleMultipleListDemo(value)
                        }
                        renderOption={(option, { selected }) => (
                          <React.Fragment>
                            <Checkbox
                              icon={icon}
                              disabled={option.isdisable}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            <td width="100px">{option.name}</td>
                            <td align="center" width="200px">
                              {option.type === "division" && (
                                <small
                                  style={{ cursor: "pointer" }}
                                  className={clsx({
                                    "border-radius-4  text-white px-2 py-2 w-30 pl-4 pr-3 bg-error": true,
                                  })}
                                >
                                  {option.type}
                                </small>
                              )}
                              {option.type === "personal" && (
                                <small
                                  style={{ cursor: "pointer" }}
                                  className={clsx({
                                    "border-radius-4  text-white px-2 py-2 w-30  bg-secondary": true,
                                  })}
                                >
                                  {option.type}
                                </small>
                              )}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {parseFloat(option.balance).toLocaleString(
                                undefined,
                                { minimumFractionDigits: 2 }
                              )}
                            </td>
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Paid Account"
                          />
                        )}
                      />
                    </>
                  ) : (
                    <TextField
                      className="mb-4 w-full mr-4 pr-20"
                      label="PAID ACCOUNT"
                      name="firstName"
                      size="small"
                      inputProps={{ style: { width: 200 } }}
                      variant="outlined"
                      value={localStorage.getItem("user_name")}
                      autoComplete="off"
                      selected
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        className="py-2"
                      >
                        <Icon>save</Icon> SAVE
                      </Button>
                      {payment_account.map((item, ind) => (
                        <MenuItem value={item.id} key={item}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  <TextField
                    className="w-full mb-4"
                    label="Payment Mode"
                    onChange={(e) => setpayment_mode(e.target.value)}
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
                  {payment_mode === "cheque" && (
                    <TextField
                      className="w-full mb-4"
                      label="Cheque Number"
                      onChange={(e) => setcheque_no(e.target.value)}
                      variant="outlined"
                      type="text"
                      name="cdescription"
                      size="small"
                      value={cheque_no}
                    ></TextField>
                  )}
                  <FormGroup>
                    {payment_mode === "banktransfer" && (
                      <FormControl
                        variant="outlined"
                        size="small"
                        className="mb-4"
                      >
                        {/* <InputLabel htmlFor="outlined-age-native-simple">Bank</InputLabel> */}
                        <TextField
                          select
                          value={bank_id}
                          // onChange={handleChange}
                          onChange={(e) => setbank_id(e.target.value)}
                          size="small"
                          label="Bank"
                          variant="outlined"
                          // inputProps={{
                          //   name: 'Bank',
                          //   id: 'outlined-age-native-simple',
                          // }}
                        >
                          <MenuItem value="" disabled>
                            Choose Item
                          </MenuItem>
                          {companybank.map((item, ind) => (
                            <MenuItem value={item.id}>
                              {item.name}-{item.ac_no}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    )}
                  </FormGroup>

                  {payment_mode === "banktransfer" && (
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
                        onClick={() => {
                          setfileurl(null);
                          setbank_slip(null);
                        }}
                        style={{
                          padding: "5px 5px 5px 5px",
                          cursor: "pointer",
                        }}
                      >
                        {fileurl && (
                          <CardActionArea>
                            <img
                              width="50%"
                              height="50%"
                              // className={classes.media}
                              src={fileurl}
                            />
                          </CardActionArea>
                        )}
                      </div>
                    </>
                  )}

                  {payee && (
                    <TextField
                      className="mb-4 w-full"
                      label="NAME"
                      name="payeename"
                      size="small"
                      variant="outlined"
                      inputProps={{ style: { textTransform: "capitalize" } }}
                      value={payeename}
                      autoComplete="none"
                      onChange={(e) => setpayeename(e.target.value)}
                    ></TextField>
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
                    onClick={() => {
                      setref_billno(null);
                      setfile_path(null);
                    }}
                    style={{
                      padding: "5px 5px 5px 5px",
                      cursor: "pointer",
                    }}
                  >
                    {ref_billno && (
                      <CardActionArea>
                        <img
                          width="50%"
                          height="50%"
                          // className={classes.media}
                          src={ref_billno}
                        />
                      </CardActionArea>
                    )}
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
                            style={{ position: "absolute", marginTop: 200 }}
                            onClick={(e) => setref_billno("")}
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

                  <TextField
                    className="mb-4 w-full"
                    label="Description"
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    name="workPhone"
                    size="small"
                    multiline
                    variant="outlined"
                    value={description}
                    autoComplete="Disabled"
                    onChange={(e) => setdescription(e.target.value)}
                  />

                  <FormLabel component="legend" labelPlacement="start">
                    Tax Paid?
                  </FormLabel>
                  <RadioGroup
                    className="mb-4"
                    name="gender"
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio color="secondary" />}
                      label="Yes"
                      onChange={() => settax(true)}
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="secondary" />}
                      label="No"
                      onChange={() => settax(false)}
                      labelPlacement="end"
                    />{" "}
                    {tax && (
                      // <CurrencyTextField
                      //   label="Tax Amount"
                      //   name="website"
                      //   size="small"
                      //   type="text"
                      //   variant="outlined"
                      //   fullWidth
                      //   value={taxamount}
                      //   currencySymbol="SAR"
                      //   onChange={(event, value) => settaxamount(value)}
                      // />
                      <TextField
                        className="mb-4 w-full"
                        label="Company Name"
                        name="workPhone"
                        size="small"
                        variant="outlined"
                        value={div_company}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                        autoComplete="Disabled"
                        onChange={(e) => setdiv_company(e.target.value)}
                      />
                    )}
                    {tax && (
                      <TextField
                        className="mb-4 w-full"
                        label="VAT Number"
                        name="workPhone"
                        type="text"
                        size="small"
                        variant="outlined"
                        value={vatno}
                        onChange={(e) => setvatno(e.target.value)}
                      />
                    )}
                    {tax && (
                      <TextField
                        className="mb-4 w-full"
                        label="Invoice Number"
                        name="workPhone"
                        size="small"
                        variant="outlined"
                        value={inv_no}
                        inputProps={{ style: { textTransform: "capitalize" } }}
                        autoComplete="Disabled"
                        onChange={(e) => setinv_no(e.target.value)}
                      />
                    )}
                  </RadioGroup>

                  {tax && (
                    <div className="mb-4">
                      <FormControlLabel
                        style={{ fontWeight: 1000 }}
                        className="block h-32"
                        control={<Checkbox />}
                        label={`I Agree the above Mentioned`}
                        // The above mentioned company name, invoice number & VAT number is as per the uploaded file.`}
                        value={company}
                        onChange={(e) => setcompany(!company)}
                      />
                      <label className="pl-8">Company Name</label>
                      <br></br>
                      <label className="pl-8">Invoice Number</label>
                      <br></br>
                      <label className="pl-8">
                        VAT Number Is as per the Uploaded File
                      </label>
                    </div>
                  )}
                </Grid>
              </Grid>

              {message && (
                <div className="flex-column items-start">
                  <div className="flex items-center ">
                    {message == "Insufficient Amount" ? (
                      <Icon className="mr-2" fontSize="small" color="error">
                        info
                      </Icon>
                    ) : (
                      <Icon
                        className="mr-2 text-green"
                        fontSize="small"
                        color=".bg-green"
                      >
                        info
                      </Icon>
                    )}
                    <small className="text-black">
                      {message} {amountVal}
                    </small>
                  </div>
                </div>
              )}
              <div className="mt-6">
                {/* {loading ? (
                  <span
                    color="primary"
                    variant="outlined"
                    type="button"
                    style={{
                      border: "1px solid red",
                      borderRadius: 5,
                      padding: 12,
                    }}
                    className="mr-4 py-2"
                    onClick={(e) => setloading(false)}
                  >
                    ENABLE
                  </span>
                ) : (
                  <Button
                    color="primary"
                    variant="outlined"
                    type="submit"
                    className="mr-4 py-2"
                    disabled={loading}
                    onClick={() => handleSubmit}
                  >
                    <Icon>save</Icon> SAVE
                  </Button>
                )} */}
                <Button
                    color="primary"
                    variant="outlined"
                    type="submit"
                    className="mr-4 py-2"
                    disabled={loading}
                    onClick={() => handleSubmit}
                  >
                    <Icon>save</Icon> SAVE
                  </Button>

                <Button
                  className="mr-4 py-2"
                  color="secondary"
                  variant="outlined"
                  type="submit"
                  onClick={() =>
                    routerHistory.push(navigatePath + "/expenseview")
                  }
                >
                  <Icon>cancel</Icon>
                  <span className="pl-2 capitalize">CANCEL</span>
                </Button>

                <Button
                  color=".bg-green"
                  variant="outlined"
                  type="reset"
                  onClick={resetform}
                  className="mr-4 py-2"
                >
                  <Icon>loop</Icon>
                  <span className="pl-2 capitalize">RESET</span>
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

const initialValues = {
  customerType: "",
};

export default CustomerForm;
