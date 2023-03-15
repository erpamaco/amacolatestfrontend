export const name1 = "Rahul"
export const age = 20


const address = "Mangalore"
const phone = 222222
function Variables (){
    const pincode = 12345
    const city = "Mangalore"
    return <h1>{pincode}, {city}</h1>
}

export {address,phone,Variables}





function Display(){
    return <h1>Hello This is the Default Export</h1>
}

export default Display


