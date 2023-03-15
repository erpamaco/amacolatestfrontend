import React from 'react'

export default function ternary() {
  // const a = "hello";
  const click = (val) => {
    { val == "Right" ? alert("u have clicked on right button") : alert("u have clicked on left button") }

  }
  // let value1="Right"
  // let value2="Left"

  // const a = 11
  // if(a<10){
  //   alert("a is smaller then 10")
  // }
  // else{
  //   alert("a is larger then 10")
  // }

  // {a<10 ? alert("a is smaller then 10") : alert("a is larger then 10")}





  let aa = true

  if (aa = true) {
    alert("a is true")
  }
  else {
    alert("a is false")
  }
  {aa ? alert("a is true"): alert("a is false") }

  const msg = "Hello"

  return (
    <>
      {aa ? <h1>True</h1> : <h1>False</h1>}

















      {/* <div>
    {a == "Right" ? 
    <>
    <h1 style={{color:"blue"}}>Right</h1>
  
    </> 
    : 
    <>
    <h1 style={{color:"red"}}>Left</h1>
    </> }
    </div> */}



      <div>

        {/* <input type="submit" onClick={()=>click(value1)} value="Right"/>
      <input type="submit" onClick={()=>click(value2)} value="Left"/> */}

        <button onClick={() => click("Right")}>Right</button>
        <button onClick={() => click("Left")}>Left</button>


        {msg == "Hello" ?
          <h1 style={{ color: "red" }}>Hello World</h1>
          :
          <h1 style={{ color: "blue" }}>Hello World</h1>
        }

      </div>

    </>

  )
}





