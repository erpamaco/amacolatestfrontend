import React, { Component, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useHistory } from 'react-router';
import url, { getparties, capitalize_arr } from "../../invoice/InvoiceService"
import InputMask from 'react-input-mask';
import { Breadcrumb } from "matx";
import { Card } from "@material-ui/core";
import {
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
  Button
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import ReactSelectMaterialUi from "react-select-material-ui";
import Select from 'react-select';
import Axios from "axios";
import Swal from "sweetalert2";
// import CurrencyInput from 'react-currency-input-field';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
const optionss = [
  { value: 'Vendor', label: 'Vendor' },
  { value: 'Customer', label: 'Customer' },
];
const telcode = [
  { value: 973, label: "+973" },
  { value: 965, label: "+965" },
  { value: 961, label: "+961" },
  { value: 968, label: "+968" },
  { value: 974, label: "+974" },
  { value: 966, label: "+966" },
  { value: 971, label: "+971" },
  { value: 967, label: "+967" },
];
const data = [
  { value: 'Vendor', label: 'Vendor' },
  { value: 'Customer', label: 'Customer' },
];
const prefixs = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Ms', label: 'Ms' }
];
const customerList = [
  {
    name: "Customer",
    value: 'Customer'
  },
  {
    name: "Vendor",
    value: 'Vendor',

  },
];

