'use client'

import React, { useState, useEffect, useRef } from 'react'
import { bangers, gudeaBold } from '@ui/fonts'
import { useReveal } from '@lib/hooks/useReveal'
import PricingTiers from './_components/pricing-tiers/pricing-tiers.tsx'
import Addons from './_components/addons/addons.tsx'
import CallToAction from './_components/call-to-action/call-to-action.tsx'
import dynamic from 'next/dynamic'

const Matrix = dynamic(() => import('@components/three/matrix.tsx'), { ssr: false })

export default function Pricing() {
	const [sectionRef, revealed] = useReveal({
		threshold: 0.1
	})
	
	// For the call to action section
	const [ctaRef, ctaRevealed] = useReveal({
		threshold: 0.2
	})

	return (
		<section 
			id="pricing" 
			ref={sectionRef}
			className={`
				relative w-full py-12 sm:py-16 md:py-24
				flex flex-col items-center
				max-sm:justify-center max-sm:space-y-[5rem]
				transition-all duration-1000 ease-in-out
				
				${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
			`}
		>
			{/* Matrix background effect */}
			<div 
			 className={`
			 absolute top-0 
			 w-[200%] 
			 h-full 
			 opacity-30 sm:opacity-40 md:opacity-50 
			 pointer-events-none
			`}>
				<Matrix />
			</div>
			
			{/* Background decorative elements */}
			<div className="absolute top-0 w-[200%] h-full bg-gradient-to-b from-purple-900/20 to-transparent opacity-50 pointer-events-none"></div>
			<div className="absolute top-1/4 right-0 w-32 sm:w-64 md:w-96 h-32 sm:h-64 md:h-96 bg-pink-500/10 rounded-full blur-3xl -mr-16 sm:-mr-32 md:-mr-48 pointer-events-none"></div>
			<div className="absolute bottom-1/4 left-0 w-32 sm:w-48 md:w-80 h-32 sm:h-48 md:h-80 bg-indigo-500/10 rounded-full blur-3xl -ml-16 sm:-ml-24 md:-ml-40 pointer-events-none"></div>
			
			{/* Content */}
			<div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-16 px-4">
				<div className="inline-block relative mb-2 sm:mb-3">
					<h2 className={`
						text-5xl 
						font-bold
						bg-clip-text text-transparent 
						bg-gradient-to-r from-purple-700 via-orange-500 to-yellow-500
						${bangers.className}
					`}>
						Our Website Pricing
					</h2>
					<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-3/4 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent rounded-full"></div>
				</div>
				<p className={`${gudeaBold.className} text-2xl text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto`}>
					Custom Website Solutions <span className="font-bold italic text-white">tailored</span> to your Business Needs. 
				</p>
			</div>

			{/* Pricing tiers */}
			<div className="relative z-10 w-full max-w-7xl px-2 sm:px-4 md:px-6 mb-10 sm:mb-14 md:mb-20">
				<PricingTiers />
			</div>

			{/* Add-ons section */}
			<div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 mb-10 sm:mb-14 md:mb-20 overflow-hidden">
				<div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
					<div className="relative">
						<h3 className={`${bangers.className} text-xl sm:text-2xl md:text-3xl text-white text-center mb-3 sm:mb-4 relative z-10`}>
							Enhance Your Package
						</h3>
						<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-32 sm:w-40 md:w-48 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent rounded-full"></div>
					</div>
					<p className="text-gray-300 text-center text-sm sm:text-base max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-6 sm:mb-8">
						Customize your solution with our add-ons. Schedule a consultation to discuss how these can be tailored to your specific needs.
					</p>
					<div className="w-full max-w-full overflow-hidden">
						<Addons />
					</div>
				</div>
			</div>

			{/* Call to action */}
			<div 
				ref={ctaRef}
				className={`
					relative z-10 w-full max-w-7xl px-4 sm:px-6
					transition-all duration-1000 ease-in-out delay-300
					flex items-center justify-center
					${ctaRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
				`}
			>
				<CallToAction visible={ctaRevealed} />
			</div>
		</section>
	)
}




