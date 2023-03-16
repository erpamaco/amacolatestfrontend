import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Dialog,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Icon,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useCallback } from "react";
import url from "../invoice/InvoiceService";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";

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
const proList = [
  {
    name: "File",
    value: "file",
  },
  {
    name: "Date",
    value: "date",
  },
  {
    name: "Text",
    value: "text",
  },
];
const MemberEditorDialog1 = ({
  uid,
  open,
  designationList,
  handleClose,
  accounttype,
  catid,
  catname,
  setcat,
}) => {
  const [state, setState] = useState(initialValues);
  const [isAlive, setIsAlive] = useState(true);
  const [field, setfield] = useState([]);
  const { id } = useParams();
  const classes = useStyles();
  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    setState((state) => ({ ...state, id }));
  }, []);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const removeData = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this Field?",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        zIndex: 1000,
      },
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        url.delete(`columns/${id}`).then((res) => {
          getrow();

          Swal.fire("Deleted!", "Field has been deleted.", "success");
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          customClass: {
            zIndex: 1000,
          },
          title: "Cancelled",
        });
      }
    });
  };

  function getrow(e) {
    if (catid) {
      setIsAlive(false);
      url.get(`columns/${catid}`).then(function (response) {
        setfield(response.data[0].column);
      });
    }
  }

  const handleSubmit = () => {
    setState({ ...state, loading: true });

    let tempState = { ...state };
    delete tempState.loading;
    let tempItemList = [...state.item];
    tempItemList.account_category_id = catid;
    const json = Object.assign({}, tempItemList);
    url.post("columns", json).then(({ data }) => {
      Swal.fire({
        title: "Success",
        type: "success",
        icon: "success",
        text: "Data saved successfully.",
      });
      url.get("columns").then(({data})=>{

      })
      handleClose();
    });
  };
  const addItemToInvoiceList = () => {
    

    designationList.push({});
    setState({
      ...state,
      item: designationList,
    });
    
  };
  const handleIvoiceListChange = (event, index) => {
    event.persist();

    // let tempItemList = [...state.item];

    designationList.map((element, i) => {
      if (index === i) {
        element[event.target.name] = event.target.value;
      
      }
      return element;
    });

    setState({
      ...state,
      item: designationList,
    });
    // console.log(designationList)
  };

  const deleteItemFromInvoiceList = (index) => {
    
    let tempItemList = [...state.item];
    designationList.splice(index, 1);

    setState({
      ...state,
      item: designationList,
    });
  };

  useEffect(() => {
    url.get(`columns/${catid}`).then(({ data }) => {
      setfield(data[0].column);
    });
  }, [id, isAlive, generateRandomId]);
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={50}>
              <span style={{ marginLeft: 15 }}>S.No.</span>
            </TableCell>
          );
        },
      },
    },
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={350}>
              <span style={{ marginLeft: 15 }}>Name</span>
            </TableCell>
          );
        },
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log(tableMeta.rowData)
          return (
            <IconButton onClick={() => removeData(tableMeta.rowData[2])}>
              <Icon color="error">delete</Icon>
            </IconButton>
          );
        },
      },
    },
  ];

  let { item: fieldList = [], quote: quoteList = [] } = state;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className="px-6 pt-2 pb-4"
      style={{ zIndex: 1000 }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <div className="m-sm-30">
        <div className={clsx("invoice-viewer py-4", classes.invoiceEditor)}>
          <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
            <div className="viewer_actions px-4 flex justify-between"></div>

            <h4 className="mb-5">
              {catid && "Field For"} {catname}
            </h4>
            <Divider />
            <Table className="mb-4">
              <TableHead>
                <TableRow className="bg-default">
                  <TableCell
                    className="pl-sm-24"
                    style={{ width: 70 }}
                    align="left"
                  >
                    S.No.
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "200px" }}>
                   Name
                  </TableCell>
                  <TableCell className="px-0" style={{ width: "200px" }}>
                    Designation
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {designationList.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell
                        className="pl-sm-24 capitalize"
                        align="left"
                        style={{ width: 50 }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "200px" }}
                      >
                        <TextValidator
                          label="Name"
                          type="text"
                          name="name"
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={item.name}
                          onChange={(event) =>
                            handleIvoiceListChange(event, index)
                          }
                          selected
                        >
                         
                        </TextValidator>
                      </TableCell>

                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "80px" }}
                      >
                        <TextValidator
                          label="Name"
                          onChange={(event) =>
                            handleIvoiceListChange(event, index)
                          }
                          type="text"
                          variant="outlined"
                          size="small"
                          name="designation"
                          fullWidth
                          value={item.designation}
                        />
                      </TableCell>

                      <TableCell
                        className="pl-0 capitalize"
                        align="left"
                        style={{ width: "50px" }}
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
            <div className="flex justify-end px-4 mb-4">
              <Button
                className="mt-4"
                color="primary"
                variant="contained"
                size="small"
                onClick={addItemToInvoiceList}
              >
                <Icon>add</Icon> Add Item
              </Button>
            </div>

            <div className="flex">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleClose()}
                className="py-2 mr-4"
              >
                <Icon>save</Icon> SAVE
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                className="py-2 mr-4"
                onClick={() => handleClose()}
              >
                <Icon>cancel</Icon>CANCEL
              </Button>
              {/* <Button
                variant="outlined"
                color="primary"
                className="py-2 mr-4"
                onClick={() => getrow()}
              >
                <Icon>remove_red_eye</Icon>VIEW
              </Button> */}
            </div>
          </ValidatorForm>

          {!isAlive && (
            <MUIDataTable
              columns={columns}
              data={field.map((item, index) => {
                // console.log(item)
                return [++index, item.name,  item.id];
              })}
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
      </div>
    </Dialog>
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

export default MemberEditorDialog1;
