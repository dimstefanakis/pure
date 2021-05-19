import React, {useEffect, useState} from 'react';
import SizeTag from '../SizeTag/SizeTag';
import './sizeTagList.css';

function SizeTagList({selected, setSelected, variants, sizes}){
  return(
    <div className="size-tag-list">
      {sizes.map(size=>(
        <SizeTag size={size} selected={selected} setSelected={setSelected}/>
      ))}
    </div>
  )
}

export default SizeTagList;
