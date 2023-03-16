import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
    Dialog,
    Button,
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
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
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    loading: {
        position: "fixed",
        left: 0,
        right: 0,
        top: "calc(50% - 20px)",
        margin: "auto",
        height: "40px",
        width: "40px",
        "& img": {
            position: "absolute",
            height: "25px",
            width: "auto",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto"
        }
    }
}));
export default function PerModules({ userid, id }) {

    const [state, setState] = useState([]);
    const [load, setLoad] = useState(true);




    const [shouldOpenAddDialog, setShouldOpenAddDialog] = useState(false);
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const [menuPosition, setMenuPosition] = useState(null);

    const [parentId, setParentID] = useState("");
    const [moid, setId] = useState(null);
    const [dataList, setListData] = useState([]);

    const [perList, setPerList] = useState([]);

    const [isAlive, setIsAlive] = useState(true);
    const [DID, setDId] = useState(null);
    const [pList, setPList] = useState([]);
    const classes = useStyles();
    const [
        shouldOpenConfirmationDialog,
        setShouldOpenConfirmationDialog,
    ] = useState(false);





    const addSubCat = (e, id) => {
        setShouldOpenAddDialog(true)
        setParentID(id);
    }

    const [fullWidth, setFullWidth] = React.useState(true);

    useEffect(() => {
        url.get(`get-modules-per/${userid}/${id}`).then(({ data }) => {
            // console.log(data);
            setPList(data.gData);
            setListData(data.all);
            const filterD = data.permission.map((item, i) => {
                return item.module
            })
            setPerList(filterD);
            setLoad(false)
        });

        // url.get('roles').then(({ data }) => {
        //   setRoles(data)
        // })

        setIsAlive(false)
    }, [isAlive])

    const ref = () => {
        setIsAlive(true);
    }

    const lockUnlockUser = (m, status, type) => {
        setLoad(true)
        // setState({
        //   module: m,
        //   status: status,
        //   userid: userid,
        //   type: type,
        // })

        // console.log({ state });
        const obj = {
            module: m,
            status: status,
            userid: userid,
            type: type,
        }

        url.post('add-permission', obj)
            .then(function (response) {
                // console.log(response);
                // Swal.fire({
                //   title: 'Success',
                //   type: 'success',
                //   icon: 'success',
                //   text: 'Status Changed Successfully.',
                // });
                // setState({
                //   module: "",
                //   status: "",
                //   userid: "",
                //   type: "",
                // })
            })
            .catch(function (error) {

            })
        setIsAlive(true);
    }

    const deleteUser = (did) => {
        setDId(did);
        setShouldOpenConfirmationDialog(true);
    }

    const changeIcon = (e, nId) => {
        if (document.getElementById(nId).innerHTML == "remove_circle_outline") {
            document.getElementById(nId).innerHTML = "add_circle_outline"
        } else {
            document.getElementById(nId).innerHTML = "remove_circle_outline"
        }
    }



    const Menu1 = ({ data, modid }) => {
        return (
            <span>
                {load && (
                    <div className={classes.loading}>
                        {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
                        <CircularProgress color="secondary" />Loading...
                    </div>
                )}
                {data.map((m, i) => {
                    const nId = i + Math.floor(Math.random() * 1000);

                    return (
                        <div style={{ width: "450px" }}>
                            <ExpansionPanel style={{ width: "100%" }} className={classes.root}>
                                <ExpansionPanelSummary
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    onClick={(e) => changeIcon(e, nId)}
                                >
                                    {/* remove_circle_outline */}
                                    <Table>
                                        <TableRow>
                                            <TableCell width="30" className=""  ><Icon id={nId}>add_circle_outline</Icon></TableCell>
                                            <TableCell width="250" className="" ><Typography className={classes.heading}><span className="">{m.module_name}</span><Badge style={{ width: "30px" }}
                                                // onClick={(e) => { addSubCat(e, m.mod_id) }}
                                                className="ml-2" badgeContent={m.child.length > 0 ? m.child.length : "0"} color="primary"></Badge></Typography></TableCell>
                                            <TableCell style={{ float: "left" }}>

                                                <div style={{ float: "right" }}>
                                                    {/* <Icon color="secondary" onClick={() => {
                            setId(m.mod_id);
                            setShouldOpenAddDialog(true);
                          }}  >edit</Icon>
                          &nbsp;
                          &nbsp;*/}
                                                    {perList.includes(m.module_name) ? <Icon className="mr-2" color="error"
                                                        onClick={(e) => lockUnlockUser(m.module_name, "unlock", m.type)}
                                                    >lock</Icon> : <Icon className="mr-2" style={{ color: "green" }}
                                                        onClick={(e) => lockUnlockUser(m.module_name, "lock", m.type)}
                                                    >lock_open</Icon>}

                                                    {/* {perList.includes(m.module_name) ? "true" : "false"} */}



                                                </div>

                                            </TableCell>
                                        </TableRow>
                                    </Table>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{ width: "350px" }}>
                                    {m.child !== null ? (
                                        <span><Menu1 data={m.child} /></span>
                                    ) : (
                                        <></>
                                    )}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                        </div>
                    );
                })}
            </span>
        );
    };

    return (
        <div>

            <Menu1 data={dataList} inputProps={{ style: { justifyContent: 'space-between' } }}
                style={{ justifyContent: 'space-between' }}></Menu1>
        </div>
    )
}
