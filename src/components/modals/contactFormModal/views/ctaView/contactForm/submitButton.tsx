'use client'

import { bangers } from '@ui/fonts.ts'
import { MouseEvent, useContext } from 'react'
import { contactFormContext } from './contactForm'
import { ContactFormMasterContext, ContactFormModalContext, exitModalContext } from '@components/modals/contactFormModal/contactFormModal'
import validate from './validate'


export default function SubmitButton() {
	const { phase : modalPhase, error : modalError } = useContext<ContactFormMasterContext>(ContactFormModalContext)
	const [ phase, setPhase ] = modalPhase
	const [ error, setError ] = modalError

	const [ contactData ] = useContext(contactFormContext)
	const exitModal = useContext(exitModalContext)

	const handleButtonClick = async (event : MouseEvent)  => {
		event.preventDefault()
		try {
			const result = validate(contactData)	

			if (result instanceof Error) throw result

			const response = await fetch('/api/post/contact-info', {
				method:'POST',
				headers: { 'Content-Type' : 'application/json' },
				body: JSON.stringify(contactData)
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error)
			}

			setPhase('thank-you')
		} catch(error) {
			setError(error)
		}
	}	

	return (
		<button 
		 id="submit-btn" 
		 onClick={handleButtonClick}
		 className={`
		 ${bangers.className} 
		 trans-ease h-[2.5rem] w-[8rem] 
		 rounded-xl bg-zinc-500 
		 text-center hover:scale-[.90]
		`}>
			Submit
		</button>
	)
}