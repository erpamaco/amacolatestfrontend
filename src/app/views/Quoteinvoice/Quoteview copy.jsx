{/* <div style={{position:'relative',top:'-9px',pageBreakInside: 'avoid',}}>
<div className="flex justify-between" style={{borderTop: "1px solid #ccc",borderLeft: "1px solid #ccc",borderRight: "1px solid #ccc",marginRight:'16px',marginLeft:'16px'}}>
 <div className="px-4 flex justify-between" style={{ fontFamily: "Calibri" ,paddingTop:'10px'}}>
             <div className="flex">
               <div className="pr-12">
                 <TableRow>
                   <td>
                     <h5 className="font-normal ">
                       <strong>BANK DETAILS</strong>{" "}
                     </h5>
                   </td>
                 </TableRow>
                 <tr style={{ fontSize: '11pt', textAlign: 'left' }} >
                   <td><strong>Bank Name</strong></td>
                   <td >{bank?.bank_name}</td>
                 </tr>
                 <tr style={{ fontSize: '11pt', textAlign: 'left' }}>
                   <td ><strong>Account No</strong></td>
                   <td >{bank?.acc_no}</td>
                 </tr>
                 <tr style={{ height: 5, fontSize: '11pt', textAlign: 'left' }}>
                   <td ><strong>IBAN No</strong></td>
                   <td >{bank?.iban_no}</td>
                 </tr>
               </div>
             </div>
   </div>
   <div className="printClass" style={{width:'37.4%'}}>
     <Table>
       <TableBody>
         <TableRow>
           <TableCell className="pr-0 newWidth" align="center"  style={{height:'54px',width:'217px',borderLeft:'1px solid rgb(204, 204, 204)',wordBreak:'break-word',fontFamily:'Calibri',fontSize:'11pt'}}>SUB TOTAL</TableCell>
           <TableCell className="pl-0 " align="center"  style={{borderLeft:'1px solid rgb(204, 204, 204)',wordBreak:'break-word',fontFamily:'Calibri',fontSize:'11pt'}}>
           <div>
             <div style={{ float: "left" }} className="pl-10">SAR</div>
             <div style={{ float: "right" }}>
               {parseFloat(total_value).toLocaleString(undefined, { minimumFractionDigits: 2 })}

             </div>
             <div style={{ clear: "left" }} />
           </div>

           </TableCell>
         </TableRow>
         <TableRow>
           <TableCell className="pr-0 " align="center"  style={{height:'54px',borderLeft:'1px solid rgb(204, 204, 204)',borderBottom:'1px solid white',wordBreak:'break-word',fontFamily:'Calibri',fontSize:'11pt'}}>TOTAL VAT AMOUNT (15%)</TableCell>
           <TableCell className="pl-0 " align="center"  style={{borderLeft:'1px solid rgb(204, 204, 204)',borderBottom:'1px solid white',wordBreak:'break-word',fontFamily:'Calibri',fontSize:'11pt'}}>
           <div>
             <div style={{ float: "left" }} className="pl-10">SAR</div>
             <div style={{ float: "right" }}>
               {isNaN(parseFloat(vat_in_value)) ? 0.00 : parseFloat(vat_in_value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
             </div>
             <div style={{ clear: "left" }} />
           </div>
           </TableCell>
         </TableRow>
       </TableBody>
     </Table>
   </div>
 </div>
 <div className="flex justify-between" style={{border: "1px solid #ccc",marginRight:'16px',marginLeft:'16px'}}>
<div className="px-4 flex justify-between" style={{paddingTop:'10px'}}>
             <div className="flex">
               <div className="pr-12" style={{ wordBreak: 'break-word', fontSize: '11pt' }}>

                 <strong>TOTAL IN WORDS</strong><br></br>{ress}
               </div>
             </div>
           </div>
           <div className="printClass" style={{width:'37.4%'}}>
     <Table>
       <TableBody>
         <TableRow>
           <TableCell className="pr-0 newWidth" align="center"  style={{height:'72px',width:'217px',borderLeft:'1px solid rgb(204, 204, 204)',wordBreak:'break-word',fontFamily:'Calibri',fontWeight:'700',fontSize:'14pt'}}>                       
                <strong>GRAND TOTAL</strong>
</TableCell>
           <TableCell className="pl-0 " align="center"  style={{borderLeft:'1px solid rgb(204, 204, 204)',wordBreak:'break-word',fontFamily:'Calibri',fontSize:'14pt'}}>
           <div>
             <div style={{ float: "left" }} className="pl-10">SAR</div>
             <div style={{ float: "right" }}>
               <strong>{parseFloat(net_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>

             </div>
             <div style={{ clear: "left" }} />
           </div>

           </TableCell>
         </TableRow>
       
       </TableBody>
     </Table>
   </div>
</div>
</div> */}