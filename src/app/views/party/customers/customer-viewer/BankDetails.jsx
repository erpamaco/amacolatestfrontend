import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import {
  Button,
  Card,
  Divider,
  Icon,
  Table,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
  TableRow,
  Tooltip
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "matx";
import url, { getparties, GDIV } from "../../../invoice/InvoiceService"
import MemberEditorDialog from "../../Addbank";
import FormDialog from "../../Addbank";
import history from "history.js";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const BankDetails = ({ ids }) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get('id'));

  var i = 1;
  const [customercontact, setcustomercontact] = useState([]);
  const [userList, setUserList] = useState([]);
  const [bankdetails, setbankdetails] = useState([]);
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [contact1, setcontact1] = useState('');
  const [contact2, setcontact2] = useState('');

  const [designation, setdesignation] = useState('');
  const [status, setstatus] = useState('');
  const [isAlive, setisAlive] = useState(false);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const formData = new FormData();
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  const setcontacts = (id) => {
    setstatus(id)
    setShouldOpenEditorDialog(id);

  };

  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);

  const handleDialogClose = () => {
    setisAlive(false)
    setstatus('');
    setShouldOpenEditorDialog(false);
    getparties()

  };
  function handleClose() {
    setAnchorEl(null);
  }

  const handleDeleteUser = (user) => {

    setShouldOpenConfirmationDialog(true);

  };

  useEffect(() => {


    url.get("parties/" + ids).then(({ data }) => {
      setcustomercontact(data[0].contacts);
      setbankdetails(data[0].bank)
      // console.log(data)
    }
    );
    return setisAlive(true)


  }, [isAlive]);

  const DeleteRow = (data, status) => {

    var res = bankdetails.filter((o1, ind) => data.data.some((o2, i) => ind == o2.index))
    Swal.fire({
      text: 'Are You Sure You Want To Delete?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        formData.append('data', JSON.stringify(res))
        formData.append('status', 'bank')
        url.post(`partyDelete_all`, formData).then((response) => {
          Swal.fire(
            'Deleted!',
            'Bank Details Has Been Deleted.',
            'success'
          )
          setisAlive(false)




        })





      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire({
        //   customClass: {
        //     zIndex: 1000
        //   },
        //   title: 'Cancelled',
        //   icon: 'error'

        // })
        Swal.fire(
          'Cancelled',
          'Your Bank Details Are Safe :)',
          'error'
        )
      }
    })

  }

  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Will Not Be Able To Recover This Bank Details!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`party-bank/${id}`)
          .then(res => {

            Swal.fire(
              'Deleted!',
              'Your bankdetails has been deleted.',
              'success'
            )
            setisAlive(false)

          })




        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Bank Details Are safe :)',
          'error'
        )
      }
    })

  }
  const getData = () => {
    url.get("parties/" + ids).then(({ data }) => {
      setcustomercontact(data[0].contacts);

    });
  }
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={50} style={{ textAlign: "center" }}>
              <span style={{ marginLeft: 15 }}>S.NO.</span>
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
      label: "BANK NAME", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span style={{ marginLeft: 15 }}>BANK NAME</span>
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
      label: "ACCOUNT NUMBER", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span style={{ marginLeft: 15 }}>ACCOUNT NUMBER</span>
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
      label: "IBAN NUMBER", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span style={{ marginLeft: 15 }}>IBAN NUMBER</span>
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
      label: "BANK ADDRESS", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span style={{ marginLeft: 15 }}>BANK ADDRESS</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} className="pr-10" style={{ textAlign: 'right' }}>
              <span style={{ marginLeft: 15 }}>ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div className="pr-8" style={{ textAlign: 'right' }}>
              <Tooltip title="Edit Bank details">
                <Icon color="secondary" onClick={() => {
                  setcontacts(tableMeta.rowData[5]);
                }}>edit</Icon>

              </Tooltip>


              <Tooltip title="Delete Bank details">
                <Icon color="error" onClick={() => removeData(tableMeta.rowData[5])}>delete</Icon>
              </Tooltip>
            </div>

          )

        },
      },
    },
  ]
  return (
    <div>

      <Card className="mt-6" elevation={3}>
        <div className="flex flex-wrap justify-between mb-0">
          <h5 className="p-4 pt-8">BANK DETAILS</h5>
          <div className="text-right">

            <Button
              className="py-2"
              style={{ marginTop: "10px", marginRight: 10 }}
              color="primary"
              variant="outlined"
              onClick={() => {
                setShouldOpenEditorDialog(true);
              }}
            >
              <Icon>add</Icon>
              ADD NEW
            </Button>

          </div>
        </div>

        {/* <Table>
      <TableHead>
      <TableRow>
     
        
          <TableCell className="px-0" align="center">S.No.</TableCell>
            <TableCell className="px-0" align="center">Bank Name</TableCell>
            <TableCell className="px-0" >Account Number</TableCell>
            <TableCell className="px-0">IBAN Number</TableCell>
            <TableCell className="px-0">Bank Address</TableCell>
            <TableCell className="px-0">Action</TableCell>
        
        </TableRow>
        </TableHead>
        <TableBody>
        {bankdetails.map((item, index) => {
          
          return(
              <TableRow key={index}>
              <TableCell className="pl-0" align="center">{++index}</TableCell>
              <TableCell className="pl-0" align="center">{item.bank_name}</TableCell>
            
            
              <TableCell className="pl-0">{item.account_no}</TableCell>
           
    
              <TableCell className="pl-0">{item.iban_no}</TableCell>
            
             
              <TableCell className="pl-0">{item.bank_address}</TableCell>
              <TableCell className="pl-0"><Tooltip title="Edit Bank details">
                    <Icon color="secondary" onClick={() => {
                    setcontacts(item.id);
                  }}>edit</Icon>
                    
                    </Tooltip>
         
                 
                  <Tooltip title="Delete Bank details">
                    <Icon color="error" onClick={() => removeData(item.id)}>delete</Icon>
                  </Tooltip>
               </TableCell>
            </TableRow>
          )
        })
      }
            </TableBody>
            </Table> */}
        <Divider />
        <MUIDataTable

          data={
            bankdetails.map((item, index) => {


              return [

                ++index,
                item.bank_name?.toLowerCase()
                  .split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' '),
                item.account_no,
                item.iban_no,
                item.bank_address?.toLowerCase()
                  .split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' '),
                item.id,
              ]

            })
          }
          columns={columns}

          options={{
            filterType: "textField",
            responsive: "simple",
            selectableRows: "none",
            filter: true,
            selectableRows: 'multiple',
            selectableRowsOnClick: true,
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
              <div>
                <Tooltip title={"Delete"} cursor='pointer' className="mr-6">
                  <Icon onClick={() => DeleteRow(selectedRows)} color="error">delete</Icon>
                </Tooltip>


              </div>

            ),

            rowsPerPageOptions: [10, 20, 40, 80, 100],
          }}
        />
      </Card>
      <div>
        {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            contactid={status}
            partyid={ids}
            open={shouldOpenEditorDialog}
            customercontact={setcustomercontact}

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
};

const customerInfo = [
  {
    title: "Credit Card",
    value: "**** **** **** **** 4242",
  },
  {
    title: "Paid",
    value: "5 ($500.00)",
  },
  {
    title: "Draft",
    value: "2 ($150.00)",
  },
  {
    title: "Unpaid/Due",
    value: "1 ($355.00)",
  },
  {
    title: "Refunded",
    value: "0 ($0.00)",
  },
  {
    title: "Gross Income",
    value: "$2,100.00",
  },
];

export default BankDetails;
