import React from 'react';

function ColorListItem({color, selected, setSelected}){
  const selectedColor = selected.selectedOptions.find(o=>o.name=='Color')

  return(
    <div style={{backgroundColor: color}} className={`color-list-item ${color==selectedColor.value?'color-list-item-selected' : ''}`}
    onClick={()=>setSelected(color)}>
    </div>
  )
}

export default ColorListItem;
