import React from 'react'
import { Sanity } from '@def/definitions';
import useModal from '@hooks/useModal';
import { gudeaBold } from '@ui/fonts.ts'
import { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx'

interface Props {
	selectedPlan: Sanity.ServicePackage; 
	isMobile?: boolean
}

export default function Button( { selectedPlan, isMobile = false } : Props )  {
	const { openModal, closeModal, modalState } = useModal()

	const handleButtonClick = () => {
		if (modalState) closeModal()
		openModal({
			signature: SIGNATURE,
			disableScroll: true,
			metadata:  selectedPlan 
		})
	}

	// Get gradient colors based on plan
	const getButtonGradient = () => {
		switch(selectedPlan) {
			case 'starter':
				return 'from-purple-600 to-indigo-600'
			case 'business':
				return 'from-pink-600 to-purple-600'
			case 'enterprise':
				return 'from-red-600 to-pink-600'
			default:
				return 'from-purple-600 to-indigo-600'
		}
	}

	return (
		<button 
			onClick={handleButtonClick}
			className={`
				group
				relative
				px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3
				rounded-lg
				text-white font-bold
				text-xs sm:text-sm md:text-base
				transition-all duration-300
				hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30
				focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
				overflow-hidden
				backdrop-blur-sm
				bg-black/40
				border border-purple-500/30
				hover:border-purple-500/50
				${gudeaBold.className}
			`}
		>
			<span className="relative z-10">Schedule Consultation</span>
			{/* The animated gradient overlay - only visible on hover */}
			<span 
				className={`absolute inset-0 bg-gradient-to-r ${getButtonGradient()} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
				style={{
					backgroundSize: '200% 100%',
					animation: 'gradient-border-move 3s ease infinite'
				}}
			/>
			{/* Shine effect */}
			<span 
				className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
			/>
		</button>
	)
}
