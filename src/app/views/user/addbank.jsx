import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  TextField
} from "@material-ui/core";
import { ValidatorForm, } from "react-material-ui-form-validator";

import { Icon } from "@material-ui/core";
import Swal from "sweetalert2";
import url,{capitalize_arr} from "../invoice/InvoiceService";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const MemberEditorDialog = ({ bid, open, handleClose,contactid,customercontact}) => {
 
  const [account_no, setaccount_no] = useState('');
  const [bank_address, setbank_address] = useState('');
  const [bank_name, setbank_name] = useState('');
  const [iban_no, setiban_no] = useState('');
  const [opening_bal, setopening_bal] = useState('');
  const [isAlive, setIsAlive] = useState(true);
  

  
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const resetform = () => {
    setbank_address('')
    setbank_name('')
    setiban_no('')
    setaccount_no('')
  
  };

 const handleFormSubmit = () => {

    if(bid)
    {
      const frmdetails = {
        iban_no:iban_no,
        name:bank_name?capitalize_arr(bank_name):"",
        bank_address:bank_address?capitalize_arr(bank_address):"",
        ac_no:account_no,
        
  
  
      }
     
      
      
      url.put("company-bank/"+bid, frmdetails)
        .then(function (response) {
         
        handleClose();
          Swal.fire({
            title: 'Success',
            type: 'success',
            icon:'success',
            text: 'Data Updated successfully.',
          })
          .then((result) => {
            
          })
          
        })
        .catch(function (error) {
         
        })
       
        

    }
    else
    {
    
      const frmdetails = {
          
           iban_no:iban_no,
           name:bank_name?capitalize_arr(bank_name):"",
           bank_address:bank_address?capitalize_arr(bank_address):"",
           ac_no:account_no,
            // balance:opening_bal,
      
          }
    
   
    url.post('company-bank',frmdetails)
      .then(function (response) {
        
          Swal.fire({
            title: 'Success',
            icon:'success',
            type: 'success',
            text: 'Data saved successfully.',
          })
        
       
        handleClose();
        
      })
      .catch(function (error) {
       
      })
 
    }
    

 };
  

  useEffect(() => {

    if(bid)
    {
      
      url.get("company-bank/"+bid).then(({ data }) => {
       setbank_address(data.bank_address)
       setbank_name(data.name)
       setiban_no(data.iban_no)
       setaccount_no(data.ac_no)

    });
    }
    
   return () => setIsAlive(false);
  },[isAlive])
    

  return (
    <Dialog onClose={handleClose} open={open}  style={{zIndex:1000}} maxWidth={maxWidth} fullWidth={fullWidth}>
      <div className="p-6">
        <h4 className="mb-5">BANK ACCOUNT DETAILS</h4>
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
        

        <TextField
                                className="mb-4 w-full"
                                label="Bank Account Number"
                                autoComplete="none"
                                onChange={e => setaccount_no(e.target.value)}
                                name="website"
                                type="text"
                                size="small"
                                variant="outlined"
                                value={account_no}
                                
                            />
                            <TextField
                                className="mb-4 w-full"
                                label="Bank Name"
                                autoComplete="none"
                                onChange={e => setbank_name(e.target.value)}
                                name="website"
                                type="text"
                                size="small"
                                variant="outlined"
                                value={bank_name}
                                inputProps={{style: {textTransform: 'capitalize'}}}
                                
                            />
                             
                           
                            
                            <TextField
                                className="mb-4 w-full"
                                label="IBAN Number"
                                autoComplete="none"
                                onChange={e => setiban_no(e.target.value)}
                                name="website"
                                type="text"
                                size="small"
                                variant="outlined"
                                value={iban_no}
                               />
                               <TextField
                                className="mb-4 w-full"
                                autoComplete="none"
                                label="Bank Address"
                                onChange={e => setbank_address(e.target.value)}
                                name="website"
                                type="text"
                                size="small"
                                variant="outlined"
                                value={bank_address}
                                inputProps={{style: {textTransform: 'capitalize'}}}
                                />
                                {/* <CurrencyTextField
                    className="mb-4 w-full"
                    label="Opening Balance"
                    name="Amount"
                    size="small"
                    variant="outlined"
                    value={opening_bal}
                    currencySymbol="SAR"
                    autoComplete="none"
                    onChange={(event, value) => setopening_bal(value)}
                  /> */}
             


           
            
         
          
          <div className="flex  items-center">
            <Button variant="outlined"  className="mr-4 py-2" color="primary"  type="submit">
              <Icon>save</Icon>SAVE
            </Button>
            <Button
              variant="outlined"
              className="mr-0 py-2"
              color="secondary"
              
              onClick={() => handleClose()}
            >
             <Icon>cancel</Icon> CANCEL
            </Button>
            {!bid &&(<Button color=".bg-green" variant="outlined"  className="ml-4 py-2"type="reset" onClick={resetform}>
            <Icon>loop</Icon>
          <span className="pl-2 capitalize">RESET</span>
            </Button>)}
            
          </div>
        </ValidatorForm>
        
      </div>
    </Dialog>
  );
};

export default MemberEditorDialog;
