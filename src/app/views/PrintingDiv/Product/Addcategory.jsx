import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import Swal from "sweetalert2";
import url, { getcategories } from "../../invoice/InvoiceService"

const MemberEditorDialog = ({ uid, open, handleClose, catid, catList }) => {
  const [state, setState] = useState({
    name: "abc",
    email: "",
    phone: "",
    balance: "",
    age: "",
    company: "",
    address: "",
    isActive: false,
    isAlive: true,
  });
  const [cname, setcname] = useState('');
  const [cdescription, setcdescription] = useState('');
  const [userList, setUserList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [isAlivecat, setIsAlivecat] = useState('');



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

          name: capitalize_arr(cname),
          description: capitalize_arr(cdescription),
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

    // url.get(url+"categories").then(({ data }) => {
    //   setUserList(data);

    // });
    // url.get("http://dataqueuesystems.com/amaco/amaco/public/api/products-in-category").then(({ data }) => {
    //   if (isAlive) setUserList(data);


    // Object.keys(data).forEach(function(key) {

    //   arr.push(data[key]);
    //   setUserList(arr)
    // });


    // });

  }, [])
  function getrow() {
    if (!catid) {
      url.get("categories").then(({ data }) => {
        setUserList(data);
        setIsAlive(false)
      });
    }
    else {

      url.get(`sub-category/${catid}`).then(({ data }) => {
        setUserList(data);
        setIsAlive(false)

      });
    }
    // return () => setIsAlive(false);
  }
  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    {
      name: "description",
      lable: "Descriptions"
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {


          return (
            <IconButton onClick={() => removeData(tableMeta.rowData[2])
            } style={{ columnStyleWithWidth1 }}
            >
              <Icon color="error">delete</Icon>
            </IconButton>



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
          <h4 className="mb-5">Add Sub Category</h4>
        )}
        {!catid && (
          <h4 className="mb-5">Add Category</h4>
        )}
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Name"
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


            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Description"
                inputProps={{ style: { textTransform: 'capitalize' } }}
                onChange={e => setcdescription(e.target.value)
                }
                variant="outlined"
                type="textarea"
                name="cdescription"
                value={cdescription}
              />

            </Grid>
          </Grid>

          <div className="flex">
            <Button variant="outlined" color="primary" type="submit" className="mr-4 py-2">
              <Icon>save</Icon> Save
            </Button>
            <Button
              className="mr-4 py-2"
              variant="outlined"
              color="secondary"
              onClick={() => setcatid()}
            >
              <Icon>cancel</Icon>Cancel
            </Button>


            <Button color=".bg-green" variant="outlined" className="mr-4 py-2" type="reset" onClick={resetform}>
              <Icon>loop</Icon>Reset
            </Button>



            {/* <div style={{justifyContent: "flex-end",display:"flex"}}> */}



            {/* </Button> */}
            <Tooltip title="view">
              <Icon color="primary" align="right" style={{ position: 'absolute', right: 50 }} onClick={() => getrow()}>expand_more</Icon>
            </Tooltip>
          </div>



        </ValidatorForm>
        {/* <Divider className="mb-2" /> */}
        {!isAlive &&
          <MUIDataTable
            title={"Category"}
            columns={columns}
            data={userList}
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
