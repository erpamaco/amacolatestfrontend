import React, {useState} from 'react'

export default function Usestate() {

const [value, setValue]=useState("Rahul")


const [color, setColor] = useState("Red")


const [email, setEmail] = useState("")



















  

  const [car, setCar] = useState({
    brand: "Mercedece Benze",
    model: "GLC",
    year: "2000",
    color: "White"
  });

  const changeColor = () => {
    setCar((a) => { return { ...a, color: "Green" } })
  }

  const [fruits, setFruits] = useState(["apple ", "mango ", "banana "])

  // const changeArrow = () =>{
  //   const newArray = ["apple","orange","banana"];

  //   setFruits((arr)=>{

  //     return (
  //         console.log(arr[0]="orange")
  //       )
  //   })

  //   // setFruits(["apple ","orange ","banana "])

  //   // setFruits((old)=>{
  //   //   return [...old,`${old.length+1}`]
  //   // })


  // }


  let a = { name: "Rahul", age: 30, address: "mangalore" }

  let b = { ...a, address: "bangalore" }

  // const [name,setName]= useState("Karthik");
  const [count, setCount] = useState(2)


  //   useEffect(() => {
  //     setTimeout(() => {
  //       console.log("111")
  //     }, 1000);
  //   });


  // const Arrow=()=>{
  //   alert("hello")
  // }

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const Submit = () => {
    console.log("Email : " + email)
  }

  const studentDetail = [
    {
      name: "Rahul",
      roll_no: 10,
      class: "1st",
      school: "ABC"
    },
    {
      name: "Karthik",
      roll_no: 11,
      class: "2st",
      school: "ABC"
    },
    {
      name: "Kiran",
      roll_no: 14,
      class: "5st",
      school: "ABC"
    },
    {
      name: "Prajwal",
      roll_no: 19,
      class: "9st",
      school: "ABC"
    },
    {
      name: "Jhon",
      roll_no: 13,
      class: "7st",
      school: "ABC"
    },
    {
      name: "Varun",
      roll_no: 5,
      class: "3st",
      school: "ABC"
    }

  ];






  

  const [car1,setCar1] = useState({
    brand : "Mercedece Benze",
    model : "GLC",
    year : "2000",
    color : "White"
});

const ChangeColor=()=>{
  setCar1(()=>{return {...car1, color:"Green"}})
}

const Change = () => {
    setValue("Jhon")
  }

  
  return (
    <div>
      {value} <br/><br/>
        <button onClick={Change}>Change</button> <br/><br/>

        {color?<h1 style={{backgroundColor:color}}> My Fav color is {color} </h1>:<h1>false</h1>}
        
        <button onClick={()=>setColor("green")}>Green</button>
        <button onClick={()=>setColor("orange")}>Orange</button>
        <button onClick={()=>setColor("red")}>Red</button>

        <h2>It is a {car1.color} {car1.model} from {car1.year}.</h2><br/>

        <button onClick={ChangeColor}>Change Color</button><br/><br/> 


        Email : <input type="email" onChange={(e)=>setEmail(e.target.value)}/> <br/>

        email : {email} <br/>
        name : {name} <br/>
        phone : {phone} <br/>
        address : {address} <br/>










      {/* Email : <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <br />

      <button onClick={Submit}>submit</button> */}

      {/* <div style={{ backgroundColor: "white" }}>
        <table className="table table-success table-striped-columns">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{name}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{address}</td>
            </tr>

          </tbody>
        </table>
      </div> */}



























      {/* <input type="text" onChange={(e)=>setEmail(e.target.value)} name="email"/> */}




      {/* {fruits} */}

      {/* {car.color}<br/>
        {console.log(car)}

        <button onClick={changeColor}>Change Color</button> */}


      {/* {fruits}<br/>
        <button onClick={changeArrow}>Change Mango</button>  */}

      {/* a={a.address}<br/>
        b={b.address}<br/> */}
      {/* {name}<br/> */}
      {/* <button onClick={Arrow}>Change Name</button> */}
      {/* <input type="text" name="" id="" /> */}


    </div>
  )
}




