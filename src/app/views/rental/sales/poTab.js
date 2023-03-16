import React, { useState,useEffect } from "react";
import { Divider, Card,Tab, Tabs,  Button } from "@material-ui/core";
import { Breadcrumb,ConfirmationDialog } from "matx";
import { Icon } from "@material-ui/core";
import { Link,useParams } from "react-router-dom";

import { navigatePath } from "app/views/invoice/InvoiceService";

import id from "date-fns/esm/locale/id/index.js";
import SimpleMuiTable from './Newinvoiceview';
import Potrash from './Potrash';
import POhistory from './POhistory';

const PoTab = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  
  const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
   
  };

  const handleDeleteUser = (user) => {
    
    setShouldOpenConfirmationDialog(true);
  };

  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };
  const colorset = (tabIndex) => {
    
    if(tabIndex==0)
    return "dark"
    if(tabIndex==1)
    return "dark"
    if(tabIndex==2)
    return "#008000"
    if(tabIndex==3)
    return "rgba(255,0,0,1)"
    if(tabIndex==4)
    return "secondary"
    if(tabIndex==5)
    return "primary"
  };


  const getBackgroundColor = (ind) => {
    if(ind == 0){
      return '#00000014'
    }else if(ind == 1){
      return '#00000014'
    }else if(ind == 2){
      return '#00800029'
    }else if(ind == 3){
      return '#ff00001c';
    }else if(ind == 4){
      return '#ffaf3829';
    }else if(ind == 5){
      return '#1976d21f';
    }
  }

  const { t } = useParams();
  useEffect(() => {

    setTabIndex(parseInt(t))
    // return t
    
  }, [ ])
  

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
      <div className="viewer_actions px-4 flex justify-between">
      <Breadcrumb
          routeSegments={[
            // { name: "Add new", path: "/sales/rfq-form/Rfqform" },
            { name: "PURCHASE ORDER" },
          ]}
        />

        <div className="text-right">
        <Link to={"/quickPo"}>
                  <Button
                    className="py-2"
                    variant="outlined"
                    color="primary"
                  >
                    <Icon>add</Icon> GENERATE PURCHASE ORDER
                  </Button>
                </Link>
        </div>
      </div>
      </div>
      {/* <div>
      {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
          />
        )}
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            text="Are you sure to delete?"
          />
        )}
      </div> */}
      <Card>
      <Tabs
        className="mt-4"
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor={colorset(tabIndex)}
        textColor={colorset(tabIndex)}
        TabIndicatorProps={{style: {background: tabIndex==0? 'black':tabIndex==1 ? 'black' : tabIndex==2 ?  '#008000' : tabIndex == 3 ? 'rgba(255,0,0,1)' : tabIndex == 4 ? '#FFAF38': tabIndex == 5 ? '#1976d2' : '' }}}
      >
        {tabList.map((item, ind) => (
          <Tab className="capitalize" style={{borderBottom:(tabIndex==ind?`2px solid ${colorset(tabIndex)}`:" "),
          // color:(tabIndex==ind?colorset(tabIndex):"")
          color:item == 'All' ? 'black' : item == 'NEW' ? 'black' : item == 'HISTORY' ? '#008000' : item == 'TRASH' ? 'rgba(255,0,0,1)' : item == 'DRAFT' ? '#FFAF38' : item == 'QUOTATION HISTORY' ? '#1976d2' : '' ,
          // backgroundColor:item == 'All' ? 'black' : item == 'NEW' ? 'black' : item == 'ACCEPTED QUOTATION' ? '#008000' : item == 'TRASH' ? 'rgba(255,0,0,1)' : item == 'DRAFT' ? '#FFAF38' : item == 'QUOTATION HISTORY' ? '#1976d2' : '' ,
          backgroundColor:ind == tabIndex ? getBackgroundColor(tabIndex) : ''

        }} value={ind} label={item} key={ind} />
        ))}
      </Tabs>
      <Divider className="mb-6" />

      {tabIndex == 0 && <SimpleMuiTable />}
      {tabIndex == 1 && <Potrash tabIndex={tabIndex} />}
      {tabIndex == 2 && <POhistory tabIndex={tabIndex} />}
      </Card>
       
    </div>
  );
};

const tabList = ["ALL","TRASH","HISTORY"];

export default PoTab;
