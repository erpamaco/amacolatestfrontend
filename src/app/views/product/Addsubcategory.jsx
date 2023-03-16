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

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useAuth from '../../hooks/useAuth';



import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";


import Swal from "sweetalert2";
import url, { getcategories, GDIV } from "../invoice/InvoiceService"
import { makeStyles } from "@material-ui/core/styles";


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
 
  const [cname, setcname] = useState('');//category or subCategory Name
  const [cdescription, setcdescription] = useState('');//category or SubCategory description
  const [CatList, setCatList] = useState([]);//Category List
  const [isAlive, setIsAlive] = useState(true);
  const [isAlivecat, setIsAlivecat] = useState('');
  const [loading, setloading] = useState(false);//Enable the save button


  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");//Maximum width of Dialogue Box is small
  const { user } = useAuth();
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

//Catilize the category name
  const capitalize_arr = (value) => {
    let wordsArray = value.split(' ')
    let capsArray = []

    wordsArray.forEach(word => {
      capsArray.push(word[0].toUpperCase() + word.slice(1))
    });

    return capsArray.join(' ')
  }
  /*Rest the Form */
  const resetform = () => {
    setcname('')//Customer Name
    setcdescription('')//Customer Description
  }

  /*Form Submit */
  const handleFormSubmit = () => {
    setloading(true)//Disable the save button
    var arr = []
    /*api to display the category List */
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

          name: cname ? capitalize_arr(cname) : null,//category name
          description: cdescription ? capitalize_arr(cdescription) : null,//category description
          parent_id: catid,//category Id
          user_id: user.id,//user id
          div_id: localStorage.getItem('division')//division id


        }

        /*API post the categpry Information */
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

                /*Get the data from the api categories and filter based on division id */
                getcategories().then(({ data }) => {
                  console.log("sss")
                  const d = data.filter(obj => obj.div_id == localStorage.getItem('division'))
                  console.log("sss",d)
                  catList(d)

                });

              })
            catid = null;
            handleClose()//Close the dialogue box
           
          })
          .catch(function (error) {

          })
        setcdescription('')//reset the category description to empty
        setcname('')//reset the category name to empty
        catid = null


      }


    })




  };
  /*remove the category */
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
              catList(data.filter(obj => obj.div_id == localStorage.getItem('division')))

            });
          })
        setIsAlive(true);
        handleClose()
        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          text: 'Category Deleted Successfully',
          icon: "success"
         

        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          title: 'Cancelled',
          icon: 'error'
          

        })
      }
    })

  }
  /*Close the dialogue Box */
  const setcatid = () => {


    handleClose()
  }

  useEffect(() => {

    

  }, [])
  function getrow() {
/*List out the category List */
    if (!catid) {

      url.get("categories").then(({ data }) => {
        setCatList(data);
        setIsAlive(!isAlive)
      });
    }
    /*List out the Sub category List */
    else {

      url.get(`sub-category/${catid}`).then(({ data }) => {
        setCatList(data);
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
      name: "id",
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
              <IconButton onClick={() => removeData(tableMeta.rowData[1])
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
                label={catid ? "Sub Category Name" : "Category Name"}
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



           
            {isAlive && <Tooltip title="view">
              <Icon color="primary" align="right" style={{ position: 'absolute', right: 50 }} onClick={() => getrow()}>expand_more</Icon>

            </Tooltip>}
            {!isAlive && <Tooltip title="view">
              <Icon color="primary" align="right" style={{ position: 'absolute', right: 50 }} onClick={() => getrow()}>expand_less</Icon>

            </Tooltip>}

          </div>



        </ValidatorForm>
        
        {!isAlive &&
          <MUIDataTable
            title={"CATEGORY"}
            columns={columns}
            data={CatList.filter(obj => obj.div_id == localStorage.getItem('division'))}

            options={{
              filterType: "textField",
              responsive: "simple",
              selectableRows: "none", // set checkbox for each row
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
          />
        }
       
      </div>
    </Dialog>

  );
};

export default MemberEditorDialog;
