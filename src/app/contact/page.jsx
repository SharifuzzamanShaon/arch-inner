import React from 'react'
import ContactHero from './_components/ContactHero'
import ContactForm from './_components/ContactForm'
import MapComponent from './_components/MapComponent'
import Footer from '../_components/common/Footer'
import Header from '../_components/common/Header'
const page = () => {
  return (
    <>
    <Header/>
        <ContactHero/>
        <ContactForm/>
        {/* <MapComponent/> */}
        <Footer/>
    </>
  )
}

export default page