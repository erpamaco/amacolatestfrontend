import React, { useState, useEffect } from "react";
import {
    Dialog,
    Button,
    Grid,
    MenuItem,
    TextField,

} from "@material-ui/core";
import Axios from 'axios';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import url, { getcategories } from "../invoice/InvoiceService";
import Swal from "sweetalert2";

const AddDialog = ({ open, handleClose, parentId, type, ref, moid, div }) => {

    const [state, setState] = useState({
        module_name: "",
        type: "",
        div_id: "",
        parentId: parentId,
        isActive: false,
    });

    const [division, setDivision] = useState([]);


    const handleChange = (event, source) => {
        event.persist();
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (moid) {
            url.put(`update-module/${moid}`, state)
                .then(function (response) {
                    console.log(response);
                    Swal.fire({
                        title: 'Success',
                        type: 'success',
                        icon: 'success',
                        text: 'Data Updated Successfully.',
                    });



                })
                .catch(function (error) {

                })
            setState({
                module_name: "",
                type: "",
                div_id: "",
            })
            try {
                ref();
            } catch (error) {

            }
        } else {
            url.post('add-module', state)
                .then(function (response) {
                    console.log(response);
                    Swal.fire({
                        title: 'Success',
                        type: 'success',
                        icon: 'success',
                        text: 'Data saved successfully.',
                    });

                    setState({
                        module_name: "",
                        type: "",
                        div_id: "",
                    })

                })
                .catch(function (error) {

                })
            try {
                ref();
            } catch (error) {

            }
        }
        handleClose();
    };

    useEffect(() => {
        console.log(div);
        if (moid) {
            url.get(`edit-data-modules/${moid}`).then(({ data }) => {
                console.log("dataff",data)
                setState({
                    module_name: data.data[0]?.module_name,
                    type: data.data[0]?.type,
                    div_id: data.data[0]?.div_id,
                })
            });
        }
        url.get('division').then(({ data }) => {
            setDivision(data);

        });
        console.log(state);
    }, [])

    return (
        <Dialog onClose={handleClose} style={{ zIndex: "1000" }} open={open}>
            <div className="p-6">
                <h4 className="mb-5">ADD MODULE</h4>
                <ValidatorForm onSubmit={handleFormSubmit}>
                    <Grid style={{ width: "500px" }} className="mb-6" container spacing={4}>
                        <Grid item md={12}>

                            <TextValidator
                                className="w-full mb-4"
                                label="Division"
                                onChange={handleChange}
                                type="text"
                                name="div_id"
                                value={state?.div_id}
                                validators={["required"]}
                                select
                                errorMessages={["this field is required"]}
                            >
                                <MenuItem value="">Choose Division</MenuItem>
                                {division?.filter(obj => obj.name != "Manufacturing" && obj.name != "HQ ").map((item, key) => {
                                    return (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    )
                                })}
                            </TextValidator>
                            <TextValidator
                                className="w-full mb-4"
                                label="Module Name"
                                onChange={handleChange}
                                type="text"
                                name="module_name"
                                value={state?.module_name}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            />
                            <TextValidator
                                className="w-full mb-4"
                                label="Type"
                                onChange={handleChange}
                                select
                                name="type"
                                value={state?.type}
                                validators={["required"]}
                                errorMessages={["this field is required"]}
                            >
                                <MenuItem value="">Choose Type</MenuItem>
                                <MenuItem value="Module">Module</MenuItem>
                                <MenuItem value="Sub Module">Sub Module</MenuItem>
                                <MenuItem value="Component">Component</MenuItem>
                                {/* <MenuItem value="Component">Component</MenuItem> */}
                            </TextValidator>
                        </Grid>
                    </Grid>

                    <div className="flex justify-between items-center">
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                    </div>
                </ValidatorForm>
            </div>
        </Dialog>
    );
};

export default AddDialog;
