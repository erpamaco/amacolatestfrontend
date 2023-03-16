import React,{ useState, useEffect}from "react";
import { Breadcrumb,ConfirmationDialog } from "matx";
import Tooltip from '@material-ui/core/Tooltip';
import Axios from "axios";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Table,
  TableBody,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";
// import FormDialog from "../../partycontact"
// import MemberEditorDialog from "../../partycontact"
import url from "../../invoice/InvoiceService"


const CustomerInfos = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo =parseInt(params.get('id'));
  // const [productList, setproductList] = useState(false);
 const productList ={
   category_name:'Industry',
   manufacturer_name:'Sam',
   description:'Adco Antiseptic Disinfectant -500 ml',
   unit_of_measure:"ml",
   type:"Inventory",
   hsn_code:'12345',
   initial_quantity:0,
   minimum_quantity:0

 }
  useEffect(() => {

   
    // url.get("products/"+foo).then(({ data }) => {
          
    //     setproductList(data.product[0]);
       
    //   });

  }, []);

  

    
  return (
    
    <Card className="pt-6" elevation={3}>
      <div className="flex-column items-center mb-6">
        {/* <Avatar className="w-84 h-84" src="/assets/images/faces/10.jpg" /> */}
        <h3 className="mt-4 mb-2">{productList.name}</h3>
        
        <h5><small className="text-muted"><strong>Model Number:</strong>{productList.model_no}</small></h5>
        {/* <small className="text-muted"><strong>Vat Number:</strong>{productList.vat_no}</small> */}
        {/* <div className="flex-row">
        <small className="text-white bg-green border-radius-4 px-2 py-2px">
                Credit Limit
              </small>
              <small className="text-white bg-green border-radius-4 px-2 py-2px ml-2">
                Credit Days
              </small>
          </div> */}
      </div>

      <Divider />
      <Table className="mb-4">
        <TableBody>
        
           
        <TableRow>
              <TableCell className="pl-4">Category Name</TableCell>
              <TableCell>{productList.category_name}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className="pl-4">Manufacturer</TableCell>
              <TableCell>{productList.manufacturer_name}</TableCell>
              </TableRow>
              
              <TableRow>
              <TableCell className="pl-4" >Description</TableCell>
              <TableCell style={{whiteSpace:'unset',wordBreak:'break-word'}}>{productList.description}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className="pl-4">UOM</TableCell>
              <TableCell>{productList.unit_of_measure}</TableCell>
            </TableRow>
            
            
            <TableRow>
              <TableCell className="pl-4">Product Type</TableCell>
              <TableCell >{productList.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">HSN Number</TableCell>
              <TableCell>{productList.hsn_code}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">Initial Quantity</TableCell>
              <TableCell>{productList.initial_quantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">Minimum Quantity</TableCell>
              <TableCell>{productList.minimum_quantity}</TableCell>
            </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>

      {/* <div className="flex-column items-start px-4">
        <Button className="mb-1" variant="text">
          <Icon className="mr-2" fontSize="small">
            lock_open
          </Icon>{" "}
          Reset & Send Password
        </Button>
        

        <Button className="mb-4" variant="text">
          <Icon className="mr-2" fontSize="small">
            person
          </Icon>{" "}
          Login as Customer
        </Button>
      </div> */}
      
    </Card>
  );
};

const CustomerInfo = [
  {
    title: "Firm Name",
    value: "+1 439 327 546",
  },
  {
    title: "Registration Nubmber",
    value: "USA",
  },
  {
    title: "VAT number",
    value: "New York",
  },
  {
    title: "P.0 Box",
    value: "Street Tailwood, No. 17",
  },
  {
    title: "Address 2",
    value: "House #19",
  },
];

export default CustomerInfos;
