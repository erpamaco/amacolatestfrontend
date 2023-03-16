import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Icon,
  Card,
  IconButton,
  Tooltip
} from "@material-ui/core";
import Swal from "sweetalert2";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {  navigatePath } from "../../invoice/InvoiceService.js";
import { useParams, useHistory } from "react-router-dom";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import useDynamicRefs from 'use-dynamic-refs';
import MemberEditorDialog from '../../party/partycontact';
import UOMDialog from '../../invoice/UOMDialog';
import url from "../../invoice/InvoiceService.js";
import moment from "moment";
import { Breadcrumb } from "matx";

import useAuth from "app/hooks/useAuth";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  invoiceEditor: {
    "& h5": {
      fontSize: 15,
    },
  },
}));

const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [state, setState] = useState(initialValues);
  const [rdate, setrdate] = useState(new Date());//Rfq date 
  const [ddate, setddate] = useState(new Date());//Bid Closing date
  const [CustomerList, setCustomerList] = useState([]);//Customer List
  const [contId, setContId] = useState([]);//Contact Id
  const [ProductList, setProductList] = useState([]);//ProductList
  const [listrfq, setlistrfq] = useState([]);
  const [files, setfiles] = useState([]);//files
  const [upload, setupload] = useState([]);//upload files
  const [proList, setproList] = useState([]);//Product list
  const [customercontact, setcustomercontact] = useState([]);//contact person
  const [
    shouldOpenConfirmationDialogparty,
    setshouldOpenConfirmationDialogparty,
  ] = useState(false);

  const [party_id, setPartyId] = useState()//Party Id
  const [rfqstatus, setrfqstatus] = useState(false);//enable the contact person field

  let inputRef = [];//Keyboard event reference Id
  let priceRef = [];
  const [getRef, setRef] = useDynamicRefs();

  const { id } = useParams();
  const { user } = useAuth();
  const classes = useStyles();
  const formData = new FormData()
  

  //File delete
  const handleSingleRemove = (index) => {
    let tempList = [...upload];
    tempList.splice(index, 1);
    setupload([...tempList]);
  };
  // File Select 
  const handleFileSelect = (event) => {
    let files = event.target.files;
    let filesd = event.target.files;

   
    for (const iterator of filesd) {

      listrfq.push({
        created_at: "2021-03-30T06:43:07.000000Z",
        file_name: iterator.name,
        id: null,
        img_url: "http://www.amacoerp.com/amaco_test/public/rfq/30/Screenshot (9) - Copy.png",
       
        file: iterator
       
      });

    }
    
    setupload(listrfq)
  };

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);

 //close the party dialogue box
  const handleDialogClose = () => {
    setshouldOpenConfirmationDialogparty(false)
  }

  const [uom, setUOM] = useState(false)//unit of measures

 
