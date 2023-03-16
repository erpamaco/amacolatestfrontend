import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb, ConfirmationDialog } from "matx";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Axios from "axios";
import Minimize from "@material-ui/icons/Minimize";
import url, { getcategories } from "../invoice/InvoiceService";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";




import AddDialog from "./AddDialog";
// import EditorDialog from "./EditorDialog";
import {
    Grid,
    RadioGroup,
    // TableCell,
    FormControlLabel,
    FormControl,
    // Input,
    FormGroup,
    Select,
    CardActionArea,
    InputLabel,
    Radio,
    Card,
    Divider,
    TextField,
    MenuItem,
    Button,
    Icon,
    Menu,
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

export default function Modules({ data, type }) {


    const classes = useStyles();
    const [shouldOpenAddDialog, setShouldOpenAddDialog] = useState(false);
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const [menuPosition, setMenuPosition] = useState(null);

    const [parentId, setParentID] = useState("");
    const [id, setId] = useState(null);

    const [pList, setPList] = useState([]);
    const [dataList, setListData] = useState([]);

    const [isAlive, setIsAlive] = useState(true);
    const [DID, setDId] = useState(null);
    const [
        shouldOpenConfirmationDialog,
        setShouldOpenConfirmationDialog,
    ] = useState(false);



    const handleConfirmationResponse = () => {

        //  alert(college);
        // Axios.delete(`http://127.0.0.1:8000/api/deleteledger/${DID}`);
        // window.isRefresh = true;
        // setIsAlive(true);
        // handleDialogClose();

    };


    const deleteUser = (did) => {
        // setDId(did);
        // setShouldOpenConfirmationDialog(true);
        // // Axios.delete(`http://127.0.0.1:8000/api/deleteUsers/${did}`);
    }
    const changeIcon = (e, nId) => {

        // if (document.getElementById(nId).innerHTML == "remove_circle_outline") {
        //     document.getElementById(nId).innerHTML = "add_circle_outline"
        // } else {
        //     document.getElementById(nId).innerHTML = "remove_circle_outline"
        // }
    }

    const addSubCat = (e, id) => {
        setShouldOpenAddDialog(true)
        setParentID(id);
    }

    const handleDialogClose = () => {
        setShouldOpenAddDialog(false);
    };

    const Menu1 = ({ data, modid }) => {


        return (
            <span>
                {data.map((m, i) => {
                    const nId = i + Math.floor(Math.random() * 1000);

                    return (
                        <div style={{ width: "450px" }}>
                            <ExpansionPanel style={{ width: "100%" }} className={classes.root}>
                                <ExpansionPanelSummary
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    {/* remove_circle_outline */}
                                    <Table>
                                        <TableRow>
                                            <TableCell width="30" className=""  ><Icon onClick={(e) => changeIcon(e, nId)} id={nId}>add_circle_outline</Icon></TableCell>
                                            <TableCell width="250" className="" ><Typography className={classes.heading}><span className="">{m.module_name}</span><Badge style={{ width: "30px" }} onClick={(e) => { addSubCat(e, m.mod_id) }} className="ml-2" badgeContent={m.child.length > 0 ? m.child.length : "0"} color="primary"></Badge></Typography></TableCell>
                                            <TableCell style={{ float: "left" }}>

                                                <div style={{ float: "right" }}>
                                                    <Icon color="secondary" onClick={() => {
                                                        setId(m.mod_id);
                                                        setShouldOpenEditorDialog(true);
                                                    }}  >edit</Icon>
                                                    &nbsp;
                                                    &nbsp;
                                                    <Icon className="mr-2" color="error" onClick={(e) => deleteUser(m.mod_id)} >delete</Icon>

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

            <Menu1 data={data} inputProps={{ style: { justifyContent: 'space-between' } }}
                style={{ justifyContent: 'space-between' }}></Menu1>

            {setShouldOpenAddDialog && (
                <AddDialog
                    handleClose={handleDialogClose}
                    open={shouldOpenAddDialog}
                    parentId={parentId}
                />
            )}
            {/* {shouldOpenEditorDialog && (
                <EditorDialog
                    // handleClose={handleDialogClose}
                    open={shouldOpenEditorDialog}
                    id={id}
                />
            )}
            {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                    open={shouldOpenConfirmationDialog}
                    // onConfirmDialogClose={handleDialogClose}
                    onYesClick={handleConfirmationResponse}
                    text="Are you sure to delete?"
                />
            )} */}

        </div>
    )
}
