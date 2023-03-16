import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Card,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Icon,
} from "@material-ui/core";
import useDynamicRefs from "use-dynamic-refs";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import url, { data, currency, navigatePath } from "../../invoice/InvoiceService";
import Swal from "sweetalert2";
import { ConfirmationDialog } from "matx";
// import FormDialog from "../product/productprice";
import MemberEditorDialog from "../../product/productprice";
import moment from "moment";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { TextField } from "@material-ui/core";
import useAuth from "../../../hooks/useAuth";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  invoiceEditor: {
    "& h5": {
      fontSize: 15,
    },
  },
  root: {
    width: "100px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const filter = createFilterOptions();
const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(initialValues);
  // const [rdate, setrdate] = useState([]);
  // const [ddate, setddate] = useState([]);
  const [cname, setcname] = useState("abcd"); /*customer Name */
  const [party_id, setparty_id] = useState(""); /*party id */
  const [discounts, setdiscounts] = useState("0"); /*Discount */
  const [proList, setproList] = useState([]); /*Product List */
  // const [ProductList, setProductList] = useState([]);
  const [validity, setvalidity] = useState("3 Days"); /*Set validity */
  const [payment_terms, setpayment_terms] =
    useState("100% Advance"); /*Set Payment terms */
  const [warranty, setwarranty] = useState("NA"); /* warranty */
  const [delivery_time, setdelivery_time] = useState(
    "Within 2-3 Days from the Date of PO"
  ); /*delivery Time */
  const [inco_terms, setinco_terms] = useState(
    "DDP-Delivery Duty Paid To Customer Office"
  ); /*Inco Terms */
  const [discount, setdiscount] = useState("0");
  const [contactid, setcontactid] = useState(""); /*contact id */
  const [dstatus, setdstatus] = useState(false);
  // const [price, setprice] = useState(0);
  // const [pprice, setpprice] = useState(0);
  // const [marginprice, setmarginprice] = useState(0);
  const [productid, setproductid] = useState("1");
  const [indexset, setindex] = useState(0);
  const [productname, setproductname] = useState("");
  const [partyids, setpartyids] = useState(); /*party id */
  const [charge, setcharge] = useState(0); /*Freight Charge */
  const [total, settotal] = useState(0); /* total */
  const [currency_type, setcurrency_type] = useState("SAR"); /*currency Type */
  const [freight, setfreight] = useState("Air Freight"); /*freight */
  const [ofreight, setOfreight] = useState('')

  const [productprice, setproductprice] = useState([]);
  const [catid, setcatid] = useState(); /*category id */
  const [Quote_date, setQuote_date] = useState(
    moment(new Date()).format("DD MMM YYYY")
  ); /*Quote_date */
  const [showother,setShowOther] =useState('')

  const routerHistory = useHistory();
  const { id } = useParams();
  const { user } = useAuth();
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);

  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [getRef, setRef] = useDynamicRefs();

  let inputRef = [];
  let priceRef = [];

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);

  // const handleChange = (event, fieldName) => {
  //   event.persist();

  //   let tempItemList = [...state.item];
  //   setdstatus(true)
  //   setdiscount(event.target.value)
  //   setdiscounts(event.target.value)

  // };

  /*Unit of measures and our description */
  const setName = (event, index) => {
    event.persist();

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index == i) {
        element[event.target.name] = event.target.value;
      }
      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });
  };
  /*Set the purchase price and calculate the total amount */
  const handleIvoiceListChange = (event, index, newValue) => {
    event.persist();
    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {
        element["total_amount"] = (
          (newValue.price ? newValue.price : newValue) * element.quantity
        ).toFixed(2);
        element["purchase_price"] = newValue.price ? newValue.price : newValue;
        element.margin = "";
        element.sell_price = "";
        element["remark"] = "";
      }
      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });
  };

  /*Delete the single purchase details */
  const deleteItemFromInvoiceList = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Purchase Order Details!",
      icon: "danger",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      icon: "warning",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        let tempItemList = [...state.item];
        tempItemList.splice(index, 1);

        setState({
          ...state,
          item: tempItemList,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Quotation Details is safe :)", "error");
      }
    });
  };
  // const filterPrice = (options, params) => {
  //   // console.log(params.inputValue)

  //   // const filtered = filter(options, params);

  //   // // if (params.inputValue == "") {
  //   //   filtered.push({
  //   //     inputValue: params.inputValue,
  //   //     price: params.inputValue,
  //   //     amount: params.inputValue
  //   //   });
  //   // }
  //   // return filtered;
  // };

  /*Set the quantity and calculate total by quantity*purchase price */
  const calcualteprice = (event, index) => {
    event.persist();
    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      let sum = 0;

      if (index === i) {
        element["total_amount"] = (
          event.target.value * element.purchase_price
        ).toFixed(2);
        element[event.target.name] = event.target.value;
        element["remark"] = "";
      }

      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });
  };

  // const setproductids = (id, index) => {
  //   setcatid(id)
  //   setpartyids(party_id)
  //   setShouldOpenEditorDialog(true)
  // }

  /*Submit the form Data */
  const handleSubmit = () => {
    setState({ ...state, loading: true });

    let tempState = { ...state };
    let arr = [];
    delete tempState.loading;
    let tempItemList = [...state.item];
    console.log(tempItemList)

    arr.quotation_details = tempItemList;
    arr.discount_in_p = 0;
    arr.total_value = parseFloat(subTotalCost).toFixed(2);
    arr.net_amount = GTotal;
    arr.freight = ofreight ? ofreight :freight;
    arr.vat_in_value = parseFloat(charge).toFixed(2);
    arr.party_id = party_id;
    arr.warranty = warranty;
    arr.validity = validity;
    arr.delivery_time = delivery_time;
    arr.inco_terms = inco_terms;
    arr.payment_terms = payment_terms;
    arr.contact_id = contactid;
    arr.transaction_type = "purchase";
    arr.status = "New";
    arr.ps_date = Quote_date;
    arr.currency_type = currency_type;
    arr.rfq_id = id;
    arr.transport = 0.0;
    arr.other = 0.0;
    arr.div_id = localStorage.getItem("division");
    arr.user_id = user.id;
    const json = Object.assign({}, arr);
    url
      .post("purchase-quotation", json)
      .then(function (response) {
        Swal.fire({
          title: "Success",
          type: "success",
          icon: "success",
          text: "Data saved successfully.",
        }).then((result) => {
          routerHistory.push("../Newinvoiceview");
        });
      })
      .catch(function (error) {
        Swal.fire({
          title: "Error",
          type: "error",
          icon: "warning",
          text: "Something Went Wrong.",
        }).then((result) => {
          setState({ ...state, loading: false });
        });
      });
  };

  /*cancel the form */
  function cancelform() {
    routerHistory.push(navigatePath + "/sales/rfq-form/rfqview");
  }

  /*Keyboard event */
  const controlKeyPress = (e, id, nextid, prev) => {
    if (e?.keyCode == 39) {
      if (nextid?.includes("purchase_price")) {
        priceRef[parseInt(nextid)].focus();
      } else if (nextid == null) {
      } else {
        getRef(nextid).current.focus();
      }
    } else if (e?.keyCode == 38) {
      const a = id.split(parseInt(id));
      let i = parseInt(id);
      if (--i >= 0) {
        const r = i + a[1];
        if (r?.includes("purchase_price")) {
          priceRef[parseInt(r)].focus();
        } else if (false) {
          inputRef[parseInt(r)].focus();
        } else {
          getRef(r).current.focus();
        }
      }
    } else if (e?.keyCode == 40) {
      const a = id.split(parseInt(id));
      let i = parseInt(id);

      const r = ++i + a[1];
      try {
        if (r?.includes("purchase_price")) {
          priceRef[parseInt(r)].focus();
        } else if (false) {
          inputRef[parseInt(r)].focus();
        } else {
          getRef(r).current.focus();
        }
      } catch (error) {
        console.error("eror");
      }
    } else if (e?.keyCode == 37) {
      if (prev == null) {
      } else {
        if (false) {
          inputRef[parseInt(prev)].focus();
        } else if (prev?.includes("purchase_price")) {
          priceRef[parseInt(prev)].focus();
        } else {
          getRef(prev).current.focus();
        }
      }
    }
  };
  /* Close the Dialogue box */
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    setIsAlive(true);
  };

  useEffect(() => {
    url.get("products").then(({ data }) => {
      setproList(data);
    });
    url.get("rfq/" + id).then(({ data }) => {
      setcname(data[0]?.party[0]?.firm_name);
      setcontactid(data[0]?.contact?.id);
      // setrdate(moment(data[0]?.created_at).format('DD MMM YYYY'))
      // setddate(moment(data[0]?.require_date).format('DD MMM YYYY'))
      setparty_id(data[0]?.party_id);
      // console.log("dsd", data[0].rfq_details);
      setState({
        ...state,
        item: data[0].rfq_details,
      });
    });
    return setIsAlive(false);
  }, [id, isNewInvoice, isAlive, generateRandomId]);

  // const setMargin = (id, index, name) => {

  //   setproductid(id)
  //   setproductname(name)
  //   setindex(index)
  //   setShouldOpenEditorDialog(true);

  // }

  let subTotalCost = 0;
  let GTotal = 0;
  let dis_per = 0;
  let {
    item: invoiceItemList = [],
    // quote: quoteList = [],
    status,
    vat = 0,
    loading,
  } = state;

  return (
    <div className="m-sm-30">
      <Card elevation={3}>
        <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
          <ValidatorForm
            onSubmit={handleSubmit}
            autocomplete="off"
            onError={(errors) => null}
          >
            <div className="viewer_actions px-4 flex justify-between">
              <div className="mb-6">
                <h4 align="left"> CREATE PURCHASE ORDER</h4>
              </div>
              <div className="mb-6">
                <Button
                  className="mr-4 py-2"
                  variant="outlined"
                  color="secondary"
                  onClick={cancelform}
                >
                  <Icon>cancel</Icon> CANCEL
                </Button>

                <Button
                  type="submit"
                  className="py-2"
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                >
                  <Icon>save</Icon> SAVE & PRINT PURCHASEORDER
                </Button>
              </div>
            </div>

            <div className="viewer__order-info px-4 mb-4 flex justify-between">
              <div>
                <h5 className="font-normal capitalize">
                  <strong>Vendor Name: </strong> <span>{cname}</span>
                </h5>
                <TextField
                  label="Currency Type"
                  style={{ minWidth: 200, maxWidth: "250px" }}
                  name="party_id"
                  size="small"
                  variant="outlined"
                  value={currency_type}
                  onChange={(event) => setcurrency_type(event.target.value)}
                  required
                  select
                >
                  {currency.map((item) => (
                    <MenuItem value={item.value} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <div className="text-right"></div>
              </div>

              <div className="flex">
                <h5 className="font-normal">
                  <strong>Purchase Order Date: </strong>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="ml-2"
                      margin="none"
                      label="Purchase Order Date"
                      format="dd MMMM yyyy"
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      selected={Quote_date}
                      value={Quote_date}
                      onChange={(date) => {
                        setQuote_date(moment(date).format("DD MMM YYYY"));
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </h5>
              </div>
            </div>

            <Divider />

            <Table className="mb-4">
              <TableHead>
                <TableRow className="bg-default">
                  <TableCell
                    className="pl-2"
                    style={{ width: 50 }}
                    align="center"
                  >
                    S.NO.
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "300px" }}>
                    ITEM
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "300px" }}>
                    OUR DESCRIPTION
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "80px" }}>
                    QTY
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "80px" }}>
                    UOM
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "150px" }}>
                    PRICE
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "150px" }}>
                    TOTAL
                  </TableCell>

                  <TableCell className="pr-2" style={{ textAlign: "right" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceItemList.map((item, index) => {
                  if (!dstatus) {
                    subTotalCost += parseFloat(item.total_amount);
                    vat = ((subTotalCost * 15) / 100).toFixed(2);

                    GTotal = subTotalCost + charge;
                  } else {
                    subTotalCost += parseFloat(item.total_amount);
                    dis_per = parseFloat(
                      (discounts * subTotalCost) / 100
                    ).toFixed(2);
                    vat = (
                      ((subTotalCost -
                        parseFloat((discounts * subTotalCost) / 100)) *
                        15) /
                      100
                    ).toFixed(2);

                    GTotal = subTotalCost + charge;
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell
                        className="pl-2 capitalize"
                        align="center"
                        style={{ width: 50 }}
                      >
                        {index + 1}
                      </TableCell>

                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "300px" }}
                      >
                        <TextValidator
                          label="description"
                          type="text"
                          name="product_name"
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={item ? item.product_name : null}
                          validators={["required"]}
                          inputProps={{
                            ref: setRef(index + "description"),
                          }}
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "description",
                              index + "descriptionss",
                              null
                            );
                          }}
                          multiline
                          errorMessages={["this field is required"]}
                        />
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "350px" }}
                      >
                        <TextValidator
                          label="Our description"
                          type="text"
                          variant="outlined"
                          size="small"
                          name="description"
                          multiline
                          fullWidth
                          inputProps={{
                            ref: setRef(index + "descriptionss"),
                          }}
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "descriptionss",
                              index + "quantity",
                              index + "description"
                            );
                          }}
                          value={
                            item?.description
                              ? item?.description
                              : item?.product
                              ? item?.product[0]?.description
                              : null
                          }
                          onChange={(event) => setName(event, index)}
                        />
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "80px" }}
                      >
                        <TextValidator
                          label="Quantity"
                          onChange={(event) => calcualteprice(event, index)}
                          type="text"
                          variant="outlined"
                          size="small"
                          fullWidth
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "quantity",
                              index + "unit_of_measure",
                              index + "descriptionss"
                            );
                          }}
                          inputProps={{
                            min: 0,
                            style: { textAlign: "center" },
                            ref: setRef(index + "quantity"),
                          }}
                          name="quantity"
                          value={item.quantity ? item.quantity : ""}
                          validators={["isNumber"]}
                          errorMessages={["Invalid Number"]}
                        />
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "80px" }}
                      >
                        <TextField
                          label="UOM"
                          type="text"
                          variant="outlined"
                          size="small"
                          name="unit_of_measure"
                          style={{ width: "100%", float: "left" }}
                          fullWidth
                          inputProps={{
                            ref: setRef(index + "unit_of_measure"),
                            readOnly: true,
                          }}
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "unit_of_measure",
                              index + "purchase_price",
                              index + "quantity"
                            );
                          }}
                          value={
                            item.unit_of_measure ? item.unit_of_measure : " "
                          }
                          onChange={(event) => setName(event, index)}
                        ></TextField>
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "200px" }}
                      >
                        <CurrencyTextField
                          className="w-full"
                          size="small"
                          name="purchase_price"
                          label="Price"
                          variant="outlined"
                          value={item?.purchase_price}
                          currencySymbol=" "
                          onChange={(event, newValue) =>
                            handleIvoiceListChange(event, index, newValue)
                          }
                        />
                      </TableCell>

                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "250px" }}
                      >
                        <CurrencyTextField
                          className="w-full"
                          readOnly
                          label="Total"
                          variant="outlined"
                          fullWidth
                          onKeyDown={(e) => {
                            controlKeyPress(
                              e,
                              index + "total_amount",
                              null,
                              index + "purchase_price"
                            );
                          }}
                          inputProps={{
                            ref: setRef(index + "total_amount"),
                          }}
                          size="small"
                          currencySymbol=""
                          name="total_amount"
                          value={item.total_amount ? item.total_amount : ""}
                        />
                      </TableCell>

                      <TableCell
                        className="pl-2 capitalize"
                        align="left"
                        style={{ textAlign: "right" }}
                      >
                        <Icon
                          color="error"
                          fontSize="small"
                          onClick={() => deleteItemFromInvoiceList(index)}
                        >
                          delete
                        </Icon>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <h6 className="pl-4">
              <strong>Terms</strong>
            </h6>
            <div className="px-4 flex justify-between">
              <div className="flex">
                <div className="pr-12">
                  <p
                    className="mb-8"
                    style={{ position: "relative", top: "10px" }}
                  >
                    Payment Terms:
                  </p>
                  <p
                    className="mb-8"
                    style={{ position: "relative", top: "10px" }}
                  >
                    Freight type:
                  </p>
                  {showother == 'Other' && <>
                  <p className="mb-8" style={{ position: 'relative', top: '10px' }}>Other Freight type:</p>
                  </>}
                  <p
                    className="mb-8"
                    style={{ position: "relative", top: "10px" }}
                  >
                    Delivery Time:
                  </p>
                  <p
                    className="mb-8"
                    style={{ position: "relative", top: "10px" }}
                  >
                    Inco-Term:
                  </p>
                </div>
                <div>
                  <TextValidator
                    inputProps={{ readOnly: true }}
                    label="Payment Terms"
                    className="mb-4"
                    onChange={(e) => setpayment_terms(e.target.value)}
                    type="text"
                    style={{ width: 500 }}
                    variant="outlined"
                    size="small"
                    name="net_amount"
                    value={payment_terms}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />

