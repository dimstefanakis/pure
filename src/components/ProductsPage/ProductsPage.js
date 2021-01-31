import React from 'react';
import Pagination from 'antd/es/pagination';
import Layout from '../layout';
import Image from '../../images/bottom.jpg';
import BigBackgroundImage from '../BigBackgroundImage/BigBackgroundImage';
import SmallBackgroundImage from '../SmallBackgroundImage/SmallBackgroundImage';

function ProductsPage({data, pageContext}){
  return(
    <Layout>
      <SmallBackgroundImage src={Image} header="Products" subheader={`
      Sed ut nunc erat. Nam at commodo urna. Suspendisse lacinia arcu interdum, laoreet tortor ac,
      tempor nunc.`}/>
      <h1 className="image-text-splitter">Lorem ipsum dolor sit amet, consectetur.</h1>
      <Pagination defaultCurrent={6} total={500} />
    </Layout>
  )
}

export default ProductsPage;
