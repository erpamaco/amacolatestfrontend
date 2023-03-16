import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import MemberEditorDialog from "./partycontact"
import Tooltip from '@material-ui/core/Tooltip';
import url, { GDIV, navigatePath } from "../invoice/InvoiceService";
import { makeStyles } from "@material-ui/core/styles";
import useAuth from "app/hooks/useAuth";
import {
  TableCell,
  Button,
} from "@material-ui/core";
import LinearProgress from '@mui/material/LinearProgress';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    float: 'right',
    background: 'blue',
    color: 'white',

  },
  input: {
    display: "none"
  },
  columnStyleWithWidthSno: {
    top: "0px",
    left: "0px",
    zIndex: "50",
    position: "sticky",
    backgroundColor: "#fff",
    width: "50px",
    textAlign: "center"
  },
  columnStyleWithWidth: {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "600px",
    wordBreak: "break-word",
    hyphens: "auto",
    textAlign: "center",
    // paddingRight: 30

  }

}));

const SimpleMuiTable = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(true);
  const { user } = useAuth();
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);//Empty array to hold the customer and vender list

  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);

  /**
 * This function close the  one to its input.
 */
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);

  };



  useEffect(() => {

    if(localStorage.getItem('page') !== 'party'){
      localStorage.removeItem('search')
      localStorage.removeItem('page')
  }

    /**
* This API CALL displays the parties .
*/
    url.get(`getParties/${localStorage.getItem('division')}`).then(({ data }) => {
      if (isAlive) setUserList(data);
      setLoad(false);

    });
    return () => setIsAlive(false);
    
  }, [isAlive]);















  const columns = [
    {
      name: "id",
      label: "S.NO.",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: 100, textAlign: 'center' }}>
              <span textAlign="center" >S.NO.</span>
            </TableCell>
          )
        },

        setCellProps: () => ({
          align: "center",
          // paddingLeft:24
        })
      }
    },
    {
      name: "firm_name",
      label: "COMPANY NAME",
      options: {

        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} className={classes.columnStyleWithWidth} inputProps={{ style: { textTransform: 'capitalize' } }}>
              <span>COMPANY NAME</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: 'break'
        })
      },
    },
    {
      name: "vat_no",
      label: "VAT NO",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span >VAT NO</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "vendor code",
      label: "VENDOR CODE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span>PARTY TYPE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",
          // paddingLeft: 20
        })
      },
    },
    {
      name: "vendor code",
      label: "VENDOR CODE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} className="pr-2" style={{ textAlign: "right" }} >
              <span>BALANCE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "right",
          paddingLeft: 20
        })
      },
    },



    {
      name: "id",
      label: "ACTION",
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "right" }} className="pr-15" >
              <span >ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (

            <div
              style={{
                textAlign: "end",


              }}
              className="pr-15"

            >

              <Link style={{ textAlign: "right", paadingRight: 20 }} to={navigatePath + "/pages/view-customer/" + tableMeta.rowData[5]}>

                <Tooltip title="Party contact details">
                  <Icon color="primary" style={{
                    transform: "rotate(270deg)",
                    transition: "all 0.25s ease-in-out", textAlign: "right"
                  }}>arrow_drop_down_circle</Icon>

                </Tooltip>

              </Link>
            </div>



          )

        },
      },
    },
  ];



  return (
    <div>
         {load && (
        <div className={classes.loading}>
          {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
          <LinearProgress  sx={{
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgb(37 44 71)',
                        color:'rgb(37 44 71)',
                    }
}} />

        </div>
      )}
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <div className="flex flex-wrap justify-between">
            <Breadcrumb
              routeSegments={[
                // { name: "", path: "./Addparty" },
                { name: "PARTY" }
              ]}
            />
            {shouldOpenEditorDialog && (
              <MemberEditorDialog
                handleClose={handleDialogClose}
                open={shouldOpenEditorDialog}
              />
            )}
            {shouldOpenConfirmationDialog && (
              <ConfirmationDialog
                open={shouldOpenConfirmationDialog}
                onConfirmDialogClose={handleDialogClose}
                text="Are you sure to delete?"
              />
            )}


            <div className="text-right">
              <Link to={"./Addparty"}>
                <Button
                  className="py-2"
                  color="primary"
                  variant="outlined"
                >
                  <Icon>add</Icon>
                  ADD NEW
                </Button>
              </Link>
              {/* <Link to={"./Addparty"}>
            <Tooltip  title="Add Party">
          <Fab  aria-label="Add" aria-label="Add" className={classes.button}> 
          <Icon>add</Icon>
            </Fab>
            </Tooltip>
            </Link> */}


            </div>
          </div>
        </div>
   
        <MUIDataTable
          title={"PARTY"}
          data={
            userList.filter(obj => obj.div_id == localStorage.getItem('division')).map((item, index) => {


              return [

                ++index,
                item.firm_name,
                // (item.post_box_no?item.post_box_no+",":'')+""+(item.street?item.street+",":'')+""+(item.city?item.city+", \n":'')+""+(item.proviance?item.proviance+",":'')+""+(item.zip_code?item.zip_code:''),
                item.vat_no ? item.vat_no : '--',
                item.party_type.toUpperCase(),
                item.opening_balance,
                item.id,
              ]

            })
          }
          columns={columns}
          minWidth="6px"
          inputProps={{ style: { wordBreak: 'break-word' } }}
          options={{
            filterType: "textField",
            textLabels: {
                    body: {
                      noMatch: load ? "Data Loading..." : "Sorry, no records found",
                        }
                      },
            responsive: "simple",
            selectableRows: "none",
            rowsPerPageOptions: [10, 20, 40, 80, 100],
            onSearchClose: e => {
                          localStorage.removeItem("search");
                          localStorage.removeItem("page");
                        },
            searchProps: {
              onKeyUp:(e) => {
                localStorage.setItem('search',e.target.value);
                localStorage.setItem('page','party');
              }
            },
          searchText: localStorage.getItem('search') && localStorage.getItem('search') ,
          
          }}
        />
      </div>
    </div>
  );
}


export default SimpleMuiTable;
