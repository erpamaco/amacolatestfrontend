import React,{useState,useEffect} from 'react'

export default function Useeffect() {
    const [num1,setNum1] = useState(0);
    const [num2,setNum2] = useState(0);
    const [num3,setNum3] = useState(0);
  //   useEffect(()=>{
  //       alert("Hello world")
  // })
    useEffect(()=>{
        alert("Karthik")
  },[num2])


  return (
    <>

    <div><button onClick={(()=> {setNum1(num1 + 1)}, ()=>{alert('hello')})}>Click me {num1}</button></div>
    <div><button onClick={(()=> {setNum2(num2 + 1)})}>Button-{num2}</button></div>
    {/* <div><button onClick={(()=> {setNum3(num3 + 1)})}>Button2{num3}</button></div> */}
    </>
  )
}


