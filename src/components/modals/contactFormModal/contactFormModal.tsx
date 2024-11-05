'use client'

import { useState, useEffect, createContext } from 'react'
import useModal from '@api/hooks/useModal.ts'
import { gudeaBold, bangers } from '@ui/fonts.ts'
import ContactForm from './contactForm/contactForm.tsx'
import ContactCta from './contact-cta.tsx'


export const SIGNATURE = 'contact-modal'

export const contactFormModalStateContext = createContext(undefined)

export default function ContactFormModal() {
	const { closeModal } = useModal()

	const [ modalState, setModalState ] = useState(false)	
	const [ contentState, setContentState ] = useState(false)


	const exitModal = () => {
		setContentState(false)
		setModalState(false)
		closeModal({ 
			timeout: 1000
		})
	}

	const registerKeystroke = ( event: KeyboardEvent ) => {
		if (event.key === 'Escape') {
			exitModal()
		}
	}
	
	useEffect(()=>{
		setModalState(true)
		setTimeout( ()=>{ setContentState(true) } ,500)

		window.addEventListener('keydown', registerKeystroke)

		return () => window.removeEventListener('keydown', registerKeystroke)
	},[])


	return (
		<div 
		 id="contact-form-modal-wrapper" 
		 className={`
			 ${modalState ? "" : "opacity-0"} trans-ease-md
			 fixed z-modal top-0 left-0 h-full w-screen  
			 flex items-center justify-center  
			 bg-black bg-opacity-40`
		}>
			<div 
			 id="contact-form-modal" 
			 className={`
				  ${gudeaBold.className}
				  ${modalState ? "md:h-[30rem] h-[40rem]" : "h-0"}
				  trans-ease-all-md
				  flex  md:w-[50%] w-[95vw] 
				  bg-zinc-700 text-white rounded-xl p-[1rem]
				  overflow-hidden
			`}>
				<div 
				 id="contact-form-content"
				 className={`trans-ease ${contentState ? "" : "opacity-0"} flex flex-col flex-grow mb-[1rem]`}
				>
					<section 
					 id="modal-title-section" 
					 className={`flex justify-between  w-full p-2`}
					>  
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
							 className={`trans-ease hover:text-red-400 text-center font-[1000] text-3xl`}>
							 &times;
							</span>
						</button>
					</section>
					<section 
					 id="content-section" 
					 className={`
						 flex md:flex-row flex-col flex-grow 
						 space-x-[1rem] mb-[1rem] items-center justify-center
					`}>
						<section 
						 id="cta-section" 
						 className={`
							 md:h-full h-[50%] w-full space-y-[1rem] p-[1rem]
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
							 flex h-full md:p-[2rem] items-center justify-center flex-grow
						`}>
							<ContactForm/>
						</section>
					</section>
				</div>
			</div>
		</div>
	)
}
