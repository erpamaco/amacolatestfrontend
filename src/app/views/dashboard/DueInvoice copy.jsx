import React,{useEffect,useState} from 'react';
import {Icon,TableCell } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import url, { navigatePath } from '../invoice/InvoiceService';
import { Link } from "react-router-dom";


const DueInvoice =()=>{

    const[accountStatement,setaccountStatement]=useState([]);
    useEffect(() => {
        url.post('all-account-statement').then(({ data }) => {
          try {
            const myArr = Object.values(data[0]?.data).sort(
              (a, b) => new Date(a[0]?.date) - new Date(b[0]?.date)
            );
             
           
                    
                   
            // var result =myArr.reduce((total,currentItem) =>  total = total + parseFloat(currentItem[0][0].grand_total) , 0 );
           var result= myArr.map((item,i)=>{
              item['debit']= myArr.filter(x => x[0].party_id==item[0].party_id).reduce((result, item) => result + item[0].debit, 0);
              item['credit']= myArr.filter(x => x[0].party_id==item[0].party_id).reduce((result, item) => result + item[0].credit, 0);
              return item
            })
            var Due=result.filter( (ele, ind) => ind === result.findIndex( elem => elem[0].party_id === ele[0].party_id));
            
      
                
            
             
          
            
            setaccountStatement(Due)
            
        
           
          } catch (error) {
            
          }
          //   const myArr = Object.values(data[0]?.data).sort(
          //     (a, b) => new Date(a[0]?.date) - new Date(b[0]?.date)
          //   );
             
           
                    
                   
          //  var result= myArr.map((item,i)=>{
          //     item['debit']= myArr.filter(x => x[0].party_id==item[0].party_id).reduce((result, item) => result + item[0].debit, 0);
          //     item['credit']= myArr.filter(x => x[0].party_id==item[0].party_id).reduce((result, item) => result + item[0].credit, 0);
          //     return item
          //   })
          //   var Due=result.filter( (ele, ind) => ind === result.findIndex( elem => elem[0].party_id === ele[0].party_id));
            
      
                
            
             
          
            
          //   setaccountStatement(Due)
            
          });
           
    }, [])

    const columnsDue = [
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
                  <TableCell key={index}  style={{textAlign:"center"}} >  
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
            align:"right"
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
             
                          
                          <Link to={navigatePath+"/customer_account/"+tableMeta.rowData[3]}>
                 
                    <Icon color="primary">remove_red_eye</Icon>
              
                </Link>
                        
                  
            </div>
            
            )
            
        },
        },
      },
      ]

return(

    <div>
        <MUIDataTable
        title="DUE STATEMENTS"
        data={
          accountStatement.map((item, index) => {
           
           
              return [
        
                ++index,
                item[0].party?.firm_name?.toUpperCase(),
                parseFloat(item?.debit-item?.credit).toLocaleString(undefined,{
                  minimumFractionDigits:2
                }),
                item[0].party?.id
                
              ]
            
          })
        }
          columns={columnsDue
          }
          options={{
            filterType: "textField",
            responsive: "simple",
            selectableRows: "none",
            filter: true,
            rowsPerPage: 5,
           
            
             
            rowsPerPageOptions: [5, 10, 25]
        }}
        />

    </div>
)



}
export default  DueInvoice;