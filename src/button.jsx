// Basic Button
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function BasicButtons() {
  // function Hello(){
  //   return window.location=""
  // }
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>


    </>
  );
}

// // Text Button
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';

// export default function TextButtons() {
//   return (
//     <Stack direction="row" spacing={2}>
//       <Button>Primary</Button>
//       <Button disabled>Disabled</Button>
//       <Button href="#text-buttons">Link</Button>
//     </Stack>
//   );
// }

// // Contained Button
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';

// export default function ContainedButtons() {
//   return (
//     <Stack direction="row" spacing={2}>
//       <Button variant="contained">Contained</Button>
//       <Button variant="contained" disabled>
//         Disabled
//       </Button>
//       <Button variant="contained" href="#contained-buttons">
//         Link
//       </Button>
//     </Stack>
//   );
// }


// // Basic Group Button
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

// export default function BasicButtonGroup() {
//   return (
//     <ButtonGroup variant="contained" aria-label="outlined primary button group">
//       <Button>One</Button>
//       <Button>Two</Button>
//       <Button>Three</Button>
//     </ButtonGroup>
//   );
// }


