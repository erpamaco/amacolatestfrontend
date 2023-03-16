import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useHistory } from 'react-router';
import url, { getparties, getpaidDivision, GDIV, navigatePath } from "../../views/invoice/InvoiceService";
import { Breadcrumb } from "matx";
import { toArabic } from 'arabic-digits';
import {
  Icon,
  Grid,
  Card,
  TextField,
  MenuItem,
  Button
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab"
import "date-fns";
import Swal from "sweetalert2";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import useAuth from '../../hooks/useAuth';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/* variable telcode  holds the country code values */
const telcode = [
  { value: 91, label: "+91" },
  { value: 973, label: "+973" },
  { value: 965, label: "+965" },
  { value: 961, label: "+961" },
  { value: 968, label: "+968" },
  { value: 974, label: "+974" },
  { value: 966, label: "+966" },
  { value: 971, label: "+971" },
  { value: 967, label: "+967" },
];
/* variable prefixs holds the prefixses  values */
const prefixs = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Ms', label: 'Ms' }
];

/* variable customerList holds the Party Types values */
const customerList = [
  {
    name: "Customer",
    value: 'Customer'
  },
  {
    name: "Vendor",
    value: 'Vendor',

  },
  {
    name: "Both",
    value: 'Both'
  },
];

// Addparty Component
const Addparty = ({ open, handleClose }) => {
  let [state, setState] = useState({
    date: new Date(),
    loading: false,

  });
  const routerHistory = useHistory();

  const [partytype, setpartytype] = useState('');/*Holds the Party type */
  const [Firm_Name, setFirm_name] = useState('');/*Holds the Firm Name  */
  const [email, setemail] = useState('');/*Holds the Email */
  const [mobno, setmobno] = useState('');/*Holds the mobilenumber */
  const [mobnocode, setmobnocode] = useState(+966);/*Holds the country code for mobilenumber */
  const [landline, setlandline] = useState('');/*Holds the landline number */
  const [landlinecode, setlandlinecode] = useState(+966);/*Holds the country code for landlinenumber */
  const [vat_no, setvat_no] = useState('');/*Holds the vat number */
  const [post_box_no, setpost_box_no] = useState('');/*Holds the post box number*/
  const [country, setcountry] = useState('');/*Holds the country name*/
  const [street, setstreet] = useState('');/*Holds the street */
  const [zip_code, setzip_code] = useState('');/*Holds the zipcode */
  const [proviance, setproviance] = useState('');/*Holds the proviance */
  const [website, setwebsite] = useState('');/*Holds the website */
  const [fname, setfname] = useState('');/*Holds the firstName */
  const [lname, setlname] = useState('');/*Holds the lastName */
  const [designation, setdesignation] = useState('');/*Holds the designation */
  const [regno, setregno] = useState('');/*Holds the regno */
  const [obening_balnce, setobening_balnce] = useState(0);/*Holds the opening balance */
  const [fax, setfax] = useState('');/*Holds the fax */
  const [faxext, setfaxext] = useState('');/*Holds the faxextension */
  const [city, setcity] = useState('');/*Holds the city */
  const [contact, setcontact] = useState('');/*Holds the contact */
  const [contactcode, setcontactcode] = useState(+966);/*Holds the company contact country code */
  const [creditlimit, setcreditlimit] = useState(0);/*Holds the creditlimits */
  const [mext, setmext] = useState('');/*Holds the creditlimits */
  const [lext, setlext] = useState('');/*Holds the creditlimits */
  const [ext, setext] = useState('');/*Holds the creditlimits */
  const [creditdays, setcreditdays] = useState(0);/*Holds the credit Days */
  const [partycode, setpartycode] = useState('');/*Holds the party code */
  const [account_no, setaccount_no] = useState('');/*Holds the account number */
  const [vendor_id, setvendor_id] = useState('');/*Holds the vendor Id */
  const [bank_address, setbank_address] = useState('');/*Holds the Bank Address */
  const [bank_name, setbank_name] = useState('');/*Holds the Bank Name */
  const [iban_no, setiban_no] = useState('');/*Holds the IBAN NUMBER */
  const [address, setaddress] = useState('');/*Holds the Company Address */
  const [prefix, setprefix] = useState('');/*Holds the  prefix */
  const [paiddivision_account, setpaiddivision_account] = useState([]);/*Array Holds the DivisionList */
  const [division, setdivision] = useState([]);/*Holds the Division Id */
  const { user } = useAuth();
  const [payment_term,setpayment_term] = useState('');
  const [buildNumber,setBuildNumber] = useState('')



  let {
    loading
  } = state

  const [alllPartyDivisons,setAlllPartyDivisons] = useState([])

  const [vatList,setVatList] = useState([])
  const [regList,setRegist] = useState([])

  useEffect(() => {

    url.get(`validationParty`).then(({ data }) => {
      var regNo = data?.map((item)=>{
        return item?.registration_no?.toUpperCase()
      })
      var vatNo = data?.map((item)=>{
        return item?.vat_no?.toUpperCase()
      })
      setVatList(vatNo?.filter(Boolean))
      setRegist(regNo?.filter(Boolean))
    });


    /*getpaidDivision Function Returns the DivisionList*/
    getpaidDivision().then(({ data }) => {

      var arrVal = data.sort(function (obj1, obj2) {
        return obj1.type.localeCompare(obj2.type);
      });
      setpaiddivision_account(arrVal);
      console.log("hel",arrVal.filter(obj => obj.type === "division" && obj.name == "Trading Division" || obj.name == "Printing Division" || obj.name == "Power Division" ))
      console.log("dd",arrVal)
    });
  }, [])

  /*HandleSubmit  Function Submits the Data */
  const handleSubmit = () => {
    // setState({ ...state, loading: true });//disable the SAVE Button

    if(vatList?.includes(vat_no?.toUpperCase())){
      Swal.fire({
        title: 'Warning',
        type: 'warning',
        icon: 'warning',
        text: 'Party VAT Number is Already Existed.',
      })
        .then((result) => {
        
        })
    }else if(regList?.includes(regno?.toUpperCase())){
      Swal.fire({
        title: 'Warning',
        type: 'warning',
        icon: 'warning',
        text: 'Party Commercial Register Number is Already Existed.',
      })
        .then((result) => {
        
        })
    }else{
        setState({ ...state, loading: true });//disable the SAVE Button
    /*creating the frmdetails object*/
    const frmdetails = {
      firm_name: Firm_Name ? Firm_Name.toUpperCase() : '',
      registration_no: regno,
      vat_no: vat_no,
      post_box_no: post_box_no,
      street: street ? street : '',
      proviance: proviance ? proviance : '',
      country: country ? country : '',
      contact: contact ,
      zip_code: zip_code,
      mobno: mobno,
      lcode: landlinecode,
      mcode: mobnocode,
      landline: landline,
      email: email,
      website: website,
      city: city ? city : "",
      fax: fax + "/" + faxext,
      ext: ext,
      lext: lext,
      mext: mext,
      mext: mext,
      code: contactcode,
      fname: fname ? fname : "",
      lname: lname ? lname : "",
      designation: designation ? designation : "",
      opening_balance: parseFloat(obening_balnce).toFixed(2),
      party_type: partytype,
      credit_days: creditdays,
      credit_limit: parseFloat(creditlimit).toFixed(2),
      iban_no: iban_no,
      bank_name: bank_name,
      bank_address: bank_address ? bank_address : "",
      account_no: account_no,
      vendor_id: vendor_id,
      address: address ? address : "",
      party_code: partycode,
      prefix: prefix ? prefix : "",
      division: division,
      buildNumber: buildNumber ? buildNumber : '',
      zip_code_ar: toArabic(zip_code),
      vat_no_in_ar: toArabic(vat_no),
      payment_term: payment_term ? payment_term : '',
      user_id: user.id,
      div_id: localStorage.getItem('division')

    }



    url.post('parties', frmdetails)

      .then(function (response) {

       if(localStorage.getItem('role') == 'SA'){
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            getparties()
            routerHistory.push(navigatePath + '/party/viewparty')
          })
       }else{
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Super Admin Verification Required.',
        })
          .then((result) => {
            getparties()
            routerHistory.push(navigatePath + '/party/viewparty')
          })
       }
      })
      .catch(function (error) {

      })

    resetform()
    }



  }
  /*Function to generate the vendor code based on division selection*/
  const handleMultiselect = (index) => {

    var res = index.map((item, id) => {
     
      item['vendor_code'] = 'AMC' + (item.name.charAt(0)=='T'?'-TRD':'-PR');//Autogenerate vendor code
      return item
    })
    console.log(res)
    setdivision(res)//set division Id's one or more
  }

  // Form reset Function clears the Input
  const resetform = () => {
    setprefix('');
    setpayment_term('');
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
    setobening_balnce('');
    setpartytype('');
    setdesignation('');
    setwebsite('');
    setcreditlimit(0);
    setcreditdays(0);
    setbank_name('');
    setbank_address('');
    setiban_no('');
    setaccount_no('');

    setcontact('');
    setvendor_id('');
    setaddress('');
    setmobnocode('');
    setlandlinecode('');
    setcontactcode('');
    setdivision([]);

  };


  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "PARTY", path: "./Viewparty" },
            { name: "PARTY ENTRY" }
          ]}
        />
      </div>
      <div>
        <Card elevation={3} className="p-4">
          <ValidatorForm onError={() => null} onSubmit={handleSubmit} autoComplete="none">
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>

                <h6>CONTACT PERSON DETAILS</h6>
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
                    inputProps={{ style: { textTransform: 'uppercase' } }}
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
                    value={designation}
                    size="small"
                    onChange={e => setdesignation(e.target.value)}
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
                  validators={["isEmail"]}
                  errorMessages={["email is not valid"]}
                  value={email}
                />
                <div className="flex mb-4">
                  <TextField
                    className=""
                    autoComplete="none"
                    label="Code"
                    onChange={e => setmobnocode(e.target.value)}
                    name="mobno"
                    type="text"
                    size="small"
                    style={{ width: '100px' }}
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

                  <TextValidator
                    className="ml-2"
                    label="Mobile Number"
                    autoComplete="none"
                    onChange={e => setmobno(e.target.value)}
                    name="mobno"
                    type="text"
                    inputProps={{ style: { width: 80, marginRight: 10 } }}
                    size="small"
                    variant="outlined"
                    value={mobno || ""}
                    validators={['isNumber']}
                    // validators={['matchRegexp:^(0|[0-9][0-9]*)$']}
                    errorMessages={["Number is not valid"]}


                  />
                  <TextField
                    className="ml-2"
                    autoComplete="none"
                    label="Ext"
                    onChange={e => setmext(e.target.value)}
                    name="mobno"
                    type="text"
                    size="small"
                    style={{ width: '50px' }}
                    variant="outlined"
                    value={mext}
                    // fullWidth
                    selected
                  ></TextField>
                  <TextField
                    className="ml-2"
                    autoComplete="none"
                    label="Code"
                    onChange={e => setlandlinecode(e.target.value)}
                    name="mobno"
                    type="text"
                    size="small"
                    style={{ width: '100px' }}
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
                  
                  <TextValidator
                    className="ml-2"
                    label="Landline Number"
                    autoComplete="none"
                    onChange={e => setlandline(e.target.value)}
                    name="landline"
                    inputProps={{ style: { width: 100 } }}
                    size="small"
                    variant="outlined"
                    value={landline}
                    type="mobile"
                    validators={['isNumber']}
                    // validators={['matchRegexp:^(0|[0-9][0-9]*)$']}
                    errorMessages={["Number is not valid"]}

                  />
                  <TextField
                    className="ml-2"
                    autoComplete="none"
                    label="Ext"
                    onChange={e => setlext(e.target.value)}
                    name="mobno"
                    type="text"
                    size="small"
                    style={{ width: '50px' }}
                    variant="outlined"
                    value={lext}
                    // fullWidth
                    selected
                  ></TextField>
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
                  multiline
                  fullWidth

                />
                <br></br>
                <br></br>
                <h6>BANK DETAILS</h6>
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
                  multiline
                  size="small"
                  variant="outlined"
                  value={bank_address}
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <h6>COMPANY DETAILS</h6>
                <TextValidator
                  className="mb-4 w-full"
                  label="Company Name"
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  autoComplete="none"
                  onChange={e => setFirm_name(e.target.value)}
                  type="text"
                  name="Firm_Name"
                  variant="outlined"
                  size="small"
                  required
                  value={Firm_Name}

                />
                <div className="flex mb-4">
                  <TextField
                    className="mr-2"
                    autoComplete="none"
                    label="Commercial Registration Number"
                    inputProps={{ style: { textTransform: 'capitalize' } }}
                    variant="outlined"
                    onChange={e => setregno(e.target.value)}
                    name="regno"
                    size="small"
                    value={regno}
                    validators={[
                      // "minStringLength: 15",
                      "maxStringLength: 11",
                    ]}
                    errorMessages={["Invalid Registraion Number"]}
                    fullWidth
                  />


                  <TextValidator
                    className="ml-2"
                    label="VAT Number"
                    autoComplete="none"
                    onChange={e => setvat_no(e.target.value)}
                    autoComplete="none"
                    variant="outlined"
                    name="vat_no"
                    value={proviance}
                    size="small"
                    // inputProps={{ style: { width: 120, marginRight: 10 } }}
                    validators={['matchRegexp:^(0|[0-9][0-9]{14})$']}
                    errorMessages={["Invalid VAT Number"]}
                    value={vat_no}
                    fullWidth
                  />
                </div>

                <div className="flex mb-4">
                
                    <TextField
                 className="mr-2"
                  label="P.O. Box"
                  autoComplete="none"
                  onChange={e => setpost_box_no(e.target.value)}
                  type="text"
                  name="post_box_no"
                  size="small"
                  variant="outlined"
                  value={post_box_no}
                  fullWidth
                />


                  <TextField
                    className="ml-2"
                    label="Buliding Number"
                    // inputProps={{ style: { textTransform: 'capitalize' } }}
                    autoComplete="none"
                    variant="outlined"
                    type='text'
                    value={buildNumber}
                    size="small"
                    name='buildNumber'
                    onChange={e => setBuildNumber(e.target.value)}
                    fullWidth
                  />
                </div>

              
                <TextValidator
                  className="mb-4 w-full"
                  autoComplete="none"
                  label="Street"
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                  onChange={(e) => setstreet(e.target.value)}
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
                    label="Zip Code"
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
                    label="Code"
                    autoComplete="none"
                    onChange={e => setcontactcode(e.target.value)}
                    name="mobno"
                    type="text"
                    size="small"
                    style={{ width: '260px' }}
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
                  <TextValidator
                    className="ml-2"
                    label="Contact"
                    autoComplete="none"
                    onChange={e => setcontact(e.target.value)}
                    name="contact"
                    type="text"
                    inputProps={{ style: { width: 90, marginRight: 10 } }}
                    size="small"
                    variant="outlined"
                    value={contact}
                    validators={['matchRegexp:^(0|[0-9][0-9]*)$']}
                    errorMessages={["Number is not valid"]}



                  />
                  <TextField
                    className="ml-2"
                    autoComplete="none"
                    label="Ext."
                    style={{ width: '180px' }}
                    onChange={e => setext(e.target.value)}
                    name="fax"
                    type="text"
                    size="small"
                    variant="outlined"
                    value={ext}
                    fullWidth

                  />


                </div>
                <div className="flex mb-4">



                  <CurrencyTextField
                    label="Opening Balance"
                    variant="outlined"
                    value={obening_balnce}
                    size="small"
                    fullWidth
                    currencySymbol="SAR"
                    onChange={(event, value) => setobening_balnce(value)}
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

                  <TextValidator
                    className="ml-2"
                    label="Credit Days"
                    variant="outlined"
                    value={creditdays}
                    maximumValue="9999999"
                    size="small"
                    fullWidth
                    validators={['isNumber']}
                    errorMessages={["Number is not valid"]}
                    onChange={(event) => setcreditdays(event.target.value)}

                  />
                </div>
                <div className="flex mb-4">
                  <TextField
                    className="mr-0"
                    label="Party Type"
                    autoComplete="none"
                    name="partytype"
                    size="small"
                    variant="outlined"
                    required
                    select
                    fullWidth
                    value={partytype}
                    onChange={e => setpartytype(e.target.value)
                    }
                  >
                    {customerList.map((item, ind) => (
                      <MenuItem value={item.value} key={item}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    className="ml-2"
                    label="Payment Term"
                    autoComplete="none"
                    onChange={e => setpayment_term(e.target.value)}
                    name="payment_term"
                    type="text"
                    size="small"
                    variant="outlined"
                    value={payment_term}
                    fullWidth
                  />
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
                <Autocomplete
                  multiple

                  id="checkboxes-tags-demo"
                  size="small"
                  options={paiddivision_account.filter(obj => obj.type === "division" && obj.name == "Trading Division" || obj.name == "Printing Division" || obj.name == "Power Division"  || obj.name == "Rental Division")}

                  getOptionLabel={(option) => option.name}
                  onChange={(event: any, value: string[] | null) => handleMultiselect(value)}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}

                      />
                      <td>{option.name}</td>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Divisions" placeholder="Divisions" inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                      required: division.length === 0
                    }}
                      required={true} />
                  )}
                />

              </Grid>
            </Grid>
            <div>
              <Button className="mr-4 py-2" color="primary" variant="outlined" type="submit" disabled={loading}>
                <Icon>save</Icon>
                <span className="pl-2 capitalize">SAVE</span>
              </Button>
              <Button className="mr-4 py-2" color="secondary" variant="outlined" type="submit" onClick={() => routerHistory.push("../party/Viewparty")}>
                <Icon>cancel</Icon>
                <span className="pl-2 capitalize">CANCEL</span>
              </Button>

              <Button color=".bg-green" variant="outlined" type="reset" onClick={resetform} className="mr-4 py-2">
                <Icon>loop</Icon>
                <span className="pl-2 capitalize">RESET</span>
              </Button>
            </div>

          </ValidatorForm>
        </Card>
      </div>
    </div>
  );
};

export default Addparty;
