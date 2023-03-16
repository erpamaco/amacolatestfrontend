import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
    Dialog,
    Button,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import useAuth from 'app/hooks/useAuth';

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
import SalaryDialog from './SalaryDialog';

const MemberEditorDialog = ({ uid, open, handleClose, userid, userList, data }) => {
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
    const formData = new FormData();
    const max = 100;
    const min = 0;
    const { user } = useAuth();
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

        console.log(id)
        console.log(arr)




    };

    const handleDateChange = (event) => {

        console.log(event);
    };

    const newHandleChange = (event) => {

        setState({
            ...state,
            [event.target.name]: event.target.value
        })
        console.log({ state });
    }

    const getSalary = (data) => {
        console.log(data.bsalary);
        var gross = parseInt(data.bsalary) + parseInt(data.hrasalary) + parseInt(data.tasalary)
        setState({
            ...state,
            'bsalary': data.bsalary,
            'hrasalary': data.hrasalary,
            'tasalary': data.tasalary,
            'grosssalary': gross,
        })
    }

    const handleDialogClose = () => {
        setShouldOpenSalaryDialog(false);
    };

    const handleChangeImage = (event) => {
        console.log("sdsd");
        setState({
            ...state,
            [event.target.name]: event.target.files[0],
        });
        console.log({ state });

    }

    const error = divisions.filter(v => v).length !== 1;

    useEffect(() => {
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
                    

                    const uD = data.filter(obj => obj.emp_id == userid)

                    console.log(uD[0].name)

                    const a = uD[0].name.split(" ");
                    console.log();
                    setname(a[1])
                    setemail(uD[0].email)
                    setprefix(a[0])
                    setdesignation(uD[0].designation)
                    var res = uD[0].contact_number.slice(0, 4);
                    setcode(res)
                    var con = uD[0].contact_number.slice(4,);
                    setcontact(con)
                    setPassExpDate(new Date(uD[0].passport_exp_date));
                    setIqamaExpDate(new Date(uD[0].iqama_exp_date));
                    setDojExpDate(new Date(uD[0].date_of_join));

                    setState({
                        present_address: uD[0].present_address,
                        passport_number: uD[0].passport_number,
                        salary: uD[0].salary,
                    })


                }
            })
        setIsAlive(true)
    }, [isAlive])
    const handleFormSubmit = () => {
        if (userid) {

            const formdata = {
                name: capitalize_arr(name),
                contact_number: code + contact,
                email: email,
                present_address: state?.present_address,
                salary: state?.salary,
                div_id: state?.div_id,
                passport_number: state?.passport_number,
                designation: capitalize_arr(designation),
                prefix: prefix,
                passport_exp_date: passExpDate,
                iqama_exp_date: iqamaExpDate,
                date_of_join: dojExpDate,
                nick_name: nick_name,
                div_id: localStorage.getItem('division'),
                user_id: user.id,
            }
            url.put(`update-emp/${userid}`, formdata).then(({ data }) => {
                console.log(data)
                Swal.fire({
                    title: 'Success',
                    type: 'success',
                    icon: 'success',
                    text: 'Data updated successfully.',
                });
                handleClose()
            })
                .catch(function (error) {
                })
        } else {


            formData.append('name', capitalize_arr(name))
            formData.append('contact_number', code + contact)
            formData.append('email', email)
            formData.append('present_address', state?.present_address)
            formData.append('bsalary', state?.bsalary)
            formData.append('hrasalary', state?.hrasalary)
            formData.append('tasalary', state?.tasalary)
            formData.append('grosssalary', state?.grosssalary)
            formData.append('div_id', state?.div_id)
            formData.append('file', state?.file)
            formData.append('passport_number', state?.passport_number)
            formData.append('designation', capitalize_arr(designation))
            formData.append('prefix', prefix)
            formData.append('passport_exp_date', passExpDate)
            formData.append('iqama_exp_date', iqamaExpDate)
            formData.append('date_of_join', dojExpDate)
            formData.append('nick_name', nick_name)
            formData.append('divisions', JSON.stringify(divisions))
            formData.append('div_id', localStorage.getItem('division'))
            formData.append('user_id', user.id)

            console.log(formData);

            url.post('save-emp', formData).then(({ data }) => {
                console.log(data)
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
        <Dialog onClose={handleClose} open={open} maxWidth style={{ zIndex: "1000" }}
        >
            <div className="p-6"  >


                {!userid ? (<h4 className="mb-5">ADD EMPLOYEE</h4>) : <h4 className="mb-5">EDIT EMPLOYEE</h4>}

                <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">

                    <p className="mt-0 mb-1">
                        Please Select the  Divison
                    </p>
                    <FormGroup row>
                        {divisions.map((item, ind) => (
                            <FormControlLabel
                                // error={error}
                                className="block h-32"
                                control={<Checkbox />}
                                label={item.name}
                                value={item.check}

                                checked={item.check ? true : false}
                                name={item.check}
                                onChange={(e) => handleChange(e, item.id)}
                                key={ind}
                            />
                        ))}
                    </FormGroup>

                    {/* <h5>Person Details</h5> */}
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

                    <div className="flex mb-4">
                        <TextField
                            className="mr-2"
                            autoComplete="none"
                            label="Country Code"
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
                            type="text"
                            size="small"
                            variant="outlined"
                            value={contact}
                            fullWidth

                        />
                    </div>
                    <div className="flex mb-4">

                        <TextField
                            className="w-full mb-4"
                            label="Email"
                            variant="outlined"
                            onChange={e => setemail(e.target.value)
                                // .log(isAlive)
                            }
                            type="textarea"
                            name="cname"
                            size="small"
                            value={email}
                        // style={{ width: "350px" }}

                        />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <TextField
                            className="w-full mb-3"
                            label="Present Address"
                            variant="outlined"
                            onChange={newHandleChange}
                            type="text"
                            name="present_address"
                            size="small"
                            value={state?.present_address}

                        />
                    </div>
                    <div className="flex mb-4">
                        <TextField
                            className="mb-4 w-full"
                            label="Passport Number"
                            variant="outlined"
                            onChange={newHandleChange}
                            type="text"
                            name="passport_number"
                            size="small"
                            value={state?.passport_number}
                        // style={{ width: "350px" }}
                        />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className="mb-4 w-full"
                                margin="none"
                                label="Passport Expired Date"
                                inputVariant="outlined"
                                type="text"
                                size="small"
                                autoOk={true}
                                name="passport_exp_date"
                                value={passExpDate}
                                format="MMMM dd, yyyy"
                                onChange={e => setPassExpDate(e)}
                                required
                            />
                        </MuiPickersUtilsProvider>

                    </div>
                    <div className="flex mb-4">

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
                                onChange={e => setIqamaExpDate(e)}
                                required
                            />
                        </MuiPickersUtilsProvider>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className="mb-4 w-full"
                                margin="none"
                                label="Date of Join"
                                inputVariant="outlined"
                                type="text"
                                size="small"
                                autoOk={true}
                                value={dojExpDate}
                                format="MMMM dd, yyyy"
                                onChange={e => setDojExpDate(e)}
                                required
                            />
                        </MuiPickersUtilsProvider>

                    </div>
                    <div className="flex mb-4">
                        <TextField
                            className="w-full mb-4"
                            label="Designation"
                            inputProps={{ style: { textTransform: 'capitalize' } }}
                            variant="outlined"
                            onChange={e => setdesignation(e.target.value)}
                            type="textarea"
                            name="name"
                            size="small"
                            value={designation}
                        />
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <Button
                            className="mr-2"
                            variant="outlined"
                            // onChange={newHandleChange}
                            name="salary"
                            size="small"
                            // value={state?.salary}
                            style={{ width: "350px", height: "38px" }}
                            onClick={e => setShouldOpenSalaryDialog(true)}

                        >
                            {state?.grosssalary ? "Gross Salary : " + state?.grosssalary + "SAR" : "Salary Details"}
                        </Button>
                    </div>
                    <div className="flex mb-4">


                        {userid ? "" :
                            <label htmlFor="upload-photo" >
                                <input
                                    style={{ display: "none" }}
                                    id="upload-photo"
                                    name="file"
                                    type="file"
                                    onChange={(e) => handleChangeImage(e)}
                                />
                                <Fab
                                    color="secondary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="outlined"
                                    style={{ padding: "5px" }}
                                >
                                    &nbsp;  <Icon>cloud_upload</Icon> &nbsp; Job Agreement &nbsp;
                                </Fab>
                            </label>
                        }

                    </div>
                    {/*                  
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
                    </TextValidator> */}



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
            {shouldOpenSalaryDialog && (
                <SalaryDialog
                    handleClose={handleDialogClose}
                    open={shouldOpenSalaryDialog}
                    getSalary={getSalary}
                />
            )}
        </Dialog>

    );
};

export default MemberEditorDialog;
