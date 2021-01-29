import React from 'react';
import './BigBackgroundImage.css';

function BigBackgroundImage({src, header, subheader, imageStyle={}}){
  return(
    <div style={{width:'100%',height:'100vh',position:'relative',display:'flex',flexFlow:'column',
    alignItems:'center'}}>
      <img src={src} style={{width:'100%',height:'100%',display:'block',objectFit:'cover',margin:0, ...imageStyle}}/>
      <div style={{height:'100%',width:'100%',position:'absolute',top:0,
      display:'flex',alignItems:'flex-end'}} className="app-container">
        <div className="title-header-container">
          <h1 className="main-font main-title">{header}</h1>
          <h2 className="main-font secondary-title">{subheader}</h2>
        </div>
      </div>
    </div>
  )
}

export default BigBackgroundImage;
