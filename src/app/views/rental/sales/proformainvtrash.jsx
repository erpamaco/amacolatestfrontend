import React from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import {
    TableCell,
  Icon,Tooltip
  } from "@material-ui/core";
  import  {  navigatePath } from "../../invoice/InvoiceService";

  import { Link } from "react-router-dom";
  

export default function salesInv({podetails}) {
   
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
              )
            }
          },
        },
        {
          name: "id", // field name in the row object
          label: "INVOICE NUMBER", // column title that will be shown in table
          options: {
            filter: true,
    
            customHeadRender: ({ index, ...column }) => {
              return (
                <TableCell key={index} align='center' style={{maxWidth:150,width:150}} inputProps={{ style: { textTransform: 'capitalize' } }}>
                  <span>INVOICE NUMBER</span>
                </TableCell>
              )
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
                <TableCell key={index} align='center' style={{maxWidth:150,width:150}} inputProps={{ style: { textTransform: 'capitalize' } }}>
                  <span>PO NUMBER</span>
                </TableCell>
              )
            },
            setCellProps: () => ({
              align: "center",
              // width:600,
              wordWrap: 'break'
            })
          },
        },
        {
          name: "firm_name",
          label: "COMPANY NAME",
          options: {
    
            customHeadRender: ({ index, ...column }) => {
              return (
                <TableCell key={index} align='center'  inputProps={{ style: { textTransform: 'capitalize' } }}>
                  <span>COMPANY NAME</span>
                </TableCell>
              )
            },
            setCellProps: () => ({
              align: "center",
              // width:600,
              wordWrap: 'break'
            })
          },
        },
        {
          name: "firm_name",
          label: "ISSUE DATE",
          options: {
    
            customHeadRender: ({ index, ...column }) => {
              return (
                <TableCell key={index} align='center' style={{maxWidth:150,width:150}} inputProps={{ style: { textTransform: 'capitalize' } }}>
                  <span>ISSUE DATE</span>
                </TableCell>
              )
            },
            setCellProps: () => ({
              align: "center",
              // width:600,
              wordWrap: 'break'
            })
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
                <TableCell key={index} className="pr-2" style={{ textAlign: 'right' }}>
                  <span textAlign="right" >AMOUNT</span>
                </TableCell>
              )
            },
    
            setCellProps: () => ({
              align: "right",
              // paddingLeft:24
            })
          }
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
                <TableCell key={index} style={{ textAlign: "right" }} className="pr-8">
                  <span style={{ marginLeft: 18 }}>ACTION</span>
                </TableCell>
              )
            },
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div style={{ textAlign: "right" }} className="pr-8">
                  <Link to={navigatePath + "/newinvoice/" + tableMeta.rowData[7]+'/trash'}>
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
    
              )
    
            },
          },
        },
        {
          name: "",
          label: "Action",
          options: {
            filter: true,
            display: false
          },
        },
      ];
  return (
    <div>
      <MUIDataTable
        title={"PROFORMA INVOICE"}
        data={podetails
          .filter((obj) => obj.div_id == localStorage.getItem("division"))
          .map((item, index) => {
            return [
              ++index,
              item?.invoice_no ? item?.invoice_no : '--',
              item?.po_number == "null" || item?.po_number == null
                ? "--"
                : item?.po_number,
              item?.party?.firm_name,

              moment(item?.issue_date).format("DD MMM YYYY"),
              isNaN(parseFloat(item?.grand_total))
                ? 0.0
                : parseFloat(item?.grand_total).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  }),

              item?.status,
              item?.id,
              item?.quotation_id ? "quote" : "invoice",
              // moment(item.created_at).format('DD-MM-YYYY'),
              // (parseFloat(item.net_amount)).toFixed(2),
              // item.id
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
          // responsive: "scrollMaxHeight",
          rowsPerPage: 10,
          onSearchClose: e => {
            localStorage.removeItem("search");
            localStorage.removeItem("page");
          },
          searchProps: {
            onKeyUp: (e) => {
              localStorage.setItem("search", e.target.value);
              localStorage.setItem("page", "sinv");
            },
          },
          searchText:
            localStorage.getItem("search") && localStorage.getItem("search"),
        }}
      />
    </div>
  );
}
