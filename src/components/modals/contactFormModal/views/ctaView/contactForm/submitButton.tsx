'use client'

import { bangers } from '@ui/fonts.ts'
import { MouseEvent, useContext } from 'react'
import { contactFormContext } from './contactForm'
import { ContactFormMasterContext, ContactFormModalContext, exitModalContext } from '@components/modals/contactFormModal/contactFormModal'
import { UserContent } from '@def/definitions'


export default function SubmitButton() {
	const { phase : modalPhase, error : modalError } = useContext<ContactFormMasterContext>(ContactFormModalContext)
	const [ phase, setPhase ] = modalPhase
	const [ error, setError ] = modalError

	// The contactFormContext is now provided by the CtaView component
	// This ensures both the form and the button have access to the same data
	const [ contactData ] = useContext(contactFormContext)
	const exitModal = useContext(exitModalContext)

	const handleButtonClick = async (event : MouseEvent)  => {
		event.preventDefault()
		try {
			// Validate the form data
			const result = UserContent.ClientContactInformationSchema.safeParse(contactData)

			if (!result.success) throw new Error(result.error.issues[0].message) 

			// Submit the form data
			const response = await fetch('/api/post/contact-info', {
				method:'POST',
				headers: { 'Content-Type' : 'application/json' },
				body: JSON.stringify(contactData)
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error)
			}

			// Show the thank you view
			setPhase('thank-you')
		} catch(error : any) {
			setError(error)
		}
	}	

	return (
		<button 
		 id="submit-btn" 
		 onClick={handleButtonClick}
		 className={`
		 ${bangers.className} 
		 trans-ease h-[3rem] w-[10rem] 
		 rounded-xl 
		 text-lg
		 text-white
		 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800
		 shadow-lg hover:shadow-xl
		 text-center hover:scale-[.95]
		`}>
			Submit Contact
		</button>
	)
}
