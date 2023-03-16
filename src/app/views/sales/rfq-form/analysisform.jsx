import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getVendorList } from "./Rfqformservice";

import {  MenuItem } from "@material-ui/core";
import Swal from "sweetalert2";
import url from "../../invoice/InvoiceService"

const AnalysisForm = ({ uid, open, handleClose }) => {
 
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const id =parseInt(params.get('id'));
  const [analysisInfo, setanalysisInfo] = useState({
    brand_name: "",
    unit_price: "",
    party_id:"",
    description:"",
    user_id:1,
    product_id:id
  });
  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...analysisInfo };
    temp[name] = value;
    setanalysisInfo(temp);
  };
  const [customerList, setCustomerList] = useState([]);
 
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  


  const handleFormSubmit = async (event) => {
  
   
    url.post('analyse', analysisInfo)
      .then(function (response) {
        
        Swal.fire({
          title: 'Success',
          type: 'success',
          text: 'Data saved successfully.',
        });
        setanalysisInfo({brand_name: "",
      unit_price: "",
      party_id:"",
      description:"",
      user_id:1,})
       
        
      })
      
     
   
      .catch(function (error) {
       
      })

    
    
  };
  useEffect(() => {
    getVendorList().then(({ data }) => {
    
      setCustomerList(data)
    
  });
},[])
  
  return (
    <Dialog onClose={handleClose} open={open}   fullWidth={fullWidth}
    maxWidth={maxWidth} style={{zIndex:1000}}>
      
      <div className="p-6">
        <h4 className="mb-5">Add New</h4>
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          {/* <Grid className="mb-4" container spacing={2}>
            <Grid item sm={6} xs={12}> */}
              <TextValidator
                className="mb-4 w-full"
                label="Brand Name"
                variant="outlined"
                size="small"
                onChange={handleChange
                }
                type="text"
                name="brand_name"
                value={analysisInfo.brand_name}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <Grid>
                <TextValidator
                  className="w-full mb-4"
                  label="unit Price"
                  onChange={handleChange
                  }
                  size="small"
                  variant="outlined"
                  type="textarea"
                  name="unit_price"
                  value={analysisInfo.unit_price}
                />
                <TextValidator
                  className="mb-4 w-full"
                  label="Vendor"
                  name="party_id"
                  size="small"
                  variant="outlined"
                  select
                  value={analysisInfo.party_id}
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}
                  onChange={handleChange
                  }
                >
                  {customerList.map((item, ind) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.fname}
                    </MenuItem>
                  ))}
                </TextValidator>
                <TextValidator
                      label="Description"
                      name="description"
                      size="small"
                      variant="outlined"
                      multiline
                      value={analysisInfo.description}
                      rows={8}
                      fullWidth
                      onChange={handleChange}
                    />
              {/* </Grid>
            </Grid> */}

            <Grid item sm={6} xs={12}>
              
              {/* <TextValidator
                      label="Description"
                      name="description"
                      size="small"
                      variant="outlined"
                      multiline
                      value={analysisInfo.description}
                      rows={8}
                      fullWidth
                      onChange={handleChange}
                    /> */}

            </Grid>
          </Grid>

          <div className="flex justify-between items-center">
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <div className="flex justify-between items-center">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleClose()}
              >
                Cancel
            </Button>
            </div>
          </div>
        </ValidatorForm>
        <Divider className="mb-2" />
      </div>
    </Dialog>
  );
};

export default AnalysisForm;
