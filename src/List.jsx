import React from 'react'

export default function List() {

  function Car(props) {
    return <li>I am a {props.brand}</li>;
  }

  function Garage() {
    const cars = ['Ford', 'BMW', 'Audi'];
    return (
      <>
        <h1>Who lives in my garage?</h1>
        <ol>
          {cars.map((item, index) => <Car key={index} brand={item} />)}
        </ol>
        <h1>finish</h1>
      </>
    );
  }





  function Print(props) {
    return <h2>{props.value}</h2>
  }

  let a = [1, 2, 3, 4, 5]
  return (

    <div >
      
      {a.map((b,index) => <Print key={index} value={b} />)}

      {<Garage />}
    </div>

  )
}
