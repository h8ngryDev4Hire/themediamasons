'use client'

import { useState, useEffect } from 'react'
import useModal from '@hooks/useModal'
import { gudeaBold } from '@ui/fonts'
import { useRouter } from 'next/navigation'
import { SIGNATURE as CONTACT_MODAL_SIGNATURE } from '@components/modals/contactFormModal/contactFormModal'
import { ModalHeader } from './components/ModalHeader'
import { ServiceOverview } from './components/ServiceOverview'
import { ServiceFeatures } from './components/ServiceFeatures'
import { ContactCTA } from './components/ContactCTA'
import { LucideIcon } from 'lucide-react'

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
    Icon?: LucideIcon;
    metadata?: any;
}

export const SIGNATURE: string = 'service-details-modal'

export default function ServiceDetailsModal({ metadata }: { metadata?: ServiceDetailsProps | string }) {
    const { closeModal } = useModal()
    const router = useRouter()
    const [modalState, setModalState] = useState(false)
    const [contentState, setContentState] = useState(false)
    const [serviceData, setServiceData] = useState<ServiceDetailsProps | null>(null)

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

    const exitModal = () => {
        setContentState(false)
        // Add a delay before changing modalState to allow content to fade out first
        setTimeout(() => {
            setModalState(false)
            // Only close the modal after the animation is complete
            setTimeout(() => {
                closeModal({ 
                    timeout: 100
                })
            }, 400)
        }, 300)
    }

    const handleContactClick = () => {
        exitModal()
        // Add a slight delay to ensure the modal is closed before navigation
        setTimeout(() => {
            router.push(`/?modal=${CONTACT_MODAL_SIGNATURE}`)
        }, 800) // Increased to account for longer exit animation
    }

    const registerKeystroke = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            exitModal()
        }
    }
    
    useEffect(() => {
        // modal intro transition
        setModalState(true)
        // Add small delay before showing content for smooth entrance
        setTimeout(() => setContentState(true), 300)

        // event listener init for `esc` key action
        window.addEventListener('keydown', registerKeystroke)

        return () => {
            window.removeEventListener('keydown', registerKeystroke)
        }
    }, [])

    if (!serviceData) return null;
    
    const { name, description, dataPoints, iconType, lucideIcon, customIconUrl } = serviceData;

    return (
        <div 
            id="service-details-modal-wrapper"
            className={`
                ${modalState ? "opacity-100" : "opacity-0 pointer-events-none"} 
                trans-ease-md
                fixed z-modal top-0 left-0 h-full w-screen  
                flex items-center justify-center  
                bg-black bg-opacity-40
            `}
        >
            <div 
                id="service-details-modal"
                className={`
                    ${gudeaBold.className}
                    ${modalState ? "scale-100 opacity-100" : "scale-95 opacity-0"}
                    transition-all duration-300 ease-in-out
                    flex flex-col
                    w-[95vw] max-w-2xl
                    max-h-[90vh]
                    text-white rounded-xl p-6
                    bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800
                    shadow-xl shadow-black/20
                    border border-zinc-800
                    overflow-hidden overflow-y-auto
                `}
            >
                <ModalHeader 
                    title={name} 
                    onClose={exitModal} 
                />
                
                <div 
                    id="modal-content"
                    className={`
                        ${contentState ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
                        transition-all duration-300 ease-in-out
                        flex flex-col flex-grow pt-2 px-2 pb-4
                        max-sm:items-center
                        space-y-2
                    `}
                >
                    <ServiceOverview
                        name={name}
                        description={description.long}
                        iconType={iconType || 'custom'}
                        lucideIcon={lucideIcon}
                        customIconUrl={customIconUrl || '/icons/default-service.svg'}
                        Icon={serviceData.Icon}
                    />

                    <ServiceFeatures dataPoints={dataPoints} />
                    
                    <ContactCTA 
                        onClick={handleContactClick} 
                        isVisible={contentState} 
                    />
                </div>
            </div>
        </div>
    )
} 