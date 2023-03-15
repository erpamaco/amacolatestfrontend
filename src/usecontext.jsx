import React, { useState, createContext, useContext } from "react";

export default function usecontext() {

  // const UserContext = createContext();
  const Abc = createContext();

  function Component1() {
    let name = "Jhon"
    let age = 10
    return (
      // <Abc.Provider value={{name,age}}>
      //   <h1>{`Hello ${name}!`}</h1>
      //   <Component2 />
      // </UserContext.Provider>

      <Abc.Provider value={{ name, age }}>
        <h1>Hello {name}</h1>
        <Component2 />
      </Abc.Provider>


    );
  }

  function Component2() {

    return (
      <>
        <h1>Component 2</h1>
        <Component3 />
      </>
    );
  }

  function Component3() {
    return (
      <>
        <h1>Component 3</h1>
        <Component4 />
      </>
    );
  }

  function Component4() {
    return (
      <>
        <h1>Component 4</h1>
        <Component5 />
      </>
    );
  }

  function Component5() {
    const user = useContext(UserContext);

    return (
      <>
        <h1>Component 5</h1>
        <h2>Hello {user.name} {user.age} again!</h2>
      </>
    );
  }

  // function Component6() {
  //   return (
  //     <>
  //       <h1>Component 6</h1>
  //     </>
  //   );
  // }




  const UserContext = createContext();

  function Function1() {
    const [user, setUser] = useState("Rahul");

    return (
      <>
        <h1>Function 1</h1>

        <UserContext.Provider value={{ user }}>
          <Function2 />
        </UserContext.Provider>
      </>
    );
  }

  function Function2() {

    return (
      <>
        <h1>Function 2</h1>
        <Function3 />
      </>
    );
  }

  function Function3() {
    const val = useContext(UserContext)
    return (
      <>
        <h1>Function 3 {val.user}</h1>
        <Function4 />
      </>
    );
  }

  function Function4() {
    return (
      <>
        <h1>Function 4</h1>
        <Function5 />
      </>
    );
  }

  function Function5() {
    const value = useContext(UserContext)
    return (
      <>
        <h1>Function 5, {'Hello ' + value.user}</h1>
        <Function6/>
      </>
    );
  }


  function Function6() {
    const value = useContext(UserContext)
    return (
      <>
        <h1>Function 6, {'Hello '+value.user}</h1>
      </>
    );
  }




  return (
    <div>
      <Function1 />
    </div>
  )
}



// it can be done in react function component








