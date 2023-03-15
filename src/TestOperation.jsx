import React,{ useContext } from 'react'
import { OperationContext } from './context/Operation'

export default function TestOperation() {
  const {Add,Sub,Mul,Div} = useContext(OperationContext)
  return (
    <div>
      <button onClick={()=>{Add()}}>Add</button> <br/>
      <button onClick={()=>{Sub()}}>Sub</button> <br/>
      <button onClick={()=>{Mul()}}>Mul</button> <br/>
      <button onClick={()=>{Div()}}>Div</button> <br/>
    </div>
  )
}

























// const handleSubmit =(e)=>{
//   e.preventDefault();
//   addBook(bookvalues.bookname, bookvalues.title, bookvalues.description, bookvalues.image);
// }
// const onChange=(e)=>{
//   setBookvalues({...bookvalues, [e.target.name]: e.target.value})
// }
// const onChangeImage=(e)=>{
//   // console.log(e.target.files[0])
//   setBookvalues({...bookvalues, image:e.target.files[0]});
//   console.log(bookvalues.image);
// }
// // const onChangeDocument=(e)=>{
// //   setBookvalues({...bookvalues, [e.target.name]: e.target.value})
// // }
// return (
//   <>
//   <center>
//   <div style={{marginTop:"40px",fontSize:"25px"}}><b>AddBook Form</b></div>
//   <div className='container' style={{marginTop:"20px"}}>
//       <form className="container" enctype="multipart/form-data">
     
//         <label>Book Name:</label>
//         <input style={{marginTop:"5px"}} type="text" onChange={onChange} name="bookname" placeholder='Enter book name' value={bookvalues.bookname}/> <br/>
//         <label>Title:</label>
//         <input style={{marginTop:"5px"}} type="text" onChange={onChange} name="title" placeholder='Enter book title' value={bookvalues.title}/> <br/>
//         <label>Book Description:</label>
//         <input style={{marginTop:"5px"}} type="text" onChange={onChange} name="description" placeholder='Enter book description' value={bookvalues.description}/> <br/>
        
//         <label>Image:</label>
//         <input style={{marginTop:"5px"}} type="file" onChange={onChangeImage} name="bookimage"/> <br/>
//         {/* <label>Document:</label>
//         <input style={{marginTop:"5px"}} type="file" onChange={onChangeDocument} name="document" placeholder='Insert Document' value={bookvalues.document}/> <br/> */}

//         <input disabled={bookvalues.bookname.length<5 || bookvalues.title.length<5 || bookvalues.description.length<5} className='btn btn-primary' style={{marginTop:"5px",marginBottom:"100px"}} type="submit" onClick={handleSubmit} name="addbook" value="Add Book"/>
      
//       </form>
//   </div>
//   </center>
//   </>
// )
// }