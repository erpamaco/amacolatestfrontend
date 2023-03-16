import React, { useState, useEffect } from "react";
import {
  Icon,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { getInvoiceById } from "./InvoiceService";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from "../invoice/InvoiceService"

const useStyles = makeStyles(({ palette, ...theme }) => ({
  "@global": {
    "@media print": {
      "body, *, html": {
        visibility: "hidden",
      },
      "#print-area": {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        "& *": {
          visibility: "visible",
        },
      },
    },
  },
  invoiceViewer: {
    "& h5": {
      fontSize: 15,
    },
  },
}));

const Rfqview = ({ toggleInvoiceEditor }) => {
  const [state, setState] = useState({});
  const [rfq, setrfq] = useState([]);
  const [rdate, setrdate] = useState([]);
  const [ddate, setddate] = useState([]);
  const [cname, setcname] = useState([]);
  const [rfq_details, setrfqdetails] = useState([]);
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    url.get("rfq/" + id).then(({ data }) => {
      setcname(data[0].id)
      setrdate(data[0].requested_date)
      setddate(data[0].require_date)

      setrfqdetails(data[0].rfq_details)
      handlePrint()



    });

    // if (id !== "add")
    //   getInvoiceById(id).then((res) => {
    //     setState({ ...res.data });
    //   });
  }, [id]);

  const handlePrint = () => window.print();

  let subTotalCost = 0;
  let {
    orderNo,
    buyer,
    seller,
    item: invoiceItemList = [],
    status,
    vat,
    date,
  } = state;

  return (
    <div className={clsx("invoice-viewer py-4", classes.invoiceViewer)}>
      <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
        <Link to="/sales/rfq-form/rfqview">
          <IconButton>
            <Icon>arrow_back</Icon>
          </IconButton>
        </Link>
        <Button
          onClick={handlePrint}
          className="py-2"
          variant="outline-warning"
        >
          Print Invoice
        </Button>
      </div>

      <div id="print-area">
        <Divider />
        <div className="viewer__order-info px-4 mb-4 flex justify-between">
          <div>
            {/* <h5 className="mb-2">Order Info</h5> */}
            <p className="mb-4">Customer Name</p>
            <p className="mb-0"># {cname}</p>
            <p className="mb-4">Address</p>
            <p className="mb-0"># {cname}</p>
          </div>
          <div className="text-right">
            <h5 className="font-normal mb-4 capitalize">
              <strong>Requested date: </strong>{" "}
              <span>
                {rdate}
              </span>
            </h5>
            <h5 className="font-normal capitalize">
              <strong>Due date: </strong>{" "}
              <span>
                {ddate}
              </span>
            </h5>
          </div>
        </div>

        <Divider />

        {/* <div className="viewer__billing-info px-4 py-5 flex justify-between">
          <div>
            <h5 className="mb-2">Bill From</h5>
            <p className="mb-4">{seller ? seller.name : null}</p>
            <p className="mb-0 whitespace-pre-wrap">
              {seller ? seller.address : null}
            </p>
          </div>
          <div className="text-right w-full">
            <h5 className="mb-2">Bill To</h5>
            <p className="mb-4">{buyer ? buyer.name : null}</p>
            <p className="mb-0 whitespace-pre-wrap">
              {buyer ? buyer.address : null}
            </p>
          </div>
          <div />
        </div> */}

        <Card className="mb-4" elevation={0} title="Rfq Details">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="pl-sm-24">#</TableCell>
                <TableCell className="px-0">Item Name</TableCell>
                <TableCell className="px-0">Description</TableCell>
                <TableCell colSpan={2}>Amaco offered description</TableCell>
                <TableCell className="px-0">UOM</TableCell>
                <TableCell className="px-0">Qty</TableCell>
                <TableCell className="px-0">Unit Price</TableCell>
                <TableCell className="px-0">Total Price</TableCell>
                <TableCell className="px-0">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rfq_details.map((item, index) => {

                subTotalCost += item.unit * item.price;
                return (
                  <TableRow key={index}>
                    <TableCell className="pl-sm-24 capitalize" align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell className="pl-0 capitalize" align="left">
                      {item.name}
                    </TableCell>
                    <TableCell className="pl-0 capitalize" align="left">
                      {item.description}
                    </TableCell>
                    <TableCell className="pl-0 capitalize">
                      {item.quantity_required}
                    </TableCell>
                    <TableCell className="pl-0">
                      <Link to={"/sales/rfq-form/rfqanalysis"}>
                        <Icon>search</Icon>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
        {/* 
        <div className="px-4 flex justify-end">
          <div className="flex">
            <div className="pr-12">
              <p className="mb-4">Sub Total:</p>
              <p className="mb-4">Vat(%):</p>
              <strong>
                <p>Grand Total:</p>
              </strong>
            </div>
            <div>
              <p className="mb-4">{subTotalCost}</p>
              <p className="mb-4">{vat}</p>
              <p>
                <strong>${(subTotalCost += (subTotalCost * vat) / 100)}</strong>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Rfqview;
