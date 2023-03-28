import React, { useState, useEffect } from "react";
import {
    Dialog,
    Button,
    MenuItem,
    TextField,
    Tooltip,
    TableCell,
    IconButton,

} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Icon } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import url from "./InvoiceService";
import useAuth from '../../hooks/useAuth';

const prefixs = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Ms', label: 'Ms' }
];
const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "50px",
    wordBreak: "break-word",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    hyphens: "auto"
  }
const MemberEditorDialog = ({ open, handleClose, setData,setIsAlive }) => {
    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    // const foo =parseInt(params.get('id'));
    const [loading, setloading] = useState(false);


    const [isAlive2, setIsAlive2] = useState(true);
    // const [isAlive, setIsAlive] = useState(true);



    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const { user } = useAuth();
    const [state, setState] = useState([])
    const [data2, setData2] = useState([])

    function getrow() {
        /*List out the category List */
            
        
        url.get(`mjrQuoteInc/${localStorage.getItem('division')}`).then(({ data }) => {
            setData2(data?.uom);
            setIsAlive2(!isAlive2)
              });
           
        
             
            // return () => setIsAlive(false);
          }



          const columns = [
            {
              name: "label", // field name in the row object
              label: "LABEL", // column title that will be shown in table
              options: {
                filter: true,
              },
            },
            
            {
              name: "id",
              label: "Action",
              options: {
                // filter: true,
                customHeadRender: ({ index, ...column }) => {
                  return (
        
                    <TableCell key={index} style={{ textAlign: "right" }}>
                      <span style={{ paddingLeft: 15 }}>ACTION</span>
                    </TableCell>
        
                  )
        
                },
                customBodyRender: (value, tableMeta, updateValue) => {
        
        
                  return (
                    <div
                      style={{
                        textAlign: "right"
                      }}
                    // className="pr-8"
                    >
                      <IconButton onClick={() => removeData(tableMeta.rowData[1])
                      } style={{ columnStyleWithWidth1 }}
                      >
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </div>
        
        
                  )
        
                },
              },
            },
          ];
    const handleFormSubmit = () => {
        setloading(true)

        url.post(`uom`, state)
            .then((response) => {
                setData(response.data)
                Swal.fire({
                    title: 'Success',
                    type: 'success',
                    icon: 'success',
                    text: 'Data saved successfully.',
                })
                    .then((result) => {

                        handleClose()
                    })

            })
            .catch(function (error) {
                Swal.fire({
                    title: "Error",
                    type: "error",
                    icon: "warning",
                    text: "Something Went Wrong.",
                }).then((result) => {
                    setloading(false)
                });
            })

    };

    const removeData = (id) => {

        // setloading(true)

        url.delete(`uom/${id}`)
            .then((response) => {
                // setData2(response.data)
                // console.log(response)
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    icon: 'warning',
                    text: 'UOM deleted successfully.',
                })
                    .then((result) => {

                        // handleClose()
                    })

            })
            .catch(function (error) {
                Swal.fire({
                    title: "Error",
                    type: "error",
                    icon: "warning",
                    text: "Something Went Wrong.",
                }).then((result) => {
                    // setloading(false)
                });
            })
    
      }

    const handleChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {

    }, [])




    return (
        <Dialog onClose={handleClose} open={open} style={{ zIndex: 1000 }} maxWidth={maxWidth} fullWidth={fullWidth}>
            <div className="p-6">
                <h4 className="mb-5">UNIT OF MEASURE</h4>
                <ValidatorForm onSubmit={handleFormSubmit} autoComplete="off" inputProps={{ style: { textTransform: 'capitalize' } }}>
                    <div>
                        <TextField
                            className="w-full mb-4"
                            autoComplete="none"
                            label="Lable"
                            variant="outlined"
                            name="label"
                            onChange={(e) => { handleChange(e) }}
                            // value={prefix}
                            size="small"
                        />
                        <TextField
                            className="w-full mb-4"
                            autoComplete="none"
                            label="Value"
                            variant="outlined"
                            name="value"
                            onChange={(e) => { handleChange(e) }}
                            // value={prefix}
                            size="small"
                        />

                    </div>









                    <div className="flex  items-center">
                        <Button variant="outlined" className="mr-4 py-2" color="primary" type="submit" disabled={loading}>
                            <Icon>save</Icon>SAVE
                        </Button>
                        <Button
                            variant="outlined"
                            className="mr-4 py-2"
                            color="secondary"
                            onClick={() => handleClose()}
                        >
                            <Icon>cancel</Icon> CANCEL
                        </Button>
                        {isAlive2 && <Tooltip title="view">
              <Icon color="primary" align="right" style={{ position: 'absolute', right: 50 }} onClick={() => getrow()}>expand_more</Icon>

            </Tooltip>}
            {!isAlive2 && <Tooltip title="view">
              <Icon color="primary" align="right" style={{ position: 'absolute', right: 50 }} onClick={() => getrow()}>expand_less</Icon>

            </Tooltip>}

                        <div className="flex justify-between items-center">


                        </div>
                    </div>
                </ValidatorForm>
                    {!isAlive2 &&
          <MUIDataTable
            title={"CATEGORY"}
            columns={columns}
            data={data2}

            options={{
              filterType: "textField",
              responsive: "simple",
              selectableRows: "none", // set checkbox for each row
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
            }}
          />
        }
       

            </div>
        </Dialog>
    );
};

export default MemberEditorDialog;
