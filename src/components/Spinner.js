import React from 'react';
import {RotatingLines} from 'react-loader-spinner';

export default function Spinner() {
  return (
    <div className="container d-flex justify-content-center" style={{height: "74vh", alignItems: "center"}}>
        <RotatingLines strokeColor="#0d6efd" strokeWidth="5" animationDuration="1.25" width="500" visible={true}/>
    </div>
  )
}
