import React, { useState, useEffect } from "react";
import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import url, {basePath} from "../../../invoice/InvoiceService"
import { useParams } from "react-router-dom";


const ProductInfo = () => {
  
 
  const { id } = useParams();

  const [productList, setproductList] = useState(false);

  useEffect(() => {

  /* API PRODUCTS List*/
    url.get("products/" + id).then(({ data }) => {

      setproductList(data.product[0]);//Set the product List

    });

  }, []);




  return (

    <Card className="pt-6" elevation={3}>
      <div className="flex-column items-center mb-6">
      
        <h4 className="mt-4 mb-2"  style={{textTransform:"uppercase"}}>{productList.brand_name ? productList.brand_name : productList.name}</h4>

        <h5><small className="text-muted"><strong>Model Number:</strong>{productList.model_no ? productList.model_no : ' --'}</small></h5>
       
      </div>

      <Divider />
      <Table className="mb-4">
        <TableBody>

        
        <TableRow>
            <TableCell className="pl-4">Product Name</TableCell>
            <TableCell>{productList.name ? productList.name : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Product Image</TableCell>
            <TableCell><img   src={productList?.file ? basePath +productList?.file : ""} width="200px" height="150px" />  </TableCell>
          </TableRow>


          <TableRow>
            <TableCell className="pl-4">Category Name</TableCell>
            <TableCell>{productList.category_name ? productList.category_name : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Manufacturer</TableCell>
            <TableCell>{productList.manufacturer_name ? productList.manufacturer_name : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Capacity</TableCell>
            <TableCell>{productList.ecapacity ? productList.ecapacity : '--'}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="pl-4" >Description</TableCell>
            <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-word' }}>{productList.description ? productList.description : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">UOM</TableCell>
            <TableCell>{productList.unit_of_measure ? productList.unit_of_measure : '--'}</TableCell>
          </TableRow>


          <TableRow>
            <TableCell className="pl-4">Product Type</TableCell>
            <TableCell >{productList.type ? productList.type : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">HSN Number</TableCell>
            <TableCell>{productList.hsn_code ? productList.hsn_code : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Initial Quantity</TableCell>
            <TableCell>{productList.initial_quantity ? productList.initial_quantity : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Minimum Quantity</TableCell>
            <TableCell>{productList.minimum_quantity ? productList.minimum_quantity : '--'}</TableCell>
          </TableRow>
          
        </TableBody>
      </Table>

      
    </Card>
  );
};


export default ProductInfo;
