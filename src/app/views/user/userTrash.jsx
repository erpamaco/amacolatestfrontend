import React, { useState, useEffect } from "react";
import { Breadcrumb,ConfirmationDialog } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FormDialog from "./useradd"
import MemberEditorDialog from "./useradd"
import Tooltip from '@material-ui/core/Tooltip';
import url from "../invoice/InvoiceService"
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
  overflowWrap:"break-word",
  hyphens:"auto",
  textAlign:"center"
}
const columnStyleWithWidthSno = {
  top: "0px",
  left: "0px",
  zIndex: "50",
  position: "sticky",
  backgroundColor: "#fff",
  width: "50px",
  textAlign:"center"
}

const UserTrash = () => {
    const [isAlive, setIsAlive] = useState(true);
    const [userList, setUserList] = useState([]);
    const [userid, setuserid] = useState(null);

    useEffect(() => {
        url.get("users").then(({ data }) => {
            // console.log(data)
            setUserList(data.filter(obj=>obj.status==="false"));
           
        });
        
        return () => setIsAlive(false);
    }, [isAlive]);
    
    const [count, setCount] = useState(0);
  
    function getrow(e) {
      url.get("users").then(({ data }) => {
         setUserList(data);

    });
    // return () => setIsAlive(false);
    }
  
   
  const [click, setClick] = useState([]); 
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const handleDialogClose = () => {
    setuserid()
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
  const edituser = (id) => {
      setuserid(id)
      setShouldOpenEditorDialog(true)
      

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
        url.delete(`users/${id}`)
    .then(res => {
        
       setIsAlive(false)
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
    customHeadRender: ({index, ...column}) =>{
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
      
      customHeadRender: ({index, ...column}) =>{
        return (
          <TableCell key={index} style={columnStyleWithWidth}>  
            <span >NAME</span>
          </TableCell>
        )
     },
     setCellProps: ()=>({
       align:"center"
     })
  },
},
{
  name: "address",
  label: "",
  options: {
    customHeadRender: ({index, ...column}) =>{
      return (
        <TableCell key={index} style={{textAlign:"center"}} >  
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
    customHeadRender: ({index, ...column}) =>{
      return (
        <TableCell key={index} style={{textAlign:"center",wordBreak: "break-word",
        wordWrap: "break-word",width:350}}>  
          <span style={{paddingLeft:15}}>DESIGNATION</span>
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
      customHeadRender: ({index, ...column}) =>{
        return (
          <TableCell key={index} style={{textAlign:"center"}}>  
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
      customHeadRender: ({index, ...column}) =>{
        return (
          <TableCell key={index} style={{textAlign:"center"}}>  
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
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{textAlign:"right"}} className="pr-8">  
              <span style={{paddingLeft:15}}>ACTION</span>
            </TableCell>
          )
       },
        customBodyRender: (value, tableMeta, updateValue) => {
           
            return (
              <div style={{textAlign:"right"}} className="pr-8" >
              {/* <Link to={"/pages/view-customer?id=" +tableMeta.rowData[5] }> */}
            
                <Tooltip title="Delete User">
                <Icon color="error" onClick={e=>removeData(tableMeta.rowData[6])}>delete</Icon>
                </Tooltip>
                <Tooltip title="Edit User">
                <Icon color="secondary" onClick={e=>edituser(tableMeta.rowData[6])}>edit</Icon>
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
      <div  className="mb-sm-30">
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
            userList={setUserList}
          />
        )}
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            text="Are you sure to delete?"
          />
        )}
      
       
        
          {/* </div> */}
          </div>
      <MUIDataTable
                title={"USERS"}
                data={
                  userList.map((item, index) => {
                   
                   
                      return [
          
                        ++index,
                        item.name,
                        item.email,
                        item.designation,
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
  ); } 
   

export default UserTrash;
