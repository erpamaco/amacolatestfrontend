import React from "react";
// import PageTitle from "../PageTitle/PageTitle";
import MUIDataTable from "mui-datatables";
import { useState } from "react";
// import Dialog from "./Dialog";
import { useEffect } from "react";
// import api from "../../Global";
import { TableCell } from "@mui/material";
import * as Icons from "@material-ui/icons";

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useParams, useHistory } from "react-router-dom"; 
import {Container ,Card, Col,Row, Button} from 'react-bootstrap';  
// import aj from './aj.jpg';  
function App(productList1) {  
    console.log("itemmm",productList1)

  return (  
    <div className="App">  
   <Container className='p-4'>  
  <Row lg={5}>  

 


<Card style={{width:"25%",marginLeft:"13px"}}> 

{/* <Card.Img variant="top"  src={"http://localhost:3001/public/"+item?.flat_images[0]?.img} alt={item?.flat_images[0]?.img}/>   */}
<Card.Img variant="top"  src="https://www.supernovagenset.com/img/products/supernova_euro_series.jpg"/>  
<Card.Body>  
  {/* <marquee style={{backgroundColor:"black",opacity:"0.7",color:"white"}}><Card.Title>ewrwrwr</Card.Title></marquee>   */}
  <Card.Text>  
        <h5 style={{display:"flex"}}>Model No: &nbsp;<span style={{color:"green"}}>Sv929322</span></h5>
    </Card.Text>  
  <Button variant="primary"  >View More</Button>  
</Card.Body>  
</Card>  

<Card style={{width:"25%",marginLeft:"13px"}}> 

{/* <Card.Img variant="top"  src={"http://localhost:3001/public/"+item?.flat_images[0]?.img} alt={item?.flat_images[0]?.img}/>   */}
<Card.Img variant="top"  src="https://www.supernovagenset.com/img/products/supernova_euro_series.jpg"/>  
<Card.Body>  
  {/* <marquee style={{backgroundColor:"black",opacity:"0.7",color:"white"}}><Card.Title>ewrwrwr</Card.Title></marquee>   */}
  <Card.Text>  
        <h5 style={{display:"flex"}}>Model No: &nbsp;<span style={{color:"green"}}>Sv929322</span></h5>
    </Card.Text>  
  <Button variant="primary"  >View More</Button>  
</Card.Body>  
</Card>  
   







    


  {/* <Card>  
  <Card.Img variant="top"  src={aj} />  
  <Card.Body>  
    <Card.Title>Card Title</Card.Title>  
    <Card.Text>  
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae molestie magna. Vivamus sed molestie enim, eu convallis mauris. Aliquam pharetra velit ac enim maximus, a commodo augue hendrerit. Phasellus at aliquam est  
    </Card.Text>  
    <Button variant="primary">Read More</Button>  
  </Card.Body>  
</Card>   */}
    </Row>  
</Container>  
    </div>  
  );  
}  
export default App;