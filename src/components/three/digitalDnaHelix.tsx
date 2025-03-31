'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

interface HelixProps {
  width?: number
  height?: number
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  ribbonCount?: number
  rungColor?: string
  nodesPerStrand?: number
  strandThickness?: number
}

export default function DigitalDnaHelix({ 
  width = 400, 
  height = 400, 
  primaryColor = '#6d28d9', // Purple
  secondaryColor = '#f472b6', // Pink
  backgroundColor = '#030712', // Very dark gray
  ribbonCount = 2,
  rungColor = '#3b82f6', // Blue for rungs
  nodesPerStrand = 24, // Default nodes per strand
  strandThickness = 0.08 // Dramatically reduced thickness from original 0.3
}: HelixProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width, height })
  const animationFrameRef = useRef<number>(0)
  
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

    updateDimensions() // Initial dimension set

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const ref = mountRef.current
    if (!ref) return

    // Scene setup
    const scene = new THREE.Scene()
    
    const camera = new THREE.PerspectiveCamera(50, dimensions.width / dimensions.height, 0.1, 1000)
    camera.position.z = 40 // Moved back
    camera.position.y = 15  // Increased from 5 to 15 for better view
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Enable alpha channel for transparency
    })
    renderer.setSize(dimensions.width, dimensions.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // Set clear color with 0 opacity
    ref.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)
    
    const primaryLight = new THREE.PointLight(primaryColor, 1, 30)
    primaryLight.position.set(5, 5, 5)
    scene.add(primaryLight)
    
    const secondaryLight = new THREE.PointLight(secondaryColor, 1, 30)
    secondaryLight.position.set(-5, -5, 5)
    scene.add(secondaryLight)

    // Helix container
    const helixGroup = new THREE.Group()
    scene.add(helixGroup)

    // Set initial y-axis rotation (25 degrees)
    helixGroup.rotation.y = Math.PI * 25 / 180

    // Helix parameters
    const helixRadius = 4
    const helixHeight = 35 // Increased by 40% from previous value of 25
    const helixTurns = 3
    const segmentsPerTurn = nodesPerStrand // Use the new parameter
    const totalSegments = segmentsPerTurn * helixTurns
    
    // Create ribbons
    const ribbons: THREE.Mesh[] = []
    for (let i = 0; i < ribbonCount; i++) {
      // Create curve points for the ribbon
      const curvePoints = []
      const phaseOffset = (i / ribbonCount) * Math.PI * 2
      
      for (let j = 0; j <= totalSegments; j++) {
        const t = j / totalSegments
        const angle = t * Math.PI * 2 * helixTurns + phaseOffset
        
        const x = helixRadius * Math.cos(angle)
        const y = helixHeight * (t - 0.5)
        const z = helixRadius * Math.sin(angle)
        
        curvePoints.push(new THREE.Vector3(x, y, z))
      }
      
      const curve = new THREE.CatmullRomCurve3(curvePoints)
      
      // Create tube geometry around curve
      const tubeGeometry = new THREE.TubeGeometry(
        curve, 
        totalSegments,
        strandThickness, 
        8, // reduced from 12 for even more delicate wireframe appearance
        false // closed
      )
      
      // Create wireframe material only
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? primaryColor : secondaryColor,
        wireframe: true,
        transparent: true,
        opacity: 0.6 // Further reduced
      })
      
      const wireframeMesh = new THREE.Mesh(tubeGeometry, wireframeMaterial)
      helixGroup.add(wireframeMesh)
      ribbons.push(wireframeMesh)
    }
    
    // Create cross-connections between ribbons
    if (ribbonCount >= 2) {
      // Start from index 8 to skip the bottom-most rung
      for (let i = 8; i < totalSegments; i += 8) { // Changed from 4 to 8 to reduce number of rungs
        for (let ribbonIndex = 0; ribbonIndex < ribbonCount; ribbonIndex++) {
          const nextRibbonIndex = (ribbonIndex + 1) % ribbonCount
          
          // Calculate position for current ribbon
          const t = i / totalSegments
          const angle1 = t * Math.PI * 2 * helixTurns + (ribbonIndex / ribbonCount) * Math.PI * 2
          
          const x1 = helixRadius * Math.cos(angle1)
          const y1 = helixHeight * (t - 0.5)
          const z1 = helixRadius * Math.sin(angle1)
          
          const point1 = new THREE.Vector3(x1, y1, z1)
          
          // Calculate position for next ribbon
          const angle2 = t * Math.PI * 2 * helixTurns + (nextRibbonIndex / ribbonCount) * Math.PI * 2
          
          const x2 = helixRadius * Math.cos(angle2)
          const y2 = y1
          const z2 = helixRadius * Math.sin(angle2)
          
          const point2 = new THREE.Vector3(x2, y2, z2)
          
          // Create a cylinder between points
          const direction = new THREE.Vector3().subVectors(point2, point1)
          const connectionLength = direction.length()
          
          const connectionGeometry = new THREE.CylinderGeometry(
            0.02, // radius top - dramatically reduced from original 0.08
            0.02, // radius bottom - dramatically reduced from original 0.08
            connectionLength, // height
            4, // radial segments - further reduced for simpler geometry
            1 // height segments
          )
          
          // Rotate and position cylinder to connect points
          connectionGeometry.translate(0, connectionLength / 2, 0)
          connectionGeometry.rotateX(Math.PI / 2)
          
          // Wireframe connection material
          const connectionMaterial = new THREE.MeshBasicMaterial({
            color: secondaryColor, // Changed from rungColor to secondaryColor
            wireframe: true,
            transparent: true,
            opacity: 0.6 // Reduced from 0.8 for a more delicate appearance
          })
          
          const connection = new THREE.Mesh(connectionGeometry, connectionMaterial)
          connection.position.copy(point1)
          connection.lookAt(point2)
          
          helixGroup.add(connection)
        }
      }
    }
    
    // Add particle field
    const particleCount = 1000
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)
    
    const color1 = new THREE.Color(primaryColor)
    const color2 = new THREE.Color(secondaryColor)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Position particles in a cylindrical volume around helix
      const radius = helixRadius * (1 + Math.random() * 3.125) // Increased by 25% from 2.5
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() * 2 - 1) * helixHeight / 1.0 // Changed from 1.2 to 1.0 for 20% more vertical spread
      
      particlePositions[i3] = radius * Math.cos(theta)
      particlePositions[i3 + 1] = y
      particlePositions[i3 + 2] = radius * Math.sin(theta)
      
      // Color gradient
      const colorMix = Math.random()
      const color = new THREE.Color().lerpColors(color1, color2, colorMix)
      
      particleColors[i3] = color.r
      particleColors[i3 + 1] = color.g
      particleColors[i3 + 2] = color.b
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15, // Reduced from 0.25 for smaller particles
      vertexColors: true,
      transparent: true,
      opacity: 0.4 // Reduced from 0.5 for a lighter appearance
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    helixGroup.add(particles)
    
    // Animation
    let time = 0
    
    const animate = () => {
      time += 0.005
      
      // Rotate the helix - animation adds to the initial rotation
      helixGroup.rotation.y = (Math.PI * 25 / 180) + (time * 0.3)
      
      // Gentle camera movement - now oscillates around the higher base y position
      camera.position.y = 15 + Math.sin(time * 0.2) * 2
      camera.lookAt(0, 0, 0)
      
      // Animate ribbon materials
      ribbons.forEach((ribbon, i) => {
        if (ribbon.material instanceof THREE.MeshBasicMaterial) {
          ribbon.material.opacity = 0.5 + 0.2 * Math.sin(time + i * 0.5) // Reduced base opacity from 0.7 to 0.5
        }
      })
      
      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      if (ref && ref.parentElement) {
        const { clientWidth, clientHeight } = ref.parentElement
        
        camera.aspect = clientWidth / clientHeight
        camera.updateProjectionMatrix()
        
        renderer.setSize(clientWidth, clientHeight)
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', handleResize)
      
      // Dispose geometries and materials
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          if (object.geometry) object.geometry.dispose()
          
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          }
        }
      })
      
      renderer.dispose()
      
      if (ref.contains(renderer.domElement)) {
        ref.removeChild(renderer.domElement)
      }
    }
  }, [dimensions, primaryColor, secondaryColor, backgroundColor, ribbonCount, rungColor, nodesPerStrand, strandThickness])
  
  return <div ref={mountRef} className="w-full h-full" />
} 