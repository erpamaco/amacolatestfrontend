import React, { Component, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Swal from "sweetalert2";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Card
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import useAuth from "app/hooks/useAuth";
import url from "../../views/invoice/InvoiceService"

const SimpleForm = () => {
  const [state, setState] = useState({
    date: new Date(),
  });
  const handleFormSubmit = (event) => {

   
    const formdata = {
      id: user.id,
      password: opassword,
      newpassword: npassword

    }

    if (npassword == cpassword) {

      url.post("old-password-new", formdata).then(({ data }) => {
        if (data.msg == true) {
          Swal.fire({
            title: 'Success',
            type: 'success',
            icon: 'success',
            text: 'Password changed successfully.',
          });
          resetform()
        } else {
          setmessage('Old password is Incorrect')
        }
      })

    } else {
      setmessage('New password doesn\'t match')

    }

    // url.post("old-password",formdata).then(({ data }) => {

    //   if(data.msg===false)
    //   {
    //     setmessage('Old password is Incorrect')
    //   }
    //   else
    //   {
    //     if(npassword!==cpassword)
    //     {
    //       setmessage('New password doesn\'t match')
    //     }
    //     else
    //     {
    //       // const json={
    //       //   password:npassword
    //       // }
    //       // url.put(`/users/${user.id}`,json).then(({ data }) => {
    //         // setmessage(null)
    //         Swal.fire({
    //           title: 'Success',
    //           type: 'success',
    //           icon: 'success',
    //           text: 'Password changed successfully.',
    //         });
    //         resetform()

    //       // })

    //     }
    //   }
    // })
  };
  const { user } = useAuth();
  const [opassword, setopassword] = useState('')
  const [npassword, setnpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
  const [message, setmessage] = useState('')


  // useEffect(() => {
  //   ValidatorForm.addValidationRule("isPasswordMatch", (value) => {


  //     if (value !== state.password) {
  //       return false;
  //     }
  //     return true;
  //   });
  //   return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  // }, [state.password]);



  const handlechange = (event) => {
    setopassword(event.target.value)

    const formdata = {
      id: user.id,
      password: opassword
    }
    url.get("/old-password", formdata).then(({ data }) => {

      if (!data) {
        setmessage('Old password is Incorrect')
      }

    })
  }

  const handleDateChange = (date) => {
    setState({ ...state, date });
  };
  const resetform = () => {
    setnpassword('')
    setcpassword('')
    setopassword('')
    setmessage('')

  }


  const {
    username,
    firstName,
    creditCard,
    mobile,
    password,
    confirmPassword,
    gender,
    date,
    email,
  } = state;

  return (
    <div>
      <Card className="m-sm-30 p-25" elevation={20}>
        <div className="max-w-600 mx-auto">

          <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off" width="200px">

            <TextField
              className="w-full mb-4"
              label="Old Password"
              variant="outlined"
              onChange={e => setopassword(e.target.value)}
              type="textarea"
              name="name"
              size="small"
              value={opassword}


            />


            <TextField
              className="w-full mb-4"
              label="New Password"
              variant="outlined"
              onChange={e => setnpassword(e.target.value)
                // .log(isAlive)
              }
              type="textarea"
              name="cname"
              size="small"
              value={npassword}


            />

            <TextField
              className="w-full mb-4"
              label="Confirm Password"
              autoComplete="none"
              onChange={e => setcpassword(e.target.value)}
              name="mobno"
              type="text"
              size="small"
              variant="outlined"
              value={cpassword}
              fullWidth

            />

            {message && <p className="text-error">{message}</p>}


            <div className="flex items-center ">
              <Button variant="outlined" color="primary" type="submit" >
                <Icon>save</Icon> Save
              </Button>
              <Button color=".bg-green" variant="outlined" className="ml-4" onClick={resetform}>
                <Icon>loop</Icon>
                <span className="pl-2 capitalize">reset</span>
              </Button>
              <div className="flex justify-between items-center">


                {/* <Button
          
            variant="outlined"
            color="primary"
            onClick={() => getrow()}
          >
            <Icon color="primary">remove_red_eye</Icon>view
          </Button> */}
              </div>
            </div>

          </ValidatorForm>
        </div>
      </Card>
    </div>



  );
};

export default SimpleForm;
