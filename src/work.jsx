import React from 'react'
import Props from './props'

export default function Work() {


    const car = ['bmv ','volvo ','mercedes']
    const car1 = car[0]

    console.log(car[0])


  return ( 
    <div>{car1}<Props brand="ford" /></div>
  )
}
