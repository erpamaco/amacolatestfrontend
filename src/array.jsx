import React from 'react'

export default function array() {
    // const Value2=(val)=>{
    //     return <h1>{val.value}</h1>
    // }
    // function Output(v){
    //     return <h2>{v}</h2>
    // }


  //   const a = [1,2,3,4,5]
    
  // return (
  //   <div>{a.map((val)=> <h3>{val}</h3> )}</div>
  // )




// const myArray = ['apple', 'banana', 'orange'];

// const myList = myArray.map((item) => <p>{item}</p>)

 



// import React from 'react'

// export default function array() {
//     // const Value2=(val)=>{
//     //     return <h1>{val.value}</h1>
//     // }
//     // function Output(v){
//     //     return <h2>{v}</h2>
//     // }


    const a = [1,2,3,4,5,6]

    const Function = (val) =>{
      return <h1>{val}</h1>
    }
    
    
  return (
    <>
    <div>{a.map((item)=>{ return Function(item)})}</div>
    
    </>
  )
}






//    * 0. Apple
//    * 1. Banana
//    * 2. Orange
//    * 3. Mango
//    * 4. Papaya






