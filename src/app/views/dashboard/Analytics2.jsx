import React, { useEffect, useState } from "react";
import {
  Card,
  TextField,
  MenuItem,
  IconButton,
  Icon,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,


} from "@material-ui/core";
import { merge } from "lodash";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import StatCard3 from "./shared/StatCard3";
import ReactEcharts from "echarts-for-react";
import url, { getpaidDivision } from "../../views/invoice/InvoiceService";
import { useTheme } from "@material-ui/styles";
import DoughnutChart from "../charts/echarts/Doughnut";
import ComparisonChart2 from "../charts/echarts/ComparisonChart2";
import StatCard4 from "./shared/StatCard4";
import GaugeProgressCard from "./shared/GuageProgressCard";
import FollowerCard from "./shared/FollowerCard";
import FollowerCard2 from "./shared/FollowerCard2";
import { makeStyles } from "@material-ui/core/styles";

import MUIDataTable from "mui-datatables";
import { object } from "underscore";
// const option={{
//   series: [
//     {
//       data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
//       type: "line",
//     },
//   ],
//   xAxis: {
//     data: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//   },
// }
// }}

const useStyles = makeStyles(({ palette, ...theme }) => ({
  productTable: {
    "& small": {
      height: 15,
      width: 50,
      borderRadius: 500,
      boxShadow:
        "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
    },
    "& td": {
      borderBottom: "none",
    },
    "& td:first-child": {
      paddingLeft: "16px !important",
    },
  },
}));

