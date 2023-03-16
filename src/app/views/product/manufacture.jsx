/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
// import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import url, { getmanufacturer, capitalize_arr } from "../invoice/InvoiceService"
import useAuth from '../../hooks/useAuth';


const MemberEditorDialog1 = ({ uid, open, handleClose, setid, manufacture }) => {
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



  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const { user } = useAuth();




  const handleFormSubmit = () => {

    const frmdetails = {

      name: cname ? capitalize_arr(cname) : '',
      description: cdescription ? capitalize_arr(cdescription) : "",
      div_id: localStorage.getItem('division'),
      user_id: user.id

    }
    // setcdescription('')
    // setcname('')


    url.post('manufacturer', frmdetails)
      .then(function (response) {
        getmanufacturer()
        Swal.fire({
          icon: 'success',
          type: 'success',
          text: 'Data saved successfully.',
        });

        getmanufacturer().then(({ data }) => {
          manufacture(data)
          setUserList(data)


        });
      })



    handleClose()


    setcdescription('')
    setcname('')


  };
  const removeData = (id) => {
    Swal.fire({
      text: 'Are you sure you want to delete this manufacturer?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        zIndex: 1000
      },
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        url.delete(`manufacturer/${id}`)
          .then(res => {
            getrow(res)

            Swal.fire({
              customClass: {
                zIndex: 1000
              },
              title: 'Deleted Successfully',
              icon: 'success'
              // 'Cancelled',
              // 'Your imaginary file is safe :)',
              // 'error',

            })
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
          // 'error',5

        })
      }
    })

  }

  useEffect(() => {
    url.get('manufacturer').then(({ data }) => {
      setUserList(data);

    });

  }, [])
  function getrow(e) {
    setIsAlive(!isAlive)
    getmanufacturer().then(({ data }) => {
      setUserList(data);
      manufacture(data);

    });
    // return () => setIsAlive(true);
  }
  const columns = [
    {
      name: "name", // field name in the row object
      label: "NAME", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    // {
    //   name: "description",
    //   label: "Description",
    //   options: {
    //     filter: true,
    //   },
    // },
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {


          return (
            <IconButton onClick={() => removeData(tableMeta.rowData[1])
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
        <h4 className="mb-5">ADD MANUFACTURER</h4>
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Name"
                autoComplete="none"
                variant="outlined"
                onChange={e => setcname(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="cname"
                value={cname}
                validators={["required"]}
                inputProps={{ style: { textTransform: 'capitalize' } }}
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

            {/* <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Description"
                onChange={e => setcdescription(e.target.value)
                }
                inputProps={{style: {textTransform: 'capitalize'}}}
                variant="outlined"
                type="textarea"
                name="cdescription"
                value={cdescription}
              />
              

            </Grid> */}
          </Grid>

          {/* <div className="flex justify-between items-center"> */}
          <Button variant="outlined" className="mr-4 py-2" color="primary" type="submit">
            <Icon>save</Icon>SAVE
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            className="mr-4 py-2"
            onClick={() => handleClose()}
          >
            <Icon>cancel</Icon> CANCEL
          </Button>

          <Button

            variant="outlined"
            color="primary"
            onClick={() => getrow()}
          >
            <Icon>remove_red_eye</Icon> VIEW
          </Button>

          {/* </div> */}
        </ValidatorForm>
        <Divider className="mb-2" />
        {!isAlive && (
          <MUIDataTable
            title={"Manufacturer"}
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

export default MemberEditorDialog1;
