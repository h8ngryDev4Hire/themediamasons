'use client'

import PsychedelicBackground from '../components/background/PsychedelicBackground'
import HeroSection from '../components/sections/HeroSection'
import ServicesSection from '../components/sections/ServicesSection'
import AboutSection from '../components/sections/AboutSection'
import PortfolioSection from '../components/sections/PortfolioSection'
import ProductsSection from '../components/sections/ProductsSection'
import Spacer from '../components/common/Spacer'

export default function Home() {
  return (
    <>
      <PsychedelicBackground />
      
      <HeroSection />
      <ProductsSection />
      <PortfolioSection />
      <ServicesSection />
      <AboutSection />
      <Spacer height="50px" />
    </>
  )
}
