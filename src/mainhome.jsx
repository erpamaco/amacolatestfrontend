import React from 'react'
import { Link } from 'react-router-dom'

export default function mainhome() {
  return (
    <div><h1>MainHome</h1>
        <Link to="classes">Classes</Link><br/>
        <Link to="arrowfunction">ArrowFunction</Link><br/>
        <Link to="event">Event</Link><br/>

      
        <Link to="usestate">UseState</Link>

        
    </div>
  )
}
