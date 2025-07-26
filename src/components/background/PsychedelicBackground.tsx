'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

export default function PsychedelicBackground() {
  // Reference for the container div
  const containerRef = useRef<HTMLDivElement>(null)
  // Track scroll position
  const [scrollY, setScrollY] = useState(0)
  // Track portfolio interaction dimming
  const [isDimmed, setIsDimmed] = useState(false)
  
  useEffect(() => {
    // Safety check
    if (!containerRef.current) return
    
    // Set up container dimensions
    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight
    
    // Create a renderer with proper transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0) // Transparent background
    
    // Add renderer to DOM
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    
    // Set ID and styles for the canvas element
    const canvas = renderer.domElement
    canvas.id = 'psychedelic-canvas'
    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '-9999'
    
    // Create a scene
    const scene = new THREE.Scene()
    
    // Create an orthographic camera for perfect 2D coverage
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1
    
    // Create shader material with our psychedelic effect
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(width, height) },
        scrollOffset: { value: 0.0 } // New uniform for scroll offset
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float scrollOffset;
        uniform vec2 resolution;
        
        // Media Mason brand colors
        const vec3 purple = vec3(0.486, 0.227, 0.929);  // #7c3aed
        const vec3 orange = vec3(0.976, 0.451, 0.086);  // #f97316
        const vec3 green = vec3(0.035, 0.831, 0.031);   // #09d408
        
        // Custom color palette function
        vec3 palette(float t) {
          // Oscillate between brand colors
          float purpleFactor = 0.5 + 0.5 * sin(t * 1.0);
          float orangeFactor = 0.5 + 0.5 * sin(t * 1.0 + 2.094);  // 2π/3 offset
          float greenFactor = 0.5 + 0.5 * sin(t * 1.0 + 4.188);   // 4π/3 offset
          
          return purple * purpleFactor + orange * orangeFactor + green * greenFactor;
        }
        
        // Create a rotation matrix
        mat2 rotate2d(float angle) {
          return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        }
        
        // Improved noise function
        float hash(vec2 p) {
          float h = dot(p, vec2(127.1, 311.7));
          return fract(sin(h) * 43758.5453123);
        }
        
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          
          vec2 u = f * f * (3.0 - 2.0 * f);
          
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }
        
        void main() {
          // Apply parallax effect to UV coordinates based on scroll
          // Normalized pixel coordinates (centered, from -1 to 1)
          vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
          
          // Apply subtle parallax offset based on scroll
          uv.y += scrollOffset * 0.02; // Reduced from 0.05 to 0.02
          
          // Save the original coordinates for later
          vec2 uv0 = uv;
          
          // Time variable for animation
          float t = time * 0.2;
          
          // Start with a black background
          vec3 finalColor = vec3(0.0);
          
          // Layer 1: Circular patterns
          for (int i = 0; i < 4; i++) {
            float fi = float(i);
            
            // Rotate UV coordinates
            vec2 rotatedUV = uv;
            rotatedUV = rotate2d(t * 0.2 + fi * 0.5) * rotatedUV;
            
            // Create a distorted circle
            vec2 p = rotatedUV;
            p += 0.2 * vec2(cos(p.y * 3.0 + t + fi), sin(p.x * 2.0 + t * 1.5 + fi));
            float circle = length(p) - (0.4 + 0.1 * noise(p + t * 0.5));
            
            // Glow effect
            float glow = 0.003 / abs(circle);
            glow = min(glow, 1.0); // Cap the brightness
            
            // Color the glow with our palette
            vec3 color = palette(length(p) * 0.8 + t * 0.3 + fi * 0.4);
            
            // Add to final color
            finalColor += color * glow * (0.3 + 0.1 * sin(time + fi));
          }
          
          // Layer 2: Wave pattern
          float wave = sin(uv.x * 10.0 + t) * sin(uv.y * 10.0 + t * 0.7) * 0.05;
          finalColor += purple * wave * 1.5;
          
          // Layer 3: Moving spots
          for (int j = 0; j < 3; j++) {
            float fj = float(j);
            
            // Moving center coordinates
            float tj = t * 0.3 + fj * 2.094; // 2π/3 offset
            vec2 center = vec2(0.5 * cos(tj), 0.5 * sin(tj * 0.8));
            
            // Distance and glow
            float dist = length(uv0 - center);
            float spot = 0.015 / (dist + 0.05);
            spot = min(spot, 0.8);
            
            // Different color for each spot
            vec3 spotColor;
            if (j == 0) spotColor = purple;
            else if (j == 1) spotColor = orange;
            else spotColor = green;
            
            finalColor += spotColor * spot;
          }
          
          // Add subtle background color
          vec3 bgColor = palette(length(uv0) * 0.5 + time * 0.05) * 0.15;
          finalColor += bgColor;
          
          // Vignette effect for edges
          float vignette = 1.0 - dot(uv0 * 0.7, uv0 * 0.7);
          vignette = smoothstep(0.0, 0.7, vignette);
          finalColor *= vignette;
          
          // Set final color with transparency
          gl_FragColor = vec4(finalColor, 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
    })
    
    // Create a full-screen quad
    // Using a simple plane that fills the entire normalized device coordinates
    const geometry = new THREE.PlaneGeometry(2, 2)
    const quad = new THREE.Mesh(geometry, shaderMaterial)
    scene.add(quad)
    
    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      
      renderer.setSize(newWidth, newHeight)
      shaderMaterial.uniforms.resolution.value.set(newWidth, newHeight)
    }
    
    // Handle scroll events
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Convert scroll position to normalized value for shader
      const normalizedScroll = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      shaderMaterial.uniforms.scrollOffset.value = normalizedScroll
    }

    // Handle portfolio interaction dimming
    const handlePortfolioDimming = (event: CustomEvent) => {
      setIsDimmed(event.detail.interactionMode)
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('portfolioInteraction', handlePortfolioDimming as EventListener)
    
    // Animation loop
    const clock = new THREE.Clock()
    let animationId: number
    
    const animate = () => {
      shaderMaterial.uniforms.time.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('portfolioInteraction', handlePortfolioDimming as EventListener)
      cancelAnimationFrame(animationId)
      
      scene.remove(quad)
      geometry.dispose()
      shaderMaterial.dispose()
      renderer.dispose()
      
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])
  
  return (
    <>
      <div
        ref={containerRef}
        id="background-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -9999,
          overflow: 'hidden',
          pointerEvents: 'none',
          isolation: 'isolate',
          transform: `translateY(${scrollY * 0.01}px)`, // Reduced from 0.03 to 0.01
        }}
        aria-hidden="true"
      />
      
      {/* CSS Dimming overlay - positioned above the background but below all content */}
      <div
        id="background-dimming-overlay"
        className={`fixed inset-0 bg-black pointer-events-none transition-opacity duration-500 ${
          isDimmed ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          zIndex: -9998, // Just above the background but still below all content
        }}
        aria-hidden="true"
      />
    </>
  )
} 