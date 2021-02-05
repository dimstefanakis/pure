import React, {useState, useEffect, useContext} from 'react';
import {StoreContext} from '../../contexts/StoreContext';
import './filters.css';

function Filters({data}){
  const storeContext = useContext(StoreContext);
  console.log(storeContext);
  const {collections} = data;
  return(
    <div style={{width: '20%'}}>
      <CollectionList collections={collections.edges}/>
    </div>
  )
}

function CollectionList({collections}){
  const storeContext = useContext(StoreContext);

  console.log(storeContext);
  function handleCollectionSelect(collection){
    storeContext.updateFilterCollection(collection.node.title);
  }
  return(
    <div className="collection-filter-container">
      {collections.map(collection=>{
        return(
          <div className="collection-item-container" 
          style={{fontWeight:collection.node.title==storeContext.filteredCollection?'bold':null}}
          onClick={()=>handleCollectionSelect(collection)}>
            <span>{collection.node.title}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Filters;
