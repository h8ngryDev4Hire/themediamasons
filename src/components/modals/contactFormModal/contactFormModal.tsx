'use client'

import { useState, useEffect, createContext } from 'react'
import useModal from '@hooks/useModal.ts'
import { gudeaBold } from '@ui/fonts.ts'
import CtaView from './views/ctaView/ctaView'
import SubmissionView from './views/submissionView/submissionView'
import { Core, Sanity } from '@def/definitions'


interface Props {
	metadata?: Sanity.ServicePackage;
}

export interface ContactFormMasterContext {
	modal: Core.StateHook<boolean>;
	content: Core.StateHook<boolean>;
	phase: Core.StateHook<ModalPhase>; 
	plan: Core.StateHook<Sanity.ServicePackage | undefined>
	error: Core.StateHook<Error | false>
}

export type ModalPhase = 'contact-info' | 'thank-you'

export const SIGNATURE : Core.ModalIdentifier = 'contact-modal'
const ERROR_TIMEOUT = 5000

export const ContactFormModalContext = createContext<any>(undefined)
export const exitModalContext = createContext<any>(undefined)

export default function ContactFormModal({ metadata } : Props) {
	const { closeModal } = useModal()

	const contactFormModalContext : ContactFormMasterContext = {
		modal: useState(false),
		content: useState(false),
		plan: useState<Sanity.ServicePackage | undefined>(metadata),
		phase: useState<ModalPhase>('contact-info'),
		error: useState<false | Error>(false)
	}

	const [ formState, setFormState ] = contactFormModalContext.modal
	const [ contentState, setContentState ] = contactFormModalContext.content
	const [ phase, setPhase ] = contactFormModalContext.phase
	const [ plan, setPlan ] = contactFormModalContext.plan
	const [ error, setError ] = contactFormModalContext.error

	const exitModal = () => {
		setContentState(false)
		setFormState(false)
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

		// modal intro transition
		setFormState(true)
		setTimeout( ()=>{ setContentState(true) } ,500)

		// event listener init for `esc` key action
		window.addEventListener('keydown', registerKeystroke)

		return () => window.removeEventListener('keydown', registerKeystroke)
	},[])

	useEffect(()=> {
		if (error instanceof Error) {
			const timer = setTimeout(() => setError(false), ERROR_TIMEOUT)

			return () => clearTimeout(timer)
		}
	},[error])

	return (
		<div 
		 id="contact-form-modal-wrapper" 
		 className={`
			 ${formState ? "" : "opacity-0"} trans-ease-md
			 fixed z-modal top-0 left-0 h-full w-screen  
			 flex items-center justify-center  
			 bg-black bg-opacity-40
		`}>
			<ContactFormModalContext.Provider value={contactFormModalContext}>
				<exitModalContext.Provider value={exitModal}>
				<div 
				 id="contact-form-modal" 
				 className={`
				 ${gudeaBold.className}
				 ${formState ? "h-[42rem] md:h-[35rem] lg:h-[30rem] xl:h-[30rem]" : "h-0"}
				 trans-ease-all-md
				 flex  
				 w-[95vw] lg:w-[85%] xl:w-[60%]
				 text-white rounded-xl p-[1rem]
				 bg-gradient-to-bl from-zinc-800 to-zinc-900
				 overflow-hidden
				`}>
				{ phase === 'contact-info' && <CtaView contentState={contentState}/>}
				{ phase === 'thank-you' && <SubmissionView/> }
				</div>
				</exitModalContext.Provider>
			</ContactFormModalContext.Provider>
		</div>
	)
}



