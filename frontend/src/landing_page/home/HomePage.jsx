import React from 'react';
import Hero from './Hero';
import Stats from './Stats';
import Awards from './Awards';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../OpenAccount';

function HomePage() {
  return ( 
    <main>
      <Hero />
      <Stats />
      <Awards />
      <Pricing />
      <Education />
      <OpenAccount />
    </main>
  );
}

export default HomePage;