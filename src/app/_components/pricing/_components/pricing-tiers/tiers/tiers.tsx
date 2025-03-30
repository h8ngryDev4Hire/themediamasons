'use client'

import React, { useState, useEffect } from 'react'
import { gudeaThin, gudeaBold, bangers } from '@ui/fonts.ts'
import Button from './button.tsx'
import { Sanity } from '@def/definitions.ts'
import Image from 'next/image'

// SVG imports
import Rocketship from '@public/svg/rocketship.svg'
import FlaminTire from '@public/svg/tire-flame.svg'
import Globe from '@public/svg/globe.svg'

type CompliantPricingTier = Omit<Sanity.PricingTier, 'price'>

interface Props extends CompliantPricingTier {
	price: number
	animated?: number | boolean 
	discounted?: JSX.Element | boolean
	isShown?: boolean
	isMobile?: boolean
	isTablet?: boolean
}

export default function Tier({ 
	name, 
	codeName, 
	price, 
	perks, 
	description, 
	animated = false, 
	discounted = false, 
	isShown = false,
	isMobile = false,
	isTablet = false
}: Props) {
	const plan = codeName
	const [introStarted, setIntroState] = useState(false)

	useEffect(() => {  
		if (animated) { 
			const timer = setTimeout(() => {
				setIntroState(true)
			}, animated as number * 1000)
			return () => clearTimeout(timer)
		}
	}, [animated])

	// Get border gradient colors based on package type
	const getBorderGradient = () => {
		switch(codeName) {
			case 'starter':
				return ['#a78bfa', '#6366f1']
			case 'business':
				return ['#ec4899', '#a855f7']
			case 'enterprise':
				return ['#ef4444', '#ec4899'] 
			default:
				return ['#a78bfa', '#6366f1']
		}
	}

	return (
		<div 
			className={`
				group
				relative
				bg-black/40 backdrop-blur-sm
				border border-purple-500/20
				rounded-xl p-4 sm:p-5 md:p-6 shadow-lg
				w-full max-w-[320px] sm:max-w-md
				flex flex-col
				transition-all duration-700 ease-in-out
				${animated && !introStarted ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}
				hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl hover:z-10
			`}
		>
			{/* Animated border effect */}
			<div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-0" 
				style={{
					background: `linear-gradient(90deg, ${getBorderGradient()[0]}, ${getBorderGradient()[1]}, ${getBorderGradient()[0]})`,
					backgroundSize: '200% 100%',
					animation: 'gradient-border-move 3s linear infinite'
				}}
			/>
			
			{/* Actual content with background to cover the gradient except at borders */}
			<div className="relative z-10 bg-black/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 flex flex-col h-full">
				{/* Header - Flexible layout for all screen sizes */}
				<div className="flex flex-row sm:flex-col items-center sm:items-center mb-4">
					{/* Always show icon, but conditionally position it */}
					<div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 flex items-center justify-center mr-3 sm:mr-0 sm:mb-3 md:mb-4">
						{codeName === 'starter' && <Rocketship className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 fill-white opacity-75" />}
						{codeName === 'business' && <FlaminTire className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 fill-white opacity-75" />}
						{codeName === 'enterprise' && <Globe className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 fill-white opacity-75" />}
					</div>
					<div className="sm:text-center">
						<h3 className={`${bangers.className} text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-0 sm:mb-1 md:mb-2`}>
							{name}
						</h3>
						<p className={`${gudeaThin.className} text-gray-400 text-xs sm:text-xs md:text-sm`}>Tier</p>
					</div>
				</div>
				
				{/* Contact for pricing message - adjusted spacing for responsive layout */}
				<div className="mb-3 sm:mb-5 md:mb-6 text-center">
					<p className={`${gudeaThin.className} sm:${gudeaBold.className} text-purple-300 text-xs sm:text-base md:text-lg italic font-medium`}>
						Contact us for custom pricing
					</p>
					<p className={`${gudeaThin.className} text-gray-400 text-xs md:text-sm mt-1 sm:mt-2 hidden sm:block`}>
						Tailored solutions for your specific needs
					</p>
				</div>
				
				{/* Features with adjusted spacing for mobile */}
				<div className="mb-3 sm:mb-5 md:mb-6">
					<h4 className={`${gudeaBold.className} text-white text-xs sm:text-base md:text-lg mb-1 sm:mb-3`}>Features:</h4>
					<ul className="space-y-0.5 sm:space-y-1 md:space-y-2 mb-2 sm:mb-4">
						{perks.map((perk, index) => (
							<li key={index} className="flex items-start">
								<span className="text-purple-500 mr-2 text-sm sm:text-base">•</span>
								<span className={`${gudeaThin.className} text-gray-300 text-sm sm:text-sm md:text-base`}>
									{perk}
								</span>
							</li>
						))}
					</ul>
				</div>
				
				{/* Description - Hide on smallest screens, truncate on medium */}
				<div className="mb-4 sm:mb-5 md:mb-6 flex-grow hidden sm:block">
					<p className={`${gudeaThin.className} text-gray-300 text-xs sm:text-xs md:text-sm`}>
						{description.length > 120 ? `${description.substring(0, 120)}...` : description}
					</p>
				</div>
				
				{/* Button with appropriate size */}
				<div className="flex justify-center mt-2 sm:mt-auto">
					<Button 
						selectedPlan={plan} 
						isMobile={true}
					/>
				</div>
			</div>
		</div>
	)
}
