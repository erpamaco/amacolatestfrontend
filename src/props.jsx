import React from 'react'

export default function props(props) {
  function Car(props) {
    return <h2>I Have {props.brand},{props.year}</h2>;
  }


  const value = "BMW";
  const myElement = <Car name={value} />


  // <Car name={value} />






















  // ---------------------------------
  function Hero(props) {
    return <h2>I am a {props.brand}!</h2>;
  }

  function Demo(props) {
    return (
      <>
        <h1>Who is in my team?</h1>
        <Hero brand={props.id} />
      </>
    );
  }
  <Demo id="Rahul" />
  // <intput name="email" style={{}} type="text"/>






















  //   --------------------------------

  function Vehicle(props) {
    return <h2>{props.brand}!</h2>;
  }

  function Showroom() {
    const carName = "BMW";
    return (
      <>
        <h1>Who lives in my garage?</h1>
        <Vehicle brand={carName} />
      </>
    );
  }
















  //  object  

  function College(props) {
    return <h2>I am a {props.brand.school}, {props.brand.name}!</h2>;
  }

  function Students() {

    const Detail = { name: "Jack", school: "Aloy" };
    return (
      <>
        <h1>who is admitted?</h1>
        <College brand={Detail} />
      </>
    );
  }





  function FruitsDisplay(props) {
    return <h2>They are {props.item.map((i, index) => <h2> {i}{index}<p hidden></p></h2>)}</h2>;
  }

  function FruitCount() {
    const fruits = ["apple", "banana", "orange", "mango"];
    return (
      <>
        <h1>I have {fruits.toUpper} fruits</h1>
        <FruitsDisplay item={fruits} />
      </>
    );
  }

  // function  Event(e){
  // alert("hello event")
  // }


  function DisplayFruits({ item, ind }) {
    return (
      <h1>{ind}. {item}</h1>
    )
  }

  function Fruits() {
    const fruits = ["apple", "banana", "orange", "mango"];
    return (
      <div>
        <h2>I have fruits</h2>
        {/* <DisplayFruits item={fruits} /> */}
        {fruits.map((f,index)=>{return <DisplayFruits item={f} ind={index} /> })}
      </div>
    )
  }


  















  return (
    // <Showroom /><Students />
    <div>
      {/* {props.title} */}

      {myElement}<Demo id="ABC" /><Showroom /><Students />
      <FruitCount />
      {/* <button onClick={Event}>Event</button> */}

    </div>
  )
}