/*set the Rfq detatils */
  const handleIvoiceListChange = (event, index) => {
    event.persist();

    let tempItemList = [...state.item];//assign the previous  rfq_details to the tempItemList
    tempItemList.map((element, i) => {
      if (index === i) element[event.target.name] = event.target.value;//chage the rfq details based on the value entered

      return element;
    });

    /*set the rfq details */
    setState({
      ...state,
      item: tempItemList,
    });
  };


  /*Initialize New Rfq details */
  const addItemToInvoiceList = () => {

    setproList(proListAll)/*set the products*/
    let tempItemList = [...state.item];//assign the previous  rfq_details to the tempItemList
    /*push the rfqdetails to the tempItemList */
    tempItemList.push({
      created_at: "",
      description: "",
      product_name: "",
      id: "",
      party: [],
      unit_of_measure: '',
      prices: [],
      product: [{
        name: ""
      }],
      src: '',
      product_id: "",
      quantity: "",
      updated_at: "2021-01-22T09:51:20.000000Z",

    });
    setState({
      ...state,
      item: tempItemList,
    });


  };

  /*delete the Rfq details */
  const deleteItemFromInvoiceList = (index, id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want To Delete This RFQ Details!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {


        let tempItemList = [...state.item];
        tempItemList.splice(index, 1);

        setState({
          ...state,
          item: tempItemList,
        });

        


      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your RFQ Details Are safe :)',
          'error'
        )
      }
    })
  };

  const handleDateChange = (rdate) => {

    setrdate(moment(rdate).format("MMMM DD, YYYY"))//set the rfq date

  };
  const routerHistory = useHistory();

  /*navigate to invoice page */
  const Rfqpush = () => {

   
    routerHistory.push(navigatePath + `/sales/rfq-form/rfqview`)

  };
  const handleRDateChange = (ddate) => {

    setddate(moment(ddate).format("MMMM DD, YYYY"))//set the Bid closing date 

  };
  /*delete the rfq files */
  const deleterfqfile = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this File!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`fileUpload/${id}`)
        
          .then(res => {


            Swal.fire(
              'Deleted!',
              'File has been deleted.',
              'success'
            )
            setIsAlive(true)
          })
        getrfq()


        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your File is safe :)',
          'error'
        )
      }
    })

  };

  /*select the rfq files */
  const SelectFile = (e, index) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      if (index == i) {
      
        element['files'] = e.target.files[0];
        element['src'] = URL.createObjectURL(e.target.files[0]);

      }

      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });

  }

  /*Delete the rfqfiles */
  const deletequotefile = (id, index) => {

    let tempItemList = [...state.item];

    tempItemList.map((element, i) => {
      if (index == i) {
       
        element['files'] = null;
        element['src'] = null;

      }

      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });


  };
  const setproduct = (v, newValue, index,) => {
    if (!newValue?.id) {
      setproList(proListAll?.filter(obj => obj?.name?.toLowerCase()?.includes(newValue?.toLowerCase())))//set the products

    }

    let tempItemList = [...state.item];//assign the previous rfq_details

    tempItemList.map((element, i) => {
      if (index === i) {
        element['id'] = newValue?.id ? newValue?.id : '';//set th product id
        element['product_name'] = newValue?.name ? newValue?.name : newValue;//set the product name 

      }

      return element;
    });

    setState({
      ...state,
      item: tempItemList,
    });


  };
