import React, { useState, useEffect } from "react";
import { Dialog, Button, TextField } from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Icon } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import url  from "../invoice/InvoiceService";
import useAuth from '../../hooks/useAuth';


const MemberEditorDialog = ({
  uid,
  open,
  handleClose,
  contactid,
  partyid,
  customercontact,
}) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get("id"));
  const [account_no, setaccount_no] = useState("");
  const [bank_address, setbank_address] = useState("");
  const [bank_name, setbank_name] = useState("");
  const [iban_no, setiban_no] = useState("");
  const [loading, setloading] = useState(false);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const { user } = useAuth();
  const resetform = () => {
    setbank_address("");
    setbank_name("");
    setiban_no("");
    setaccount_no("");
  };

  const handleFormSubmit = () => {
    setloading(true);
    if (contactid) {
      const frmdetails = {
        party_id: partyid,
        iban_no: iban_no,
        bank_name: bank_name ?(bank_name) : "",
        bank_address: bank_address ?(bank_address) : "",
        account_no: account_no,
        user_id:user.id,
        div_id:localStorage.getItem('division')
      };

      url
        .put("party-bank/" + contactid, frmdetails)
        .then(function (response) {
          url.get("parties/" + foo).then(({ data }) => {
            customercontact(data[0].contacts);
          });

          Swal.fire({
            title: "Success",
            type: "success",
            icon: "success",
            text: "Data saved successfully.",
          }).then((result) => {
            handleClose();
          });
        })
        .catch(function (error) {});
    } else {
      const frmdetails = {
        party_id: partyid,
        iban_no: iban_no,
        bank_name: bank_name ?(bank_name) : "",
        bank_address: bank_address ?(bank_address) : "",
        account_no: account_no,
        user_id:user.id,
        div_id:localStorage.getItem('division')
      };

      url
        .post("party-bank", frmdetails)
        .then(function (response) {
          Swal.fire({
            title: "Success",
            icon: "success",
            type: "success",
            text: "Data saved successfully.",
          }).then((result) => {
            resetform();
            handleClose();
          });
        })
        .catch(function (error) {});
    }
  };

  useEffect(() => {
    if (contactid) {
      url.get("party-bank/" + contactid).then(({ data }) => {
        setbank_address(data.bank_address);
        setbank_name(data.bank_name);
        setiban_no(data.iban_no);
        setaccount_no(data.account_no);
      });
    }
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      style={{ zIndex: 1000 }}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <div className="p-6">
        <h4 className="mb-5">BANK DETAILS</h4>
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <TextField
            className="mb-4 w-full"
            label="Bank Account Number"
            autoComplete="none"
            onChange={(e) => setaccount_no(e.target.value)}
            name="website"
            type="text"
            size="small"
            variant="outlined"
            value={account_no}
          />
          <TextField
            className="mb-4 w-full"
            label="Bank Name"
            autoComplete="none"
            onChange={(e) => setbank_name(e.target.value)}
            name="website"
            type="text"
            size="small"
            variant="outlined"
            value={bank_name}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />

          <TextField
            className="mb-4 w-full"
            label="IBAN Number"
            autoComplete="none"
            onChange={(e) => setiban_no(e.target.value)}
            name="website"
            type="text"
            size="small"
            variant="outlined"
            value={iban_no}
          />
          <TextField
            className="mb-4 w-full"
            autoComplete="none"
            label="Bank Address"
            onChange={(e) => setbank_address(e.target.value)}
            name="website"
            type="text"
            multiline
            size="small"
            variant="outlined"
            value={bank_address}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />

          <div className="flex  items-center">
            <Button
              variant="outlined"
              className="mr-4 py-2"
              color="primary"
              type="submit"
              disabled={loading}
            >
              <Icon>save</Icon>SAVE
            </Button>
            <Button
              variant="outlined"
              className="mr-0 py-2"
              color="secondary"
              onClick={() => handleClose()}
            >
              <Icon>cancel</Icon> CANCEL
            </Button>
            {!contactid && (
              <Button
                color=".bg-green"
                variant="outlined"
                className="ml-4 py-2"
                type="reset"
                onClick={resetform}
              >
                <Icon>loop</Icon>
                <span className="pl-2 capitalize">RESET</span>
              </Button>
            )}
          </div>
        </ValidatorForm>
      </div>
    </Dialog>
  );
};

export default MemberEditorDialog;
