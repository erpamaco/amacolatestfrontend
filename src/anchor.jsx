import React from 'react'
import { Link } from 'react-router-dom'

export default function anchor() {
  return (
    <div>
        <a href="classes.jsx">Click here</a>
        <Link to="classes">Classes</Link>
    </div>
  )
}
