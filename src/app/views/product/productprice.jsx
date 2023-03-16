/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import { Icon, MenuItem } from "@material-ui/core";
import useAuth from '../../hooks/useAuth';

// import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import url, { getcategories } from "../invoice/InvoiceService"
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
const MemberEditorDialog = ({ uid, open, fun, handleClose, catid, catList, productprice, partyids }) => {
 
  const [cname, setcname] = useState('');
  const [cprice, setcprice] = useState('');
  const [userList, setUserList] = useState([]);
  const [customerList, setcustomerList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [isAlivecat, setIsAlivecat] = useState('');
  const [disable, setDisable] = useState(false)
  const { user } = useAuth();



  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");



  const handleFormSubmit = () => {


    setDisable(true)
    const frmdetails = {

      product_id: catid,
      party_id: cname,
      price: parseFloat(cprice).toFixed(2),
      div_id: localStorage.getItem('division'),
      user_id: user.id,


    }

    url.post('product-price', frmdetails)
      .then(function (response) {
        getcategories()
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {

            
          })
        try {
          fun(true);
        } catch (error) {

        }
        handleClose()

        setcname('');
        setcprice('')
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
        fun();
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
          title: 'Cancelled'
          

        })
      }
    })

  }

  useEffect(() => {
    setcname(partyids)
    url.get("parties-except/" + catid).then(({ data }) => {


      const b = data.ids
    
      let a = data.data
      const c = data.ids.map((item) => {

        a = a.filter(obj => obj.id !== item)
        return a
      });

      const l = c.length - 1;
      // console.log(c[l]);

      c[l] == undefined ? setcustomerList(data.data) : setcustomerList(c[l])

    })

    
  }, [])

  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    {
      name: "price",
      label: "price",
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


        <h5 className="mb-5">PRODUCT PRICE</h5>

        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Vendor"

                variant="outlined"
                onChange={e => setcname(e.target.value)
               
                }
                type="text"
                name="cname"
                value={cname}
                validators={['required']}
                errorMessages={["This field is required"]}
                select

              >
                {customerList.map((item, ind) => (

                  <MenuItem value={item.id} key={item}>
                    {item.firm_name}
                  </MenuItem>
                ))}
              </TextValidator>
              

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
              <CurrencyTextField
                className="w-full mb-4"
                label="Price"
                variant="outlined"
                value={cprice}
                required={true}
                fullWidth
                currencySymbol="SAR"
                onChange={(event, value) => setcprice(value)}
                
              />

            </Grid>
          </Grid>

          <div className="flex  items-center">
            <Button variant="outlined" disabled={disable} className="mr-4 py-2" color="primary" type="submit">
              <Icon>save</Icon>SAVE
            </Button>
            <Button
              variant="outlined"
              className="mr-4 py-2"
              color="secondary"
              onClick={() => handleClose()}
            >
              <Icon>cancel</Icon>CANCEL
            </Button>
            
          </div>

        </ValidatorForm>

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

