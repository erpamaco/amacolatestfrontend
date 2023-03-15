import React from 'react'

export default function Formm() {
    function Submit(e){
        alert("hello " +e)
        // e.preventDefault();
    }
    const value = "123"

  return (
    <div>
        <form>
            <input type="text" /><br/>
            <input type="text" /><br/>
            <button onClick={()=>Submit(value)}>Login</button>
        </form>
    </div>
  )
}
