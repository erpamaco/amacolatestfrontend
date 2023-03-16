import React from 'react'
import MUIDataTable from "mui-datatables";


export default function salesRV({podetails,columns,load}) {
  return (
    <div>
          <MUIDataTable
                    title={"SALES RETURN"}
                    data={podetails.filter(obj => obj.d_id == localStorage.getItem('division')).map((item, index) => {

                        return [
                            ++index,
                            item.quotationr_no,
                            item.firm_name,
                            item.ps_date,
                            parseFloat(item.net_amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
                            item.pr_id
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
                        onSearchClose: e => {
                          localStorage.removeItem("search");
                          localStorage.removeItem("page");
                        },
                        searchProps: {
                            onKeyUp:(e) => {
                              localStorage.setItem('search',e.target.value);
                              localStorage.setItem('page','salesreturn');
                            }
                          },
                        searchText: localStorage.getItem('search') && localStorage.getItem('search') ,
                        
                        // responsive: "scrollMaxHeight",
                        rowsPerPage: 10,


                    }}
                />
    </div>
  )
}
