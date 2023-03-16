import React, { useState, useEffect } from "react";
import { Breadcrumb, ConfirmationDialog } from "matx";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Adddivision from "../expense/customers/customer-form/Adddivision";
import Tooltip from "@material-ui/core/Tooltip";
import url, { basePath } from "../invoice/InvoiceService";
import { TableCell, Button } from "@material-ui/core";
const columnStyleWithWidth = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  textAlign: "center",
  width: "400px",
  wordBreak: "break-word",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
};
const columnStyleWithWidthSno = {
  top: "0px",
  left: "0px",
  zIndex: "50",
  position: "sticky",
  backgroundColor: "#fff",
  width: "50px",
};

const Division = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [DivisionList, setDivisionList] = useState([]);

  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [divid, setdivid] = useState();
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const handleDialogClose = () => {
    setdivid("");
    setShouldOpenEditorDialog(false);
  };
  const handleChange = (id) => {
    setdivid(id);
    setShouldOpenEditorDialog(true);
  };

  const formData = new FormData();

  const handleFileSelect = (event, type) => {
    if (type == "app") {
      let files = event.target.files[0];
      formData.append("file", files);
      url.post("signature-app", formData).then(function (response) {
        setIsAlive(true);
      });
    } else {
      let files = event.target.files[0];
      formData.append("file", files);
      url.post("signature-prep", formData).then(function (response) {
        setIsAlive(true);
      });
    }
  };

  useEffect(() => {
    // get the party Information
    url.get("signature").then(({ data }) => {
      if (isAlive) setDivisionList(data);
    });

    // return () =>
     setIsAlive(false);
  }, [isAlive]);

  // get the party Information

  const columns = [
    {
      name: "id",
      label: "S.NO.",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={columnStyleWithWidthSno}>
              <span style={{ marginLeft: 15 }}>S.NO.</span>
            </TableCell>
          );
        },
      },
    },
    {
      name: "firm_name",
      label: "DIVISION NAME",
      options: {
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              style={columnStyleWithWidth}
              inputProps={{ style: { textTransform: "capitalize" } }}
            >
              <span style={{ paddingLeft: 15 }}>PREPARED BY</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {tableMeta.rowData[1] ? (
                <>
                  <img
                    src={basePath + tableMeta.rowData[1]}
                    alt={''}
                    height={100}
                    width={100}
                  />
                </>
              ) : (
                <>--</>
              )}
            </div>
          );
        },
        setCellProps: () => ({
          align: "center",
          paddingLeft: 20,
        }),
      },
    },
    {
      name: "vat_no",
      label: "OPENING BALANCE",
      options: {
        filter: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell
              key={index}
              className="pr-2"
              style={{ textAlign: "center" }}
            >
              <span>APPROVED BY</span>
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {tableMeta.rowData[2] ? (
                <>
                  <img
                    src={basePath + tableMeta.rowData[2]}
                    alt={tableMeta.rowData[2]}
                    height={100}
                    width={100}
                  />
                </>
              ) : (
                <>--</>
              )}
            </div>
          );
        },

        setCellProps: () => ({
          align: "center",
          paddingLeft: 20,
        }),
      },
    },
  ];

  return (
    <div>
      <div className="m-sm-30">
        <div className="mb-sm-30">
          {shouldOpenEditorDialog && (
            <Adddivision
              handleClose={handleDialogClose}
              open={shouldOpenEditorDialog}
              // paymentaccount={setpayment_account}
              divid={divid}
              division={setDivisionList}
            />
          )}
          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={handleDialogClose}
              text="Are you sure to delete?"
            />
          )}

          <div className="text-right">
            <input
              type="file"
              onChange={(e) => handleFileSelect(e, "prep")}
              id="prep"
              style={{ display: "none" }}
            />
            <Button
              htmlFor="prep"
              className="py-2"
              color="primary"
              component="label" 
              variant="outlined"
            >
              <Icon>add</Icon>
              UPLOAD PREPARED BY SIGNATURE
            </Button>
            &nbsp; &nbsp;
            <input
              type="file"
              onChange={(e) => handleFileSelect(e, "app")}
              id="app"
              style={{ display: "none" }}
            />
            <Button
              htmlFor="app"
              component="label"
              className="py-2"
              color="primary"
              variant="outlined"
            >
              <Icon>add</Icon>
              UPLOAD APPROVED BY SIGNATURE
            </Button>
          </div>
        </div>

        <MUIDataTable
          // title={"DIVISION"}
          data={DivisionList.map((item, index) => {
            // console.log(item)

            return [++index, item.prepared_by, item.approval_by];
          })}
          columns={columns}
          options={{
            filterType: "textField",
            responsive: "simple",
            selectableRows: "none",
            rowsPerPageOptions: [10, 20, 40, 80, 100],
          }}
        />
      </div>
    </div>
  );
};

export default Division;
