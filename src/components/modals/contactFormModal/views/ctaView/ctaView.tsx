import { bangers } from '@ui/fonts.ts'
import { useContext, useEffect, useState } from 'react'
import { ContactFormMasterContext, ContactFormModalContext, exitModalContext } from '../../contactFormModal'
import ContactCta from './contactCta'
import ContactForm from './contactForm/contactForm'
import { contactFormContext } from './contactForm/contactForm'
import { UserContent, Sanity } from '@def/definitions.ts'

interface Props {
	contentState: boolean
}

export default function CtaView( { contentState } : Props ) {
	const { error : modalError, plan : pkgState, phase: modalPhase } = useContext<ContactFormMasterContext>(ContactFormModalContext)
	const [ error, setError ] = modalError
	const [ plan ] = pkgState
	const [ phase, setPhase ] = modalPhase
	
	const [contactData, setContactData] = useState<{} | UserContent.ClientContactInformation>({})

	const exitModal = useContext(exitModalContext)
	
	const handleBackToCalendly = () => {
		setPhase('calendly')
	}

	return (
		<div 
		 id="contact-form-content"
		 className={`
		 trans-ease ${contentState ? "" : "opacity-0"} 
		 flex flex-col flex-grow 
		 mb-0 md:mb-[1rem] lg:mb-[1rem] xl:mb-[1rem]
		`}>
			<section 
			 id="modal-title-section" 
			 className={`
			 flex justify-between w-full p-2
			`}>  
				<div className="flex items-center">
					<button 
					 onClick={handleBackToCalendly}
					 className="mr-3 text-gray-300 hover:text-white trans-ease flex items-center text-sm"
					>
						<span className="mr-1">←</span> 
					</button>
					<h2 
					 id="modal-title"
					 className={`${bangers.className} text-3xl`}
					>Leave a Message
					</h2>
				</div>

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
			
			{/* Display error message if present */}
			{error instanceof Error && (
				<div className="w-full text-center mb-2">
					<span className="text-red-300 text-sm">{error.message}</span>
				</div>
			)}
			
			<contactFormContext.Provider value={[contactData, setContactData]}>
				<section 
				 id="content-section" 
				 className={`
				 flex md:flex-row flex-col flex-grow 
				 max-sm:space-x-0 space-x-[1rem] 
				 mb-0 md:mb-[1rem] lg:mb-[1rem] xl:mb-[1rem] 
				 items-stretch justify-center
				`}>
					<section 
					 id="contact-form-section" 
					 className={`
					 flex flex-col h-full md:p-[2rem] p-[1rem] items-center justify-center flex-grow
					`}>
						<ContactForm/>
					</section>
					<span 
					 id="content-divider" 
					 className={`
					 flex md:h-[90%] h-[.5rem] md:w-[.5rem] w-[75%] 
					 bg-white bg-opacity-10 rounded-xl self-center
					`}/>
					<section 
					 id="cta-section" 
					 className={`
					 md:h-full h-[50%] 
					 w-full md:w-[40%] lg:w-[40%] xl:w-[40%]
					 p-[1rem] flex flex-col
					`}>
						<ContactCta/>
					</section>
				</section>
			</contactFormContext.Provider>
		</div>
	)
}
