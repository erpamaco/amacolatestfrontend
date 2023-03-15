import React from 'react';
import image from './logo192.png'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DisplayItem from './DisplayItem';


export default function bootstarp() {
    const name = "Rahul"
    const roll_no = "21"
    const classs = "1st"
    const school = "ABC"

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
            name: "Jhon",
            roll_no: 8,
            class: "1st",
            school: "ABC"
        },
        {
            name: "Kiran",
            roll_no: 2,
            class: "7st",
            school: "ABC"
        },
        {
            name: "Prajwal",
            roll_no: 32,
            class: "6st",
            school: "ABC"
        },
        {
            name: "Prajwal",
            roll_no: 32,
            class: "6st",
            school: "ABC"
        },
        {
            name: "Prajwal",
            roll_no: 32,
            class: "6st",
            school: "ABC"
        }


    ];

    const Display = ({ item }) => {
        return (
            <div style={{marginBottom:"30px"}}>

                <div className="card" style={{ width: "20rem", margin: "auto"}} >
                    <img src={image} className="card-img-top" alt="..." />
                    <div className="card-body">
                       
                        <h5 className="card-title">Name : {item.name}</h5>
                        <h5 className="card-title">Roll No : {item.roll_no}</h5>
                        <h5 className="card-title">Class : {item.class}</h5>
                        <h5 className="card-title">School : {item.school}</h5>

                        {/* <Link onClick={Submit}>Go somewhere</Link> */}
                        
                    </div>
                </div>

            </div>
        )
    }
   
    return (
        <div style={{ backgroundColor:"#ffffe6", fontFamily:"Sofia" }}>
            <br/> <h1>Bootstarp</h1> <br/>

            <Row lg="4">
                {studentDetail.map((i) => <Display item={i} />)}
            </Row>

        </div>
    )
}
