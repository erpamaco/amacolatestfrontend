import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon, Card, Tooltip } from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url, { navigatePath } from "../invoice/InvoiceService";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Tab, Tabs } from "@material-ui/core";
import PurchaseView from "./purchaseInv";
import PurchaseTrash from "./purchaseInvTrash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import LinearProgress from '@mui/material/LinearProgress';

import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  TableRow,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    float: "right",
    background: "blue",
    color: "white",
  },
  input: {
    display: "none",
  },
  columnStyleWithWidthSno: {
    top: "0px",
    left: "0px",
    zIndex: "50",
    position: "sticky",
    backgroundColor: "#fff",
    width: "50px",
    textAlign: "center",
  },
  columnStyleWithWidth: {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "425px",
    maxWidth: "425px",
    wordBreak: "break-word",
    hyphens: "auto",
    textAlign: "center",
    paddingRight: 30,
  },
}));
const SimpleMuiTable = () => {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      float: 'right',
      background: 'blue',
      color: 'white'
    },
    input: {
      display: "none"
    },
    columnStyleWithWidth: {
      top: "0px",
      left: "0px",
      zIndex: "100",
      position: "sticky",
      backgroundColor: "#fff",
      width: "300px",
      wordBreak: "break-word",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      textAlign: "center"
    },
    columnStyleWithWidth1: {
      top: "0px",
      left: "0px",
      zIndex: "100",
      position: "sticky",
      backgroundColor: "#fff",
      width: "300px",
      wordBreak: "break-word",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      textAlign: "center"
    }
  }));
  const [load, setLoad] = useState(true);

  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [podetails, setpodetails] = useState([]);
  const [poid, setpoid] = useState("");
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [resetuserList, setResetUserList] = useState([]);
  const curr_date = new Date();
  const curr_year = moment(curr_date).format("YYYY");
  const [from_date_pi, setfrom_date_pi] = useState(moment(new Date()).format("MMM YYYY"));

  const handleReset = () => {
    setfrom_date_pi(new Date())
    // console.log("sup",from_date_q)
    
  
    localStorage.removeItem("from_date_pi");
      
    localStorage.removeItem("dataKeyState_pi")
    setpodetails(
      resetuserList.filter(
        (obj) =>
          new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(curr_year).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      )
    );
    setIsAlive(false)
    // window.location.reload()
  }
  const handleSubmit = () => {
    const datas = resetuserList.filter(
  (obj) =>
    new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(from_date_pi).getTime() 
    // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
);
setpodetails(datas);
localStorage.setItem('dataKeyState_pi', JSON.stringify(datas))

// localStorage.setItem('dataKeyState', userList)
// console.log("dataKeyState",JSON.parse(localStorage.getItem("dataKeyState")))
};

const handleDateChange_Q = (date) => {
  if(localStorage.getItem("dataKeyState_pi")){
    setfrom_date_pi(moment(date).format("MMM YYYY"));
    localStorage.setItem("from_date_pi",moment(date).format("MMM YYYY"));
    setpodetails(resetuserList)
    const datas = resetuserList.filter(
      (obj) =>
        new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(moment(date).format("MMM YYYY")).getTime() 
        // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
    );
    setpodetails(datas);
    localStorage.setItem('dataKeyState_pi', JSON.stringify(datas))
    
  }else{
    setfrom_date_pi(moment(date).format("MMM YYYY"));
    localStorage.setItem("from_date_pi",moment(date).format("MMM YYYY"));
    const datas = resetuserList.filter(
      (obj) =>
        new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(moment(date).format("MMM YYYY")).getTime() 
        // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
    );
    setpodetails(datas);
    localStorage.setItem('dataKeyState_pi', JSON.stringify(datas))
    


  }
     
};


