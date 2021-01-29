import React from 'react';
import SizeTag from '../SizeTag/SizeTag';
import './sizeTagList.css';

function SizeTagList({variants}){
  return(
    <div className="size-tag-list">
      {variants.map(variant=>(
        <SizeTag size={variant}/>
      ))}
    </div>
  )
}

export default SizeTagList;
