import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
} from "@material-ui/core";
import history from "history.js";
import { useHistory } from 'react-router';

import { ValidatorForm } from "react-material-ui-form-validator";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import MenuItem from "@material-ui/core/MenuItem";
import { Icon, TextField, Select, InputLabel, FormControl, FormGroup } from "@material-ui/core";
import Swal from "sweetalert2";
import useAuth from 'app/hooks/useAuth'
import url, { getpaymentaccount, getcompanybank } from "../invoice/InvoiceService";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const MemberEditorDialog1 = ({ uid, open, handleClose, catid, catList, id }) => {
  const [state, setState] = useState({
    name: "abc",
    email: "",
    phone: "",
    balance: "",
    age: "",
    company: "",
    address: "",
    isActive: false,
    isAlive: true,
  });
  const routerHistory = useHistory();

  const [amount, setamount] = useState('');
  const [received_date, setreceived_date] = useState(new Date());
  const [narration, setnarration] = useState('');
  const [payment_account_id, setpayment_account_id] = useState('');
  const [received_by, setreceived_by] = useState('');
  const [paymentaccount, setpaymentaccount] = useState([]);
  const [check_no, setcheck_no] = useState();
  const [bank_id, setbank_id] = useState();
  const [companybank, setcompanybank] = useState([]);
  const [payment_mode, setpayment_mode] = useState('');
  const { user } = useAuth()




  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const handleDateChange = (date) => {
    setreceived_date(date)
  };

  const option = [
    {
      name: 'Cash',
      value: 'cash'
    },
    //   {
    //     name:'cheque',
    //     value:'cheque'
    // },
    {
      name: 'Bank Transfer',
      value: 'banktransfer'
    },
    {
      name: 'Bank Deposit',
      value: 'bankdeposit'
    }
  ]
  const option1 = [
    {
      name: 'Cash',
      value: 'cash'
    },
    //   {
    //     name:'cheque',
    //     value:'cheque'
    // },
    {
      name: 'Bank Transfer',
      value: 'banktransfer'
    },
    {
      name: 'Bank Deposit',
      value: 'bankdeposit'
    }
  ]
  const handleFormSubmit = () => {

    const formdata = {

      amount: amount ? amount : '',
      received_date: received_date,
      narration: narration,
      payment_mode: payment_mode,
      bank_id: bank_id,
      payment_account_id,
      id: id,
      received_by: received_by,
      div_id: localStorage.getItem('division'),
      user_id: user.id,


    }
    if (id) {
      url.post('updateAdvancePay ', formdata)
        .then(function (response) {


          Swal.fire({
            title: 'Success',
            type: 'success',
            icon: 'success',
            text: 'Data updated successfully.',
          });
          handleClose()
          routerHistory.push('/transaction')
        })
        .catch(function (error) {

        })
    }
    else {
      url.post('advance-payments', formdata)
        .then(function (response) {


          Swal.fire({
            title: 'Success',
            type: 'success',
            icon: 'success',
            text: 'Data saved successfully.',
          });
          handleClose()
          routerHistory.push('/transaction')
        })
        .catch(function (error) {

        })
    }
  }

  const setcatid = () => {


    handleClose()
  }

  const [show, setShow] = useState(true)

  const setreceived_byfun = (e) => {
    setreceived_by(e)
    console.log(payment_account_id)
    const r = paymentaccount.filter(obj => obj.id == e)
    const p = paymentaccount.filter(obj => obj.id == payment_account_id)
    if (r[0]?.type === 'personal' && p[0]?.type === 'personal') {
      setShow(false)
      setpayment_mode('cash')
    } else {
      setShow(true)
      setpayment_mode('')
    }
  }

  useEffect(() => {

    getpaymentaccount().then(({ data }) => {
      setpaymentaccount(data)


    });
    getcompanybank().then(({ data }) => {
      setcompanybank(data)


    })
    if (id) {
      url.get('advance-payments/' + id).then(({ data }) => {
        // console.log(data.party_id)
        setpayment_account_id(data[0]?.payment_account_id)
        setreceived_by(data[0]?.received_by)
        setamount(data[0]?.amount)
        setnarration(data[0]?.narration)
        setpayment_mode(data[0]?.payment_mode)

      })
    }


  }, [])




  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{ zIndex: 1000 }} fullWidth={fullWidth}
      maxWidth={maxWidth}>
      <div className="p-6"  >


        <h4 className="mb-5">PAYMENT</h4>

        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">

          {/* <TextField
                className="w-full mb-4"
                label="Paid By"
                
                    autoComplete="none"
                
                variant="outlined"
                onChange={e => setpayment_account_id(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="cname"
                size="small"
                value={payment_account_id}
                validators={["required"]}
                errorMessages={["this field is required"]}
                select
                required
              >
                  {paymentaccount.map((item, ind) => (
                <MenuItem value={item.id} key={item}>
                  {item.name}
                </MenuItem>
              ))}
           </TextField> */}
          <FormGroup>

            <FormControl variant="outlined" size="small" className="w-full mb-4">
              <InputLabel htmlFor="outlined-age-native-simple">Paid By</InputLabel>
              <Select
                native
                value={payment_account_id}
                // onChange={handleChange}

                onChange={e => setpayment_account_id(e.target.value)
                  // .log(isAlive)
                }

                label="Paid By"
                inputProps={{

                  name: 'Paid By',

                  id: 'outlined-age-native-simple',
                }}
              >
                <option value=""></option>
                {paymentaccount.map((item, ind) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Select>
            </FormControl>

          </FormGroup>










          {payment_account_id && (
            //  <TextField
            //       className="w-full mb-4"
            //       label="Recieved By"

            //       autoComplete="none"

            //       variant="outlined"
            //       onChange={e => setreceived_by(e.target.value)
            //         // .log(isAlive)
            //       }
            //       type="text"
            //       name="cname"
            //       size="small"
            //       value={received_by}
            //       validators={["required"]}
            //       errorMessages={["this field is required"]}
            //       select
            //       required
            //     >
            //         {paymentaccount.filter(obj=>obj.id!==payment_account_id).map((item, ind) => (
            //       <MenuItem value={item.id} key={item}>
            //         {item.name}
            //       </MenuItem>
            //     ))}
            //  </TextField>
            <FormGroup>

              <FormControl variant="outlined" size="small" className="w-full mb-4">
                <InputLabel htmlFor="outlined-age-native-simple">Received By</InputLabel>
                <Select
                  native
                  value={received_by}
                  // onChange={handleChange}

                  onChange={e => setreceived_byfun(e.target.value)
                    //         // .log(isAlive)
                  }

                  label="Received By"
                  inputProps={{

                    name: 'Received By',

                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option value=""></option>
                  {paymentaccount.filter(obj => obj.id !== payment_account_id).map((item, ind) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>

            </FormGroup>


          )}
          <CurrencyTextField
            className="w-full mb-4"
            label="Amount"
            currencySymbol="SAR"
            variant="outlined"
            onChange={(event, value) => setamount(value)}
            type="text"
            value={amount}
            name="cname"
            size="small"
            required
          >
          </CurrencyTextField>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className="mb-4 w-full"
              margin="none"
              label="Received Date"
              inputVariant="outlined"
              type="text"
              size="small"
              autoOk={true}
              value={received_date}
              format="MMMM dd, yyyy"
              onChange={handleDateChange}
              required
            />
          </MuiPickersUtilsProvider>
          {show &&
            <TextField
              className="w-full mb-4"
              label="Payment Mode"
              onChange={e => setpayment_mode(e.target.value)
              }
              variant="outlined"
              type="text"
              name="cdescription"
              size="small"
              value={payment_mode}
              required
              select
            >
              {option.map((item, ind) => (
                <MenuItem value={item.value} key={item}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>}
          {payment_mode === 'cheque' && (<TextField
            className="w-full mb-4"
            label="Cheque Number"
            onChange={e => setcheck_no(e.target.value)
            }
            variant="outlined"
            type="text"
            name="cdescription"
            size="small"
            value={check_no}

          ></TextField>
          )}
          <FormGroup>
            {(payment_mode === 'banktransfer' || payment_mode === "bankdeposit") &&
              <FormControl variant="outlined" size="small" className="w-full mb-4">
                <InputLabel htmlFor="outlined-age-native-simple">Bank</InputLabel>
                <Select
                  native
                  value={bank_id}
                  // onChange={handleChange}

                  onChange={e => setbank_id(e.target.value)}

                  label="Bank"
                  inputProps={{

                    name: 'Bank',

                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option value=""></option>
                  {companybank.map((item, ind) => (
                    <option value={item.id}>{item.name}-{item.ac_no}</option>
                  ))}
                </Select>
              </FormControl>
            }
          </FormGroup>
          <TextField
            className="w-full mb-4"
            label="Narration"

            variant="outlined"
            onChange={e => setnarration(e.target.value)
              // .log(isAlive)
            }
            type="text"
            name="cname"
            multiline
            rows={6}
            value={narration}

          ></TextField>



          <div className="flex  items-center">
            <Button variant="outlined" color="primary" type="submit">
              <Icon>save</Icon> SAVE
            </Button>
            <div className="flex justify-between items-center">
              <Button
                variant="outlined"
                color="secondary"
                className="ml-4"
                onClick={() => setcatid()}
              >
                <Icon>cancel</Icon>CANCEL
              </Button>

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
    </Dialog>

  );
};

export default MemberEditorDialog1;
