import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url from "../invoice/InvoiceService";
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

  useEffect(() => {
    url.get("purchase-invoice").then(({ data }) => {
      // if (isAlive) setUserList(data);
      // var myJSON = JSON.stringify(data.id);

      if (isAlive) setUserList(data);

      if (data.length) {

        setpoid(data[0].id)
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
    //    
    // })
  }
  const columns = [
    {
      name: "index", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    {
      name: "id", // field name in the row object
      label: "Invoice Number", // column title that will be shown in table
      options: {
        filter: true,
      },
    },

    {
      name: "issue_date",
      label: "Issue Date",
      options: {
        filter: true,
      },
    },
    {
      name: "grand_total",
      label: "Amount",
      options: {
        filter: true,
      },
    },
    {
      name: "status",
      label: "status",
      options: {
        filter: true,
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
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <span>
              <Link to={"/poinvview/" + tableMeta.rowData[5]}>
                <IconButton>
                  <Icon color="primary">remove_red_eye</Icon>
                </IconButton>
              </Link>
              {/* <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon color="secondary">find_in_page</Icon>
            </IconButton>
          </Link> */}
            </span>

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
          <Breadcrumb
            routeSegments={[
              // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
              { name: "Invoice" },
            ]}
          />

          {/* <div className="text-right">
          <Link to={"/sales/rfq-form/Rfqform"}>
            <Button
              className="py-2"
              variant="outlined"
              color="primary"
            >
              <Icon>add</Icon> Add New 
          </Button>
          </Link>
        </div> */}
        </div>
        <MUIDataTable
          title={"Invoice"}
          data={podetails.map((item, index) => {

            return [
              ++index,
              item.invoice_no,
              moment(item.issue_date).format('DD MMM YYYY'),
              item.grand_total,
              item.status,
              item.id
              // moment(item.created_at).format('DD-MM-YYYY'),
              // (parseFloat(item.net_amount)).toFixed(2),
              // item.id
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
            rowsPerPageOptions: [10, 20, 40, 80, 100],
            selectableRows: "none",
            filterType: "dropdown",
            responsive: "scrollMaxHeight",
            rowsPerPage: 10,

          }}
        />
      </div>
    </div>
  );
}


export default SimpleMuiTable;
