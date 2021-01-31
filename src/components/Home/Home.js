import React from 'react';
import Logo from '../Icons/Logo';
import Image from '../../images/bottom.jpg';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';
import BestProducts from '../BestProducts/BestProducts';
import './home.css';

function Home({data}){
  console.log(data);
  return(
    <>
      <BigBackgroundImage src={Image} header="Pure designs" subheader="Handmade clothing made with love"
        imageStyle={{objectPosition: '50% 30%'}}
      />
      <h1 className="image-text-splitter">Lorem ipsum dolor sit amet, consectetur.</h1>
      <SmallBackgroundImage src={Image} header="Lorem ipsum" subheader={`
      Sed ut nunc erat. Nam at commodo urna. Suspendisse lacinia arcu interdum, laoreet tortor ac,
      tempor nunc.`}/>
      <h1 className="image-text-splitter">Lorem ipsum dolor sit amet, consectetur.</h1>
      <BestProducts data={data} />
    </>
  )
}

export default Home;
