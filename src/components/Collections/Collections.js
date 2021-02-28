import React, {useContext} from 'react';
import { navigate } from "gatsby";
import {StoreContext} from '../../contexts/StoreContext';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';

function Collections({data}){
  console.log(data);
  const storeContext = useContext(StoreContext);

  function handleCollectionClick(collection){
    storeContext.updateFilterCollection(collection.title);
    navigate(`/products`);
  }

  return(
    <>
      {data.collections.edges.map(edge=>{
        return(
          <React.Fragment>
            <BigBackgroundImage src={edge.node.image.src} header={edge.node.title} subheader="Handmade clothing made with love"
              imageStyle={{objectPosition: '50% 30%'}} onClick={()=>handleCollectionClick(edge.node)}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}

export default Collections;
