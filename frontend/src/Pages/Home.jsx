import React from 'react';
import { ExploreByCategories, Hero, ExploreNewCategories, HowItWorks } from '../components';


function Home() {

  return (
    <div className=''>
        <Hero/>
        <ExploreByCategories/>
        <ExploreNewCategories/>
        <HowItWorks/>
    </div>
  )
}

export default Home