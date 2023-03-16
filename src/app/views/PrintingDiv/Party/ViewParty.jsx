import React, { useState, useEffect } from "react";
import { Breadcrumb,ConfirmationDialog } from "matx";
import MUIDataTable from "mui-datatables";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import FormDialog from "./partycontact"
// import MemberEditorDialog from "./partycontact"
import Tooltip from '@material-ui/core/Tooltip';
import url from "../../invoice/InvoiceService";
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    TableRow,
    Button
} from "@material-ui/core";
const columnStyleWithWidth = {
  top: "0px",
  left: "0px",
  zIndex: "100",
  position: "sticky",
  backgroundColor: "#fff",
  width: "300px",
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
const dummydata=[{
  firm_name:"AL-Ajmaeen Chemicals Produtc Factory",
  address:"889966,King Abdul-Aziz Road,Riyadh,Bahah12643",
  vat_no:"30006562065620056",
  contact:"96688997788",
  id:1
},
{
  firm_name:"Qatrat Hobar",
  address:"3545,AYthol,Dammam,Dammam,354645",
  vat_no:"30006562065620057",
  contact:"96688997788",
  id:2
}]
const ViewParty = () => {
    const [isAlive, setIsAlive] = useState(true);
    const [userList, setUserList] = useState([]);
    const [count, setCount] = useState(0);
    const [click, setClick] = useState([]); 
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
    const [
    shouldOpenConfirmationDialog,
    setShouldOpenConfirmationDialog,
  ] = useState(false);
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
   
  };

    useEffect(() => {
      // get the party Information
        url.get("parties").then(({ data }) => {
            if (isAlive) setUserList(data);
           
        });
        
       
        return () => setIsAlive(false);
    }, [isAlive]);
    
    
   // get the party Information
    function getrow(e) {
      url.get("parties").then(({ data }) => {
        if (isAlive) setUserList(data);
    });
    return () => setIsAlive(false);
    }
  
   
  

  

    
  
  

const columns = [
  {
    name: "id",
    label: "S.No.",
    options: {
    customHeadRender: ({index, ...column}) =>{
      return (
        <TableCell key={index} style={columnStyleWithWidthSno}>  
          <span style={{marginLeft:15}}>S.No.</span> 
        </TableCell>
      )
   },
  }
},
  {
    name: "firm_name",
    label: "Company Name",
    options: {
      
      customHeadRender: ({index, ...column}) =>{
        return (
          <TableCell key={index} style={columnStyleWithWidth}>  
            <span style={{paddingLeft:15}}>Company Name</span>
          </TableCell>
        )
     },
  },
},
{
  name: "address",
  label: "",
  options: {
    customHeadRender: ({index, ...column}) =>{
      return (
        <TableCell key={index} style={columnStyleWithWidth}>  
          <span style={{paddingLeft:15}}>Address</span>
        </TableCell>
      )
   },
},
},
 
  

{
  name: "vat_no",
  label: "VAT No",
  options: {
      filter: true,
  },
},
{
  name: "contact",
  label: "Contact",
  options: {
      filter: true,
  },
}, 


 
  {
    name: "id",
    label: "Action",
    options: {
        
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
           
            return (
              <span>
              <Link to={"/print_tab?id=" +tableMeta.rowData[5] }>
            
                <Tooltip title="Party contact details">
                <Icon color="primary">arrow_forward</Icon>
                </Tooltip>
            
            </Link>
            </span>
            
            
            )
            
        },
    },
},
];

    
  
  return ( 
    <div>
       <div className="m-sm-30">
      <div  className="mb-sm-30">
      <div className="flex flex-wrap justify-between">
          <Breadcrumb
            routeSegments={[
              // { name: "", path: "./Addparty" },
              { name: "Party" }
            ]}
          />
           {/* {shouldOpenEditorDialog && (
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
        )} */}
      
       
        <div className="text-right">
                <Link to={"/print_addparty"}>
                <Button
            className="py-2"
            color="primary"
            variant="outlined"
          >
          <Icon>add</Icon>
          Add New
          </Button>
          </Link>
          
          </div>
          </div>
          </div>
      <MUIDataTable
                title={"Party"}
                data={
                  dummydata.map((item, index) => {
                 
                   
                      return [
          
                        ++index,
                        item.firm_name,
                        // (item.post_box_no?item.post_box_no+",":'')+""+(item.street?item.street+",":'')+""+(item.city?item.city+", \n":'')+""+(item.proviance?item.proviance+",":'')+""+(item.zip_code?item.zip_code:''),
                        item.address,
                        item.vat_no,
                        item.contact,
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
   

export default ViewParty;
