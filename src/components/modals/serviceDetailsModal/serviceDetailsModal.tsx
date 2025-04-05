'use client'

import { useState, useEffect } from 'react'
import useModal from '@hooks/useModal'
import { bangers, gudeaBold } from '@ui/fonts'
import { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Sanity } from '@def/definitions'
import { SIGNATURE as CONTACT_MODAL_SIGNATURE } from '@components/modals/contactFormModal/contactFormModal'

export interface ServiceDetailsProps {
    name: string;
    description: {
        short: string;
        long: string;
    };
    dataPoints?: string[];
    iconType?: 'lucide' | 'custom';
    lucideIcon?: string;
    customIconUrl?: string;
    metadata?: any;
}

export const SIGNATURE: string = 'service-details-modal'

export default function ServiceDetailsModal({ metadata }: { metadata?: ServiceDetailsProps | string }) {
    const { closeModal } = useModal()
    const router = useRouter()
    const [modalState, setModalState] = useState(false)
    const [contentState, setContentState] = useState(false)
    const [headerState, setHeaderState] = useState(false)
    const [overviewState, setOverviewState] = useState(false)
    const [detailsState, setDetailsState] = useState(false)
    const [ctaState, setCtaState] = useState(false)
    const [serviceData, setServiceData] = useState<ServiceDetailsProps | null>(null)
    const [visibleDataPoints, setVisibleDataPoints] = useState<string[]>([])
    const [dataPointIndex, setDataPointIndex] = useState(0)

    // Parse metadata if it's a string
    useEffect(() => {
        if (typeof metadata === 'string') {
            try {
                const parsedData = JSON.parse(metadata) as ServiceDetailsProps;
                setServiceData(parsedData);
            } catch (error) {
                console.error('Failed to parse service details metadata:', error);
            }
        } else if (metadata) {
            setServiceData(metadata as ServiceDetailsProps);
        }
    }, [metadata]);

    // Effect for rotating data points every 3 seconds
    useEffect(() => {
        if (!serviceData?.dataPoints?.length) return;
        
        const dataPoints = serviceData.dataPoints;
        const totalPoints = dataPoints.length;
        
        const rotateDataPoints = () => {
            if (totalPoints <= 3) {
                setVisibleDataPoints(dataPoints);
                return;
            }
            
            setDataPointIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % (totalPoints - 2);
                setVisibleDataPoints(dataPoints.slice(newIndex, newIndex + 3));
                return newIndex;
            });
        };
        
        // Initial set
        if (totalPoints <= 3) {
            setVisibleDataPoints(dataPoints);
        } else {
            setVisibleDataPoints(dataPoints.slice(0, 3));
        }
        
        // Set up rotation interval
        const rotationInterval = setInterval(rotateDataPoints, 3000);
        
        return () => clearInterval(rotationInterval);
    }, [serviceData]);

    const exitModal = () => {
        setContentState(false)
        setModalState(false)
        closeModal({ 
            timeout: 500
        })
    }

    const handleContactClick = () => {
        exitModal()
        // Add a slight delay to ensure the modal is closed before navigation
        setTimeout(() => {
            router.push(`/?modal=${CONTACT_MODAL_SIGNATURE}`)
        }, 600)
    }

    const registerKeystroke = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            exitModal()
        }
    }
    
    useEffect(() => {
        // modal intro transition with staggered animations
        setModalState(true)
        
        // Staggered animations for different sections
        const timers = [
            setTimeout(() => setContentState(true), 150),
            setTimeout(() => setHeaderState(true), 300),
            setTimeout(() => setOverviewState(true), 450),
            setTimeout(() => setDetailsState(true), 600),
            setTimeout(() => setCtaState(true), 750)
        ];

        // event listener init for `esc` key action
        window.addEventListener('keydown', registerKeystroke)

        return () => {
            window.removeEventListener('keydown', registerKeystroke)
            timers.forEach(timer => clearTimeout(timer))
        }
    }, [])

    if (!serviceData) return null;
    
    const { name, description, dataPoints, iconType, lucideIcon, customIconUrl } = serviceData;

    // Render the right icon based on iconType
    const renderIcon = () => {
        if (iconType === 'lucide' && lucideIcon && lucideIcon in LucideIcons) {
            const IconComponent = LucideIcons[lucideIcon as keyof typeof LucideIcons] as LucideIcon;
            return <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400" />;
        } else if (iconType === 'custom' && customIconUrl) {
            return (
                <Image 
                    src={customIconUrl} 
                    alt={name}
                    width={64} 
                    height={64}
                    className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400"
                />
            );
        }
        
        // Fallback icon
        return (
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-purple-500/20 rounded-full">
                <span className="text-purple-400 text-xl sm:text-2xl font-bold">{name.charAt(0)}</span>
            </div>
        );
    };

    return (
        <div 
            className={`
                ${modalState ? "bg-opacity-60" : "bg-opacity-0 pointer-events-none"} 
                transition-all duration-500 ease-in-out
                fixed z-50 top-0 left-0 h-full w-screen  
                flex items-center justify-center  
                bg-black
                p-2 sm:p-0
            `}
        >
            <div 
                className={`
                    ${modalState ? "scale-100 opacity-100" : "scale-90 opacity-0"}
                    transition-all duration-500 ease-in-out
                    bg-zinc-900 border border-purple-500/20
                    w-full max-w-2xl rounded-xl overflow-hidden overflow-y-auto
                    shadow-xl shadow-purple-500/10
                    max-h-[90vh]
                `}
            >
                {/* Header with close button */}
                <div 
                    className={`
                        ${headerState ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                        transition-all duration-500 ease-in-out
                        flex justify-between items-center p-4 sm:p-6 border-b border-purple-500/20
                    `}
                >
                    <h2 className={`${bangers.className} text-2xl sm:text-3xl flex-grow text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500`}>
                        {name}
                    </h2>
                    <button 
                        onClick={exitModal}
                        className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </button>
                </div>
                
                {/* Content */}
                <div className={`
                    ${contentState ? "opacity-100" : "opacity-0"}
                    transition-all duration-500 ease-in-out
                    p-4 sm:p-6 
                `}>
                    <div 
                        className={`
                            ${overviewState ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                            transition-all duration-500 ease-in-out
                            flex flex-col sm:flex-row items-center mb-4 sm:mb-6
                        `}
                    >
                        <div className="p-3 sm:p-4 mb-3 sm:mb-0 sm:mr-6 bg-purple-500/10 rounded-full">
                            {renderIcon()}
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className={`${gudeaBold.className} text-lg sm:text-xl text-white mb-2`}>Service Overview</h3>
                            <p className="text-gray-300 text-sm sm:text-base">{description.long}</p>
                        </div>
                    </div>
                    
                    {/* Additional details section - now with rotating data points */}
                    {visibleDataPoints && visibleDataPoints.length > 0 && (
                        <div 
                            className={`
                                ${detailsState ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                                transition-all duration-500 ease-in-out
                                mt-6 sm:mt-8
                            `}
                        >
                            <h3 className={`${gudeaBold.className} text-lg sm:text-xl text-white mb-3 sm:mb-4`}>What We Offer</h3>
                            <div className="space-y-3">
                                {visibleDataPoints.map((point, index) => (
                                    <div 
                                        key={index} 
                                        className={`
                                            transition-all duration-300 ease-in-out
                                            flex items-start
                                        `}
                                        style={{ 
                                            transitionDelay: detailsState ? `${index * 100}ms` : '0ms'
                                        }}
                                    >
                                        <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5">
                                            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-purple-500"></span>
                                        </div>
                                        <span className="text-gray-300 text-sm sm:text-base">{point}</span>
                                    </div>
                                ))}
                            </div>
                            {(dataPoints && dataPoints.length > 3) && (
                                <div className="flex justify-center mt-3">
                                    <div className="flex space-x-1">
                                        {Array.from({ length: Math.ceil(dataPoints.length / 3) }).map((_, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`h-1.5 w-1.5 rounded-full ${idx === Math.floor(dataPointIndex / 3) ? 'bg-purple-500' : 'bg-purple-500/30'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* CTA */}
                    <div 
                        className={`
                            ${ctaState ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                            transition-all duration-500 ease-in-out
                            mt-6 sm:mt-8 flex justify-center
                        `}
                    >
                        <button 
                            onClick={handleContactClick}
                            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm sm:text-base font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25"
                        >
                            Contact Us For Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 