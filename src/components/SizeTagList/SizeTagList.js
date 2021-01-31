import React, {useEffect, useState} from 'react';
import SizeTag from '../SizeTag/SizeTag';
import './sizeTagList.css';

function SizeTagList({selected, setSelected, variants}){
  return(
    <div className="size-tag-list">
      {variants.map(variant=>(
        <SizeTag size={variant} selected={selected} setSelected={setSelected}/>
      ))}
    </div>
  )
}

export default SizeTagList;
