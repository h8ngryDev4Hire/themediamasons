'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // Shader materials for psychedelic effect
    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      
      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        
        return a + b * cos(6.28318 * (c * t + d));
      }
      
      vec2 rotate(vec2 uv, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c) * uv;
      }
      
      float noise(vec2 p) {
        return sin(p.x * 10.0) * sin(p.y * 10.0);
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / resolution.y;
        vec2 uv0 = uv;
        
        // Time varying effects
        float t = time * 0.2;
        
        // Add multiple layers of rotated and warped circles
        vec3 finalColor = vec3(0.0);
        
        for (float i = 0.0; i < 4.0; i++) {
          // Distort UV space
          uv = rotate(uv0, t * (0.1 + 0.1 * i) + i * 0.7);
          
          // Create base shape - circle with noise
          vec2 p = uv;
          p += 0.1 * cos(p.yx * 3.0 + t + i);
          float d = length(p) - 0.5 + 0.2 * noise(p + t);
          
          // Calculate glow
          float glow = 0.0025 / abs(d);
          
          // Apply color palette
          vec3 col = palette(length(p) + i * 0.4 + t * 0.4);
          
          // Mix color with glow
          finalColor += col * glow * (0.3 + 0.1 * sin(time + i));
        }
        
        // Additional subtle pulsing background
        vec3 bgColor = palette(length(uv0) + time * 0.1) * 0.2;
        finalColor += bgColor;
        
        // Vignette effect
        float vignette = 1.0 - dot(uv0 * 0.5, uv0 * 0.5);
        finalColor *= vignette;
        
        // Output color
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
    
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `
    
    // Uniforms for the shader
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }
    
    // Create a plane that fills the screen
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true
    })
    
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Animation loop
    const clock = new THREE.Clock()
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      uniforms.time.value = elapsedTime
      
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    
    animate()
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-background pointer-events-none"
    />
  )
} 