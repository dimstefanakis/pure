import React from 'react';
import Layout from '../components/layout';

function Contact() {
  return (
    <Layout>
      <div
        style={{marginTop: 150, maxWidth: 600, padding: 30}}
        className="cool-font">
        <h1>Contact us</h1>
        <p>
          <b>Email:</b>
          <span> info@purethebrand.com</span>
        </p>
        <p>
          <b>Phone:</b>
          <span> 2109952375</span>
        </p>
        <p>
          <b>Address:</b>
          <span> Kolokotroni 99, Argyroupoli</span>
        </p>
        <h3 style={{textAlign: 'center', color: 'gray', marginTop: 50}}>
          Pure simply means being your most honest self,
          feeling the confidence and singularity with your true colors all
          praised and cherished.
        </h3>
      </div>
    </Layout>
  );
}

export default Contact;
