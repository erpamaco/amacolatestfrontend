import React,{ useState, useEffect}from "react";
import { Breadcrumb,ConfirmationDialog } from "matx";
import Tooltip from '@material-ui/core/Tooltip';
import Axios from "axios";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Icon,
  Table,
  TableBody,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";
// import FormDialog from "../../partycontact"
// import MemberEditorDialog from "../../partycontact"
import url from "../../invoice/InvoiceService";


const CustomerInfo = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo =parseInt(params.get('id'));
  //  const [userList, setUserList] = useState(false);
  const userList={
    post_box_no:"889966",
    street:"King Abdul-Aziz Road",
    city:"Riyadh",
    proviance:"Bahah",
   zip_code:"12643",
   country:"Saudi",
   contact:"96688997788",
   website:"",
   fax:"",

  }
 
  useEffect(() => {

   
    // url.get("parties/"+foo).then(({ data }) => {
    //      setUserList(data[0]);
       
    //   });
    // console.log(userList)

  }, [userList]);

  

    
  return (
    
    <Card className="pt-6" elevation={3}>
      <div className="flex-column items-center mb-6">
        {/* <Avatar className="w-84 h-84" src="/assets/images/faces/10.jpg" /> */}
        <h3 className="mt-4 mb-2">{userList.firm_name}</h3>
        
        <small className="text-muted"><h5><strong>Registration Number:</strong>{userList.registration_no}</h5></small>
        <small className="text-muted"><h5><strong>VAT Number:</strong>{userList.vat_no}</h5></small>
        <div className="flex-row">
        <small className="text-white bg-green border-radius-4 px-2 py-2px">
                Credit Limit: <strong>{userList.credit_limit}</strong>
              </small>
              <small className="text-white bg-green border-radius-4 px-2 py-2px ml-2">
                Credit Days: <strong>{userList.credit_days}</strong>
              </small>
          </div>
      </div>

      <Divider />
      <Table className="mb-4">
        <TableBody>
        
           
              
              
              <TableRow>
              <TableCell className="pl-4">P.O Box</TableCell>
              <TableCell>{userList.post_box_no}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className="pl-4">Street</TableCell>
              <TableCell>{userList.street}</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-4">city</TableCell>
              <TableCell>{userList.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">province</TableCell>
              <TableCell>{userList.proviance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">zip_code</TableCell>
              <TableCell>{userList.zip_code}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">Country</TableCell>
              <TableCell>{userList.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">Contact</TableCell>
              <TableCell>{userList.contact}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">Website URL</TableCell>
              <TableCell>{userList.website}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-4">Fax</TableCell>
              <TableCell>{userList.fax}</TableCell>
            </TableRow>
            
       
        </TableBody>
      </Table>
            
    </Card>
  );
};

const customerInfo = [
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

export default CustomerInfo;
