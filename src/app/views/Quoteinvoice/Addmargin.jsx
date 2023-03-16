import React, { useState, useEffect } from "react";
import {
  Dialog,
  Tooltip
} from "@material-ui/core";
import { useHistory } from 'react-router';


import { ValidatorForm } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import Swal from "sweetalert2";
import url, { getcategories } from "../invoice/InvoiceService"

const MemberEditorDialog = ({ uid, open, handleClose, productid, margin, pprice, marginprice, calcualteprice, productname }) => {
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
  const [cname, setcname] = useState('');
  const [cdescription, setcdescription] = useState('');
  const [arr, setarr] = useState([]);
  const [marginList, setmarginList] = useState([]);
  const [isAlive, setIsAlive] = useState(true);


  const routerHistory = useHistory();

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");



  const handleFormSubmit = () => {

    const frmdetails = {

      name: cname,
      description: cdescription


    }


    url.post('categories', frmdetails)
      .then(function (response) {
        Swal.fire({
          title: 'Success',
          type: 'success',
          icon: 'success',
          text: 'Data saved successfully.',
        });
        getcategories()
        routerHistory.push('/product/viewproduct');
      })
      .catch(function (error) {

      })
    setcdescription('')
    setcname('')


  };
  const setmargin = (m, p, s) => {

    calcualteprice(p, m)
    handleClose()

  }

  useEffect(() => {

    url.get(`product-quotation-detail/${productid}`).then(({ data }) => {
      if (isAlive) setmarginList(data);


    });

  }, [])

  const columns = [
    {
      name: "firm_name", // field name in the row object
      label: "Company Name", // column title that will be shown in table
      options: {
        filter: true,
      },
    },
    {
      name: "purchase_price",
      label: "Purchase Price",
      options: {
        filter: true,
      },
    },
    {
      name: "margin",
      label: "Margin",
      options: {
        filter: true,
      },
    },
    {
      name: "sellprice",
      label: "Sell Price",
      options: {
        filter: true,
      },
    },
    {
      name: "id",
      label: "Select",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {


          return (
            <Tooltip title="Select">
              <Icon color="primary" onClick={() => setmargin(tableMeta.rowData[2], tableMeta.rowData[1], tableMeta.rowData[3])
              }>check_circle</Icon>
            </Tooltip>



          )

        },
      },
    },
  ];


  return (
    <Dialog onClose={handleClose} open={open} className="px-6 pt-2 pb-4" style={{ zIndex: 1000 }} fullWidth={fullWidth}
      maxWidth={maxWidth}>
      <div className="p-6"  >
        <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off">


          <div className="flex justify-end">



            <Icon onClick={() => handleClose()} style={{ cursor: 'pointer' }}>close</Icon>

          </div>

        </ValidatorForm>

        {isAlive && (
          <MUIDataTable
            title={`Quotation Reference For ${productname}`}
            columns={columns}
            data={marginList}
            options={{
              filterType: "textField",
              responsive: "simple",
              selectableRows: "none", // set checkbox for each row
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
          />
        )}
      </div>
    </Dialog>

  );
};

export default MemberEditorDialog;
