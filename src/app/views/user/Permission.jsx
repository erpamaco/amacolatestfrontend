import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  Dialog,
  Button, Tab, Tabs, Divider
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Table from "@material-ui/core/Table";
import PerModules from './PerModules';
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



const MemberEditorDialog = ({ uid, open, handleClose, userid, userList }) => {

  const [state, setState] = useState([]);




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
  const [division, setDivision] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabList, setTabList] = useState([]);
  const [load, setLoad] = useState(true);




  const addSubCat = (e, id) => {
    setShouldOpenAddDialog(true)
    setParentID(id);
  }

  const [fullWidth, setFullWidth] = React.useState(true);


  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };


  useEffect(() => {

    url.get(`divisionbyid/${userid}`).then(({ data }) => {
      setDivision(data);
      const tab = data.filter(obj => obj.name != "Manufacturing" && obj.name != "HQ ").map((item) => {
        return item.name
      });
      setTabList(tab);
      setLoad(false);
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




  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{ zIndex: 1000 }}
      maxWidth="lg" fullWidth>
      {load && (
        <div className={classes.loading}>
          {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
          <CircularProgress color="secondary" />

        </div>
      )}
      <div className="flex  items-center">
        <Icon
          variant="outlined"
          className="p-6"
          color="secondary"
          onClick={() => handleClose()}
        >cancel</Icon>
        <Button
          style={{ float: "right", position: "relative", top: 15, left: "90%" }}
          variant="outlined"
          color="secondary"
          onClick={() => handleClose()}
        >Apply</Button>
      </div>
      <div >

      </div>
      <div className="p-6">
        <Tabs
          className="mt-4"
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabList.map((item, ind) => (
            <Tab className="capitalize" value={ind} label={item} key={ind} />
          ))}
        </Tabs>
        <Divider className="mb-6" />

        {division.map((item, key) => {
          console.log("man",item)
          return (
            tabIndex == key && <PerModules id={item.id} userid={userid} />
          )
        })}



      </div>
    </Dialog>

  );
};

export default MemberEditorDialog;