const Addparty = ({ open, handleClose }) => {
  const [state, setState] = useState({
    date: new Date(),
  });
  const [selectedValue, setSelectedValue] = useState('');
  const [Firm_Name, setFirm_name] = useState('');
  const [company_name_ar, setcompany_name_ar] = useState('');
  const [email, setemail] = useState('');
  const [mobno, setmobno] = useState('');
  const [mobnocode, setmobnocode] = useState(+966);
  const [landline, setlandline] = useState('');
  const [landlinecode, setlandlinecode] = useState(+966);
  const [vat_no, setvat_no] = useState('');
  const [post_box_no, setpost_box_no] = useState('');
  const [country, setcountry] = useState('');
  const [street, setstreet] = useState('');
  const [zip_code, setzip_code] = useState('');
  const [proviance, setproviance] = useState('');
  const [website, setwebsite] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [suffix, setsuffix] = useState('');
  const [regno, setregno] = useState('');
  const [ob, setob] = useState(0);
  const [fax, setfax] = useState('');
  const [faxext, setfaxext] = useState('');
  const [city, setcity] = useState('');
  const [contact, setcontact] = useState('');
  const [contactcode, setcontactcode] = useState(+966);
  const [creditlimit, setcreditlimit] = useState(0);
  const [creditdays, setcreditdays] = useState(0);
  const [partycode, setpartycode] = useState('');
  const [account_no, setaccount_no] = useState('');
  const [vendor_id, setvendor_id] = useState('');
  const [bank_address, setbank_address] = useState('');
  const [bank_name, setbank_name] = useState('');
  const [iban_no, setiban_no] = useState('');
  const [address, setaddress] = useState('');
  const [prefix, setprefix] = useState('');
  let {
    loading
  } = state;
  const routerHistory = useHistory();

  const handleSubmit = () => {
    setState({ ...state, loading: true });
    const frmdetails = {
      firm_name: Firm_Name ? capitalize_arr(Firm_Name) : '',
      registration_no: regno,
      vat_no: vat_no,
      post_box_no: post_box_no,
      street: street ? capitalize_arr(street) : '',
      proviance: proviance ? capitalize_arr(proviance) : '',
      country: country ? capitalize_arr(country) : '',
      contact: contactcode + contact,
      zip_code: zip_code,
      mobno: mobnocode + mobno,
      landline: landlinecode + landline,
      email: email,
      website: website,
      city: city ? capitalize_arr(city) : "",
      fax: fax + "/" + faxext,
      fname: fname ? capitalize_arr(fname) : "",
      lname: lname ? capitalize_arr(lname) : "",
      designation: suffix ? capitalize_arr(suffix) : "",
      opening_balance: parseFloat(ob).toFixed(2),
      party_type: selectedValue,
      credit_days: creditdays,
      credit_limit: parseFloat(creditlimit).toFixed(2),
      iban_no: iban_no,
      bank_name: bank_name,
      bank_address: bank_address ? capitalize_arr(bank_address) : "",
      account_no: account_no,
      vendor_id: vendor_id,
      address: address ? capitalize_arr(address) : "",
      party_code: partycode,
      prefix: prefix ? capitalize_arr(prefix) : "",
      company_name_ar: company_name_ar
    }



    url.post('parties', frmdetails)

      .then(function (response) {

        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            getparties()
            routerHistory.push('/party/viewparty')
          })
      })
      .catch(function (error) {

      })

    resetform()

  }
  const resetform = () => {
    setfname('');
    setlname('');
    setFirm_name('');
    setmobno('');
    setlandline('');
    setemail('');
    setfax('');
    setfaxext('');
    setproviance('');
    setcity('');
    setzip_code('');
    setregno('');
    setvat_no('');
    setcountry('');
    setpost_box_no('');
    setstreet('');
    setob('');
    setSelectedValue('');
    setsuffix('');
    setwebsite('');
    setcreditlimit(0);
    setcreditdays(0);


  };


  const handleChange = (event) => {
    event.persist();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange1 = selectedOption => {
    this.setState({ selectedOption });
  };

  const handleDateChange = (date) => {
    setState({ ...state, date });
  };

  const {
    username,
    firstName,
    creditCard,
    mobile,
    password,
    confirmPassword,
    gender,
    date,
    selectedOption,
  } = state;

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Party", path: "./print_viewparty" },
            { name: "Party Entry" }
          ]}
        />
      </div>
      <Card className="p-4" elevation={3}>

        <ValidatorForm onError={() => null} onSubmit={handleSubmit} autoComplete="none">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>

              <h6>Contact Person Details</h6>
              <div className="flex">
                <TextField
                  className="mr-2"
                  autoComplete="none"

                  label="Prefix"
                  variant="outlined"
                  onChange={e => setprefix(e.target.value)}
                  value={prefix}
                  size="small"
                  style={{ width: '180px' }}
                  select

                >
                  {prefixs.map((item, ind) => (
                    <MenuItem value={item.value} key={item}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className="mb-4 w-full text-capitalize"
                  label="First name"
                  textTransform
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                  onChange={e => setfname(e.target.value)}
                  type="text"
                  name="fname"
                  variant="outlined"
                  size="small"
                  value={fname}

                />
              </div>
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  autoComplete="none"
                  label="Last Name"
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                  variant="outlined"
                  onChange={e => setlname(e.target.value)}
                  value={lname}
                  size="small"
                  fullWidth
                />
                <TextField
                  className="ml-2"
                  label="Designation"
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                  autoComplete="none"
                  variant="outlined"
                  value={suffix}
                  size="small"
                  onChange={e => setsuffix(e.target.value)}
                  fullWidth
                />
              </div>

              <TextValidator
                className="mb-4 w-full"
                label="Email Address"

                autoComplete="none"
                onChange={e => setemail(e.target.value)}
                type="text"
                name="email"
                size="small"
                variant="outlined"
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
                value={email}
              />
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  autoComplete="none"
                  label="Code"
                  onChange={e => setmobnocode(e.target.value)}
                  name="mobno"
                  type="text"
                  size="small"
                  style={{ width: '250px' }}
                  variant="outlined"
                  value={mobnocode}
                  // fullWidth
                  select
                >
                  {telcode.map((item, ind) => (
                    <MenuItem value={item.value} key={item}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className="mr-2"
                  label="Mobile Number"
                  autoComplete="none"
                  onChange={e => setmobno(e.target.value)}
                  name="mobno"
                  type="text"
                  size="small"
                  variant="outlined"
                  value={mobno || ""}
                  fullWidth

                />
                <TextField
                  className="ml-2"
                  autoComplete="none"
                  label="Code"
                  onChange={e => setlandlinecode(e.target.value)}
                  name="mobno"
                  type="text"
                  size="small"
                  style={{ width: '250px' }}
                  variant="outlined"
                  value={landlinecode || ""}
                  fullWidth
                  select
                >
                  {telcode.map((item, ind) => (
                    <MenuItem value={item.value} key={item}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  className="ml-2"
                  label="Landline Number"
                  autoComplete="none"
                  onChange={e => setlandline(e.target.value)}
                  name="landline"
                  size="small"
                  variant="outlined"
                  value={landline}
                  type="mobile"
                  fullWidth

                />
              </div>
              <TextField
                className="mb-4 w-full"
                label="Address"
                inputProps={{ style: { textTransform: 'capitalize' } }}
                autoComplete="none"
                onChange={e => setaddress(e.target.value)}
                name="address"
                size="small"
                variant="outlined"
                value={address}
                type="mobile"
                fullWidth

              />
              <br></br>
              <br></br>
              <h6>Bank Details</h6>
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
                inputProps={{ style: { textTransform: 'capitalize' } }}
                onChange={e => setbank_name(e.target.value)}
                name="website"
                type="text"
                size="small"
                variant="outlined"
                value={bank_name}

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
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <h6>Company Details</h6>
              <TextValidator
                className="mb-4 w-full"
                label="Company Name"
                inputProps={{ style: { textTransform: 'capitalize' } }}
                autoComplete="none"
                onChange={e => setFirm_name(e.target.value)}
                type="text"
                name="Firm_Name"
                variant="outlined"
                size="small"
                value={Firm_Name}

              />
              <TextValidator
                className="mb-4 w-full"
                label="اسم الشركة"
                autoComplete="none"
                onChange={e => setcompany_name_ar(e.target.value)}
                type="text"
                name="company_name_ar"
                variant="outlined"
                size="small"
                value={company_name_ar}

              />
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  label="Commercial Registration Number"
                  autoComplete="none"
                  onChange={e => setregno(e.target.value)}
                  name="regno"
                  size="small"
                  type="text"
                  variant="outlined"
                  value={regno}
                  fullWidth
                  required

                />

                <TextField
                  className="ml-2"
                  label="VAT Number"
                  autoComplete="none"
                  onChange={e => setvat_no(e.target.value)}
                  name="vat_no"
                  size="small"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={vat_no}
                />
              </div>

              <TextValidator
                className="mb-4 w-full"
                label="P.O Box"
                autoComplete="none"
                onChange={e => setpost_box_no(e.target.value)}
                type="text"
                name="post_box_no"
                size="small"
                variant="outlined"
                value={post_box_no}

              />
              <TextValidator
                className="mb-4 w-full"
                autoComplete="none"
                label="Street"
                inputProps={{ style: { textTransform: 'capitalize' } }}
                onChange={e => setstreet(e.target.value)}
                type="text"
                size="small"
                variant="outlined"
                name="street"
                value={street}

              />

              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  autoComplete="none"
                  label="City"
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                  variant="outlined"
                  onChange={e => setcity(e.target.value)}
                  value={city}
                  size="small"
                  fullWidth
                />
                <TextField
                  className="ml-2"
                  label="Province"
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                  autoComplete="none"
                  variant="outlined"
                  value={proviance}
                  size="small"
                  onChange={e => setproviance(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  autoComplete="none"
                  label="Zip_code"
                  variant="outlined"
                  onChange={e => setzip_code(e.target.value)}
                  value={zip_code}
                  size="small"
                  fullWidth
                />
                <TextField
                  className="ml-2"
                  label="Country"
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                  autoComplete="none"
                  variant="outlined"
                  value={country}
                  size="small"
                  onChange={e => setcountry(e.target.value)}
                  fullWidth
                />
              </div>



              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  autoComplete="none"
                  label="Fax"
                  onChange={e => setfax(e.target.value)}
                  name="fax"
                  type="text"
                  size="small"
                  variant="outlined"
                  value={fax}
                  fullWidth

                />
                <TextField
                  className="ml-2"
                  autoComplete="none"
                  label="Ext"
                  style={{ width: '180px' }}
                  onChange={e => setfaxext(e.target.value)}
                  name="fax"
                  type="text"
                  size="small"
                  variant="outlined"
                  value={faxext}
                  fullWidth

                />

                <TextField
                  className="ml-2"
                  label="Code"
                  autoComplete="none"
                  onChange={e => setcontactcode(e.target.value)}
                  name="mobno"
                  type="text"
                  size="small"
                  style={{ width: '250px' }}
                  variant="outlined"
                  value={contactcode || ""}
                  fullWidth
                  select
                >
                  {telcode.map((item, ind) => (
                    <MenuItem value={item.value} key={item}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className="ml-2"
                  label="Contact"
                  autoComplete="none"
                  onChange={e => setcontact(e.target.value)}
                  name="contact"
                  type="text"
                  size="small"
                  variant="outlined"
                  value={contact}
                  fullWidth
                  validators={[
                    "required",
                    "minStringLength:10",
                    "maxStringLength:10",
                  ]}
                  errorMessages={["this field is required"]}

                />

              </div>
              <div className="flex mb-4">
                {/* <TextField
                                className="mr-2"
                                label="Opening Balance"
                                onChange={e => setob(e.target.value)}
                                name="ob"
                                type="text"
                                size="small"
                                variant="outlined"
                                value={ob}
                                
                                fullWidth
                                
                            > */}

                {/* </TextField> */}
                <CurrencyTextField
                  label="Opening Balance"
                  variant="outlined"
                  value={ob}
                  size="small"
                  fullWidth
                  currencySymbol="SAR"
                  onChange={(event, value) => setob(value)}
                />
                <CurrencyTextField
                  className="ml-2"
                  label=" Credit Limits"
                  variant="outlined"
                  value={creditlimit}
                  maximumValue="9999999"
                  size="small"
                  fullWidth
                  currencySymbol="SAR"
                  onChange={(event, value) => setcreditlimit(value)}

                />

                <TextField
                  className="ml-2"
                  label="Credit Days"
                  variant="outlined"
                  value={creditdays}
                  maximumValue="9999999"
                  size="small"
                  fullWidth
                  onChange={(event) => setcreditdays(event.target.value)}

                />
              </div>
              <div className="flex mb-4">
                <TextField
                  className="mr-0"
                  label="Party type"
                  autoComplete="none"
                  name="selectedvalue"
                  size="small"
                  variant="outlined"
                  select
                  fullWidth
                  value={selectedValue}

                  // validators={[
                  //   "required",
                  // ]}
                  // errorMessages={["this field is required"]}
                  onChange={e => setSelectedValue(e.target.value)
                  }
                >
                  {customerList.map((item, ind) => (
                    <MenuItem value={item.value} key={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
                {/* <TextField
                                className="ml-2"
                                label="Party Code"
                                onChange={e => setpartycode(e.target.value)}
                                name="party_code"
                                size="small"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={partycode}
                            /> */}
              </div>
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  label="Vendor Id"
                  autoComplete="none"
                  onChange={e => setvendor_id(e.target.value)}
                  name="website"
                  type="text"
                  size="small"
                  variant="outlined"
                  value={vendor_id}
                  fullWidth
                />
                <TextField
                  className="ml-2"
                  label="Website URL"
                  autoComplete="none"
                  onChange={e => setwebsite(e.target.value)}
                  name="website"
                  type="text"
                  size="small"
                  variant="outlined"
                  value={website}
                  fullWidth

                />



              </div>

            </Grid>
          </Grid>
          <div>
            <Button className="mr-4 py-2" color="primary" variant="outlined" type="submit" disabled={loading}>
              <Icon>save</Icon>
              <span className="pl-2 capitalize">Save</span>
            </Button>
            <Button className="mr-4 py-2" color="secondary" variant="outlined" type="submit" onClick={() => routerHistory.push("../party/Viewparty")}>
              <Icon>cancel</Icon>
              <span className="pl-2 capitalize">cancel</span>
            </Button>

            <Button color=".bg-green" variant="outlined" type="reset" onClick={resetform} className="mr-4 py-2">
              <Icon>loop</Icon>
              <span className="pl-2 capitalize">reset</span>
            </Button>
          </div>

        </ValidatorForm>
      </Card>




    </div>

  );
};

export default Addparty;
