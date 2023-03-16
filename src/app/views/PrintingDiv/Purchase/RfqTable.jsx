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
import { FieldArray } from "formik";
import { Autocomplete } from "@material-ui/lab";
// import { calculateAmount ,getCustomerList} from "./Rfqformservice";
import {getProductList,capitalize_arr} from "../../../../app/views/invoice/InvoiceService"

const InvoiceItemTable = ({ values, handleChange, setFieldValue,CustomerList }) => {
  const [isAlive, setIsAlive] = useState(true);
//   const [productList, setProductList] = useState([]);
  // const [customerList, setCustomerList] = useState([]);
    const productList=[{
        name:"PP-Matt",
        
    },
    {name:"PP-SG"}]
  useEffect(() => {
    // getProductList().then(({ data }) => {
      
    //   if (isAlive) setProductList(data)
    //   // arrayHelpers.push({})
      
    // });
   
   
    return () => setIsAlive(false);
  }, [isAlive]);

  return (
    <FieldArray name="rfq_details" >
      {(arrayHelpers) => (
       
        <div className="overflow-auto">
          <Table className="whitespace-pre min-w-750">
            <TableHead>
              <TableRow>
              <TableCell colSpan={2}>S.No.</TableCell>
                <TableCell colSpan={3}>Item Details</TableCell>
                <TableCell colSpan={2}>Quantity </TableCell>
                <TableCell colSpan={5}>Description</TableCell>
                <TableCell colSpan={1} className="p-0" align="center" />
              </TableRow>
            </TableHead>
            <TableBody> 
           
              {values.rfq_details?.map((item, ind) => (
                
                <TableRow className="position-relative" key={ind}>
                  <TableCell className="pl-0" align="left">
                  {ind+1}
                  </TableCell>
                  <TableCell colSpan={3} className="pl-0" align="left">
                    <div className="flex rfq_details-center">
                     
                      <Autocomplete
                        
                        className="w-full"
                        size="small"
                        options={productList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" required fullWidth />
                        )}
                        onChange={(event, newValue) => {
                          
                          handleChange({
                            target: {
                              name: `rfq_details[${ind}]`,
                              value: newValue
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
                      variant="outlined"
                      type="number"
                      fullWidth
                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                      defaultValue={item.quantity || ""}
                      onChange={handleChange}
                      required
                    />
                  </TableCell>
                  <TableCell colSpan={5} className="pl-0" align="left">
                    <TextField
                      name={`rfq_details[${ind}].descriptionss`}
                      size="small"
                      variant="outlined"
                      type="textarea"
                      fullWidth
                      inputProps={{style: {textTransform: 'capitalize'}}}
                      value={item.descriptionss?item.descriptionss :""}
                      onChange={handleChange}
                      required
                    />
                  </TableCell>
                  
               
                  <TableCell colSpan={1} className="pl-0" align="center">
                    <IconButton
                      size="small"
                      onClick={() => arrayHelpers.remove(ind)}
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
