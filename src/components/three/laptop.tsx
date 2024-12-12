'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

interface ModelViewerProps {
  width?: number
  height?: number
}

const MODEL = './models/Laptop.glb' 

export default function Laptop3D({ width = 400, height = 400 }: ModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const [model, setModel] = useState<THREE.Group | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Load the GLTF model
    const loader = new GLTFLoader()

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/draco/' );
loader.setDRACOLoader( dracoLoader );

    loader.load(
      MODEL,
      (gltf) => {
        const loadedModel = gltf.scene
        scene.add(loadedModel)
        modelRef.current = loadedModel


      },
      undefined,
      (error) => {
        console.error('An error occurred loading the model:', error)
      }
    )

    camera.position.z = 10 
    camera.position.y = .5 
    

    function animate() {
      requestAnimationFrame(animate)
	const model = modelRef?.current
      if (model) {
	      model.rotation.y += 0.005
      } 
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
      const model = modelRef?.current
      if (model) {
        scene.remove(model)
      }
    }
  }, [width, height])

  return <div ref={mountRef}/>
}
