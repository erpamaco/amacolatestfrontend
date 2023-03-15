import React from 'react'

export default function virtualdom() {
  // function Maths() {
  //   return <h1>Pass!</h1>;
  // }
  
  // function Science() {
  //   return <h1>Fail!</h1>;
  // }
  
  // function Exam(props) {
  //   const isGoal = props.isGoal;
  //   if (isGoal) {
  //     return <Maths/>;
  //   }
  //   return <Science/>;
  // }
  

  


  // --------------------------------------------


  function Garage() {
    
    return (
      <>
        <h1>Garage</h1>
        {cars.length >= 2 &&
          <h2>
            You have {cars.length} cars in your garage.
          </h2>
        }
      </>
    );
  }
  const cars = ['Ford','bmw'];
  return (
    <>
    {/* <div><Exam isGoal={true} /></div> */}
    <div><Garage cars={cars} /></div>
    </>
  )
}