const handleDateChange_Q_Year = (date) => {
  if(localStorage.getItem("dataKeyState_pi")){
    setfrom_date_pi(moment(date).format("YYYY"));
    localStorage.setItem("from_date_pi",moment(date).format("YYYY"));
    setpodetails(resetuserList)
    const datas = resetuserList.filter(
      (obj) =>
        new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(moment(date).format("YYYY")).getTime() 
        // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
    );
    setpodetails(datas);
    localStorage.setItem('dataKeyState_pi', JSON.stringify(datas))
    
  }else{
    setfrom_date_pi(moment(date).format("YYYY"));
    localStorage.setItem("from_date_pi",moment(date).format("YYYY"));
    const datas = resetuserList.filter(
      (obj) =>
        new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(moment(date).format("YYYY")).getTime() 
        // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
    );
    setpodetails(datas);
    localStorage.setItem('dataKeyState_pi', JSON.stringify(datas))
    


  }
     
};



  const classes = useStyles();
  const { t } = useParams();
  useEffect(() => {
    console.log(t);
    if (t) {
      setTabIndex(parseInt(t));
    }
    if (localStorage.getItem("page") !== "purchaseinvoice") {
      localStorage.removeItem("search");
      localStorage.removeItem("page");
      // console.log('ssffd  ')
    }
    if(localStorage.getItem("from_date_pi")){
      setfrom_date_pi(localStorage.getItem("from_date_pi"));
      setLoad(false);
    }

    url.get("purchase-invoice").then(({ data }) => {
      // if (isAlive) setUserList(data);
      // var myJSON = JSON.stringify(data.id);
      setResetUserList(data);
      if (isAlive) setUserList(data);
      if(localStorage.getItem("dataKeyState_pi")){
        setpodetails(JSON.parse(localStorage.getItem("dataKeyState_pi")));
        setLoad(false);
      }else{

      if (data.length) {
        setpoid(data[0].id);

        setpodetails(data.filter(
          (obj) =>
            new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(curr_year).getTime() 
            // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
        ));
      }
      setLoad(false);
    }
    });
    return () => setIsAlive(false);
  }, [isAlive]);
  const [count, setCount] = useState(0);
  const routerHistory = useHistory();
  const handeViewClick = (invoiceId) => {
    routerHistory.push(`/rfqanalysis/${invoiceId}`);
  };

  function getrow(id) {
    url.get("rfq/" + id).then(({ data }) => {
      if (isAlive) setpodetails(data[0].podetails);
    });
    return () => setIsAlive(false);
  }
  function Increment(e) {
    alert("3");
  }
  function Decrement() {
    setCount(count - 1);
  }
  const [showInvoiceEditor, setShowInvoiceEditor] = useState(false);
  const [isNewInvoice, setIsNewInvoice] = useState(false);

  const [click, setClick] = useState([]);

  const addNumber = () => {
    setClick([
      ...click,
      {
        id: click.length,
        value: Math.random() * 10,
      },
    ]);
  };
  const colorset = (tabIndex) => {
    if (tabIndex == 0) return "dark";
    if (tabIndex == 1) return "dark";
    if (tabIndex == 2) return "#008000";
    if (tabIndex == 3) return "rgba(255,0,0,1)";
    if (tabIndex == 4) return "secondary";
    if (tabIndex == 5) return "primary";
  };

  const getBackgroundColor = (ind) => {
    if (ind == 0) {
      return "#00000014";
    } else if (ind == 1) {
      return "#00000014";
    } else if (ind == 2) {
      return "#00800029";
    } else if (ind == 3) {
      return "#ff00001c";
    } else if (ind == 4) {
      return "#ffaf3829";
    } else if (ind == 5) {
      return "#1976d21f";
    }
  };

  const tabList = ["PURCHASE INVOICE", "TRASH"];
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };

  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`quotation/${id}`).then((res) => {
          getrow();
          Swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success"
          );
        });

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
    // url.delete(`http://dataqueuesystems.com/amaco/amaco/public/api/products/${id}`)
    // .then(res => {

    // })
    // getrow()
    // url.delete(url).then(res => {
    //     const del = employees.filter(employee => id !== employee.id)
    //     setEmployees(del)
    //
    // })
  };
  const columns = [
    {
      name: "index", // field name in the row object
      label: "S.NO.", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: 80 }}>
              <span className="pl-2">S.NO.</span>
            </TableCell>
          );
        },
      },
    },
    {
      name: "id", // field name in the row object
      label: "PO NUMBER", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              align="center"
              style={{ width: 140, maxWidth: 140 }}
            >
              <span className="pl-2">PO NUMBER</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: "break",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      label: "INVOICE NUMBER", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              align="center"
              style={{ width: 140, maxWidth: 140 }}
            >
              <span className="pl-2">INVOICE NUMBER</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: "break",
        }),
      },
    },
    {
      name: "firm_name",
      label: "COMPANY NAME",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              align="center"
              key={index}
              // className={classes.columnStyleWithWidth}
              inputProps={{ style: { textTransform: "capitalize" } }}
            >
              <span>COMPANY NAME</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: "break",
        }),
      },
    },
    {
      name: "firm_name",
      label: "ISSUE DATE",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              align="center"
              style={{ width: 150, maxWidth: 150 }}
              inputProps={{ style: { textTransform: "capitalize" } }}
            >
              <span>ISSUE DATE</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: "break",
        }),
      },
    },
    // {
    //   name: "issue_date",
    //   label: "ISSUE DATE",
    //   options: {
    //     filter: true,

    //   },
    // },
    {
      name: "id",
      label: "AMOUNT",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              className="pr-2"
              style={{ textAlign: "right" }}
            >
              <span textAlign="right">AMOUNT</span>
            </TableCell>
          );
        },

        setCellProps: () => ({
          align: "right",
          // paddingLeft:24
        }),
      },
    },
    // {
    //   name: "status",
    //   label: "STATUS",
    //   options: {
    //     filter: true,
    //   },
    // },

    //   {
    //     name: "id",
    //     label: "Action",
    //     options: {
    //         filter: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //
    //             return (
    //             <IconButton onClick={() => removeData(tableMeta.rowData[4])
    //             }
    //             >
    //                     <Icon>close</Icon>
    //             </IconButton>

    //             )

    //         },
    //     },
    // },
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              style={{ textAlign: "right" }}
              className="pr-8"
            >
              <span style={{ marginLeft: 18 }}>ACTION</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ textAlign: "right" }} className="pr-8">
              <Link to={navigatePath + "/piview/" + tableMeta.rowData[7]}>
                <Tooltip title="view more">
                  <Icon color="primary">remove_red_eye</Icon>
                </Tooltip>
              </Link>
              {/* <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon color="secondary">find_in_page</Icon>
            </IconButton>
          </Link> */}
            </div>
          );
        },
      },
    },
    {
      name: "",
      label: "Action",
      options: {
        filter: true,
        display: false,
      },
    },
  ];

  return (
    <div>
         {load && (
        <div className={classes.loading}>
          {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
          <LinearProgress  sx={{
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgb(37 44 71)',
                        color:'rgb(37 44 71)',
                    }
}} />

        </div>
      )}
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
              { name: "PURCHASE INVOICE" },
            ]}
          />

          <div className="text-right">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
                      // className="m-2"
                      margin="none"
                      label="Filter By Issue Month & Year"
                      maxDate={new Date()}
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      views={["month","year"]}
                      value={localStorage.getItem("from_date_pi") ? localStorage.getItem("from_date_pi") : from_date_pi}
                      format="MMM yyyy"
                      onChange={handleDateChange_Q}
                    />
          </MuiPickersUtilsProvider>&nbsp;&nbsp;
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
                      // className="m-2"
                      margin="none"
                      label="Filter By Issue Year"
                      maxDate={new Date()}
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      views={["year"]}
                      value={localStorage.getItem("from_date_pi") ? localStorage.getItem("from_date_pi") : from_date_pi}
                      format="yyyy"
                      onChange={handleDateChange_Q_Year}
                    />
          </MuiPickersUtilsProvider>&nbsp;&nbsp;
          {/* <Button
                    color="success"
                    variant="outlined"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <Icon>search</Icon>&nbsp;&nbsp; Filter
                  </Button>&nbsp;&nbsp; */}
                  {localStorage.getItem("dataKeyState_pi") &&<Button
                    color="error"
                    variant="outlined"
                   
                    onClick={handleReset}
                  >
                    <Icon>rotate_left</Icon>&nbsp;&nbsp; Reset
                  </Button>}&nbsp;&nbsp;

            <Link to={"/purchaseinvoicegenarate"}>
              <Button className="" variant="outlined" color="primary">
                <Icon>add</Icon> GENERATE PURCHASE INVOICES
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <Tabs
            className="mt-4"
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor={colorset(tabIndex)}
            textColor={colorset(tabIndex)}
            TabIndicatorProps={{
              style: {
                background:
                  tabIndex == 0
                    ? "black"
                    : tabIndex == 1
                    ? "rgba(255,0,0,1)"
                    : tabIndex == 2
                    ? "#008000"
                    : tabIndex == 3
                    ? "rgba(255,0,0,1)"
                    : tabIndex == 4
                    ? "#FFAF38"
                    : tabIndex == 5
                    ? "#1976d2"
                    : "",
              },
            }}
          >
            {tabList.map((item, ind) => (
              <Tab
                className="capitalize"
                style={{
                  borderBottom:
                    tabIndex == ind ? `2px solid ${colorset(tabIndex)}` : " ",
                  // color:(tabIndex==ind?colorset(tabIndex):"")
                  color:
                    item == "RFQ"
                      ? "black"
                      : item == "NEW"
                      ? "black"
                      : item == "ACCEPTED QUOTATION"
                      ? "#008000"
                      : item == "TRASH"
                      ? "rgba(255,0,0,1)"
                      : item == "DRAFT"
                      ? "#FFAF38"
                      : item == "QUOTATION HISTORY"
                      ? "#1976d2"
                      : "",
                  // backgroundColor:item == 'All' ? 'black' : item == 'NEW' ? 'black' : item == 'ACCEPTED QUOTATION' ? '#008000' : item == 'TRASH' ? 'rgba(255,0,0,1)' : item == 'DRAFT' ? '#FFAF38' : item == 'QUOTATION HISTORY' ? '#1976d2' : '' ,
                  backgroundColor:
                    ind == tabIndex ? getBackgroundColor(tabIndex) : "",
                }}
                value={ind}
                label={item}
                key={ind}
              />
            ))}
          </Tabs>
          <Divider className="mb-6" />
          {tabIndex == 0 && (
            <PurchaseView
            load={load}
              columns={columns}
              podetails={podetails?.filter((obj) => obj.delete_status == 0)}
            />
          )}
          {tabIndex == 1 && (
            <PurchaseTrash
            load={load}
              podetails={podetails?.filter((obj) => obj.delete_status == 1)}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default SimpleMuiTable;
