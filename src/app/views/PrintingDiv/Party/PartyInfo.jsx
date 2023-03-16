
import React,{ useState, useEffect}from "react";
import Axios from "axios";
import url from "../../../views/invoice/InvoiceService";
import {
  Button,
  Card,
  Divider,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

const PartyInfo = () => {
    let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo =parseInt(params.get('id'));
  // const [userList, setUserList] = useState(false);
  const userList={
    party_type:"Vendor",
    vendor_id:"",
    party_code:"C-00001",
    opening_balance:0
  }
 
  useEffect(() => {

   
    // url.get("parties/"+foo).then(({ data }) => {
    //      setUserList(data[0]);
       
    //   });

  }, []);

  
  return (
    <Card elevation={3}>
      <h5 className="p-4 m-0">Other Info</h5>
      <Divider />
      <Table className="mb-4">
        <TableBody>
         
            <TableRow>
            <TableCell className="pl-4">Party Type</TableCell>
            <TableCell>{userList.party_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Vendor Id</TableCell>
            <TableCell>{userList.vendor_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Party Code</TableCell>
            <TableCell>{userList.party_code}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Opening Balance</TableCell>
            <TableCell>
            {parseFloat(userList.opening_balance).toLocaleString(undefined, {minimumFractionDigits:2})}
                   

            </TableCell>
          </TableRow>
        
        </TableBody>
      </Table>

      
    </Card>
  );
};

const customerInfo = [
  {
    title: "Credit Card",
    value: "**** **** **** **** 4242",
  },
  {
    title: "Paid",
    value: "5 ($500.00)",
  },
  {
    title: "Draft",
    value: "2 ($150.00)",
  },
  {
    title: "Unpaid/Due",
    value: "1 ($355.00)",
  },
  {
    title: "Refunded",
    value: "0 ($0.00)",
  },
  {
    title: "Gross Income",
    value: "$2,100.00",
  },
];

export default PartyInfo;
