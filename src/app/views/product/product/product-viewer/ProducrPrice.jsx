import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import {
  Button,
  Card,
  Divider,
  Icon,
  TableCell,
  IconButton,
  Tooltip
} from "@material-ui/core";
import url from "../../../invoice/InvoiceService"
import MemberEditorDialog from "../../productprice"
import { useParams } from "react-router-dom";

const ProductPrice = () => {
  const { id } = useParams();

  var i = 1;
  const [productprice, setproductprice] = useState([]);
  const [catid, setcatid] = useState(id);
  const [status, setstatus] = useState('');
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState('');
  const [isAlive, setIsAlive] = useState(true);

  

  const handleDialogClose = () => {
    setstatus('');
    setShouldOpenEditorDialog(false);

  };

  

  useEffect(() => {

    /* API GET product detatils */
    url.get("products/" + id).then(({ data }) => {
      setproductprice(data.prices);//set the product price


    });
    setIsAlive(false)

  }, [isAlive]);

/* Delete the product */
  const removeData = (id) => {

  
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




       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Product Price is safe :)',
          'error'
        )
      }
    })

  }
  /* get the product Information */
  const getData = () => {
    /*API to GET the product List */
    url.get("products/" + id).then(({ data }) => {
      setproductprice(data.prices);//Set the product Price

    });
  }
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: 50, textAlign: "center" }}>
              <span >S.NO.</span>
            </TableCell>
          )
        },
      },
    },
    {
      name: "id", // field name in the row object
      label: "PARTY NAME", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ wordBreak: "break-word", textAlign: "center" }}>
              <span >PARTY NAME</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id", // field name in the row object
      label: "PRICE", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ wordBreak: "break-word", textAlign: "right" }} className="pr-2">
              <span >PRICE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "right"
        })
      },
    },
    {
      name: "id", // field name in the row object
      label: "Action", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "right" }}
              className="pr-8">
              <span style={{ marginLeft: 15 }}>ACTION</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ textAlign: "right" }}
              className="pr-8"
            >

              <IconButton>
                <Tooltip title="Delete contact details">
                  <Icon color="error" onClick={() => removeData(tableMeta.rowData[3])
                  }
                  >delete</Icon>
                </Tooltip>
              </IconButton>
            </div>

          )

        },
      },
    },
  ]
  return (
    <div>
      <Card elevation={3}>








        <div className="flex flex-wrap justify-between pt-2 m-2">
          <h5 className="pt-2">PRICE LIST</h5>
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
              ADD NEW
            </Button>

          </div>

        </div>
        <Divider />
        

        <MUIDataTable

          data={

            productprice.map((item, index) => {


              return [

                ++index,
                item.firm_name ? item.firm_name : '--',
                parseFloat(item.price).toLocaleString(undefined, { minimumFractionDigits: 2 }),
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
            <MemberEditorDialog
              handleClose={handleDialogClose}
              contactid={status}
              open={shouldOpenEditorDialog}
              catid={catid}
              fun={setIsAlive}
              productprice={setproductprice}
            />
          )}
         
        </div>
      </Card>


    </div>
  );
};



export default ProductPrice;
