import React, { useEffect, useState } from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    TableRow,
    Button
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import url from "../invoice/InvoiceService"

export default function LoginLog() {


    const [logData, setLogData] = useState([]);
    const [isAlive, setIsAlive] = useState(true);

    const columnStyleWithWidthSno = {
        top: "0px",
        left: "0px",
        zIndex: "50",
        position: "sticky",
        backgroundColor: "#fff",
        width: "50px",
        textAlign: "center"
    }

    const columns = [
        {
            name: "id",
            label: "S.No.",
            options: {
                customHeadRender: ({ index, ...column }) => {
                    return (
                        <TableCell key={index} align="center" style={{ width: 50 }}>
                            <span >S.NO.</span>
                        </TableCell>
                    )
                },
                setCellProps: () => ({
                    align: "left",

                })
            }
        },
        {
            name: "name",
            label: "NAME",
            options: {
                filter: true,
            }
        },
        {
            name: "type",
            label: "DATE AND TIME",
            options: {
                filter: true,
            }
        },
        {
            name: "type",
            label: "TYPE",
            options: {
                filter: true,
            }
        },

    ];

    useEffect(() => {
        url.get("userActivityLogin").then(({ data }) => {
            setLogData(data);

        });
        setIsAlive(false);
    }, [isAlive])


    return (
        <div>
            <MUIDataTable
                title={"LOGIN LOGOUT LOGS"}
                data={logData.map((item, index) => {


                    return [

                        ++index,
                        item.name,
                        item.time,
                        item.type,
                        item.id,
                    ]

                })}
                columns={columns}
                options={{
                    filterType: "textField",
                    responsive: "simple",
                    selectableRows: "none",
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
        </div>
    )
}
