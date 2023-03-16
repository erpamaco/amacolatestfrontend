import React, { useState, useEffect } from "react";
import { Dialog, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Icon,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  Avatar,
  CardActionArea,
} from "@material-ui/core";
import Swal from "sweetalert2";
import url, {
  getCustomerList,
  getdivisions,
  getcompanybank,
  getpaymentaccount,
} from "../invoice/InvoiceService";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import useAuth from "app/hooks/useAuth";

const MemberEditorDialog = ({
  uid,
  open,
  handleClose,
  catid,
  userList,
  id,
}) => {
  const formData = new FormData();
  const [state, setState] = useState({
    name: "abc",
    email: "",
    phone: "",
    balance: "",
    age: "",
    company: "",
    address: "",
    isActive: false,
    isAlive: true,
  });
  const [party_id, setparty_id] = useState("");
  const [payment_mode, setpayment_mode] = useState("");
  const [check_no, setcheck_no] = useState("");
  const [narration, setnarration] = useState("");
  const [paid_amount, setpaid_amount] = useState();
  const [userList1, setUserList1] = useState([]);
  const [allData, setAllData] = useState([]);
  const [divisions, setdivisions] = useState([]);
  const [paymentaccount, setpaymentaccount] = useState([]);
  const [div_id, setdiv_id] = useState(localStorage.getItem("division") == 1 ? 24 : 26);
  const [companybank, setcompanybank] = useState([]);
  const [bank_id, setbank_id] = useState(null);
  const [file, setfile] = useState();
  const [fileurl, setfileurl] = useState();
  const [isAlive, setIsAlive] = useState(true);
  const [sender, setsender] = useState("");
  const [receiver, setreceiver] = useState(" ");
  const [paid_date, setpaid_date] = useState(new Date());
  const [disable, setdisable] = useState(false);
  const { user, division } = useAuth();

  const option = [
    {
      name: "Cash",
      value: "cash",
    },
    {
      name: "Cheque",
      value: "cheque",
    },
    {
      name: "Bank Transfer",
      value: "banktransfer",
    },
  ];

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [invoice, setInvoice] = React.useState([]);
  const [invoice_id, setInvoice_id] = React.useState([]);

  const sortInvoice = (pid) => {
    let a = allData?.filter((obj) => parseInt(obj?.id) == parseInt(pid));
    // const a = allData?.filter((obj) => parseInt(obj?.id) == parseInt(pid));
    setInvoice(a[0]?.invoice);
  };

  useEffect(() => {
    getCustomerList().then(({ data }) => {
      setUserList1(data);
    });

    url.get("allReceiptData").then(({ data }) => {
      setAllData(data);
    });
    getdivisions().then(({ data }) => {
      // console.log(data)
      setdivisions(data);
    });
    getpaymentaccount().then(({ data }) => {
      // console.log(data)
      setpaymentaccount(data);
    });
    getcompanybank().then(({ data }) => {
      setcompanybank(data);
    });
    if (id) {
      url.get("receipts/" + id).then(({ data }) => {
        console.log(data)
        // console.log(data.party_id)
        setparty_id(data[0]?.party_id);
        setInvoice_id(data[0]?.invoice_id);
        // sortInvoice(data[0]?.party_id)
        url.get(`findInvoices/${data[0]?.party_id}`).then(({data})=>{
          setInvoice(data[0]?.invoice);
        }).catch(()=>{

        })
        setdiv_id(data[0]?.div_id);
        setpaid_amount(data[0]?.paid_amount);
        setpayment_mode(data[0]?.payment_mode);
        setsender(data[0]?.sender);
        setreceiver(data[0]?.receiver ? data[0]?.receiver : 0);
        setnarration(data[0]?.narration);
        setfileurl(data[0]?.referrenceImgUrl);
      });
    }
  }, []);

  const routerHistory = useHistory();

  const handleFileSelect = (event, f) => {
    let files = event.target.files[0];
    const filename = URL.createObjectURL(event.target.files[0]);
    // console.log(filename);
    setfile(files);
    var type = event.target.files[0].name
      .substring(event.target.files[0].name.lastIndexOf("."))
      .split(".")[1];
    if (type == "png" || type == "jpeg" || type == "jpg") {
      setfileurl(filename);
    }
  };

  const newFunction = (iId) => {
    let da = invoice?.filter((obj)=>obj.id == iId)
    setpaid_amount(da[0]?.grand_total)
  }
  const handleFormSubmit = () => {
    setdisable(true);
    const formData = new FormData();

    if (payment_mode !== "cash") {
      var val = paymentaccount.filter((data) => data.div_id == div_id);
    }

    formData.append("invoice_id", invoice_id ? invoice_id : '');
    formData.append("party_id", party_id);
    formData.append("payment_mode", payment_mode);
    formData.append("check_no", check_no);
    formData.append("narration", narration);
    formData.append("paid_amount", paid_amount);
    formData.append("div_id", div_id);
    formData.append("user_id", user.id);
    formData.append("division_id", localStorage.getItem("division"));
    formData.append("bank_id", bank_id ? bank_id : null);
    formData.append("paid_date", paid_date);
    formData.append("sender", sender);
    formData.append("division", division);
    formData.append("receiver", receiver !== "" ? receiver : val[0].id);
    formData.append("file", file);
    if (id) {
      formData.append("id", id);
      console.log(receiver);
      url
        .post("updateReceipt", formData)
        .then(function (data) {
          Swal.fire({
            title: "Success",
            type: "success",
            icon: "success",
            text: "Data updated successfully.",
          });
          handleClose();

          routerHistory.push("/transaction");
        })
        .catch(function (error) {});
    } else {
      url
        .post("receipts", formData)

        .then(function (data) {
          Swal.fire({
            title: "Success",
            type: "success",
            icon: "success",
            text: "Data saved successfully.",
          });
          handleClose();

          routerHistory.push("/transaction");
        })
        .catch(function (error) {});
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className="px-6 pt-2 pb-4"
      style={{ zIndex: 1000 }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <div className="p-6">
        <h4 className="mb-5">RECEIPT</h4>

        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">
          <Grid className="mb-4" container spacing={4}>
            <Grid item sm={6} xs={12}>
              <TextValidator
                className="w-full mb-4"
                label="Division"
                variant="outlined"
                onChange={
                  (e) => setdiv_id(e.target.value)
                  // .log(isAlive)
                }
                type="text"
                name="div_id"
                size="small"
                value={div_id}
                required
                select
              >
                {paymentaccount
                  .filter((obj) => obj.type == "division")
                  .map((item, ind) => (
                    <MenuItem value={item.id} key={item}>
                      {item.name} 
                    </MenuItem>
                  ))}
              </TextValidator>
              <TextValidator
                className="w-full mb-4"
                label="Name"
                variant="outlined"
                onChange={
                  (e) => {
                    setparty_id(e.target.value);
                    setsender(e.target.value);
                    sortInvoice(e.target.value);
                  }
                  // .log(isAlive)
                }
                type="text"
                name="cname"
                size="small"
                value={party_id}
                required
                select
              >
                <MenuItem value={""} key={""}>
                  Choose Party
                </MenuItem>
                {userList1.map((item, ind) => (
                  <MenuItem value={item.id} key={item}>
                    {item.firm_name}
                  </MenuItem>
                ))}
              </TextValidator>
              {party_id && (
                <>
                  <TextValidator
                    className="w-full mb-4"
                    label="Choose Invoice"
                    variant="outlined"
                    onChange={
                      (e) => {
                        setInvoice_id(e.target.value);
                        newFunction(e.target.value)
                        // setsender(e.target.value);
                      }
                      // .log(isAlive)
                    }
                    type="text"
                    name="cname"
                    size="small"
                    value={invoice_id}
                    required
                    select
                  >
                    <MenuItem style={{justifyContent:'flex-end'}} value={""} key={""}>
                      Choose Invoice
                    </MenuItem>
                    {invoice?.map((item, ind) => (
                      <MenuItem style={{justifyContent:'flex-end'}} value={item?.id} key={item}>
                        <div>{item?.invoice_no} | { parseFloat(parseFloat(item?.grand_total)?.toFixed(3) - parseFloat(item?.paid_amount)?.toFixed(3)).toLocaleString(undefined,{
                  minimumFractionDigits:2
                }) }</div>
                      </MenuItem>
                    ))}
                  </TextValidator>
                </>
              )}

              <TextField
                className="w-full mb-4"
                label="Comment"
                variant="outlined"
                onChange={
                  (e) => setnarration(e.target.value)
                  // .log(isAlive)
                }
                type="textarea"
                name="cname"
                multiline
                rows={6}
                value={narration}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="mb-4 w-full"
                  margin="none"
                  label="Paid Date"
                  inputVariant="outlined"
                  name="date"
                  type="text"
                  size="small"
                  autoOk={false}
                  hintText="Portrait Dialog"
                  errorText="This is an error message."
                  value={paid_date}
                  onChange={(date) => {
                    setpaid_date(date);
                  }}
                  format="MMMM dd, yyyy"
                  required
                  // onChange={handleIvoiceListChange}
                />
              </MuiPickersUtilsProvider>

              <CurrencyTextField
                className="w-full mb-4"
                label="Amount"
                size="small"
                variant="outlined"
                required
                onChange={(event, value) => setpaid_amount(value)}
                name="paid_amount"
                value={paid_amount}
                currencySymbol="SAR"
              />

              <TextValidator
                className="w-full mb-4"
                label="Payment Mode"
                onChange={(e) => setpayment_mode(e.target.value)}
                variant="outlined"
                type="text"
                name="cdescription"
                size="small"
                value={payment_mode}
                required
                select
              >
                {option.map((item, ind) => (
                  <MenuItem value={item.value} key={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextValidator>
              {payment_mode === "cheque" && (
                <TextValidator
                  className="w-full mb-4"
                  label="Cheque Number"
                  onChange={(e) => setcheck_no(e.target.value)}
                  variant="outlined"
                  type="text"
                  name="cdescription"
                  size="small"
                  value={check_no}
                ></TextValidator>
              )}
              <FormGroup>
                {payment_mode === "banktransfer" && (
                  <FormControl variant="outlined" size="small" className="mb-4">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Bank
                    </InputLabel>
                    <Select
                      native
                      value={bank_id}
                      // onChange={handleChange}
                      onChange={(e) => setbank_id(e.target.value)}
                      size="small"
                      label="Bank"
                      inputProps={{
                        name: "Bank",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option value=""></option>
                      {companybank.map((item, ind) => (
                        <option value={item.id}>
                          {item.name}-{item.ac_no}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </FormGroup>
              {payment_mode === "banktransfer" && (
                <>
                  <label for="myfile">Upload File :</label>
                  <TextField
                    //  className="hidden"
                    className="mb-4 w-full"
                    onChange={(e) => handleFileSelect(e)}
                    id="upload-multiple-file"
                    type="file"
                    variant="outlined"
                    name="file"
                    size="small"
                    autoComplete="none"
                    // label="Upload File"
                    //  value={item.name}
                  />
                </>
              )}
              {payment_mode === "banktransfer" && (
                <div
                  onClick={() => {
                    setfileurl(null);
                    setfile(null);
                  }}
                  style={{
                    padding: "5px 5px 5px 5px",
                    cursor: "pointer",
                  }}
                >
                  <CardActionArea>
                    <img
                      width="100%"
                      // className={classes.media}
                      src={fileurl}
                    />
                  </CardActionArea>
                </div>
              )}
              {payment_mode == "cash" && (
                <div className="flex mb-4">
                  <TextValidator
                    className="mr-2"
                    // inputProps={{style: {width:"200px"}}}
                    style={{ width: "210px" }}
                    label="Sender"
                    autoComplete="none"
                    onChange={(e) => setsender(e.target.value)}
                    name="sender"
                    size="small"
                    type="text"
                    variant="outlined"
                    value={sender}
                    select
                  >
                    {userList1.map((item, ind) => (
                      <MenuItem value={item.id} key={item}>
                        {item.firm_name}
                      </MenuItem>
                    ))}
                  </TextValidator>

                  <TextValidator
                    className="ml-2 "
                    label="Receiver"
                    autoComplete="none"
                    onChange={(e) => setreceiver(e.target.value)}
                    // inputProps={{style: {width:"310px"}}}
                    // inputProps={{style: {width:"200px"}}}
                    name="receiver"
                    size="small"
                    type="text"
                    style={{ width: "210px" }}
                    variant="outlined"
                    value={receiver}
                    select
                  >
                    {paymentaccount
                      .filter((obj) => obj.type == "personal")
                      .map((item, i) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                  </TextValidator>
                </div>
              )}
            </Grid>
          </Grid>

          <div className="flex  items-center ">
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              disabled={disable}
            >
              <Icon>save</Icon> SAVE
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              className="ml-4"
            >
              <Icon>cancel</Icon>CANCEL
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </Dialog>
  );
};

export default MemberEditorDialog;
