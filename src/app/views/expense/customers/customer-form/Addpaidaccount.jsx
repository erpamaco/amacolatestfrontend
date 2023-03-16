import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import { Icon,MenuItem,FormControl,FormGroup,InputLabel,Select } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import url, {getmanufacturer,capitalize_arr,getdivisions}from "../../../invoice/InvoiceService"
const option =[
  {
      value:'Division',
      name:'division'
  },
  {
    value:'Personal',
    name:'personal'
},

]

const Addpaidaccount = ({ uid, open, handleClose, paymentaccount}) => {
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
  const [type, settype] = useState('');
  const [balance, setbalance] = useState(0);
  const [cdescription, setcdescription] = useState('');
  const [userList, setUserList] = useState([]);
  const [paiddivision_account, setpaiddivision_account] = useState([]);
  const [div_id, setdiv_id] = useState();
  const [isAlive, setIsAlive] = useState(true);
 

 
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");



  const handleFormSubmit = () => {
    
    const frmdetails = {

      name: cname?capitalize_arr(cname):'',
      type: type,
      div_id:div_id,
      balance: balance,
      


    }
    // setcdescription('')
    // setcname('')
   
   
    url.post('payment-account', frmdetails)
      .then(function (response) {
        getmanufacturer()
        if(response.data=="error")
        {
          Swal.fire({
            icon: 'error',
            type: 'error',
            text: 'Data already exits.',
          });
        }else{
          Swal.fire({
            icon: 'success',
            type: 'success',
            text: 'Data saved successfully.',
          });
        }
        

       url.get("payment-account").then(({ data }) => {
          
          paymentaccount(data);
          
  
        });
      })
        
       
       
        handleClose()

      
    setcdescription('')
    setcname('')
    

  };
  const removeData = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this manufacturer?',
      text: '.',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        url.delete(`manufacturer/${id}`)
          .then(res => {
            getrow(res)
          
            Swal.fire({
              customClass:{
                zIndex: 1000
              },
               title:'Deleted Successfully',
               icon:'success'
              // 'Cancelled',
              // 'Your imaginary file is safe :)',
              // 'error',
              
            })
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
    url.get('payment-account').then(({ data }) => {
      setUserList(data);
     
    

   


    });
    getdivisions().then(({ data }) => {
      // console.log(data)
      setpaiddivision_account(data);
    });
   
  },[])
  function getrow(e) {
    setIsAlive(false)
    url.get("payment-account").then(({ data }) => {
      
      paymentaccount(data);

    });
    // return () => setIsAlive(true);
  }
  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
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
            <IconButton onClick={() => removeData(tableMeta.rowData[1])
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
        <h4 className="mb-5">ADD PAYMENT ACCOUNT</h4>
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          {/* <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}> */}
              <TextValidator
                className="w-full mb-4"
                label="Name"
                autoComplete="none"
                variant="outlined"
                onChange={e => setcname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="cname"
                size="small"
                autoComplete="none"
                value={cname}
                validators={["required"]}
                inputProps={{style: {textTransform: 'capitalize'}}}
                errorMessages={["this field is required"]}
              />
              <FormGroup>
         
         <FormControl variant="outlined" size="small"
         className="mb-4">
<InputLabel htmlFor="outlined-age-native-simple">Paid Division</InputLabel>
<Select
native
value={type}
// onChange={handleChange}
onChange={e => settype(e.target.value)}
size="small"
label="Payment Type"
inputProps={{
  name: 'Bank',
  id: 'outlined-age-native-simple',
}}
>
              {/* <MenuItem  onClick={()=>adddiv()}>
            <Icon >
                add
            </Icon>ADD NEW
            </MenuItem>
              {division_account.map((items, index) => (
                (<MenuItem id={items.id} onClick={(e) => paidivisionation(items.id,items.name)}>{items.name} --{items.opening_bal}</MenuItem>)
              ))} */}
              <option aria-label="None" value="" />
               {option.map((item, ind) => (
<option value={item.id} >{item.name}</option>
))}
              </Select>
              </FormControl>
              </FormGroup>
              {type=="division"&&<FormGroup>
         
         <FormControl variant="outlined" size="small"
         className="mb-4">
<InputLabel htmlFor="outlined-age-native-simple">Paid Division</InputLabel>
<Select
native
value={div_id}
// onChange={handleChange}
onChange={e => setdiv_id(e.target.value)}
size="small"
label="Paid Division"
inputProps={{
  name: 'Bank',
  id: 'outlined-age-native-simple',
}}
>
              {/* <MenuItem  onClick={()=>adddiv()}>
            <Icon >
                add
            </Icon>ADD NEW
            </MenuItem>
              {division_account.map((items, index) => (
                (<MenuItem id={items.id} onClick={(e) => paidivisionation(items.id,items.name)}>{items.name} --{items.opening_bal}</MenuItem>)
              ))} */}
              <option aria-label="None" value="" />
               {paiddivision_account.map((item, ind) => (
<option value={item.id} >{item.name}</option>
))}
              </Select>
              </FormControl>
              </FormGroup>}
               <CurrencyTextField
                    className="mb-4 w-full"
                    label="Opening Balance"
                    name="Amount"
                    size="small"
                    variant="outlined"
                    value={balance}
                    currencySymbol="SAR"
                    autoComplete="none"
                    required
                    onChange={(event, value) => setbalance(value)}
                  />

              {/* <TextValidator
                className="w-full mb-4"
                label="Phone"
                onChange={handleChange}
                type="text"
                name="phone"
                value={setState.phone}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}

              {/* <TextValidator
                className="w-full mb-4"
                label="Balance"
                onChange={handleChange}
                type="number"
                name="balance"
                value={setState.balance}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}
            {/* </Grid>

           
          </Grid> */}

          {/* <div className="flex justify-between items-center"> */}
            <Button variant="outlined" className="mr-4 py-2" color="primary" type="submit">
              <Icon>save</Icon>SAVE
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              className="mr-4 py-2"
              onClick={() => handleClose()}
            >
             <Icon>cancel</Icon> CANCEL
            </Button>
            
            {/* <Button
            
              variant="outlined"
              color="primary"
              className="py-2"
              onClick={() => getrow()}
            >
             <Icon>remove_red_eye</Icon> view
            </Button> */}
          
          {/* </div> */}
        </ValidatorForm>
        <Divider className="mb-2" />
        {!isAlive && (
          <MUIDataTable
            title={"PAYMENT ACCOUNT"}
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
        )}
      </div>
    </Dialog>
    
  );
};

export default Addpaidaccount;
