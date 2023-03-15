

import React, { useState } from 'react';

import {  Link } from 'react-router-dom';

export default function Home() {
  const [showNav, setShowNav] = useState(false);

  return (
   <>
   <Link to='/'>Home</Link>
   <Link to='/aboutus'>About</Link>
   </>
  );
}
