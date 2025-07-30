import Link from 'next/link';
import { bangers, oswald, raleway } from '../lib/fonts';
import PsychedelicBackground from '../components/background/PsychedelicBackground';

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <PsychedelicBackground />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col justify-center min-h-screen py-8">
        <div className="mb-12">
          {/* 404 Number with brand gradient */}
          <h1 className={`${bangers.className} text-8xl md:text-9xl lg:text-[12rem] font-bold mb-6 bg-gradient-to-r from-media-mason-purple via-media-mason-orange to-media-mason-green text-transparent bg-clip-text`}>
            404
          </h1>
          
          {/* Page Not Found Title */}
          <h2 className={`${oswald.className} text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8`}>
            Page Not Found
          </h2>
          
          {/* Description */}
          <p className={`${raleway.className} text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto`}>
            Oops! The page you're looking for seems to have vanished into the digital void. 
            Don't worry though - even the best digital masons sometimes take a wrong turn.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          {/* Primary Button - Return Home */}
          <div className="relative overflow-hidden backdrop-blur-md rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/20 shadow-md hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-zinc-700/20 backdrop-blur-xl rounded-2xl" />
            <Link 
              href="/"
              className={`${oswald.className} relative z-10 block text-white font-bold py-4 px-8 transition duration-300 ease-in-out`}
            >
              Return Home
            </Link>
          </div>
          
          {/* Secondary Button - View Services */}
          <div className="relative overflow-hidden backdrop-blur-md rounded-2xl transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/20 shadow-md hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-zinc-700/20 backdrop-blur-xl rounded-2xl" />
            <Link 
              href="/#services"
              className={`${oswald.className} relative z-10 block text-white font-bold py-4 px-8 transition duration-300 ease-in-out`}
            >
              View Services
            </Link>
          </div>
        </div>
        
        {/* Additional Navigation Links */}
        <div className={`${raleway.className} text-gray-400 text-sm md:text-base`}>
          <p>
            Lost? Try navigating back to our{' '}
            <Link href="/" className="text-media-mason-purple hover:text-media-mason-orange trans-ease underline">
              homepage
            </Link>
            {', '}
            check out our{' '}
            <Link href="/#portfolio" className="text-media-mason-purple hover:text-media-mason-orange trans-ease underline">
              portfolio
            </Link>
            {', or learn more '}
            <Link href="/#about" className="text-media-mason-purple hover:text-media-mason-orange trans-ease underline">
              about us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}