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
import url from "./InvoiceService";
import useAuth from '../../hooks/useAuth';

const prefixs = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Ms', label: 'Ms' }
];
const MemberEditorDialog = ({ open, handleClose, setData }) => {
    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    // const foo =parseInt(params.get('id'));
    const [loading, setloading] = useState(false);


    const [isAlive, setIsAlive] = useState(true);



    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const { user } = useAuth();
    const [state, setState] = useState([])




    const handleFormSubmit = () => {
        setloading(true)

        url.post(`uom`, state)
            .then((response) => {
                setData(response.data)
                Swal.fire({
                    title: 'Success',
                    type: 'success',
                    icon: 'success',
                    text: 'Data saved successfully.',
                })
                    .then((result) => {

                        handleClose()
                    })

            })
            .catch(function (error) {
                Swal.fire({
                    title: "Error",
                    type: "error",
                    icon: "warning",
                    text: "Something Went Wrong.",
                }).then((result) => {
                    setloading(false)
                });
            })

    };

    const handleChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {

    }, [])




    return (
        <Dialog onClose={handleClose} open={open} style={{ zIndex: 1000 }} maxWidth={maxWidth} fullWidth={fullWidth}>
            <div className="p-6">
                <h4 className="mb-5">UNIT OF MEASURE</h4>
                <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off" inputProps={{ style: { textTransform: 'capitalize' } }}>
                    <div>
                        <TextField
                            className="w-full mb-4"
                            autoComplete="none"
                            label="Lable"
                            variant="outlined"
                            name="label"
                            onChange={(e) => { handleChange(e) }}
                            // value={prefix}
                            size="small"
                        />
                        <TextField
                            className="w-full mb-4"
                            autoComplete="none"
                            label="Value"
                            variant="outlined"
                            name="value"
                            onChange={(e) => { handleChange(e) }}
                            // value={prefix}
                            size="small"
                        />

                    </div>









                    <div className="flex  items-center">
                        <Button variant="outlined" className="mr-4 py-2" color="primary" type="submit" disabled={loading}>
                            <Icon>save</Icon>SAVE
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
