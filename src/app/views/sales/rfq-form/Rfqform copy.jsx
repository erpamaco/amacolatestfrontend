/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import moment from "moment";
import { useHistory } from 'react-router';

import url, { GDIV, getrfq, getVendorList, navigatePath } from "../../invoice/InvoiceService";
import clsx from "clsx";
import MemberEditorDialog from '../../party/partycontact';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { Autocomplete, createFilterOptions } from "@material-ui/lab";


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
  Tooltip,
  IconButton
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InvoiceItemTable from "./Rfqformtable";
// import { calculateAmount } from "./Rfqformservice";
import { Breadcrumb } from "matx";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/styles";
import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const InvoiceForm = ({ }) => {
  const [files, setFiles] = useState([]);
  const formData = new FormData();
  const arr = [];
  const [isAlive, setIsAlive] = useState(true);


  const [CustomerList, setCustomerList] = useState([]);
  const [state, setState] = useState([]);
  const [rfqFiles, setrfqFiles] = useState([]);
  const [upload, setupload] = useState([]);
  const [message, setmessage] = useState(false);
  const [queProgress, setQueProgress] = useState(0);
  const [party_id, setparty_id] = useState("");
  const [status, setstatus] = useState(false);
  const [rfqstatus, setrfqstatus] = useState(false);
  const [customercontact, setcustomercontact] = useState([]);
  const el = useRef();
  const { user } = useAuth();
  let listrfq = [];
  let { loading } = state;
  const filter = createFilterOptions();

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

    setQueProgress(35);
  };

  const handleFileSelect = (event) => {
    setrfqFiles(listrfq);
    setupload(event.target.files);
    let files = event.target.files;
    let filesd = event.target.files;

    for (let iterator of filesd) {
      listrfq.push({
        src: URL.createObjectURL(iterator),
        name: iterator.name,
      });
    }
    setrfqFiles(listrfq);
  };


  const handleDialogClose = () => {
    setshouldOpenConfirmationDialogparty(false)
  }
  const routerHistory = useHistory();


  const filterPrice = (options, params) => {

    const filtered = filter(options, params);
    if (params.inputValue !== " ") {
      filtered.unshift({
        inputValue: params.inputValue,
        firm_name: (<Button variant="outlined" color="primary" size="small" onClick={() => routerHistory.push("/party/addparty")}>+Add New</Button>)
      });
    }
    // console.log(filtered)
    // setCustomerList(filtered)
    return filtered;

  };



  useEffect(() => {
    getVendorList().then(({ data }) => {
      setCustomerList(data);
    });
  }, []);

  const setrfq = (event, newValue) => {
    // console.log(newValue)
    if (newValue) {
      setparty_id(newValue?.id);

      url.get("parties/" + newValue?.id).then(({ data }) => {
        setcustomercontact(data[0]?.contacts);

        setrfqstatus(true);
      });
    }
    else {
      setparty_id()
      setcustomercontact([]);
      setrfqstatus(false);
    }
    // setparty_id(event.target.value);

    // url.get("parties/" + event.target.value).then(({ data }) => {
    //   setcustomercontact(data[0].contacts);

    //   setrfqstatus(true);
    // });
  };
  const [
    shouldOpenConfirmationDialogparty,
    setshouldOpenConfirmationDialogparty,
  ] = useState(false);

  const handleSubmit = async (values, { isSubmitting, resetForm }) => {

    values.rfq_details.map((answer, i) => {

      formData.append(`file${i}`, answer.file)

    })
    for (let a = 0; a < upload.length; a++) {
      formData.append("myFile" + a, upload[a], upload[a].name);
    }
    values.party_id = party_id;
    formData.append('div_id', localStorage.getItem('division'))
    formData.append('user_id', user.id)
    for (const [key, value] of Object.entries(values)) {
      let list = [];
      if (`${key}` === "rfq_details") {
        for (const iterator of values.rfq_details) {
          list.push({
            file: iterator,
          });

          formData.append("rfq_details", JSON.stringify(values.rfq_details));
        }
      } else {
        formData.append(`${key}`, `${value}`);
      }
    }

    setState({ ...state, loading: true });
    if (values.rfq_details) {
      try {

        url
          .post("rfq", formData)
          .then(function (response) {
            Swal.fire({
              title: "Success",
              type: "success",
              icon: "success",
              text: "Data saved successfully.",
            }).then((result) => {
              getrfq();
              routerHistory.push(navigatePath + "/sales/rfq-form/rfqview");
            });
          })

          .catch(function (error) { });
        Swal.fire({
          title: "Error",
          type: "error",
          icon: "warning",
          text: "Something Went Wrong.",
        }).then((result) => {
          setState({ ...state, loading: false });
        });

      } catch (error) {
        // console.log('err')
      }
    } else {
      setmessage(true);
    }
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "RFQ", path: navigatePath + "/sales/rfq-form/rfqview" },
            { name: "ADD" },
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
              <ValidatorForm
                className="p-4"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="flex justify-between">
                  <div className="flex p-4">
                    <h5 className="m-0">NEW RFQ</h5>
                  </div>
                  <div className="">
                    <Button
                      color="primary"
                      className="mt-2 py-2 mb-2"
                      variant="outlined"
                      type="submit"
                      disabled={loading}
                      fullWidth
                    >
                      <Icon>save</Icon> SAVE
                    </Button>
                  </div>
                </div>
                <Divider className="mb-2" />
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs>
                    <div className="flex justify-between">
                      <div className="flex">
                        {/* <TextField
                          label="Supplier Name"
                          style={{ minWidth: 200, maxWidth: "250px" }}
                          name="party_id"
                          size="small"
                          variant="outlined"
                          
                          value={values.party_id}
                          select
                          onClick={(event) => setrfq(event)}
                          required
                        >
                          <MenuItem
                            onClick={() => {
                              routerHistory.push("/party/addparty");
                            }}
                          >
                            <Icon>add</Icon>new
                          </MenuItem>
                         
                          {CustomerList.filter(obj => obj.div_id).map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                              {item.firm_name}
                            </MenuItem>
                          ))}
                        </TextField> */}




                        <Autocomplete
                          id="filter-demo"
                          variant="outlined"
                          options={CustomerList}
                          style={{ minWidth: 200, maxWidth: "250px" }}
                          getOptionLabel={(option) => option.firm_name}
                          filterOptions={filterPrice}
                          onChange={(event, newValue) => setrfq(event, newValue)}
                          size="small"
                          renderInput={(params) => <TextField {...params} maxHeight="10px"
                            variant="outlined" label="Vendor Name" />}
                        />
                      </div>
                    </div>

                  </Grid>
                  <Grid item xs>
                    <div className="flex">
                      {/* {rfqstatus && ( */}
                      {/* <TextField
                        label="Contact Person"
                        style={{ minWidth: 200, maxWidth: "250px" }}
                        name="contact_id"
                        size="small"
                        variant="outlined"
                        select
                        disabled={!rfqstatus}
                        value={values.contact_id}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem onClick={() => setshouldOpenConfirmationDialogparty(true)}>
                          <Icon>add</Icon>New
                        </MenuItem> */}


                      {/* {customercontact.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.fname}
                          </MenuItem>
                        ))}
                      </TextField> */}


                      <Autocomplete
                        id="filter-demo"
                        variant="outlined"
                        label="Contact Person"
                        disabled={!rfqstatus}
                        options={customercontact}
                        onChange={handleChange}
                        style={{ minWidth: 200, maxWidth: "250px" }}
                        getOptionLabel={(option) => option.fname}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);
                          if (params.inputValue !== " ") {
                            filtered.unshift({
                              inputValue: params.inputValue,
                              fname: (<Button variant="outlined" color="primary" size="small" onClick={() => setshouldOpenConfirmationDialogparty(true)}>+ Add New</Button>)
                            });
                          }


                          return filtered;
                        }}
                        size="small"
                        renderInput={(params) => <TextField {...params} maxHeight="10px"
                          variant="outlined" label="Contact Person" />}
                      />
                      {/* )} */}
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
                        format="dd MMMM yyyy"
                        selected={values.requested_date}
                        value={values.requested_date}
                        onChange={(date) => {
                          setFieldValue(
                            "requested_date",
                            moment(date).format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item xs>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className="m-2"
                        margin="none"
                        label="Bid Closing Date"
                        inputVariant="outlined"
                        format="dd MMMM yyyy"
                        type="text"
                        size="small"
                        autoOk={true}
                        value={values.require_date}
                        onChange={(date) =>
                          setFieldValue(
                            "require_date",
                            moment(date).format("YYYY-MM-DD")
                          )
                        }
                      />
                    </MuiPickersUtilsProvider>
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
                  <h6 style={{ color: "red" }}>Please Enter RFQ Details</h6>
                )}
                <div className="mt-6 px-4 mb-5 flex items-center justify-between">
                  <label htmlFor="upload-multiple-file">
                    <Button
                      className="capitalize py-2"
                      // className="py-2"
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
                    ></Grid>
                  </div>
                  <Divider></Divider>

                  <div className="flex flex-wrap justify-center items-center m--2">
                    {rfqFiles.map((item, index) => {
                      return (
                        <Card
                          elevation={6}
                          className={clsx({
                            "flex-column justify-center items-center py-6 px-8 m-2 cursor-pointer": true,
                          })}
                        >
                          <Tooltip title="Remove">
                            <span style={{ paddingRight: 0 }}>
                              <Icon
                                color="error"
                                className=""
                                onClick={(event) => handleSingleRemove(index)}
                              >
                                close
                              </Icon>
                            </span>
                          </Tooltip>
                          {item.name.split(".")[1] !== "pdf" ? (
                            <img
                              src={item.src}
                              style={{ width: "100px", height: "100px" }}
                            />
                          ) : (
                            <Icon
                              className="bg-error"
                              style={{ width: "100px", height: "100px" }}
                            >
                              picture_as_pdf
                            </Icon>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              </ValidatorForm>
            </div>
          )}
        </Formik>
      </Card>
      {shouldOpenConfirmationDialogparty && (
        <MemberEditorDialog
          open={shouldOpenConfirmationDialogparty}
          onConfirmDialogClose={handleDialogClose}
          handleClose={() => { setshouldOpenConfirmationDialogparty(false); setIsAlive(false) }}
          customercontact={setcustomercontact}
          partyid={party_id}

          text="Are you sure to delete?"
        />
      )}
    </div>
  );
};

const initialValues = {};

export default InvoiceForm;
