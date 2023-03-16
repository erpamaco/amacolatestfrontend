import React, { Component } from 'react'
import jsPDF from 'jspdf';
import logo from './../invoice/amaco-logo.png';

class Invpdf extends Component {
    pdfGenerate = () => {
        var doc = new jsPDF('landscape','px','a4','false');
        doc.addImage(logo,'PNG',65,20,500,400)
        doc.save('a.pdf')
    }
    render() {
        return (
            <div>
                <button onClick={this.pdfGenerate}>Download pdf</button>
            </div>
        );


  } 
}
export default Invpdf;
