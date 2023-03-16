import React, { useState, useEffect } from "react";
import {
    Button,
    Divider,
    Card,
    Table,
    TextField,
    TableHead,
    TableRow,
    TableCell, Fab,
    TableBody,
    Icon,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import url, { ApiKey, navigatePath } from "../invoice/InvoiceService";
// expandable table
import Swal from "sweetalert2";
import moment from "moment";
import CurrencyTextField from "@unicef/material-ui-currency-textfield/dist/CurrencyTextField";
import useAuth from '../../hooks/useAuth';


const useStyles = makeStyles(({ palette, ...theme }) => ({
    invoiceEditor: {
        "& h5": {
            fontSize: 15,
        },
    },
    root: {
        width: "100px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
    const [isAlive, setIsAlive] = useState(true);
    const [state, setState] = useState(initialValues);
    const [cname, setcname] = useState('');
    var tempDate = new Date();
    const { user } = useAuth();
    const [inv_date, setInv_date] = useState(moment(new Date()).format('DD MMM YYYY'));

    const [qno, setqno] = useState('');
    const [pono, setpono] = useState('');
    const [party_id, setparty_id] = useState('');
    const [discounts, setdiscounts] = useState('0');
    const [proList, setproList] = useState([]);
    const [ProductList, setProductList] = useState([]);
    const [discount, setdiscount] = useState('0')
    const [dstatus, setdstatus] = useState(false);
    const routerHistory = useHistory();

    const { id } = useParams();
    const classes = useStyles();
    const formData = new FormData();
    const [ponumber, setponumber] = useState('');
    const [currency_type, setcurrency_type] = useState('SAR');

    const generateRandomId = useCallback(() => {
        let tempId = Math.random().toString();
        let id = tempId.substr(2, tempId.length - 1);
        setState((state) => ({ ...state, id }));
    }, []);

    let dis_per = parseFloat(0.00).toLocaleString(undefined, {
        minimumFractionDigits: 2
    });

    const handleChange = (event, fieldName) => {
        // setState({ ...state, ['discount']:event.target.value });
        event.persist();


        let tempItemList = [...state.item];
        setdstatus(true)
        setdiscount(event.target.value)
        setdiscounts(event.target.value)

        // setState({ ...state, ['vat']: vat });
        // setState({ ...state, ['net_amount']: GTotal });
        // setdstatus(true)



    };


    const handleIvoiceListChange = (event, index) => {
        event.persist()
        let tempItemList = [...state.item];

        tempItemList.map((element, i) => {
            let sum = 0;

            if (index === i) {

                element['total_amount'] = (parseInt(element.purchase_price) * event.target.value).toFixed(2);
                element[event.target.name] = event.target.value;


            }
            return element;

        });

        setState({
            ...state,
            item: tempItemList,
        });



    };








    const handleSubmit = () => {
        let tempItemList = [...state.item];
        tempItemList.map((element, i) => {
            let sum = 0;
            element['product_id'] = "";

            return element;
        })


        setState({
            ...state,
            item: tempItemList,
        });
        // setState({ ...state, ['subTotalCost']: subTotalCost });
        setState({ ...state, loading: true });

        let tempState = { ...state };
        let arr = []
        delete tempState.loading;



        // arr.push({
        //   invoice_details:tempItemList,
        // });
        arr.invoice_details = tempItemList
        arr.quotation_id = parseInt(id)
        arr.discount_in_percentage = discount
        arr.total_value = parseFloat(subTotalCost).toFixed(2)
        arr.grand_total = GTotal
        arr.vat_in_value = parseFloat(vat).toFixed(2)
        arr.party_id = party_id
        arr.ps_date = tempDate
        arr.invoice_no = pono
        arr.file = state?.file


        formData.append('file', state?.file)
        // formData.append('invoice_details', tempItemList)
        formData.append('quotation_id', parseInt(id))
        formData.append('discount_in_percentage', discount)
        formData.append('total_value', parseFloat(subTotalCost).toFixed(2))
        formData.append('grand_total', GTotal)
        formData.append('vat_in_value', parseFloat(vat).toFixed(2))
        formData.append('ps_date', inv_date)
        formData.append('po_number', pono)
        formData.append('invoice_no', ponumber)
        formData.append('party_id', party_id)
        formData.append('div_id', localStorage.getItem('division'))
        formData.append('user_id', user.id)
        formData.append('currency_type', currency_type)

        tempItemList.map((answer, i) => {
            formData.append(`invoice_details${i}`, JSON.stringify(answer))
        })

        const json = Object.assign({}, arr);

        url.post('purchase-invoice', formData)
            .then(function (response) {

                Swal.fire({
                    title: 'Success',
                    type: 'success',
                    icon: 'success',
                    text: 'Data saved successfully.',
                });
                routerHistory.push(navigatePath + "/purchaseinvoiceview")
                //  window.location.href="../quoateview"
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
            })

    };

    const handleChangeImage = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.files[0],
        });

    }
    function cancelform() {
        routerHistory.push(`/PoTab/0`)
    }

    useEffect(() => {

        // url.get("products").then(({ data }) => {
        //     setproList(data)
            
        // });
        // url.get("sale-quotation/" + id).then(({ data }) => {

        //     setcname(data[0].party.firm_name)
        //     setqno(data[0].quotation_no)
        //     setpono(data[0].po_number)
        //     setcurrency_type(data[0].currency_type)

        //     // setrdate(data[0].requested_date)
        //     setparty_id(data[0].party.id)
        //     setdiscount(data[0].discount_in_p)
        //     let tempItemList = data[0].quotation_details;
        //     tempItemList.map((element, i) => {
        //         element['productId'] = element.product_id
        //         element['product'] = element.description
        //         return element

        //     })

        //     setState({
        //         ...state,
        //         item: tempItemList,
        //     });

        // });
        url.get("mjrPurchaseInvoice/" + id).then(({ data }) => {
            setcname(data?.sales_quotation?.party?.firm_name)
            setqno(data?.sales_quotation?.quotation_no)
            setpono(data?.sales_quotation?.po_number)
            setcurrency_type(data?.sales_quotation?.currency_type)

            // setrdate(data[0].requested_date)
            setparty_id(data?.sales_quotation?.party?.id)
            setdiscount(data?.sales_quotation?.discount_in_p)
            let tempItemList = data?.sales_quotation?.quotation_details;
            tempItemList.map((element, i) => {
                element['productId'] = element.product_id
                element['product'] = element.description
                return element

            })

            setState({
                ...state,
                item: tempItemList,
            });
        });
    }, [id, isNewInvoice, isAlive, generateRandomId]);


    // handleChange(evt) {
    //   this.setState({
    //     [evt.target.name]: evt.target.value,
    //   });
    // }

    // useEffect(() => {
    //   return () => setIsAlive(false);
    // }, []);

    let subTotalCost = 0;
    let GTotal = 0;
    let discount1 = 0;
    let {

        item: invoiceItemList = [],
        quote: quoteList = [],
        vat,
        loading,
    } = state;

    const calculatemargin = (event, index, value) => {
        let tempItemList = [...state.item];
        let d_val = value ? parseFloat(value) : parseFloat(event.target.value);
        tempItemList.map((element, i) => {
            let sum = 0;



            if (index == i) {

                if (parseInt(element.purchase_price) !== 0) {

                    element['purchase_price'] = d_val
                    element['margin'] = ((parseFloat(d_val) - parseFloat(element.purchase_price)) / parseFloat(element.purchase_price)) * 100;
                    element.margin_val = ((parseFloat(element.purchase_price) * parseFloat(element.margin)) / 100) * parseFloat(element.quantity)
                    element.sell_price = d_val
                    // console.log((parseFloat(event.target.value)-parseFloat(element.purchase_price))/parseFloat(element.purchase_price)*100)
                    // element.sell_price=parseFloat((element.margin * parseFloat(element.purchase_price)/100)+parseFloat(element.purchase_price)).toFixed(3)-((parseFloat(parseFloat(element.discount) * (parseFloat((element.margin * parseFloat(element.purchase_price)/100)+parseFloat(element.purchase_price)).toFixed(3))/100)).toFixed(3));
                    // element['discount']=((parseFloat(element.purchase_price)*parseFloat(element.margin))/100)*parseFloat(element.quantity);
                    element.total_amount = ((parseFloat(d_val) * element.quantity).toFixed(2));
                }
                else {
                    // element['margin']=parseFloat(0.00);
                    
                    element.total_amount = ((parseFloat(d_val) * element.quantity).toFixed(2))
                    element.sell_price = d_val
                }
            }
            return element;

        });

        setState({
            ...state,
            item: tempItemList,
        });
    }

    return (
        <div className="m-sm-30">
            <Card elevation={3}>
                <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
                    <ValidatorForm autocomplete="off" onSubmit={handleSubmit} onError={(errors) => null}>

                        <div className="viewer_actions px-4 flex justify-between">
                            <div className="mb-6">
                                <h3 align="left">PURCHASE INVOICE</h3>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="upload-photo" >
                                    <input
                                        style={{ display: "none" }}
                                        id="upload-photo"
                                        name="file"
                                        type="file"
                                        onChange={(e) => handleChangeImage(e)}
                                    />
                                    <Button
                                        color="secondary"
                                        size="small"
                                        component="span"
                                        aria-label="add"
                                        variant="outlined"
                                        className="mr-4 py-2"
                                    >
                                        &nbsp;  <Icon>cloud_upload</Icon> &nbsp; UPLOAD PURCHASE INVOICE &nbsp;
                                    </Button>
                                </label>
                                &nbsp;  &nbsp;
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
                                    <Icon>save</Icon> SAVE & PRINT INVOICE
                                </Button>
                            </div>
                        </div>

                        <div className="viewer__order-info px-4 mb-4 flex justify-between">
                            <div>
                                {/* <h5 className="font-normal capitalize">
                                    <strong>Quotation Number: </strong>{" "}
                                    <span>
                                        {qno}
                                    </span>
                                </h5> */}
                                {/* <p className="mb-4">Order Number</p> */}
                                {/* <TextValidator
              label="Customer Name."
              type="text"
              size="small"
              variant="outlined"
              fullWidth
              name="cname"
              value={cname}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}
                                <h5 className="font-normal capitalize">
                                    <strong>Company Name: </strong>{" "}
                                    <span>
                                        {cname}
                                    </span>
                                </h5>

                                {/* <TextValidator
                label="Buyer Address"
                onChange={(event) => handleSellerBuyerChange(event, "buyer")}
                type="text"
                name="address"
                size="small"
                fullWidth
                multiline={true}
                rowsMax={4}
                variant="outlined"
                value={buyer ? buyer.address : null}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}
                            </div>
                            <div>

                                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // id="mui-pickers-date"
                label="Requested Date"
                inputVariant="outlined"
                type="text"
                name="rdate"
                value={rdate}
                size="small"
                fullWidth
                onChange={rdate => setrdate(rdate)} 
                
              /> */}
                                {/* </MuiPickersUtilsProvider> */}
                                <div className="text-right">
                                    <h5 className="font-normal">
                                        <strong>Due date: </strong>
                                        <span>
                                            {moment(tempDate).format('DD MMM YYYY')}
                                        </span>
                                    </h5>
                                </div>
                                <div className="text-right">
                                    <h5 className="font-normal">
                                        <strong>P.O Number: </strong>
                                        <span>
                                            {pono}
                                        </span>
                                    </h5>
                                    <TextField
                                        type="text"
                                        label="Invoice Number"
                                        className="m-2"
                                        style={{ minWidth: 200, maxWidth: '250px' }}
                                        name="inv_no"
                                        size="small"
                                        variant="outlined"
                                        value={ponumber ? ponumber : ''}
                                        onChange={(e) => setponumber(e.target.value)}

                                    />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className="m-2"
                                            margin="none"
                                            label="Date"
                                            format="dd MMMM yyyy"
                                            inputVariant="outlined"
                                            type="text"
                                            size="small"
                                            selected={inv_date}
                                            value={inv_date}
                                            onChange={(date) => {
                                                setInv_date(moment(date).format('DD MMM YYYY'))
                                                // return date
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    {/* <TextField
                    
                    label="PO Number"
                    style={{minWidth:200,maxWidth:'250px'}}
                    name="party_id"
                    size="small"
                    variant="outlined"
                    
                    value={ponum}
                    // onChange={handleChange}
                    onChange={(event)=>setponum(event.target.value)}
                    required
                    
                  >
                    
        </TextField> */}
                                </div>
                                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="none"
                // id="mui-pickers-date"
                label="Due Date"
                inputVariant="outlined"
                type="text"
                autoOk={true}
                variant="outlined"
                value={date}
                size="small"
                fullWidth
                format="MMMM dd, yyyy"
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider> */}
                            </div>
                        </div>

                        <Divider />

                        <Table className="mb-4">
                            <TableHead>
                                <TableRow className="bg-default">
                                    <TableCell className="pl-2" width={80} align="center">S.NO.</TableCell>
                                    {/* <TableCell className="px-0">ITEM NAME</TableCell> */}
                                    <TableCell className="px-0" align="center">RFQ DESCRIPTION</TableCell>
                                    <TableCell className="px-0" align="center" width={100}>UOM</TableCell>
                                    <TableCell className="px-0" align="center" style={{ width: '80px' }}>QUANTITY</TableCell>
                                    <TableCell className="px-0" align="center" style={{ width: '150px' }}>UNIT PRICE</TableCell>
                                    <TableCell className="px-0" align="center">TOTAL</TableCell>
                                    {/* <TableCell className="px-0">Action</TableCell> */}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {invoiceItemList.map((item, index) => {

                                    if (!dstatus) {

                                        // subTotalCost=parseInt(subTotalCost)+(parseInt(item.product[0].unit_price) * parseInt(item.quantity_required))

                                        subTotalCost += parseFloat(item.total_amount)

                                        vat = ((subTotalCost * 15) / 100).toFixed(2)
                                        GTotal = (subTotalCost + (subTotalCost * 15) / 100).toFixed(2)
                                    }
                                    else {

                                        subTotalCost += parseFloat(item.total_amount)
                                        // discount=subTotalCost-parseFloat(discounts * subTotalCost/100);
                                        vat = (((subTotalCost - parseFloat(discounts * subTotalCost / 100)) * 15) / 100).toFixed(2)
                                        dis_per = parseFloat(discounts * subTotalCost / 100).toFixed(2)
                                        GTotal = ((subTotalCost - parseFloat(discounts * subTotalCost / 100)) + parseFloat(vat)).toFixed(2);
                                    }
                                    // vat= (discount * 15) / 100
                                    // GTotal=item.discount + item.vat;

                                    return (
                                        <TableRow key={index}>

                                            {/* <div className={classes.root}> */}

                                            {/* <ExpansionPanel>
     
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => expandData(item.product_id)}
        >
          <Typography className={classes.heading}></Typography>
        </ExpansionPanelSummary>
     
        <ExpansionPanelDetails
         <TableRow>
            <span>
            {ProductList.map((item, index) => {
              return (
                <span>
                <h6>{item.name}</h6>
                <h6>{item.name}</h6>
                <h6>{item.name}</h6>
                <h6>{item.name}</h6>
                </span>
              )
            })}
            </span>
          </TableRow>
        </ExpansionPanelDetails>
      </ExpansionPanel>
     */}

                                            {/* </div> */}

                                            <TableCell className="pl-2 capitalize" align="center">
                                                {index + 1}
                                                {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
                                            </TableCell>
                                            {/* <Select
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
        placeholder="Select Option"
        value={proList.find(obj => obj.value === item.product[0].name)} // set selected value
        options={proList
         
         } 
         onChange={(event) => handleIvoiceListChange(event, index)}
          
      /> */}
                                            {/* <TableCell className="pl-0 capitalize" align="left">
                    
                  
                    <TextValidator
                      label="Item Name"
                      variant="outlined"
                      size="small"
                      // onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      name="name"
                      fullWidth
                      // value={item? item?.product.name : null}
                      validators={["required"]}
                      multiline
                      errorMessages={["this field is required"]}
                      
                      
                    >
                      
                      
                    </TextValidator>
                  </TableCell> */}

                                            <TableCell className="pl-0 capitalize" align="left">
                                                <TextValidator
                                                    label="description"
                                                    // onChange={(event) => handleIvoiceListChange(event, index)}
                                                    type="text"
                                                    name="description"
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    inputProps={{ style: { textTransform: 'capitalize' } }}
                                                    value={item ? item.description : null}
                                                    // validators={["required"]}
                                                    multiline
                                                    required
                                                // errorMessages={["this field is required"]}
                                                />
                                            </TableCell>
                                            <TableCell className="pl-0 capitalize" align="left">
                                                <TextValidator
                                                    label="UOM"
                                                    // onChange={(event) => handleIvoiceListChange(event, index)}
                                                    type="text"
                                                    readOnly
                                                    variant="outlined"
                                                    size="small"
                                                    name="unit_of_measure"
                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                    fullWidth
                                                    value={item ? item.unit_of_measure : null}

                                                />
                                            </TableCell>
                                            <TableCell className="pl-0 capitalize" align="left" style={{ width: '60px' }}>
                                                <TextValidator
                                                    label="Quantity"
                                                    onChange={(event) => handleIvoiceListChange(event, index)}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    name="quantity"
                                                    min="1"
                                                    max={item.quantity}
                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                    value={item.quantity}
                                                    validators={["required", "isNumber"]}
                                                    errorMessages={[
                                                        "this field is required",
                                                        "Input is not Valid",
                                                    ]}
                                                />
                                            </TableCell>

                                            <TableCell className="pl-0 capitalize" align="left" style={{ width: '80px' }}>
                                                {/* <TextValidator
                      label="Unit_Price"
                      // onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      name="sell_price"
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={item? item.sell_price: null}
                      inputProps={{min: 0, style: { textAlign: 'right' }}}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    /> */}
                                                <CurrencyTextField
                                                    className="w-full"
                                                    label="Unit Price"
                                                    variant="outlined"
                                                    fullWidth
                                                    

                                                    size="small"
                                                    // calculatemargin
                                                    onChange={(e, value) => calculatemargin(e, index, value)}

                                                    currencySymbol=""
                                                    name="purchase_price"
                                                    value={parseFloat(item?.purchase_price)}
                                                />
                                            </TableCell>




                                            <TableCell className="pl-0 capitalize" align="left">
                                                {/* <TextValidator
                      label="QTotal"
                      // onChange={(event) => handleIvoiceListChange(event, index)}
                      type="text"
                      variant="outlined"
                      size="small"
                      name="total_amount"
                      inputProps={{min: 0, style: { textAlign: 'right' }}}
                      fullWidth
                      value={item.total_amount}
                      
                    /> */}
                                                <CurrencyTextField
                                                    className="w-full"
                                                    label="Total"
                                                    variant="outlined"
                                                    fullWidth
                                                    readOnly
                                                    size="small"
                                                    currencySymbol=""
                                                    name="total_amount"
                                                    value={item.total_amount}
                                                />
                                            </TableCell>


                                            {/* <TableCell className="pl-0 capitalize" align="left">
                    {item.unit * item.price}
                  </TableCell> */}

                                            {/* <TableCell className="pl-0 capitalize" align="left">
                    <Button onClick={() => deleteItemFromInvoiceList(index)}>
                    <Icon color="error" fontSize="small">
                        delete
                      </Icon>
                    </Button>
                  </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {/* <div className="flex justify-end px-4 mb-4">
          <Button  className="mt-4"
            color="primary"
            variant="contained"
            size="small" onClick={addItemToInvoiceList}>Add Item</Button>
        </div> */}

                        <div className="flex justify-end px-4 mb-4">
                            <div className="flex ">
                                <div className="pr-12">
                                </div>
                            </div>

                            <div className="flex ">
                                <div className="pr-12">
                                    <p className="mb-8">Sub Total:</p>
                                    <p className="mb-8">Discount:</p>
                                    <p className="mb-8">VAT(15%):</p>
                                    {/* <p className="mb-5">currency:</p> */}
                                    <strong>
                                        <p className="mb-8">Grand Total:</p>
                                    </strong>
                                </div>
                                <div>

                                    {/* <p className="mb-4" align="right">{subTotalCost ? subTotalCost.toLocaleString(undefined, {
                                        minimumFractionDigits: 2
                                    }) : '0.00'}</p> */}

                                    <CurrencyTextField
                                            className="w-full mb-4"
                                            label="Sub Total"
                                            style={{ width: '250px' }}
                                            
                                            variant="outlined"
                                            fullWidth
                                            readOnly
                                            size="small"
                                            currencySymbol={currency_type}
                                            value={subTotalCost ? subTotalCost.toLocaleString(undefined, {
                                        minimumFractionDigits: 2
                                    }) : '0.00'}
                                        />
                                        {/* <br /> */}
                                    {/* <TextValidator
                className="mb-4"
                label="Discount"
                type="text"
                variant="outlined"
                size="small"
                inputProps={{min: 0, style: { textAlign: 'right' }}}
                value={discount}
              /> */}
                                    <div>
                                        <TextField
                                            className="mb-4 mr-2"
                                            label="Discount %"
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            readOnly
                                            style={{ width: '90px' }}
                                            onChange={(event) => handleChange(event, "discount")}
                                            inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                            value={discount}
                                        // style={{width:50}}
                                        // validators={["required"]}
                                        // errorMessages={["this field is required"]}
                                        />


                                        {/* <TextField
                className="mb-4 ml-2"
                label="Discount"
                type="text"
                variant="outlined"
                size="small"
                name="dis_per"
                style={{width:'90px'}}
                inputProps={{min: 0, style: { textAlign: 'right' }}}
                // onChange={(event) => handleChange(event, "discount")}
                value={discount?dis_per:0.00}
                // validators={["required"]}
                // errorMessages={["this field is required"]}
              /> */}
                                        <CurrencyTextField
                                            className="w-full"
                                            label="Discount"
                                            style={{ width: '150px' }}
                                            name="dis_per"
                                            variant="outlined"
                                            fullWidth
                                            readOnly
                                            size="small"
                                            currencySymbol={currency_type}
                                            value={dis_per}
                                        />
                                    </div>
                                    {/* <TextValidator
                className="mb-4"
                label="Vat"
                // onChange={handleChange}
                type="text"
                variant="outlined"
                size="small"
                name="vat"
                value={subTotalCost?vat:0}
                inputProps={{min: 0, style: { textAlign: 'right' }}}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}
                                    <div>


                                        <CurrencyTextField
                                            className="w-full mb-4"
                                            label="VAT"
                                            variant="outlined"
                                            fullWidth
                                            readOnly
                                            size="small"
                                            style={{ width: '250px' }}
                                            currencySymbol={currency_type}
                                            name="vat"
                                            value={subTotalCost ? vat : 0}
                                        />
                                    </div>
                                    {/* <TextValidator
                label="Grand Total"
                // onChange={handleChange}
                type="text"
                className="mb-4"
                variant="outlined"
                size="small"
                name="net_amount"
                value={subTotalCost?GTotal:0.00}
                inputProps={{min: 0, style: { textAlign: 'right' }}}
                validators={["required"]}
                errorMessages={["this field is required"]}
              /> */}
                                    <div>
                                        <CurrencyTextField
                                            className="w-full"
                                            label="Grand Total"
                                            variant="outlined"
                                            style={{ width: '250px' }}
                                            size="small"
                                            readOnly
                                            currencySymbol={currency_type}
                                            name="net_amount"
                                            value={subTotalCost ? GTotal : 0.00}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </ValidatorForm>
                </div>
            </Card>
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
    // discount:"",
    date: new Date(),
    currency: "",
    loading: false,
};

export default InvoiceEditor;
