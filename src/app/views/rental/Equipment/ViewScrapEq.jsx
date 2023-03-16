import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
// import MemberEditorDialog from "./partycontact"
import Tooltip from '@material-ui/core/Tooltip';
import url, { GDIV, navigatePath } from "../../invoice/InvoiceService";
import { makeStyles } from "@material-ui/core/styles";
import useAuth from "app/hooks/useAuth";
import {
  TableCell,
  Button,
} from "@material-ui/core";

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

const ViewScrapEq = () => {
  const classes = useStyles();
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
    url.get(`getScrapRentalEquipments`).then(({ data }) => {
      if (isAlive) setUserList(data);

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
      label: "VEHICLE NAME",
      options: {

        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center", width:"200px" }}  inputProps={{ style: { textTransform: 'capitalize' } }}>
              <span>VEHICLE NAME</span>
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
      label: "MODEL NAME",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span >MODEL NAME</span>
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
      label: "MANUFACTURED DATE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center",width:"200px" }} >
              <span>MANUFACTURED DATE</span>
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
      label: "PLATE NUMBER",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center", width:"200px" }} >
              <span>PLATE NUMBER</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center",
        //   paddingLeft: 20
        })
      },
    },
    {
        name: "vendor code",
        label: "CAPACITY",
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => {
            return (
              <TableCell key={index} style={{ textAlign: "center" }} >
                <span>CAPACITY</span>
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
        label: "COMMENTS",
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => {
            return (
              <TableCell key={index} style={{ textAlign: "center" }} >
                <span>COMMENTS</span>
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
      name: "id",
      label: "ACTION",
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
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

              <Link style={{ textAlign: "right", paadingRight: 20 }} to={navigatePath + "/pages/view-customer/" + tableMeta.rowData[7]}>

                <Tooltip title="View More Details">
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
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <div className="flex flex-wrap justify-between">
            
            {/* {shouldOpenEditorDialog && (
              <MemberEditorDialog
                handleClose={handleDialogClose}
                open={shouldOpenEditorDialog}
              />
            )} */}
            {shouldOpenConfirmationDialog && (
              <ConfirmationDialog
                open={shouldOpenConfirmationDialog}
                onConfirmDialogClose={handleDialogClose}
                text="Are you sure to delete?"
              />
            )}


            
          </div>
        </div>
        <MUIDataTable
          title={"SCRAP EQUIPMENTS"}
          data={
            userList.filter(obj => obj.div_id == localStorage.getItem('division')).map((item, index) => {


              return [

                ++index,
                item.equipment,
                item.model,
                item.mfg_date,
                item.plate,
                item.capacity,
                item.comments,
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
                        noMatch: 'Sorry, no records found',
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


export default ViewScrapEq;
