import React, { useEffect, useState } from 'react';
import logo from './../invoice/amaco-logo.png';
import url from '../invoice/InvoiceService';
import {
  Dialog,
  Button,
  Grid,
  Divider,
  Icon,
  TextField, MenuItem, Menu
} from "@material-ui/core";
import './prints.css';
import Swal from "sweetalert2";
function Header() {
  const [state, setstate] = useState([])
  const [company, setcompany] = useState([])
  const [name, setname] = useState('');
  const [opening_balance, setopening_balance] = useState('');
  const [status, setstatus] = useState(false)
  const [company_name, setcompany_name] = useState('');
  const [company_arabic, setcompany_arabic] = useState('');
  const [cr_no, setcr_no] = useState('');
  const [vat_no, setvat_no] = useState('');
  const [isAlive, setisAlive] = useState(false);
  const [divs, setDivs] = useState([]);
  const open = Boolean(anchorEl);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const changeHeader = (id) => {
    url.get('company').then(({ data }) => {
      setstate(data[0])
    })
    url.get(`singleDivision/${id}`).then(({ data }) => {
      setcompany(data.div)
      setname(data.div[0].name)
      setopening_balance(data.div[0].opening_balance)
      setcompany_arabic(data.div[0].company_arabic)
      setcompany_name(data.div[0].company_name)
      setcr_no(data.div[0].cr_no)
      setvat_no(data.div[0].vat_no)
      setAnchorEl(null);
    })
  }


  useEffect(() => {
    url.get('company').then(({ data }) => {
      setstate(data[0])
    })
    url.get(`singleDivision/${localStorage.getItem('division')}`).then(({ data }) => {
      setcompany(data.div)
      setname(data.div[0].name)
      setopening_balance(data.div[0].opening_balance)
      setcompany_arabic(data.div[0].company_arabic)
      setcompany_name(data.div[0].company_name)
      setcr_no(data.div[0].cr_no)
      setvat_no(data.div[0].vat_no)
      setDivs(data.divs)
    })
    return setisAlive(true);
  }, [isAlive])
  const savedata = () => {
    const frmdetails = {

      name: name,
      opening_bal: opening_balance,
      id: localStorage.getItem('division'),
      company_name: company_name,
      company_arabic: company_arabic,
      cr_no: cr_no,
      vat_no: vat_no,



    }
    url.put(`division/${localStorage.getItem('division')}`, frmdetails)
      .then(function (response) {

        Swal.fire({
          icon: 'success',
          type: 'success',
          text: 'Data updated successfully.',
        });
        setstatus(false)
        setisAlive(false)
      })
  }
  return (
    <thead style={{ display: "table-header-group", marginTop: '20px' }} >
      <tr>

        <td>
          <div style={{borderBottom:"1px solid rgb(229 229 229)"}} class="empty-header">
            {/* <header> */}
            <div className="px-2 flex justify-between">
              <div className="flex">
                <div className="pr-12">
                  {localStorage.getItem('division') == 3 ? <>
                    <img src={state?.image1} alt="logo" style={{ marginLeft: '15px', width: 237 }} />
                  </> : <>
                    <img src={state?.image1} alt="logo" style={{ marginLeft: '15px', width: 237 }} />

                  </>}

                </div>

                <div className="viewer__order-info px-4 mb-4 flex justify-between">

                </div>
              </div>

              <div className="flex pr-4 mr-1">
                <div style={{ marginLeft: '50px' }}>

                  {status == false ? (<h2 style={{ color: '#1d2257', textAlign: 'right' }}>
                    {
                      // localStorage.getItem('division') == 3 ? <>
                      //   شركة أماكو مانيفاكترنج اند أندستريل سيرفيزيس المحدودة
                      // </> : 
                      <>
                        {company[0]?.company_arabic}

                        {/* <Icon id="editIcon" onClick={() => setstatus(true)}>edit</Icon> */}
                      </>
                    }


                  </h2>) : (<><TextField value={company_arabic} onChange={(e) => setcompany_arabic(e.target.value)}></TextField><Icon onClick={() => savedata()}>done</Icon><br></br></>)}

                  {
                    // localStorage.getItem('division') == 3 ? <>
                    //   <h3 style={{ color: '#1d2257', textAlign: 'right', fontSize: 20 }}>

                    //     Amaco Manufacturing & Industrial Services Pvt. Ltd.

                    //   </h3>
                    // </> :
                    <>
                      {status == false ? (<h3 style={{ color: '#1d2257', textAlign: 'right', fontSize: 20 }}>
                        {/* AMACO ARABIA CONTRACTING COMPANY */}
                        {company[0]?.company_name.toUpperCase()}

                      </h3>) : <TextField value={company_name} onChange={(e) => setcompany_name(e.target.value)}></TextField>}
                    </>
                  }
                  <h5 style={{ color: '#555', textAlign: 'right', fontSize: 17 }} className="font-normal b-4 capitalize">



                    {status == false ? (<> C.R.
                      {company[0]?.cr_no} </>) : <><TextField value={cr_no} onChange={(e) => setcr_no(e.target.value)}></TextField><br></br></>}




                    {status == false ? (<>| VAT {company[0]?.vat_no}</>) : <TextField value={vat_no} onChange={(e) => setvat_no(e.target.value)}></TextField>}


                  </h5>
                  
                  <Button
                    style={{ float: 'right' }}
                    variant=""
                    color=""
                    className="mr-4 py-2 changeHeadButton"
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    CHANGE HEADER <Icon>expand_more</Icon>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {divs.slice(0, 2).map((item, i) => {
                      return <MenuItem value={item.id} onClick={(e) => { changeHeader(item.id) }} key={i}>
                        {item.company_name}
                      </MenuItem>
                    })}

                  </Menu>
                </div>
                
               
              </div>
              

            </div>
           

            {/* </header> */}
          </div>
          


        </td>

      </tr>
    
    </thead>

  )
}

export default Header
