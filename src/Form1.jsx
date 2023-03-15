import React from 'react'

export default function Form1() {
  function MyForm() {
    return (
      <form method='POST' encType='multipart/form-data'>
        <label>Enter your name:
          <input type="text" />
        </label>
        <input type="submit" value="submit" />
      </form>
    )
  }
  return (
    <>
      <div>{<MyForm />}</div>
      
    </>
  )
}
