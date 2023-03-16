import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Dialog, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import {
  Avatar,
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import {
  Icon,
  TextField,
  Radio,
  RadioGroup,
  Checkbox,
  FormControlLabel,
  Fab,
} from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import FormLabel from "@material-ui/core/FormLabel";
import url, { capitalize_arr, basePath } from "../invoice/InvoiceService";
import { FormGroup } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from "react-router-dom";

const MemberEditorDialog = ({
  uid,
  open,
  handleClose,
  divs,
  userid,
  getSalary,
  data,
}) => {
  const [state, setState] = useState({
    present_address: "",
    passport_number: "",
    salary: "",
    isActive: false,
  });
  const [name, setname] = useState("");
  const [nick_name, setnick_name] = useState("");
  const [opening_bal, setopening_bal] = useState("0");
  const [profit_per, setprofit_per] = useState("0.00");
  const [email, setemail] = useState("");
  const [code, setcode] = useState("");
  const [contact, setcontact] = useState("");
  const [password, setpassword] = useState("");
  const [designation, setdesignation] = useState("");
  const [prefix, setprefix] = useState("");
  const [usertype, setusertype] = useState(true);
  const [Roles, setRoles] = useState([]);
  const [isAlive, setIsAlive] = useState(false);
  const [role_id, setrole_id] = useState("");
  const [isTrue, setisTrue] = useState(false);
  const [divisions, setdivisions] = useState([]);
  const [value, setValue] = useState();
  const [passExpDate, setPassExpDate] = useState(new Date());
  const [iqamaExpDate, setIqamaExpDate] = useState(new Date());
  const [dojExpDate, setDojExpDate] = useState(new Date());
  const [empList, setEmpList] = useState([]);
  const [shouldOpenSalaryDialog, setShouldOpenSalaryDialog] = useState(false);

  const [updateDivs, setUpdatedDivs] = useState([]);
  const [divEditable, setDivEditable] = useState(false);
  const [proEditable, setProEditable] = useState(false);
  const max = 100;
  const min = 0;
  const formData = new FormData();

  const handleChangeImage = (event) => {
    console.log("sdsd");
    setState({
      ...state,
      [event.target.name]: event.target.files[0],
    });
    console.log({ state });
  };

  const handleDivi = (newValue) => {
    const ids = newValue.map((o) => o.id);
    const filtered = newValue.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );

    console.log(newValue);
    setUpdatedDivs(filtered);
  };

  const makeEditableHandle = () => {
    setState({
      emp_no: empList[0]?.emp_no,
      name: empList[0]?.name,
      contact_number: empList[0]?.contact_number,
      present_address: empList[0]?.present_address,
      email: empList[0]?.email,
      designation: empList[0]?.designation,
      grosssalary: empList[0]?.grosssalary,
      bsalary: empList[0]?.bsalary,
      hrasalary: empList[0]?.hrasalary,
      tasalary: empList[0]?.tasalary,
      div_id: empList[0]?.div_id,
      passport_number: empList[0]?.passport_number,
      file: empList[0]?.file,
    });

    setPassExpDate(new Date(empList[0]?.passport_exp_date));
    setIqamaExpDate(new Date(empList[0]?.iqama_exp_date));
    setDojExpDate(new Date(empList[0]?.date_of_join));
    setProEditable(true);
  };

  const submitDivs = () => {
    console.log(updateDivs);
    const ids = updateDivs.map((o) => o.id);
    const filtered = updateDivs.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );
    console.log(filtered);

    const obj = {
        id : userid,
        data : filtered,
    }

    url
    .post(`update-emp-div`, obj)
    .then(({ data }) => {
      console.log(data);
      Swal.fire({
        title: "Success",
        type: "success",
        icon: "success",
        text: "Data updated successfully.",
      });
      handleClose();
    })
    .catch(function (error) {});
  };

  const newHandleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log({ state });
  };

  const submitHandle = () => {
    console.log({ state });

    formData.append("name", state?.name);
    formData.append("id", userid);
    formData.append("emp_no", state?.emp_no);
    formData.append("contact_number", state?.contact_number);
    formData.append("email", state?.email);
    formData.append("present_address", state?.present_address);
    formData.append("bsalary", state?.bsalary);
    formData.append("hrasalary", state?.hrasalary);
    formData.append("tasalary", state?.tasalary);
    formData.append("grosssalary", state?.grosssalary);
    formData.append("div_id", state?.div_id);
    formData.append("file", state?.file);
    formData.append("passport_number", state?.passport_number);
    formData.append("designation", state?.designation);
    formData.append("passport_exp_date", passExpDate);
    formData.append("iqama_exp_date", iqamaExpDate);
    formData.append("date_of_join", dojExpDate);

    // formData.append('name', state?.name)
    // formData.append('emp_no', state?.emp_no)
    // formData.append('contact_number', state?.contact_number)
    // formData.append('email', state?.email)
    // formData.append('present_address', state?.present_address)
    // formData.append('passport_number', state?.passport_number)
    // formData.append('designation', capitalize_arr(state?.designation))
    // formData.append('bsalary', state?.bsalary)
    // formData.append('hrasalary', state?.hrasalary)
    // formData.append('tasalary', state?.tasalary)
    // formData.append('grosssalary', state?.grosssalary)
    // // formData.append('file', state?.file)
    // formData.append('passport_exp_date', passExpDate)
    // formData.append('iqama_exp_date', iqamaExpDate)
    // formData.append('date_of_join', dojExpDate)

    url
      .post(`update-emp`, formData)
      .then(({ data }) => {
        console.log(data);
        Swal.fire({
          title: "Success",
          type: "success",
          icon: "success",
          text: "Data updated successfully.",
        });
        handleClose();
      })
      .catch(function (error) {});
    setProEditable(false);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener");
    if (newWindow) newWindow.opener = null;
  };

  const handleFormSubmit = () => {
    getSalary(state);
    handleClose();
  };

  const handleClick = (urll) => {
    window.open(urll);
  };

  useEffect(() => {
    const fD = data.filter((obj) => obj.emp_id == userid);
    setEmpList(fD);
    setUpdatedDivs(fD[0]?.divisions);
  }, []);

  return (
    <Dialog fullWidth={true} maxWidth={"lg"} onClose={handleClose} open={open}>
      <div className="flex  items-center">
        <Button color="secondary" onClick={handleClose} className="py-2 ml-2">
          <Icon>cancel</Icon>
        </Button>
      </div>

      <Card className="p-6" elevation={3}>
        <center>
          <h4>
            Employee Details
            {proEditable == true ? (
              <Icon
                editable={proEditable}
                onClick={submitHandle}
                style={{ float: "right" }}
              >
                check_circle
              </Icon>
            ) : (
              <Icon
                editable={proEditable}
                onClick={makeEditableHandle}
                style={{ float: "right" }}
              >
                edit
              </Icon>
            )}
          </h4>
        </center>
        <Divider />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid style={{ padding: "10px" }} item xs={2} sm={4} md={4}>
            <center>
              <h5>Personal Details</h5>
            </center>
            <Divider />
            <Table className="mb-4">
              {proEditable == true ? (
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4">Name</TableCell>
                    <TableCell className="">
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.name || ""}
                        onChange={newHandleChange}
                        name="name"
                      />
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                                    <TableCell className="pl-4">Division</TableCell>
                                    <TableCell className="">
                                        <TextField
                                            style={{ position: "relative", top: "13px" }}
                                            value={state?.emp_no || ""}
                                            onChange={newHandleChange}
                                            name="emp_no"
                                        /></TableCell>
                                </TableRow> */}
                  <TableRow>
                    <TableCell className="pl-4">Employee Number</TableCell>
                    <TableCell className="">
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.emp_no || ""}
                        onChange={newHandleChange}
                        name="emp_no"
                      ></TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Designation</TableCell>
                    <TableCell className="">
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.designation || ""}
                        onChange={newHandleChange}
                        name="designation"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Contact Number</TableCell>
                    <TableCell className="">
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.contact_number || ""}
                        onChange={newHandleChange}
                        name="contact_number"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Email-ID</TableCell>
                    <TableCell className="">
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.email || ""}
                        onChange={newHandleChange}
                        name="email"
                        type='email'
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Present Address</TableCell>
                    <TableCell className="">
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.present_address || ""}
                        onChange={newHandleChange}
                        name="present_address"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4">Name</TableCell>
                    <TableCell className="">{empList[0]?.name}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                                    <TableCell className="pl-4">Division</TableCell>
                                    <TableCell className="">{empList[0]?.div_name}</TableCell>
                                </TableRow> */}
                  <TableRow>
                    <TableCell className="pl-4">Employee Number</TableCell>
                    <TableCell className="">{empList[0]?.emp_no}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Designation</TableCell>
                    <TableCell className="">
                      {empList[0]?.designation}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Contact Number</TableCell>
                    <TableCell className="">
                      {empList[0]?.contact_number}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Email-ID</TableCell>
                    <TableCell className="">{empList[0]?.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Present Address</TableCell>
                    <TableCell className="">
                      {empList[0]?.present_address}
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </Grid>
          <Grid style={{ padding: "10px" }} item xs={2} sm={4} md={4}>
            <center>
              <h5>Other Details</h5>
            </center>
            <Divider />
            <Table className="mb-4">
              {proEditable == true ? (
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4">Passport Number</TableCell>
                    <TableCell>
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.passport_number || ""}
                        onChange={newHandleChange}
                        name="passport_number"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Passport Expire Date</TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="mb-4 w-full"
                          margin="none"
                          label="Iqama Expired Date"
                          inputVariant="outlined"
                          type="text"
                          size="small"
                          autoOk={true}
                          value={passExpDate}
                          format="MMMM dd, yyyy"
                          onChange={(e) => setPassExpDate(e)}
                          required
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">IQAMA Expire Data</TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="mb-4 w-full"
                          margin="none"
                          label="Iqama Expired Date"
                          inputVariant="outlined"
                          type="text"
                          size="small"
                          autoOk={true}
                          value={iqamaExpDate}
                          format="MMMM dd, yyyy"
                          onChange={(e) => setIqamaExpDate(e)}
                          required
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Date of Join</TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className="mb-4 w-full"
                          margin="none"
                          label="Iqama Expired Date"
                          inputVariant="outlined"
                          type="text"
                          size="small"
                          autoOk={true}
                          value={dojExpDate}
                          format="MMMM dd, yyyy"
                          onChange={(e) => setDojExpDate(e)}
                          required
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Job Agreement</TableCell>
                    <TableCell>
                      <TextField
                        type="file"
                        name="file"
                        onChange={(e) => handleChangeImage(e)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4">Passport Number</TableCell>
                    <TableCell>{empList[0]?.passport_number}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Passport Expire Date</TableCell>
                    <TableCell>
                      {moment(empList[0]?.passport_exp_date).format(
                        "DD MMM YYYY"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">IQAMA Expire Data</TableCell>
                    <TableCell>
                      {moment(empList[0]?.iqama_exp_date).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Date of Join</TableCell>
                    <TableCell>
                      {moment(empList[0]?.date_of_join).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Job Agreement</TableCell>
                    <TableCell className="pl-4">
                      {/* <Link to={{ pathname: basePath + empList[0]?.file }}  target="_blank" rel="noreferrer noopener"> */}
                      <Button
                        className=""
                        color="primary"
                        variant="outlined"
                        onClick={(e) => {
                          handleClick(basePath + empList[0]?.file);
                        }}
                      >
                        Download
                      </Button>
                    </TableCell>
                    {/* <TableCell><a href={'localhost:8000/'+empList[0]?.file}>Download</a></TableCell> */}
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </Grid>
          <Grid style={{ padding: "10px" }} item xs={2} sm={4} md={4}>
            <center>
              <h5>Salary Details</h5>
            </center>
            <Divider />
            <Table className="mb-4">
              {proEditable == true ? (
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4">Basic Salary</TableCell>
                    <TableCell>
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.bsalary || ""}
                        onChange={newHandleChange}
                        name="bsalary"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: "250px" }} className="pl-4">
                      Home Rent Allowance (HRA)
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.hrasalary || ""}
                        onChange={newHandleChange}
                        name="hrasalary"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">
                      Travel Allowance (TA)
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.tasalary || ""}
                        onChange={newHandleChange}
                        name="tasalary"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Gross Salary</TableCell>
                    <TableCell>
                      <TextField
                        style={{ position: "relative", top: "13px" }}
                        value={state?.grosssalary || ""}
                        onChange={newHandleChange}
                        name="grosssalary"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4">Basic Salary</TableCell>
                    <TableCell>{empList[0]?.bsalary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: "250px" }} className="pl-4">
                      Home Rent Allowance (HRA)
                    </TableCell>
                    <TableCell>{empList[0]?.hrasalary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">
                      Travel Allowance (TA)
                    </TableCell>
                    <TableCell>{empList[0]?.tasalary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-4">Gross Salary</TableCell>
                    <TableCell>{empList[0]?.grosssalary}</TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </Grid>
          <Grid style={{ padding: "10px" }} item xs={2} sm={4} md={4}>
            <center>
              <h5>
                Division Details
                {divEditable ? (
                  <Icon
                    editable={divEditable}
                    onClick={(e) => {
                      submitDivs();
                      setDivEditable(false);
                    }}
                    style={{ float: "right" }}
                  >
                    check_circle
                  </Icon>
                ) : (
                  <Icon
                    editable={divEditable}
                    onClick={(e) => {
                      setDivEditable(true);
                    }}
                    style={{ float: "right" }}
                  >
                    edit
                  </Icon>
                )}
              </h5>
            </center>
            <Divider />
            <Table className="mb-4">
              {divEditable === true ? (
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-4">Choose Division</TableCell>
                    <TableCell>
                      <Autocomplete
                        multiple
                        id="multiple-limit-tags"
                        options={divs}
                        onChange={(e, newValue) => {
                          handleDivi(newValue);
                        }}
                        getOptionLabel={(option) => option?.name}
                        value={updateDivs}
                        // defaultValue={
                        //     empList[0]?.divisions.map((i)=>{
                        //         return i
                        //     })
                        // }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Divisions"
                            placeholder="Choose Division"
                          />
                        )}
                        sx={{ width: "500px" }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {empList[0]?.divisions?.map((i) => {
                    return (
                      <TableRow>
                        <TableCell>{i.name}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </Grid>
        </Grid>
      </Card>
    </Dialog>
  );
};

export default MemberEditorDialog;
