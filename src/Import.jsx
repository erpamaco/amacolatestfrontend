import React from 'react'
import Dis, {name1,age, address,phone,Variables} from './export'

export default function Import() {
  return (
    <div>
        
        Import {name1}, {age}, {address}, {phone}, {Variables()}
        {Dis()}
        
        </div>
  )
}
