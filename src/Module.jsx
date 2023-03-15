import React from 'react';
import  abc, {name,age,Hello} from './mod';

export default function Module() {
  return (

    <div>
      {name},{age}
      <br/>
      {<Hello/>}
      {abc}
    </div>

  )
}
