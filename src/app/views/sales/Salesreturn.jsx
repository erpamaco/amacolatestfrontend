import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Axios from "axios";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import url from "../invoice/InvoiceService"
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    TableRow
} from "@material-ui/core";
const handleChange = event => {
    alert('ffdf')
};

const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        url.get("products").then(({ data }) => {
            if (isAlive) setUserList(data);
        });
        return () => setIsAlive(false);
    }, [isAlive]);
    const deleteeployee = (id) => {  
            debugger;  
          
           
          }; 
   

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Addnew", path: "/product/Viewproduct" },
                        { name: "Product" },
                    ]}
                />
            </div>
            
            <MUIDataTable
                title={"User Report"}
                data={userList}
                columns={columns}
                options={{
                    filterType: "textField",
                    textLabels: {
                    body: {
                        noMatch: 'Sorry, no records found',
                        }
                      },
                    responsive: "simple",
                    selectableRows: "none", // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </div>
    );
};

const columns = [
    {
        name: "id", // field name in the row object
        label: "Name", // column title that will be shown in table
        options: {
            filter: true,
        },
    },
    {
        name: "description",
        label: "Description",
        options: {
            filter: true,
        },
    },
    {
        name: "unit_of_measure",
        label: "unit_of_measure",
        options: {
            filter: true,
        },
    },
    {
        name: "unit_",
        label: "unit_of_measure",
        options: {
            filter: true,
        },
    },
    {
        name: "Balance",
        label: "Balance",
        options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                 
                return (
                <IconButton onClick={this.deleteeployee(tableMeta.rowIndex)}>
                        delete
                </IconButton>
                )
            },
        },
    },
];

export default SimpleMuiTable;
