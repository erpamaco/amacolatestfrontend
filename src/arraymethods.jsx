import React from 'react'

export default function arraymethods() {
  const fruits = ["apple","banana","orange"]

  const array = [1,2,3,4,5]
  const [a1,a2,...rest] = array
  
const Click=(name)=>{
  alert("hello " +name);
}
  const name = "Rahul"
  return (
    <div>
      <button onClick={()=>Click(name)}>Click Here</button>
    </div>
  )
}


