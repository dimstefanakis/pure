import React, {useState, useEffect, useContext} from 'react';
import { Checkbox } from 'antd';
import {StoreContext} from '../../contexts/StoreContext';
import './filters.css';

function Filters({data}){
  const storeContext = useContext(StoreContext);
  const {collections} = data;

  return(
    <div className="filters-container">
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
      <AdvancedFilters />
    </div>
  )
}

const options = [
  { label: 'Tops', value: 'Tops' },
  { label: 'Trousers', value: 'Trousers' },
  { label: 'Shirts', value: 'Shirts' },
  { label: 'Coats', value: 'Coats' },
  { label: 'Dresses', value: 'Dresses' },
  { label: 'Jumpsuits', value: 'Jumpsuits' },
  { label: 'Hats', value: 'Hats' },
  { label: 'Shorts', value: 'Shorts' },
  { label: 'Skirts', value: 'ShiSkirtsrts' },
  { label: 'Playsuits', value: 'Playsuits' },
];

function AdvancedFilters(){
  const storeContext = useContext(StoreContext);

  function onChange(checkedValues){
    storeContext.updateFilterTags(checkedValues);
  }

  useEffect(()=>{
    // add all the tags on mount
    storeContext.updateFilterTags(options.map(o=>o.value));
  },[])

  return(
    <div style={{marginTop:100, width:'50%'}}>
      <h3>Categories</h3>
      <Checkbox.Group options={options} defaultValue={options.map(o=>o.value)} onChange={onChange} />
    </div>
  )
}

export default Filters;
