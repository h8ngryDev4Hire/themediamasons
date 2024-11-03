'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

const GRID_COUNT = 60
const GRID_SIZE = 60
const GRID_DIVISIONS = 20
const GRID_MOVE_SPEED = 0.05
const REPOSITION_THRESHOLD = 40 // Distance behind camera to trigger repositioning


interface rendererDimensions {
	width: number
	height: number
}



export default function MatrixScape() {
	const mountRef = useRef<HTMLDivElement>(null)
	const gridsRef = useRef<THREE.GridHelper[]>([])

	const [scene] = useState(() => new THREE.Scene())
	const [camera] = useState(() => new THREE.PerspectiveCamera(100, 400 / 400, 1, 400))
	const [renderer] = useState(() => new THREE.WebGLRenderer({ alpha: true }))
	const [ dimensions, setDimensions ] = useState<rendererDimensions>({ width: 800, height: 400 })

	useEffect(()=>{
		if (!mountRef.current) return
	
	    	const updateDimensions = () => {
	      		if (mountRef.current && mountRef.current.parentElement) {
	        		const { clientWidth, clientHeight } = mountRef.current.parentElement
				console.log('client dimensions: ', clientWidth, clientHeight)
	        		setDimensions({ width: clientWidth, height: clientHeight })
	      		}
	    	}
	
	    	const resizeObserver = new ResizeObserver(updateDimensions)
	    	if (mountRef.current.parentElement) {
	      		resizeObserver.observe(mountRef.current.parentElement)
	    	}
	
	    	updateDimensions() // Initial dimension set
	
	    	return () => resizeObserver.disconnect()
	},[])

  	useEffect(() => {
		if (!mountRef.current) return

		const { width, height } = dimensions

		renderer.setSize(width, height) // Increased width for wider view
		camera.aspect = width / height
		camera.updateMatrix()

		mountRef.current.appendChild(renderer.domElement)
		
	    	// Create grids: left, center, right
		for (let i = -1; i < GRID_COUNT - 1; i++) {
			const grid = new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS, 0x00ff00, 0x00ff00)
		      	grid.position.z = i * GRID_SIZE
		      	scene.add(grid)
		      	gridsRef.current.push(grid)
		}
		
		camera.position.set(0, 10, 40) // Adjust camera position
		camera.lookAt(0, 0, 0)
		
		function animate() {
		  	requestAnimationFrame(animate)
		      
		      	gridsRef.current.forEach((grid) => {
		        	grid.position.z += GRID_MOVE_SPEED
		
		        	// If the grid has moved past the reposition threshold, move it to the back
		        	if (grid.position.z > camera.position.z + REPOSITION_THRESHOLD) {
		          		grid.position.z -= GRID_SIZE * GRID_COUNT
		        	}
		      	})
		
		      	renderer.render(scene, camera)
		}
		
		animate()
		
		return () => {
			mountRef.current?.removeChild(renderer.domElement)
		      	gridsRef.current.forEach(grid => {
		        	scene.remove(grid)
		        	grid.dispose()
		      	})
		}
	}, [dimensions])




	useEffect(()=>{
		console.log('client changed')
	},[mountRef?.current?.parentElement?.clientWidth, mountRef?.current?.parentElement?.clientHeight])
	
	return <div ref={mountRef} id="matrixscape" aria-hidden="true" style={dimensions}></div>
}
