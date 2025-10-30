import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import Bestseller from '../components/Bestseller'
import BottomBanner from '../components/BottomBanner'
import Newsletter from '../components/Newsletter'
import StartSellingSec from '../components/StartSellingSec'


const Home = () => {
  return (
  <div className='mt-6 space-y-10 px-4 md:px-8'>
<MainBanner />

<Categories />
<Bestseller />
<BottomBanner />
<StartSellingSec />
<Newsletter />

    </div>
  )
}

export default Home