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

import { basePath } from "../invoice/InvoiceService";

import DateFnsUtils from "@date-io/date-fns";

const MemberEditorDialog = ({ open, handleClose, file }) => {
    const [vFile, setVFile] = useState('');

    useEffect(() => {
        setVFile(file);
    }, [])


    return (
        <Dialog onClose={handleClose} open={open} maxWidth style={{ zIndex: "1000" }}
        >
            <Icon variant="outlined" color="secondary" style={{ padding: "2px" }} onClick={handleClose}>cancel</Icon><br />

            <div className="p-6"  >
                <div className="flex  items-center">
                    <img src={basePath + vFile} alt="" />
                </div>
            </div>

        </Dialog >

    );
};

export default MemberEditorDialog;
