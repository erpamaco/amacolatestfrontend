import React,{useState,useEffect} from "react";
import { Button, Divider, Card,Icon, } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import Swal from "sweetalert2";
import Axios from "axios";
import {Container , Col,Row } from 'react-bootstrap'; 
import { useHistory, useParams } from 'react-router';

import url, { navigatePath } from "../../invoice/InvoiceService"
import EqEditorDialog from "./EqEditorDialog";
const EquipmentFiles = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const routerHistory = useHistory();

  const { id } = useParams();

  const foo = parseInt(params.get('id'));
  const [filesdisplay, setfilesdisplay] = useState([]);
  const [filesdisplayid, setfilesdisplayid] = useState([]);
  const pushdata = (idd) => {
    routerHistory.push(navigatePath + `/product/updateproduct/${idd}`)

  }
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [filesd, setFilesd] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  useEffect(() => {




    url.get(`getequipfiles/` + id).then(({ data }) => {
    

        setfilesdisplay(data);
    

    });
    return () => setIsAlive(false);

    
  }, [isAlive]);


  const handleOpen = (iddd) =>{
    setShouldOpenEditorDialog(true)
    setfilesdisplayid(iddd);
  }


  const removeData = (idd) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this equipment details!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`rental_equipment/${idd}`)
          .then(res => {


            Swal.fire(
              'Deleted!',
              ' equipment has been deleted.',
              'success'
            )
            routerHistory.push(navigatePath + `/rental/equipment/viewequipment`)

          })


        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your equipment is safe :)',
          'error'
        )
      }
    })

  }
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
   
    setIsAlive(true);
};
  return (
    <Card elevation={3}>
      <h5 className="p-4 m-0">IMAGES</h5>

      <Divider className="mb-4" />
      {filesdisplay == "" ? <>   <div className="">
   
   <p style={{textAlign:"center"}}>Sorry No Records Found..</p>
 
       </div></>:<><div className="flex-column items-start px-4 mb-4">
   
   <Row lg={2} >  
   
 
  
 {filesdisplay.map((item)=>{
     return <>
 
 {/* <Card.Img variant="top"  src={"http://localhost:3001/public/"+item?.flat_images[0]?.img} alt={item?.flat_images[0]?.img}/>   */}
 <img src={"https://www.amacoerp.com/test/amaco_test/public/"+item?.file_name} onClick={e => {handleOpen(item?.id)}} style={{width:"-4px",height:"182px",padding:"5px"}} />   
 
 </>
 })}
 
 
     </Row>  
 
         {shouldOpenEditorDialog && (
                 <EqEditorDialog
                     handleClose={handleDialogClose}
                     open={shouldOpenEditorDialog}
                     eid={filesdisplayid}
                     filesd={filesd}
                    
                 />
             )}
       </div></>}

      
    </Card>
  );
};

export default EquipmentFiles;
