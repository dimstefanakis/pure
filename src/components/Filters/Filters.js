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

  console.log('collections', collections);
  let options = []
  collections.forEach(collection=>{
    collection.node.products.forEach(product=>{
      if(!options.find(o=>o.label==product.productType)){
        options.push({label: product.productType, value: product.productType })
      }
    })
  })
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
      <AdvancedFilters options={options}/>
    </div>
  )
}

function AdvancedFilters({options}){
  const storeContext = useContext(StoreContext);

  function onChange(checkedValues){
    storeContext.updateFilterTags(checkedValues);
  }

  useEffect(()=>{
    // add all the tags on mount
    storeContext.updateFilterTags(options.map(o=>o.value));
  },[])

  return(
    <div className="options-container">
      <h3 className="categories-title">Categories</h3>
      <Checkbox.Group options={options} defaultValue={options.map(o=>o.value)} onChange={onChange} />
    </div>
  )
}

export default Filters;
