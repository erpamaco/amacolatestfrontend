import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  Divider,
  TextField,
  TableCell,
  IconButton,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import { getUserById, updateUser, addNewUser } from "../CRUD/TableService";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import Swal from "sweetalert2";
import url, {getpaymentaccount,getpaymentaccountcategory}from "../../../../views/invoice/InvoiceService"

const MemberEditorDialog = ({ uid, open, handleClose,accounttype,catid,catname,setcat}) => {
  
  const [name, setname] = useState('');
  const [cdescription, setcdescription] = useState('');
  const [catList, setcatList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
 
  
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");



  const handleFormSubmit = () => {
    
    const frmdetails = {

      name: name,
      parent_id:catid

    }
    
   

    url.post('account-categories ', frmdetails)
      .then(function (response) {
        if(response.data)
        {
        Swal.fire({
          title: 'error',
          type: 'error',
          icon:'error',
          text: 'Data Already Exists.',
        });
      }
      else
      {
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon:'success',
          text: 'Data saved successfully.',
        });
      }
        getpaymentaccount().then(({ data }) => {
          accounttype(data)
  
        });
        getpaymentaccountcategory().then(({ data }) => {
          setcat(data)
  
        });
        handleClose()
      })
      .catch(function (error) {
       
      })
    setcdescription('')
    setname('')
    

  };
  const removeData = (id) => {
    Swal.fire({
      text: 'Are you sure you want to delete this Subcategory?',
      // text: 'Any products, services, or categories in it will be uncategorised.',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        url.get(`accountcategories/${id}`)
          .then(res => {
            getrow()
            getpaymentaccountcategory().then(({ data }) => {
              setcat(data)
      
            });

            Swal.fire(
              'Deleted!',
              'Category or Subcategory has been deleted.',
              'success'
            )

          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass:{
            zIndex: 1000
          },
           title:'Cancelled'
          // 'Cancelled',
          // 'Your imaginary file is safe :)',
          // 'error',
          
        })
      }
    })

  }

  useEffect(() => {
    
    
    
  })
  function getrow(e) {
    if(catid)
    {
    url.get(`account-subcategories/${catid}`)
      .then(function (response) {
        var temp=response.data.map((item)=>{
          item['status']=false;
          return item;
        })
      
        setcatList(temp)
        setcat(temp)

      })
    }
    else
    {
    url.get(`account-subcategories/0`)
      .then(function (response) {
        var temp=response.data.map((item)=>{
          item['status']=false;
          return item;
        })
        setcatList(temp)

    })
    }
    
  }
  const onchangestatus=(e,id)=>{
    var temp=catList.filter((item)=>{
      if(item.id==id)
      {
      item['name']=e.target.value;
      item['status']=true;
      }
      return item;
    })
    console.log(temp)
    setcatList(temp)
  }
  const onchangeedit=(id)=>{
    var temp=catList.filter((item)=>{
      if(item.id==id)
      {
      
      item['status']=true;
      }
      return item;
    })
   
    setcatList(temp)
  }
  const editData=(name,id)=>{
    const data={
      name:name
    }
    url.put(`accountEdit/${id}`,data).then((response)=>{
      var temp=catList.filter((item)=>{
        if(item.id==id)
        {
        
        item['status']=false;
        }
        return item;
      })
     
      setcatList(temp)
    })
  }
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        filter:true,
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} width={50}>  
              <span style={{marginLeft:15}}>S.No.</span> 
            </TableCell>
          )
       },
      },
    },
    {
    name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} width={350}>  
              <span style={{marginLeft:15}}>Name</span> 
            </TableCell>
          )
       },
       customBodyRender: (value, tableMeta, updateValue) => {
           
        return (
          
          <div>
          
          {!tableMeta.rowData[3]&&tableMeta.rowData[1]}
        {tableMeta.rowData[3]&&(<TextField value={tableMeta.rowData[1]} onChange={(e)=>onchangestatus(e,tableMeta.rowData[2])}></TextField>)}
         
       </div>
     
        
        
        )
        
    },
      },
    },
    
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
         
          return (
            <>
            {!tableMeta.rowData[3]&&(<IconButton onClick={() => onchangeedit(tableMeta.rowData[2])}
            
            >
              
              <Icon color="secondary">edit</Icon>
            </IconButton>)}
            {tableMeta.rowData[3]&&(<IconButton onClick={(e) => editData(tableMeta.rowData[1],tableMeta.rowData[2])
            }
            >
              
              <Icon color="primary">done</Icon>
            </IconButton>)}
          
            <IconButton  onClick={() => removeData(tableMeta.rowData[2])
            } 
            >
              
              <Icon color="error">delete</Icon>
            </IconButton>
            </>


          )

        },
      },
    },
    {
      name:'staus',
     
      options:{
        display:'none',
      }
    }
  ];


  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{zIndex:1000}} fullWidth={fullWidth}
    maxWidth={maxWidth}>
      <div className="p-6"  >
        <h4 className="mb-5">{!catid && ("Category")} {catid &&(' Subcategory For')} {catname }</h4>
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Enter Account Name"
                
                variant="outlined"
                onChange={e => setname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="name"
                value={name}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              
            </Grid>

            
          </Grid>

          <div className="flex  items-center">
            <Button variant="outlined" className="py-2 mr-4" color="primary" type="submit">
              <Icon>save</Icon>SAVE
            </Button>
            
            <Button
              variant="outlined"
              className="py-2 mr-4"
              color="secondary"
              onClick={() => handleClose()}
            >
              <Icon>cancel</Icon>CANCEL
            </Button>
            
            <Button
            
              variant="outlined"
              color="primary"
              className="py-2 mr-4"
              onClick={() => getrow()}
            >
              <Icon>remove_red_eye</Icon>VIEW
            </Button>
            
          </div>
        </ValidatorForm>
        <Divider className="mb-2" />
        {isAlive && (
          <MUIDataTable
            // title={catid &&("Subcategory List")|| (Category  Li)}
            columns={columns}
            data={
                 
              catList.map((item, index) => {
                
               
                  return [
      
                    ++index,
                    item.name,
                    item.id,
                    item.status

                    
                  ]
                
              })
              
            }
            options={{
              filterType: "textField",
              responsive: "simple",
              selectableRows: "none", // set checkbox for each row
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
          />
        )}
      </div>
    </Dialog>
    
  );
};

export default MemberEditorDialog;
