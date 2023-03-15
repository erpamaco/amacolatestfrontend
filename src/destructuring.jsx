import React from 'react'

export default function destructuring() {

    // Destructing Arrays

    const cars = ['mustang', 'f-150', 'bmw'];



    const car1 = cars[0]; //before
    const car2 = cars[1]; //before
    const car3 = cars[2]; //before

    const [car11, car22, car33, car44] = cars


    {car1} <br/>
    {car2} <br/>
    {car3} <br/>

    <hr/>

    {car11} <br/>
    {car22} <br/>
    {car33} <br/>
    {car44} <br/>

    
  












    
    const [car4,car3,car2] = cars //dest











    const a =[5 + 5,10+10,20+20];




    



    const  [q,w,r] = a ;



















    
    // Destructuring Objects

    const vehicle = {
        brand: 'Ford',
        model: 'Mustang',
        type: 'car',
        year: 2021, 
        color: 'red'
      }
      {console.log(vehicle)}
      
    //   myVehicle(vehicleOne);
      
    //   // old way
    //   function myVehicle(vehicle) {
    //     const message = 'My ' + vehicle.type + ' is a ' + vehicle.color + ' ' + vehicle.brand + ' ' + vehicle.model + '.';
    //   }

    var message ;
    const vehicleOne = {
        brand: 'Ford',
        model: 'Mustang',
        type: 'car',
        year: 2021, 
        color: 'red'
      }
      
      myVehicle(vehicleOne);
      
      function myVehicle({type, color, brand, model}) {
        message = 'My ' + type + ' is a ' + color + ' ' + brand + ' ' + model + '.';
      }
    



//nested
var message2;
const vehicleOne1 = {
    brand: 'Ford',
    model: 'Mustang',
    type: 'car',
    year: 2021, 
    color: 'red',
    registration: {
      city: 'Houston',
      state: 'Texas',
      country: 'USA'
    }
  }
  
  myVehicle1(vehicleOne1)
  var message2;
  function myVehicle1({ model, registration: { state } }) {
     message2 = 'My ' + model + ' is registered in ' + state + '.';
  }
  

  return (
    <div>{message2}</div>
  )
}
