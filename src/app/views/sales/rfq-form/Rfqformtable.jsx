import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  IconButton,
  Icon,
  Select,
  MenuItem,
} from "@material-ui/core";
import useDynamicRefs from 'use-dynamic-refs';

import { FieldArray } from "formik";
import { Autocomplete } from "@material-ui/lab";
import { calculateAmount, getCustomerList } from "./Rfqformservice";
import { getProductList, data } from "../../../../app/views/invoice/InvoiceService"
import { SettingsInputAntenna } from "@material-ui/icons";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";


const InvoiceItemTable = ({ values, handleChange, setFieldValue, CustomerList }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [getRef, setRef] = useDynamicRefs();
  const filter = createFilterOptions();

  let inputRef = [];
  let priceRef = [];
  const [productList, setProductList] = useState([]);
  // const [customerList, setCustomerList] = useState([]);


  const controlKeyPress = (e, id, nextid, prev) => {
    // console.log(e?.keyCode)
    // console.log(id)
    // console.log(nextid)

    if (e?.keyCode == 39) {
      if (nextid?.includes('purchase_price')) {
        priceRef[parseInt(nextid)].focus();
      } else if (nextid == null) {
        // if (e?.keyCode == 13) {

        // }
      } else {
        // console.log('else');
        getRef(nextid).current.focus();
      }
    } else if (e?.keyCode == 38) {
      const a = id.split(parseInt(id));
      let i = parseInt(id)
      if (--i >= 0) {
        const r = i + a[1];
        if (r.includes('product_id')) {
          inputRef[parseInt(r)].focus();
        } else {
          getRef(r).current.focus();
        }

      }

    } else if (e?.keyCode == 40) {
      const a = id.split(parseInt(id));
      let i = parseInt(id)
      // if (++i) {
      const r = ++i + a[1];
      try {
        if (r.includes('product_id')) {
          inputRef[parseInt(r)].focus();
          // inputRef.focus();
        } else {
          getRef(r).current.focus();
        }
      } catch (error) {
        console.error('eror')
        // addItemToInvoiceList();
      }

      // }

    } else if (e?.keyCode == 37) {
      if (prev == null) {

      } else {
        if (prev.includes('product_id')) {
          inputRef[parseInt(prev)].focus();

          // inputRef.focus();
        } else if (prev?.includes('purchase_price')) {
          priceRef[parseInt(prev)].focus();
        } else {
          getRef(prev).current.focus();
        }
      }
    }
  }

  useEffect(() => {
    getProductList().then(({ data }) => {

      if (isAlive) setProductList(data.filter(obj => obj.div_id == localStorage.getItem('division')));


    });


    return () => setIsAlive(false);
  }, [isAlive]);


  return (
    <FieldArray name="rfq_details" >
      {(arrayHelpers) => (

        <div className="overflow-auto">
          <Table className="whitespace-pre min-w-750">
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={2}>S.NO.</TableCell>
                <TableCell colSpan={4}>ITEM DETAILS</TableCell>
                <TableCell colSpan={2}>QUANTITY </TableCell>
                <TableCell colSpan={2}>UOM</TableCell>
                <TableCell colSpan={4}>DESCRIPTION</TableCell>
                <TableCell colSpan={1} className="p-0" align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {values?.rfq_details?.map((item, ind) => (

                <TableRow className="position-relative" key={ind}>
                  <TableCell className="pl-0" colSpan={2} align="center">
                    {ind + 1}
                    {/* {console.log(item.name)} */}

                  </TableCell>
                  <TableCell>
                    {/* {item?.name && (<Icon
                      variant="contained"
                      component="label"

                    >
                      file_upload
                      <input
                        type="file"
                        name={`rfq_details[${ind}].file`}
                        defaultValue={item?.file || ''}
                        onChange={(event, newValue) => {
                          handleChange({
                            target: {
                              //  files: `rfq_details[${ind}].file`,
                              ...item,
                              name: `rfq_details[${ind}].file`,
                              src: URL.createObjectURL(event.target.files[0]),
                              // name: `Add "rfq_details[${ind}]"`,
                              value: event.target.files[0],
                            },
                          });
                        }}
                      />
                    </Icon>)} */}
                    {item?.name == undefined ? '' : (item?.file == null || item?.file == undefined ? (<Icon
                      variant="contained"
                      component="label"

                    >
                      file_upload
                      <input
                        type="file"
                        name={`rfq_details[${ind}].file`}
                        defaultValue={item?.file || ''}
                        onChange={(event, newValue) => {
                          handleChange({
                            target: {
                              //  files: `rfq_details[${ind}].file`,
                              ...item,
                              name: `rfq_details[${ind}].file`,
                              src: URL.createObjectURL(event.target.files[0]),
                              // name: `Add "rfq_details[${ind}]"`,
                              value: event.target.files[0],
                            },
                          });
                        }}
                      />
                    </Icon>) : <span><Icon color="error"
                      onClick={(event, newValue) => {

                        handleChange({

                          target: {
                            //  files: `rfq_details[${ind}].file`,
                            ...item,
                            name: `rfq_details[${ind}].file`,
                            src: null,
                            // name: `Add "rfq_details[${ind}]"`,
                            value: null,

                          },
                        });

                      }}
                    >close</Icon><img className="w-48" src={URL.createObjectURL(item?.file)} alt="" ></img></span>)}
                    {/* {item?.file && (<span><Icon color="error"
                      onClick={(event, newValue) => {

                        handleChange({

                          target: {
                            //  files: `rfq_details[${ind}].file`,
                            ...item,
                            name: `rfq_details[${ind}].file`,
                            src: null,
                            // name: `Add "rfq_details[${ind}]"`,
                            value: null,

                          },
                        });

                      }}
                    >close</Icon><img className="w-48" src={URL.createObjectURL(item?.file)} alt="" ></img></span>)} */}
                  </TableCell>




                  <TableCell colSpan={3} className="pl-0" align="left">
                    <div className="flex rfq_details-center">

                      <Autocomplete

                        className="w-full"
                        size="small"
                        options={productList ? productList : []}
                        value={item?.name}
                        getOptionLabel={option => {
                          // e.g value selected with enter, right from the input
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option.inputValue) {
                            return option.inputValue;
                          }
                          return option?.name ? option?.name : (item?.name ? item?.name : " ");
                        }}
                        freeSolo
                        onKeyDown={(e) => { controlKeyPress(e, ind + 'product_id', ind + 'quantity', null) }}

                        // getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField inputRef={input => {
                            inputRef[ind] = input;
                          }} {...params} variant="outlined" required fullWidth />
                        )}

                        onInputChange={(event, newValue) => {

                          handleChange({
                            target: {
                              //  files: `rfq_details[${ind}].file`,
                              ...item,
                              name: `rfq_details[${ind}].name`,
                              'id': null,
                              // src : URL.createObjectURL(event.target.files[0]),
                              // name: `Add "rfq_details[${ind}]"`,
                              value: newValue,

                            }
                          })


                          let m = productList.filter(obj => obj.name == newValue).map((it) => {
                            return it.unit_of_measure
                          })
                          // console.log(m[0])
                          handleChange({
                            target: {
                              //  files: `rfq_details[${ind}].file`,
                              ...item,
                              name: `rfq_details[${ind}].unit_of_measure`,
                              'id': null,
                              // src : URL.createObjectURL(event.target.files[0]),
                              // name: `Add "rfq_details[${ind}]"`,
                              value: m[0],

                            }
                          })

                        }}
                        onChange={(event, newValue) => {

                          handleChange({
                            target: {
                              name: `rfq_details[${ind}]`,
                              // name: `Add "rfq_details[${ind}]"`,
                              value: newValue,

                            },
                          });

                        }}

                      />
                    </div>
                  </TableCell>

                  <TableCell colSpan={2} className="pl-0" align="left">
                    <TextField
                      name={`rfq_details[${ind}].quantity`}
                      size="small"
                      onKeyDown={(e) => { controlKeyPress(e, ind + 'quantity', ind + 'unit_of_measure', ind + 'product_id') }}
                      variant="outlined"
                      type="number"

                      disabled={!item?.name}
                      fullWidth
                      inputProps={{ min: 0, style: { textAlign: 'center' }, ref: setRef(ind + 'quantity') }}
                      defaultValue={item?.quantity}
                      // defaultValue={item.quantity || ""}
                      onChange={handleChange}
                      validators={["required", "isNumber"]}
                      errorMessages={[
                        "this field is required",
                        "Input is not Valid",
                      ]}
                    />

                  </TableCell>

                  <TableCell colSpan={2} className="pl-0" align="left">
                    <TextField
                      name={`rfq_details[${ind}].unit_of_measure`}
                      size="small"
                      variant="outlined"
                      // type="text"
                      required
                      onKeyDown={(e) => { controlKeyPress(e, ind + 'unit_of_measure', ind + 'descriptionss', ind + 'quantity') }}

                      disabled={!item?.name}
                      fullWidth
                      inputProps={{ min: 0, style: { textAlign: 'center' }, ref: setRef(ind + 'unit_of_measure') }}
                      defaultValue={item?.unit_of_measure}
                      value={item?.unit_of_measure}
                      // defaultValue={item.quantity || ""}
                      onChange={handleChange}

                      required
                      select
                    >
                      {data.map((itemM, INdd) => (
                        <MenuItem value={itemM.value} key={INdd}>
                          {itemM.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell colSpan={5} className="pl-0" align="left">
                    <TextField
                      name={`rfq_details[${ind}].descriptionss`}
                      size="small"
                      variant="outlined"
                      type="textarea"
                      disabled={!item?.name}
                      fullWidth
                      onKeyDown={(e) => { controlKeyPress(e, ind + 'descriptionss', null, ind + 'unit_of_measure') }}

                      inputProps={{ style: { textTransform: 'capitalize' }, ref: setRef(ind + 'descriptionss') }}
                      // value={item.descriptionss?item.descriptionss :""}
                      value={item?.descriptionss}
                      onChange={handleChange}
                      multiline
                      required
                    />
                  </TableCell>


                  <TableCell colSpan={1} className="pl-0" align="center">
                    <IconButton
                      size="small"
                      // onClick={(e) => arrayHelpers.remove(values?.rfq_details.findind(e))}
                      // onClick={() => console.log(ind+","+values.rfq_details)}
                      onClick={() => { arrayHelpers.remove(ind) }}
                    >
                      <Icon color="error" fontSize="small">
                        delete
                      </Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            className="mt-4 py-2 ml-4"
            color="primary"
            variant="contained"
            size="small"
            onClick={() => arrayHelpers.push({})
            }
          >
            <Icon>add</Icon>Add New
          </Button>
        </div>
      )}

    </FieldArray>
  );
};

export default InvoiceItemTable;
