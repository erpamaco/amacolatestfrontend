import React from "react";
import MUIDataTable from "mui-datatables";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,Icon,Tooltip,
  IconButton,
  TableRow,
  Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import url, { navigatePath } from "../../../invoice/InvoiceService";


export default function PReturn({podetails}) {
  const columnStyleWithWidth = {
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "100px",
    wordBreak: "break-all",
    textAlign: "center",
  };
  const columnStyleWithWidth1 = {
    top: "0px",
    left: "0px",
    zIndex: "100",
    position: "sticky",
    backgroundColor: "#fff",
    width: "480px",
    wordBreak: "break-all",
    textAlign: "center",
  };

  const columns = [
    {
      name: "index", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth}>
              <span>S.NO.</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      label: "PR NUMBER", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span>DEBITNOTE NUMBER</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "fname", // field name in the row object
      label: "Company Name", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidth1}>
              <span style={{ marginLeft: 18 }}>VENDOR NAME</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "name",
      label: "CREATED DATE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span>CREATED DATE</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "net_amount",
      label: "AMOUNT",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              style={{ textAlign: "right" }}
              className="pr-2"
            >
              <span>AMOUNT</span>
            </TableCell>
          );
        },
        setCellProps: () => ({
          align: "right",
        }),
      },
    },

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
              {/* <Link to={"/newinvoice/"+tableMeta.rowData[5]}></Link> */}
              <Link to={navigatePath + "/prinvoice/" + tableMeta.rowData[5]+'/trash'}>
                <Tooltip title="View More">
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
    //   {
    //     name: "",
    //     // label: "Action",
    //     options: {
    //       filter: true,
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         return (
    //           <Link to={"/sales/rfq-form/rfqanalysis?id=" + tableMeta.rowData[0]}>
    //             <IconButton>
    //               <Icon color="secondary">find_in_page</Icon>
    //             </IconButton>
    //           </Link>

    //         )

    //       },
    //     },
    // },
  ];

  return (
    <div>
      <MUIDataTable
        title={"PURCHASE RETURN"}
        data={podetails
          .filter((obj) => obj.div_id == localStorage.getItem("division"))
          .map((item, index) => {
            return [
              ++index,
              item.pr_number,
              item.firm_name,
              item.ps_date,
              parseFloat(item.net_amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              }),
              item.pr_id,
            ];
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
                        noMatch: 'Sorry, no records found',
                        }
                      },
          rowsPerPageOptions: [10, 20, 40, 80, 100],
          selectableRows: "none",
          filterType: "dropdown",
          onSearchClose: e => {
            localStorage.removeItem("search");
            localStorage.removeItem("page");
          },
          searchProps: {
            onKeyUp: (e) => {
              localStorage.setItem("search", e.target.value);
              localStorage.setItem("page", "purchasereturn");
            },
          },
          searchText:
            localStorage.getItem("search") && localStorage.getItem("search"),
          // responsive: "scrollMaxHeight",
          rowsPerPage: 10,
        }}
      />
    </div>
  );
}
