import React from 'react';
import './BigBackgroundImage.css';

function BigBackgroundImage({src, header, subheader, imageStyle={}, onClick=null}){
  function handleClick(){
    if(onClick){
      onClick();
    }
  }

  return(
    <div className={`big-image-container ${onClick?'big-image-container-clickable':''}`} 
    style={{ cursor:onClick?'pointer':null}} onClick={onClick?handleClick:()=>{}}>
      <img src={src} style={{ ...imageStyle}} className={`big-image ${onClick?'big-image-clickable':''}`}/>
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
