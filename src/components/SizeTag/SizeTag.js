import React from 'react';
import './sizeTag.css';

function SizeTag({size}){
  return(
    <div className="size-tag">
      {size.title}
    </div>
  )
}

export default SizeTag;
