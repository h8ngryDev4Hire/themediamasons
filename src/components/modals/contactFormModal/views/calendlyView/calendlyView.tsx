'use client'

import { bangers, gudeaBold } from '@ui/fonts.ts'
import { useContext, useEffect } from 'react'
import { ContactFormMasterContext, ContactFormModalContext, exitModalContext } from '../../contactFormModal'

interface Props {
    contentState: boolean
}

export default function CalendlyView({ contentState }: Props) {
    const { phase: modalPhase } = useContext<ContactFormMasterContext>(ContactFormModalContext)
    const [phase, setPhase] = modalPhase
    const exitModal = useContext(exitModalContext)

    const handleContactFormClick = () => {
        setPhase('contact-info')
    }

  
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div 
         id="calendly-content"
         className={`
         trans-ease ${contentState ? "" : "opacity-0"} 
         flex flex-col flex-grow w-full h-full
        `}>
            {/* Modal Header */}
            <section 
             id="modal-title-section" 
             className={`
             flex justify-between w-full p-2 mb-2
            `}>  
                <h2 
                 id="modal-title"
                 className={`${bangers.className} text-3xl`}
                >Schedule a Meeting
                </h2>

                <button 
                 id="exit-modal-btn" 
                 className={`size-fit flex items-center justify-center`}
                 onClick={exitModal}
                >
                    <span 
                     className={`
                     trans-ease hover:text-red-400 
                     text-center font-[1000] text-3xl
                    `}>
                     &times;
                    </span>
                </button>
            </section>

            {/* Calendly embedding container */}
            <div 
             className={`
             flex flex-col items-center justify-center 
             flex-grow w-full h-[550px] 
             mb-4 rounded-lg overflow-hidden bg-zinc-900
            `}>
                {/* Calendly inline widget embedding */}

                { /* <!-- Calendly inline widget begin --> */}
                <div 
                 className="calendly-inline-widget" 
                 data-url="https://calendly.com/arodriguez-themediamasons" 
                 style={{minWidth: '320px', height: '100%', width: '100%'}}/>
                {/* <!-- Calendly inline widget end --> */}

            </div>

            {/* Footer section with button to switch to message form */}
            <div className="flex flex-col items-center justify-center py-3 border-t border-zinc-700">
                <p className="text-gray-300 mb-3 text-center">
                    Prefer to leave us a message instead?
                </p>
                <button 
                 onClick={handleContactFormClick}
                 className={`
                 ${gudeaBold.className} 
                 trans-ease
                 py-2 px-6
                 rounded-xl 
                 text-white text-sm
                 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800
                 shadow-lg
                 text-center hover:scale-[.95]
                `}>
                    Switch to Contact Form
                </button>
            </div>
        </div>
    )
} 