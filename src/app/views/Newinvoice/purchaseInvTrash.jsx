import React from 'react'
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {
  Icon,
  TableCell,Tooltip,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { basePath } from "../invoice/InvoiceService";
import url, { navigatePath } from "../invoice/InvoiceService";


export default function ({podetails,load}) {
  
  const columns = [
    {
      name: "index", // field name in the row object
      label: "S.NO.", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: 80 }}>
              <span className="pl-2">S.NO.</span>
            </TableCell>
          );
        },
      },
    },
    {
      name: "id", // field name in the row object
      label: "PO NUMBER", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              align="center"
              style={{ width: 140, maxWidth: 140 }}
            >
              <span className="pl-2">PO NUMBER</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: "break",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      label: "INVOICE NUMBER", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              align="center"
              style={{ width: 140, maxWidth: 140 }}
            >
              <span className="pl-2">INVOICE NUMBER</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: "break",
        }),
      },
    },
    {
      name: "firm_name",
      label: "COMPANY NAME",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              align="center"
              key={index}
              // className={classes.columnStyleWithWidth}
              inputProps={{ style: { textTransform: "capitalize" } }}
            >
              <span>COMPANY NAME</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: "break",
        }),
      },
    },
    {
      name: "firm_name",
      label: "ISSUE DATE",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              align="center"
              style={{ width: 150, maxWidth: 150 }}
              inputProps={{ style: { textTransform: "capitalize" } }}
            >
              <span>ISSUE DATE</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
          // width:600,
          wordWrap: "break",
        }),
      },
    },
    // {
    //   name: "issue_date",
    //   label: "ISSUE DATE",
    //   options: {
    //     filter: true,

    //   },
    // },
    {
      name: "id",
      label: "AMOUNT",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              className="pr-2"
              style={{ textAlign: "right" }}
            >
              <span textAlign="right">AMOUNT</span>
            </TableCell>
          );
        },

        setCellProps: () => ({
          align: "right",
          // paddingLeft:24
        }),
      },
    },
    // {
    //   name: "status",
    //   label: "STATUS",
    //   options: {
    //     filter: true,
    //   },
    // },

    //   {
    //     name: "id",
    //     label: "Action",
    //     options: {
    //         filter: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //
    //             return (
    //             <IconButton onClick={() => removeData(tableMeta.rowData[4])
    //             }
    //             >
    //                     <Icon>close</Icon>
    //             </IconButton>

    //             )

    //         },
    //     },
    // },
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              style={{ textAlign: "right" }}
              className="pr-8"
            >
              <span style={{ marginLeft: 18 }}>ACTION</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ textAlign: "right" }} className="pr-8">
              <Link to={navigatePath + "/piview/" + tableMeta.rowData[7]+"/true"}>
                <Tooltip title="view more">
                  <Icon color="primary">remove_red_eye</Icon>
                </Tooltip>
              </Link>
              {/* <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
            <IconButton>
              <Icon color="secondary">find_in_page</Icon>
            </IconButton>
          </Link> */}
            </div>
          );
        },
      },
    },
    {
      name: "",
      label: "Action",
      options: {
        filter: true,
        display: false,
      },
    },
  ];
  return (

    <div>
           <MUIDataTable
                    title={"PURCHASE INVOICE"}
                    data={podetails.filter(obj => obj.div_id == localStorage.getItem('division')).map((item, index) => {
                        return [
                            ++index,
                            item?.po_number ? item?.po_number : "--",
                            item?.invoice_no ? (item?.invoice_no!=="true"?item?.invoice_no:"--") : "--",

                            item?.party?.firm_name,

                            moment(item?.issue_date).format('DD MMM YYYY'),
                            parseFloat(item?.grand_total).toLocaleString(undefined, { minimumFractionDigits: 2 }),

                            item?.status,
                            item?.id
                            // moment(item.created_at).format('DD-MM-YYYY'),
                            // (parseFloat(item.net_amount)).toFixed(2),
                            // item.id
                        ]

                    })}
                    columns={columns}
                    options={{
                        // filterType: "textField",
                        // responsive: "simple",
                        // selectableRows: "none", // set checkbox for each row
                        // search: false, // set search option
                        // filter: false, // set data filter option
                        // download: false, // set download option
                        // print: false, // set print option
                        // pagination: true, //set pagination option
                        // viewColumns: false, // set column option
                        // elevation: 0,
                        textLabels: {
                    body: {
                      noMatch: load ? "Data Loading..." : "Sorry, no records found",
                        }
                      },
                        rowsPerPageOptions: [10, 20, 40, 80, 100],
                        selectableRows: "none",
                        filterType: "dropdown",
                        // responsive: "scrollMaxHeight",
                        rowsPerPage: 10,
                        onSearchClose: e => {
                          localStorage.removeItem("search");
                          localStorage.removeItem("page");
                        },
                        searchProps: {
                            onKeyUp:(e) => {
                              localStorage.setItem('search',e.target.value);
                              localStorage.setItem('page','purchaseinvoice');
                            }
                          },
                        searchText: localStorage.getItem('search') && localStorage.getItem('search') ,
                        
              

                    }}
                />
    </div>
  )
}
