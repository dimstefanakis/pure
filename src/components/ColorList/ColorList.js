import React, {useEffect, useState} from 'react';
import ColorListItem from './ColorListItem';
import './colorList.css';

function ColorList({selected, setSelected, size, colors}){

  useEffect(()=>{
    setSelected(colors[0])
  },[size])
  
  return(
    <div className="color-list">
      {colors.map(color=>(
        <ColorListItem color={color} selected={selected} setSelected={setSelected}/>
      ))}
    </div>
  )
}

export default ColorList;
