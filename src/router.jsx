import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home.jsx';
import Classes from './classes.jsx'
// import Mainhome from './mainhome';
// import Arrowfunction from './arrowfunctions'
import Usestate from './usestate'
import Usestate2 from './usestate2'

import ArrowFunction from './arrowfunctions'
import Spreadoperator from './spreadoperator.jsx'
import Props from './props'
import Useeffect from './UseEffect'
import Table from './table.jsx'

import ComboBox from './AutoComplete/Combobox.jsx';

export default function router() {


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/classes" element={<Classes />} />
                    <Route exact path="/arrowfunction" element={<ArrowFunction />} />
                    <Route exact path="/spreadoperator" element={<Spreadoperator />} />
                    <Route exact path="/props" element={<Props />} />
                    <Route exact path="/combobox" element={<ComboBox />} />
                    <Route exact path="/usestate" element={<Usestate />} />
                    <Route exact path="/usestate2" element={<Usestate2 />} />
                    <Route exact path="/useeffect" element={<Useeffect />} />
                    <Route exact path="/table" element={<Table/>} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}