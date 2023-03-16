import React from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";

export default function salesInv({podetails,columns,load}) {
  return (
    <div>
      <MUIDataTable
        title={"SALES INVOICE"}
        data={podetails
          .filter((obj) => obj.div_id == localStorage.getItem("division"))
          .map((item, index) => {
            
            return [
              ++index,
              item?.invoice_no,
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
              item?.is_vat_filed,
              item?.invoice_status,
              item?.submit_status,
              item?.genarate_status,
              item?.acknowledge_status,
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
