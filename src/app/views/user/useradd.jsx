import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  Dialog,
  Button,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Icon, TextField, Radio, RadioGroup, Checkbox,
  FormControlLabel
} from "@material-ui/core";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import FormLabel from "@material-ui/core/FormLabel";
import Swal from "sweetalert2";
import url, { capitalize_arr } from "../invoice/InvoiceService"
import { FormGroup } from "@material-ui/core";
import MemberEditorDialog1 from "./designation";

const MemberEditorDialog = ({ uid, open, setIsAlive2, handleClose, userid, userList }) => {
  const [state, setState] = useState({
    name: "abc",
    email: "",
    phone: "",
    balance: "",
    age: "",
    company: "",
    address: "",
    isActive: false,

  });
  const [name, setname] = useState('');
  const [nick_name, setnick_name] = useState('');
  const [opening_bal, setopening_bal] = useState('0');
  const [profit_per, setprofit_per] = useState('0.00');
  const [email, setemail] = useState('');
  const [code, setcode] = useState('');
  const [contact, setcontact] = useState('');
  const [password, setpassword] = useState('');
  const [designation, setdesignation] = useState('');
  const [prefix, setprefix] = useState('');
  const [usertype, setusertype] = useState(true);
  const [Roles, setRoles] = useState([]);
  const [isAlive, setIsAlive] = useState(false);
  const [role_id, setrole_id] = useState('');
  const [isTrue, setisTrue] = useState(false);
  const [divisions, setdivisions] = useState([]);
  const [designationList, setdesignationList] = useState([]);
  const [value, setValue] = useState();
  const max = 100;
  const min = 0;

  const [
    shouldOpenEditorDialog1,
    setshouldOpenEditorDialog1,
  ] = useState(false);

  const [checked, setchecked] = useState(false);
  const prefixs = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Ms', label: 'Ms' }
  ];




  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const telcode = [
    { value: "+973", label: "+973" },
    { value: "+965", label: "+965" },
    { value: "+961", label: "+961" },
    { value: "+968", label: "+968" },
    { value: "+974", label: "+974" },
    { value: "+966", label: "+966" },
    { value: "+971", label: "+971" },
    { value: "+967", label: "+967" },

  ];


  const handleChange = (event, id) => {




    const arr = divisions.map((element, i) => {

      if (element.id === id) {

        element.check = !element.check




      }
      return element

    })
    setdivisions(arr)


  };


  const handleDialogCloses = () => {
    setshouldOpenEditorDialog1(false);

  };

  const error = divisions.filter(v => v).length !== 1;

  useEffect(() => {
    // console.log(setIsAlive2, 'ss')
    let tempList;
    url.get('roles').then(({ data }) => {
      setRoles(data)


    })
    url.get("division").then(({ data }) => {
      tempList = data
      tempList.map((element, i) => {

        element.check = false;

        return element;
      })
      setdivisions(tempList)

      // setdivisions(data)
      // console.log(tempList)

    }).then(data => console.log(tempList))
      .then(() => {

        if (userid) {
          url.get(`users/${userid}`).then(({ data }) => {
            setname(data.name)
            setnick_name(data.nick_name)
            setemail(data.email)
            setprefix(data.prefix)

            setdesignation(data.designation)
            setdesignationList(data.designationList)
            var res = data?.contact?.slice(0, 4);

            setcode(res)
            var con = data?.contact?.slice(4,);


            setcontact(con)
            setpassword(data.password)
            setrole_id(data.role_id)


            if (data?.investments[0]?.status) {
              setprofit_per(data?.investments[0]?.profit_per)
              setchecked(true)
              setopening_bal(data?.investments[0]?.opening_balance)
            }


            var result = tempList.filter(function (o1) {
              data.divisions.some(function (o2) {
                if (o1.id == o2.div_id) {
                  return o1.check = true;
                }

                // return the ones with equal id
              });
              return o1
            });

            setdivisions(result)
            // console.log(tempList.filter(obj=>obj.id===divisions.id).map((item)))
            // url.get("division").then(({data})=>{
            //   //  setdivisions(data)
            //     console.log(data.filter)

            // })

          })


        }
      })
    setIsAlive(true)
  }, [isAlive])
  const handleFormSubmit = () => {
    if (userid) {
      const formdata = {
        name: capitalize_arr(name),
        password: password,
        contact: code + contact,
        role_id: role_id,
        email: email,
        // designation:capitalize_arr(designation),
        designationList: designationList,
        prefix: prefix,
        nick_name: nick_name,
        divisions: JSON.stringify(divisions),
        checked: checked,
        opening_bal: opening_bal,
        profit_per: profit_per
      }
      // console.log(designationList)
      url.put(`users/${userid}`, formdata).then(function (data) {
        // url.get('users').then(({ data }) => {
        //    userList(data)


        // })
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        });
        handleClose()
      })



    }

    else {
      const formdata = {
        name: capitalize_arr(name),
        password: password,
        contact: code + contact,
        role_id: role_id,
        email: email,
        // designation:capitalize_arr(designation),
        prefix: prefix,
        nick_name,
        divisions: JSON.stringify(divisions),
        designationList: JSON.stringify(designationList),
        checked: checked,
        opening_bal: opening_bal,
        profit_per: profit_per
      }

      // console.log(formdata)
      url.post('users', formdata).then(({ data }) => {
        // console.log(data)
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        });

        handleClose()



      })

        .catch(function (error) {

        })
    }
  }



  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{ zIndex: 1000 }} fullWidth={fullWidth}
      maxWidth={maxWidth}>
      <div className="p-6"  >


        {!userid ? (<h4 className="mb-5">ADD USER</h4>) : <h4 className="mb-5">EDIT USER</h4>}

        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">

          <p className="mt-0 mb-1">
            Please Select the  Divison
          </p>
          <FormGroup row>
            {divisions.map((item, ind) => (
              <FormControlLabel
                // error={error}
                className="block h-32"

                control={<Checkbox required={divisions.map((item) => { return (item?.check) }).includes(true) ? false : true} />}
                label={item.name}
                value={item.check}
                checked={item.check ? true : false}
                name={item.check}

                onChange={(e) => handleChange(e, item.id)}
                key={ind}
              />
            ))}
          </FormGroup>
          <div className="flex">
            <TextField
              className="mr-2"
              autoComplete="none"
              label="Prefix"
              onChange={e => setprefix(e.target.value)}
              name="mobno"
              type="text"
              size="small"
              style={{ width: '200px' }}
              variant="outlined"
              value={prefix}
              // fullWidth
              select
            >
              {prefixs.map((item, id) =>
              (<MenuItem value={item.value}>
                {item.label}
              </MenuItem>))}
            </TextField>
            <TextField
              className="w-full mb-4 mr-2"
              label="Name"
              variant="outlined"
              inputProps={{ style: { textTransform: 'capitalize' } }}
              onChange={e => setname(e.target.value)
                // .log(isAlive)
              }
              type="textarea"
              name="name"
              size="small"
              value={name}


            />
            <TextField
              className="w-full mb-4"
              label="Nick Name"
              variant="outlined"
              inputProps={{ style: { textTransform: 'capitalize' } }}
              onChange={e => setnick_name(e.target.value)
                // .log(isAlive)
              }
              type="textarea"
              name="nick_name"
              size="small"
              value={nick_name}


            />
          </div>


          <TextField
            className="w-full mb-4"
            label="Email"
            variant="outlined"
            onChange={e => setemail(e.target.value)
              // .log(isAlive)
            }
            type="email"
            name="cname"
            size="small"
            value={email}


          />
          {/* <TextField
                className="w-full mb-4"
                label="Designation"
                inputProps={{style: {textTransform: 'capitalize'}}}
                variant="outlined"
                onChange={e => setdesignation(e.target.value)
                  // .log(isAlive)
                }
                type="textarea"
                name="name"
                size="small"
                value={designation}
               
                
              /> */}
          <Button onClick={() => setshouldOpenEditorDialog1(true)} variant="outlined" startIcon={<Icon >add</Icon>}>
            Designation
          </Button>
          <br />
          <br />
          {/* <Icon onClick={() => setshouldOpenEditorDialog1(true)}>add</Icon> */}

          <div className="flex mb-4">
            <TextField
              className="mr-2"
              autoComplete="none"
              label="Code"
              onChange={e => setcode(e.target.value)}
              name="mobno"
              type="text"
              size="small"
              style={{ width: '250px' }}
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
            <TextField
              className="w-full mb-4"
              label="Contact Number"
              autoComplete="none"
              onChange={e => setcontact(e.target.value)}
              name="mobno"
              type="number"
              size="small"
              variant="outlined"
              value={contact}
              fullWidth

            />
          </div>
          {!userid && (<TextField
            className="w-full mb-4"
            label="Password"
            autoComplete="none"
            onChange={e => setpassword(e.target.value)}
            name="mobno"
            type="text"
            size="small"
            variant="outlined"
            value={password}
            fullWidth

          />)}

          <TextValidator
            className="w-full mb-4"
            label="Roles"

            variant="outlined"
            onChange={e => setrole_id(e.target.value)
              // .log(isAlive)
            }
            type="text"
            name="cname"
            size="small"
            value={role_id}

            select
          >
            {Roles.map((item, ind) => (
              <MenuItem value={item.id} key={item}>
                {item.name}
              </MenuItem>
            ))}
          </TextValidator>
          <>
            <FormControlLabel
              value={checked}
              control={<Checkbox checked={checked} color="secondary" />}
              label="INVESTMENT"
              onChange={e => setchecked(!checked)}
              labelPlacement="end"
            />
            {checked && (
              //  <TextField
              //             className="w-full mb-4"
              //             label="Opening Balance"
              //             autoComplete="none"
              //             onChange={e => setopening_bal(e.target.value)}
              //             name="mobno"
              //             type="text"
              //             size="small"
              //             variant="outlined"
              //             value={opening_bal}
              //             fullWidth

              //         />
              <CurrencyTextField
                label="Opening Balance"
                className="w-full mb-4"
                variant="outlined"
                value={opening_bal}
                size="small"
                fullWidth
                currencySymbol="SAR"
                onChange={(event, value) => setopening_bal(value)}
              />
            )}
            {checked && (<TextField
              className="w-full mb-4"
              label="Profit %"
              type="text"
              autoComplete="none"
              onChange={e => setprofit_per(e.target.value)}
              // onChange={(e) => {
              //   var value = parseFloat(e.target.value);

              //   if (value > max) value = max;
              //   if (value < min) value = min;

              //   setprofit_per(value);
              // }}
              name="mobno"
              maxLength="100"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              size="small"
              variant="outlined"
              value={profit_per}
              fullWidth

            />)}
          </>





          <div className="flex  items-center">
            <Button variant="outlined" color="primary" type="submit" className="py-2">
              <Icon>save</Icon> SAVE
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              className="py-2 ml-2"
            >
              <Icon>cancel</Icon>CANCEL
            </Button>


          </div>


        </ValidatorForm>
        {shouldOpenEditorDialog1 && (
          <MemberEditorDialog1
            handleClose={handleDialogCloses}
            open={shouldOpenEditorDialog1}
            userid={userid}
            designationList={designationList}


          />
        )}

      </div>
    </Dialog>

  );
};

export default MemberEditorDialog;
