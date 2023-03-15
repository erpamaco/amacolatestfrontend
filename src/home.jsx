import React from 'react'
import { Link } from 'react-router-dom';

export default function home() {

    return (
        <div>
            This is the Home .jsx Component
            
            <Link to="/classes">Classes</Link><br/>
            <Link to="/arrowfunction">Arrowfunction</Link><br/>
            <Link to="/props">Props</Link><br/>
            <Link to="/spreadoperator">Spred Operator</Link><br/>
            <Link to="/usestate">Use State</Link><br/>
            <Link to="/usestate2">Use State 2</Link><br/>
            <Link to="/useeffect">Use Effect</Link><br/>
            <Link to="/table">Table</Link><br/>
        
        </div>
    )
}
