import React from 'react';
import './sizeTag.css';

function SizeTag({size, selected, setSelected}){
  const selectedSize = selected.selectedOptions.find(o=>o.name=='Size')

  return(
    <div className={`size-tag ${size==selectedSize.value?'size-tag-selected' : ''}`}
      onClick={()=>setSelected(size)}>
      {size}
    </div>
  )
}

export default SizeTag;
