import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon,Card, Tooltip } from "@material-ui/core";
import { Link,useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url, { navigatePath } from "../../../invoice/InvoiceService";
import moment from "moment";
import { Divider, Tab, Tabs } from "@material-ui/core";
import PRTrash from './PRTrash';
import PReturn from './PReturn';

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

const PurchaseReturn = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [podetails, setpodetails] = useState([]);
  const [poid, setpoid] = useState("");
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const columnStyleWithWidth = {
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "100px",
    wordBreak: "break-all",
    textAlign: "center",
  };
  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "480px",
    wordBreak: "break-all",
    textAlign: "center",
  };

  useEffect(() => {

    if(idd){
        setTabIndex(parseInt(idd))
    }
    
    if (localStorage.getItem("page") !== "purchasereturn") {
      localStorage.removeItem("search");
      localStorage.removeItem("page");
    }
    url.get("purchase-return-table").then(({ data }) => {
      // if (isAlive) setUserList(data);
      // var myJSON = JSON.stringify(data.id);

      if (data.length) {
        // setpoid(data[0]?.id)
        setpodetails(data);
      }
    });
    return () => setIsAlive(false);
  }, [isAlive]);

  const { idd} = useParams();


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

  const tabList = ["PURCHASE RETURN", "TRASH"];
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };

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

    // })
  };
  const columns = [
    {
      name: "index", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth}>
              <span>S.NO.</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      label: "PR NUMBER", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span>DEBITNOTE NUMBER</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "fname", // field name in the row object
      label: "Company Name", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth1}>
              <span style={{ marginLeft: 18 }}>VENDOR NAME</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "name",
      label: "CREATED DATE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span>CREATED DATE</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "net_amount",
      label: "AMOUNT",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              style={{ textAlign: "right" }}
              className="pr-2"
            >
              <span>AMOUNT</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "right",
        }),
      },
    },

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
              {/* <Link to={"/newinvoice/"+tableMeta.rowData[5]}></Link> */}
              <Link to={navigatePath + "/prinvoice/" + tableMeta.rowData[5]}>
                <Tooltip title="View More">
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
    //   {
    //     name: "",
    //     // label: "Action",
    //     options: {
    //       filter: true,
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         return (
    //           <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
    //             <IconButton>
    //               <Icon color="secondary">find_in_page</Icon>
    //             </IconButton>
    //           </Link>

    //         )

    //       },
    //     },
    // },
  ];

 
  

  return (
    <div>
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <div className="flex flex-wrap justify-between pt-2">
            <Breadcrumb
              routeSegments={[
                // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
                { name: "PURCHASE RETURN" },
              ]}
            />

            <div className="text-right">
              <div className="text-right">
                <Link to={"genpurchasereturn"}>
                  <Button className="py-2" variant="outlined" color="primary">
                    <Icon>add</Icon> GENERATE PURCHASE RETURN
                  </Button>
                </Link>
              </div>
            </div>
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
        {tabIndex == 0 && <PReturn columns={columns}  podetails={podetails?.filter(obj => obj.delete_status == 0)}/>}
        {tabIndex == 1 && <PRTrash  podetails={podetails?.filter(obj => obj.delete_status == 1)} />}
    
       </Card>
      </div>
    </div>
  );
};

export default PurchaseReturn;
