import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ConfirmationDialog } from "matx";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Breadcrumb } from "matx";
import MemberEditorDialog from "../../product/Addcategory";
import { useHistory } from 'react-router';
import { navigatePath, data } from "../../invoice/InvoiceService"
// import MemberEditorDialog1 from "./manufacture";
import useAuth from '../../../hooks/useAuth';
import {
  Icon,
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  Tooltip,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import "date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from "@material-ui/pickers";
  import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import clsx from "clsx";
// import Axios from "axios";
import url from "../../invoice/InvoiceService"
import { Autocomplete } from '@material-ui/lab';




const SimpleForm = ({ open, handleClose }) => {
  // const [state, setState] = useState({
  //   date: new Date(),
  // });
  // const data = [
  //   {
  //     value: "TONNES",
  //     label: "TON-TONNES"
  //   },
  //   {
  //     value: "TUBES",
  //     label: "TUB-TUBES"
  //   },
  //   {
  //     value: "UNITS",
  //     label: "UNT-UNITS"
  //   },
  //   {
  //     value: "YARDS",
  //     label: "YDS-YARDS"
  //   },
  //   {
  //     value: "SETS",
  //     label: "SET-SETS"
  //   },
  //   {
  //     value: "SQUARE FEET",
  //     label: "SQF-SQUARE FEET"
  //   },
  //   {
  //     value: "SQUARE YARDS",
  //     label: "SQY-SQUARE YARDS"
  //   },
  //   {
  //     value: "THOUSANDS",
  //     label: "THD-THOUSANDS"
  //   },
  //   {
  //     value: "KILOLITER",
  //     label: "KLR-KILOLITER"
  //   },
  //   {
  //     value: "KILOGRAM",
  //     label: "KG-KILOGRAM"
  //   },
  //   {
  //     value: "KILOMETER",
  //     label: "KME-KILOMETER"
  //   },
  //   {
  //     value: "MILLILITER",
  //     label: "MLT-MILLILITER"
  //   },
  //   {
  //     value: "METERS",
  //     label: "MTR-METERS"
  //   },
  //   {
  //     value: "NUMBERS",
  //     label: "NOS-NUMBERS"
  //   },
  //   {
  //     value: "PACKS",
  //     label: "PAC-PACKS"
  //   },
  //   {
  //     value: "PIECES",
  //     label: "PCS-PIECES"
  //   },
  //   {
  //     value: "PAIRS",
  //     label: "PAIRS"
  //   },
  //   {
  //     value: "QUINTAL",
  //     label: "QTL-QUINTAL"
  //   },
  //   {
  //     value: "ROLLS",
  //     label: "ROLLS"
  //   },
  //   {
  //     value: "CENTIMETER",
  //     label: "CENTIMETER"
  //   },
  //   {
  //     value: "CARTONS",
  //     label: "CTN-CARTONS"
  //   },
  //   {
  //     value: "DOZEN",
  //     label: "DOZ-DOZEN"
  //   },
  //   {
  //     value: "DRUM",
  //     label: "DRM-DRUM"
  //   },
  //   {
  //     value: "GRAMS",
  //     label: "GRAMS"
  //   },
  //   {
  //     value: "GROSS",
  //     label: "GRS-GROSS"
  //   },

  // ];



  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const [shouldOpenEditorDialog1, setShouldOpenEditorDialog1] = useState(false);
  const [
    shouldOpenConfirmationDialog1,
    setShouldOpenConfirmationDialog1,
  ] = useState(false);
  const handleDialogClose1 = () => {
    setShouldOpenEditorDialog1(false);
    getcategory()

  };
  const [selectedValue, setSelectedValue] = useState(1);
  // const [selectedValue1, setSelectedValue1] = useState('');
  const [equipment, setequipment] = useState('');//equipment Name
  // const [name_in_ar, setname_in_ar] = useState('');
  const [logno, setlogno] = useState('');//equipment log no
  const [make, setMake] = useState('');//make  
  const [unit_of_measue, setunit_of_measue] = useState('');//Product Unit of measure
  const [files, setfiles] = useState([]);//files
  // const [unit_Price, setunit_Price] = useState('');
  const [selectedOption1, setselectedOption1] = useState('');
  // const [real_price, setreal_price] = useState('');
  const [listpro, setlistpro] = useState([]);
  const [subcategory, setsubcategory] = useState('');//Product Sub category
  const [ptype, setptype] = useState('');//Product type
  const [hsn, sethsn] = useState('');//HSN Number
  const [iq, setiq] = useState(0);//Initial quantity
  const [mq, setmq] = useState(0);//Minimum quantity
  const [manid, setmanid] = useState('');//Manufacturer Id
  const [upload, setupload] = useState([]);//upload files
  const [model, setmodel] = useState('');//Model Number
  const [capacity, setcapacity] = useState('');//capacity Number
  const [mfg_date, setmfg_date] = useState(moment(new Date()).format('DD MMM YYYY'));//mfg_date Number
  
  const [plate, setplate] = useState('');//plate Number
  const [comments, setcomments] = useState('');//comments Number
  const [estatus, setestatus] = useState('');//estatus 
  const [ooptions1, setooptions] = useState([]);
  const [vendors, setvendors] = useState([]);//Vendor Names
  const [manufacture, setmanufacture] = useState([]);//Manufacturer Names 
  const [customerList, setCustomerList] = useState([]);
  const { id } = useParams();//Product SubCategory Id
  const { user } = useAuth();//user info
  const [productcatid, setproductcatid] = useState(id);
  const [loading, setloading] = useState(false);//enable the save button if its false
  const [isAlive, setIsAlive] = useState(true);

//Product Types
  const product_type = [
    "Non Inventory",
    "Inventory",
    "Service"
  ];


  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);


  };

  const routerHistory = useHistory();

  useEffect(() => {

    url.get("mjrProductAdd/"+localStorage.getItem('division')+"/"+id).then(({ data })=>{
     
      setCustomerList(data?.vendor)
      setooptions(data?.product_in_category);
      setmanufacture(data?.manufacture);
      // console.log(data)
      setsubcategory(data?.category[0]?.name);
    })
    // getVendorList().then(({ data }) => {

    //   setCustomerList(data)
    //   getcategory()

    // });

    // url.get("products-in-category").then(({ data }) => {
    //   setooptions(data);
    // })
    // getmanufacturer().then(({ data }) => {

    //   setmanufacture(data);



    // });
    // url.get("categories/" + id).then(({ data }) => {

    //   setsubcategory(data.name)



    // });


  }, []);
  const handleFileSelect = (event) => {
    let files = event.target.files;
    let filesd = event.target.files;

   
    for (const iterator of filesd) {

      listpro.push({
        created_at: "2021-03-30T06:43:07.000000Z",
        file_name: iterator.name,
        id: null,
        img_url: "https://www.amacoerp.com/amaco_test/public/rfq/30/Screenshot (9) - Copy.png",
       
        file: iterator
       
      });

    }
    
    setupload(listpro)
  };
  const deleterfqfile = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this File!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`fileUpload/${id}`)
        
          .then(res => {


            Swal.fire(
              'Deleted!',
              'File has been deleted.',
              'success'
            )
            setIsAlive(true)
          })
        // getrfq()


        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your File is safe :)',
          'error'
        )
      }
    })

  };

  const handleSingleRemove = (index) => {
    let tempList = [...upload];
    tempList.splice(index, 1);
    setupload([...tempList]);
  };
  
  const submitValue = () => {
    setloading(true)//Disable the save Button
    // -------------------
    const formData = new FormData()

    formData.append('log_no', logno)
    formData.append('name', (equipment))
    formData.append('make', make)
    formData.append('model', model)
    formData.append('capacity', capacity)
    formData.append('mfg_date', mfg_date)
    formData.append('plate', plate)
    formData.append('comments', comments)
    formData.append('name_in_ar', equipment)
    formData.append('status', estatus)
    formData.append('div_id', localStorage.getItem('division'))
    formData.append('user_id', user.id)

    for (let a = 0; a < upload.length; a++) {
      formData.append(
        "myFile" + a,
        upload[a].file,
        upload[a].name,
      );
    }
    // -------------------
    
    //Set the formData
    // const frmdetails = {
    //   log_no: logno,
    //   name: (equipment),
    //   make: make,
    //   model: model,
    //   capacity: capacity,
    //   mfg_date: mfg_date,
    //   plate: plate,
    //   comments: comments,
    //   name_in_ar: equipment,
    //   status: estatus,
    //   div_id: localStorage.getItem('division'),
    //   user_id: user.id,

    // }
    // tempItemList.map((answer, i) => {

    //   formData.append(`file${i}`, answer.files ? answer.files : null)//append the rfqdetail files to formData
    // })



    //API To save the rental_equipment
    url.post('rental_equipment', formData)
      .then(function (response) {


        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            routerHistory.push(navigatePath + `/rental/equipment/viewequipment`)
          })
      })
      .catch(function (error) {

      })
    resetform()//Reset the Form

    
  }

