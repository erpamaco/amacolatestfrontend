import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
    Dialog,
    Button,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";

import {
    Icon, TextField, Radio, RadioGroup, Checkbox,
    FormControlLabel, Fab
} from "@material-ui/core";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import FormLabel from "@material-ui/core/FormLabel";
import Swal from "sweetalert2";
import url, { capitalize_arr } from "../invoice/InvoiceService"
import { FormGroup } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const MemberEditorDialog = ({ uid, open, handleClose, userid, getSalary }) => {
    const [state, setState] = useState({
        present_address: "",
        passport_number: "",
        salary: "",
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
    const [value, setValue] = useState();
    const [passExpDate, setPassExpDate] = useState(new Date());
    const [iqamaExpDate, setIqamaExpDate] = useState(new Date());
    const [dojExpDate, setDojExpDate] = useState(new Date());
    const [shouldOpenSalaryDialog, setShouldOpenSalaryDialog] = useState(false);

    const max = 100;
    const min = 0;






    const newHandleChange = (event) => {

        setState({
            ...state,
            [event.target.name]: event.target.value
        })
        console.log({ state });
    }




    const handleFormSubmit = () => {
        getSalary(state)
        handleClose()
    }



    return (
        <Dialog fullWidth onClose={handleClose} style={{ zIndex: 2000 }} open={open}
        >
            <div className="p-6"  >


                {!userid ? (<h4 className="mb-5">ADD SALARY DETAILS</h4>) : <h4 className="mb-5">EDIT EMPLOYEE</h4>}

                <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">



                    <div className="flex">
                        <TextField
                            className="w-full mb-4"
                            label="Basic Salary"
                            variant="outlined"
                            inputProps={{ style: { textTransform: 'capitalize' } }}
                            onChange={newHandleChange}
                            type="number"
                            name="bsalary"
                            size="small"
                            value={state?.bsalary}
                        />
                    </div>
                    <div className="flex">
                        <TextField
                            className="w-full mb-4"
                            label="House Rent Allowance (HRA)"
                            variant="outlined"
                            inputProps={{ style: { textTransform: 'capitalize' } }}
                            onChange={newHandleChange}

                            type="number"
                            name="hrasalary"
                            size="small"
                            value={state?.hrasalary}
                        />
                    </div>
                    <div className="flex">

                        <TextField
                            className="w-full mb-4"
                            label="Travel Allowance (TA)"
                            variant="outlined"
                            inputProps={{ style: { textTransform: 'capitalize' } }}
                            onChange={newHandleChange}
                            type="number"
                            name="tasalary"
                            size="small"
                            value={state?.tasalary}
                        />
                    </div>

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

            </div>

        </Dialog>

    );
};

export default MemberEditorDialog;
