import React from 'react';
import image from './logo192.png'
import { Col, Row } from 'react-bootstrap';
import { Link }  from 'react-router-dom';

export default function DisplayItem({ item }) {

    return (


        <Col style={{ marginBottom: "30px" }}>

            <div className="card" style={{ width: "20rem", margin: "auto" }} >
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Name : {item.name}</h5>
                    <h5 className="card-title">Roll No : {item.roll_no}</h5>
                    <h5 className="card-title">Class : {item.class}</h5>
                    <h5 className="card-title">School : {item.school}</h5>

                    {/* <Link to='/hello'>Go somewhere</Link> */}
                </div>
            </div>

        </Col>


    )
}
