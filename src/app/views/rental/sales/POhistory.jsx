import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon, Tooltip } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url, { navigatePath } from "../../invoice/InvoiceService";
import moment from "moment";

// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

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
    textAlign: "center"
  }
  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "550px",
    wordBreak: "break-all",
    textAlign: "center"
  }

  useEffect(() => {
    if(localStorage.getItem('page') !== 'po'){
      localStorage.removeItem('search')
      localStorage.removeItem('page')
  }
    url.get("purchaseInvoiceHList").then(({ data }) => {
      // if (isAlive) setUserList(data);
      // var myJSON = JSON.stringify(data.id);

      if (data.length) {


        setpoid(data[0]?.id)
        setpodetails(data);
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
        url.delete(`quotation/${id}`)
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
      name: "index", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth}>
              <span >S.NO.</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id", // field name in the row object
      label: "PO NUMBER", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center",maxWidth:150,width:150 }} >
              <span >PO NUMBER</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
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
              <span style={{ marginLeft: 18 }}>COMPANY NAME</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "name",
      label: "CREATED DATE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} align='center' style={{ textAlign: "center" }}>
              <span >CREATED DATE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "net_amount",
      label: "AMOUNT",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "right" }} className="pr-2">
              <span >AMOUNT</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "right"
        })
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
            <TableCell key={index} style={{ textAlign: "right" }} className="pr-8">
              <span style={{ marginLeft: 18 }}>ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div style={{ textAlign: "right" }} className="pr-8">
              {/* <Link to={"/newinvoice/"+tableMeta.rowData[5]}></Link> */}
              <Link to={navigatePath + "/poinvoice/" + tableMeta.rowData[5]+'/his'}>
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

          )

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
            {/* <Breadcrumb
              routeSegments={[
                // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
                { name: "PURCHASE ORDER" },
              ]}
            /> */}

            <div className="text-right">
              <div className="text-right">
                {/* <Link to={"quickPo"}>
                  <Button
                    className="py-2"
                    variant="outlined"
                    color="primary"
                  >
                    <Icon>add</Icon> GENERATE PURCHASE ORDER
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
        <MUIDataTable
          title={"PURCHASE ORDER"}
          data={podetails.filter(obj => obj.div_id == localStorage.getItem('division')&&obj.delete==0).map((item, index) => {

            return [
              ++index,
              item?.po_number,
              item?.party?.firm_name,
              moment(item?.created_at).format('DD MMM YYYY'),
              isNaN(parseFloat(item?.net_amount)) ? '0.00': parseFloat(item?.net_amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
              item?.id
            ]

          })}
          columns={columns}
          options={{
            // filterType: "textField",
            // responsive: "simple",
            // selectableRows: "none", // set checkbox for each row
            // search: false, // set search option
            // filter: false, // set data filter option
            // download: false, // set download option
            // print: false, // set print option
            // pagination: true, //set pagination option
            // viewColumns: false, // set column option
            // elevation: 0,
            textLabels: {
                    body: {
                        noMatch: 'Sorry, no records found',
                        }
                      },
            rowsPerPageOptions: [10, 20, 40, 80, 100],
            selectableRows: "none",
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
                localStorage.setItem('page','po');
              }
            },
          searchText: localStorage.getItem('search') && localStorage.getItem('search') ,
          


          }}
        />
      </div>
    </div>
  );
}


export default SimpleMuiTable;
