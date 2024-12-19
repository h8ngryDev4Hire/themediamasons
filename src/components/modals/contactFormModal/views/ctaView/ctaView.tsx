import { bangers } from '@ui/fonts.ts'
import { useContext, useEffect } from 'react'
import { ContactFormMasterContext, ContactFormModalContext, exitModalContext } from '../../contactFormModal'
import ContactCta from './contactCta'
import ContactForm from './contactForm/contactForm'

interface Props {
	contentState: boolean
}


export default function CtaView( { contentState } : Props ) {
	const { error : modalError } = useContext<ContactFormMasterContext>(ContactFormModalContext)
	const [ error, setError ] = modalError

	const exitModal = useContext(exitModalContext)


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
			 flex justify-between  w-full p-2
			`}>  
				<h2 
				 id="modal-title"
				 className={`${bangers.className} text-3xl`}
				>Let&apos;s Get In Touch!
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
			<section 
			 id="content-section" 
			 className={`
			 flex md:flex-row flex-col flex-grow 
			 max-sm:space-x-0 space-x-[1rem] 
			 mb-0 md:mb-[1rem] lg:mb-[1rem] xl:mb-[1rem] 
			 items-center justify-center
			`}>
				<section 
				 id="cta-section" 
				 className={`
				 md:h-full h-[50%] 
				 w-full md:w-[70%] lg:w-[60%] xl:w-full
				 space-y-[1rem] p-[1rem]
				`}>
					<ContactCta/>
				</section>

				<span 
				 id="content-divider" 
				 className={`
				 flex md:h-[75%] h-[.5rem] md:w-[.5rem] w-[75%] md:mb-[2rem] 
				 bg-white bg-opacity-10 rounded-xl
				`}/>

				<section 
				 id="contact-form-section" 
				 className={`
				 flex flex-col h-full md:p-[2rem] items-center justify-center flex-grow
				`}>
					<span id="error-box" className="h-[1rem] -translate-y-[1rem] text-red-300">
						{error instanceof Error && error.message}
					</span>
					<ContactForm/>
				</section>
			</section>
		</div>
	)
}
