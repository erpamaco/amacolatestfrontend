import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { Link} from "react-router-dom";
import moment from "moment";

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
import { makeStyles } from "@material-ui/core/styles";

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
const BankDetails = ({ ids }) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get('id'));
  const classes = useStyles();

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


    url.get("invoice-party/" + ids).then(({ data }) => {
      console.log(data)
      setbankdetails(data?.sort(function (a, b) {
        var dateA = new Date(a?.issue_date),
          dateB = new Date(b?.issue_date);
        return dateB - dateA;
      }))
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
              <Link to={ "/newinvoice/" + tableMeta.rowData[7]}>
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
  ];
  return (
    <div>

      <Card className="mt-6" elevation={3}>
        <div className="flex flex-wrap justify-between mb-0">
          <h5 className="p-4 pt-8">INVOICE DETAILS</h5>
          {/* <div className="text-right">

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

          </div> */}
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
            bankdetails?.filter((obj) => obj.div_id == localStorage.getItem("division"))
            .map((item, index) => {
              
              return [
                ++index,
                item?.invoice_no,
                item?.po_number == "null" || item?.po_number == null
                  ? "--"
                  : item?.po_number,
                item?.party?.firm_name,
  
                moment(item?.issue_date).format("DD MMM YYYY"),
                isNaN(parseFloat(item?.grand_total))
                  ? 0.0
                  : parseFloat(item?.grand_total).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    }),
  
                item?.status,
                item?.id,
                item?.quotation_id ? "quote" : "invoice",
                item?.is_vat_filed,
                item?.invoice_status
                // moment(item.created_at).format('DD-MM-YYYY'),
                // (parseFloat(item.net_amount)).toFixed(2),
                // item.id
              ];
            })
          }
          columns={columns}

          options={{
            filterType: "textField",
            responsive: "simple",
            selectableRows: "none",
            filter: true,
            // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
            //   <div>
            //     <Tooltip title={"Delete"} cursor='pointer' className="mr-6">
            //       <Icon onClick={() => DeleteRow(selectedRows)} color="error">delete</Icon>
            //     </Tooltip>


            //   </div>

            // ),

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