const Analytics2 = () => {
  const [paiddivision_account, setpaiddivision_account] = useState([]);
  const [tempList, settempList] = useState([]);
  const [linegraph, setlinegraph] = useState([]);
  const [accountStatement, setaccountStatement] = useState([]);

  var obj;
  var parentData;


  const theme = useTheme();

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: "circle",
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: "roboto",
      },
    },
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    xAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],

    series: [
      {
        name: "Traffic Rate",
        type: "pie",
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: "center", // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: "roboto",
            },
            formatter: "{a}",
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "14",
              fontWeight: "normal",
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: "{b} \n{c} ({d}%)",
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },

        data: tempList,
        // data:[
        //   {
        //     value: 65,
        //     name: "Google",
        //   },
        //   {
        //     value: 20,
        //     name: "Facebook",
        //   },
        //   { value: 15, name: "Others" },
        // ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  useEffect(() => {
    getpaidDivision().then(({ data }) => {

      var arrVal = data.sort(function (obj1, obj2) {
        return obj1.type.localeCompare(obj2.type);
      });
      setlinegraph(option)
      url.post('all-account-statement').then(({ data }) => {
        const myArr = Object.values(data[0].data).sort(
          (a, b) => new Date(a[0].date) - new Date(b[0].date)
        );

        // var result =myArr.reduce((total,currentItem) =>  total = total + parseFloat(currentItem[0][0].grand_total) , 0 );
        var result = myArr.map((item, i) => {
          item['debit'] = myArr.filter(x => x[0].party_id == item[0].party_id).reduce((result, item) => result + item[0].debit, 0);
          item['credit'] = myArr.filter(x => x[0].party_id == item[0].party_id).reduce((result, item) => result + item[0].credit, 0);
          return item
        })
        var Due = result.filter((ele, ind) => ind === result.findIndex(elem => elem[0].party_id === ele[0].party_id));

        // return the ones with equal id




        setaccountStatement(Due)

      });

      url.get("accountCategory").then(({ data }) => {




      })
      url.get("accountCategory")

        .then(response => response)
        .then(data => obj = data)
        .then(() =>

          url.get(`expense_chart`).then(({ data }) => {
            parentData = obj.data.filter(item => item.parent_id == null);

            // var result=data.filter(o1 =>obj.data.map(o2 => o1.id === o2.parent_id))
            var result = data[0].filter(function (o1) {

              return obj.data.some(function (o2, i) {
                if (o1.account_category_id === o2.id) {
                  const variableOne = obj.data.filter(itemInArray => itemInArray.id === o2.id);

                  o1['parent_account'] = obj.data.find(itemInArray => itemInArray.id === variableOne[0].parent_id);
                  o1['count'] = data[0].filter(val => val.account_category_id == o2.id).reduce((total, currentItem) => total = total + parseFloat(currentItem.amount), 0);
                  return o1;
                } // return the ones with equal id
              });

            })

            // let pp = result.filter( (ele, ind) => ind === result.findIndex( elem => elem.account_category_id === ele.account_category_id))


            var filterResult = result.filter(o1 => parentData.map(o2 => o1.parent_account.id === o2.id))
            // console.log(filterResult.filter( (ele, ind) => ind === filterResult.findIndex( elem => elem.parent_account.id === ele.parent_account.id)))


            var arr2 = filterResult.map(v => ({ name: v.parent_account.name, value: parseFloat(v.amount) }));


            settempList(arr2)



          }))

      // url.get("expense-paid").then(({ data }) => {

      //   console.log(data.filter(o1 =>obj.some(o2 => o1.id === o2.id)))






      setpaiddivision_account(data);
    });
  }, [])
  const columns = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={50} style={{ textAlign: "center" }} >
              <span style={{ marginLeft: 15 }} >S.NO.</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id", // field name in the row object
      label: "NAME", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span  >NAME</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id", // field name in the row object
      label: "DESIGNATION", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span >BALANCE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id", // field name in the row object
      // label: "DESIGNATION", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span >STATUS</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div className="pr-8" style={{ textAlign: 'center' }}>
              {tableMeta.rowData[2] < 0 ? (

                <Icon style={{ color: "#08ad6c" }} size="small">arrow_downward</Icon>

              ) : (

                <Icon size="small" color="error">arrow_upward</Icon>

              )
              }
            </div>

          )

        },
      },
    },
  ]


  const columnsDue = [
    {
      name: "id", // field name in the row object
      label: "S.No.", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} width={50} style={{ textAlign: "center" }} >
              <span style={{ marginLeft: 15 }} >S.NO.</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id", // field name in the row object
      label: "NAME", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span  >NAME</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id", // field name in the row object
      label: "DESIGNATION", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span >BALANCE</span>
            </TableCell>
          )
        },
        setCellProps: () => ({
          align: "center"
        })
      },
    },
    {
      name: "id", // field name in the row object
      // label: "DESIGNATION", // column title that will be shown in table
      options: {

        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: "center" }} >
              <span >STATUS</span>
            </TableCell>
          )
        },
        customBodyRender: (value, tableMeta, updateValue) => {

          return (
            <div className="pr-8" style={{ textAlign: 'center' }}>


              <Link to={"/customer_account/" + tableMeta.rowData[3]}>

                <Icon color="primary">remove_red_eye</Icon>

              </Link>


            </div>

          )

        },
      },
    },
  ]
  const classes = useStyles();
  return (
    <div className="analytics m-sm-30">
      <div className="flex justify-between items-center items-center mb-6">
        <h3 className="m-0">Overview</h3>
        {/* <TextField defaultValue="1" variant="outlined" size="small" select>
          <MenuItem value="1">This Month</MenuItem>
          <MenuItem value="2">Last Month</MenuItem>
          <MenuItem value="3">Six Month</MenuItem>
          <MenuItem value="4">Last Year</MenuItem>
        </TextField> */}
      </div>

      <StatCard3 />

      <Grid container spacing={3} alignItems="center">

        {/* <Grid item sm={6} xs={3}>

      
<Card elevation={3} className="pt-5 mb-6">
<div className="flex justify-between items-center px-6 mb-3">
  <span className="card-title">Due Invoices</span>
  <Select size="small" defaultValue="this_month" disableUnderline>
    <MenuItem value="this_month">This Month</MenuItem>
    <MenuItem value="last_month">Last Month</MenuItem>
  </Select>
</div>
<div className="overflow-auto">
  <Table
    className={clsx("whitespace-pre min-w-400", classes.productTable)}
  >
    <TableHead>
      <TableRow>
        <TableCell className="px-6" colSpan={4}>
          Name
        </TableCell>
        <TableCell className="px-0" colSpan={2}>
          Revenue
        </TableCell>
        <TableCell className="px-0" colSpan={2}>
          Stock Status
        </TableCell>
        <TableCell className="px-0" colSpan={1}>
          Action
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {productList.map((product, index) => (
        <TableRow key={index} hover>
          <TableCell className="px-0 capitalize" colSpan={4} align="left">
            <div className="flex items-center">
           
              <p className="m-0 ml-8">{product.name}</p>
            </div>
          </TableCell>
          <TableCell className="px-0 capitalize" align="left" colSpan={2}>
           
              {product.opening_balance}
          </TableCell>

          <TableCell className="px-0" align="left" colSpan={2}>
            {product.available ? (
              product.available < 20 ? (
                <small className="border-radius-4 bg-secondary text-white px-2 py-2px">
                  {product.available} available
                </small>
              ) : (
                <small className="border-radius-4 bg-primary text-white px-2 py-2px">
                  in stock
                </small>
              )
            ) : (
              <small className="border-radius-4 bg-error text-white px-2 py-2px">
                out of stock
              </small>
            )}
          </TableCell>
          <TableCell className="px-0" colSpan={1}>
            <IconButton>
              <Icon color="primary">remove_red_eye</Icon>
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

</Card>
</Grid> */}







        <Grid item sm={6} xs={12}>


          <Card elevation={3} className="pt-5 mb-6">
            <div className="flex justify-between items-center px-6 mb-3">
              <span className="card-title">Account Statements</span>
              {/* <Select size="small" defaultValue="this_month" disableUnderline>
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select> */}
            </div>
            <div className="overflow-auto">
              {/* <Table
          className={clsx("whitespace-pre min-w-400", classes.productTable)}
        >
          <TableHead>
            <TableRow>
              <TableCell className="px-11" colSpan={4}>
                Name
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Balance
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Status
              </TableCell>
              <TableCell className="px-0" colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TablefBody>
            {paiddivision_account.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell className="px-0 capitalize" colSpan={4} align="left">
                  <div className="flex items-center">
                   
                    <p className="m-0 ml-8">{product.name}</p>
                  </div>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                {parseFloat(product.balance).toLocaleString(undefined,{
                                minimumFractionDigits:2
                              })} SAR
                  
                </TableCell>

                <TableCell className="px-0" align="left" colSpan={2}>
                 
                    {product.balance < 0 ? (
                      
                      <Icon style={{color:"#08ad6c"}} size="small">arrow_downward</Icon>
                     
                    ) : (
                      
                        <Icon size="small" color="error">arrow_upward</Icon>
                      
                    )
                  }
                 
                </TableCell>
                <TableCell className="px-0" colSpan={1}>
                  <IconButton>
                    <Icon color="primary">remove_red_eye</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TablefBody>
        </Table> */}
              <MUIDataTable
                data={
                  paiddivision_account.map((item, index) => {


                    return [

                      ++index,
                      item.name?.toLowerCase(),
                      parseFloat(item?.balance).toLocaleString(undefined, {
                        minimumFractionDigits: 2
                      })

                    ]

                  })
                }
                columns={columns
                }
                options={{
                  filterType: "textField",
                  responsive: "simple",
                  selectableRows: "none",
                  filter: true,
                  rowsPerPage: 5,



                  rowsPerPageOptions: [5, 10, 25]
                }}
              />
            </div>
          </Card>
        </Grid>
        <Grid xs={6} >
          <Card elevation={3} className="pt-5 mb-6 mr-4">
            <div className="flex justify-between items-center px-6 mb-3">
              <span className="card-title">Customer Statements</span>
              {/* <Select size="small" defaultValue="this_month" disableUnderline>
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select> */}
            </div>
            <div className="overflow-auto">
              {/* <Table
          className={clsx("whitespace-pre min-w-400", classes.productTable)}
        >
          <TableHead>
            <TableRow>
              <TableCell className="px-11" colSpan={4}>
                Name
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Balance
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                Status
              </TableCell>
              <TableCell className="px-0" colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paiddivision_account.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell className="px-0 capitalize" colSpan={4} align="left">
                  <div className="flex items-center">
                   
                    <p className="m-0 ml-8">{product.name}</p>
                  </div>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                {parseFloat(product.balance).toLocaleString(undefined,{
                                minimumFractionDigits:2
                              })} SAR
                  
                </TableCell>

                <TableCell className="px-0" align="left" colSpan={2}>
                 
                    {product.balance < 0 ? (
                      
                      <Icon style={{color:"#08ad6c"}} size="small">arrow_downward</Icon>
                     
                    ) : (
                      
                        <Icon size="small" color="error">arrow_upward</Icon>
                      
                    )
                  }
                 
                </TableCell>
                <TableCell className="px-0" colSpan={1}>
                  <IconButton>
                    <Icon color="primary">remove_red_eye</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
              <MUIDataTable
                data={
                  accountStatement.map((item, index) => {


                    return [

                      ++index,
                      item[0].party.firm_name?.toLowerCase(),
                      parseFloat(item?.debit - item?.credit).toLocaleString(undefined, {
                        minimumFractionDigits: 2
                      }),
                      item[0].party.id

                    ]

                  })
                }
                columns={columnsDue
                }
                options={{
                  filterType: "textField",
                  responsive: "simple",
                  selectableRows: "none",
                  filter: true,
                  rowsPerPage: 5,



                  rowsPerPageOptions: [5, 10, 25]
                }}
              />
            </div>
          </Card>
          {/* <Card style={{position:'relative',top:'-225px',left:'14px'}} elevation={6}>
    <div className="card-title pl-4 pt-4" >Expenses</div>
            
              
              <ReactEcharts
              style={{ height:300,width:'100%' }}
              option={{
                ...option,
                color: [theme.palette.primary.dark,
                    theme.palette.primary.main,
                    // theme.palette.primary.light,
                    theme.palette.secondary.dark,
                  ],
              }}
              
    />
              </Card> */}
        </Grid>
      </Grid>



      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Card className="mt-5 mb-6" elevation={3}>

            <div className=" px-4 py-3 mb-6 flex justify-between items-center bg-light-gray">
              <span className="font-medium text-muted">EXPENSE STATISTICS</span>
              <IconButton size="small">
                <Icon>more_horiz</Icon>
              </IconButton>
            </div>

            <div className="pb-24 pt-7 px-8 bg-primary" >
              <div className="card-title capitalize text-white mb-4 text-white-secondary">
                Last 12 months sales
              </div>
              <ReactEcharts

                color="#6c757d"
                height="280px"
                option={merge({}, defaultOption, {
                  series: [
                    {
                      data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
                      type: "line",
                    },
                  ],
                  xAxis: {
                    data: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                  },
                })
                }

              />

            </div>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card style={{ position: 'relative', left: '14px', top: '20px' }} elevation={6}>
            <div className="card-title pl-4 pt-2 " >Expenses</div>


            <ReactEcharts
              style={{ height: 350, width: '100%' }}
              option={{
                ...option,
                color: [theme.palette.primary.dark,
                theme.palette.primary.main,
                // theme.palette.primary.light,
                theme.palette.secondary.dark,
                ],
              }}

            />
          </Card>
        </Grid>
      </Grid>



    </div>
  );
};


const defaultOption = {
  grid: {
    top: 16,
    left: 36,
    right: 16,
    bottom: 32,
  },
  legend: {},
  tooltip: {
    show: true,
    trigger: "axis",

    axisPointer: {
      type: "cross",
      lineStyle: {
        opacity: 0,
      },
    },
    crossStyle: {
      color: "#000",
    },
  },
  series: [
    {
      areaStyle: {},
      smooth: true,
      lineStyle: {
        width: 2,
        color: "#fff",
      },
    },
  ],
  xAxis: {
    show: true,
    type: "category",
    showGrid: false,
    boundaryGap: false,
    axisLabel: {
      color: "#ccc",
      margin: 20,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    min: 10,
    max: 60,
    axisLabel: {
      color: "#ccc",
      margin: 20,
      fontSize: 13,
      fontFamily: "roboto",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, .1)",
      },
    },

    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  color: [
    {
      type: "linear",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: "rgba(255,255,255,0.3)", // color at 0% position
        },
        {
          offset: 1,
          color: "rgba(255,255,255,0)", // color at 100% position
        },
      ],
      global: false, // false by default
    },
  ],
};

export default Analytics2;
