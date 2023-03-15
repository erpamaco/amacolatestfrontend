import React from 'react'
import Work from './work';

export default function Spreadoperator() {

const numberOne = [1, 2, 3, 4];
const numberTwo = [5, 6, 7];


const numbersCombined = [...numberOne, ...numberTwo];






















//destructuring

const numbers = [1, 2, 3, 4, 5, 6];

const [one, two, ...rest] = numbers;





















//objects

const myVehicle = {
    brand: 'Ford',
    model: 'Mustang',
    color: 'red' 
  }
  const updateMyVehicle = {
    type: 'car',
    year: 2021, 
    color: 'yellow'
  }
   




  const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}

  return (
    
    <div>
      {console.log(myUpdatedVehicle)}
      {numbersCombined}<br/>
      {one}<br/>
      {two}<br/>
      {rest}<br/>
      
    
    </div>
  )
}






























