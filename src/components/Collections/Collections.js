import React, {useContext} from 'react';
import { navigate } from "gatsby";
import {StoreContext} from '../../contexts/StoreContext';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';

function Collections({data}){
  const storeContext = useContext(StoreContext);

  function handleCollectionClick(collection){
    storeContext.updateFilterCollection(collection.title);
    navigate(`/products`);
  }

  return(
    <>
      {data.collections.edges.map(edge=>{
        return(
          <div role="link" style={{width: '100%'}} data-ref='/products'>
            <BigBackgroundImage src={edge.node.image.src} header={edge.node.title}
              imageStyle={{objectPosition: '50% 30%'}} onClick={()=>handleCollectionClick(edge.node)}
            />
          </div>
        )
      })}
    </>
  )
}

export default Collections;
