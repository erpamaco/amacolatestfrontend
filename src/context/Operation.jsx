import React, { createContext, useContext, useState } from 'react'

export const OperationContext = createContext();

export default function Operation(props) {

    const Add = (props) =>{
        alert("This is Add Function")
    }
    
    const Sub = (props) =>{
        alert("This is Sub Function")
    }

    const Mul = (props) =>{
        alert("This is Mul Function")
    }

    const Div = (props) =>{
        alert("This is Div Function")
    }

  return (
    <OperationContext.Provider value={{Add, Sub, Mul, Div}}>
        {props.children}
    </OperationContext.Provider>
  )
}






