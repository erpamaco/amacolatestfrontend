/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useHistory, useParams } from 'react-router';
import {
  Button,
  Icon,
  Grid,
  Card,
  TextField,
  MenuItem,
  Chip
} from "@material-ui/core";
import { Breadcrumb } from "matx";
import { Autocomplete } from "@material-ui/lab";
import { toArabic } from 'arabic-digits';
import "date-fns";
import Swal from "sweetalert2";
import url, { getparties, getpaidDivision, navigatePath } from "../invoice/InvoiceService";
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import useAuth from '../../hooks/useAuth';

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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const customerList = [
  'Vendor',
  'Customer',


  'Both',

];

const SimpleForm = () => {
  const [state, setState] = useState({
    date: new Date(),
  });

  const [Firm_Name, setFirm_name] = useState('');
  const [vat_no, setvat_no] = useState('');
  const [post_box_no, setpost_box_no] = useState('');
  const [country, setcountry] = useState('');
  const [street, setstreet] = useState('');
  const [zip_code, setzip_code] = useState('');
  const [proviance, setproviance] = useState('');
  const [website, setwebsite] = useState('');
  const [regno, setregno] = useState('');
  const [opening_balnce, setopening_balnce] = useState('');
  const [fax, setfax] = useState('');
  const [code, setcode] = useState('');
  const [ext, setext] = useState('');
  const [city, setcity] = useState('');
  const [contact, setcontact] = useState('');
  const [partytype, setpartytype] = useState('');
  const [creditlimit, setcreditlimit] = useState('');
  const [creditdays, setcreditdays] = useState('');
  const [partycode, setpartycode] = useState('');
  const [account_no, setaccount_no] = useState('');
  const [vendor_id, setvendor_id] = useState('');
  const [bank_address, setbank_address] = useState('');
  const [bank_name, setbank_name] = useState('');
  const [iban_no, setiban_no] = useState('');
  const [company_name_ar, setcompany_name_ar] = useState('');
  const [loading, setloading] = useState(false);
  const [paiddivision_account, setpaiddivision_account] = useState([]);
  const [division, setdivision] = useState([]);
  const [filterArr, setfilterArr] = useState([]);
  const routerHistory = useHistory();
  const [payment_term,setpayment_term] = useState('');
  const [buildNumber,setBuildNumber] = useState('')




  // get the id value
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get('id'));
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();


  useEffect(() => {

    url.get(`validationParty`).then(({ data }) => {
      var regNo = data?.filter(obj => parseInt(obj.id) !== parseInt(id))?.map((item)=>{
        return item?.registration_no?.toUpperCase()
      })
      var vatNo = data?.filter(obj => parseInt(obj.id) !== parseInt(id))?.map((item)=>{
        return item?.vat_no?.toUpperCase()
      })
      setVatList(vatNo?.filter(Boolean))
      setRegist(regNo?.filter(Boolean))
    });

    var obj;
    url.get("parties/" + id).then(({ data }) => {

      getparties()
      if (isAlive) setUserList(data);

      setBuildNumber(data[0].building_no)
      setFirm_name(data[0].firm_name)
      setvat_no(data[0].vat_no)
      setpost_box_no(data[0].post_box_no)
      setstreet(data[0].street)
      setcity(data[0].city)
      setpayment_term(data[0].payment_term)

      setproviance(data[0].proviance)
      setcountry(data[0].country)
      setzip_code(data[0].zip_code)
      setcompany_name_ar(data[0].firm_name_in_ar)
      setfax(data[0].fax)
      setwebsite(data[0].website)
      setopening_balnce(data[0].opening_balance)
      setregno(data[0]?.registration_no)
      setcontact(data[0].contact)
      setpartytype(data[0].party_type)
      setpartycode(data[0].party_code)
      setcreditdays(data[0].credit_days)
      setcreditlimit(data[0].credit_limit)
      setvendor_id(data[0].vendor_id)
      setbank_address(data[0].bank_address)
      setaccount_no(data[0].account_no)
      setbank_name(data[0].bank_name)
      setiban_no(data[0].iban_no)
      setext(data[0].ext)
      setcode(data[0].code)



    })
    url.get("parties/" + id).then(response => response)
      .then(data => obj = data)
      .then(() =>


        getpaidDivision().then(({ data }) => {

          var arrVal = data.sort(function (obj1, obj2) {
            return obj1.type.localeCompare(obj2.type);
          });

          // var res=obj.data[0].partyDivision.filter(item=>);
          let result = arrVal.filter(o1 => obj.data[0].partyDivision.some(o2 => o1.id == o2.div_id));
          // let obj = arrVal. find(o => o. name === 'string 1');
          // console.log(obj.data)
          // console.log(arrVal)
          setfilterArr(result)
          setpaiddivision_account(arrVal);

        })
      );
    return () => setIsAlive(false);


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlive]);


  const [vatList,setVatList] = useState([])
  const [regList,setRegist] = useState([])

  const handleSubmit = () => {


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


    setloading(true);
    const frmdetails = {
      firm_name: Firm_Name ? (Firm_Name.toUpperCase()) : '',
      registration_no: regno,
      vat_no: vat_no,
      post_box_no: post_box_no,
      street: street ? (street) : '',
      proviance: proviance ? (proviance) : '',
      country: country ? (country) : '',
      contact: contact,
      ext: ext,
      code: code,
      zip_code: zip_code,
      website: website,
      city: city ? (city) : '',
      fax: fax,
      opening_balance: parseFloat(opening_balnce).toFixed(2),
      party_type: partytype,
      credit_days: creditdays,
      credit_limit: parseFloat(creditlimit).toFixed(2),
      iban_no: iban_no,
      bank_name: bank_name,
      bank_address: bank_address ? (bank_address) : '',
      account_no: account_no,
      vendor_id: vendor_id,
      buildNumber: buildNumber ? buildNumber : '',
      party_code: partycode,
      payment_term: payment_term,
      company_name_ar: company_name_ar,
      division: division,
      zip_code_ar: zip_code ? toArabic(zip_code) : '',
      vat_no_in_ar: vat_no ? toArabic(vat_no) : '',
      user_id: user.id,
      div_id: localStorage.getItem('division')
    }



    url.put("parties/" + id, frmdetails)
      .then(function (response) {
        console.log('division',division)
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            routerHistory.push(`/pages/view-customer/${id}`)
          })
      })
      .catch(function (error) {

      })
    }

  }
  const handleMultiselect = (index) => {
    setfilterArr(index)
    var res = index.map((item, id) => {

      item['vendor_code'] = 'AMC' + (item.name.charAt(0)=='T'?'-TRD':'-PRD');
      return item
    })
    //  console.log(res)
    setdivision(index)

  }




  // const {
  // } = state;

  return (
    <div>
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "PARTY", path: "./Viewparty" },
              { name: "PARTY DETAILS", path: `/pages/view-customer/${id}` },
              { name: "PARTY EDIT " }
            ]}
          />
        </div>
        <Card className="p-4" elevation={3}>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>

                <h6>Company Details</h6>
                <TextValidator
                  className="mb-4 w-full"
                  label="Company Name"
                  inputProps={{ style: { textTransform: 'uppercase' } }}
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
                  <TextValidator
                    className="mr-2"
                    label="Commercial Registration Number"
                    onChange={e => setregno(e.target.value)}
                    name="regno"
                    size="small"
                    type="text"
                    variant="outlined"
                    value={regno}
                    style={{ width: '230px' }}
                  // validators={[
                  // "minStringLength: 15",
                  //   // "maxStringLength: 11",
                  // ]}
                  // errorMessages={["Invalid Registraion Number"]}

                  />

                  <TextValidator
                    className="ml-2"
                    label="VAT Number"
                    onChange={e => setvat_no(e.target.value)}
                    name="vat_no"
                    size="small"
                    type="text"
                    // style={{padding: "665px"}}
                    variant="outlined"
                    value={vat_no}
                    validators={['matchRegexp:^(0|[0-9][0-9]{14})$']}
                    errorMessages={["Invalid VAT Number"]}
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
                    variant="outlined"
                    value={proviance}
                    size="small"
                    onChange={e => setproviance(e.target.value)}
                    fullWidth
                  />
                </div>
                {/* <div className="flex mb-4">
          <TextField
            className="mr-2"
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
            inputProps={{style: {textTransform: 'capitalize'}}}
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
                                label="Fax"
                                onChange={e => setfax(e.target.value)}
                                name="fax"
                                type="text"
                                size="small"
                                variant="outlined"
                                value={fax}
                                fullWidth
                                
                            />
                            <TextValidator
                                className="ml-2"
                                label="Contact"
                                onChange={e => setcontact(e.target.value)}
                                name="contact"
                                type="text"
                                size="small"
                                variant="outlined"
                                inputProps={{style: {width:300,paddingRight:50}}}
                                value={contact}
                                validators={['matchRegexp:^(0|[1-9][0-9]*)$']}
                                errorMessages={["Number is not valid"]}
                                
                            />
                            </div>
                            <div className="flex mb-4">
                            <CurrencyTextField
			                          label="Opening Balance"
			                          variant="outlined"
			                          value={opening_balnce}
                                size="small"
                                fullWidth
			                          currencySymbol="SAR"
			                          onChange={(event, value)=> setopening_balnce(value)}
	                            />
                            <CurrencyTextField
                                className="ml-2"
                                label=" Credit Limits"
			                          variant="outlined"
			                          value={creditlimit}
                                maximumvalue="9999999"
                                size="small"
                                fullWidth
			                          currencySymbol="SAR"
			                          onChange={(event, value)=> setcreditlimit(value)}
                              
                            />
                        
                        <TextField
                                className="ml-2"
                                label="Credit Days"
			                          variant="outlined"
			                          value={creditdays}
                                maximumvalue="9999999"
                                size="small"
                                fullWidth
			                          onChange={(event)=> setcreditdays(event.target.value)}
                              
                            />
                            </div>
                            <div className="flex mb-4">
                             
      <TextField
                className="mr-0"
                variant="outlined"
                label="Party Type"
                size="small"
                value={partytype}
                onChange={e => setpartytype(e.target.value)
                } 
                fullWidth
                select
              >
                {customerList.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
                  
                              </div>
                              
                      <div className="flex mb-4">
                      <TextField
                                className="mr-2"
                                label="Vendor Id"
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
      options={paiddivision_account.filter(obj=>obj.type==="division")}
      getOptionLabel={(option) => option.name}
      onChange={(event: any, value: string[] | null) =>handleMultiselect(value)}
      getOptionSelected={(option, value) => option.id === value.id}
      value={filterArr}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            // disabled={filterArr.indexOf(option) !== -1}
          />
        ))
      }
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
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} style={{width:560}} className="mb-4" variant="outlined" label="Divisions"  />
      )}
    />       
                             */}






              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <div className="flex mb-4 mt-5">
                  <TextField
                    className="mr-2"
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
                    label="Fax"
                    onChange={e => setfax(e.target.value)}
                    style={{ width: '120px' }}
                    name="fax"
                    type="text"
                    size="small"
                    variant="outlined"
                    value={fax}
                    fullWidth

                  />
                  <TextField
                    className=""
                    autoComplete="none"
                    label="Code"
                    onChange={e => setcode(e.target.value)}
                    name="mobno"
                    type="text"
                    size="small"
                    style={{ width: '100px' }}
                    variant="outlined"
                    value={code}
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
                    label="Contact"
                    onChange={e => setcontact(e.target.value)}
                    name="contact"
                    type="text"
                    size="small"
                    variant="outlined"
                    inputProps={{ style: { width: 180, paddingRight: 50 } }}
                    value={contact}
                    validators={['isNumber']}
                    errorMessages={["Number is not valid"]}

                  />
                  <TextField
                    className="ml-2"
                    autoComplete="none"
                    label="Ext"
                    onChange={e => setext(e.target.value)}
                    name="mobno"
                    type="text"
                    size="small"
                    style={{ width: '80px' }}
                    variant="outlined"
                    value={ext}
                    // fullWidth
                    selected
                  ></TextField>
                </div>
                <div className="flex mb-4">
                  <CurrencyTextField
                    label="Opening Balance"
                    variant="outlined"
                    value={opening_balnce}
                    size="small"
                    fullWidth
                    currencySymbol="SAR"
                    onChange={(event, value) => setopening_balnce(value)}
                  />
                  <CurrencyTextField
                    className="ml-2"
                    label=" Credit Limits"
                    variant="outlined"
                    value={creditlimit}
                    maximumvalue="9999999"
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
                    maximumvalue="9999999"
                    size="small"
                    validators={['isNumber']}
                    errorMessages={["Number is not valid"]}
                    
                    fullWidth
                    onChange={(event) => setcreditdays(event.target.value)}

                  />
                </div>
                <div className="flex mb-4">

                  <TextField
                    className="mr-0"
                    variant="outlined"
                    label="Party Type"
                    size="small"
                    value={partytype}
                    onChange={e => setpartytype(e.target.value)
                    }
                    fullWidth
                    select
                  >
                    {customerList.map((item) => (
                      <MenuItem value={item} key={item}>
                        {item}
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
                  options={paiddivision_account.filter(obj => obj.type === "division")}
                  getOptionLabel={(option) => option.name}
                  onChange={(event: any, value: string[] | null) => handleMultiselect(value)}
                  getOptionSelected={(option, value) => option.id === value.id}
                  value={filterArr}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (

                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                      // disabled={filterArr.indexOf(option) !== -1}
                      />
                    ))
                  }
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
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField {...params} style={{ width: 560 }} className="mb-4" variant="outlined" label="Divisions" />
                  )}
                />
              </Grid>
              {/* <Grid item lg={6} md={6} sm={12} xs={12}>
          <h6>Bank Details</h6> 
                            <TextField
                                className="mb-4 w-full"
                                label="Bank Account Number"
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
                                inputProps={{style: {textTransform: 'capitalize'}}}
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
                                onChange={e => setiban_no(e.target.value)}
                                name="website"
                                type="text"
                                size="small"
                                variant="outlined"
                                value={iban_no}
                               />
                               <TextField
                                className="mb-4 w-full"
                                label="Bank Address"
                                onChange={e => setbank_address(e.target.value)}
                                inputProps={{style: {textTransform: 'capitalize'}}}
                                name="website"
                                type="text"
                                size="small"
                                variant="outlined"
                                value={bank_address}
                                />
                            
                            
          </Grid> */}
            </Grid>
            <Button className="mr-4 py-2" color="primary" variant="outlined" type="submit"
              disabled={loading}
            >
              <Icon>save</Icon>
              <span className="pl-2 capitalize">SAVE</span>
            </Button>
            <Button className="mr-4 py-2" color="secondary" variant="outlined" type="submit" onClick={() => routerHistory.push(`/pages/view-customer/${id}`)}>
              <Icon>cancel</Icon>
              <span className="pl-2 capitalize">CANCEL</span>
            </Button>
          </ValidatorForm>
        </Card>
      </div>
    </div>
  );
};

export default SimpleForm;