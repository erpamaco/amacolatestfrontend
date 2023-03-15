import React from 'react'
import Button from '@mui/material/Button';


import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

export default function mui() {
  return (
    <div>

    <h2>Material UI Buttons</h2>
    <Button variant="outlined">Click Here</Button>
    <Button variant="contained">Click Here</Button>
    <Button variant="text">Click Here</Button>
    <Button variant="contained" disabled>Click Here</Button>
    <hr></hr>
    npm install @mui/icons-material

    <h2>Button Colors</h2>

    <Button variant="contained" color="success">Green</Button>
    <Button variant="contained" color="error" startIcon={<DeleteIcon />}>Red</Button>
<hr></hr>

    <br />
    <h2>Icon Buttons</h2>
    <IconButton aria-label="fingerprint" color="success">
        <Fingerprint />
      </IconButton>

    
    
    </div>
  )
}
