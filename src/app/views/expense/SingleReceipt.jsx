import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import Tooltip from "@material-ui/core/Tooltip";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Dialog from "./Dialog";
import moment from "moment";
import {
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Circular,
} from "@material-ui/core";
import url, { navigatePath, urlphp, basePath } from "../invoice/InvoiceService";
// import pdf from "../../pdf.png";
// import excel from "../../excel.png";
// import doc from "../../doc.jpg";
// import zip from "../../zipp.png";

const SingleReceipt = () => {
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [ReceiptList, setReceiptList] = useState([]);
  const [accountname, setaccountname] = useState("");
  const [img, setimg] = useState("");
  const [ref_img, setref_img] = useState("");
  const [columndata, setcolumndata] = useState([]);

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    url.get("receipts/" + id).then(({ data }) => {
      setReceiptList(data);
      setimg(data[0].referrenceImgUrl);
      setref_img(data.referrenceImgUrl);
    });
  }, []);

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "VIEW RECEIPT", path: navigatePath + "/transaction" },
            { name: "RECEIPT" },
          ]}
        />
      </div>

      <small className="text-muted pl-4">
        <h5 className="pl-4">
          <strong>RECEIPT:</strong>
          {ReceiptList.registration_no}
        </h5>
      </small>
      <Divider></Divider>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <Card className="pt-6" elevation={3}>
            <Table className="mb-4">
              <TableBody>
                {ReceiptList?.map((item, index) => (
                  <>
                    <TableRow>
                      <TableCell className="pl-4">{localStorage.getItem("division") == item?.division_id ? <>Trading Division</> : <>Printing Division</>}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="pl-4">PAYMENT MODE</TableCell>
                      <TableCell style={{ textTransform: "uppercase" }}>
                        {item.payment_mode}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-4">PAID AMOUNT</TableCell>
                      <TableCell>
                        {item.paid_amount !== null
                          ? parseFloat(item.paid_amount).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                              }
                            )
                          : "0.00"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pl-4">PAID DATE</TableCell>
                      <TableCell>
                        {moment(item.paid_date).format("DD MMM YYYY")}
                      </TableCell>
                    </TableRow>
                    {item.file !== null && (
                      <TableRow>
                        <TableCell className="pl-4">ATTACHMENT</TableCell>
                        <TableCell>
                          <Tooltip title="View File">
                            {img.substr(img.length - 3) == "png" ||
                            img.substr(img.length - 3) == "jpg" ||
                            img.substr(img.length - 3) == "jpeg" ? (
                              <>
                                <span
                                  onClick={() => {
                                    setOpenDialog(true);
                                  }}
                                  style={{ cursor: "pointer", color: "blue" }}
                                >
                                  VIEW FILE
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  onClick={() => {
                                    window.open(
                                      basePath + item.file,
                                      "_blank" // <- This is what makes it open in a new window.
                                    );
                                  }}
                                  style={{ cursor: "pointer", color: "blue" }}
                                >
                                  VIEW FILE
                                </span>
                              </>
                            )}

                            {/* <a >
                          <img
                            src={img}
                            href={img}
                            className="border-radius-4 w-100 mr-3"
                            style={{ width: 100, height: 100 }}
                            target="_blank"
                          ></img>
                        </a> */}
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}></Grid>
      </Grid>
      {openDialog && (
        <Dialog open={openDialog} img={img} handleClose={handleClose} />
      )}
    </div>
  );
};

export default SingleReceipt;
