import React from 'react'
import { useState, useEffect } from "react";

export default function UseEffect() {

  const [name, setName] = useState("Rahul");

  const [second, setSecond] = useState(0);
  const [min, setMin] = useState(0);
  const [hr, setHr] = useState(0);

  // useEffect(()=>{
  //   alert("hello")
  // },[name])

  useEffect(()=>{
    if(hr==24){
      setHr(0)
      setMin(0)
      setSecond(0)
    }
    if(min==60){
      setHr(hr+1)
      setMin(0)
    }
    if(second==60){
      setMin(min+1)
      setSecond(0)
      } 
      setTimeout(()=>{
        setSecond(second+1)
      },1000)
  })












const [color, setColor] = useState('red')



// const ChangeColor=()=>{
//   setColor("green")
// }

  return (
    <div>
      <h1 style={{backgroundColor:color}}>
      {color}
      </h1>
      <button onClick={()=>setColor("green")}>Change color</button>






















      {name} <br/><br/>
        <button onClick={()=>setName("Kiran")}>Change</button> <br/><br/>
        <h1>Hours: {hr} # Min: {min} # Seconds: {second}</h1>
  
    </div>
  )
}








// const [count, setCount] = useState(0);
// const [sqrt, setSqrt] = useState(0)

// useEffect(() => {
//   setSqrt(count * count)
// }, [count])




{/* <Timer/>
      Sqrt = {sqrt}<br />
      <button onClick={() => setCount(count + 1)}>Count - {count}</button><br/>
      {time} */}

















{/* <h1>My Favorite Color is{color?<div style={{color:color}}>{color.toUpperCase()}</div>:<> Select any Color</>}</h1>

<button onClick={()=>setColor("green")}>Green</button> <br/><br/>
<button onClick={()=>setColor("red")}>Red</button> <br/><br/>
<button onClick={()=>setColor("orange")}>Orange</button> <br/><br/>
<button onClick={()=>setColor("blue")}>Blue</button> <br/><br/> */}









  // useEffect(()=>{
  //   alert("UseEffect 2")
  // },[count])

  
  // const [time, setTime] = useState(0)

  // setTimeout(() => {
  //   setTime(time + 1);
  // },1000);









    // function Timer() {
  //     const [count, setCount] = useState(0);

  //     useEffect(() => {
  //       setTimeout(() => {
  //         setCount((count) => count + 1);
  //       }, 1000);
  //     });

  //     return <h1>I have rendered {count} times!</h1>;
  //   }