'use client'

import React from 'react'
import { bangers, oswald, raleway } from '../../lib/fonts'
import { Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer 
      id="site-footer" 
      className="w-full text-white py-12 relative mt-12 z-20"
    >
      {/* Blurred gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none backdrop-blur-lg bg-gradient-to-b from-transparent via-black/90 to-black z-[-1]"
      />
      
      {/* Top border with gradient glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-media-mason-purple/50 via-media-mason-orange/50 to-media-mason-purple/50 shadow-[0_0_5px_rgba(124,58,237,0.5)]" />

      <div id="footer-container" className="max-w-7xl mx-auto px-6 md:px-10">
        <div id="footer-content" className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div id="footer-brand" className="footer-section">
            <div id="footer-logo" className={`${bangers.className} text-2xl mb-4`}>
              <span className="bg-gradient-to-r from-media-mason-purple via-media-mason-orange to-media-mason-green text-transparent bg-clip-text">
                THE MEDIA MASONS
              </span>
            </div>
            <p className={`${raleway.className} text-white mb-4`}>
              Professional web development and digital solutions for businesses. We build custom websites and applications that drive growth.
            </p>
          </div>

          {/* Quick Links */}
          <div id="footer-links" className="footer-section">
            <h3 className={`${oswald.className} font-bold text-xl mb-4`}>Quick Links</h3>
            <ul className={`${raleway.className} space-y-2`}>
              <li><a href="#hero-section" className="text-white hover:text-media-mason-purple trans-ease">Home</a></li>
              <li><a href="#products" className="text-white hover:text-media-mason-purple trans-ease">Products</a></li>
              <li><a href="#services" className="text-white hover:text-media-mason-purple trans-ease">Services</a></li>
              <li><a href="#about" className="text-white hover:text-media-mason-purple trans-ease">About Us</a></li>
              <li><a href="#portfolio" className="text-white hover:text-media-mason-purple trans-ease">Portfolio</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div id="footer-contact" className="footer-section">
            <h3 className={`${oswald.className} font-bold text-xl mb-4`}>Connect With Us</h3>
            
            {/* Social Media Links */}
            <div id="social-links" className="flex space-x-4 mt-2">
              <a href="#" className="text-white hover:text-media-mason-purple trans-ease">
                <Linkedin size={22} />
              </a>
              <a href="#" className="text-white hover:text-media-mason-purple trans-ease">
                <Twitter size={22} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div id="copyright" className={`${raleway.className} border-t border-gray-700 mt-10 pt-6 text-center text-white text-sm`}>
          &copy; {new Date().getFullYear()} The Media Masons. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 