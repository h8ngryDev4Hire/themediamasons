'use client'

import React from 'react'
import { bangers, oswald, raleway } from '../../lib/fonts'
import { Linkedin } from 'lucide-react'

// X (Twitter) Logo Component
const XLogo = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

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

            {/* Email Contact */}
            <div className={`${bangers.className} mb-4`}>
              <a
                href="mailto:letswork@themediamasons.com"
                className="text-white icon-glow-hover text-lg transition-transform duration-300 ease-in-out hover:scale-[1.1] inline-block"
              >
                letswork@themediamasons.com
              </a>
            </div>

            {/* Social Media Links */}
            <div id="social-links" className="flex space-x-4 mt-2">
              <a href="https://www.linkedin.com/company/themediamasons" target="_blank" rel="noopener noreferrer" className="text-white icon-glow-hover transition-transform duration-300 ease-in-out hover:scale-125 inline-block">
                <Linkedin size={22} />
              </a>
              <a href="https://x.com/TheMediaMasons" target="_blank" rel="noopener noreferrer" className="text-white icon-glow-hover transition-transform duration-300 ease-in-out hover:scale-125 inline-block">
                <XLogo size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div id="copyright" className={`${raleway.className} border-t border-zinc-700 mt-10 pt-6 text-center text-white text-sm`}>
          &copy; {new Date().getFullYear()} The Media Masons. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 