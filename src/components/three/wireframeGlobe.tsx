'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

interface GlobeProps {
  width?: number
  height?: number
  connectionCount?: number
  color?: string
}

export default function WireframeGlobe({ 
  width = 400, 
  height = 400,
  connectionCount = 3,
  color = '#9333ea'
}: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width, height })

  useEffect(() => {
    const ref = mountRef.current
    if (!ref) return

    const updateDimensions = () => {
      if (ref && ref.parentElement) {
        const { clientWidth, clientHeight } = ref.parentElement
        setDimensions({ width: clientWidth, height: clientHeight })
      }
    }

    const resizeObserver = new ResizeObserver(updateDimensions)
    if (ref.parentElement) {
      resizeObserver.observe(ref.parentElement)
    }

    updateDimensions()
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const ref = mountRef.current
    if (!ref) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, dimensions.width / dimensions.height, 0.1, 1000)
    camera.position.z = 6
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(dimensions.width, dimensions.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    ref.appendChild(renderer.domElement)

    // Light setup
    const ambientLight = new THREE.AmbientLight(0x555555, 0.6)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 20)
    pointLight.position.set(2, 2, 4)
    scene.add(pointLight)

    // Create main container
    const globeContainer = new THREE.Group()
    scene.add(globeContainer)

    // Core globe - Dark with dots
    const globeRadius = 1.5
    const dotDensity = 18
    const coreGlobe = createCoreGlobe(globeRadius, dotDensity, color)
    globeContainer.add(coreGlobe)

    // Create orbit rings
    const ringCount = 3
    const rings = createRings(globeRadius, ringCount, color)
    globeContainer.add(rings)

    // Create particle systems - orbit particles
    const particleSystems = createParticleSystems(globeRadius)
    globeContainer.add(particleSystems)

    // Animation state
    let time = 0

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.005

      // Rotate the globe container
      globeContainer.rotation.y += 0.002
      
      // Animate particle systems
      if (particleSystems.children.length > 0) {
        particleSystems.children.forEach((system: THREE.Object3D, i: number) => {
          if (system instanceof THREE.Points) {
            system.rotation.y += 0.002 * (i % 2 === 0 ? 1 : -1)
            system.rotation.x = Math.sin(time * 0.2) * 0.05
            
            // Pulse particle size
            const material = system.material as THREE.PointsMaterial
            material.size = 0.04 + Math.sin(time + i) * 0.01
          }
        })
      }

      // Animate rings
      if (rings.children.length > 0) {
        rings.children.forEach((ring: THREE.Object3D, i: number) => {
          ring.rotation.x = Math.PI / 2 + Math.sin(time * 0.1) * 0.05
          ring.rotation.y += 0.001 * (i % 2 === 0 ? 1 : -1.2)
        })
      }

      renderer.render(scene, camera)
    }

    // Helper function to create the core globe with dots
    function createCoreGlobe(radius: number, dotDensity: number, dotColor: string) {
      const group = new THREE.Group()

      // Create a dark sphere core
      const coreGeometry = new THREE.IcosahedronGeometry(radius * 0.97, 1)
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x101020,
        transparent: true,
        opacity: 0.7
      })
      const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial)
      group.add(coreSphere)

      // Create dot pattern on the surface
      const dotsGroup = new THREE.Group()
      
      // Distribute points evenly on the sphere
      const pointCount = dotDensity * dotDensity 
      const pointPositions = []
      
      for (let i = 0; i < pointCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / pointCount)
        const theta = Math.sqrt(pointCount * Math.PI) * phi
        
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)
        
        pointPositions.push(new THREE.Vector3(x, y, z))
      }
      
      // Create dots as a single instanced mesh for better performance
      const dotGeometry = new THREE.SphereGeometry(0.02, 4, 4)
      const dotMaterial = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(dotColor),
        emissive: new THREE.Color(dotColor),
        emissiveIntensity: 0.5
      })
      
      const dotMatrix = new THREE.Matrix4()
      const instancedMesh = new THREE.InstancedMesh(dotGeometry, dotMaterial, pointPositions.length)
      
      pointPositions.forEach((position, i) => {
        dotMatrix.setPosition(position)
        instancedMesh.setMatrixAt(i, dotMatrix)
      })
      
      dotsGroup.add(instancedMesh)
      group.add(dotsGroup)

      return group
    }

    // Helper function to create orbit rings
    function createRings(radius: number, count: number, ringColor: string) {
      const group = new THREE.Group()
      
      const primaryColor = new THREE.Color(ringColor)
      const secondaryColor = new THREE.Color(primaryColor).multiplyScalar(0.7) // Darker version of primary
      
      for (let i = 0; i < count; i++) {
        const ringRadius = radius * (1.1 + i * 0.15)
        const ringGeometry = new THREE.RingGeometry(
          ringRadius - 0.02, 
          ringRadius, 
          64
        )
        
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: i === 0 ? primaryColor : secondaryColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.3 - i * 0.05
        })
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        // Rotate to make the ring horizontal (x-z plane)
        ring.rotation.x = Math.PI / 2
        group.add(ring)
      }
      
      return group
    }

    // Helper function to create particle systems
    function createParticleSystems(radius: number) {
      const group = new THREE.Group()
      
      // Create particle systems in different orbits based on connectionCount
      const colors = [color, 0x6b21a8, 0xc084fc, 0xa855f7, 0xd946ef]
      const systemCount = Math.min(5, Math.max(1, connectionCount)) // Limit between 1-5 systems
      
      for (let s = 0; s < systemCount; s++) {
        const orbitRadius = radius * (1.1 + s * 0.2)
        const particleCount = 300 - s * 50
        
        const positions = new Float32Array(particleCount * 3)
        
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2
          const variance = Math.random() * 0.2
          
          const x = orbitRadius * Math.cos(angle) * (1 + variance)
          const y = (Math.random() - 0.5) * orbitRadius * 0.5
          const z = orbitRadius * Math.sin(angle) * (1 + variance)
          
          positions[i * 3] = x
          positions[i * 3 + 1] = y
          positions[i * 3 + 2] = z
        }
        
        const particleGeometry = new THREE.BufferGeometry()
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        
        const particleColor = s === 0 ? new THREE.Color(color) : new THREE.Color(colors[s % colors.length])
        
        const particleMaterial = new THREE.PointsMaterial({
          color: particleColor,
          size: 0.04,
          transparent: true,
          opacity: 0.8 - s * 0.2,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        })
        
        const particles = new THREE.Points(particleGeometry, particleMaterial)
        // Add some initial rotation for variety
        particles.rotation.x = Math.random() * Math.PI
        particles.rotation.z = Math.random() * Math.PI
        
        group.add(particles)
      }
      
      return group
    }

    animate()

    // Cleanup
    return () => {
      if (ref.contains(renderer.domElement)) {
        ref.removeChild(renderer.domElement)
      }
      
      // Clean up all Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose()
          
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          }
        }
      })
      
      renderer.dispose()
    }
  }, [dimensions, connectionCount, color])

  return (
    <div 
      ref={mountRef} 
      id="cosmic-globe" 
      aria-hidden="true" 
      style={{ 
        width: dimensions.width, 
        height: dimensions.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  )
} 