//Get the 
  function getcategory(e) {
    url.get("products-in-category").then(({ data }) => {
      setooptions(data);
    });
  }
//rest the state value to empty
  const resetform = () => {
    setlogno('');
    setequipment('');
    setMake('');
    setmodel('');
    setcapacity('');
    // setmfg_date('');
    setplate('');
    setcomments('');


  };





  return (

    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[

            { name: "VIEW EQUIPMENT", path: navigatePath + `/rental/equipment/viewequipment` },
            { name: "NEW EQUIPMENT" }
          ]}
        />
      </div>

      <Card className="p-4">
        <ValidatorForm autocomplete='off' onSubmit={submitValue} onError={() => null}>
          <Grid container spacing={6}>

           
          <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="flex mb-4 mt-6">
              <TextField
                className="ml-2"
                label="Equipment Name"
                value={equipment}
                multiline
                inputProps={{ style: { textTransform: 'capitalize' } }}
                onChange={e => setequipment(e.target.value)}
                type="textarea"
                name="equipment"
                size="small"
                variant="outlined"
                validators={[
                  "required",
                ]}
                errorMessages={["this field is required"]}
                fullWidth

              />
                <TextField
                  className="ml-2"
                  label="Log Number"
                  value={logno}
                  variant="outlined"
                  onChange={e => setlogno(e.target.value)}
                    type="textarea"
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}

                  name="logno"
                  fullWidth
                />
                
             
              </div>
              <div className="flex mb-4">
              <TextField
                  className="ml-2"
                  label="Plate Number"
                  variant="outlined"
                  value={plate}
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}
                  name="plate"
                  onChange={e => setplate(e.target.value)}
                  fullWidth
                />
                   <TextField
                  className="ml-2"
                  label="Comments"
                  variant="outlined"
                  value={comments}
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}
                  name="comments"
                  onChange={e => setcomments(e.target.value)}
                  fullWidth
                />

              </div>
              
              <div className="flex mb-4">


              <FormControl style={{marginLeft:"6px"}}>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel  onChange={e => setestatus(e.target.value)} value="Available" control={<Radio />} label="Available" />
        <FormControlLabel  onChange={e => setestatus(e.target.value)} value="Scrap" control={<Radio />} label="Scrap" />
      </RadioGroup>
    </FormControl>



              </div>



            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="flex mb-4 mt-6">
              <TextField
                className="ml-2"
                label="Make"
                value={make}
                multiline
                inputProps={{ style: { textTransform: 'capitalize' } }}
                onChange={e => setMake(e.target.value)}
                type="textarea"
                size="small"
                name="make"
                variant="outlined"
                validators={[
                  "required",
                ]}
                errorMessages={["this field is required"]}
                fullWidth

              />
                <TextField
                  className="ml-2"
                  label="Model"
                  variant="outlined"
                  value={model}
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}

                  onChange={e => setmodel(e.target.value)}
                  fullWidth
                />
                
             
              </div>
              <div className="flex mb-4">
              <TextField
                  className="ml-2"
                  label="Capacity"
                  variant="outlined"
                  value={capacity}
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}

                  onChange={e => setcapacity(e.target.value)}
                  fullWidth
                />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className=""
                    margin="none"
                    label="Manufactured Date"
                    format="dd MMMM yyyy"
                    inputVariant="outlined"
                    type="text"
                    size="small"
                    selected={mfg_date}
                    value={mfg_date}
                    onChange={(date) => {
                        setmfg_date(moment(date).format('DD MMM YYYY'))
                      // return date
                      
                    }}
                    fullWidth
                  />

                </MuiPickersUtilsProvider>
                

              </div>
              
              <div className="flex mb-4">
              


    

              </div>



            </Grid>
            
          </Grid>
          {/* <label htmlFor="upload-multiple-file">
            <Button
              className="capitalize ml-4 py-2"
              color="primary"
              component="span"
              variant="contained"
              size="small"
            >

              <Icon className="pr-8 pl-2">cloud_upload</Icon>
              <span>Upload Image</span>

            </Button>
          </label>
          <input
            className="hidden"
            onChange={handleFileSelect}
            id="upload-multiple-file"
            type="file"
            multiple
            name="myFile[]"
          />
            <div className="mb-8">
            <div className="flex flex-wrap justify-center items-center m--2">
              
              {upload.map((item, index) => (

                <Card
                  elevation={6}
                  className={clsx({
                    "flex-column justify-center items-center  px-8 m-2 cursor-pointer": true,
                  })}
                >

                  <Icon
                  >
                    photo_library
                  </Icon>

                 


                  <a href={"https://www.amacoerp.com/amaco/php_file/images/" + id + "/" + item.file_name} target="_blank">{item.file_name}</a>


                  <IconButton onClick={() => handleSingleRemove(item.id)}>
                    <Tooltip title="Delete File">
                      <Icon color="error">close</Icon>
                    </Tooltip>
                  </IconButton>
                </Card>
              ))}
            </div>
          </div> */}
          <label htmlFor="upload-multiple-file">
            <Button
              className="capitalize ml-4 py-2"
              color="primary"
              component="span"
              variant="contained"
              size="small"
            >

              <Icon className="pr-8 pl-2">cloud_upload</Icon>
              <span>Attach File</span>

            </Button>
          </label>
          <input
            className="hidden"
            onChange={handleFileSelect}
            id="upload-multiple-file"
            type="file"
            multiple
            name="myFile[]"
          />
          <div className="mb-8">
            <div className="flex flex-wrap justify-center items-center m--2">
              {files.map((item, index) => (
                <Card
                  elevation={6}
                  className={clsx({
                    "flex-column justify-center items-center  px-8 m-2 cursor-pointer": true,
                  })}
                >

                  {item.file_name.split(".")[1] === 'jpg' && (<Icon
                  >
                    photo_library
                  </Icon>)}
                  {item.file_name.split(".")[1] === 'png' && (<Icon
                  >
                    photo_library
                  </Icon>)}
                  {item.file_name.split(".")[1] === 'pdf' && (<Icon
                  >
                    picture_as_pdf
                  </Icon>)}


                


                  {item.rfq_id && <a href={"https://www.amacoerp.com/amaco/php_file/images/" + id + "/" + item.file_name} target="_blank">{item.file_name.split("/")[2]}</a>}
                  {!item.rfq_id && <a href={"https://www.amacoerp.com/amaco/php_file/images/" + id + "/" + item.file_name} target="_blank">{item.file_name}</a>}

                  <IconButton onClick={() => deleterfqfile(item.id)}>
                    <Tooltip title="Delete File">
                      <Icon color="error">close</Icon>
                    </Tooltip>
                  </IconButton>
                </Card>
              ))}
              {upload.map((item, index) => (

                <Card
                  elevation={6}
                  className={clsx({
                    "flex-column justify-center items-center  px-8 m-2 cursor-pointer": true,
                  })}
                >
             

                  <Icon
                  >
                    photo_library
                  </Icon>

                 


                  <a href={"https://www.amacoerp.com/amaco/php_file/images/" + id + "/" + item.file_name} target="_blank">{item.file_name}</a>


                  <IconButton onClick={() => handleSingleRemove(item.id)}>
                    <Tooltip title="Delete File">
                      <Icon color="error">close</Icon>
                    </Tooltip>
                  </IconButton>
                </Card>
              ))}
            </div>
          </div>
          <br />
          <Button className="mr-4 py-2" color="primary" variant="outlined" type="submit" disabled={loading}>
            <Icon>save</Icon>
            <span className="pl-2 capitalize">SAVE</span>
          </Button>

          <Button className="mr-4 py-2" color="secondary" variant="outlined" onClick={() => routerHistory.push(navigatePath + `/rental/equipment/viewequipment`)}>
            <Icon>cancel</Icon>
            <span className="pl-2 capitalize">CANCEL</span>
          </Button>
          <Button color=".bg-green" className="mr-4 py-2" variant="outlined" type="submit" onClick={resetform}>
            <Icon>loop</Icon>
            <span className="pl-2 capitalize">RESET</span>
          </Button>
        </ValidatorForm>
      </Card>
      <card>
        {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
          />

        )}
        {shouldOpenConfirmationDialog && (

          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            text="Are you sure to delete?"
          />
        )}

      </card>
      <card>
        {/* {shouldOpenEditorDialog1 && (
          <MemberEditorDialog1
            handleClose={handleDialogClose1}
            open={shouldOpenEditorDialog1}
            setid={setproductcatid}
            manufacture={setmanufacture}
          />

        )} */}
        {shouldOpenConfirmationDialog1 && (

          <ConfirmationDialog
            open={shouldOpenConfirmationDialog1}
            onConfirmDialogClose={handleDialogClose1}
            text="Are you sure to delete?"

          />
        )}

      </card>
    </div>


  );
};

export default SimpleForm;
