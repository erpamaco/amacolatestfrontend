import React,{useEffect,useState} from 'react'
import url from '../../views/invoice/InvoiceService';

function PrintFooter() {
  const [state, setstate] = useState([])
  useEffect(() => {
   url.get('company').then(({data})=>{
    //  console.log(data)
     setstate(data[0])
   })
  }, [ ])
    return (
        <footer style={{visibility: "hidden" }}>
            
          <div >
        <div id="outer"  class="outer" style={{"position": "relative", width:'1050px', backgroundColor:'#c1c1c1',"transform": "skew(-20deg)",marginLeft:'40px',marginRight:'50px'}}>
        <p style={{color:'#fff',paddingTop:5,paddingBottom:5,"transform": "skew(20deg)"}} align="center">  P.O.Box 7452 | Jubail 35518 | Kingdom of Saudi Arabia</p>
        <div id="spacer" style={{width: "200px", height: "10px", marginRight:0,}}></div>
        <div style={{"position": "fixed", bottom: 0, width: "100%", height: 30, backgroundColor:"#1d2257",}}> 
        {/* <p   style={{textAlign: 'center',color:'white',fontFamily: "Calibri",paddingTop:5,paddingBottom:10,"transform": "skew(20deg)"}}>E-mail: {state.email} | Website: {state.website}</p> */}
        </div>
    </div> 
           </div>
  
            </footer>
          
    )
}

export default PrintFooter
