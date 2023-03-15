import React from 'react'

export default function events() {
    const Shoot = (e) => {
        alert("Great Shot!");
        console.log(e)
      }


      const Shoot2 = (e) => {
        alert(e);
      }


  return (
    <div>
      <button onClick={Shoot}>Take a shot</button>

    {/* <input type="text" onChange={Shoot}/> */}
    <button onClick={()=>Shoot2("nice kick")}>Take a shot</button>
    </div>
  )
}





// function Football() {
//   const shoot = (a, b) => {
//     alert(b.type);
//     /*
//     'b' represents the React event that triggered the function,
//     in this case the 'click' event
//     */
//   }

//   return (
//     <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
//   );
// }


