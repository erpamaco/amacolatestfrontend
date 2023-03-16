import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import { Icon,MenuItem } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import url, {getcategories}from "../../invoice/InvoiceService"
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
const ProductPrice = ({ uid, open, handleClose,catid,catList,productprice,partyids }) => {
  const [state, setState] = useState({
    name: "abc",
    email: "",
    phone: "",
    balance: "",
    age: "",
    company: "",
    address: "",
    isActive: false,
    isAlive: true,
  });
  const [cname, setcname] = useState('');
  const [cprice, setcprice] = useState('');
  const [userList, setUserList] = useState([]);
  const [customerList, setcustomerList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [isAlivecat, setIsAlivecat] = useState('');
  
  
  
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");



  const handleFormSubmit = () => {
       
       
       
        const frmdetails = {

          product_id:catid, 
          party_id: cname,
          price: parseFloat(cprice).toFixed(2),
          
    
    
        }
      
        url.post('product-price', frmdetails)
          .then(function (response) {
            getcategories()
            Swal.fire({
              title: 'Success',
              type: 'success',
              icon:'success',
              text: 'Data saved successfully.',
            })
            .then((result) => {
          
            url.get("products/" + catid).then(({ data }) => {
              productprice(data.prices);
             
              
             
            });
          })
          handleClose()
            
          setcname('');
          setcprice('')
           
         
       
    
    
        
  
     })

    
  
  
  };
  const removeData = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'Any products, services will be uncategorised.',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        url.delete(`categories/${id}`)
          .then(res => {
            
            getcategories().then(({ data }) => {
              catList(data)
      
              });
          })
          handleClose()
          Swal.fire({
            customClass:{
              zIndex: 1000
            },
             text:'Category Deleted Successfully',
             icon: "success"
            // 'Cancelled',
            // 'Your imaginary file is safe :)',
            // 'error',
            
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
   setcname(partyids)
    url.get("parties-except/"+catid).then(({ data }) => {
        
        setcustomerList(data)
    })
   
  },[])
  
  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    {
      name: "price",
      label: "price",
      options: {
        filter: true,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {

  
          return (
            <IconButton onClick={() => removeData(tableMeta.rowData[2])
            }
            >
              <Icon color="error">delete</Icon>
            </IconButton>



          )

        },
      },
    },
  ];


  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{zIndex:1000}} fullWidth={fullWidth}
    maxWidth={maxWidth}>
      <div className="p-6"  >
        
       
         <h4 className="mb-5">Product Price</h4>   
    
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
             {!cname?<TextValidator
                className="w-full mb-4"
                label="Vendor"
                
                variant="outlined"
                onChange={e => setcname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="cname"
                value={cname}
                errorMessages={["This field is required"]}
                select
                
              >
               {customerList.map((item, ind) => (
                
                <MenuItem value={item.id} key={item}>
                  {item.firm_name}
                </MenuItem>
              ))}
                  
            </TextValidator>:<TextValidator
                className="w-full mb-4"
                label="Vendor"
                
                variant="outlined"
                onChange={e => setcname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="cname"
                value={cname}
                errorMessages={["This field is required"]}
                select
                
              >
               {customerList.filter(x=>x.id===cname).map((item, ind) => (
                
                <MenuItem value={item.id} key={item}>
                  {item.firm_name}
                </MenuItem>
              ))}
                  
            </TextValidator>}
            
              {isAlivecat &&(
            
            <span><Icon className="mr-2" fontSize="small" color="error">
              info
            </Icon>
            <small style={{color:"red"}}>
              Category already Exists
            </small>
            </span>
         
              )}
             
            </Grid>
            

            <Grid item sm={6} xs={12}>
            <CurrencyTextField
                className="w-full mb-4"
                label="Price"
			          variant="outlined"
			          value={cprice}
                fullWidth
			          currencySymbol="SAR"
			          onChange={(event, value)=> setcprice(value)}
              />
              
            </Grid>
          </Grid>
          
          <div className="flex  items-center">
            <Button variant="outlined"  className="mr-4 py-2"color="primary" type="submit">
              <Icon>save</Icon>Save
            </Button>
            <Button
              variant="outlined"
              className="mr-4 py-2"
              color="secondary"
              onClick={() => handleClose()}
            >
              <Icon>cancel</Icon>Cancel
            </Button>
            {/* <div className="flex justify-between items-center">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleClose()}
            >
              <Icon>cancel</Icon>Cancel
            </Button>
            
            
            </div> */}
          </div>
          
        </ValidatorForm>
       
        {!isAlive &&
          <MUIDataTable
            title={"Category"}
            columns={columns}
            data={userList}
            options={{
              filterType: "textField",
              responsive: "simple",
              selectableRows: "none", // set checkbox for each row
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
          />
          }
     
      </div>
    </Dialog>
    
  );
};

export default ProductPrice;
