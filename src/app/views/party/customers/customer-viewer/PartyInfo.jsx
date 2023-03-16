
import React, { useState, useEffect } from "react";
// import Axios from "axios";
import url from "../../../invoice/InvoiceService"
import {
  // Button,
  Card,
  Divider,
  // Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

const PartyInfo = ({ ids }) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get('id'));
  const [userList, setUserList] = useState(false);
  const [divisionsList, setdivisionsList] = useState([]);

  useEffect(() => {


    url.get("parties/" + ids).then(({ data }) => {
      setUserList(data[0]);
      setdivisionsList(data[0].partyDivision.filter(obj => obj.division_id == localStorage.getItem('division')))
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Card elevation={3}>
      <h5 className="p-4 m-0">OTHER INFO</h5>
      <Divider />
      <Table className="mb-4">
        <TableBody>

          <TableRow>
            <TableCell className="pl-4">Party Type</TableCell>
            <TableCell>{userList.party_type ? userList.party_type : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Vendor Id</TableCell>
            <TableCell>{userList.vendor_id ? userList.vendor_id : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Party Code</TableCell>
            <TableCell>{divisionsList?.map((item, index) =>
              ((index ? ', ' : '') + item.vendor_code))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Opening Balance</TableCell>
            <TableCell>
              {parseFloat(userList.opening_balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}


            </TableCell>
          </TableRow>

        </TableBody>
      </Table>


    </Card>
  );
};




export default PartyInfo;
