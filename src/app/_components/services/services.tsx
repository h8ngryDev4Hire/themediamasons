'use client'

import React, { useState, useEffect, useRef } from 'react'
import { bangers } from '@ui/fonts'
import ServiceBlock from './service-block.tsx'
import { FetchRequest, UnknownResponse } from '@def/routes.ts'
import { ServiceBlockArray } from '@def/sanity.ts'
import { useReveal } from '@lib/hooks/useReveal'

export default function Services() {
	const [serviceBlocks, setServiceBlocks] = useState<ServiceBlockArray>([])
	const [sectionRef, revealed] = useReveal({
		threshold: 0.1
	})

	// Fetch services from API
	useEffect(() => {
		(async () => {
			try {
				const payload: FetchRequest = {
					content: 'serviceList'
				}

				const response = await fetch('/api/fetch/', {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				})

				const data: UnknownResponse = await response.json()

				if (!response.ok || !data.successful) {
					throw new Error(data.error || 'Failed to fetch services')
				}

				const serviceBlockData: ServiceBlockArray = data.data

				if (!serviceBlockData) {
					throw new Error('Request successful yet no data was received.')
				} else {
					setServiceBlocks(serviceBlockData)
				}
			} catch (error) {
				console.error('Error fetching services:', error)
			}
		})()
	}, [])

	return (
		<section 
			id="services" 
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
					Our Services
				</h2>
				<p className="text-gray-300 max-w-2xl mx-auto text-2xl">
					Scale <span className="font-extrabold">UP</span> your <span className="font-bold">Digital Presence</span> with our Services!
				</p>
			</div>

			{/* Services grid */}
			<div className="w-full max-w-7xl px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{serviceBlocks.map((service, index) => (
						<div 
							key={index}
							className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
						>
							<ServiceBlock
								name={service.name}
								desc={service.description}
								imgSrc={service.iconUrl}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
