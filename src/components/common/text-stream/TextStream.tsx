'use client'

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Define the props for the component
interface TextStreamProps {
  texts?: string[];
  text?: string;
  typingSpeed?: number;
  cycleSpeed?: number;
  fadeDelay?: number;
  className?: string;
}

export default function TextStream({ 
  text, 
  texts, 
  typingSpeed = 30, 
  cycleSpeed = 5000, 
  fadeDelay = 3000,
  className = '' 
} : TextStreamProps) {
  const [displayResponse, setDisplayResponse] = useState<string>('');
  const [completedTyping, setCompletedTyping] = useState<boolean>(false);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const textRef = useRef<HTMLSpanElement>(null);
  
  // If no texts array is provided but a single text is, convert to array
  const textArray = texts || (text ? [text] : [
    "Need a website? We've got you covered.",
    "Looking to increase your online presence?",
    "Want to attract more customers with a professional website?",
    "Our team builds fast, beautiful, and functional websites.",
    "We create digital solutions that help your business grow."
  ]);
  
  const currentText = textArray[currentTextIndex];

  // Brand colors from the psychedelic background shader
  const brandColors = {
    purple: { color: '#7c3aed', rgb: [124, 58, 237] },    // rgb(124, 58, 237)
    orange: { color: '#f97316', rgb: [249, 115, 22] },    // rgb(249, 115, 22)
    green: { color: '#09d408', rgb: [9, 212, 8] }         // rgb(9, 212, 8)
  };

  // Dynamic color animation synced with background
  useEffect(() => {
    if (!textRef.current) return;
    
    // Use THREE.Clock for perfect synchronization with the background
    const clock = new THREE.Clock();
    let animationFrame: number;
    
    const animate = () => {
      // Use the exact same time calculation as in PsychedelicBackground
      const elapsedTime = clock.getElapsedTime();
      const t = elapsedTime * 0.2; // Exact same time factor as in shader
      
      // Calculate color based on sine waves with phase offsets (like in the shader)
      const purpleFactor = 0.5 + 0.5 * Math.sin(t * 1.0);
      const orangeFactor = 0.5 + 0.5 * Math.sin(t * 1.0 + 2.094); // 2π/3 offset
      const greenFactor = 0.5 + 0.5 * Math.sin(t * 1.0 + 4.188);  // 4π/3 offset
      
      // Blend RGB values exactly like the shader does
      const r = Math.round(
        (brandColors.purple.rgb[0] / 255) * purpleFactor + 
        (brandColors.orange.rgb[0] / 255) * orangeFactor + 
        (brandColors.green.rgb[0] / 255) * greenFactor
      ) * 255;
      
      const g = Math.round(
        (brandColors.purple.rgb[1] / 255) * purpleFactor + 
        (brandColors.orange.rgb[1] / 255) * orangeFactor + 
        (brandColors.green.rgb[1] / 255) * greenFactor
      ) * 255;
      
      const b = Math.round(
        (brandColors.purple.rgb[2] / 255) * purpleFactor + 
        (brandColors.orange.rgb[2] / 255) * orangeFactor + 
        (brandColors.green.rgb[2] / 255) * greenFactor
      ) * 255;
      
      // Get dominant color for glow effect
      let dominantColor = brandColors.purple.color;
      if (orangeFactor > purpleFactor && orangeFactor > greenFactor) {
        dominantColor = brandColors.orange.color;
      } else if (greenFactor > purpleFactor && greenFactor > orangeFactor) {
        dominantColor = brandColors.green.color;
      }
      
      if (textRef.current) {
        // Apply color to text with RGB
        textRef.current.style.color = `rgb(${r}, ${g}, ${b})`;
        // Apply matching glow effect
        textRef.current.style.textShadow = `0 0 5px ${dominantColor}, 0 0 10px ${dominantColor}`;
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    // Reset typing state when text changes
    setCompletedTyping(false);
    setIsFading(false);
    setDisplayResponse('');
    let i = 0;

    // Type out the current text character by character
    const intervalId = setInterval(() => {
      setDisplayResponse(currentText.slice(0, i));
      i++;
      if (i > currentText.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [currentText, typingSpeed]);

  // Handle fade out and cycle to next text
  useEffect(() => {
    if (!completedTyping || textArray.length <= 1) return;
    
    // Start fade after specified delay
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, fadeDelay);
    
    // After fading out and cycle time, move to next text
    const cycleTimeout = setTimeout(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
    }, fadeDelay + 500); // Add 500ms for the fade transition
    
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(cycleTimeout);
    };
  }, [completedTyping, fadeDelay, cycleSpeed, textArray.length]);
  
  const CursorSVG = () => (
    <svg
      viewBox="8 4 8 16"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-[1ch] animate-flicker mb-1"
    >
      <rect x="10" y="6" width="4" height="12" fill="currentColor" />
    </svg>
  );
  
  return (
    <span 
      ref={textRef}
      className={`relative inline-block ${className} terminal-text font-mono px-3 py-1 w-full min-h-[4rem] block`}
    >
      <span 
        className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
      >
        {displayResponse}
      </span>
      {!completedTyping && <CursorSVG />}
    </span>
  );
} 