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
import url, { capitalize_arr } from "../../invoice/InvoiceService"
import { FormGroup } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const EqEditorDialog = ({ eid, open, handleClose, filesd, userList, data }) => {
    // console.log("filesd",filesd)
    const [state, setState] = useState({
        present_address: "",
        passport_number: "",
        salary: "",
        isActive: false,
    });
    const [name, setname] = useState('');
    const [filesdisplay, setfilesdisplay] = useState([]);
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


    const handleDialogClose = () => {
        setShouldOpenSalaryDialog(false);
    };
    // useEffect(() => {

      
 
    //     url.get(`getequipfiles` + eid).then(({ data }) => {
    //         console.log("mera",data)

    
    //     });
    //     return () => setIsAlive(false);
    //   }, [isAlive]);

    useEffect(() => {




        url.get(`getequipfilessingle/` + eid).then(({ data }) => {
            console.log("zaroori",data)

            setfilesdisplay(data);
        
    
        });
        return () => setIsAlive(false);
      }, [isAlive]);
    
    
    
const hello = ["hello","hi"];


    return (
        <Dialog onClose={handleClose} open={open} fullScreen maxWidth="lg">
        <div style={{marginLeft:"auto",marginTop:"7px"}}>
          <Button className="mr-4 py-2" color="error" variant="outlined" style={{ border: '1px solid red', color: 'red' }} onClick={handleClose}>
            <Icon className="mr-2" fontSize="small">
              close
            </Icon>{" "}
            CLOSE
          </Button>
          </div>
          
            <div style={{textAlign:"center"}}>
          
            {filesdisplay.map((item)=>{
                return <>
                <img src={"https://www.amacoerp.com/test/amaco_test/public/"+item?.file_name} width="620px" height="620px" />

                </>


            })}

                   
             
            </div>
            
        </Dialog>

    );
};

export default EqEditorDialog;
