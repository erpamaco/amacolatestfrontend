import React, { useState, useEffect } from "react";
import {
    Dialog,
    Button,
    MenuItem,
    TextField
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Icon } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import url from "../InvoiceService";
// import useAuth from '../../hooks/useAuth';

const MemberEditorDialog = ({ open, handleClose, setDcComment }) => {
    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    // const foo =parseInt(params.get('id'));
    const [loading, setloading] = useState(false);


    const [isAlive, setIsAlive] = useState(true);



    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [state, setState] = useState([])




    const handleFormSubmit = () => {
    

    };

    const handleChange = (e) => {

        setDcComment(e.target.value)
    }




    return (
        <Dialog onClose={handleClose} open={open} style={{ zIndex: 10000 }} maxWidth={maxWidth} fullWidth={fullWidth}>
            <div className="p-6">
                <h4 className="mb-5">Comment</h4>
                <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off" inputProps={{ style: { textTransform: 'capitalize' } }}>
                    <div>
                        <TextField
                            className="w-full mb-4"
                            autoComplete="none"
                            label="Why are you Deleting this Invoice"
                            variant="outlined"
                            name="label"
                            multiline
                            onChange={(e) => { handleChange(e) }}
                            // value={prefix}
                            size="small"
                        />
                       

                    </div>









                    <div className="flex  items-center">
                        <Button variant="outlined" className="mr-4 py-2" color="primary" onClick={() => handleClose()}
                            disabled={loading}>
                            <Icon>save</Icon>Submit
                        </Button>
                        <Button
                            variant="outlined"
                            className="mr-4 py-2"
                            color="secondary"
                            onClick={() => handleClose()}
                        >
                            <Icon>cancel</Icon> CANCEL
                        </Button>

                        <div className="flex justify-between items-center">


                        </div>
                    </div>
                </ValidatorForm>

            </div>
        </Dialog>
    );
};

export default MemberEditorDialog;
