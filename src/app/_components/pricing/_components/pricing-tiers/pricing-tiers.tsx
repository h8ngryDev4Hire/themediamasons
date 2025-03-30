'use client'

import React, { useEffect, useState } from 'react'
import Tier from './tiers/tiers.tsx'
import PricingDeal from './pricing-deal.tsx'
import { Routes, Sanity } from '@def/definitions.ts'

export default function PricingTiers() {
	const [pricingTiers, setPricingTiers] = useState<Sanity.PricingTier[]>([])
	const [currentTierIndex, setCurrentTierIndex] = useState(0)

	// Function to navigate to next tier
	const nextTier = () => {
		setCurrentTierIndex((prev) => (prev + 1) % pricingTiers.length)
	}

	// Function to navigate to previous tier
	const prevTier = () => {
		setCurrentTierIndex((prev) => (prev - 1 + pricingTiers.length) % pricingTiers.length)
	}

	useEffect(() => {
		(async() => {
			try {
				const payload: Routes.FetchRequest = {
					content: 'pricingTiers'
				}

				const response = await fetch('/api/fetch/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				})

				const data: Routes.UnknownResponse = await response.json()

				if (!response.ok || !data.successful) {
					throw new Error(data.error || 'Failed to fetch pricing tiers')
				}

				const pricingTierData = data.data

				if (!pricingTierData) {
					throw new Error('Request successful yet no data was received.')
				}
				else {
					setPricingTiers(pricingTierData)
				}

			} catch(error) {
				console.error('Error fetching pricing tiers:', error)
			}
		})()
	}, [])

	// Get the tier to display in carousel view
	const displayedTier = pricingTiers[currentTierIndex]

	return (
		<>
			{/* XL and above - grid layout showing all tiers */}
			<div className="hidden xl:grid xl:grid-cols-3 xl:gap-8 w-full px-2 sm:px-4">
				{pricingTiers.map((tier, index) => (
					<div
						key={index}
						className="flex justify-center"
					>
						<Tier
							codeName={tier.codeName as Sanity.ServicePackage}
							name={tier.name}
							price={tier.price.discounted}
							perks={tier.perks}
							description={tier.description}
							animated={index * 0.2} 
							discounted={
								<PricingDeal discount={tier.price.original}/>
							}
						/>
					</div>
				))}
			</div>

			{/* All breakpoints below XL - carousel layout */}
			<div className="flex flex-row items-center justify-center xl:hidden w-full px-0 sm:px-4">
				{/* Previous button */}
				<button 
					onClick={prevTier}
					className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mr-1 sm:mr-4 md:mr-6 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-full shadow-lg hover:bg-black/60 transition-all duration-300 focus:outline-none z-10"
					aria-label="Previous tier"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				{/* Current tier */}
				{displayedTier && (
					<div className="flex justify-center transition-all duration-300 ease-in-out transform scale-125 sm:scale-100 w-full max-w-[92vw] sm:max-w-none">
						<Tier
							codeName={displayedTier.codeName as Sanity.ServicePackage}
							name={displayedTier.name}
							price={displayedTier.price.discounted}
							perks={displayedTier.perks}
							description={displayedTier.description}
							animated={false}
							discounted={
								<PricingDeal discount={displayedTier.price.original}/>
							}
						/>
					</div>
				)}

				{/* Next button */}
				<button 
					onClick={nextTier}
					className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ml-1 sm:ml-4 md:ml-6 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-full shadow-lg hover:bg-black/60 transition-all duration-300 focus:outline-none z-10"
					aria-label="Next tier"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			{/* Tier indicators */}
			<div className="flex justify-center mt-3 sm:mt-4 md:mt-5 xl:hidden w-full">
				{pricingTiers.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentTierIndex(index)}
						className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 mx-1 rounded-full focus:outline-none transition-all duration-300 ${
							index === currentTierIndex ? 'bg-purple-500' : 'bg-purple-500/30'
						}`}
						aria-label={`Go to tier ${index + 1}`}
					/>
				))}
			</div>
		</>
	)
}
