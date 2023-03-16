/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import { useHistory } from 'react-router';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import Swal from "sweetalert2";
import url, { getcategories } from "../invoice/InvoiceService";
import useAuth from '../../hooks/useAuth';


const MemberEditorDialog = ({ uid, open, handleClose }) => {
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
  const routerHistory = useHistory();



  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const { user } = useAuth();


  const handleFormSubmit = () => {

    const frmdetails = {

      name: cname,
      description: cdescription,
      user_id: user.id,
      div_id: localStorage.getItem('division')


    }
    // setcdescription('')
    // setcname('')


    url.post('categories', frmdetails)
      .then(function (response) {
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        });
        getcategories()
        routerHistory.push('/product/viewproduct');
      })
      .catch(function (error) {

      })
    setcdescription('')
    setcname('')


  };
  const removeData = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this category?',
      text: 'Any products, services, or categories in it will be uncategorised.',
      icon: 'danger',
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


          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass: {
            zIndex: 1000
          },
          title: 'Cancelled'
          // 'Cancelled',
          // 'Your imaginary file is safe :)',
          // 'error',

        })
      }
    })

  }

  useEffect(() => {
    // url.get("http://dataqueuesystems.com/amaco/amaco/public/api/products-in-category").then(({ data }) => {
    //   if (isAlive) setUserList(data);


    // Object.keys(data).forEach(function(key) {

    //   arr.push(data[key]);
    //   setUserList(arr)
    // });


    // });

  })
  function getrow(e) {
    url.get("products-in-category").then(({ data }) => {
      if (isAlive) setUserList(data);

    });
    // return () => setIsAlive(true);
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
      label: "Description",
      options: {
        filter: true,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {


          return (
            <IconButton onClick={() => removeData(tableMeta.rowData[2])
            }
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
        <h4 className="mb-5">Add Category</h4>
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Name"

                variant="outlined"
                onChange={e => setcname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="cname"
                value={cname}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              {/* <TextValidator
                className="w-full mb-4"
                label="Email"
                onChange={handleChange}
                type="text"
                name="email"
                value={setState.email}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}

              {/* <TextValidator
                className="w-full mb-4"
                label="Phone"
                onChange={handleChange}
                type="text"
                name="phone"
                value={setState.phone}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}

              {/* <TextValidator
                className="w-full mb-4"
                label="Balance"
                onChange={handleChange}
                type="number"
                name="balance"
                value={setState.balance}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Description"
                onChange={e => setcdescription(e.target.value)
                }
                variant="outlined"
                type="textarea"
                name="cdescription"
                value={cdescription}
              />
              {/* <TextValidator
                className="w-full mb-4"
                label="Company"
                onChange={handleChange}
                type="text"
                name="company"
                value={setState.company}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="w-full mb-4"
                label="Address"
                onChange={handleChange}
                type="text"
                name="address"
                value={setState.address}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}


            </Grid>
          </Grid>

          <div className="flex justify-between items-center">
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <div className="flex justify-between items-center">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>

              <Button

                variant="outlined"
                color="primary"
                onClick={() => getrow()}
              >
                view
              </Button>
            </div>
          </div>
        </ValidatorForm>
        <Divider className="mb-2" />
        {isAlive && (
          <MUIDataTable
            title={"Category"}
            columns={columns}
            data={userList.filter(obj => obj.div_id == localStorage.getItem('division'))}
            options={{
              filterType: "textField",
              responsive: "simple",
              selectableRows: "none", // set checkbox for each row
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
          />
        )}
      </div>
    </Dialog>

  );
};

export default MemberEditorDialog;
