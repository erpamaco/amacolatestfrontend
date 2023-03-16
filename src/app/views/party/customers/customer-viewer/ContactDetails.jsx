import React, { useState, useEffect } from "react";
// import Axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import {
  Button,
  Card,
  Divider,
  Icon,
  // Table,
  // TableHead,
  // TableBody,
  TableCell,
  // IconButton,
  // TableRow,
  Tooltip,
  // capitalize
} from "@material-ui/core";
import { ConfirmationDialog } from "matx";
import url, { GDIV, getparties } from "../../../invoice/InvoiceService"
import MemberEditorDialog from "../../partycontact"
// import FormDialog from "../../partycontact"
// import history from "history.js";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";

const ContactDetails = ({ ids }) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get('id'));

  // var i = 1;
  const [customercontact, setcustomercontact] = useState([]);
  // const [userList, setUserList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [bankdetails, setbankdetails] = useState([]);
  // const [fname, setfname] = useState('');
  // const [lname, setlname] = useState('');
  // const [email, setemail] = useState('');
  // const [contact1, setcontact1] = useState('');
  // const [contact2, setcontact2] = useState('');

  // const [designation, setdesignation] = useState('');
  const [status, setstatus] = useState('');
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAlive, setisAlive] = React.useState(false);
  const formData = new FormData();
  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }
  const setcontacts = (id) => {
    handleClose()
    setstatus(id)
    setShouldOpenEditorDialog(id);

  };

  const [
    shouldOpenConfirmationDialog,
    // eslint-disable-next-line no-unused-vars
    setShouldOpenConfirmationDialog,
  ] = useState(false);

  const handleDialogClose = () => {
    setstatus('');
    setShouldOpenEditorDialog(false);
    getparties()

  };
  function handleClose() {
    setAnchorEl(null);
  }
  const DeleteRow = (data, status) => {

    var res = customercontact.filter((o1, ind) => data.data.some((o2, i) => ind == o2.index))
    Swal.fire({
      text: 'Are you sure you want to Delete?',
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
        formData.append('status', 'contact')
        url.post(`partyDelete_all`, formData).then((response) => {
          Swal.fire(
            'Deleted!',
            'Contact Details has been deleted.',
            'success'
          )
          setisAlive(false)




        })





      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Contact Details are safe :)',
          'error'
        )
      }
    })

  }

  // const handleDeleteUser = (user) => {

  //   setShouldOpenConfirmationDialog(true);

  // };

  useEffect(() => {

    url.get("parties/" + ids).then(({ data }) => {
      setcustomercontact(data[0].contacts);
      setbankdetails(data)


    });
    return setisAlive(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlive]);
  const removeData = (id) => {
    handleClose()

    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Will Not Be Able To Recover This Contact Details!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`contact/${id}`)
          .then(res => {

            Swal.fire(
              'Deleted!',
              'Your Contact Details has been deleted.',
              'success'
            )
            getData();

          })




        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
          Swal.fire(
            'Cancelled',
            'Your Contact Details are safe :)',
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
            <TableCell key={index} width={50} style={{ textAlign: "center" }} >
              <span style={{ marginLeft: 15 }} >S.NO.</span>
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
      label: "NAME", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span  >NAME</span>
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
      label: "DESIGNATION", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span >DESIGNATION</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    // {
    //   name: "id", // field name in the row object
    //   label: "ADDRESS", // column title that will be shown in table
    //   options: {

    //       filter: true,
    //   },
    // },
    {
      name: "id", // field name in the row object
      label: "CONTACT", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span >CONTACT</span>
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
      label: "EMAIL", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={300} style={{ textAlign: "center" }} >
              <span style={{ marginLeft: 15 }} >EMAIL</span>
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
            <TableCell key={index} style={{ textAlign: 'right' }} className="pr-10">
              <span style={{ marginLeft: 15 }}>ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div className="pr-8" style={{ textAlign: 'right' }}>
              <Tooltip title="Edit contact details">
                <Icon color="secondary" onClick={() => {
                  setcontacts(tableMeta.rowData[5]);
                }}>edit</Icon>

              </Tooltip>



              <Tooltip title="Delete contact details">
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
      <Card elevation={3}>
        <div className="flex flex-wrap justify-between mb-0">
          <h5 className="p-4 pt-8">CONTACT</h5>
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
        <Divider />
        {/* <Table >
        <TableHead>
          <TableRow>
            <TableCell className="pl-0" align="center">S.No.</TableCell>
            <TableCell className="px-0">Name</TableCell>
            <TableCell className="px-0" >Designation</TableCell>
            <TableCell className="px-0" colspan={2}>Address</TableCell>
            <TableCell className="px-0">Contact</TableCell>
            <TableCell className="px-0" colspan={2}>Email</TableCell>
           
            
            <TableCell className="px-4" align="center" >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customercontact.map((item, index) => {
            
            return (
              <TableRow key={index+1}>
                <TableCell className="pl-0" align="center">{i++}</TableCell>

                <TableCell className="pl-0" style={{wordBreak:'break-word'}}>{item.fname}</TableCell>
                <TableCell className="pl-0" style={{wordBreak:'break-word'}}>{item.designation}</TableCell>
                <TableCell className="pl-0" style={{wordBreak:'break-word'}}colspan={2}>{item.address}</TableCell>
                <TableCell className="pl-0" style={{wordBreak:'break-word'}}>{item.mobno}</TableCell>
                <TableCell className="pl-0" style={{wordBreak:'break-word'}}colspan={2}>{item.email}</TableCell>

                
              
                <TableCell className="pl-0" align="center">
               
                    <Tooltip title="Edit contact details">
                    <Icon color="secondary" onClick={() => {
                    setcontacts(item.id);
                  }}>edit</Icon>
                    
                    </Tooltip>
                    
                 
                 
                  <Tooltip title="Delete contact details">
                    <Icon color="error" onClick={() => removeData(item.id)}>delete</Icon>
                  </Tooltip>
               
                  
                 

                  
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
        <MUIDataTable

          data={
            customercontact?.filter(obj=>obj.delete==0)?.map((item, index) => {


              return [

                ++index,
                item.fname?.toLowerCase()
                  .split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' '),
                item.designation?.toLowerCase()
                  .split(' ')
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' '),
                // item.address,
                item?.mobno ? (item?.mcode ? '+'+item?.mcode+' ' : '' )+ item?.mobno : '',
                //  item.mobno ? item.mcode ? "+"+ item.mcode : '' +" "+item.mobno : '--',
                item.email,
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
      </Card>


    </div>
  );
};



export default ContactDetails;
