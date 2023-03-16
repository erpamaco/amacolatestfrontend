import React from 'react'
import MUIDataTable from "mui-datatables";
import moment from "moment";


export default function ({columns,podetails,load}) {
  return (
    <div>
           <MUIDataTable
                    title={"PURCHASE INVOICE"}
                    data={podetails.filter(obj => obj.div_id == localStorage.getItem('division')).map((item, index) => {
                        return [
                            ++index,
                            item?.po_number ? item?.po_number : "--",
                            item?.invoice_no ? (item?.invoice_no!=="true"?item?.invoice_no:"--") : "--",

                            item?.party?.firm_name ? item?.party?.firm_name : '--',

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
