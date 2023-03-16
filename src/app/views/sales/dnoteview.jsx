import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Icon, Tooltip } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url from "../../views/invoice/InvoiceService";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@mui/material/LinearProgress';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  TableRow,
  Button
} from "@material-ui/core";


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
  const classes = useStyles();
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [qdetails, setqdetails] = useState([]);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [from_date_q_del, setfrom_date_q_del] = useState(moment(new Date()).format("MMM YYYY"));
  const [resetuserList, setResetUserList] = useState([]);
  const curr_date = new Date();
  const curr_year = moment(curr_date).format("YYYY");
  const handleDateChange_Q = (date) => {
    if(localStorage.getItem("dataKeyState_q_del")){
      setfrom_date_q_del(moment(date).format("MMM YYYY"));
      localStorage.setItem("from_date_q_del",moment(date).format("MMM YYYY"));
      setqdetails(resetuserList)
      const datas = resetuserList.filter(
        (obj) =>
          new Date(obj.issue_date ? moment(obj.issue_date).format('MMM YYYY') :  moment(obj.created_at).format('MMM YYYY')).getTime() == new Date(moment(date).format("MMM YYYY")).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      );
      setqdetails(datas);
      localStorage.setItem('dataKeyState_q_del', JSON.stringify(datas))
      
    }else{
      setfrom_date_q_del(moment(date).format("MMM YYYY"));
      localStorage.setItem("from_date_q_del",moment(date).format("MMM YYYY"));
      const datas = resetuserList.filter(
        (obj) =>
          new Date(obj.issue_date ? moment(obj.issue_date).format('MMM YYYY') :  moment(obj.created_at).format('MMM YYYY')).getTime() == new Date(moment(date).format("MMM YYYY")).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      );
      setqdetails(datas);
      localStorage.setItem('dataKeyState_q_del', JSON.stringify(datas))
      
  

    }
       
  };



  const handleDateChange_Q_Year = (date) => {
    if(localStorage.getItem("dataKeyState_q_del")){
      setfrom_date_q_del(moment(date).format("YYYY"));
      localStorage.setItem("from_date_q_del",moment(date).format("YYYY"));
      setqdetails(resetuserList)
      const datas = resetuserList.filter(
        (obj) =>
          new Date(obj.issue_date ? moment(obj.issue_date).format('YYYY') :  moment(obj.created_at).format('YYYY')).getTime() == new Date(moment(date).format("YYYY")).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      );
      setqdetails(datas);
      localStorage.setItem('dataKeyState_q_del', JSON.stringify(datas))
      
    }else{
      setfrom_date_q_del(moment(date).format("YYYY"));
      localStorage.setItem("from_date_q_del",moment(date).format("YYYY"));
      const datas = resetuserList.filter(
        (obj) =>
          new Date(obj.issue_date ? moment(obj.issue_date).format('YYYY') :  moment(obj.created_at).format('YYYY')).getTime() == new Date(moment(date).format("YYYY")).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      );
      setqdetails(datas);
      localStorage.setItem('dataKeyState_q_del', JSON.stringify(datas))
      
  

    }
       
  };

  const handleReset = () => {
    setfrom_date_q_del(new Date())
    
  
    localStorage.removeItem("from_date_q_del");
      
    localStorage.removeItem("dataKeyState_q_del")
    setqdetails(
      resetuserList.filter(
        (obj) =>
        new Date(obj.issue_date ? moment(obj.issue_date).format('YYYY') :  moment(obj.created_at).format('YYYY')).getTime() == new Date(curr_year).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      )
    );
    setIsAlive(false)
    // window.location.reload()
  }
  const handleSubmit = () => {
    const datas = resetuserList.filter(
  (obj) =>
    new Date(obj.issue_date ? moment(obj.issue_date).format('YYYY') :  moment(obj.created_at).format('YYYY')).getTime() == new Date(from_date_q_del).getTime() 
    // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
);
setqdetails(datas);
localStorage.setItem('dataKeyState_q_del', JSON.stringify(datas))

// localStorage.setItem('dataKeyState', userList)
// console.log("dataKeyState",JSON.parse(localStorage.getItem("dataKeyState")))
};

  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "600px",
    wordBreak: "break-all",

  }
  const columnStyleWithWidth = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "120px",
    wordBreak: "break-word",

  }


  const updateStatus = (id, st, type) => {
    if (type == "generate") {
      if (
        st == "" ||
        st == null ||
        st == undefined ||
        st == "Delivery Note Not Generated"
      ) {
        st = "Delivery Note Generated";
        Swal.fire({
          title: "Is Delivery Note Generated?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-delivery-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      } else {
        st = "Delivery Note Not Generated";
        Swal.fire({
          title: "Is Delivery Note Not Generated?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-delivery-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      }
    } else if (type == "print") {
      if (
        st == "" ||
        st == null ||
        st == undefined ||
        st == "Delivery Note Not Printed"
      ) {
        st = "Delivery Note Printed";
        Swal.fire({
          title: "Is Delivery Note Printed?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-delivery-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      } else {
        st = "Delivery Note Not Printed";
        Swal.fire({
          title: "Is Delivery Note Not Printed?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-delivery-status/${id}/${st}/${type}`)
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
        st == "Delivery Note Not Acknowledged"
      ) {
        st = "Delivery Note Acknowledged";
        Swal.fire({
          title: "Is Delivery Note Acknowledged?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-delivery-status/${id}/${st}/${type}`)
            .then(({ data }) => {
              setIsAlive(true);
            })
            .catch(() => {});
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "", "error");
          }
        });
      } else {
        st = "Delivery Note Not Acknowledged";
        Swal.fire({
          title: "Is Delivery Note Not Acknowledged?",
          text: "",
          icon: "",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            url
            .post(`change-delivery-status/${id}/${st}/${type}`)
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
    //   .post(`change-delivery-status/${id}/${st}/${type}`)
    //   .then(({ data }) => {
    //     setIsAlive(true);
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    if(localStorage.getItem('page') !== 'dnote'){
      localStorage.removeItem('search')
      localStorage.removeItem('page')
  }
  if(localStorage.getItem("from_date_q_del")){
    setfrom_date_q_del(localStorage.getItem("from_date_q_del"));

  }
  
  
    url.get("delivery-notes").then(({ data }) => {
      // if (isAlive) setUserList(data);
      setResetUserList(data);
      // var myJSON = JSON.stringify(data.id);
      // if(data.length)
      // {
      //   setUserList(data);
      if(localStorage.getItem("dataKeyState_q_del")){
        setqdetails(JSON.parse(localStorage.getItem("dataKeyState_q_del")));
        setLoad(false);
      }else{

      // setqdetails(data?.sort(function (a, b) {
      //   var dateA = new Date(a?.issue_date ? a?.issue_date : a?.created_at),
      //     dateB = new Date(b?.issue_date ? b?.issue_date : b?.created_at);
      //   return dateB - dateA;
      // }));  
      setqdetails(data.filter(
        (obj) =>
        new Date(obj.issue_date ? moment(obj.issue_date).format('YYYY') :  moment(obj.created_at).format('YYYY')).getTime() == new Date(curr_year).getTime() 
          // new Date(obj.issue_date).getTime() <= new Date(to_date).getTime()
      ));
      }
      setLoad(false);
    });
   setIsAlive(false);
  }, [isAlive]);
  const [count, setCount] = useState(0);
  const routerHistory = useHistory();
  const handeViewClick = (invoiceId) => {
    routerHistory.push(`/rfqanalysis/${invoiceId}`);
  };

  function getrow(id) {
    url.get("rfq/" + id).then(({ data }) => {
      if (isAlive) setqdetails(data[0].qdetails);
    });
    return () => setIsAlive(false);
  }
  function Increment(e) {
    alert('3')
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
        value: Math.random() * 10
      }
    ]);
  };
  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`products/${id}`)
          .then(res => {
            getrow()
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            )

          })


        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    // url.delete(`http://dataqueuesystems.com/amaco/amaco/public/api/products/${id}`)
    // .then(res => {

    // })
    // getrow()
    // url.delete(url).then(res => {
    //     const del = employees.filter(employee => id !== employee.id)
    //     setEmployees(del)
    // })
  }
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.NO.",
      // column title that will be shown in table
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: 100 }}>
              <span className="pl-2">S.NO.</span>
            </TableCell>
          )
        },
      }

    },
    {
      name: "delivery_number", // field name in the row object
      label: "DELIVERY NUMB ER", // column title that will be shown in table
      options: {
        filter: true,
        setCellProps: () => ({
          align: "center",

        }),
        wordBreak: 'break-word',
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} align="center" >
              <span className="pl-2">DELIVERY NUMBER</span>
            </TableCell>
          )
        },

      },
    },
    {
      name: "delivery_number", // field name in the row object
      label: "DELIVERY NUMB ER", // column title that will be shown in table
      options: {
        filter: true,
        setCellProps: () => ({
          align: "center",

        }),
        wordBreak: 'break-word',
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} align="center" >
              <span className="pl-2">COMPANY NAME</span>
            </TableCell>
          )
        },

      },
    },

    {
      name: "po_number",
      label: "P.O. NUMBER",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} align="center">
              <span className="pl-2">P.O. NUMBER</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",

        })
      },
    },
    {
      name: "created_date",
      label: "DATE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} align="center" >
              <span className="pl-2">DATE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",

        })
      },
    },

    //   {
    //     name: "id",
    //     label: "Action",
    //     options: {
    //         filter: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
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
            <TableCell key={index} style={{ textAlign: "right" }} className="pr-8">
              <span style={{ marginLeft: 15 }}>ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ textAlign: "right" }} className="pr-8">
              <Link to={"/invview/" + tableMeta.rowData[5] + "/" + tableMeta.rowData[6]}>
                <Tooltip title="View More">
                  <Icon style={{fontSize: "20px"}} color="primary">remove_red_eye</Icon>
                </Tooltip>
              </Link>

            <Tooltip
                onClick={(e) => {
                  updateStatus(
                    tableMeta.rowData[5],
                    tableMeta.rowData[8],
                    "generate"
                  );
                }}
                title={
                  tableMeta.rowData[8]
                    ? tableMeta.rowData[8]
                    : "Delivery Note Not Generated"
                }
              >
                <Icon
                  style={{
                    cursor: "pointer",
                    color:
                      tableMeta.rowData[8] == "" ||
                      tableMeta.rowData[8] == null ||
                      tableMeta.rowData[8] == undefined ||
                      tableMeta.rowData[8] == "Delivery Note Not Generated"
                        ? "gray"
                        : "green",
                    fontSize: "20px",
                  }}
                >
                  add_circle
                </Icon>
              </Tooltip>
            <Tooltip
                onClick={(e) => {
                  updateStatus(
                    tableMeta.rowData[5],
                    tableMeta.rowData[9],
                    "print"
                  );
                }}
                title={
                  tableMeta.rowData[9]
                    ? tableMeta.rowData[9]
                    : "Delivery Note Not Printed"
                }
              >
                <Icon
                  style={{
                    cursor: "pointer",
                    color:
                      tableMeta.rowData[9] == "" ||
                      tableMeta.rowData[9] == null ||
                      tableMeta.rowData[9] == undefined ||
                      tableMeta.rowData[9] == "Delivery Note Not Printed"
                        ? "gray"
                        : "green",
                    fontSize: "20px",
                  }}
                >
                  print
                </Icon>
              </Tooltip>
            <Tooltip
                onClick={(e) => {
                  updateStatus(
                    tableMeta.rowData[5],
                    tableMeta.rowData[7],
                    "ack"
                  );
                }}
                title={
                  tableMeta.rowData[7]
                    ? tableMeta.rowData[7]
                    : "Delivery Note Not Acknowledged"
                }
              >
                <Icon
                  style={{
                    cursor: "pointer",
                    color:
                      tableMeta.rowData[7] == "" ||
                      tableMeta.rowData[7] == null ||
                      tableMeta.rowData[7] == undefined ||
                      tableMeta.rowData[7] == "Delivery Note Not Acknowledged"
                        ? "gray"
                        : "green",
                    fontSize: "20px",
                  }}
                >
                  assignment_return
                </Icon>
              </Tooltip>
              {/* <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon color="secondary">find_in_page</Icon>
            </IconButton>
          </Link> */}
            </div>

          )

        },
      },
    },
    {
      name: "",
      // label: "Action",
      options: {
        filter: true,
        display: 'none',
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
           <>
            <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
              <IconButton>
                <Icon color="secondary">find_in_page</Icon>
              </IconButton>
            </Link>

           </>

          )

        },
      },
    },
    {
      name: "",
      // label: "Action",
      options: {
        filter: true,
        display: 'none',
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
           <>
            <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
              <IconButton>
                <Icon color="secondary">find_in_page</Icon>
              </IconButton>
            </Link>

           </>

          )

        },
      },
    },
    {
      name: "",
      // label: "Action",
      options: {
        filter: true,
        display: 'none',
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
           <>
            <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
              <IconButton>
                <Icon color="secondary">find_in_page</Icon>
              </IconButton>
            </Link>

           </>

          )

        },
      },
    },
    {
      name: "",
      // label: "Action",
      options: {
        filter: true,
        display: 'none',
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
           <>
            <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
              <IconButton>
                <Icon color="secondary">find_in_page</Icon>
              </IconButton>
            </Link>

           </>

          )

        },
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
              { name: "DELIVERY NOTES" },
            ]}
          />
          <div className="text-right">
         
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
                      // className="m-2"
                      margin="none"
                      label="Filter By Month & Year"
                      maxDate={new Date()}
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      views={["month","year"]}
                      value={localStorage.getItem("from_date_q_del") ? localStorage.getItem("from_date_q_del") : from_date_q_del}
                      format="MMM yyyy"
                      onChange={handleDateChange_Q}
                    />
          </MuiPickersUtilsProvider>&nbsp;&nbsp;

          
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
                      // className="m-2"
                      margin="none"
                      label="Filter By Year"
                      maxDate={new Date()}
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      autoOk={true}
                      views={["year"]}
                      value={localStorage.getItem("from_date_q_del") ? localStorage.getItem("from_date_q_del") : from_date_q_del}
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
                  {localStorage.getItem("dataKeyState_q_del") &&<Button
                    color="error"
                    variant="outlined"
                   
                    onClick={handleReset}
                  >
                    <Icon>rotate_left</Icon>&nbsp;&nbsp; Reset
                  </Button>}

        
          
        </div> 

          {/* <div className="text-right">
          <Link to={"/Newquoteanalysis"}>
            <Button
              className="py-2"
              variant="outlined"
              color="primary"
            >
              <Icon>add</Icon> Add New 
          </Button>
          </Link>
        </div>  */}
        </div>
        <MUIDataTable
          title={"DELIVERY NOTES"}

          data={qdetails.filter(obj => obj.div_id == localStorage.getItem('division')).map((item, index) => {
            // console.log(item.party[0]?.firm_name)
            console.log(item)
            return [
              ++index,
              item?.delivery_number,
              item?.party[0]?.firm_name ? item?.party[0]?.firm_name : '--',
              item?.po_number,

              moment(item?.issue_date ? item?.issue_date : item?.created_at).format('DD MMM YYYY'),
              item?.id,
              item.quotation_id ? "quote" : "invoice",
              item.acknowledge_status,
              item.created_status,
              item.printed_status,
              // item.requested_date,
              // item.require_date,
            ]

          })}

          columns={columns}
          options={{

            rowsPerPageOptions: [10, 20, 40, 80, 100],
            selectableRows: "none",
            textLabels: {
                    body: {
                      noMatch: load ? "Data Loading..." : "Sorry, no records found",
                        }
                      },
            filterType: "dropdown",
            // responsive: "scrollMaxHeight",
            rowsPerPage: 10,
            onSearchClose: e => {
                          localStorage.removeItem("search");
                          localStorage.removeItem("page");
                        },
            searchProps: {
              onKeyUp:(e) => {
                localStorage.setItem('search',e.target.value);
                localStorage.setItem('page','dnote');
              }
            },
          searchText: localStorage.getItem('search') && localStorage.getItem('search') ,
          

            // expandableRows: true,
            // expandableRowsOnClick: true,
            renderExpandableRow: (rowData, rowMeta) => {

              return (
                <tr>
                  <td colSpan={6}>
                    <Table style={{ minWidth: "650", border: "1px solid black" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>product Name</TableCell>
                          <TableCell>description</TableCell>
                          <TableCell>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {userList.map((item, index) => {
                        if(rowData[0]===item.id)
                      {
                      {item.qdetails.map((row,index) => {
                      
                       return(<TableRow key={row.product[0].id}>

                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.product[0].name}</TableCell>
                          <TableCell>{row.product[0].id}</TableCell>
                        </TableRow>
                       )
                      })}
                      } */}
                        {/* {userList.map((item, index) => {
                        
                        {item.qdetails.map(row => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="right">{row.product[0].name}</TableCell>
                            <TableCell align="right">{row.product[0].name}</TableCell>
                            <TableCell align="right">{row.product[0].name}</TableCell>
                            <TableCell align="right">{row.product[0].name}</TableCell>
                          </TableRow>
                        ))}
                      
                      })}
                       */}
                        {/* })} */}

                      </TableBody>
                    </Table>
                  </td>
                </tr>
              )
            }
          }}
        />
      </div>
    </div>
  );
}


export default SimpleMuiTable;
