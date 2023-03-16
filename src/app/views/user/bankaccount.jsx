import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import MaterialTable from "mui-datatables";
import { Divider, Icon, Tooltip } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import url from "../invoice/InvoiceService";
import moment from "moment";
import FormDialog from "./addbank"
import MemberEditorDialog from "./addbank";
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Table,
  TableHead,
  TextField,
  TableCell,
  TableBody,
  IconButton,
  TableRow,
  Button
} from "@material-ui/core";


const Bank_Account = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [BankList, setBankList] = useState([]);
  const [qdetails, setqdetails] = useState([]);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const handleDialogClose = () => {

    setShouldOpenEditorDialog(false);
    setIsAlive(true)
  };

  const changeStatus = (id) => {

    url.put("company-bank-update/" + id).then(({ data }) => {
      Swal.fire(
        'Updated!',
        'Your Bank is set for default.',
        'success'
      )
      setIsAlive(true)
    })



  }

  const deletebank = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Bank details!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete("company-bank/" + id).then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Your Bank details has been deleted.',
            'success'
          )
          setIsAlive(true)
        })
      }
      else {
        Swal.fire(
          'Cancelled',
          'Your Bank Details is safe :)',
          'error'
        )
      }

    })

  }

  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "250px",
    wordBreak: "break-all",

  }
  const columnStyleWithWidth = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "250px",
    wordBreak: "break-word",

  }
  useEffect(() => {
    url.get("company-bank").then(({ data }) => {
      // if (isAlive) setBankList(data);
      // var myJSON = JSON.stringify(data.id);

      // if(data.length)
      // {
      setBankList(data);

      setqdetails(data);
      // }
    });
    return setIsAlive(false);
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
  const [bid, setbid] = useState();
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
  const editbank = (id) => {
    setbid(id)
    setShouldOpenEditorDialog(true)
  }
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
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: 50 }}>
              <span style={{ marginLeft: 15 }}>S.NO.</span>
            </TableCell>
          )
        },

        // cellStyle: {
        //   width: 20,
        //   maxWidth: 20
        // },

      },

    },
    {
      name: "quotation_no", // field name in the row object
      label: "BANK NAME", // column title that will be shown in table
      options: {
        filter: true,
        wordBreak: 'break-word',
        editComponent: ({ value, onChange }) => {
          return (
            <TextField
              onChange={e => onChange(e.target.value)}
              value={value}
              style={{ wordBreak: 'break-word' }}
              multiline
            />
          );
        }
        //   customHeadRender: ({index, ...column}) =>{
        //     return (
        //       <TableCell key={index} style={columnStyleWithWidth} >  
        //         <span style={{marginLeft:18}}>BANK NAME</span> 
        //       </TableCell>
        //     )
        //  }


      },
    },
    {
      name: "fname", // field name in the row object
      label: "ACCOUNT NUMBER", // column title that will be shown in table
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth1} >
              <span style={{ marginLeft: 18 }}>ACCOUNT NUMBER</span>
            </TableCell>
          )
        }
      },
    },
    {
      name: "name",
      label: "IBAN NUMBER",
      options: {
        filter: true,
      },
    },
    // {
    //   name: "require_date",
    //   label: "BANK ADDRESS",
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
      name: "status",
      label: "Default",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "right" }} className="pr-2" >
              <span style={{ marginLeft: 18 }}>Default</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div style={{ textAlign: "right" }} className="">
              {/* <Link to={`/quote/${tableMeta.rowData[5]}/reject`}>
              <Tooltip title="View More">
                <Icon color="primary">remove_red_eye</Icon>
           </Tooltip>
            </Link> */}
              {tableMeta.rowData[4] == "Yes" ? <Tooltip title="Default Bank"><Icon color="success" className="" style={{color:"green"}} onClick={e => changeStatus(tableMeta.rowData[5])}>toggle_on</Icon></Tooltip> : <Tooltip title="Default Bank"><Icon color="success" className="" style={{color:"red"}} onClick={e => changeStatus(tableMeta.rowData[5])}>toggle_off</Icon></Tooltip>}
              {/* <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon color="secondary">find_in_page</Icon>
            </IconButton>
          </Link> */}
            </div >

          )

        },
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "right" }} className="pr-2" >
              <span style={{ marginLeft: 18 }}>ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div style={{ textAlign: "right" }} className="">
              {/* <Link to={`/quote/${tableMeta.rowData[5]}/reject`}>
              <Tooltip title="View More">
                <Icon color="primary">remove_red_eye</Icon>
           </Tooltip>
            </Link> */}
              <Tooltip title="Delete"><Icon color="error" className="pr-2" onClick={e => deletebank(tableMeta.rowData[5])}>delete</Icon></Tooltip><Tooltip title="Edit"><Icon color="secondary" onClick={e => editbank(tableMeta.rowData[5])}>edit</Icon></Tooltip>
              {/* <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon color="secondary">find_in_page</Icon>
            </IconButton>
          </Link> */}
            </div >

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
          <div className="text-right">

            <Button onClick={e => setShouldOpenEditorDialog(true)} className="py-2" variant="outlined" color="primary" type="submit" aignItem="right">
              <Icon>add</Icon>
              <span className="pl-2 capitalize">ADD NEW</span>
            </Button>


          </div>
        </div>



        {/* <div className="mb-8">
            {BankList.map((item,i)=>(
              <>
              <div>
              <Button variant="text" className="w-full justify-start px-1 ml-0">
              <span className="ml-2" color="primary">{++i}</span>
                <span className="ml-8">Bank Name: <strong>{item.name}</strong></span>
              </Button>
              <Button variant="text" className="w-full justify-start px-5">
                <span className="ml-8">Account Number: <strong>{item.ac_no}</strong></span>
              </Button>
              <Button variant="text" className="w-full justify-start px-5">
                <span className="ml-8">IBAN Number: <strong>{item.iban_no}</strong></span>
              </Button>
              <Button variant="text" className="w-full justify-start px-5">
                <span className="ml-8">Bank Address: <strong>{item.bank_address}</strong></span>
              </Button>
              <span className="ml-12"><Tooltip title="Delete"><Icon color="error" onClick={e=>deletebank(item.id)}>delete</Icon></Tooltip><Tooltip title="Edit"><Icon color="secondary" onClick={e=>editbank(item.id)}>edit</Icon></Tooltip></span>
              <Divider></Divider>
              </div>
              </>
              ))}
              
              <div className="pb-6 pt-3">
              <Button  onClick={e=>setShouldOpenEditorDialog(true)} className="mr-4 py-2" style={{position:'absolute',right:50}} variant="outlined" color="primary" type="submit" aignItem="right">
          <Icon>add</Icon>
          <span className="pl-2 capitalize">Add New</span>
        </Button>
        </div> */}
        <MaterialTable
          // title={"DIVISION"}
          data={
            BankList.map((item, index) => {
              // console.log(item)

              return [

                ++index,
                item.name,
                item.ac_no,
                item.iban_no,
                
                // item.bank_address,
                item.status,
                item.id,
                
              ]

            })
          }
          columns={columns}
          options={{
            filterType: "textField",
            responsive: "simple",
            selectableRows: "none",
            rowsPerPageOptions: [10, 20, 40, 80, 100],
          }}
        />
        {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
            bid={bid}


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



  );
}


export default Bank_Account;
