import React,{useState} from 'react'

export default function State() {
    const [color,setColor] = useState("red");

    const [car,newCar] = useState("BMW");

    const [brand,setBrand] = useState("Ford");
    const [model,setModel] = useState("Mustang");
    const [color1,setColor1] = useState("Blue");
    const [year,setYear] = useState("1964");

    //...............useState using Objects..................................
    const [car2,setCar2] = useState({
        brand : "Mercedece Benze",
        model : "GLC",
        year : "2000",
        color : "White"
    });
   

    //.................using Spread operator......................................
    const [car3,updatedCar] = useState({
        brand : "Mercedece Benze",
        model : "GLC",
        year : "2000",
        color : "White"
    });

    const newColor = () => {
        updatedCar(colour => {
            return {...colour,color: "green"}
        })
    
    }


  return (
    <>
        <div style={{marginLeft:"400px",marginRight:"300px",marginTop:"100px",border:"3px solid",padding:"30px",textAlign:"center",borderRadius:"30px"}}>
            <div>
                <h1>My favorite colour is {color}</h1>
                <button type='button' onClick={()=> setColor("blue")} >Blue</button>
                <button type='button' onClick={()=> setColor("yellow")}>Yellow</button>
                <button type='button' onClick={()=> setColor("green")}>Green</button>
                <button type='button' onClick={()=> setColor("aqua")}>Aqua</button>
            </div>
    
            {/* //............................................................................ */}

            <div>
                <h1>Who is in my garage {car}</h1>
                <button type='button' onClick={()=> newCar("Benze")}>Benze</button>
                <button type='button' onClick={()=> newCar("Ferrari")}>Ferrari</button>
                <button type='button' onClick={()=> newCar("Audi")}>Audi</button>
                <button type='button' onClick={()=> newCar("Tesla")}>Tesla</button>
            </div>

            {/* //.............................................................................. */}

            <div>
                <h1>My {brand}</h1>
                <p>It is a {color1} {model} from {year}.</p>
            </div>
            {/* //....................................using Objects....................................... */}

            <div>
            <h1>My {car.brand}</h1>
                <p>It is a {car.color} {car.model} from {car.year}.</p>
            </div>
            {/* //................................................................. */}

            <div>
            <h1>My {car3.brand}</h1>
                <h1><button onClick={newColor}>Green</button></h1>
                <p>It is a {car3.color} {car3.model} from {car3.year}.</p>
            </div>
                
                
            </div>

   
    </>
  )
}
