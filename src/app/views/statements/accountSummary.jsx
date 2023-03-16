/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  IconButton,
  Tooltip,
  TableCell,
  TableHead
} from "@material-ui/core";
import moment from "moment";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";



import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";


import Swal from "sweetalert2";
import url, { getcategories } from "../invoice/InvoiceService"
import { makeStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const MemberEditorDialog = ({ uid, open, handleClose, catid, catList }) => {
  const classes = useStyles();
  // const [state, setState] = useState({
  //   name: "abc",
  //   email: "",
  //   phone: "",
  //   balance: "",
  //   age: "",
  //   company: "",
  //   address: "",
  //   isActive: false,
  //   isAlive: true,
  // });
  const [cname, setcname] = useState('');
  const [cdescription, setcdescription] = useState('');
  const [userList, setUserList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [isAlivecat, setIsAlivecat] = useState('');
  const [loading, setloading] = useState(false);
  const [from_date, setfrom_date] = useState('01-01-' + new Date().getFullYear());
  const [to_date, setto_date] = useState(new Date());


  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "50px",
    wordBreak: "break-word",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    hyphens: "auto"
  }


  const capitalize_arr = (value) => {
    let wordsArray = value.split(' ')
    let capsArray = []

    wordsArray.forEach(word => {
      capsArray.push(word[0].toUpperCase() + word.slice(1))
    });

    return capsArray.join(' ')
  }
  const resetform = () => {
    setcname('')
    setcdescription('')
  }
  const handleFormSubmit = () => {
    setloading(true)
    var arr = []
    getcategories().then(({ data }) => {

      for (const list in data) {

        arr.push(
          data[list].name
        )

      }



      if (arr.indexOf(cname) > -1) {


        setIsAlivecat(true)
        catid = null
      }
      else {

        const frmdetails = {

          name: cname ? capitalize_arr(cname) : null,
          description: cdescription ? capitalize_arr(cdescription) : null,
          parent_id: catid


        }

        url.post('categories', frmdetails)
          .then(function (response) {
            getcategories()
            Swal.fire({
              title: 'Success',
              type: 'success',
              icon: 'success',
              text: 'Data saved successfully.',
            })
              .then((result) => {


                getcategories().then(({ data }) => {
                  catList(data)

                });

              })
            handleClose()
            // routerHistory.push('/product/viewsubcategory');
          })
          .catch(function (error) {

          })
        setcdescription('')
        setcname('')
        catid = null


      }


    })




  };
  const removeData = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'Any products, services will be uncategorised.',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        url.delete(`categories/${id}`)
          .then(res => {

            getcategories().then(({ data }) => {
              catList(data)

            });
          })
        handleClose()
        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          text: 'Category Deleted Successfully',
          icon: "success"
          // 'Cancelled',
          // 'Your imaginary file is safe :)',
          // 'error',

        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          title: 'Cancelled',
          icon: 'error'
          // 'Cancelled',
          // 'Your imaginary file is safe :)',
          // 'error',

        })
      }
    })

  }
  const setcatid = () => {


    handleClose()
  }

  useEffect(() => {

    url
      .post(
        "all-advance-payment-statement?" +
        "from_date=" +
        moment(from_date).format("YYYY-MM-DD") +
        "&to_date=" +
        moment(to_date).format("YYYY-MM-DD") +
        "&payment_account_id=" + catid
      )
      .then(({ data }) => {

        const myArr = Object.values(data[0].data).sort(
          (a, b) => new Date(b[0].date) - new Date(a[0].date)
        );
      })

  }, [])
  function getrow() {
    if (!catid) {
      url.get("categories").then(({ data }) => {
        setUserList(data);
        setIsAlive(!isAlive)
      });
    }
    else {

      url.get(`sub-category/${catid}`).then(({ data }) => {
        setUserList(data);
        setIsAlive(!isAlive)

      });
    }
    // return () => setIsAlive(false);
  }
  const columns = [
    {
      name: "name", // field name in the row object
      label: "NAME", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    {
      name: "description",
      lable: "DESCRIPTIONS",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (

            <TableCell key={index} >
              <TableHead>DESCRIPTIONS</TableHead>
            </TableCell>

          )

        },
        setCellProps: () => ({
          align: "center"
        })

      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        // filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (

            <TableCell key={index} style={{ textAlign: "right" }}>
              <span style={{ paddingLeft: 15 }}>ACTION</span>
            </TableCell>

          )

        },
        customBodyRender: (value, tableMeta, updateValue) => {


          return (
            <div
              style={{
                textAlign: "right"
              }}
            // className="pr-8"
            >
              <IconButton onClick={() => removeData(tableMeta.rowData[2])
              } style={{ columnStyleWithWidth1 }}
              >
                <Icon color="error">delete</Icon>
              </IconButton>
            </div>


          )

        },
      },
    },
  ];


  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{ zIndex: 1000 }} fullWidth={fullWidth}
      maxWidth={maxWidth}>
      <div className="p-6"  >
        {catid && (
          <h5 className="mb-5">ADD SUB CATEGORY</h5>
        )}
        {!catid && (
          <h5 className="mb-5">ADD CATEGORY</h5>
        )}
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="SubCategory Name"
                autoComplete="off"
                variant="outlined"
                onChange={e => setcname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                inputProps={{ style: { textTransform: 'capitalize' } }}
                name="cname"
                value={cname}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              {isAlivecat && (

                <span><Icon className="mr-2" fontSize="small" color="error">
                  info
                </Icon>
                  <small style={{ color: "red" }}>
                    Category already Exists
                  </small>
                </span>

              )}

            </Grid>


            {/* <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Description"
                inputProps={{style: {textTransform: 'capitalize'}}}
                onChange={e => setcdescription(e.target.value)
                }
                variant="outlined"
                type="textarea"
                name="cdescription"
                value={cdescription}
              />
              
            </Grid> */}
          </Grid>

          <div className="flex">
            <Button variant="outlined" color="primary" type="submit" className="mr-4 py-2" disabled={loading}>
              <Icon>save</Icon> SAVE
            </Button>
            <Button
              className="mr-4 py-2"
              variant="outlined"
              color="secondary"
              onClick={() => setcatid()}
            >
              <Icon>cancel</Icon>CANCEL
            </Button>


            <Button color=".bg-green" variant="outlined" className="mr-4 py-2" type="reset" onClick={resetform}>
              <Icon>loop</Icon>RESET
            </Button>



            {/* <div style={{justifyContent: "flex-end",display:"flex"}}> */}



            {/* </Button> */}
            {isAlive && <Tooltip title="view">
              <Icon color="primary" align="right" style={{ position: 'absolute', right: 50 }} onClick={() => getrow()}>expand_more</Icon>

            </Tooltip>}
            {!isAlive && <Tooltip title="view">
              <Icon color="primary" align="right" style={{ position: 'absolute', right: 50 }} onClick={() => getrow()}>expand_less</Icon>

            </Tooltip>}

          </div>



        </ValidatorForm>
        {/* <Divider className="mb-2" /> */}
        {/* <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          
        >
        
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
           */}

        {!isAlive &&
          <MUIDataTable
            title={"CATEGORY"}
            columns={columns}
            data={userList}

            options={{
              filterType: "textField",
              // border:"1px solid #000",
              responsive: "simple",
              selectableRows: "none", // set checkbox for each row
              elevation: 0,
              // border:true,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
          />
        }
        {/* </ExpansionPanelDetails>
      </ExpansionPanel> */}
      </div>
    </Dialog>

  );
};

export default MemberEditorDialog;
