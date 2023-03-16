import React, { useState, useEffect } from "react";
import { Divider, Tab, Tabs } from "@material-ui/core";
import { Breadcrumb } from "matx";
import url from "../invoice/InvoiceService";
import TradeModule from './Modules';
import AddDialog from "./AddDialog";
import { Button, Icon } from "@material-ui/core";

const MainModule = () => {
    const [tabIndex, setTabIndex] = useState(0);
    // const [isAlive, setIsAlive] = useState(true);
    const [division, setDivision] = useState([]);
    const [shouldOpenAddDialog, setShouldOpenAddDialog] = useState(false);
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const [menuPosition, setMenuPosition] = useState(null);

    const [parentId, setParentID] = useState("");
    const [moid, setId] = useState(null);

    const [pList, setPList] = useState([]);
    const [dataList, setListData] = useState([]);

    const [isAlive, setIsAlive] = useState(true);
    const [DID, setDId] = useState(null);
    const [
        shouldOpenConfirmationDialog,
        setShouldOpenConfirmationDialog,
    ] = useState(false);

    const handleTabChange = (e, value) => {
        setTabIndex(value);
    };
    const handleDialogClose = () => {
        setShouldOpenAddDialog(false);
        setShouldOpenConfirmationDialog(false);
        setParentID(null);
        setId(null);
        setIsAlive(true);
    };


    useEffect(() => {
        url.get('division').then(({ data }) => {
            setDivision(data);

        });

    }, [isAlive])
    const tabList = division.filter(obj => obj.name != "Manufacturing" && obj.name != "HQ ").map((item) => {
        return item.name
    });
    console.log("SDFFSdsdSd",tabList)
    console.log("SDFFSdsdSd",division)

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Module", path: "/modules" },
                        { name: "Module" },
                    ]}
                />
                <div className="text-right">
                    <Button
                        className="py-2"
                        color="primary"
                        variant="outlined"
                        onClick={e => setShouldOpenAddDialog(true)}
                    >
                        <Icon>add</Icon>
                        ADD NEW MODULE
                    </Button>
                </div>
            </div>
            <Tabs
                className="mt-4"
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
            >
                {tabList.map((item, ind) => (
                    <Tab className="capitalize" value={ind} label={item} key={ind} />
                ))}
            </Tabs>
            <Divider className="mb-6" />

            {division.filter(obj => obj.name != "Manufacturing" && obj.name != "HQ ").map((item, key) => {
            
                return (
                    tabIndex == key && <TradeModule id={item.id} />
                )
            })}

            {/* {tabIndex === 0 && <CustomerDetails />}
            {tabIndex === 1 && <CustomerInvoice />}
            {tabIndex === 2 && <CustomerLogs />} */}
            {shouldOpenAddDialog && (
                <AddDialog
                    handleClose={handleDialogClose}
                    open={shouldOpenAddDialog}
                    parentId={parentId}
                    div={division}
                    moid={moid}
                />
            )}
        </div>
    );
};

// const tabList = ["Details", "Invoices", "Logs"];

export default MainModule;
