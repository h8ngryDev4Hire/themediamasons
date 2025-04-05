import React from 'react'
import { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import Image from 'next/image'
import useModal from '@hooks/useModal'
import { SIGNATURE as SERVICE_DETAILS_SIGNATURE } from '@components/modals/serviceDetailsModal/serviceDetailsModal'
import { Sanity } from '@def/definitions'

interface ServiceBlockProps {
	name: string;
	description: {
		short: string;
		long: string;
	} | string; // Support for both new schema and legacy format
	dataPoints?: string[];
	iconType?: 'lucide' | 'custom';
	lucideIcon?: string | null;
	customIconUrl?: string | null;
	Icon?: LucideIcon; // For backward compatibility
}

export default function ServiceBlock({ 
	name, 
	description, 
	dataPoints,
	iconType,
	lucideIcon,
	customIconUrl,
	Icon 
}: ServiceBlockProps) {
	const { openModal } = useModal()
	const isLegacyFormat = typeof description === 'string'
	const displayDescription = isLegacyFormat ? description : description.short

	// Get the appropriate Lucide icon component
	const getLucideIcon = (): LucideIcon | null => {
		if (Icon) {
			return Icon; // Use provided Icon (backward compatibility)
		}
		if (iconType === 'lucide' && lucideIcon && lucideIcon in LucideIcons) {
			return LucideIcons[lucideIcon as keyof typeof LucideIcons] as LucideIcon;
		}
		return null;
	}

	const LucideIconComponent = getLucideIcon()

	const handleClick = () => {
		// Prepare the data to be passed to the modal
		const serviceDetails = {
			name,
			description: isLegacyFormat 
				? { short: description as string, long: description as string } 
				: description,
			dataPoints: dataPoints || [],
			iconType,
			lucideIcon,
			customIconUrl: customIconUrl || '/icons/default-service.svg'
		}

		// Open the modal with service details
		openModal({
			signature: SERVICE_DETAILS_SIGNATURE,
			disableScroll: true,
			metadata: serviceDetails
		})
	}

	return (
		<div 
			onClick={handleClick}
			className="cursor-pointer bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/25 hover:border-purple-500/50 flex flex-col sm:flex-row items-center group cursor-pointer"
		>
			{/* Mobile layout: Title, Icon, Description */}
			<div className="sm:hidden w-full flex flex-col items-center text-center mb-4">
				<h3 className="text-2xl font-bold text-white mb-3">{name}</h3>
				<div className="mb-3 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
					{LucideIconComponent ? (
						<LucideIconComponent className="w-14 h-14 text-purple-500 transition-all duration-300 group-hover:text-purple-400" />
					) : (
						<Image 
							src={customIconUrl || '/icons/default-service.svg'} 
							alt={name}
							width={56}
							height={56}
							className="w-14 h-14 text-purple-500 transition-all duration-300 group-hover:brightness-110"
						/>
					)}
				</div>
				<p className="text-gray-300">{displayDescription}</p>
			</div>
			
			{/* Desktop layout: Icon, Title+Description */}
			<div className="hidden sm:flex flex-shrink-0 w-20 h-20 items-center justify-center mr-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
				{LucideIconComponent ? (
					<LucideIconComponent className="w-14 h-14 text-purple-500 transition-all duration-300 group-hover:text-purple-400" />
				) : (
					<Image 
						src={customIconUrl || '/icons/default-service.svg'} 
						alt={name}
						width={56}
						height={56}
						className="w-14 h-14 text-purple-500 transition-all duration-300 group-hover:brightness-110"
					/>
				)}
			</div>
			<div className="hidden sm:block flex-grow">
				<h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
				<p className="text-gray-300">{displayDescription}</p>
			</div>
		</div>
	)
}
