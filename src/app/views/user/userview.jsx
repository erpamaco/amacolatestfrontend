import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FormDialog from "./useradd"
import MemberEditorDialog from "./useradd"
import PermissionDialog from "./Permission.jsx"
import LogDialog from "./LogDialog.jsx"
import Tooltip from '@material-ui/core/Tooltip';
import url from "../invoice/InvoiceService";

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
const columnStyleWithWidth = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "200px",
  wordBreak: "break-word",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
  textAlign: "center"
}
const columnStyleWithWidthSno = {
  top: "0px",
  left: "0px",
  zIndex: "50",
  position: "sticky",
  backgroundColor: "#fff",
  width: "50px",
  textAlign: "center"
}

const SimpleMuiTable = ({ logData, alive, setAlive }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [userid, setuserid] = useState(null);
  const [log, setLogData] = useState([])

  useEffect(() => {
    url.get("users").then(({ data }) => {
      setUserList(data?.filter(obj => obj?.status === "true"));

    });
    setLogData(logData)
    setIsAlive(false);
    setAlive(false)

  }, [isAlive, alive]);

  const [count, setCount] = useState(0);

  function getrow(e) {
    url.get("users").then(({ data }) => {
      setUserList(data);
      setIsAlive(false);
    });
    // return () => setIsAlive(false);
  }


  const [click, setClick] = useState([]);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [shouldOpenPermissionDialog, setShouldOpenPermissionDialog] = useState(false);
  const [shouldOpenLogDialog, setShouldOpenLogDialog] = useState(false);
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const handleDialogClose = () => {
    // console.log('dd')
    setuserid(null)
    setShouldOpenEditorDialog(false);
    setShouldOpenPermissionDialog(false);
    setShouldOpenLogDialog(false);
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
  const edituser = (id) => {
    setuserid(id)
    setShouldOpenEditorDialog(true)
  }

  const permissionModel = (id) => {
    setuserid(id)
    setShouldOpenPermissionDialog(true)
  }
  const logModel = (id) => {
    setuserid(id)
    setShouldOpenLogDialog(true)
  }
  const removeData = (id) => {

    Swal.fire({
      //   title: 'Are you sure?',
      text: 'Are you sure want to delete the user? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.get(`Userstatus/${id}`)
          .then(res => {

            setIsAlive(true)
            Swal.fire(
              'Deleted!',
              'User  has been deleted.',
              'success'
            )

          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'error'
        )
      }
    })

  }

  const columns = [
    {
      name: "id",
      label: "S.No.",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidthSno}>
              <span align="center">S.NO.</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",

        })
      }
    },
    {
      name: "firm_name",
      label: "Company Name",
      options: {

        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth}>
              <span >NAME</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "address",
      label: "",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span>EMAIL</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",

        })
      },
    },

    {
      name: "address",
      label: "",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{
              textAlign: "center", wordBreak: "break-word",
              wordWrap: "break-word", width: 350
            }}>
              <span style={{ paddingLeft: 15 }}>DESIGNATION</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",


        })
      },
    },

    {
      name: "vat_no",
      label: "ROLE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span >ROLE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",

        })
      },
    },
    {
      name: "contact",
      label: "CONTACT",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span >CONTACT</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",

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
            <TableCell key={index} style={{ textAlign: "right" }} className="pr-8">
              <span style={{ paddingLeft: 15 }}>ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div style={{ textAlign: "right" }} className="pr-2" >
              {/* <Link to={"/pages/view-customer?id=" +tableMeta.rowData[5] }> */}

              <Tooltip title="Delete User">
                <Icon color="error" onClick={e => removeData(tableMeta.rowData[6])}>delete</Icon>
              </Tooltip>
              <Tooltip title="Edit User">
                <Icon color="secondary" onClick={e => edituser(tableMeta.rowData[6])}>edit</Icon>
              </Tooltip>
              <Tooltip title="Logs">
                <Icon color="primary" onClick={e => logModel(tableMeta.rowData[6])}>library_books</Icon>
              </Tooltip>
              <Tooltip title="Permission">
                <Icon color="primary" onClick={e => permissionModel(tableMeta.rowData[6])}>gpp_good</Icon>
              </Tooltip>

              {/* </Link> */}
            </div>


          )

        },
        setCellProps: () => ({
          align: "right",

        })
      },
    },
  ];



  return (
    <div>
      <div className="m-sm-30">
        <div className="mb-sm-30">
          {/* <div className="flex flex-wrap justify-between mb-6"> */}
          {/* <Breadcrumb
            routeSegments={[
              // { name: "", path: "./Addparty" },
              { name: "USERS" }
            ]}
          /> */}
          {shouldOpenEditorDialog && (
            <MemberEditorDialog
              handleClose={handleDialogClose}
              open={shouldOpenEditorDialog}
              userid={userid}
              setIsAlive2={setIsAlive}
              userList={setUserList}
            />
          )}
          {shouldOpenPermissionDialog && (
            <PermissionDialog
              handleClose={handleDialogClose}
              open={shouldOpenPermissionDialog}
              userid={userid}
            />
          )}
          {shouldOpenLogDialog && (
            <LogDialog
              handleClose={handleDialogClose}
              open={shouldOpenLogDialog}
              userid={userid}
              logData={logData}
            />
          )}
          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={handleDialogClose}
              text="Are you sure to delete?"
            />
          )}


          {/* <div className="text-right">
           
                <Button
            className="py-2"
            color="primary"
            variant="outlined"
            onClick={e=>setShouldOpenEditorDialog(true)}
          >
          <Icon>add</Icon>
          ADD NEW
          </Button>
          
          
          </div> */}
        </div>
        {/* </div> */}
        <MUIDataTable
          title={"USERS"}
          data={
            userList.map((item, index) => {


              return [

                ++index,
                item.name,
                item.email,
                item.designationsN,
                item.role_name,
                item.contact,
                item.id,
              ]

            })
          }
          columns={columns}
          options={{
            filterType: "textField",
            responsive: "simple",
            selectableRows: "none",
            elevation: 0,
            rowsPerPageOptions: [10, 20, 40, 80, 100],
          }}
        />
      </div>
    </div>
  );
}


export default SimpleMuiTable;
