'use client'
import React, { useRef, useEffect, useState } from 'react'
import { FetchRequest, UnknownResponse } from "@def/routes"
import { AboutTextContentArray, AboutHighlightArray, ComponentType } from "@def/sanity"
import { useReveal } from '@lib/hooks/useReveal'
import { bangers } from "@ui/fonts"
import TextContent from "./_components/text-content/text-content"
import Box3D from "./_components/3d-box"
import dynamic from 'next/dynamic'

// Dynamic imports with ssr: false to prevent server-side rendering of Three.js components
const Laptop3D = dynamic(() => import('@components/three/laptop'), { ssr: false })
const WireframeGlobe = dynamic(() => import('@components/three/wireframeGlobe'), { ssr: false })
const DigitalDnaHelix = dynamic(() => import('@components/three/digitalDnaHelix'), { ssr: false })

export default function About() {
	const [aboutTextContent, setAboutTextContent] = useState<AboutTextContentArray>([])
	const [aboutHighlights, setAboutHighlights] = useState<AboutHighlightArray>([])
	const [loading, setLoading] = useState(true)
	const [sectionRef, revealed] = useReveal()

	// Helper to find highlight by component type
	const getHighlightForComponent = (componentType: ComponentType) => {
		return aboutHighlights.find(highlight => highlight.componentType === componentType) || {
			title: "",
			description: ""
		}
	}

	// Fetch about content from API
	useEffect(() => {
		const fetchAboutData = async () => {
			try {
				// Fetch about text content
				const textContentPayload: FetchRequest = {
					content: 'about'
				}

				const textContentResponse = await fetch('/api/fetch/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(textContentPayload)
				})

				const textContentData: UnknownResponse = await textContentResponse.json()

				if (!textContentResponse.ok || !textContentData.successful) {
					throw new Error(textContentData.error || 'Failed to fetch about content')
				}

				const aboutData: AboutTextContentArray = textContentData.data

				if (!aboutData || aboutData.length === 0) {
					throw new Error('Request successful yet no text content data was received.')
				} else {
					setAboutTextContent(aboutData)
				}
				
				// Fetch about highlights
				const highlightsPayload: FetchRequest = {
					content: 'aboutHighlight'
				}

				const highlightsResponse = await fetch('/api/fetch/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(highlightsPayload)
				})

				const highlightsData: UnknownResponse = await highlightsResponse.json()

				if (!highlightsResponse.ok || !highlightsData.successful) {
					throw new Error(highlightsData.error || 'Failed to fetch about highlights')
				}

				const aboutHighlightsData: AboutHighlightArray = highlightsData.data

				if (aboutHighlightsData && aboutHighlightsData.length > 0) {
					setAboutHighlights(aboutHighlightsData)
				}
				
				setLoading(false)
			} catch(error) {
				console.error('Error fetching about content:', error)
				setLoading(false)
			}
		}
		
		fetchAboutData()	
	}, [])

	return (
		<section 
			id="about" 
			ref={sectionRef}
			className={`
				w-full py-12 md:py-20
				flex flex-col items-center
				transition-all duration-1000 ease-in-out
				${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
			`}
		>
			<div className="text-center mb-10 md:mb-16">
				<h2 className={`
					text-5xl 
					font-bold mb-4
					bg-clip-text text-transparent 
					bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
					${bangers.className}
				`}>
					About The Media Masons
				</h2>

				<p className="text-gray-300 max-w-2xl mx-auto text-2xl">
					Learn more about our story and what drives us to create amazing digital experiences.
				</p>
			</div>

			{/* Main content area */}
			<div className="w-full max-w-7xl px-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* 3D visualizations column for larger screens */}
					<div className="hidden lg:flex lg:col-span-1 flex-col space-y-8">
						{/* 3D Laptop */}
						<Box3D
							info={getHighlightForComponent('laptop')}
						>
							<Laptop3D width={300} height={300} />
						</Box3D>
						
						{/* Wireframe Globe */}
						<Box3D
							info={getHighlightForComponent('globe')}
						>
							<WireframeGlobe 
								connectionCount={4} 
								color="#9333ea" 
								width={300}
								height={300}
							/>
						</Box3D>
						
						{/* DNA Helix */}
						<Box3D
							info={getHighlightForComponent('dnaHelix')}
						>
							<DigitalDnaHelix 
								primaryColor="#00ff00"
								secondaryColor="#ccff00"
								width={300}
								height={300}
								nodesPerStrand={16}
								strandThickness={3}
							/>
						</Box3D>
					</div>

					{/* About content */}
					<div className="lg:col-span-2 space-y-6">
						{aboutTextContent.map((block, index) => (
							<div 
								key={index}
								className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
							>
								<TextContent
									name={block.name}
									description={block.description}
									quote={block.quote}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
