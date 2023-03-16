import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon, Tooltip, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url from "../invoice/InvoiceService";
import moment from "moment";
import FormDialog from "./addcompanyInfo"
import MemberEditorDialog from "./addcompanyInfo";
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


const CompanyInfo = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [qdetails, setqdetails] = useState([]);
  const [company, setcompany] = useState([]);
  const [cid, setcid] = useState()
  useEffect(() => {


    url.get("company").then(({ data }) => {
      if (data.length) {
        setcid(data[0].id)
      }

    })
    return setIsAlive(false)
  }, [isAlive])
  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "580px",
    wordBreak: "break-all",

  }
  const columnStyleWithWidth = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "140px",
    wordBreak: "break-word",

  }
  useEffect(() => {
    url.get("quotations-rejected-list ").then(({ data }) => {
      // if (isAlive) setUserList(data);
      // var myJSON = JSON.stringify(data.id);

      // if(data.length)
      // {
      setUserList(data);

      setqdetails(data);
      // }
    });
    url.get("company").then(({ data }) => {

      setcompany(data);



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
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);

  const [click, setClick] = useState([]);
  const handleDialogClose = () => {

    setShouldOpenEditorDialog(false);
    setIsAlive(true)

  };

  const handleDeleteUser = (user) => {

    setShouldOpenConfirmationDialog(true);
  };

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
      label: "S.No.",
      // column title that will be shown in table
      options: {
        filter: true,

        // cellStyle: {
        //   width: 20,
        //   maxWidth: 20
        // },

      },

    },
    {
      name: "quotation_no", // field name in the row object
      label: "Quotation No", // column title that will be shown in table
      options: {
        filter: true,
        wordBreak: 'break-word',
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth} >
              <span style={{ marginLeft: 18 }}>Quotation No</span>
            </TableCell>
          )
        }

      },
    },
    {
      name: "fname", // field name in the row object
      label: "Company Name", // column title that will be shown in table
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth1} >
              <span style={{ marginLeft: 18 }}>Company Name</span>
            </TableCell>
          )
        }
      },
    },
    {
      name: "name",
      label: "Quote Date",
      options: {
        filter: true,
      },
    },
    {
      name: "require_date",
      label: "Amount",
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
              <Link to={`/quote/${tableMeta.rowData[5]}/reject`}>
                <Tooltip title="View More">
                  <Icon color="primary">remove_red_eye</Icon>
                </Tooltip>
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
        </div>

      </div>

      <div className="mb-8">
        <div className="px-4 flex justify-start">
          <div className="flex " >



            {/* <div variant="text" className="w-full justify-start px-5"> */}
            <div className="pr-12">
              <p className="mb-4">1.Name:</p>
              {/* </div> */}
              {/* <div variant="text" className="w-full justify-start px-5"> */}

              <p className="mb-4">2.Email:</p>
              {/* </div> */}
              {/* <div variant="text" className="w-full justify-start px-5"> */}

              <p className="mb-4">3.C.R. No.:</p>
              {/* </div> */}
              {/* <div variant="text" className="w-full justify-start px-5"> */}

              <p className="mb-4">4.Contact No:</p>
              {/* </div> */}
              {/* <div variant="text" className="w-full justify-start px-5"> */}

              <p className="mb-4">5.P.O.Box:</p>
              {/* </div> */}
              {/* <div variant="text" className="w-full justify-start px-5"> */}

              <p className="mb-4">6.Fax:</p>
              {/* // </div> */}
              {/* <div variant="text" className="w-full justify-start px-5"> */}

              <p className="mb-4">7.Website:</p>
              {/* </div> */}
              {/* <div variant="text" className="w-full justify-start px-5"> */}

              <p className="mb-4">8.Address:</p>

              {/* </div> */}
            </div>
          </div>
          <div className="flex " >
            {company.map((item, i) =>
            (

              <div className="pl-4" >
                <p className="mb-4"><strong>{item.name}</strong></p>
                <p className="mb-4"><strong>{item.email}</strong></p>
                <p className="mb-4"><strong>{item.cr_no}</strong></p>
                <p className="mb-4"><strong>{item.contact}</strong></p>
                <p className="mb-4"><strong>{item.po_box}</strong></p>
                <p className="mb-4"><strong>{item.fax}</strong></p>
                <p className="mb-4"><strong>{item.website}</strong></p>
                <p className="mb-4"><strong>{item.address}</strong></p>

              </div>
            ))}
          </div>




        </div>
        <div className="pb-4">
          <Button onClick={e => setShouldOpenEditorDialog(true)} className="mr-4 py-2" style={{ position: 'absolute', right: 50 }} variant="outlined" color="primary" type="submit" aignItem="right">
            <Icon>edit</Icon>
            <span className="pl-2 capitalize">UPDATE PROFILE</span>
          </Button>
          {shouldOpenEditorDialog && (
            <MemberEditorDialog
              handleClose={handleDialogClose}
              open={shouldOpenEditorDialog}
              cid={cid}


            />
          )}
          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={handleDialogClose}
              text="Are you sure to delete?"
            />
          )}
        </div>


      </div>
    </div>
  );
}


export default CompanyInfo;
