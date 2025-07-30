'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { oswald, raleway } from '../../lib/fonts'
import { useInView } from '../../hooks/useInView'
import productsData from '../../data/products.json'
import { AppProduct, ProductsData } from '../../definitions/types/products'

export default function ProductsSection() {
  const { ref, isInView } = useInView(0.1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState({ left: false, right: false });
  const [animateSection, setAnimateSection] = useState(false);
  
  // Trigger animation when section comes into view
  useEffect(() => {
    if (isInView && !animateSection) {
      setAnimateSection(true);
    }
  }, [isInView, animateSection]);
  
  // Import products data from JSON
  const appProducts: ProductsData = productsData as unknown as ProductsData;

  // Handle navigation with proper transition sequencing
  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      const nextIndex = currentIndex === appProducts.length - 1 ? 0 : currentIndex + 1;
      
      // Start fade out, then update content, then fade in
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setDisplayedIndex(nextIndex);
        setCurrentImageIndex(0);
      }, 350); // Half of transition duration for content change
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700); // Full transition duration
    }
  };

  const goToPrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      const prevIndex = currentIndex === 0 ? appProducts.length - 1 : currentIndex - 1;
      
      // Start fade out, then update content, then fade in
      setTimeout(() => {
        setCurrentIndex(prevIndex);
        setDisplayedIndex(prevIndex);
        setCurrentImageIndex(0);
      }, 350); // Half of transition duration for content change
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700); // Full transition duration
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      
      // Start fade out, then update content, then fade in
      setTimeout(() => {
        setCurrentIndex(index);
        setDisplayedIndex(index);
        setCurrentImageIndex(0);
      }, 350); // Half of transition duration for content change
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700); // Full transition duration
    }
  };

  // Image navigation
  const nextImage = () => {
    const currentApp = appProducts[displayedIndex];
    setCurrentImageIndex((prev) => 
      prev === currentApp.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    const currentApp = appProducts[displayedIndex];
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentApp.images.length - 1 : prev - 1
    );
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInView && !isTransitioning) {
        goToNext();
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isInView, isTransitioning]);

  // Handle mouse movement for navigation arrows
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const leftThreshold = width * 0.2;
    const rightThreshold = width * 0.8;
    const relativeX = clientX - left;

    setShowNavigation({
      left: relativeX < leftThreshold,
      right: relativeX > rightThreshold
    });
  };

  return (
    <section 
      id="products" 
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-screen snap-start flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Content container */}
      <div className={`max-w-7xl mx-auto w-full pt-6 mt-0 transition-all duration-700 ${animateSection ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <h2 
            id="products-title" 
            className={`${oswald.className} text-3xl md:text-5xl font-bold mb-12 text-left transition-all duration-700 delay-100 ${animateSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >Products</h2>
          
                      <div className={`flex items-center mb-12 transition-all duration-700 delay-200 ${animateSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {appProducts[displayedIndex].link ? (
              <a 
                href={appProducts[displayedIndex].link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:opacity-80 transition-opacity group"
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-xl mr-4 bg-gradient-to-br ${appProducts[displayedIndex].primaryColor} text-white text-3xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {appProducts[displayedIndex].icon}
                </div>
                <h3 className={`${oswald.className} text-3xl md:text-4xl font-bold text-white group-hover:underline`}>
                  {appProducts[displayedIndex].name}
                </h3>
              </a>
            ) : (
              <div className="flex items-center group">
                <div className={`w-16 h-16 flex items-center justify-center rounded-xl mr-4 bg-gradient-to-br ${appProducts[displayedIndex].primaryColor} text-white text-3xl shadow-lg`}>
                  {appProducts[displayedIndex].icon}
                </div>
                <div>
                  <h3 className={`${oswald.className} text-3xl md:text-4xl font-bold text-white`}>
                    {appProducts[displayedIndex].name}
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-yellow-600/20 text-yellow-400 rounded-full mt-1 inline-block">Coming Soon</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* App showcase carousel - restructured layout */}
        <div id="products-carousel" className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowNavigation({ left: false, right: false })}
        >
          <div 
            className={`transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'} ${animateSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{transitionDelay: animateSection ? '300ms' : '0ms'}}
          >
            <div id="products-grid" className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-full">
              {/* Left column: App showcase - now larger with 60% width */}
              <div id="product-showcase-column" className="lg:col-span-3 flex flex-col h-full">
                {/* App image showcase */}
                <div id="product-image-showcase" className="relative h-full min-h-[400px] lg:min-h-[500px]">
                  {appProducts[displayedIndex].link ? (
                    <a 
                      href={appProducts[displayedIndex].link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-full cursor-pointer"
                    >
                      <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/20 shadow-xl backdrop-blur-sm bg-gradient-to-br bg-opacity-10 hover:border-white/40 transition-all hover:shadow-2xl">
                        <div className="w-full h-full bg-black/20 relative">
                          <div className="relative w-full h-full">
                            {/* Image with error handling */}
                            <Image
                              src={`/images/products/${appProducts[displayedIndex].images[currentImageIndex]}`}
                              alt={`${appProducts[displayedIndex].name} screenshot ${currentImageIndex + 1}`}
                              fill
                              className="object-cover object-center"
                              priority={currentImageIndex === 0}
                              onError={(e) => {
                                // Handle image load error by showing the fallback
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent && parent.lastElementChild) {
                                  const fallback = parent.lastElementChild as HTMLElement;
                                  fallback.classList.remove('hidden');
                                }
                              }}
                            />
                            {/* Fallback placeholder */}
                            <div className="hidden absolute inset-0 flex items-center justify-center">
                              <p className="text-white/60 text-base font-medium">App screenshots will be added here</p>
                            </div>
                          </div>

                          <span className="absolute top-4 right-4 text-xs text-white/50 bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
                            {currentImageIndex + 1}/{appProducts[displayedIndex].images.length}
                          </span>

                          <div className="absolute inset-0 bg-purple-500/0 hover:bg-purple-500/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white">Visit Website</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/20 shadow-xl backdrop-blur-sm bg-gradient-to-br bg-opacity-10">
                      <div className="w-full h-full bg-black/20 relative">
                        <div className="relative w-full h-full">
                          {/* Image with error handling */}
                          <Image
                            src={`/images/products/${appProducts[displayedIndex].images[currentImageIndex]}`}
                            alt={`${appProducts[displayedIndex].name} screenshot ${currentImageIndex + 1}`}
                            fill
                            className="object-cover object-center"
                            priority={currentImageIndex === 0}
                            onError={(e) => {
                              // Handle image load error by showing the fallback
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent && parent.lastElementChild) {
                                const fallback = parent.lastElementChild as HTMLElement;
                                fallback.classList.remove('hidden');
                              }
                            }}
                          />
                          {/* Fallback placeholder */}
                          <div className="hidden absolute inset-0 flex items-center justify-center">
                            <p className="text-white/60 text-base font-medium">App screenshots will be added here</p>
                          </div>
                        </div>

                        <span className="absolute top-4 right-4 text-xs text-white/50 bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
                          {currentImageIndex + 1}/{appProducts[displayedIndex].images.length}
                        </span>

                        <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-yellow-900/30 flex items-center justify-center">
                          <span className="text-yellow-400 text-sm font-medium">Coming Soon</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Image navigation controls */}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between p-4">
                    <button 
                      onClick={prevImage}
                      className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full text-xs"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button 
                      onClick={nextImage}
                      className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full text-xs"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>
                  
                  {/* Platform indicators */}
                  <div className="absolute -bottom-3 -right-3 flex space-x-2">
                    {appProducts[displayedIndex].platforms.map((platform, i) => (
                      <span key={i} className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right column: Features highlight - now 40% width */}
              <div id="product-features-column" className="lg:col-span-2 relative backdrop-blur-md rounded-2xl p-8 border border-white/20 min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-black/40 to-black/20">
                {/* Dark tinted glass effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800/30 to-zinc-700/20 backdrop-blur-xl"></div>
                
                {/* Features content */}
                <div id="product-features-content" className="relative z-10">
                  <h4 id="product-features-title" className={`${oswald.className} text-xl font-semibold mb-6 text-white border-b border-white/20 pb-3`}>
                    Key Features
                  </h4>
                  
                  <ul className="space-y-6">
                    {appProducts[displayedIndex].features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-media-mason-purple to-media-mason-purple/70 flex items-center justify-center text-white text-xs mt-0.5 mr-4">
                          {i + 1}
                        </span>
                        <div>
                          <h5 className={`${oswald.className} text-lg text-white mb-1`}>
                            {feature.name}
                          </h5>
                          <p className={`${raleway.className} text-sm text-white/70`}>
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Left Navigation Arrow */}
          <button 
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-50 p-4 transition-all duration-300 ${
              showNavigation.left ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            }`}
            onClick={goToPrevious}
            aria-label="Previous product"
          >
            <div className="backdrop-blur-lg p-4 rounded-full bg-gradient-to-br from-zinc-800/40 to-zinc-700/30 border border-white/10 shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {/* Right Navigation Arrow */}
              <button 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-50 p-4 transition-all duration-300 ${
              showNavigation.right ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
            onClick={goToNext}
            aria-label="Next product"
          >
            <div className="backdrop-blur-lg p-4 rounded-full bg-gradient-to-br from-zinc-800/40 to-zinc-700/30 border border-white/10 shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </div>
          </button>
        </div>
      </div>
    </section>
  )
} 