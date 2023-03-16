import React, { useState, useEffect } from "react";
import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import url from "../../invoice/InvoiceService"
import { useParams } from "react-router-dom";


const EquipmentInfo = () => {
  
 
  const { id } = useParams();
  

  const [equipmentList, setequipmentList] = useState(false);

  useEffect(() => {

  /* API PRODUCTS List*/
    url.get("rental_equipment/" + id).then(({ data }) => {


      setequipmentList(data[0]);//Set the product List

    });

  }, []);




  return (

    <Card className="pt-6" elevation={3}>
      <div className="flex-column items-center mb-6">
      
        <h3 className="mt-4 mb-2">{equipmentList.equipment}</h3>

        <h5><small className="text-muted"><strong>Model:</strong>{equipmentList.model ? equipmentList.model : ' --'}</small></h5>
       
      </div>

      <Divider />
      <Table className="mb-4">
        <TableBody>


          <TableRow>
            <TableCell className="pl-4">Plate Number</TableCell>
            <TableCell>{equipmentList.plate ? equipmentList.plate : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Log Number</TableCell>
            <TableCell>{equipmentList.log_no ? equipmentList.log_no : '--'}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="pl-4" >Make</TableCell>
            <TableCell style={{ whiteSpace: 'unset', wordBreak: 'break-word' }}>{equipmentList.make ? equipmentList.make : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Comments</TableCell>
            <TableCell>{equipmentList.comments ? equipmentList.comments : '--'}</TableCell>
          </TableRow>


          <TableRow>
            <TableCell className="pl-4">Capacity</TableCell>
            <TableCell >{equipmentList.capacity ? equipmentList.capacity : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Manufactured Date</TableCell>
            <TableCell>{equipmentList.mfg_date ? equipmentList.mfg_date : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pl-4">Status</TableCell>
            <TableCell>{equipmentList.status ? equipmentList.status : '--'}</TableCell>
          </TableRow>
          
          
        </TableBody>
      </Table>

      
    </Card>
  );
};


export default EquipmentInfo;
