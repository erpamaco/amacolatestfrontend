import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon, Card, Tooltip ,TextField,MenuItem} from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url, { GDIV, navigatePath } from "../invoice/InvoiceService";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid, Tab, Tabs } from "@material-ui/core";
import SView from "./salesInv";
import STrash from "./salesinvtrash";
import { ValidatorForm } from "react-material-ui-form-validator";
import PendingList from './PendingInvList'
import LinearProgress from '@mui/material/LinearProgress';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

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
    width: "420px",
    maxWidth: "420px",
    wordBreak: "break-word",
    hyphens: "auto",
    textAlign: "center",
    paddingRight: 30,
  },
}));
const SimpleMuiTable = () => {
  const [load, setLoad] = useState(true);

  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [resetuserList, setResetUserList] = useState([]);
  const [podetails, setpodetails] = useState([]);
  const [poid, setpoid] = useState("");
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const classes = useStyles();
  const { t } = useParams();
  const curr_date = new Date();
  const curr_year = moment(curr_date).format("YYYY");

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

  const tabList = ["SALES INVOICE","PENDING INVOICES", "TRASH"];
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (t) {
      setTabIndex(parseInt(t));
    }
    if (localStorage.getItem("page") !== "sinv") {
      localStorage.removeItem("search");
      localStorage.removeItem("page");
    }

    // if (localStorage.getItem("fpage") !== "filinv") {
    //   // localStorage.removeItem("from_date");
    //   // localStorage.removeItem("to_date");
    //   // localStorage.removeItem("dataKeyState");
    // }
    if(localStorage.getItem("from_date")){
      setfrom_date(localStorage.getItem("from_date"));

    }
    if(localStorage.getItem("to_date")){
      setto_date(localStorage.getItem("to_date"));

    }
    if(localStorage.getItem("dataKeyState")){
      setUserList(JSON.parse(localStorage.getItem("dataKeyState")));
      setLoad(false);
    }
    // localStorage.removeItem("fpage");

    url.get("invoice").then(({ data }) => {
      setResetUserList(data);
      // if (isAlive) setUserList(data);
      // var myJSON = JSON.stringify(data.id);
      if(localStorage.getItem("dataKeyState")){
        setUserList(JSON.parse(localStorage.getItem("dataKeyState")));
        setLoad(false);
      }else{
      if (isAlive)
        setUserList(data.filter(
          (obj) =>
            new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(curr_year).getTime() 
            // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
     
        ));

      setAllData(data.filter(
        (obj) =>
          new Date(moment(obj.issue_date).format('YYYY')).getTime() == new Date(curr_year).getTime() 
        
      ));

      if (data.length) {
        // console.log(data)
        setpoid(data[0].id);
        setpodetails(
          data?.sort(function (a, b) {
            var dateA = new Date(a?.issue_date),
              dateB = new Date(b?.issue_date);
            return dateB - dateA;
          })
        );
      }
      setLoad(false);
    }
    });
    
    // return () =>
    setIsAlive(false);
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

  const filterbyStatus = (e) => {
    if(localStorage.getItem('dataKeyState')){
      setUserList(resetuserList)
      if(e.target.value == 'All'){
        setUserList(resetuserList)
      }else{
        if(e.target.value == 'Invoice Generated'){
          const data = resetuserList?.filter((obj)=>obj.genarate_status == e.target.value)
          setUserList(data)
        }else if(e.target.value == 'Printed'){
          const data = resetuserList?.filter((obj)=>obj.invoice_status == e.target.value)
          setUserList(data)
        }else if(e.target.value == 'Invoice Submitted'){
          const data = resetuserList?.filter((obj)=>obj.submit_status == e.target.value)
          setUserList(data)
        }else if(e.target.value == 'Invoice Acknowledge'){
          const data = resetuserList?.filter((obj)=>obj.acknowledge_status == e.target.value)
          setUserList(data)
        }else if(e.target.value == '1'){
          const data = resetuserList?.filter((obj)=>parseInt(obj.is_vat_filed) == parseInt(e.target.value))
          setUserList(data)
        }
  
      
      }

    }else{
    if(e.target.value == 'All'){
      setUserList(allData)
    }else{
      if(e.target.value == 'Invoice Generated'){
        const data = allData?.filter((obj)=>obj.genarate_status == e.target.value)
        setUserList(data)
      }else if(e.target.value == 'Printed'){
        const data = allData?.filter((obj)=>obj.invoice_status == e.target.value)
        setUserList(data)
      }else if(e.target.value == 'Invoice Submitted'){
        const data = allData?.filter((obj)=>obj.submit_status == e.target.value)
        setUserList(data)
      }else if(e.target.value == 'Invoice Acknowledge'){
        const data = allData?.filter((obj)=>obj.acknowledge_status == e.target.value)
        setUserList(data)
      }else if(e.target.value == '1'){
        const data = allData?.filter((obj)=>parseInt(obj.is_vat_filed) == parseInt(e.target.value))
        setUserList(data)
      }

    
    }
  }
    // const datas = allData.filter(
    //   (obj) =>
    //     new Date(obj.issue_date).getTime() >= new Date(from_date).getTime() &&
    //     new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
    // );
    // setUserList(
    //   datas?.sort(function (a, b) {
    //     var dateA = new Date(a?.issue_date),
    //       dateB = new Date(b?.issue_date);
    //     return dateB - dateA;
    //   })
    // );
  }

  const vatFiled = (id, vat) => {
    let v = 0;
    if (vat == 0 || vat == "" || vat == null || vat == undefined) {
      v = 1;

      Swal.fire({
          title: "Is Invoice Added to Vat File?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url.post(`invoice-vat-file/${id}/${v}`).then(({ data }) => {
              setIsAlive(true);
      
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      
     
    } else {
      v = 0;

      Swal.fire({
        title: "Is Invoice is Not Added Vat File?",
        text: "",
        icon: "",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          url.post(`invoice-vat-file/${id}/${v}`).then(({ data }) => {
            setIsAlive(true);
    
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "", "error");
        }
      });
    

     
    }
  };

  const updateStatus = (id, st, type) => {
    if (type == "generate") {
      if (
        st == "" ||
        st == null ||
        st == undefined ||
        st == "Invoice Not Generated"
      ) {
        st = "Invoice Generated";
        Swal.fire({
          title: "Is Invoice Generated?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-invoice-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      } else {
        st = "Invoice Not Generated";
        Swal.fire({
          title: "Is Invoice is Not Generated?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-invoice-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      }
    } else if (type == "submit") {
      if (
        st == "" ||
        st == null ||
        st == undefined ||
        st == "Invoice Not Submitted"
      ) {
        st = "Invoice Submitted";
        Swal.fire({
          title: "Is Invoice Submitted?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-invoice-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      } else {
        st = "Invoice Not Submitted";
        Swal.fire({
          title: "Is Invoice is Not Submitted?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-invoice-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      }
    } else if (type == "ack") {
      if (
        st == "" ||
        st == null ||
        st == undefined ||
        st == "Invoice Not Acknowledge"
      ) {
        st = "Invoice Acknowledge";
        Swal.fire({
          title: "Is Invoice Acknowledge?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-invoice-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      } else {
        st = "Invoice Not Acknowledge";
        Swal.fire({
          title: "Is Invoice is Not Acknowledge?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-invoice-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      }
    }

    // url
    //   .post(`change-invoice-status/${id}/${st}/${type}`)
    //   .then(({ data }) => {
    //     setIsAlive(true);
    //   })
    //   .catch(() => {});
  };
  const invoiceStatus = (id, st) => {
    let v = "Not Printed";

    if (st == "Not Printed" || st == "" || st == null || st == undefined) {
      v = "Printed";
      Swal.fire({
        title: "Is Invoice Printed?",
        text: "",
        icon: "",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          url.post(`invoice-Status/${id}/${v}`).then(({ data }) => {
            setIsAlive(true);
              });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "", "error");
        }
      });
      

     
    } else {
      v = "Not Printed";

      Swal.fire({
        title: "Is Invoice Not Printed?",
        text: "",
        icon: "",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          url.post(`invoice-Status/${id}/${v}`).then(({ data }) => {
            setIsAlive(true);
    
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "", "error");
        }
      });

    
    }
  };

  const addNumber = () => {
    setClick([
      ...click,
      {
        id: click.length,
        value: Math.random() * 10,
      },
    ]);
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
      label: "INVOICE NUMBER", // column title that will be shown in table
      options: {
        filter: true,

        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              align="center"
              style={{ maxWidth: 150, width: 150 }}
              inputProps={{ style: { textTransform: "capitalize" } }}
            >
              <span>INVOICE NUMBER</span>
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
              style={{ maxWidth: 150, width: 150 }}
              inputProps={{ style: { textTransform: "capitalize" } }}
            >
              <span>PO NUMBER</span>
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
              key={index}
              align="center"
              className={classes.columnStyleWithWidth}
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
              style={{ maxWidth: 150, width: 150 }}
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
              <Link to={navigatePath + "/newinvoice/" + tableMeta.rowData[7]}>
                <Tooltip title="view more">
                  <Icon style={{ fontSize: "20px" }} color="primary">
                    remove_red_eye
                  </Icon>
                </Tooltip>
              </Link>
              <Tooltip
                onClick={(e) => {
                  updateStatus(
                    tableMeta.rowData[7],
                    tableMeta.rowData[12],
                    "generate"
                  );
                }}
                title={
                  tableMeta.rowData[12]
                    ? tableMeta.rowData[12]
                    : "Invoice Generated"
                }
              >
                <Icon
                  style={{
                    cursor: "pointer",
                    color:
                      tableMeta.rowData[12] == "" ||
                      tableMeta.rowData[12] == null ||
                      tableMeta.rowData[12] == undefined ||
                      tableMeta.rowData[12] == "Invoice Not Generated"
                        ? "gray"
                        : "green",
                    fontSize: "20px",
                  }}
                >
                  add_circle
                </Icon>
              </Tooltip>

              <Tooltip
                title={
                  tableMeta.rowData[10] ? tableMeta.rowData[10] : "Not Printed"
                }
              >
                <Icon
                  onClick={(e) => {
                    invoiceStatus(tableMeta.rowData[7], tableMeta.rowData[10]);
                  }}
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                    color:
                      tableMeta.rowData[10] == "" ||
                      tableMeta.rowData[10] == null ||
                      tableMeta.rowData[10] == undefined ||
                      tableMeta.rowData[10] == "Not Printed"
                        ? "gray"
                        : "#374c91",
                  }}
                >
                  print
                </Icon>
              </Tooltip>
              <Tooltip
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  updateStatus(
                    tableMeta.rowData[7],
                    tableMeta.rowData[11],
                    "submit"
                  );
                }}
                title={
                  tableMeta.rowData[11]
                    ? tableMeta.rowData[11]
                    : "Invoice Not Submitted"
                }
              >
                <Icon
                  style={{
                    cursor: "pointer",
                    color:
                      tableMeta.rowData[11] == "" ||
                      tableMeta.rowData[11] == null ||
                      tableMeta.rowData[11] == undefined ||
                      tableMeta.rowData[11] == "Invoice Not Submitted"
                        ? "gray"
                        : "#d4192f",
                    fontSize: "20px",
                  }}
                >
                  publish
                </Icon>
              </Tooltip>
              <Tooltip
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  updateStatus(
                    tableMeta.rowData[7],
                    tableMeta.rowData[13],
                    "ack"
                  );
                }}
                title={
                  tableMeta.rowData[13]
                    ? tableMeta.rowData[13]
                    : "Invoice Not Acknowledge"
                }
              >
                <Icon
                  style={{
                    cursor: "pointer",
                    color:
                      tableMeta.rowData[13] == "" ||
                      tableMeta.rowData[13] == null ||
                      tableMeta.rowData[13] == undefined ||
                      tableMeta.rowData[13] == "Invoice Not Acknowledge"
                        ? "gray"
                        : "#d98716",
                    fontSize: "20px",
                  }}
                >
                  assignment_return
                </Icon>
              </Tooltip>

              <Tooltip
                onClick={(e) => {
                  vatFiled(tableMeta.rowData[7], tableMeta.rowData[9]);
                }}
                title={
                  tableMeta.rowData[9] == 0
                    ? "Not Filed in Vat"
                    : "Filed in Vat"
                }
              >
                <Icon
                  style={{
                    cursor: "pointer",
                    color: tableMeta.rowData[9] == 0 ? "gray" : "#22d322",
                    fontSize: "20px",
                  }}
                >
                  article
                </Icon>
              </Tooltip>

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
    {
      name: "",
      label: "type",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "",
      label: "vatfile",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "",
      label: "print",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "",
      label: "sub",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "",
      label: "gen",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "",
      label: "ack",
      options: {
        filter: true,
        display: false,
      },
    },
  ];
  var date = new Date();
  const [from_date, setfrom_date] = useState(new Date(date.getFullYear(), date.getMonth(), 1));
  const [sales_Report, setsales_Report] = useState([]);
  const [to_date, setto_date] = useState(new Date());
  const handleReset = () => {
    setfrom_date(new Date())
    setto_date(new Date())
  
    localStorage.removeItem("from_date");
      localStorage.removeItem("to_date");
    localStorage.removeItem("dataKeyState")
    setUserList(
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
        new Date(obj.issue_date).getTime() >= new Date(from_date).getTime() &&
        new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
    );
    setUserList(
      datas?.sort(function (a, b) {
        var dateA = new Date(a?.issue_date),
          dateB = new Date(b?.issue_date);
        return dateB - dateA;
      })
    );
    localStorage.setItem('dataKeyState', JSON.stringify(userList))
    
    // localStorage.setItem('dataKeyState', userList)
    // console.log("dataKeyState",JSON.parse(localStorage.getItem("dataKeyState")))
  };

  const handleDateChange = (date) => {
    if(localStorage.getItem("dataKeyState")){
      setfrom_date(moment(date).format("DD MMM YYYY"));
      localStorage.setItem("from_date",moment(date).format("DD MMM YYYY"));
      setUserList(resetuserList)
    }else{
      setfrom_date(moment(date).format("DD MMM YYYY"));
      localStorage.setItem("from_date",moment(date).format("DD MMM YYYY"));
  

    }
       
  };

  const handleDateChange1 = (date) => {
    
    if(localStorage.getItem("dataKeyState")){
      setto_date(moment(date).format("DD MMM YYYY"));
      localStorage.setItem("to_date",moment(date).format("DD MMM YYYY"));
      setUserList(resetuserList)
    }else{
      setto_date(moment(date).format("DD MMM YYYY"));
      localStorage.setItem("to_date",moment(date).format("DD MMM YYYY"));
  

    }
  };

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
              { name: "SALES INVOICE" },
            ]}
          />
          <br />
          <br />

          <div>
            <ValidatorForm className="px-0 pb-0" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="mb-4 w-full"
                      margin="none"
                      label="From Date"
                      maxDate={new Date()}
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      value={localStorage.getItem("from_date") ? localStorage.getItem("from_date") : from_date}
                      format="MMMM dd, yyyy"
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                {console.log("userList",userList)}

                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="mb-4 w-full"
                      margin="none"
                      label="To Date"
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      value={localStorage.getItem("to_date") ? localStorage.getItem("to_date") : to_date}
                      format="MMMM dd, yyyy"
                      onChange={handleDateChange1}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item >
                 <Button
                    color="success"
                    variant="outlined"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <Icon>search</Icon>&nbsp;&nbsp; Filter
                  </Button>&nbsp;&nbsp;
                  {localStorage.getItem("dataKeyState") &&<Button
                    color="error"
                    variant="outlined"
                   
                    onClick={handleReset}
                  >
                    <Icon>rotate_left</Icon>&nbsp;&nbsp; Reset
                  </Button>}
                 
                </Grid>
                <Grid item >
                  <TextField
                    className="mb-4 mr-2"
                    label="Filter By Status"
                    variant="outlined"
                    fullWidth
                    style={{width:'175px'}}
                    onChange={(e)=>{filterbyStatus(e)}}
                    select
                    size="small"
                    name="filter_by_status"
                  >
                    <MenuItem value={'All'}>ALL</MenuItem>
                    <MenuItem value={'Invoice Generated'}>GENERATED INVOICES</MenuItem>
                    <MenuItem value={'Printed'}>PRINTED INVOICES</MenuItem>
                    <MenuItem value={'Invoice Submitted'}>SUBMITTED INVOICES</MenuItem>
                    <MenuItem value={'Invoice Acknowledge'}>ACKNOWLEDGED INVOICES</MenuItem>
                    <MenuItem value={'1'}>VAT FILED INVOICES</MenuItem>

                  </TextField>
                </Grid>
                <Grid item lg={3} xs={12}>
                  <div className="text-right">
                    <Link to={navigatePath + "/InvoiceCreate"}>
                      <Button
                        className="py-2"
                        variant="outlined"
                        color="primary"
                      >
                        <Icon>add</Icon> GENERATE INVOICES
                      </Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </ValidatorForm>
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
                    : tabIndex == 2
                    ? "rgba(255,0,0,1)"
                    : tabIndex == 3
                    ? "#008000"
                    : tabIndex == 4
                    ? "rgba(255,0,0,1)"
                    : tabIndex == 1
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
                      : item == "PENDING INVOICES"
                      ? "#FFAF38"
                      : item == "QUOTATION HISTORY"
                      ? "#1976d2"
                      : "",
                  // backgroundColor:item == 'All' ? 'black' : item == 'NEW' ? 'black' : item == 'ACCEPTED QUOTATION' ? '#008000' : item == 'TRASH' ? 'rgba(255,0,0,1)' : item == 'DRAFT' ? '#FFAF38' : item == 'QUOTATION HISTORY' ? '#1976d2' : '' ,
                  backgroundColor:
                    ind == tabIndex ? getBackgroundColor(tabIndex) : "",
                }}
                value={ind}
                label={item == 'TRASH' ? localStorage.getItem('role') == 'SA' ? item : '' : item}
                key={ind}
              />
            ))}
          </Tabs>
          <Divider className="mb-6" />
          {tabIndex == 0 && (
            <SView
              columns={columns}
              load={load}
              podetails={userList?.filter((obj) => obj.delete_status == 0 && obj.approve == 1 && obj.proforma != "pinv")}
            />
          )}
          {tabIndex == 2 && (
           
            <STrash
              load={load}
              podetails={userList?.filter((obj) => obj.delete_status == 1 && obj.proforma != "pinv")}
            />
          )}
          {localStorage.getItem('role') == 'SA' ? <>
          {tabIndex == 1 && (
             <PendingList
             load={load}
             columns={columns}
             podetails={userList?.filter((obj) => obj.delete_status == 0 && obj.approve == 0 && obj.proforma != "pinv")}
           />
          )}
          </> : <>
          {tabIndex == 1 && (
             <PendingList
             load={load}
             columns={columns}
             podetails={userList?.filter((obj) => obj.delete_status == 0 && parseInt(obj.user_id) == parseInt(localStorage.getItem('user_id')) && obj.approve == 0 && obj.proforma != "pinv")}
           />
          )}
          </>}
         
        </Card>
      </div>
    </div>
  );
};

export default SimpleMuiTable;
