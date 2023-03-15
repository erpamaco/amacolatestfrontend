import React, { useContext, createContext } from 'react'

export default function Context() {
    const UserContext = createContext();
    function Function1() {
        let name = "Kiran"
        let age = 10
        return (
            <UserContext.Provider value={{ name, age }}>
                <h2>Function 1 </h2>
                <Function2 />

            </UserContext.Provider>
        )
    }

    function Function2() {
        const user = useContext(UserContext);
        return (
            <>
            <h2>Function 2 {user.name}, {user.age}</h2>
            <Function3/>
            </>
        )
    }

    function Function3() {
        const user = useContext(UserContext);
        return <h2>Function 3 {user.name}</h2>
    }
    return (
        <div>
            <Function1 />
        </div>
    )
}
