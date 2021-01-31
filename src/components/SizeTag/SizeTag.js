import React from 'react';
import './sizeTag.css';

function SizeTag({size, selected, setSelected}){

  return(
    <div className={`size-tag ${size.title==selected.title?'size-tag-selected' : ''}`}
    onClick={()=>setSelected(size)}>
      {size.title}
    </div>
  )
}

export default SizeTag;
