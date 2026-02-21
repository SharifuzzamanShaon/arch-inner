import React from 'react'
import PortfolioHero from './_components/PortfolioHero'
import Header from '../_components/common/Header'
import PortfolioSection from '../_components/PortfolioSection'
import Footer from '../_components/common/Footer'

const page = () => {
  return (
    <>
    <Header/>
    <PortfolioHero/>
    <PortfolioSection/>
    <Footer/>
    </>
  )
}

export default page