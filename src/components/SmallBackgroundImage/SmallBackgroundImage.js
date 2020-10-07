import React from 'react';
import './SmallBackgroundImage.css';

function SmallBackgroundImage({src, header, subheader}){
  return(
    <div style={{width:'100%',height:'60vh',position:'relative',display:'flex',flexFlow:'column',
    alignItems:'center'}}>
      <img src={src} style={{width:'100%',height:'100%',display:'block',objectFit:'cover',margin:0}}/>
      <div style={{height:'100%',width:'100%',position:'absolute',top:0,
      display:'flex',alignItems:'flex-end'}} className="app-container">
        <div className="title-header-container">
          <h1 className="main-font small-main-title">{header}</h1>
          <h2 className="main-font small-secondary-title">{subheader}</h2>
        </div>
      </div>
    </div>
  )
}

export default SmallBackgroundImage;
