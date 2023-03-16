/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ConfirmationDialog } from "matx";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from 'axios';
import { ApiKey } from "../invoice/InvoiceService";
import useAuth from '../../hooks/useAuth';

import {
  Dialog,
  Menu,
} from "@material-ui/core";

import history from "history.js";
import { getVendorList, getcategories, getmanufacturer } from "../invoice/InvoiceService"
import MemberEditorDialog1 from "../../views/product/manufacture";
import NestedMenuItem from "material-ui-nested-menu-item";
import FormDialog_product from "./Addcategory_popup";
import MemberEditorDialog_category from "./Addcategory_popup";

// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Icon,
  Grid,
  TextField,
  MenuItem,
  Button
} from "@material-ui/core";

import "date-fns";

// import Addparty from "./addparty"
import url, { capitalize_arr } from "../invoice/InvoiceService"






const MemberEditorDialog_product = ({ uid, open, handleClose, productid, margin, pprice, marginprice, calcualteprice, productname }) => {
  const [state, setState] = useState({
    date: new Date(),
  });
  const data = [
    {
      value: "TON",
      label: "TON-TONNES"
    },
    {
      value: "TUB",
      label: "TUB-TUBES"
    },
    {
      value: "UNT",
      label: "UNT-UNITS"
    },

    {
      value: "YDS",
      label: "YDS-YARDS"
    },
    {
      value: "SET",
      label: "SET-SETS"
    },
    {
      value: "SQF",
      label: "SQF-SQUARE FEET"
    },
    {
      value: "SQY",
      label: "SQY-SQUARE YARDS"
    },
    {
      value: "THD",
      label: "THD-THOUSANDS"
    },

    {
      value: "KLR",
      label: "KLR-KILOLITER"
    },
    {
      value: "KME",
      label: "KME-KILOMETER"
    },
    {
      value: "KILOGRAM",
      label: "KG-KILOGRAM"
    },
    {
      value: "MLT",
      label: "MLT-MILLILITER"
    },
    {
      value: "MTR",
      label: "MTR-METERS"
    },
    {
      value: "NOS",
      label: "NOS-NUMBERS"
    },
    {
      value: "PAC",
      label: "PAC-PACKS"
    },
    {
      value: "PCS",
      label: "PCS-PACKS"
    },
    {
      value: "PRS",
      label: "PAIRS"
    },
    {
      value: "QTL",
      label: "QTL-QUINTAL"
    },
    {
      value: "ROL",
      label: "ROLLS"
    },
    {
      value: "CMS",
      label: "CENTIMETER"
    },
    {
      value: "CTN",
      label: "CTN-CARTONS"
    },
    {
      value: "DOZ",
      label: "DOZ-DOZEN"
    },
    {
      value: "DRM",
      label: "DRM-DRUM"
    },
    {
      value: "GMS",
      label: "GRAMS"
    },
    {
      value: "GMS",
      label: "GRAMS"
    },
    {
      value: "GRS",
      label: "GRS-GROSS"
    },

  ];


  const { user } = useAuth();

  // const [selectedOption, setSelectedOption] = useState(data);

  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  // manufacture
  const [shouldOpenEditorDialog1, setShouldOpenEditorDialog1] = useState(false);
  const [
    shouldOpenConfirmationDialog1,
    setShouldOpenConfirmationDialog1,
  ] = useState(false);
  const handleDialogClose1 = () => {
    setShouldOpenEditorDialog1(false);
    getcategory()

  };
  const handleDialogClose = () => {
    setcategory_id('')
    setShouldOpenEditorDialog(false);
    getcategory()

  };
  const onchange1 = (id, name) => {
    setcat_id(id)
    setcategory_name(name)

  };
  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedValue1, setSelectedValue1] = useState('');
  const [product, setproduct] = useState('');
  const [name_in_ar, setname_in_ar] = useState('');
  const [description, setdescription] = useState('');
  const [unit_of_measue, setunit_of_measue] = useState('');
  const [unit_Price, setunit_Price] = useState('');
  const [selectedOption1, setselectedOption1] = useState('');
  const [real_price, setreal_price] = useState('');
  const [ptype, setptype] = useState('');
  const [hsn, sethsn] = useState('');
  const [iq, setiq] = useState(0);
  const [mq, setmq] = useState(0);
  const [manid, setmanid] = useState('');
  const [modelno, setmodelno] = useState('');
  const [ooptions1, setooptions] = useState([]);
  const [vendors, setvendors] = useState([]);
  const [manufacture, setmanufacture] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [category_list, setcategory_list] = useState([]);
  const { id } = useParams();
  const [productcatid, setproductcatid] = useState(id);
  const [menuPosition, setMenuPosition] = useState(null);
  const [cat, setcat] = useState([]);
  const [message, setmessage] = useState(false);
  const [catid, setcatid] = useState('');
  const [category_id, setcategory_id] = useState('');
  const [category_name, setcategory_name] = useState('');
  const [catList, setcatList] = useState([]);



  const product_type = [
    "Non inventory",
    "Inventory",
    "Service"
  ];



  const setcat_id = (id) => {
    setcatid(id);
    setMenuPosition(null)
  }



  useEffect(() => {
    getVendorList().then(({ data }) => {

      setCustomerList(data)
      getcategory()

    });
    getcategories().then(({ data }) => {

      setcategory_list(data)

    });

    url.get("products-in-category").then(({ data }) => {
      setooptions(data);
    })
    getmanufacturer().then(({ data }) => {

      setmanufacture(data.filter(obj => obj.div_id == localStorage.getItem('division')));



    });
    url.get("all-categories").then(({ data }) => {

      setcat(data)



    });


  }, []);



  const handleRightClick = (event: React.MouseEvent) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
  };


  const submitValue = () => {
    //     Axios.post(`https://translation.googleapis.com/language/translate/v2?key=${ApiKey}&q=${product}&target=ar`, {
    //       method: 'POST',
    //       headers: { 
    //         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
    // "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
    // "Access-Control-Max-Age": 86400
    //       },
    //     })
    //       .then(({ data }) => {




    const frmdetails = {
      party_id: vendors,
      name: product ? capitalize_arr(product) : '',
      description: description ? capitalize_arr(description) : '',
      unit_price: unit_Price,
      unit_of_measure: unit_of_measue,
      category_id: catid,
      division_id: selectedValue,
      type: ptype,
      hsn_code: hsn,
      initial_quantity: iq,
      minimum_quantity: mq,
      manufacturer_id: manid,
      model_no: modelno,
      user_id: user.id,
      div_id: localStorage.getItem('division'),
      // name_in_ar: data.data.translations[0].translatedText


    }
    // console.log('dsds');
    // if (catid) {
    url.post('products', frmdetails)
      .then(function (response) {


        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            handleClose()
          })
      })
      .catch(function (error) {

      })
    resetform()
    // }
    // else {
    //   setmessage(false)
    // }
    // })

  }
  function cancelform() {
    // window.location.href="./Viewproduct"
    // getcategories().then(({ data }) => {


    // });
    // routerHistory.push(`/product/Viewproduct/${id}`)
  }

  function getcategory(e) {
    url.get("products-in-category").then(({ data }) => {
      setooptions(data);
    });
  }

  const handleDateChange = (date) => {
    setState({ ...state, date });
  };
  const resetform = () => {
    setmessage(false)
    setunit_Price('');
    setunit_of_measue('');
    setreal_price('');
    setiq('');
    setmq('');
    sethsn('');
    setproduct('');
    setselectedOption1('');
    setptype('');
    setdescription('');
    // setmanufacture('');
    setmodelno('');
    setcategory_name('');

  };
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");




  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{ zIndex: 1000 }} fullWidth={fullWidth}
      maxWidth={maxWidth}>
      <div className="p-6"  >

        <h4 className="mb-5">ADD PRODUCT</h4>


        <ValidatorForm
          onSubmit={submitValue}
          autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Product Name"
                variant="outlined"
                size="small"
                value={product}
                inputProps={{ style: { textTransform: 'capitalize' } }}
                onChange={e => setproduct(e.target.value)}
                type="text"
                name="product"
                required

              />
              {/* <TextValidator
              className="mb-4 w-full"
              label="اسم المنتج"
              variant="outlined"
              size="small"
              
              value={name_in_ar}
              onChange={e => setname_in_ar(e.target.value)}
              type="text"
              name="product"
              validators={[
                "required",
              ]}
              errorMessages={["this field is required"]}

            /> */}
              <TextValidator
                className="mb-4 w-full"
                label="Description"
                value={description}
                inputProps={{ style: { textTransform: 'capitalize' } }}
                onChange={e => setdescription(e.target.value)}
                type="textarea"
                size="small"
                name="description"
                variant="outlined"


              // validators={["required"]}
              // errorMessages={["this field is required"]}
              />
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  label="Unit of Measure"
                  onChange={e => setunit_of_measue(e.target.value)}
                  type="text"
                  size="small"
                  value={unit_of_measue}
                  name="unit_of_measue"
                  variant="outlined"
                  validators={[
                    "required",
                  ]}
                  fullWidth
                  errorMessages={["this field is required"]}
                  select
                // validators={["required"]}
                // errorMessages={["this field is required"]}
                >
                  {data.map((item, ind) => (
                    <MenuItem value={item.value} key={item}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className="ml-2"
                  label="Model Number"
                  variant="outlined"
                  value={modelno}
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}

                  onChange={e => setmodelno(e.target.value)}
                  fullWidth
                />
              </div>

              {shouldOpenEditorDialog1 && (

                <MemberEditorDialog1
                  handleClose={handleDialogClose1}
                  open={shouldOpenEditorDialog1}
                  setid={setproductcatid}
                  manufacture={setmanufacture}
                />

              )}
              {shouldOpenConfirmationDialog1 && (

                <ConfirmationDialog
                  open={shouldOpenConfirmationDialog1}
                  onConfirmDialogClose={handleDialogClose1}
                  text="Are you sure to delete?"

                />
              )}

              <>
                {shouldOpenEditorDialog && (

                  <MemberEditorDialog_category
                    handleClose={handleDialogClose}
                    open={shouldOpenEditorDialog}
                    catid={category_id}
                    catList={setcat}
                  //  setid={setproductcatid}
                  //  manufacture={setmanufacture}
                  />

                )}
                {shouldOpenConfirmationDialog && (

                  <ConfirmationDialog
                    open={shouldOpenConfirmationDialog1}
                    onConfirmDialogClose={handleDialogClose1}
                    text="Are you sure to delete?"

                  />
                )}
              </>


            </Grid>


            <Grid item sm={6} xs={12}>
              <div className="flex mb-4">
                {/* <TextValidator
              className="mr-2"
              label="category type"
              name="selectedvalue"
              size="small"
              variant="outlined"
              select
              value={selectedOption1 || ""}
              onChange={e => setselectedOption1(e.target.value)
              }
              validators={[
                "required",
              ]}
              errorMessages={["this field is required"]}

            >
              <MenuItem>
                <Button
                  onClick={() => {
                    setShouldOpenEditorDialog(true);
                  }}
                >
                  <Icon>add</Icon>category
                </Button>
              </MenuItem>
              {ooptions1.map((item, ind) => (
                <MenuItem value={item.id} key={item}>
                  {item.name}
                </MenuItem>
              ))}
            </TextValidator> */}
                {/* <TextField
                className="mr-2"
                label="category type"
                name="selectedvalue"
                size="small"
                variant="outlined"
                errorMessages={["this field is required"]}
                value={selectedOption1 || ""}
                onChange={e => setselectedOption1(e.target.value)}
                fullWidth
                
              />   */}

                <TextField
                  className="mr-0"
                  label="Manufacturer"
                  variant="outlined"
                  onChange={e => setmanid(e.target.value)}
                  value={manid}
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}
                  select
                  fullWidth
                >
                  <MenuItem onClick={() => {
                    setShouldOpenEditorDialog1(true);
                  }}>

                    <Icon >add</Icon>New

                  </MenuItem>
                  {manufacture.filter(obj => obj.div_id == localStorage.getItem('division')).map((item, ind) => (
                    <MenuItem value={item.id} key={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  label="Product Type"
                  name="selectedvalue"
                  size="small"
                  fullWidth
                  variant="outlined"
                  select
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}

                  value={ptype}
                  onChange={e => setptype(e.target.value)
                  }
                >
                  {product_type.map((item, ind) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className="ml-2"
                  label="HSN number"
                  size="small"
                  variant="outlined"
                  value={hsn}
                  onChange={e => sethsn(e.target.value)}
                  type="text"
                  name="hsn"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}
                  fullWidth

                // validators={["required"]}
                // errorMessages={["this field is required"]}
                />
              </div>
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  label="Initial Quantity"
                  variant="outlined"
                  onChange={e => setiq(e.target.value)}
                  value={iq}
                  size="small"
                  type="number"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}

                  fullWidth
                />
                <TextField
                  className="ml-2"
                  label="Minimum Quantity"
                  variant="outlined"
                  value={mq}
                  type="number"
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}

                  onChange={e => setmq(e.target.value)}
                  fullWidth
                />

              </div>
              <Button className="mb-4 w-full" variant="outlined" size="small" onClick={handleRightClick}>
                <span style={{ textAlign: 'left' }}>
                  Select Category
                </span>

                <Menu
                  open={!!menuPosition}
                  onClose={() => setMenuPosition(null)}
                  anchorReference="anchorPosition"
                  anchorPosition={menuPosition}
                >
                  <MenuItem onClick={() => {
                    setShouldOpenEditorDialog(true);
                    setMenuPosition(null)
                  }}>
                    <Icon>add</Icon>Category
                  </MenuItem>
                  {cat.filter(obj => obj.category.div_id == localStorage.getItem('division')).map((item, i) =>
                  (



                    <NestedMenuItem
                      label={item.category.name}
                      parentMenuOpen={!!menuPosition}

                    >
                      <MenuItem onClick={() => {
                        setShouldOpenEditorDialog(true);
                        setMenuPosition(null)
                        setcategory_id(item.category.id)
                      }}>
                        <Icon>add</Icon>Sub Category
                      </MenuItem>
                      {item.sub_categories.length > 0 && item.sub_categories.map((items, i) =>
                      (
                        <>
                          <MenuItem onClick={() => onchange1(items.id, items.name)}>{items.name}</MenuItem>
                        </>
                      ))}


                    </NestedMenuItem>
                  )

                  )}



                </Menu>
              </Button>
              {category_name && <TextField
                className="ml-0"
                label="Category"
                variant="outlined"
                value={category_name}
                type="text"
                size="small"
                validators={[
                  "required",
                ]}
                errorMessages={["this field is required"]}

                // onChange={e => setmq(e.target.value)}
                fullWidth
              />}

            </Grid>
            {message && (<><Icon onClose={() => setmessage(false)} color="error">error</Icon><span>Select the category</span></>)}
          </Grid>


          <Button className="mr-4 py-2" color="primary" variant="outlined" type="submit">
            <Icon>save</Icon>
            <span className="pl-2 capitalize">SAVE</span>
          </Button>

          <Button className="mr-4 py-2" color="secondary" variant="outlined" onClick={handleClose}>
            <Icon>cancel</Icon>
            <span className="pl-2 capitalize">CANCEL</span>
          </Button>
          <Button color=".bg-green" className="py-2" variant="outlined" type="reset" onClick={resetform}>
            <Icon>loop</Icon>
            <span className="pl-2 capitalize">RESET</span>
          </Button>
        </ValidatorForm>
      </div>


    </Dialog>




  );

}


export default MemberEditorDialog_product;
