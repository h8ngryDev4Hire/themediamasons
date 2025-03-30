'use client'

import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

interface RendererDimensions {
  width: number
  height: number
}

export default function Matrix() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [scene] = useState(() => new THREE.Scene())
  const [camera] = useState(() => new THREE.PerspectiveCamera(50, 1, 0.1, 100))
  const [renderer] = useState(() => new THREE.WebGLRenderer({ alpha: true }))
  const [dimensions, setDimensions] = useState<RendererDimensions>({ width: 400, height: 400 })

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

    const { width, height } = dimensions

    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    ref.appendChild(renderer.domElement)

    const gridSize = 20 
    const spacing = 2

    // Particle system setup
    const particleCount = 20 * gridSize * gridSize; // 20 particles per grid point
    const particleGeometry = new THREE.BufferGeometry()
    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 5.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(0.0, 1.0, 0.0, vOpacity);
        }
      `,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    const particlePositions = new Float32Array(particleCount * 3)
    const particleOpacities = new Float32Array(particleCount)

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('opacity', new THREE.BufferAttribute(particleOpacities, 1))

    // Initialize particle positions and opacities
    for (let i = 0; i < particleCount; i++) {
      const x = ((i % (gridSize * 20)) % gridSize - gridSize / 2) * spacing
      const z = (Math.floor((i % (gridSize * 20)) / gridSize) - gridSize / 2) * spacing
      particlePositions[i * 3] = x
      particlePositions[i * 3 + 1] = Math.random() * 20 - 10 // Random y position
      particlePositions[i * 3 + 2] = z
      particleOpacities[i] = Math.random()
    }

    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    // Define fade zones for top and bottom of the view
    const fadeDistance = 4
    const topFadeStart = 9
    const bottomFadeStart = -7

    const animate = () => {
      requestAnimationFrame(animate)

      // Move particles downward and reset their position when they're out of view
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 1] -= 0.01
        if (particlePositions[i * 3 + 1] < -10) {
          particlePositions[i * 3 + 1] = 10
        }

        // Calculate opacity based on position
        const yPos = particlePositions[i * 3 + 1]
        
        // Fade in at the top
        if (yPos > topFadeStart) {
          particleOpacities[i] = Math.max(0, Math.min(1, 1 - (yPos - topFadeStart) / fadeDistance))
        } 
        // Fade out at the bottom
        else if (yPos < bottomFadeStart) {
          particleOpacities[i] = Math.max(0, Math.min(1, (yPos - bottomFadeStart + fadeDistance) / fadeDistance))
        } 
        // Full opacity in the middle
        else {
          particleOpacities[i] = 1
        }
      }

      particleGeometry.attributes.position.needsUpdate = true
      particleGeometry.attributes.opacity.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      ref?.removeChild(renderer.domElement)
    }
  }, [dimensions])

  return <div ref={mountRef} id="matrix" aria-hidden="true" style={dimensions}></div>
}
