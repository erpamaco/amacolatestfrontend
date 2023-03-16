import React,{useEffect,useState} from 'react';
import {Icon,TableCell } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import url,{getpaidDivision} from '../invoice/InvoiceService';
import { Link } from "react-router-dom";
// import { database } from 'firebase';


const AccountStatement =()=>{

    const[accountStatement,setaccountStatement]=useState([]);
    useEffect(() => {
        getpaidDivision().then(({ data }) => {
    
            var arrVal = data.sort(function (obj1, obj2) {
              return obj1.type.localeCompare(obj2.type);
           });
           setaccountStatement(data)
        })
          
    }, [])

    const columns = [
        {
            name: "id", // field name in the row object
            label: "S.No.", // column title that will be shown in table
            options: {
               
                filter: true,
                customHeadRender: ({index, ...column}) =>{
                  return (
                    <TableCell key={index} width={50} style={{textAlign:"center"}} >  
                      <span style={{marginLeft:15}} >S.NO.</span> 
                    </TableCell>
                  )
               },
               setCellProps:()=>({
                 align:"center"
               })
            },
        },
        {
          name: "id", // field name in the row object
          label: "NAME", // column title that will be shown in table
          options: {
             
              filter: true,
              customHeadRender: ({index, ...column}) =>{
                return (
                  <TableCell key={index}  style={{textAlign:"center",textTransform:'uppercase'}} >  
                    <span  >NAME</span> 
                  </TableCell>
                )
             },
             setCellProps:()=>({
              align:"center"
            })
          },
      },
      {
        name: "id", // field name in the row object
        label: "DESIGNATION", // column title that will be shown in table
        options: {
           
            filter: true,
            customHeadRender: ({index, ...column}) =>{
              return (
                <TableCell key={index} className="pr-2" style={{textAlign:"right"}} >  
                  <span >BALANCE</span> 
                </TableCell>
              )
           },
           setCellProps:()=>({
           align:'right'
          })
        },
      },
      {
        name: "id", // field name in the row object
        // label: "DESIGNATION", // column title that will be shown in table
        options: {
           
            filter: true,
            customHeadRender: ({index, ...column}) =>{
              return (
                <TableCell key={index}  style={{textAlign:"center"}} >  
                  <span >STATUS</span> 
                </TableCell>
              )
           },
           customBodyRender: (value, tableMeta, updateValue) => {
           
            return (
             <div className="pr-8" style={{textAlign:'center'}}>
             {tableMeta.rowData[2].replace(/,/g, '')< 0 ? (
                          
                          <Icon size="small" color="error">arrow_downward</Icon>
                         
                        ) : (
                          
                            <Icon size="small" style={{color:"#08ad6c"}}> arrow_upward</Icon>
                          
                        )
                      }
            </div>
            
            )
            
        },
        },
      },
      ]

return(

    <div>
     {localStorage.getItem('division') == 5 ? <></> : <><MUIDataTable
        title="ACCOUNT STATEMENT"
        data={
          accountStatement.map((item, index) => {
           
           
              return [
        
                ++index,
                item.name?.toUpperCase(),
                parseFloat(item?.balance).toLocaleString(undefined,{
                  minimumFractionDigits:2
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
        /></>}
        
    </div>
)



}
export default  AccountStatement;