import React, { useState } from "react";

export default function Hookusestate() {
    const [value, setValue] = useState("Hello World");

    const [value1, setValue1] = useState([1,2,3,4,5]);

    const [value2, setValue2] = useState([{"name":"react"}]);

    const [value3, setValue3] = useState(true);

    
    const [value4, setValue4] = useState(23);



    function FavoriteColor() {
        const [color, setColor] = useState("red");

        return (
            <>
                <h1>My favorite color is {color}!</h1>
                <button
                    onClick={() => setColor("blue")}
                >Blue</button>
                <button
                    onClick={() => setColor("red")}
                >Red</button>
                <button
                    onClick={() => setColor("pink")}
                >Pink</button>
                <button
                    onClick={() => setColor("green")}
                >Green</button>
            </>
        );
    }


    return (
        <div><FavoriteColor /></div>
        // <div>{value}, {value1}, {console.log(value2)}, {value3}, {value4}</div>
    )
}
