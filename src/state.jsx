import React, { useState } from "react";




export default function Mui() {
    const [state, setState] = useState("colors");


    
  return (
    <div>

    {state}

    <button onClick={()=> setState("Green")}>Green</button>
    <button onClick={()=> setState("Yellow")}>Yellow</button>
    <button onClick={()=> setState("White")}>White</button>
    
    </div>
  )
}
