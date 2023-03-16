import React, { useState, useEffect } from "react";
// import { Breadcrumb,ConfirmationDialog } from "matx";
// import Tooltip from '@material-ui/core/Tooltip';
// import Axios from "axios";
import {
  // Avatar,
  // Button,
  Card,
  Divider,
  // Grid,
  Icon,
  Table,
  TableBody,
  // IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";
// import FormDialog from "../../partycontact"
// import MemberEditorDialog from "../../partycontact"
import url from "../../../invoice/InvoiceService";

const PartyInfo = ({ ids,setVerify,verify }) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get("id"));
  const [userList, setUserList] = useState(false);

  useEffect(() => {
    url.get("parties/" + ids).then(({ data }) => {
      setUserList(data[0]);
      setVerify(parseInt(data[0]?.status) ? true : false)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="pt-6" elevation={3}>
      <div className="flex-column items-center mb-6">
        {/* <Avatar className="w-84 h-84" src="/assets/images/faces/10.jpg" /> */}

        <h3 className="mt-4 mb-2">
          {userList?.firm_name}{" "}
          {verify ? <> <Icon color="primary">verified</Icon>  </>:<Icon color="dark">verified</Icon>}
        </h3>

        <small className="text-muted">
          <h5>
            <strong>Registration Number:</strong>
            {userList?.registration_no ? userList?.registration_no : ' --'}
          </h5>
        </small>
        <small className="text-muted">
          <h5>
            <strong>VAT Number:</strong>
            {userList?.vat_no ? userList?.vat_no : ' --'}
          </h5>
        </small>
        <div className="flex-row">
          <small className="text-white bg-green border-radius-4 px-2 py-2px">
            Credit Limit: <strong>{userList?.credit_limit}</strong>
          </small>
          <small className="text-white bg-green border-radius-4 px-2 py-2px ml-2">
            Credit Days: <strong>{userList?.credit_days}</strong>
          </small>
        </div>
      </div>

      <Divider />
      <Table className="mb-4">
        <TableBody>
          <TableRow>
            <TableCell className="pl-4">P.O Box</TableCell>
            <TableCell>{userList?.post_box_no ? userList?.post_box_no : '--'}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="pl-4">Building Number</TableCell>
            <TableCell>{userList?.building_no ? userList?.building_no : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Street</TableCell>
            <TableCell>{userList?.street ? userList?.street : '--'}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="pl-4">City</TableCell>
            <TableCell>{userList?.city ? userList?.city : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Province</TableCell>
            <TableCell>{userList?.proviance ? userList?.proviance : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Zip Code</TableCell>
            <TableCell>{userList?.zip_code ? userList?.zip_code : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Country</TableCell>
            <TableCell>{userList?.country ? userList?.country : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Contact</TableCell>
            <TableCell>
            {userList?.contact ? '+'+userList?.code +' '+ userList?.contact : '--'} 
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Website URL</TableCell>
            <TableCell>{userList?.website ? userList?.website : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Fax</TableCell>
            <TableCell>{userList?.fax ? userList?.fax : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Payment Term</TableCell>
            <TableCell>{userList?.payment_term ? userList?.payment_term : '--'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default PartyInfo;
