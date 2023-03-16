import React, { useState, useEffect } from "react";
import { Breadcrumb,ConfirmationDialog } from "matx";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Adddivision from "../expense/customers/customer-form/Adddivision";
import Tooltip from '@material-ui/core/Tooltip';
import url from "../invoice/InvoiceService";
import {
    TableCell,
    Button
} from "@material-ui/core";
const columnStyleWithWidth = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  textAlign:'center',
  width: "400px",
  wordBreak: "break-word",
  wordWrap: "break-word",
  overflowWrap:"break-word",
  hyphens:"auto"
}
const columnStyleWithWidthSno = {
  top: "0px",
  left: "0px",
  zIndex: "50",
  position: "sticky",
  backgroundColor: "#fff",
  width: "50px",
}


const Division = () => {
    const [isAlive, setIsAlive] = useState(true);
    const [DivisionList, setDivisionList] = useState([]);
   
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const [divid, setdivid] = useState();
    const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const handleDialogClose = () => {
      setdivid('')
    setShouldOpenEditorDialog(false);
   
  };
  const handleChange = (id) => {
      setdivid(id)
    setShouldOpenEditorDialog(true);
   
  };


  
    useEffect(() => {
      // get the party Information
        url.get("division").then(({ data }) => {
            if (isAlive) setDivisionList(data);
           
        });
        

        
       
        return () => setIsAlive(false);
    }, [isAlive]);
    
  
      
     
   // get the party Information
    
  
   
  

  

    
  
  

const columns = [
  {
    name: "id",
    label: "S.NO.",
    options: {
    customHeadRender: ({index, ...column}) =>{
      return (
        <TableCell key={index} style={columnStyleWithWidthSno}>  
          <span style={{marginLeft:15}}>S.NO.</span> 
        </TableCell>
      )
   },
  }
},
  {
    name: "firm_name",
    label: "DIVISION NAME",
    options: {
      
      customHeadRender: ({index, ...column}) =>{
        return (
          <TableCell key={index} style={columnStyleWithWidth} inputProps={{style: {textTransform: 'capitalize'}}}>  
            <span style={{paddingLeft:15}}>DIVISION NAME</span>
          </TableCell>
        )
     },
     setCellProps:()=>({
      align:"center",
      paddingLeft:20
    })
  },
},
{
  name: "vat_no",
  label: "OPENING BALANCE",
  options: {
      filter: true,
      customHeadRender: ({index, ...column}) =>{
        return (
          <TableCell key={index}  className="pr-2" style={{textAlign:"right"}} >  
            <span>OPENING BALANCE</span>
          </TableCell>
        )
     },
     setCellProps:()=>({
      align:"right",
      paddingLeft:20
    })
     
  },
  
  
},



 
  {
    name: "id",
    label: "ACTION",
    options: {
        
        filter: true,
        customHeadRender: ({index, ...column}) =>{
          return (
            <TableCell key={index} style={{textAlign:"right"}}  className="pr-8">  
              <span >ACTION</span>
            </TableCell>
          )
       },
        customBodyRender: (value, tableMeta, updateValue) => {
           
            return (
              
              <div
            style={{
              textAlign: "end",
              
            }}
            className="pr-8"
          >
              
              <Button style={{textAlign:"right",paadingRight:20}} onClick={()=>handleChange(tableMeta.rowData[3])}>
            
                <Tooltip title="Party contact details">
                <Icon color="secondary" style={{textAlign:"right"}}>edit</Icon>
                
                </Tooltip>
            
            </Button>
           </div>
         
            
            
            )
            
        },
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
               
                <Button
            className="py-2"
            color="primary"
            variant="outlined"
            onClick={()=>setShouldOpenEditorDialog(true)}
          >
          <Icon>add</Icon>
          ADD NEW
          </Button>
         
          
          </div>
          </div>
        
      <MUIDataTable
                // title={"DIVISION"}
                data={
                  DivisionList.map((item, index) => {
                    // console.log(item)
                   
                      return [
          
                        ++index,
                        item.name,
                       
                        item.opening_bal?parseFloat(item.opening_bal).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          }):"0.00",
                        item.id,
                      ]
                    
                  })
                }
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
  
  ); } 
   

export default Division;
