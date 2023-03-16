import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  Tooltip,
  StepLabel,
  Step,
  Stepper,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { Icon } from "@material-ui/core";

import Swal from "sweetalert2";
import url, {capitalize_arr}from "../invoice/InvoiceService"

const MemberEditorDialog = ({ cid, open, handleClose,catid,catList }) => {
  
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [cr_no, setcr_no] = useState('');
  const [contact, setcontact] = useState('');
  const [po_box, setpo_box] = useState('');
  const [fax, setfax] = useState('');
  const [website, setwebsite] = useState('');
  const [address, setaddress] = useState('');
  const [white_logo, setwhite_logo] = useState();
  const [logo, setlogo] = useState();
  const [black_logo, setblack_logo] = useState();
  const [vat_no, setvat_no] = useState('');
  const [arr, setarr] = useState([]);
  const [isAlivecat, setIsAlivecat] = useState('');
  const [img1, setimg1] = useState("");
  const [img2, setimg2] = useState("");
  const [img3, setimg3] = useState("");
  const [id, setid] = useState();
  const formData = new FormData()
  

  
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
 



const Delete_logo=(v)=>
{
  if(v==="w")
  {
    setimg1('')
    setwhite_logo('')
  }
  else if(v==="b")
  {
    setimg2('')
    setblack_logo('')
  }
  else if(v==="l"){
    setimg3('')
    setlogo('')
  }
}
const handlefileSelect = (event,f) => {
  let files = event.target.files[0]
  let temp=arr
    if(f==="w")
    {
      setwhite_logo(files)
 
     
  
      
          setimg1(URL.createObjectURL(files))
       
    }
    else if(f==="b")
    {
      setblack_logo(files)
      setimg2(URL.createObjectURL(files))
      
    }
    else if(f==="l")
    {
      setlogo(files)
      setimg3(URL.createObjectURL(files))
     
    }
  
}
  const handleFormSubmit = () => {
    formData.append('name',capitalize_arr(name))
    formData.append('email',email)
    formData.append('address',capitalize_arr(address))
    formData.append('contact',contact)
    formData.append('cr_no',cr_no)
    formData.append('po_box',po_box)
    formData.append('fax',fax)
    formData.append('vat_no',vat_no)
    formData.append('website',website)
    formData.append('img1',white_logo)
    formData.append('img2',black_logo)
    formData.append('img3',logo)
    if(cid)
    {
     
     formData.append('id',cid) 
    url.post(`company_edit`,formData)
    .then(function (response) {
      
      Swal.fire({
        title: 'Success',
        icon:'success',
        type: 'success',
        text: 'Data Updated successfully.',
      }).then((result) => {
        handleClose()
      })

    })
    }
    else
    {
    url.post('company', formData)
    .then(function (response) {
      // console.log(response.data)
      Swal.fire({
        title: 'Success',
        icon:'success',
        type: 'success',
        text: 'Data saved successfully.',
      })
      .then((result) => {
      handleClose()
      })
    })
  }
   
    
  
  
  };
  
  const setcatid =()=>{
   

    handleClose()
  }
  const getSteps = () => {
    return ["logo1", "logo2", "logo3"];
  };
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <><Button
        variant="contained"
        component="label"

        onChange={e=>handlefileSelect(e,"w")}
      >
        Upload White Logo
        <input
          type="file"
          name="anv"
          style={{ display: "none" }}
        />
      </Button>
      
      <img  src={img1} width={100} height={100}></img>{img1 && (<Tooltip title="Remove Logo"><Icon color="error" onClick={e=>Delete_logo("w")}>close</Icon></Tooltip>)}</>;
      case 1:
        return  <><Button
        variant="contained"
        component="label"
        onChange={e=>handlefileSelect(e,"b")}
      >
        Upload Black Logo
        <input
          type="file"
          style={{ display: "none" }}
        />
      </Button> <img  src={img2} width={100} height={100}></img>{img2 &&(<Tooltip title="Remove Logo"><Icon color="error" onClick={e=>Delete_logo("b")}>close</Icon></Tooltip>)}</>;
      case 2:
        return  <><Button
        variant="contained"
        component="label"
        onChange={e=>handlefileSelect(e,"l")}
      >
        Upload Logo
        <input
          type="file"
          style={{ display: "none" }}
        />
      </Button><img  src={img3} width={100} height={100}></img>{img3 &&(<Tooltip title="Remove Logo"><Icon color="error" onClick={e=>Delete_logo("l")}>close</Icon></Tooltip>)}</>;
      default:
        return "";
    }
  }
  
 
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // console.log(arr)
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      // console.log(arr)
    };
  
    
  
  useEffect(() => {
    
    if(cid)
    {
    url.get("company/"+cid).then(({ data }) => {
      // console.log(data[0].name)
      
          setid(data[0].id)
          setname(data[0].name)
          setaddress(data[0].address)
          setemail(data[0].email)
          setcontact(data[0].contact)
          setfax(data[0].fax)
          setwebsite(data[0].website)
          setcr_no(data[0].cr_no)
          setvat_no(data[0].vat_no)
          setpo_box(data[0].po_box)
          setimg1(data[0].img1)
          setimg2(data[0].img2)
          setimg3(data[0].img3)
        
     
     
   

    
    });
  }


    // });
   
  },[])
  
  


  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{zIndex:1000}} fullWidth={fullWidth}
    maxWidth={maxWidth}>
      <div className="p-6"  >
        {catid &&(
        <h4 className="mb-5">Add Sub Category</h4>
        )}
        {!catid &&(
         <h4 className="mb-5">COMPANY INFO</h4>   
        )}
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-0" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Name"
                autoComplete="off"
                size="small"
                variant="outlined"
                onChange={e => setname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                multiline
                inputProps={{style: {textTransform: 'capitalize'}}}
                name="name"
                value={name}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="w-full mb-4"
                label="Email"
                multiline
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={e => setemail(e.target.value)
                  // .log(isAlive)
                }
                type="emmail"
                name="name"
                value={email}
                validators={["required","isEmail"]}
                errorMessages={["this field is required",'Email is not Valid']}
              />
              <TextValidator
                className="w-full mb-4"
                small="small"
                label="Contact Number"
                multiline
                autoComplete="off"
                variant="outlined"
                onChange={e => setcontact(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                inputProps={{style: {textTransform: 'capitalize'}}}
                name="name"
                value={contact}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="w-full mb-4"
                size="small"
                label="Address"
                multiline
                autoComplete="off"
                variant="outlined"
                onChange={e => setaddress(e.target.value)
                  // .log(isAlive)
                }
                rows={5}
                multiline
                type="textarea"
                inputProps={{style: {textTransform: 'capitalize'}}}
                name="name"
                value={address}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
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
              <TextValidator
                className="w-full mb-4"
                label="Company Registration No"
                size="small"
                onChange={e => setcr_no(e.target.value)
                }
                variant="outlined"
                multiline
                type="textarea"
                name="cdescription"
                value={cr_no}
              />
              <TextValidator
                className="w-full mb-4"
                label="VAT Number"
                size="small"
                autoComplete="off"
                multiline
                variant="outlined"
                onChange={e => setvat_no(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                inputProps={{style: {textTransform: 'capitalize'}}}
                name="name"
                value={vat_no}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="w-full mb-4"
                label="P.O.Box No."
                multiline
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={e => setpo_box(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                inputProps={{style: {textTransform: 'capitalize'}}}
                name="name"
                value={po_box}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="w-full mb-4"
                label="Website"
                multiline
                autoComplete="off"
                variant="outlined"
                size="small"
                onChange={e => setwebsite(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="name"
                value={website}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="w-full mb-4"
                label="Fax"
                autoComplete="off"
                multiline
                size="small"
                variant="outlined"
                onChange={e => setfax(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="name"
                value={fax}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              
            </Grid>

          </Grid>
          <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
     
        {activeStep === steps.length ? (
          <div className="mt-1 mb-3">
            <div className="flex items-center mb-4">
              <Icon>done</Icon> <span className="ml-2">DONE</span>
            </div>
           
            <Button variant="outlined" color="primary" type="submit" className="mr-4 py-2">
             <Icon>save</Icon> SAVE
            </Button>
            <Button
              className="mr-4 py-2"
              variant="outlined"
              color="secondary"
              onClick={() => setcatid()}
            >
              <Icon>cancel</Icon>CANCEL
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div className="pt-3">
              <Button
                variant="outlined"
                color="secondary"
                className="ml-4 py-2"
                disabled={activeStep === 0}
                onClick={handleBack}

              >
                  <Icon>arrow_back</Icon>
                BACK
              </Button>
              <Button
                className="ml-4 py-2"
                variant="outlined"
                color="primary"
                onClick={handleNext}
              >
            {activeStep !== steps.length - 1?<Icon>arrow_forward</Icon>:""}
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
                
              </Button>
              <Button
              className="ml-4 py-2"
              variant="outlined"
              color="secondary"
              onClick={() => setcatid()}
            >
              <Icon>cancel</Icon>CANCEL
            </Button>
            </div>
          </div>
        )}
     

          
         
            
          
        </ValidatorForm>
       
      </div>
    </Dialog>
    
  );
};

export default MemberEditorDialog;
