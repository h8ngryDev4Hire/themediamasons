'use client'

import React  from 'react'
import * as THREE from 'three'

interface ThreeObjectProps {
	name: string
}

export default function ThreeObject({}) {
	const mountRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		if (!mountRef.current) return
	
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(30, 400 / 400, 0.1, 1000)
    		const renderer = new THREE.WebGLRenderer({ 
			alpha: true,
	    	})
	
    		renderer.setSize(400, 400)
 		mountRef.current.appendChild(renderer.domElement)

    		const geometry = new THREE.BoxGeometry()
    		const material = new THREE.MeshBasicMaterial({ 
			color: 0x00ff00,
			wireframe: true
		})
    		const cube = new THREE.Mesh(geometry, material)
    		scene.add(cube)

    		camera.position.z = 5

    		const animate = () => {
   			requestAnimationFrame(animate)
			cube.rotation.x += 0.01
   			cube.rotation.y += 0.01
   			renderer.render(scene, camera)
   		}
	
 		animate()

    		return () => {
      			mountRef.current?.removeChild(renderer.domElement)
    		}
  	}, [])

  	return <div ref={mountRef}></div>
}
