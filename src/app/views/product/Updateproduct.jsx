
import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Select from 'react-select';
import { useHistory, useParams } from 'react-router';
import { Breadcrumb } from "matx";
import useAuth from '../../hooks/useAuth';
import InputLabel from "@material-ui/core/InputLabel";
import {
  Button,
  Icon,
  Grid,
  Card,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Swal from "sweetalert2";
import url, { navigatePath, data } from "../../views/invoice/InvoiceService"




const SimpleForm = () => {
  // const [state, setState] = useState({
  //   date: new Date(),
  // });
  //Product Type
  const product_type = [
    "Non Inventory",
    "Inventory",
    "Service",
  ];
  // const data = [
  //   {
  //     value: "TON",
  //     label: "TON-TONNES"
  //   },
  //   {
  //     value: "TUB",
  //     label: "TUB-TUBES"
  //   },
  //   {
  //     value: "UNT",
  //     label: "UNT-UNITS"
  //   },

  //   {
  //     value: "YDS",
  //     label: "YDS-YARDS"
  //   },
  //   {
  //     value: "SET",
  //     label: "SET-SETS"
  //   },
  //   {
  //     value: "SQF",
  //     label: "SQF-SQUARE FEET"
  //   },
  //   {
  //     value: "SQY",
  //     label: "SQY-SQUARE YARDS"
  //   },
  //   {
  //     value: "THD",
  //     label: "THD-THOUSANDS"
  //   },

  //   {
  //     value: "KLR",
  //     label: "KLR-KILOLITER"
  //   },
  //   {
  //     value: "KME",
  //     label: "KME-KILOMETER"
  //   },
  //   {
  //     value: "KILOGRAM",
  //     label: "KG-KILOGRAM"
  //   },
  //   {
  //     value: "MLT",
  //     label: "MLT-MILLILITER"
  //   },
  //   {
  //     value: "MTR",
  //     label: "MTR-METERS"
  //   },
  //   {
  //     value: "NOS",
  //     label: "NOS-NUMBERS"
  //   },
  //   {
  //     value: "PAC",
  //     label: "PAC-PACKS"
  //   },
  //   {
  //     value: "PCS",
  //     label: "PCS-PACKS"
  //   },
  //   {
  //     value: "PRS",
  //     label: "PAIRS"
  //   },
  //   {
  //     value: "QTL",
  //     label: "QTL-QUINTAL"
  //   },
  //   {
  //     value: "ROL",
  //     label: "ROLLS"
  //   },
  //   {
  //     value: "CMS",
  //     label: "CENTIMETER"
  //   },
  //   {
  //     value: "CTN",
  //     label: "CTN-CARTONS"
  //   },
  //   {
  //     value: "DOZ",
  //     label: "DOZ-DOZEN"
  //   },
  //   {
  //     value: "DRM",
  //     label: "DRM-DRUM"
  //   },
  //   {
  //     value: "GMS",
  //     label: "GRAMS"
  //   },
  //   {
  //     value: "GMS",
  //     label: "GRAMS"
  //   },
  //   {
  //     value: "GRS",
  //     label: "GRS-GROSS"
  //   },

  // ];
  // const [selectedOption, setSelectedOption] = useState(data);


  const [selectedValue, setSelectedValue] = useState(1);
  // const [selectedValue1, setSelectedValue1] = useState('');
  // const [vendors, setvendors] = useState('');
  const [product, setproduct] = useState('');//product name
  const [description, setdescription] = useState('');//product description
  const [upimg, setUpimg] = useState('');//product description
  const [unit_of_measure, setunit_of_measure] = useState('');//unit_of_measure
  // const [unit_Price, setunit_Price] = useState('');
  const [selectedOption, setselectedOption] = useState('');//Category Name
  const [selectedOption1, setselectedOption1] = useState('1');//Category Id
  // const [mrp, setmrp] = useState('');
  // const [real_price, setreal_price] = useState('');
  // const [category_id, setcategory_id] = useState('');
  const [ptype, setptype] = useState('');//product Type
  const [hsn, sethsn] = useState('');//HSN Number
  const [iq, setiq] = useState('');//Initial Quantity
  const [mq, setmq] = useState('');//minimum quantity
  const [modelno, setmodelno] = useState('');//Model Number
  const [manid, setmanid] = useState('');//Manufacture Id
  const [name_in_ar, setname_in_ar] = useState('');//Product Name in arabic
  const [bname, setbname] = useState('');//Brand Name
  const [ecapacity, setecapacity] = useState('');//Capacity
  const [firm, setfirm] = useState([]);
  const [manuarr, setmanuarr] = useState([]);//Manufacturer
  const [cat, setCat] = useState([]);//All category 
  const [subCat, setSubCat] = useState([]);//all subcategory
  const routerHistory = useHistory();

  
  
 
  const styles = {
    fontSize: 14,
    color: 'blue',
    width: 200
  }
  // const andleChange = (event) => {
  //   event.persist();
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  // const handleChange1 = e => {
  //   setSelectedValue1(e.value);

  // }
  // const handleChange = e => {
  //   setSelectedValue1(e.value);

  // }

  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [ooptions1, setooptions] = useState([]);
  const [categoryid, setcategoryid] = useState();
  const [partyid, setpartyid] = useState('');
  const [fileurl, setfileurl] = useState(''); //image upload
  const [srcfile, setsrcfile] = useState(""); // image upload
  const { user } = useAuth()
  let search = window.location.search;
  let params = new URLSearchParams(search);
  // const foo = parseInt(params.get('id'));

  const handleFileSelect1 = (event, f) => {
    let files = event.target.files[0];
    const filename = URL.createObjectURL(event.target.files[0]);
    // console.log(filename);
    setfileurl(filename);
    setsrcfile(files)







  };

  const { id } = useParams();
const [data,setData] = useState([])

  useEffect(() => {


    url.get("mjrProductUpdate/" + id).then(({ data }) => {
      if (isAlive) setUserList(data);

      setData(data?.uom)

      setdescription(data.product[0].description)
      setUpimg(data.product[0].file)
      setname_in_ar(data.product[0].name_in_ar)
      setunit_of_measure(data.product[0].unit_of_measure)
      // setunit_Price(data.product[0].unit_price)
      setcategoryid(data.product[0].category_id)
      // setreal_price(data.product[0].real_price)
      setproduct(data.product[0].name)
      setCat(data?.getAllCat?.filter(obj => obj.div_id == localStorage.getItem('division')));
      // setmrp(data.product[0].mrp)
      setselectedOption(data.product[0].category_name)
      setselectedOption1(data.product[0].category_id)
      setmanid(data.product[0].manufacturer_id)
      setmodelno(data.product[0].modelno)
      setbname(data.product[0]?.brand_name)
      setecapacity(data.product[0]?.ecapacity)
      sethsn(data.product[0].hsn_code)
      setptype(data.product[0].type)
      setiq(data.product[0].initial_quantity)
      setmq(data.product[0].minimum_quantity)
      // setvendors(data.product[0].id)
      setpartyid(data.product[0].id)
      setpartyid(data.product[0].party_id)
      setmodelno(data.product[0].model_no)
      setooptions(data.product_in_category);
      setmanuarr(data.manufacture.filter(obj => obj.div_id == localStorage.getItem('division')))

    });
    // url.get("products/" + id).then(({ data }) => {
    //   if (isAlive) setUserList(data);

    //   setdescription(data.product[0].description)
    //   setname_in_ar(data.product[0].name_in_ar)
    //   setunit_of_measure(data.product[0].unit_of_measure)
    //   // setunit_Price(data.product[0].unit_price)
    //   setcategoryid(data.product[0].category_id)
    //   // setreal_price(data.product[0].real_price)
    //   setproduct(data.product[0].name)
    //   // setmrp(data.product[0].mrp)
    //   setselectedOption(data.product[0].category_name)
    //   setselectedOption1(data.product[0].category_id)
    //   setmanid(data.product[0].manufacturer_id)
    //   setmodelno(data.product[0].modelno)
    //   sethsn(data.product[0].hsn_code)
    //   setptype(data.product[0].type)
    //   setiq(data.product[0].initial_quantity)
    //   setmq(data.product[0].minimum_quantity)
    //   // setvendors(data.product[0].id)
    //   setpartyid(data.product[0].id)
    //   setpartyid(data.product[0].party_id)
    //   setmodelno(data.product[0].model_no)

    // });
    // url.get("products-in-category").then(({ data }) => {
    //   setooptions(data);

    // });

    // url.get("getAllCat").then(({ data }) => {
    //   setCat(data.filter(obj => obj.div_id == localStorage.getItem('division')));
    // });




    // url.get(url + "parties-vendor").then(({ data }) => {

    //   setfirm(data)


    // });
    // url.get("manufacturer").then(({ data }) => {

    //   setmanuarr(data.filter(obj => obj.div_id == localStorage.getItem('division')))


    // });
    return () => setIsAlive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //Save the data
  const submitValue = () => {



    let formData = new FormData()
    // formData.append('party_id', vendors)
    formData.append('id', id)
    formData.append('name', product ? (product) : '')
    formData.append('description', description ? (description) : '')
    formData.append('unit_of_measure', unit_of_measure)
    formData.append('division_id', selectedValue)
    formData.append('type', ptype)
    formData.append('hsn_code', hsn)
    formData.append('initial_quantity', iq)
    formData.append('minimum_quantity', mq)
    formData.append('category_id', selectedOption1)
    formData.append('model_no', modelno)
    formData.append('manufacturer_id', manid)
    formData.append('div_id', localStorage.getItem('division'))
    formData.append('user_id', user.id)
    formData.append('file', srcfile)
    formData.append('brand_name', bname)
    formData.append('ecapacity', ecapacity)
    formData.append('name_in_ar', product)

 


    // const frmdetails = {
    //   // party_id: vendors,
    //   name:  product ? (product) : '',
    //   description: description ? (description) : '',
    //   // unit_price: 0,
    //   unit_of_measure: unit_of_measure,
    //   category_id: selectedOption1,
    //   division_id: selectedValue,
    //   type: ptype,
    //   hsn_code: hsn,
    //   initial_quantity: iq,
    //   minimum_quantity: mq,
    //   manufacturer_id: manid,
    //   model_no: modelno,
    //   name_in_ar: product,
    //   div_id: localStorage.getItem('division'),
    //   user_id: user.id,
    //   file:srcfile,
    //   brand_name:bname,
    //   ecapacity:ecapacity,

    // }


    

    url.post("product-update/" + id, formData)
      .then(function (response) {

        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        })
          .then((result) => {
            selectedOption1 ?
              routerHistory.push(navigatePath + `/singleproduct/${id}`)
              :
              routerHistory.push(navigatePath + `/product/viewsubcategory`)
          })
      })
      .catch(function (error) {

      })


  }

  // function Increment(e) {
  //   setState({ description });
  // }

  // function handleChanges(evt) {
  //   const value = evt.target.value;
  //   setpartyid(value);
  //   setvendors(value)
  // }
  // const options = ooptions1.map((guest, index) => {
  //   return {
  //     label: guest.name,
  //     value: guest.id,
  //     key: index
  //   }
  // })
  // const company = firm.map((guest, index) => {
  //   return {
  //     label: guest.firm_name,
  //     value: guest.id,
  //     key: index
  //   }
  // })

  // Choose the Category
  const handleChange3 = (e) => {
    const subC = cat.filter(obj => obj.parent_id == e.target.value);

    setSubCat(subC);

  }

  //Choose Sub Category 
  const handleChange4 = (e) => {
    setselectedOption1(e.target.value);

  }

  // Create the new key value pair from the Manufacture
  const manufacture = manuarr.map((guest, index) => {
    return {
      label: guest.name,
      value: guest.id,
      key: index
    }
  })


  // const {
  //   username,
  //   firstName,
  //   creditCard,
  //   mobile,
  //   password,
  //   confirmPassword,
  //   gender,
  //   date,
  //   email,
  //   Firm_Name,
  //   optionss,
  // } = state;

  return (

    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "PRODUCT CATEGORY", path: "/product/viewsubcategory" },
            { name: "UPDATE PRODUCT" }
          ]}
        />
      </div>

      <Card className="p-4">
        <ValidatorForm onSubmit={submitValue} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <h6>UPDATE PRODUCT DETAILS</h6>
              <TextValidator
                className="mb-4 mt-2 w-full"
                label="Product Name"
                variant="outlined"
                size="small"
                value={product}
                onChange={e => setproduct(e.target.value)}
                type="text"
                name="product"
                inputProps={{ style: { textTransform: 'capitalize' } }}

              />
              <TextValidator
                className="mb-4 w-full"
                label="اسم المنتج"
                variant="outlined"
                size="small"

                value={name_in_ar}
                onChange={e => setname_in_ar(e.target.value)}
                type="text"
                name="product"
              

              />
              <TextValidator
                className="mb-4 w-full"
                label="Description"
                type="text"
                size="small"
                multiline
                value={description}
                onChange={e => setdescription(e.target.value)}
                name="description"
                variant="outlined"
                inputProps={{ style: { textTransform: 'capitalize' } }}
              
              />
              

              <div className="flex mb-4">
                <div style={{ width: '300px' }} className="mr-2">
                <InputLabel htmlFor="UOM" style={{ fontSize: 10 }}>UOM</InputLabel>
                <TextValidator
                className="mb-4 w-full"
                // label="UOM"
                size="small"
                select
                value={unit_of_measure}
                name="uom"
                variant="outlined"
                onChange={e => setunit_of_measure(e.target.value)}
                inputProps={{ style: { textTransform: 'capitalize' } }}
              
              >
                <MenuItem value="">Choose UOM</MenuItem>
                {data.map((i)=>{
                  return <MenuItem value={i.value}>{i.label}</MenuItem>
                })}
                </TextValidator>
                  {/* <InputLabel htmlFor="UOM" style={{ fontSize: 10 }}>UOM</InputLabel>
                  <Select
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'}
                    label="UOM"
                    name="UOM"
                    placeholder="Select Option"
                    value={data.find(obj => obj.value === unit_of_measure)} // set selected value
                    options={data

                    }
                    onChange={e => setunit_of_measure(e.value)
                    }
                  /> */}
                </div>
                <div style={{ width: '350px' }} className="ml-2">
                  <InputLabel style={{ fontSize: 10 }}>Manufacture</InputLabel>
                  <Select

                    name="Manufacture"
                    menuPortalTarget={document.body}
                    size="small"
                    fullWidth
                    InputLabel="Manufacture"
                    onChange={e => setmanid(e.value)
                    }
                    variant="contained"
                    value={manufacture.find(obj => obj.value === manid)}
                    options={manufacture}
                  />
                </div>

              </div>
              {localStorage.getItem('division') == 5 ? <>
              <TextValidator
                className="mb-4 w-full"
                label="Brand Name"
                variant="outlined"
                size="small"
                value={bname}
                inputProps={{ style: { textTransform: 'uppercase' } }}
                onChange={e => setbname(e.target.value)}
                type="text"
                name="bname"
                required

              />
              </> : ""}

            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>

              <div className="flex mb-4 mt-8">
                <TextField
                  className="mr-2"
                  variant="outlined"
                  label="Product Type"
                  size="small"
                  value={ptype}
                  fullWidth
                  onChange={e => setptype(e.target.value)}
                  select
                >
                  {product_type.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>


                <TextField
                  className="ml-2"
                  label="HSN number"
                  size="small"
                  variant="outlined"
                  onChange={e => sethsn(e.target.value)}
                  type="text"
                  name="hsn"
                  value={hsn}
                  fullWidth
                
                />
                
              </div>


              <div className="flex mb-4">
                <TextField
                  className="mr-2"
                  label="Initial quantity"
                  variant="outlined"
                  onChange={e => setiq(e.target.value)}
                  value={iq}
                  size="small"
                  type='number'
                  fullWidth
                  validators={[
                    "isNumber",
                  ]}
                  errorMessages={["Invalid Number"]}
              
                />
                <TextField
                  className="ml-2"
                  fullWidth
                  label="Minimum Quantity"
                  variant="outlined"
                  value={mq}
                  size="small"
                  type='number'
                  onChange={e => setmq(e.target.value)}
                  validators={[
                    "isNumber",
                  ]}
                  errorMessages={["Invalid Number"]}
               
                />
              </div>

              
             
              <div className="flex mb-4">
                {selectedOption == null ? <TextField
                  className="mr-2"
                  label="Category"
                  variant="outlined"
                  select
                  onChange={handleChange3}
                  fullWidth
                  size="small"
                >
                  <MenuItem>Choose Category</MenuItem>
                  {cat.filter(obj => obj.parent_id == null).map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                    )
                  })}
                </TextField> :
                  <TextField
                    className="mr-2"
                    label="Sub Category"
                    variant="outlined"
                    onChange={e => setselectedOption(e.value)
                    }
                    value={selectedOption}
                    fullWidth
                    size="small"
                    readonly
                  >

                  </TextField>}


                {subCat.length > 0 && (< TextField
                  className="mr-2"
                  label="Sub Category"
                  variant="outlined"
                  select
                  onChange={handleChange4}
                  fullWidth
                  size="small"
                >
                  <MenuItem>Choose Sub Category</MenuItem>
                  {subCat.filter(obj => obj.parent_id !== null).map((item, i) => {
                    return (
                      <MenuItem value={item.id} key={i}>{item.name}</MenuItem>
                    )
                  })}
                </TextField>)}


               
                <TextField
                  className="ml-2"
                  label="Model number"
                  size="small"
                  variant="outlined"
                  onChange={e => setmodelno(e.target.value)}
                  type="text"
                  name="hsn"
                  value={modelno}
                  fullWidth
                
                />
              </div>
              {localStorage.getItem('division') == 5 ? <>
              <TextValidator
                className="mb-4 w-full"
                label="Capacity"
                variant="outlined"
                size="small"
                value={ecapacity}
                inputProps={{ style: { textTransform: 'capitalize' } }}
                onChange={e => setecapacity(e.target.value)}
                type="text"
                name="ecapacity"
                required

              />
              </> : ""}
              <div className="flex mb-4">


              </div>


            </Grid>
          </Grid>
          {localStorage.getItem('division') == 5 ? <>
          <label htmlFor="upload-multiple-file">
          <Button
                    className=""
                    color="primary"
                    component="span"
                    variant="contained"
                  >
                    <div className="flex items-center">
                      <Icon className="pr-8">cloud_upload</Icon>
                      <span>Upload File</span>
                    </div>
                  </Button>
                </label>

                <input
                  className="hidden"
                  onChange={(e) => handleFileSelect1(e)}
                  id="upload-multiple-file"
                  type="file"
                  multiple
                />
                {fileurl ? <img
                  width="50px"
                  height="50px"
                  // className={classes.media}
                  src={fileurl}
                /> : <img
                  width="50px"
                  height="50px"
                  // className={classes.media}
                  src={"https://www.amacoerp.com/test/amaco_test/public/"+upimg}
                  alt="Please upload image"
                /> }
                </> : ""}
          <div className="flex mb-4">
            <Button color="primary" className="mr-4 py-2" variant="outlined" type="submit">
              <Icon>save</Icon>
              <span className="pl-2 capitalize">SAVE</span>
            </Button>
            <Button className="mr-4 py-2" color="secondary" variant="outlined" type="submit" onClick={() => routerHistory.push(`/singleproduct/${id}`)}>
              <Icon>cancel</Icon>
              <span className="pl-2 capitalize">CANCEL</span>
            </Button>
          </div>

        </ValidatorForm>
      </Card>


    </div>

  );
};

export default SimpleForm;
