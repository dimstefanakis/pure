import React from 'react';
import Logo from '../Icons/Logo';
import Image from '../../images/bottom.jpg';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';
function Home(){
  return(
    <>
      <BigBackgroundImage src={Image} header="Pure designs" subheader="Handmade clothing made with love"/>
      <h1 style={{maxWidth:'50%',margin:'100px 0',
      color:'#212121',textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur.</h1>
      <SmallBackgroundImage src={Image} header="Lorem ipsum" subheader={`
      Sed ut nunc erat. Nam at commodo urna. Suspendisse lacinia arcu interdum, laoreet tortor ac,
      tempor nunc. Sed nisi sem, viverra et cursus in, pulvinar commodo enim. Suspendisse eleifend rhoncus turpis vel dignissim. 
      Sed aliquet viverra orci. Nullam vitae urna vitae neque auctor hendrerit non eu diam.`}/>   
    </>
  )
}

export default Home;