<TextValidator
                    label="Freight"
                    onChange={(e)=>{setfreight(e.target.value);
                      if(e.target.value == 'Other'){ setShowOther('Other') }else{setShowOther(''); setOfreight('')}} }
                    className="mb-4"
                    type="text"
                    variant="outlined"
                    size="small"
                    select
                    name="net_amount"
                    style={{ width: 500 }}
                    value={freight}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  >
                    <MenuItem value='Air Freight'>Air Freight</MenuItem>
                    <MenuItem value='Sea Freight'>Sea Freight</MenuItem>
                    <MenuItem value='Road Freight'>Road Freight</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                  </TextValidator>
                  {showother == 'Other' && <>
                    <TextValidator
                    label="Freight"
                    className="mb-4"
                    onChange={e => setOfreight(e.target.value)
                    }
                    type="text"
                    variant="outlined"
                    size="small"
                    style={{ width: 500 }}
                    name="net_amount"
                    value={ofreight}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  
                  </>}
                  
                  <TextValidator
                    label="Delivery Time"
                    className="mb-4"
                    onChange={(e) => setdelivery_time(e.target.value)}
                    type="text"
                    variant="outlined"
                    size="small"
                    style={{ width: 500 }}
                    name="net_amount"
                    value={delivery_time}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    label="Inco-Term"
                    onChange={(e) => setinco_terms(e.target.value)}
                    type="text"
                    className="mb-4"
                    variant="outlined"
                    size="small"
                    name="net_amount"
                    style={{ width: 500 }}
                    value={inco_terms}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </div>
              </div>
              <div className="px-4 flex justify-end">
                <div className="flex ">
                  <div className="pr-12">
                    <p className="mb-8">Total Amount ({currency_type}) :</p>

                    <p
                      className="mb-8"
                      style={{ position: "relative", top: "-4px" }}
                    >
                      Freight Charges ({currency_type})
                    </p>

                    <strong>
                      <p
                        className="mb-8"
                        style={{ position: "relative", top: "-4px" }}
                      >
                        Net Total ({currency_type})
                      </p>
                    </strong>
                  </div>
                  <div>
                    <p className="mb-4" align="right">
                      {subTotalCost
                        ? subTotalCost.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })
                        : "0.00"}
                    </p>

                    <CurrencyTextField
                      className="w-full mb-4"
                      label="Freight Charges"
                      variant="outlined"
                      fullWidth
                      size="small"
                      currencySymbol={currency_type}
                      name="vat"
                      onChange={(e, value) => {
                        setcharge(value);
                        settotal(value + subTotalCost);
                      }}
                      value={charge}
                    />

                    <div>
                      <CurrencyTextField
                        className="w-full mb-4"
                        label="Grand Total"
                        readOnly
                        variant="outlined"
                        fullWidth
                        size="small"
                        currencySymbol={currency_type}
                        name="net_amount"
                        value={GTotal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </div>
      </Card>

      {shouldOpenEditorDialog && (
        <MemberEditorDialog
          handleClose={handleDialogClose}
          contactid={status}
          open={shouldOpenEditorDialog}
          catid={catid}
          partyids={partyids}
          productprice={setproductprice}
        />
      )}
      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleDialogClose}
          text="Are you sure to delete?"
        />
      )}
    </div>
  );
};

const initialValues = {
  id: "",
  orderNo: "",
  buyer: {
    name: "",
    address: "",
  },
  seller: {
    name: "",
    address: "",
  },
  item: [],
  status: "",
  date: new Date(),
  currency: "",
  loading: false,
};

export default InvoiceEditor;
