import React from 'react';
import Logo from '../Icons/Logo';
import image from '../../images/bottom.png';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';
import BestProducts from '../BestProducts/BestProducts';
import './home.css';

function Home({data}){
  return(
    <>
      <BigBackgroundImage src={image} header="Pure The Brand" subheader="Sustainable and handmade clothing"
        // imageStyle={{objectPosition: '50% 30%'}}
      />
      <h1 className="image-text-splitter">NEW ARRIVALS</h1>
      {/* <SmallBackgroundImage src={Image} header="Lorem ipsum" subheader={`
      Sed ut nunc erat. Nam at commodo urna. Suspendisse lacinia arcu interdum, laoreet tortor ac,
      tempor nunc.`}/>
      <h1 className="image-text-splitter">Lorem ipsum dolor sit amet, consectetur.</h1> */}
      <BestProducts data={data} />
    </>
  )
}

export default Home;
