import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ConfirmationDialog } from "matx";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import MemberEditorDialog from "../../product/Addcategory";
import history from "history.js";
import { getVendorList, getmanufacturer, ApiKey } from "../../invoice/InvoiceService"
import MemberEditorDialog1 from "../../../views/product/manufacture";

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
import Axios from "axios";
import url from "../../invoice/InvoiceService"




const SimpleForm = ({ open, handleClose }) => {
  const [state, setState] = useState({
    date: new Date(),
  });
  const data = [
    {
      value: "TONNES",
      label: "TON-TONNES"
    },
    {
      value: "TUBES",
      label: "TUB-TUBES"
    },
    {
      value: "UNITS",
      label: "UNT-UNITS"
    },

    {
      value: "YARDS",
      label: "YDS-YARDS"
    },
    {
      value: "SETS",
      label: "SET-SETS"
    },
    {
      value: "SQUARE FEET",
      label: "SQF-SQUARE FEET"
    },
    {
      value: "SQUARE YARDS",
      label: "SQY-SQUARE YARDS"
    },
    {
      value: "THOUSANDS",
      label: "THD-THOUSANDS"
    },

    {
      value: "KILOLITER",
      label: "KLR-KILOLITER"
    },
    {
      value: "KILOMETER",
      label: "KME-KILOMETER"
    },
    {
      value: "KILOGRAM",
      label: "KG-KILOGRAM"
    },
    {
      value: "MILLILITER",
      label: "MLT-MILLILITER"
    },
    {
      value: "METERS",
      label: "MTR-METERS"
    },
    {
      value: "NUMBERS",
      label: "NOS-NUMBERS"
    },
    {
      value: "PACKS",
      label: "PAC-PACKS"
    },
    {
      value: "PIECES",
      label: "PCS-PIECES"
    },
    {
      value: "PAIRS",
      label: "PAIRS"
    },
    {
      value: "QUINTAL",
      label: "QTL-QUINTAL"
    },
    {
      value: "ROLLS",
      label: "ROLLS"
    },
    {
      value: "CENTIMETER",
      label: "CENTIMETER"
    },
    {
      value: "CARTONS",
      label: "CTN-CARTONS"
    },
    {
      value: "DOZEN",
      label: "DOZ-DOZEN"
    },
    {
      value: "DRUM",
      label: "DRM-DRUM"
    },
    {
      value: "GRAMS",
      label: "GRAMS"
    },

    {
      value: "GROSS",
      label: "GRS-GROSS"
    },

  ];



  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const [shouldOpenEditorDialog1, setShouldOpenEditorDialog1] = useState(false);
  const [
    shouldOpenConfirmationDialog1,
    setShouldOpenConfirmationDialog1,
  ] = useState(false);
  const handleDialogClose1 = () => {
    setShouldOpenEditorDialog1(false);
    getcategory()

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
  const [subcategory, setsubcategory] = useState('');
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
  const { id } = useParams();
  const [productcatid, setproductcatid] = useState(id);
  const [loading, setloading] = useState(false);


  const product_type = [
    "Non inventory",
    "Inventory",
    "Service"
  ];


  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);


  };


  useEffect(() => {


    
    getVendorList().then(({ data }) => {

      setCustomerList(data)
      getcategory()

    });

    url.get("products-in-category").then(({ data }) => {
      setooptions(data);
    })
    getmanufacturer().then(({ data }) => {

      setmanufacture(data);



    });
    url.get("categories/" + id).then(({ data }) => {

      setsubcategory(data.name)



    });


  }, []);

  const submitValue = () => {
    setloading(true)
    //     Axios.post(`https://translation.googleapis.com/language/translate/v2?key=${ApiKey}&q=${product}&target=ar`, {
    //       method: 'POST',
    //       headers: { 
    //         "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
    // "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
    // "Access-Control-Max-Age": 86400
    //       },
    //     })
    //       .then(({ data }) => {



    // if(data.data.translations[0].translatedText)
    // {
    const frmdetails = {
      party_id: vendors,
      name: (product),
      description: description ? (description) : '',
      unit_price: unit_Price,
      unit_of_measure: unit_of_measue,
      category_id: id,
      division_id: selectedValue,
      type: ptype,
      hsn_code: hsn,
      initial_quantity: iq,
      minimum_quantity: mq,
      manufacturer_id: manid,
      model_no: modelno,
      name_in_ar: data.data.translations[0].translatedText

    }




    url.post('products', frmdetails)
      .then(function (response) {


        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            routerHistory.push(`/product/viewproduct/${id}`)
          })
      })
      .catch(function (error) {

      })
    resetform()

    // }
    // })
  }


  function getcategory(e) {
    url.get("products-in-category").then(({ data }) => {
      setooptions(data);
    });
  }


  const resetform = () => {
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

  };





  return (

    <div>
      <Card className="p-4" elevation={3}>
        <ValidatorForm onSubmit={submitValue} onError={() => null}>
          <Grid container spacing={6}>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <h6>PRODUCT DETAILS</h6>
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
                validators={[
                  "required",
                ]}
                errorMessages={["this field is required"]}

              // validators={["required"]}
              // errorMessages={["this field is required"]}
              />
              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  label="Unit of measure"
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




            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="flex mb-4 mt-6">
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
                  className="mr-2"
                  label="Sub Category"
                  variant="outlined"
                  value={subcategory}
                  size="small"
                  validators={[
                    "required",
                  ]}
                  errorMessages={["this field is required"]}

                  onChange={e => setmq(e.target.value)}
                  fullWidth
                />
                <TextField
                  className="ml-2 "
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
                  {manufacture.map((item, ind) => (
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
                  label="Initial quantity"
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
              <div className="flex mb-4">





              </div>



            </Grid>
          </Grid>

          <Button className="mr-4 py-2" color="primary" variant="outlined" type="submit" disabled={loading}>
            <Icon>save</Icon>
            <span className="pl-2 capitalize">SAVE</span>
          </Button>

          <Button className="mr-4 py-2" color="secondary" variant="outlined" onClick={() => routerHistory.push(`/product/viewproduct/${id}`)}>
            <Icon>cancel</Icon>
            <span className="pl-2 capitalize">CANCEL</span>
          </Button>
          <Button color=".bg-green" className="mr-4 py-2" variant="outlined" type="submit" onClick={resetform}>
            <Icon>loop</Icon>
            <span className="pl-2 capitalize">RESET</span>
          </Button>
        </ValidatorForm>
        <card>
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

        </card>
        <card>
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

        </card>
      </Card>
    </div>


  );
};

export default SimpleForm;
