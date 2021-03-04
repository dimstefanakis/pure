import React from 'react';
import Layout from '../components/layout';

function About() {
  return (
    <Layout>
      <div
        style={{marginTop: 150, maxWidth: 600, padding: 30}}
        className="cool-font">
        <h1>About our brand</h1>
        <p>
          Pure, a greek clothing brand, aims for the sense of youth each
          individual holds inside. A fresh view that is caught in between the
          minimal and casual as well as the all-time classic and urban, inspired
          greatly by the raw street culture which forms unique and personal
          style afar off anything common.
        </p>
        <p>
          It stands for its name in a way that it is forwarding and supporting a
          pure style with clean lines and a distinct emphasis on the careful
          detailing, innovative design, cutting and mindfully sewing high
          quality fabrics until the gratification of the very last step that is
          being worn and enjoyed for a long time.
        </p>
        <p>
          All the stages of designing and producing our pure garments are
          located in Greece under our manufacturing and close supervision for
          securing the best possible materialization of ideas.
        </p>
        <h3 style={{textAlign: 'center', color: 'gray', marginTop: 50}}>
          At the end of day, Pure simply means being your most honest self,
          feeling the confidence and singularity with your true colors all
          praised and cherished.
        </h3>
      </div>
    </Layout>
  );
}

export default About;
