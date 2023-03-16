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

export default function ActivityLog({ logData }) {


    const [loggData, setLogData] = useState([]);
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
                    align: "center",

                })
            }
        },
        {
            name: "name",
            label: "ACTIVITY",
            options: {
                filter: true,
            }
        },


    ];

    useEffect(() => {
        // url.get("activityLogs").then(({ data }) => {
        setLogData(logData);
        // });
        setIsAlive(false);
    }, [isAlive])


    return (
        <div>
            <MUIDataTable
                title={"ACTIVITY LOGS"}
                data={loggData.map((item, index) => {


                    return [

                        ++index,
                        item.log,

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