const delay = ms => new Promise(res => setTimeout(res, ms));
/*Keyboard arrow key handling */
  const controlKeyPress = async (e, id, nextid, prev,dropdown)  => {

    if(e.key === 'Enter' && !dropdown){
     
      const a = id.split(parseInt(id));
      let i = parseInt(id)
      // const r = ++i + 'product_id';
      // console.log(r)
        try {
          addItemToInvoiceList();
          // if (r.includes('product_id')) {
            inputRef[parseInt(++i)].focus();
            // console.log(i)
          // }
        } catch (error) {
          // console.log(i)
          // console.log('error')
        }
      //  inputRef[parseInt(r)].focus();
    }

    if (e?.keyCode === 39) {
      if (nextid?.includes('purchase_price')) {
        priceRef[parseInt(nextid)].focus();
      } else if (nextid == null) {
       
      } else {
       
        getRef(nextid).current.focus();
      }
    } else if (e?.keyCode === 38 && !dropdown) {
      const a = id.split(parseInt(id));
      let i = parseInt(id)
      if (--i >= 0) {
        const r = i + a[1];
        if (r.includes('product_id')) {
          inputRef[parseInt(r)].focus();
        } else {
          getRef(r).current.focus();
        }

      }

    } else if (e?.keyCode === 40 && !dropdown) {
      const a = id.split(parseInt(id));
      let i = parseInt(id)
    
      const r = ++i + a[1];
      try {
        if (r.includes('product_id')) {
          inputRef[parseInt(r)].focus();
         
        } else {
          getRef(r).current.focus();
        }
      } catch (error) {
        // addItemToInvoiceList();
      }

     

    } else if (e?.keyCode == 37) {
      if (prev == null) {

      } else {
        if (prev.includes('product_id')) {
          inputRef[parseInt(prev)].focus();

         
        } else if (prev?.includes('purchase_price')) {
          priceRef[parseInt(prev)].focus();
        } else {
          getRef(prev).current.focus();
        }
      }
    }
  }

  const getContacts = (pid) => {
    if (pid) {//if partyid exists
      url.get("parties/" + pid).then(({ data }) => { //Api party details
        setcustomercontact(data[0]?.contacts);//set the customer contact

        setrfqstatus(true);//set the rfqstatus to enable the contact details field
      });

    } else {
      setrfqstatus(false);//set the rfqstatus to disable the contact details field
    }

 
  }

  const filter = createFilterOptions();


  /*Filter the product name */
  const filterProduct = (options, params) => {

    const filtered = filter(options, params);
    if (params.inputValue !== " ") {
      filtered.unshift({
        inputValue: params.inputValue,
        firm_name: (<Button variant="outlined" color="primary" size="small" onClick={() => routerHistory.push("/party/addparty")}>+Add New</Button>)
      });
    }
   
    return filtered;

  };
  /*Form submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    let arr = []
    setState({ ...state, loading: true });//set the previous state data and disable the save button 
    let tempState = { ...state };//assign the previous data to tempState
    let tempItemList = [...state.item];//assign the previous data to tempItemList
    delete tempState.loading;
    arr.rfq_details = tempItemList//assign the tempItemList to rfq_details
    arr.requested_date = rdate//assign the rfq date to requested date
    arr.require_date = ddate//assign the bid closing date to require date
    arr.rfqid = id//assign the id value to rfqid



/*append the multiple files to the formData */
    for (let a = 0; a < upload.length; a++) {
      formData.append(
        "myFile" + a,
        upload[a].file,
        upload[a].name,
      );
    }





    if (arr.rfq_details.length !== 0) {

      formData.append('rfq_details', JSON.stringify(tempItemList))
      formData.append('requested_date', rdate)
      formData.append('require_date', ddate)
      formData.append('rfq_id', id)
      formData.append('party_id', party_id)
      formData.append('user_id', user.id)
      formData.append('contact_id', contId)
      formData.append('div_id', localStorage.getItem('division'))
      tempItemList.map((answer, i) => {

        formData.append(`file${i}`, answer.files ? answer.files : null)//append the rfqdetail files to formData
      })

      url.post(`rfq`, formData)
        .then((response) => {

          Swal.fire({
            title: 'Success',
            type: 'success',
            icon: 'success',
            text: 'Data saved successfully.',
          })
            .then((result) => {

              routerHistory.push(navigatePath + `/sales/rfq-form/rfqview`)//navigate to rfq view
              getrfq()
            })

        })
        .catch(function (error) {
          Swal.fire({
            title: "Error",
            type: "error",
            icon: "warning",
            text: "Something Went Wrong.",
          }).then((result) => {
            setState({ ...state, loading: false });//loading button is enabled
          });
        })
    }
    else {
      Swal.fire({

        title: 'Warning',
        type: 'warning',
        icon: 'warning',
        text: 'Please Enter RFQ Details :)',
      })
      setState({ ...state, loading: false });//loading button is enabled

    }


  };

  /*get the rfqdetails */
  const getrfq = () => {
    url.get("rfq/" + id).then(({ data }) => {
    
      setrdate(moment(data[0].requested_date).format("MMMM DD, YYYY"))//set the rfq date
      setfiles(data[0].files)//set the files

      setddate(moment(data[0].require_date).format("MMMM DD, YYYY"))//set bid closing date



      setState({
        ...state,
        item: data[0].rfq_details,//set the rfq_details
      });
    });

    url.get("products").then(({ data }) => {

      setProductList(data)//set the products
    })
  }
 

  const [data, setData] = useState([])
  const [proListAll, setproListAll] = useState([]);

  useEffect(() => {

    url.get(`mjrRfqInc/${localStorage.getItem('division')}`).then(({ data }) => {
      setproList(data?.products.filter(obj => obj.div_id == localStorage.getItem('division')))//set the products based on division id
      setproListAll(data?.products.filter(obj => obj.div_id == localStorage.getItem('division')))//set the products based on division id
      setData(data?.uom);//set the unit of measure
      setCustomerList(data?.vendor);//set the customer
    });


    
    

    
    return setIsAlive(false)//The return function is the cleanup function,
  }, [isNewInvoice, isAlive, generateRandomId]);
  


  
  let {
    
    item: invoiceItemList = [],
    
    loading,
  } = state;


  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "RFQ LIST", path: '/sales/rfq-form/rfqview' },
            { name: "RFQ ADD", path: '' },
       
          ]}
        />
      </div>
      <Card elevation={3} className="m-sm-30">
        <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
          <ValidatorForm
          onSubmit={e => { e.preventDefault(); }}
          //  onSubmit={handleSubmit}
           autocomplete='off' onError={(errors) => null}>
          <div >
                <h3 style={{float:'left',}}> &nbsp;&nbsp; &nbsp;CREATE RFQ</h3>
              </div>
              <div className="viewer_actions px-4 flex justify-end">
           
              <div className="mb-6">
                <Button
                  type="button"
                  className="mr-4 py-2"
                  variant="outlined"
                  color="secondary"
                  onClick={() => Rfqpush()}
                >
                  <Icon>cancel</Icon> CANCEL
                </Button>
                <Button
                  // type="submit"
                  onClick={(e)=>{handleSubmit(e)}}
                  className="py-2"
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                >
                  <Icon>save</Icon> SAVE
                </Button>
              </div>
            </div>

            <div className="viewer__order-info px-4 mb-4 flex justify-between">
              <div className="flex justify-between px-4 mb-4">
                <div>

                  <Autocomplete
                    id="filter-demo"
                    variant="outlined"
                    options={CustomerList}
                    style={{ minWidth: 450, maxWidth: "500px" }}
                    getOptionLabel={(option) => option?.firm_name}
                    filterOptions={filterProduct}
                    required={true}
                    onChange={(event, newValue) => {
                      setPartyId(newValue?.id ? newValue?.id : 0)
                      getContacts(newValue?.id ? newValue?.id : 0)
                    }}
                    size="small"
                    renderInput={(params) => <TextField {...params} maxHeight="10px" 
                      variant="outlined" label="Vendor Name" />}
                  />

                </div>
                <div style={{ marginLeft: 9 }}>

                  {/* <Autocomplete
                    id="filter-demo"
                    variant="outlined"
                    label="Contact Person"
                    disabled={!rfqstatus}
                    options={customercontact?customercontact:[]}
                    onChange={(e, newValue) => { setContId(newValue?.id) }}
                    style={{ minWidth: 250, maxWidth: "300px" }}
                    getOptionLabel={(option) => option?.fname?option?.fname:" "}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      if (params.inputValue !== " ") {
                        filtered.unshift({
                          inputValue: params.inputValue,
                          fname: (<Button variant="outlined" color="primary" size="small" onClick={() => setshouldOpenConfirmationDialogparty(true)}>+ Add New</Button>)
                        });
                      }


                      return filtered;
                    }}
                    size="small"
                    renderInput={(params) => <TextField {...params} maxHeight="10px"
                      variant="outlined" label="Contact Person" />}
                  /> */}

                </div>
              </div>

              <div className="flex justify-between px-4 mb-4">
                <div className="flex">

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="none"
                      label="RFQ Date"
                      id="mui-pickers-date"
                      inputVariant="outlined"
                      type="text"
                      size="small"
                      fullWidth
                      autoOk={true}
                      value={rdate}
                      format="MMMM dd, yyyy"
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>

                  {/* </MuiPickersUtilsProvider> */}

                </div>
                <div>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="none"
                      className="ml-2"
                      id="mui-pickers-date"
                      label="Bid Closing Date"
                      inputVariant="outlined"
                      type="text"
                      autoOk={true}
                      variant="outlined"
                      value={ddate}
                      size="small"
                      fullWidth
                      format="MMMM dd, yyyy"
                      onChange={handleRDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </div>


            <Divider />

            <Table className="mb-4">
              <TableHead>
                <TableRow className="bg-default">
                  <TableCell className="pl-2 text-center" width={50} align='center' >S.NO.</TableCell>
                  <TableCell className="pl-2 text-center" width={100} ></TableCell>

                  <TableCell className="pl-2" width={300} >ITEM NAME</TableCell>

                  <TableCell className="px-0" width={100}>QUANTITY</TableCell>
                  <TableCell className="px-0" width={120}>UOM</TableCell>
                  <TableCell className="px-0" width={400}>DESCRIPTION</TableCell>
                  
                  <TableCell className="p-0" align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoiceItemList?.map((item, index) => {


                  return (
                    <TableRow key={index}>
                      <TableCell className="pl-2 capitalize" align="center" width={50}>
                        {index + 1}
                      </TableCell>


                      <TableCell>

                        {item?.src ? (<span><Icon onClick={(event) => deletequotefile(item.id, index)} color="error"

                        >close</Icon><img className="w-48" src={(item?.src)} alt="" ></img></span>) : <>
                          {item?.product_name && (<Icon
                            variant="contained"
                            component="label"

                          >
                            file_upload
                            <input
                              type="file"
                              name="files"
                              onChange={(e) => SelectFile(e, index)}

                            />
                          </Icon>)}
                        </>}
                        
                      </TableCell>


                      <TableCell className="pl-2 capitalize" align="left">


                       
                        <Autocomplete
                          className="w-full"
                          size="small"
                          options={proList ? proList : []}
                          name="product_name"
                          value={item?.product_name}
                          // filterOptions={filterOptions}
                          renderOption={option => option.name}
                          multiline
                          getOptionLabel={option => {
                            // e.g value selected with enter, right from the input
                            if (typeof option === "string") {
                              return option;
                            }
                            if (option.inputValue) {
                              return option.inputValue;
                            } 
                            return option?.name ? option?.name : (item?.product_name ? item?.product_name : "");
                          }}
                          freeSolo
                          onKeyDown={(e) => { controlKeyPress(e, index + 'product_id', index + 'quantity', null,'dropdown') }}

                          renderInput={(params) => (
                            <TextField inputRef={input => {
                              inputRef[index] = input;
                            }} {...params} variant="outlined" multiline name="product_id" required fullWidth />
                          )}
                          
                          onChange={(event, newValue) => setproduct(event, newValue, index)}
                          onInputChange={(event, newValue) => setproduct(event, newValue, index)}


                        />

                      </TableCell>



                      <TableCell className="pl-0 capitalize" align="left" width={100}>
                        <TextValidator
                          label="Qty"
                          type="text"
                          variant="outlined"
                          size="small"
                          name="quantity"
                          validators={["isNumber"]}
                          errorMessages={["Invalid Number"]}
                          value={item.quantity}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'quantity', index + 'unit_of_measure', index + 'product_id') }}
                          required
                          inputProps={{ min: 0, style: { textAlign: 'center' }, ref: setRef(index + 'quantity') }}
                          onChange={(event) => handleIvoiceListChange(event, index)}
                          fullWidth


                        />
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" width={100}>
                        <TextValidator
                          label="UOM"
                          variant="outlined"
                          size="small"
                          name="unit_of_measure"
                          required
                          value={item?.unit_of_measure}
                          onKeyDown={(e) => { controlKeyPress(e, index + 'unit_of_measure', index + 'descriptionss', index + 'quantity','dropdown') }}

                          inputProps={{ min: 0, style: { textAlign: 'center' }, ref: setRef(index + 'unit_of_measure') }}
                          MenuProps={{maxHeight: 48 * 4.5 + 8,
                            width: 250}}
                          onChange={(event) => handleIvoiceListChange(event, index)}
                          fullWidth
                          select


                        >
                          <MenuItem onClick={(e) => { setUOM(true) }}><Icon>add</Icon> ADD UOM</MenuItem>
                          {data.map((item, ind) => (
                            <MenuItem value={item.value} key={item}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextValidator>
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left" width={700}>
                        <TextField
                          label="Description"
                          inputProps={{ style: { textTransform: 'capitalize' }, ref: setRef(index + 'descriptionss') }}
                          type="text"
                          onKeyDown={(e) => { controlKeyPress(e, index + 'descriptionss', null, index + 'unit_of_measure') }}

                          required
                          name="description"
                          fullWidth
                          variant="outlined"
                          size="small"
                          multiline
                          value={item.description ? item.description : null}
                          onChange={(event) => handleIvoiceListChange(event, index)}

                        />
                      </TableCell>

                      

                      <TableCell className="pr-0 capitalize" align="center">
                        <Button onClick={() => deleteItemFromInvoiceList(index, item?.id)}>
                          <Icon color="error" fontSize="small">
                            delete
                          </Icon>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="flex justify-end px-4 mb-4">
              <Button className="mt-4 py-2"
                color="primary"
                variant="contained"
                size="small" onClick={addItemToInvoiceList}><Icon>add</Icon>Add Item</Button>
            </div>
          </ValidatorForm>
          <label htmlFor="upload-multiple-file">
            <Button
              className="capitalize ml-4 py-2"
              color="primary"
              component="span"
              variant="contained"
              size="small"
            >

              <Icon className="pr-8 pl-2">cloud_upload</Icon>
              <span>Attach File</span>

            </Button>
          </label>
          <input
            className="hidden"
            onChange={handleFileSelect}
            id="upload-multiple-file"
            type="file"
            multiple
            name="myFile[]"
          />
          <div className="mb-8">
            <div className="flex flex-wrap justify-center items-center m--2">
              {files.map((item, index) => (
                <Card
                  elevation={6}
                  className={clsx({
                    "flex-column justify-center items-center  px-8 m-2 cursor-pointer": true,
                  })}
                >

                  {item.file_name.split(".")[1] === 'jpg' && (<Icon
                  >
                    photo_library
                  </Icon>)}
                  {item.file_name.split(".")[1] === 'png' && (<Icon
                  >
                    photo_library
                  </Icon>)}
                  {item.file_name.split(".")[1] === 'pdf' && (<Icon
                  >
                    picture_as_pdf
                  </Icon>)}


                


                  {item.rfq_id && <a href={"http://www.amacoerp.com/amaco/php_file/images/" + id + "/" + item.file_name} target="_blank">{item.file_name.split("/")[2]}</a>}
                  {!item.rfq_id && <a href={"http://www.amacoerp.com/amaco/php_file/images/" + id + "/" + item.file_name} target="_blank">{item.file_name}</a>}

                  <IconButton onClick={() => deleterfqfile(item.id)}>
                    <Tooltip title="Delete File">
                      <Icon color="error">close</Icon>
                    </Tooltip>
                  </IconButton>
                </Card>
              ))}
              {upload.map((item, index) => (

                <Card
                  elevation={6}
                  className={clsx({
                    "flex-column justify-center items-center  px-8 m-2 cursor-pointer": true,
                  })}
                >

                  <Icon
                  >
                    photo_library
                  </Icon>

                 


                  <a href={"http://www.amacoerp.com/amaco/php_file/images/" + id + "/" + item.file_name} target="_blank">{item.file_name}</a>


                  <IconButton onClick={() => handleSingleRemove(item.id)}>
                    <Tooltip title="Delete File">
                      <Icon color="error">close</Icon>
                    </Tooltip>
                  </IconButton>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </Card>
      {shouldOpenConfirmationDialogparty && (
        <MemberEditorDialog
          open={shouldOpenConfirmationDialogparty}
          onConfirmDialogClose={handleDialogClose}
          handleClose={() => { setshouldOpenConfirmationDialogparty(false); setIsAlive(false) }}
          customercontact={setcustomercontact}
          partyid={party_id}

          text="Are you sure to delete?"
        />
      )}
      {uom && (
        <UOMDialog
          open={uom}
          handleClose={() => { setUOM(false) }}
          setData={setData}
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
  vat: "",
  date: new Date(),
  currency: "",
  unit_of_measure: "",
  loading: false,
};

export default InvoiceEditor;
