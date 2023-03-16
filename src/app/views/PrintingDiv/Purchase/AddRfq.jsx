import React, { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import axios from "axios";
import moment from "moment";
import { useHistory } from 'react-router';
import url, { getrfq, getVendorList } from "../../invoice/InvoiceService";
import clsx from "clsx";



// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Grid,
  Card,
  Divider,
  TextField,
  MenuItem,
  Icon,
  Button,
  Fab,
  Tooltip
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InvoiceItemTable from "./RfqTable";
// import { calculateAmount, getCustomerList } from "./Rfqformservice";
import { Breadcrumb, MatxProgressBar } from "matx";
import Swal from "sweetalert2";
import ImageUploading from "react-images-uploading";
import { values } from "lodash";


// { ImageUploadingPropsType, ImageListType, ImageType } is type for typescript
//image uploading limit
const maxNumber = 3;

const InvoiceForm = ({ }) => {
  const [files, setFiles] = useState([]);
  const formData = new FormData();
  const arr = [];
  const onChange = (imageList) => {
    // data for submit
    //Getting total number of images

    var images = imageList.length

    // Create an object of formData 
    // const formData = new FormData();



    //Saving multiple images in formadta varibale
    for (var a = 0; a < images; a++) {
      formData.append(
        "myFile" + a,
        imageList[a].file,
        imageList[a].file.name
      );

    }
    for (const iterator of imageList) {
      arr.push({
        file: iterator,
        uploading: false,
        error: false,
        progress: 0,
      });

    }

    // axios.post("http://localhost/file/controller/post.php", formData);
  };



  const [CustomerList, setCustomerList] = useState([]);
  const [CustomerName, setooptions] = useState([]);
  const [state, setState] = useState([]);
  const [inputValue, setInputValue] = useState(moment().format("YYYY-MM-DD"));
  const [date, setDate] = useState(new Date());
  const open = false;
  const [rfqFiles, setrfqFiles] = useState([]);
  const [upload, setupload] = useState([]);
  const [message, setmessage] = useState(false);
  const [queProgress, setQueProgress] = useState(0);
  const [party_id, setparty_id] = useState('');
  const [dargClass, setDragClass] = useState("");
  const [status, setstatus] = useState(false);
  const [contactstatus, setcontactstatus] = useState(false);
  const [rfqstatus, setrfqstatus] = useState(false);
  const [customercontact, setcustomercontact] = useState([]);
  const el = useRef();
  var count = 1;
  var sum = 0;
  let listrfq = [];


  let isEmpty = !!!files.length;
  const handleSingleRemove = (index) => {
    let tempList = [...rfqFiles];
    tempList.splice(index, 1);
    setFiles([...tempList]);
    setrfqFiles([...tempList]);
  };
  const handleAllRemove = () => {
    setFiles([]);
    setQueProgress(0);
  };
  const uploadAllFile = () => {
    let allFiles = [];

    files.map((item) => {
      allFiles.push({
        ...item,

      });
      return item;
    });
    setFiles([...allFiles]);


    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    setQueProgress(35);
  };

  const handleSingleCancel = (index) => {
    let allFiles = [...files];
    let file = files[index];

    allFiles[index] = { ...file, uploading: false, error: true };

    setFiles([...allFiles]);
  };
  const uploadSingleFile = (index) => {
    let allFiles = [...files];
    let file = files[index];

    allFiles[index] = { ...file, uploading: true, error: false };

    setFiles([...allFiles]);
  };
  const handleFileSelect = (event) => {
    setrfqFiles(listrfq)
    setupload(event.target.files)
    let files = event.target.files;
    let filesd = event.target.files;




    // for (let a = 0; a < files.length; a++) {
    //   formData.append(
    //     "myFile" + a,
    //     files[a],
    //     files[a].name,
    //   );



    // }
    // setrfqFiles(event.taraget.files)




    for (let iterator of filesd) {

      listrfq.push({
        src: URL.createObjectURL(iterator),
        name: iterator.name
      });





    }



    setrfqFiles(listrfq)

    // setstatus(true)
  };
  useEffect(() => {
    getVendorList().then(({ data }) => {
      setCustomerList(data);


    });


  }, []);
  const calculateSubTotal = (itemList = []) => {
    let subTotal = 0;
    itemList.forEach((item) => {
      subTotal += 0.00;
    });

    return subTotal;
  };
  const setrfq = (event) => {
    setparty_id(event.target.value)

    url.get("parties/" + event.target.value).then(({ data }) => {
      setcustomercontact(data[0].contacts);




      setrfqstatus(true);


    });
  }

  const calculateTotal = (values) => {
    let total = 0;
    total += calculateSubTotal(values.items);
    total += values.shippingCharge || 0;
    total += values[values.otherField] || 0;

    return total;
  };
  const routerHistory = useHistory();


  const handleSubmit = async (values, { isSubmitting, resetForm }) => {

    for (let a = 0; a < upload.length; a++) {
      formData.append(
        "myFile" + a,
        upload[a],
        upload[a].name,
      );



    }
    values.party_id = party_id
    const myObjStr = JSON.stringify(values);



    for (const [key, value] of Object.entries(values)) {

      let list = [];
      if (`${key}` === "rfq_details") {
        for (const iterator of values.rfq_details) {
          list.push({
            file: iterator,
          });


          formData.append('rfq_details', JSON.stringify(values.rfq_details));

        }
      }
      else {
        formData.append(`${key}`, `${value}`)
      }
    }





    const res = { ...values, arr }


    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    if (values.rfq_details) {

      // url.post('http://www.dataqueuesystems.com/amaco/amaco/php_file/controller/post.php',formData)


      url.post('rfq', formData)
        .then(function (response) {


          Swal.fire({
            title: 'Success',
            type: 'success',
            icon: 'success',
            text: 'Data saved successfully.',
          })

          getrfq()
          // window.location.href = "/sales/rfq-form/rfqview"
          routerHistory.push("/sales/rfq-form/rfqview")
        })

        .catch(function (error) {

        })
      resetForm({ values: '' })
    }
    else {

      setmessage(true)
    }

  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "View", path: "/sales/rfq-form/rfqview" },
            { name: "RFQ" },
          ]}
        />
      </div>

      <Card elevation={3}>


        <Formik
          className=".bg-green"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setSubmitting,
            setFieldValue,
            resetForm,

          }) => (
            <div>


              <form className="p-4" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex justify-between">
                  <div className="flex p-4">
                    <h4 className="m-0">New RFQ</h4>
                  </div>
                  <div className="">
                    <Button color="primary" className="mt-2 py-2" variant="outlined" type="submit" fullWidth>
                      <Icon>save</Icon> Save
                    </Button>

                  </div>
                </div>
                <Divider className="mb-2" />
                <Grid container spacing={3} alignItems="center">
                  {/* <Grid item md={2} sm={4} xs={12}>
                                    customer name
                                    </Grid> */}
                  <Grid item xs={6}>
                    <div className="flex justify-between">
                      <div className="flex">
                        <TextField

                          label="Supplier Name"
                          style={{ minWidth: 200, maxWidth: '250px' }}
                          name="party_id"
                          size="small"
                          variant="outlined"
                          value={values.party_id}
                          select


                          // onChange={handleChange}
                          onClick={(event) => setrfq(event)}
                          required
                        >
                          <MenuItem onClick={() => {
                            routerHistory.push("/party/addparty");
                          }}>

                            <Icon>add</Icon>new
                            {/* </Button> */}
                          </MenuItem>
                          {/* {CustomerList.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.firm_name}
                      </MenuItem>
                    ))} */}
                          <MenuItem value="1">Qatrat Hobar
                          </MenuItem>
                          <MenuItem value="2">Jade Saudi
                          </MenuItem>
                        </TextField>

                      </div>
                    </div>

                  </Grid>
                  <Grid item xs>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className="m-2"
                        margin="none"
                        label="RFQ Date"
                        inputVariant="outlined"
                        type="text"
                        size="small"
                        selected={values.requested_date}
                        value={values.requested_date}
                        onChange={(date) => {
                          setFieldValue("requested_date", moment(date).format('YYYY-MM-DD'))
                          // return date
                        }}
                      />
                    </MuiPickersUtilsProvider>



                  </Grid>
                  {/* <Grid item md={2}>
                                    Due date
                                    </Grid> */}
                  <Grid item xs>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className="m-2"
                        margin="none"
                        label="Bid Closing Date"
                        inputVariant="outlined"
                        type="text"
                        size="small"
                        autoOk={true}
                        value={values.require_date}
                        onChange={(date) => setFieldValue("require_date", moment(date).format('YYYY-MM-DD'))}
                      />
                    </MuiPickersUtilsProvider>



                  </Grid>
                  <Grid item xs={4}>
                    <div className="flex">
                      {rfqstatus &&
                        <TextField

                          label="Contact Person"
                          style={{ minWidth: 200, maxWidth: '250px' }}
                          name="contact_id"
                          size="small"
                          variant="outlined"
                          select
                          value={values.contact_id}
                          onChange={handleChange}
                          required

                        >

                          {customercontact.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                              {item.fname}
                            </MenuItem>
                          ))}

                        </TextField>
                      }
                    </div>
                  </Grid>





                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>



                <div className="mb-8">
                  <InvoiceItemTable
                    values={values}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}

                  />
                </div>
                {message && (
                  <h6 style={{ color: 'red' }}>Please Enter RFQ Details</h6>
                )}
                <div className="mt-6 px-4 mb-5 flex items-center justify-between">

                  <label htmlFor="upload-multiple-file">
                    <Button
                      className="capitalize"
                      className="py-2"
                      color="primary"
                      component="span"
                      variant="contained"
                      size="small"
                    >

                      <Icon className="pr-8">cloud_upload</Icon>
                      <span>Attach File</span>

                    </Button>
                  </label>
                  <input
                    className="hidden"
                    onChange={handleFileSelect}
                    id="upload-multiple-file"
                    ref={el}
                    type="file"
                    multiple
                    name="myFile[]"
                  />

                  {/* <ImageUploading
                  onChange={onChange}
                  maxNumber={maxNumber}
                  multiple
                >
                  {({ imageList, onImageUpload }) => (
                    // write your building UI
                    <div className="imageuploader">
                      <div className="mainBtns">
                        <Button className="mt-4"
                          color="primary"
                          variant="contained"
                          size="small" onClick={onImageUpload}>Attach File</Button>

                      </div>
                      {imageList.map((image) => (
                        <div className="imagecontainer" key={image.key}>
                          <img src={image.dataURL} />

                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
                 */}

                  {status && (
                    <span>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        className="py-2"
                        onClick={handleAllRemove}
                      >
                        Remove All
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isEmpty}
                        onClick={uploadAllFile}
                      >
                        Upload All
                      </Button>
                    </span>
                  )}
                </div>

                <Card className="mb-6" elevation={2}>
                  <div className="p-4">
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                      direction="row"
                    >
                      {/* <Grid item lg={4} md={4}>
                        Name
              </Grid>
                      <Grid item lg={1} md={1}>
                        Size
              </Grid> */}
                      {/* <Grid item lg={2} md={2}>
                Progress
              </Grid>
              <Grid item lg={1} md={1}>
                Status
              </Grid>
              <Grid item lg={4} md={4}>
                Actions
              </Grid> */}
                    </Grid>
                  </div>
                  <Divider></Divider>

                  <div className="flex flex-wrap justify-center items-center m--2">
                    {rfqFiles.map((item, index) => {


                      return (


                        <Card
                          elevation={6}
                          className={clsx({
                            "flex-column justify-center items-center py-6 px-8 m-2 cursor-pointer": true,
                          })}>
                          <Tooltip title="Remove"><span style={{ paddingRight: 0 }}><Icon color="error" className="" onClick={(event) => handleSingleRemove(index)}>close</Icon></span></Tooltip>
                          {item.name.split('.')[1] !== 'pdf' ? (<img src={item.src} style={{ width: '100px', height: '100px' }} />) : (<Icon
                            className="bg-error"
                            style={{ width: '100px', height: '100px' }}
                          >
                            picture_as_pdf
                          </Icon>)}
                          {/* <span><Icon color="error" onClick={(event) => handleSingleRemove(index)}>close</Icon><img className="w-48" src={item.src} alt="" ></img></span> */}
                        </Card>




                      );
                    })}
                  </div>
                </Card>

                {/* <div className="mt-8">
                <Button color="primary" variant="outlined" type="submit">
                  <Icon>save</Icon>Save
                                </Button>

              </div> */}
              </form>
            </div>
          )}
        </Formik>

      </Card>
    </div>
  );
};

const paymentTermList = [
  "NET 15",
  "NET 30",
  "NET 45",
  "NET 60",
  "Due end of the month",
  "Due on receive",
];

// const customerList = [
//     "customer 1",
//     "customer 2",
//     "customer 3",
//     "customer 4",
//     "customer 5",
//     "customer 6",
//     "customer 7",
//     "customer 8",
// ];

const initialValues = {


};

export default InvoiceForm;
