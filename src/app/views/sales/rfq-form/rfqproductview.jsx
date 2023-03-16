import React, { useState, useEffect } from "react";
import { Breadcrumb,ConfirmationDialog } from "matx";
import MUIDataTable from "mui-datatables";
import { Icon,Card } from "@material-ui/core";
import { Link } from "react-router-dom";

import url from "../../invoice/InvoiceService"
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import AnalysisForm from "./analysisform";
import {
    IconButton,
    Button
} from "@material-ui/core";


const SimpleMuiTable = () => {
    const [isAlive, setIsAlive] = useState(true);
    const [productList, setproductList] = useState([]);
    const [analysisList, setanalysisList] = useState([]);
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  let search = window.location.search;
    let params = new URLSearchParams(search);
    const id =parseInt(params.get('id'));
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
   
  };

 

    useEffect(() => {
     
        url.get("products/"+id).then(({ data }) => {
            if (isAlive) setproductList(data[0]);
            
          
            
        }); 
        url.get("analyse/"+id).then(({ data }) => {
          if (isAlive) setanalysisList(data[0].analyses_details);
         
          
      }); 
       
      
        return () => setIsAlive(false);
    }, [isAlive]);
    
  
    
  
   
 
    
 
  
const columns = [
  {
      name: "id", // field name in the row object
      label: "Brand", // column title that will be shown in table
      options: {
          filter: true,
      },
  },
  {
      name: "name",
      label: "Description",
      options: {
          filter: true,
      },
  },
  {
      name: "description",
      label: "Vendor",
      options: {
          filter: true,
      },
  },
  {
    name: "unit_price",
    label: "Unitprice",
    options: {
        filter: true,
    },
},
  

];

    
  
  return ( 
    <div>
      <div  className="m-sm-30">
      <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "View", path: "/sales/rfq-form/rfqview" },
              { name: "Analysis" }
            ]}
          />
        </div> 
        
          {shouldOpenEditorDialog && (
          <AnalysisForm
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
         <Card elevation={3}>
        <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
        <Link to="/sales/rfq-form/rfqview"> 
          <IconButton > 
            <Icon>arrow_back</Icon>
          </IconButton>
        </Link> 
        <div>
        <div className="text-right">
               
               <Button
           className="py-2"
           color="primary"
           variant="outlined"
             onClick={() => {
             setShouldOpenEditorDialog(true);
           }}
         >
           <Icon>add</Icon>add new
         </Button>
        
         </div>
        </div>
      </div>

      <div id="print-area">
        <div className="viewer__order-info px-4 mb-4 flex justify-between">
          <div>
            <h5 className="mb-2">Product Name:</h5>
            <span><p>{productList.name}</p></span>
            <h5 className="mb-2">Description:</h5>
            <p className="mb-0">{productList.description}</p>
          </div>
        </div>
        <div className="viewer__order-info px-4 mb-3 flex justify-between">
      <MUIDataTable
                columns={columns}
                data={analysisList.map((item, index) => {
         
                  return [
                    item.brand_name,
                    item.description,
                    item.party[0].fname,
                    item.unit_price,
                  ]
                
              })}
                options={{
                    filterType: "textField",
                    responsive: "simple",
                    selectableRows: "none", // set checkbox for each row
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                }}
            />
            </div>
        
    </div>
    </Card> 
    </div>
    </div>
  ); } 
   

export default SimpleMuiTable;
