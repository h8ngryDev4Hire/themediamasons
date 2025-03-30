'use client'

import React, { useEffect, useState, useRef } from 'react'
import { bangers, gudeaBold } from '@ui/fonts'

interface LoadingScreenProps {
	onLoadingComplete?: () => void;
	minDisplayTime?: number;  // Minimum time to show loading screen in ms
}

export default function LoadingProgressBar({ 
	onLoadingComplete, 
	minDisplayTime = 2000
}: LoadingScreenProps = {}) {
	const [progress, setProgress] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [isExiting, setIsExiting] = useState(false)
	const startTimeRef = useRef(Date.now())
	const animationFrameRef = useRef<number | null>(null)

	// Simulate random loading progress
	useEffect(() => {
		const simulateLoading = () => {
			setProgress(prev => {
				// Gradually slow down as we approach 100%
				const increment = Math.random() * (1 - prev / 100) * 2
				const nextProgress = Math.min(prev + increment, 99.9)
				return nextProgress
			})

			if (progress < 99.9) {
				animationFrameRef.current = requestAnimationFrame(simulateLoading)
			}
		}

		animationFrameRef.current = requestAnimationFrame(simulateLoading)

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [progress])

	// Handle document load complete
	useEffect(() => {
		const completeLoading = () => {
			const timeElapsed = Date.now() - startTimeRef.current
			const remainingTime = Math.max(0, minDisplayTime - timeElapsed)

			// Ensure the loading screen is displayed for at least minDisplayTime
			setTimeout(() => {
				setProgress(100)
				
				// Start exit animation
				setIsExiting(true)
				
				// Complete loading after exit animation
				setTimeout(() => {
					setIsLoading(false)
					if (onLoadingComplete) onLoadingComplete()
				}, 800) // Match the exit animation duration
			}, remainingTime)
		}

		// Listen for window load event
		window.addEventListener('load', completeLoading)

		// Fallback in case the load event already fired
		if (document.readyState === 'complete') {
			completeLoading()
		}

		return () => {
			window.removeEventListener('load', completeLoading)
		}
	}, [minDisplayTime, onLoadingComplete])

	// If loading is complete, don't render anything
	if (!isLoading) return null

	return (
		<div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-800 ${
			isExiting ? 'opacity-0' : 'opacity-100'
		}`}>
			{/* Matrix-like character rain (decorative background) */}
			<div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
				<MatrixRain />
			</div>
			
			{/* Loading content */}
			<div className="relative z-10 flex flex-col items-center px-4">
				{/* Logo/Title with animated letters */}
				<h1 className={`${bangers.className} text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-8 text-center`}>
					<AnimatedTitle text="THE MEDIA MASONS" />
				</h1>
				
				{/* Glowing progress bar */}
				<div className="w-full max-w-md mb-4 relative">
					<div className="h-2 bg-gray-800 rounded-full overflow-hidden">
						<div 
							className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full transition-all duration-300 ease-out"
							style={{ width: `${progress}%` }}
						/>
					</div>
					<div 
						className="absolute top-0 h-2 rounded-full opacity-50 blur-sm bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-300 ease-out"
						style={{ width: `${progress}%` }}
					/>
				</div>
				
				{/* Loading status text */}
				<p className={`${gudeaBold.className} text-sm text-gray-400`}>
					{progress < 100 ? 'Loading...' : 'Welcome!'}
				</p>
			</div>
		</div>
	)
}

// Animated title component
function AnimatedTitle({ text }: { text: string }) {
	return (
		<div className="flex flex-wrap justify-center">
			{text.split('').map((char, index) => {
				if (char === ' ') return <span key={index} className="w-3 sm:w-4" />
				
				return (
					<span
						key={index}
						className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 animate-pulse"
						style={{ 
							animationDelay: `${index * 0.1}s`,
							animationDuration: '1.5s'
						}}
					>
						{char}
					</span>
				)
			})}
		</div>
	)
}

// Matrix-like background effect
function MatrixRain() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		
		const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789"
		const columns = Math.floor(canvas.width / 20)
		const drops: number[] = []
		
		// Initialize drops
		for (let i = 0; i < columns; i++) {
			drops[i] = Math.random() * -100
		}
		
		// Drawing function
		const draw = () => {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			
			ctx.fillStyle = '#0F0'
			ctx.font = '16px monospace'
			
			for (let i = 0; i < drops.length; i++) {
				const text = characters.charAt(Math.floor(Math.random() * characters.length))
				ctx.fillText(text, i * 20, drops[i] * 20)
				
				if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
					drops[i] = 0
				}
				
				drops[i]++
			}
		}
		
		// Animation loop
		const interval = setInterval(draw, 50)
		
		// Handle resize
		const handleResize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}
		
		window.addEventListener('resize', handleResize)
		
		return () => {
			clearInterval(interval)
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	
	return <canvas ref={canvasRef} className="w-full h-full" />
}
