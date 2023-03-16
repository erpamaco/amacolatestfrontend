import React, { useState, useEffect, useRef } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import { useReactToPrint } from "react-to-print";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../views/statements/Header";
import Footer from "../../views/statements/Footer";
import "./sty.css";
import {
    IconButton,
    Button,
    Table,
    TextField,
    InputAdornment,
    TableHead,
    Divider,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Card,
} from "@material-ui/core";
import url from "../invoice/InvoiceService";

import MUIDataTable from "mui-datatables";

import { Link } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
const StockViewer = () => {
    const useStyles = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
          float: 'right',
          background: 'blue',
          color: 'white'
        },
        input: {
          display: "none"
        },
        columnStyleWithWidth: {
          top: "0px",
          left: "0px",
          zIndex: "100",
          position: "sticky",
          backgroundColor: "#fff",
          width: "300px",
          wordBreak: "break-word",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          textAlign: "center"
        },
        columnStyleWithWidth1: {
          top: "0px",
          left: "0px",
          zIndex: "100",
          position: "sticky",
          backgroundColor: "#fff",
          width: "300px",
          wordBreak: "break-word",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          textAlign: "center"
        }
      }));
      const classes = useStyles();
      const [load, setLoad] = useState(true);

    const [tabIndex, setTabIndex] = useState(0);
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false);
    const [userList, setUserList] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [sl, setSl] = useState("");
    const [other, setOther] = useState([]);
    const [userid, setuserid] = useState(null);
    const [did, setdlid] = useState("");
    const [uid, setUid] = useState("");
    const [isAlive, setIsAlive] = useState(true);
    const [allOther, setAllOther] = useState([]);
    const [allDataList, setAllDataList] = useState([]);
    const [msg, setMsg] = useState("");
    const componentRef = useRef();
    const [state, setstate] = useState([]);

    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false);

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false);
        setShouldOpenConfirmationDialog(false);
        setShouldOpenViewDialog(false);

        setIsAlive(true);
    };

    const deleteUser = (id) => {
        setdlid(id);
        setShouldOpenConfirmationDialog(true);
    };

    const handleConfirmationResponse = () => {
        url.delete(`delete-emp/${did}`);
        handleDialogClose();
    };

    const handlePrinting = useReactToPrint({
        content: () => componentRef.current,
        header: () => componentRef.current,
    });

    useEffect(() => {
        url.get("stock").then(({ data }) => {
            console.log("stock",data)
            setDataList(data.category);
            setOther(data.other);
            setAllOther(data.other);
            setAllDataList(data.category);
            setLoad(false);
        }
        
        );
       

        url.get("company").then(({ data }) => {
            setstate(data[0]);
        });
        // setLoad(false);
        
        // setIsAlive(false)
    }, [isAlive]);

    const handleInputChange = (event) => {
        // setMsg(event.target.value?.toLowerCase())
        setDataList(
            allDataList.filter((obj) =>
                obj.name?.toLowerCase()?.includes(event.target.value?.toLowerCase())
            )
        );
        setOther(
            allOther.filter((obj) =>
                obj.name?.toLowerCase()?.includes(event.target.value?.toLowerCase())
            )
        );
        if (!other?.length && !dataList?.length) {
            setMsg("Sorry, no records found");
        } else {
            setMsg("");
        }
    };

    return (
        <div className="m-sm-30">
     
            <div className="mb-sm-30">
    
                <div className="viewer_actions px-0 flex justify-between">
                    <Breadcrumb routeSegments={[{ name: "STOCK" }]} />
                </div>
            </div>
            {load && (
        <div className={classes.loading}>
          {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
          <LinearProgress  sx={{
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgb(37 44 71)',
                        color:'rgb(37 44 71)',
                    }
}} />

        </div>
      )}
            <Card
                className="mb-4"
                style={{ padding: "20px" }}
                elevation={0}
                borderRadius="borderRadius"
            >
                <div className="flex justify-between">
                    <div>
                        <h2>STOCK DETAILS</h2>
                    </div>
                    <div> </div>
                    <div>
                        <TextField
                            className="mt-4"
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon>search</Icon>
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField>
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{ float: "right" }}
                            className="mr-4 p-2"
                            onClick={(e) => {
                                handlePrinting();
                            }}
                        >
                            PRINT
                        </Button>
                    </div>
                </div>

                <div ref={componentRef} style={{ position: "relative", left: 20 }}>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    {" "}
                                    <div class="header-space">&nbsp;</div>{" "}
                                </td>
                            </tr>
                        </thead>
                        <tbody class="tableBodyStock">
                            <tr>
                                <td>
                                    {/* <center>  <h2>STOCK DETAILS</h2></center>
                              <br />
                              <br /> */}
                                    <div className="print-body">
                                        {/* <div className="pl-2 pt-5 flex justify-center" style={{ borderTop: '1px solid #ccc', }}> */}

                                        {/* <div className="flex">
                                                <div className="pl-0 px-0 mb-4 mr-24 justify-center">
                                                    <center><h3><strong> STOCK DETAILS</strong></h3></center>

                                                </div>
                                            </div> */}
                                        {/* </div> */}

                                        <div className="row">
                                            <div
                                                className="col slHead"
                                                style={{
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Calibri",
                                                    fontWeight: "1000",
                                                    backgroundColor: "#1d2257",
                                                    color: "white",
                                                    fontSize: 16,
                                                    padding: 10,
                                                    textAlign: "center",
                                                }}
                                            >
                                                S.NO.
                                            </div>
                                            <div
                                                className="col catHead"
                                                style={{
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Calibri",
                                                    fontWeight: "1000",
                                                    backgroundColor: "#1d2257",
                                                    color: "white",
                                                    fontSize: 16,
                                                    padding: 10,
                                                    textAlign: "center",
                                                }}
                                            >
                                                CATEGORY
                                            </div>
                                            <div
                                                className="col subHead"
                                                style={{
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Calibri",
                                                    fontWeight: "1000",
                                                    backgroundColor: "#1d2257",
                                                    color: "white",
                                                    fontSize: 16,
                                                    padding: 10,
                                                    textAlign: "center",
                                                }}
                                            >
                                                SUB CATEGORY
                                            </div>
                                            <div
                                                className="col prodHead"
                                                style={{
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Calibri",
                                                    fontWeight: "1000",
                                                    backgroundColor: "#1d2257",
                                                    color: "white",
                                                    fontSize: 16,
                                                    padding: 10,
                                                    textAlign: "center",
                                                }}
                                            >
                                                PRODUCT
                                            </div>
                                            <div
                                                className="col priceHead"
                                                style={{
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Calibri",
                                                    fontWeight: "1000",
                                                    backgroundColor: "#1d2257",
                                                    color: "white",
                                                    fontSize: 16,
                                                    padding: 10,
                                                    textAlign: "center",
                                                }}
                                            >
                                                PRICE
                                            </div>
                                            <div
                                                className="col stockHead"
                                                style={{
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Calibri",
                                                    fontWeight: "1000",
                                                    backgroundColor: "#1d2257",
                                                    color: "white",
                                                    fontSize: 16,
                                                    padding: 10,
                                                    textAlign: "center",
                                                }}
                                            >
                                                STOCK
                                            </div>
                                            <div
                                                className="col stockValue"
                                                style={{
                                                    border: "1px solid #ccc",
                                                    fontFamily: "Calibri",
                                                    fontWeight: "1000",
                                                    backgroundColor: "#1d2257",
                                                    color: "white",
                                                    fontSize: 16,
                                                    padding: 10,
                                                    textAlign: "center",
                                                }}
                                            >
                                                STOCK VALUE
                                            </div>
                                        </div>
                                        <div className="pbdody">
                                            {msg && (
                                                <div style={{ padding: "10px" }}>
                                                    <center>{msg}</center>
                                                </div>
                                            )}
                                            {dataList.filter((obj)=>obj.div_id == localStorage.getItem('division'))?.map((item, i) => {
                                                return (
                                                    <div className="row" key={i}>
                                                        <div className="col slno">{++i}</div>
                                                        <div className="col capitalize catCol">
                                                            {item?.name}
                                                        </div>
                                                        {item?.product_category?.length ? (
                                                            <div className="col">
                                                                {item?.product_category?.map((subItem, si) => {
                                                                    return (
                                                                        <>
                                                                            <div className="row" key={si}>
                                                                                <div className="col capitalize subCol">
                                                                                    {subItem?.name}
                                                                                </div>
                                                                                {subItem?.product?.filter(obj => obj?.type == "Inventory")?.length ? (
                                                                                    <div className="col">
                                                                                        {/* ?.filter(ob => ob?.name?.toLowerCase().includes(msg)) */}
                                                                                        {subItem?.product?.filter(obj => obj?.type == "Inventory")?.map(
                                                                                            (prod, pi) => {
                                                                                                const sum =
                                                                                                    parseInt(
                                                                                                        prod?.purchaseQuantity
                                                                                                    ) +
                                                                                                    parseInt(
                                                                                                        prod?.salesReturnQuantity
                                                                                                    ) +
                                                                                                    parseInt(
                                                                                                        prod?.initial_quantity
                                                                                                    ) +
                                                                                                    (parseInt(
                                                                                                        prod?.salesQuantity
                                                                                                    ) -
                                                                                                        parseInt(
                                                                                                            prod?.purchaseReturnQuantity
                                                                                                        ));
                                                                                                return (
                                                                                                    <>
                                                                                                        <div
                                                                                                            className="row"
                                                                                                            key={pi}
                                                                                                        >
                                                                                                            <div className="col prodCol">
                                                                                                                {prod.name}
                                                                                                            </div>
                                                                                                            <div className="col priceCol">
                                                                                                                {parseFloat(
                                                                                                                    prod?.latestPrice[0]
                                                                                                                        ?.purchase_price
                                                                                                                )
                                                                                                                    ? parseFloat(
                                                                                                                        prod
                                                                                                                            ?.latestPrice[0]
                                                                                                                            ?.purchase_price
                                                                                                                    )
                                                                                                                    : 0}
                                                                                                            </div>
                                                                                                            <div className="col stockCol">
                                                                                                                {sum}
                                                                                                            </div>
                                                                                                            <div className="col stockVCol">
                                                                                                                {sum *
                                                                                                                    (parseFloat(
                                                                                                                        prod?.latestPrice[0]
                                                                                                                            ?.purchase_price
                                                                                                                    )
                                                                                                                        ? parseFloat(
                                                                                                                            prod
                                                                                                                                ?.latestPrice[0]
                                                                                                                                ?.purchase_price
                                                                                                                        )
                                                                                                                        : 0)}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>
                                                                                                );
                                                                                            }
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <>
                                                                                        <div className="col prodCol">
                                                                                            --
                                                                                        </div>
                                                                                        <div className="col priceCol">
                                                                                            --
                                                                                        </div>
                                                                                        <div className="col stockCol">
                                                                                            --
                                                                                        </div>
                                                                                        <div className="col stockVCol">
                                                                                            --
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="col subCol">--</div>
                                                                <div className="col prodCol">--</div>
                                                                <div className="col priceCol">--</div>
                                                                <div className="col stockCol">--</div>
                                                                <div className="col stockVCol">--</div>
                                                            </>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            {other?.filter(ob => ob?.name?.toLowerCase().includes(msg) && ob?.div_id == localStorage.getItem("division"))?.map((prod, i) => {
                                                const sum =
                                                    parseInt(prod?.purchaseQuantity) +
                                                    parseInt(prod?.salesReturnQuantity) +
                                                    (prod?.initial_quantity == null
                                                        ? 0
                                                        : parseInt(prod?.initial_quantity)) +
                                                    (parseInt(prod?.salesQuantity) -
                                                        parseInt(prod?.purchaseReturnQuantity));

                                                return (
                                                    <>
                                                        <div className="row">
                                                            <div className="col slno">
                                                                {parseInt(dataList?.length) + ++i}
                                                            </div>
                                                            <div className="col catCol">--</div>
                                                            <div className="col subCol">--</div>
                                                            <div className="col prodCol">{prod.name}</div>
                                                            <div className="col priceCol">
                                                                {parseFloat(
                                                                    prod?.latestPrice[0]?.purchase_price
                                                                )
                                                                    ? parseFloat(
                                                                        prod?.latestPrice[0]?.purchase_price
                                                                    ).toLocaleString(undefined, {
                                                                        minimumFractionDigits: 2,
                                                                    })
                                                                    : 0}
                                                            </div>
                                                            <div className="col stockCol">{sum}</div>
                                                            <div className="col stockVCol">
                                                                {(
                                                                    sum *
                                                                    (parseFloat(
                                                                        prod?.latestPrice[0]?.purchase_price
                                                                    )
                                                                        ? parseFloat(
                                                                            prod?.latestPrice[0]?.purchase_price
                                                                        )
                                                                        : 0.0)
                                                                ).toLocaleString(undefined, {
                                                                    minimumFractionDigits: 2,
                                                                })}
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    {" "}
                                    <div class="footer-space">&nbsp;</div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div style={{ display: "none" }} class="header fixHeader">
                        <Header></Header>
                    </div>
                    <div style={{ display: "none" }} class="footer">
                        <footer>
                            <div>
                                <div
                                    id="outer"
                                    class="outer"
                                    style={{
                                        position: "relative",
                                        width: "1050px",
                                        backgroundColor: "#c1c1c1",
                                        transform: "skew(-20deg)",
                                        marginLeft: "40px",
                                        marginRight: "50px",
                                    }}
                                >
                                    <p
                                        style={{
                                            color: "#fff",
                                            paddingTop: 5,
                                            paddingBottom: 5,
                                            transform: "skew(20deg)",
                                        }}
                                        align="center"
                                    >
                                        {" "}
                                        Tel.: {state.contact}| Fax: {state.fax} | P.O.Box{" "}
                                        {state.po_box} | Jubail 31951 | Kingdom of Saudi Arabia
                                    </p>
                                    <div
                                        id="spacer"
                                        style={{ width: "200px", height: "10px", marginRight: 0 }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "fixed",
                                            bottom: 0,
                                            width: "100%",
                                            height: 30,
                                            backgroundColor: "#1d2257",
                                        }}
                                    >
                                        {" "}
                                        <p
                                            style={{
                                                textAlign: "center",
                                                color: "white",
                                                fontFamily: "Calibri",
                                                paddingTop: 5,
                                                paddingBottom: 10,
                                                transform: "skew(20deg)",
                                            }}
                                        >
                                            E-mail: {state.email} | Website: {state.website}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default StockViewer;