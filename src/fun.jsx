import React from 'react'

export default function fun() {
    const Hello = (v)=>{
        return alert("hello this is arrow function" +v)
    }
    const a="variable"


  return (
    <div>
        <button onClick={()=>alert("Youname")}>Click Here</button>
    </div>
  )
}




