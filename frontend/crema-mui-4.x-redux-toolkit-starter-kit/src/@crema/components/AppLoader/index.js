import React from 'react';
import './loader.css';

const AppLoader = ({message}) => {


   
  return (
    <div className='app-loader' >
          
      <div className='loader-spin'>
        <span className='crema-dot crema-dot-spin'>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
        {/* MESSAGE TO DISPLAY WHILE LOADNG */}
         <h1>{message}</h1>
    </div>
  );
};

export default AppLoader;

