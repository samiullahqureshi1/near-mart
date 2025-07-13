import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import TechBetterBanner from '../components/Route/LookBanner/LookBanner';
import PromoBanner from '../components/Route/LookBanner/LookBanner';
import ComputerProduct from '../components/Route/computer/computerProducts';
import MacbookBanner from '../components/Route/banner/Macbook';

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        {/* <TechBetterBanner/> */}
        
        <BestDeals />
        <Categories />
        <Events />
        <FeaturedProduct />
        <PromoBanner/>
        <ComputerProduct/>
        <MacbookBanner/>
        <Sponsored />
        <Footer />
    </div>
  )
}

export default HomePage