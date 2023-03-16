import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import {
  Button,
  Card,
  Divider,
  Icon,
  Table,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
  TableRow,
  Tooltip
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "matx";
import url from "../../invoice/InvoiceService";
import ProductPrice from "./ProductPrice";
import FormDialog from "./ProductPrice";
import history from "history.js";

const ProductPriceList = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get('id'));
  
  var i = 1;
  const [productprice, setproductprice] = useState([]);
  const [userList, setUserList] = useState([]);
  const [bankdetails, setbankdetails] = useState([]);
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [contact1, setcontact1] = useState('');
  const [contact2, setcontact2] = useState('');
  const [catid, setcatid] = useState(foo);
  const [designation, setdesignation] = useState('');
  const [status, setstatus] = useState('');
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState('');
  const setupdateprice = (id) => {
    setstatus(id)
    setShouldOpenEditorDialog(id);

  };

  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);

  const handleDialogClose = () => {
    setstatus('');
    setShouldOpenEditorDialog(false);

  };

  const handleDeleteUser = (user) => {

    setShouldOpenConfirmationDialog(true);
    
  };

  useEffect(() => {


    url.get("products/" + foo).then(({ data }) => {
      setproductprice(data.prices);
      
     
    });

  }, []);
  const removeData = (id) => {
   
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Product Price!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`product-price/${id}`)
    .then(res => {
        
        Swal.fire(
          'Deleted!',
          'Product Price has been deleted.',
          'success'
        )
        getData();
        
    })
  
    
    
        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Product Price is safe :)',
          'error'
        )
      }
    })
    
}
const getData = () => {
  url.get("products/" + foo).then(({ data }) => {
    setproductprice(data.prices);
    
  });
}
const columns = [
  {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
         
          filter: true,
          customHeadRender: ({index, ...column}) =>{
            return (
              <TableCell key={index} width={50}>  
                <span style={{marginLeft:15}}>S.No.</span> 
              </TableCell>
            )
         },
      },
  },
  {
    name: "id", // field name in the row object
    label: "Party Name", // column title that will be shown in table
    options: {
       
        filter: true,
    },
},
{
  name: "id", // field name in the row object
  label: "Price", // column title that will be shown in table
  options: {
     
      filter: true,
  },
},
{
  name: "id", // field name in the row object
  label: "Action", // column title that will be shown in table
  options: {
    filter: true,
    customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <span>
        
        <IconButton>
                  <Tooltip title="Delete contact details">
                    <Icon color="error" onClick={() => removeData(tableMeta.rowData[3])
                      }
                    >delete</Icon>
                  </Tooltip>
                  </IconButton>
        </span>
        
        )
        
    },
},
},
]
  return (
    <div>
    <Card elevation={3}>
      
    
          





          <div className="flex flex-wrap justify-between pt-2 m-2"> 
    <h5 className="pt-2">Price List</h5>
      <div className="text-right">
                
      <Button
            className="pl-4 py-2"
            color="primary"
            variant="outlined"
            onClick={() => {
              setShouldOpenEditorDialog(true);
            }}
          >
          <Icon>add</Icon>
          Add New
          </Button>
         
          </div>
          
          </div>
      <Divider />
      {/* <Table >
        <TableHead>
          <TableRow>
            <TableCell className="pl-0" align="center">S.No.</TableCell>
            <TableCell className="px-0">Party Name</TableCell>
            <TableCell className="px-0">Price</TableCell>
            <TableCell className="px-0">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productprice.map((item, index) => {
           
            return (
              <TableRow key={index}>
                <TableCell className="pl-0" align="center">{i++}</TableCell>

                <TableCell className="pl-0">{item.firm_name}</TableCell>

                <TableCell className="pl-0">{parseFloat(item.price).toLocaleString(undefined, {minimumFractionDigits:2})}</TableCell>

                <TableCell className="pl-0">
                  

                  <IconButton>
                  <Tooltip title="Delete contact details">
                    <Icon color="error" onClick={() => removeData(item.id)
                      }
                    >delete</Icon>
                  </Tooltip>
                  </IconButton>
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
      
      <MUIDataTable
               
                data={
                 
                  productprice.map((item, index) => {
                    
                   
                      return [
          
                        ++index,
                        item.firm_name,
                        parseFloat(item.price).toLocaleString(undefined, {minimumFractionDigits:2}),
                        item.id,
                      ]
                    
                  })
                  
                }
                columns={columns}
                options={{
                    filterType: "textField",
                    textLabels: {
                    body: {
                        noMatch: 'Sorry, no records found',
                        }
                      },
                    responsive: "simple",
                    selectableRows: "none",
                   
                     
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
      <div>
        {shouldOpenEditorDialog && (
          <ProductPrice
            handleClose={handleDialogClose}
            contactid={status}
            open={shouldOpenEditorDialog}
            catid={catid}
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
    </Card>
    
     
      </div>
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

export default ProductPriceList;
