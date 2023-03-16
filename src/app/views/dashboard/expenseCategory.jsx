import React,{useEffect,useState} from 'react';
import {Icon,TableCell } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import url from '../invoice/InvoiceService';
import { Link } from "react-router-dom";


const ExpenseCategory =()=>{

    const[accountStatement,setaccountStatement]=useState([]);
    var obj;
    var parentData;
    useEffect(() => {
        url.get("accountCategory")//api returns the account categorys
    .then(response => response)
    .then(data => obj = data)
    .then(() => 
        
    url.get(`expense_chart`).then(({ data }) => {
    parentData=obj.data.filter(item=>item.parent_id==null);
    
    
      var result = data[0].filter(function (o1) {
       
        return obj.data.some(function (o2,i) {
            if(o1.account_category_id === o2.id && o1.is_paid==1)
            {
              const variableOne = obj.data.filter(itemInArray => itemInArray.id === o2.id);

              o1['parent_account']=obj.data.find(itemInArray => itemInArray.id === variableOne[0].parent_id);
              o1['count']=data[0].filter(val=>val.account_category_id==o2.id).reduce((total,currentItem) =>  total = total + parseFloat(currentItem.amount) , 0 );
              return o1;
            } // return the ones with equal id
       });
       
      }) 
    
      // let pp = result.filter( (ele, ind) => ind === result.findIndex( elem => elem.account_category_id === ele.account_category_id))
    
   
    var filterResult=result.filter(o1 =>parentData.map(o2 => o1.parent_account.id === o2.id))
    setaccountStatement(filterResult.filter( (ele, ind) => ind === filterResult.findIndex( elem => elem.parent_account.id === ele.parent_account.id)))
     

     
    // console.log(result)

    


   }))
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
                    <span  >DESCRIPTION</span> 
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
                  <span >AMOUNT</span> 
                </TableCell>
              )
           },
           setCellProps:()=>({
            align:"right"
          })
        },
      },
      
      ]

return(

    <div>
     {localStorage.getItem('division') == 5 ? <></>: <>    <MUIDataTable
        title="EXPENSE STATEMENT"
        data={
          accountStatement.map((item, index) => {
           
           
              return [
        
                ++index,
                item?.name?.toUpperCase(),
                parseFloat(item?.count).toLocaleString(undefined,{
                  minimumFractionDigits:2
                }),
                
                
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
</>}
    
    </div>
)



}
export default  ExpenseCategory;