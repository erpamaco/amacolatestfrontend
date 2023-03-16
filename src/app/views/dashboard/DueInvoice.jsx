import React, { useEffect, useState } from "react";
import { Icon, TableCell } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import url, { navigatePath } from "../invoice/InvoiceService";
import { Link } from "react-router-dom";
import moment from "moment";

const DueInvoice = () => {
  const [accountStatement, setaccountStatement] = useState([]);
  useEffect(() => {
    url
      .get("mjrCustomerStatement/" + localStorage.getItem("division"))
      .then(({ data }) => {
        try {
          const myArr = Object.values(data?.customerStatement[0]?.data).sort(
            (a, b) => new Date(a[0]?.date) - new Date(b[0]?.date)
          );

          // var result =myArr.reduce((total,currentItem) =>  total = total + parseFloat(currentItem[0][0].grand_total) , 0 );
          var result = myArr?.map((item, i) => {
            item["debit"] = myArr
              .filter((x) => x[0].party_id == item[0].party_id)
              .reduce((result, item) => result + item[0].debit, 0);
            item["credit"] = myArr
              .filter((x) => x[0].party_id == item[0].party_id)
              .reduce((result, item) => result + item[0].credit, 0);
            return item;
          });
          var Due = result.filter(
            (ele, ind) =>
              ind ===
              result.findIndex((elem) => elem[0].party_id === ele[0].party_id)
          );

          // console.log(myArr)
          setaccountStatement(myArr);
        } catch (error) {}
        //   const myArr = Object.values(data[0]?.data).sort(
        //     (a, b) => new Date(a[0]?.date) - new Date(b[0]?.date)
        //   );

        //  var result= myArr.map((item,i)=>{
        //     item['debit']= myArr.filter(x => x[0].party_id==item[0].party_id).reduce((result, item) => result + item[0].debit, 0);
        //     item['credit']= myArr.filter(x => x[0].party_id==item[0].party_id).reduce((result, item) => result + item[0].credit, 0);
        //     return item
        //   })
        //   var Due=result.filter( (ele, ind) => ind === result.findIndex( elem => elem[0].party_id === ele[0].party_id));

        //   setaccountStatement(Due)
      });
  }, []);

  const columnsDue = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={50} style={{ textAlign: "center" }}>
              <span style={{ marginLeft: 15 }}>S.NO.</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="" style={{ textAlign: "center" }}>
              <span
                style={{
                  color:
                    moment(new Date(), "YYYY-MM-DD").diff(
                      moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                      "days"
                    ) -
                      tableMeta.rowData[4] <=
                    3
                      ? "yellow"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] >
                        0
                      ? "red"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] ==
                        0
                      ? "red"
                      : "black",
                }}
              >
                {tableMeta.rowData[0]}
              </span>
            </div>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      // label: "DESIGNATION", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span>INVOICE NUMBER</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="" style={{ textAlign: "center" }}>
              <span
                style={{
                  color:
                    moment(new Date(), "YYYY-MM-DD").diff(
                      moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                      "days"
                    ) -
                      tableMeta.rowData[4] <=
                    3
                      ? "yellow"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] >
                        0
                      ? "red"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] ==
                        0
                      ? "red"
                      : "black",
                }}
              >
                {tableMeta.rowData[6]}
              </span>
            </div>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },

    {
      name: "id", // field name in the row object
      label: "NAME", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={350} style={{ textAlign: "center" }}>
              NAME
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="" style={{ textAlign: "center" }}>
              <span
                style={{
                  color:
                    moment(new Date(), "YYYY-MM-DD").diff(
                      moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                      "days"
                    ) -
                      tableMeta.rowData[4] <=
                    3
                      ? "yellow"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] >
                        0
                      ? "red"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] ==
                        0
                      ? "red"
                      : "black",
                }}
              >
                {tableMeta.rowData[2]}
              </span>
            </div>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      // label: "DESIGNATION", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={180} style={{ textAlign: "center" }}>
              <span>DATE</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="" style={{ textAlign: "center" }}>
              <span
                style={{
                  color:
                    moment(new Date(), "YYYY-MM-DD").diff(
                      moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                      "days"
                    ) -
                      tableMeta.rowData[4] <=
                    3
                      ? "yellow"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] >
                        0
                      ? "red"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] ==
                        0
                      ? "red"
                      : "black",
                }}
              >
                {moment(new Date(tableMeta.rowData[5])).format("DD MMM YYYY")}
              </span>
            </div>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      label: "DESIGNATION", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              width={150}
              className="pr-2"
              style={{ textAlign: "right" }}
            >
              <span>BALANCE</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="" style={{ textAlign: "right" }}>
              <span
                style={{
                  color:
                    moment(new Date(), "YYYY-MM-DD").diff(
                      moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                      "days"
                    ) -
                      tableMeta.rowData[4] <=
                    3
                      ? "yellow"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] >
                        0
                      ? "red"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] ==
                        0
                      ? "red"
                      : "black",
                }}
              >
                {
                  parseFloat(tableMeta.rowData[1]).toLocaleString(undefined,{
                    minimumFractionDigits:2
                  })
                }
              </span>
            </div>
          );
        },
        setCellProps: () => ({
          align: "right",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      // label: "DESIGNATION", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={100} style={{ textAlign: "center" }}>
              <span>AGE</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="" style={{ textAlign: "center" }}>
              <span
                style={{
                  color:
                    moment(new Date(), "YYYY-MM-DD").diff(
                      moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                      "days"
                    ) -
                      tableMeta.rowData[4] <=
                    3
                      ? "yellow"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] >
                        0
                      ? "red"
                      : moment(new Date(), "YYYY-MM-DD").diff(
                          moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                          "days"
                        ) -
                          tableMeta.rowData[4] ==
                        0
                      ? "red"
                      : "black",
                }}
              >
                {moment(new Date(), "YYYY-MM-DD").diff(
                  moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                  "days"
                )}
              </span>
            </div>
          );
        },
        setCellProps: () => ({
          align: "center",
        }),
      },
    },
    {
      name: "id", // field name in the row object
      // label: "DESIGNATION", // column title that will be shown in table
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={150} style={{ textAlign: "center" }}>
              <span>STATUS</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="pr-8" style={{ textAlign: "center" }}>
              {moment(new Date(), "YYYY-MM-DD").diff(
                moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                "days"
              ) -
                tableMeta.rowData[4] <
                0 && (
                <span
                  style={{
                    color:
                      moment(new Date(), "YYYY-MM-DD").diff(
                        moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                        "days"
                      ) -
                        tableMeta.rowData[4] <=
                      3
                        ? "yellow"
                        : moment(new Date(), "YYYY-MM-DD").diff(
                            moment(
                              new Date(tableMeta.rowData[5]),
                              "YYYY-MM-DD"
                            ),
                            "days"
                          ) -
                            tableMeta.rowData[4] >
                          0
                        ? "red"
                        : moment(new Date(), "YYYY-MM-DD").diff(
                            moment(
                              new Date(tableMeta.rowData[5]),
                              "YYYY-MM-DD"
                            ),
                            "days"
                          ) -
                            tableMeta.rowData[4] ==
                          0
                        ? "red"
                        : "black",
                  }}
                >
                  {" "}
                  DUE IN<br />
                  {Math.abs(
                    moment(new Date(), "YYYY-MM-DD").diff(
                      moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                      "days"
                    ) - tableMeta.rowData[4]
                  )}{" "}
                  DAYS
                </span>
              )}
              {moment(new Date(), "YYYY-MM-DD").diff(
                moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                "days"
              ) -
                tableMeta.rowData[4] >
                0 && (
                <span
                  style={{
                    color:
                      moment(new Date(), "YYYY-MM-DD").diff(
                        moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                        "days"
                      ) -
                        tableMeta.rowData[4] <=
                      3
                        ? "yellow"
                        : moment(new Date(), "YYYY-MM-DD").diff(
                            moment(
                              new Date(tableMeta.rowData[5]),
                              "YYYY-MM-DD"
                            ),
                            "days"
                          ) -
                            tableMeta.rowData[4] >
                          0
                        ? "red"
                        : moment(new Date(), "YYYY-MM-DD").diff(
                            moment(
                              new Date(tableMeta.rowData[5]),
                              "YYYY-MM-DD"
                            ),
                            "days"
                          ) -
                            tableMeta.rowData[4] ==
                          0
                        ? "red"
                        : "black",
                  }}
                >
                  {" "}
                  DUE SINCE<br />
                  {moment(new Date(), "YYYY-MM-DD").diff(
                    moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                    "days"
                  ) - tableMeta.rowData[4]}{" "}
                  DAYS
                </span>
              )}
              {moment(new Date(), "YYYY-MM-DD").diff(
                moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                "days"
              ) -
                tableMeta.rowData[4] ==
                0 && (
                <span
                  style={{
                    color:
                      moment(new Date(), "YYYY-MM-DD").diff(
                        moment(new Date(tableMeta.rowData[5]), "YYYY-MM-DD"),
                        "days"
                      ) -
                        tableMeta.rowData[4] <=
                      3
                        ? "yellow"
                        : moment(new Date(), "YYYY-MM-DD").diff(
                            moment(
                              new Date(tableMeta.rowData[5]),
                              "YYYY-MM-DD"
                            ),
                            "days"
                          ) -
                            tableMeta.rowData[4] >
                          0
                        ? "red"
                        : moment(new Date(), "YYYY-MM-DD").diff(
                            moment(
                              new Date(tableMeta.rowData[5]),
                              "YYYY-MM-DD"
                            ),
                            "days"
                          ) -
                            tableMeta.rowData[4] ==
                          0
                        ? "red"
                        : "black",
                  }}
                >
                  {" "}
                  DUE TODAY
                </span>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "id", // field name in the row object
      label: "NAME", // column title that will be shown in table
      options: {
        filter: true,
        display: "none",
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }}>
              <span>NAME</span>
            </TableCell>
          );
        },
      },
    },
  ];

  return (
    <div>
    {localStorage.getItem('division') == 5 ? <></>:<>  <MUIDataTable
        title="DUE STATEMENTS"
        data={accountStatement
          ?.filter((obj) => obj.debit - obj.credit > 0)
          ?.filter((obj) => obj[0].paid_amount > 0)
          ?.map((item, index) => {
            return [
              ++index,

              parseFloat(item[0]?.paid_amount)
                .toFixed(2)
                .toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                }),
              // ,
              item[0].party?.firm_name?.toUpperCase(),
              item[0].party?.id,
              item[0].credit_days,
              item[0].date,
              item[0].invoice_no,
            ];
          })}
        columns={columnsDue}
        options={{
          filterType: "textField",
          responsive: "simple",
          selectableRows: "none",
          filter: true,
          rowsPerPage: 5,

          rowsPerPageOptions: [5, 10, 25],
        }}
      />
</>}
        </div>
  );
};
export default DueInvoice;
