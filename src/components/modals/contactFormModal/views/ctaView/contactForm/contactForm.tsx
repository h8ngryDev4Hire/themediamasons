'use client'

import React, { useState, useEffect, createContext, useContext } from 'react'
import { UserContent, Sanity } from '@def/definitions.ts'
import { ContactFormMasterContext, ContactFormModalContext } from '@components/modals/contactFormModal/contactFormModal.tsx'

// Context defined here but will be provided by parent component
export const contactFormContext = createContext<any>(undefined)

export default function ContactForm() {
	const { plan : pkg } = useContext(ContactFormModalContext) as ContactFormMasterContext
	const [ plan, setPlan ] = pkg
	const [contactContextPayload, setContactContextPayload] = useContext(contactFormContext)

	const [ name, setName ] = useState('')
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');	

	const handleFieldChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
		const { name, value } = e.target

		switch (name) {
			case 'name': 
				setName(value)
				break
			case 'email':
				setEmail(value)
				break
			case 'phone':
				setPhone(value)
				break
			case 'message':
				setMessage(value)
				break
		}
	}

	useEffect(() => {
		const payload : UserContent.ClientContactInformation = {
			name: name,
			phone: phone,
			email: email,
			message: message,
			plan: plan as Sanity.ServicePackage
		}

		setContactContextPayload(payload)
	},[name, phone, email, message, plan, setContactContextPayload])

	return (
		<form id="contact-form" className={`flex flex-col pb-[1rem] space-y-[1rem]`}>
			<div className={`
			 space-y-1
			 max-sm:text-sm
			`}>
				<label className={` after:content-['*'] after:text-red-500 after:ml-1`}>Name</label>
				<input
				 id="name"
				 type="text"
				 name="name"
				 placeholder="John Smith"
				 className={`
				 	w-full
					trans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 
					focus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none

				 `}
				 required
				 onChange={handleFieldChange}
				/>
			</div>
			<div className={`space-y-1`}>
				<label className={`after:content-['*'] after:text-red-500 after:ml-1`}>Email</label>
				<input
				 id="email"
				 type="email"
				 name="email"
				 placeholder="john.smith@email.com"
				 className={`
				 	w-full
					trans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 
					focus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none`}

				 required
				 onChange={handleFieldChange}
				/>
			</div>
			<div className={`space-y-1`}>
				<label className={`after:content-['*'] after:text-red-500 after:ml-1`}>Phone</label>
				<input
				 id="phone"
				 type="tel"
				 name="phone"
				 placeholder="(000) 000 - 0000"
				 className={` 
				 	w-full
					trans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 
					focus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none`}
				 required
				 onChange={handleFieldChange}
				/>
			</div>
			<div className={`space-y-1`}>
				<label>Message (Optional)</label>
				<textarea
				 id="message"
				 name="message"
				 placeholder="Tell us about your project..."
				 rows={3}
				 className={` 
				 	w-full
					trans-ease-all text-gray-800 rounded-lg px-2 py-1 border-transparent border-2 
					focus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none
					resize-none`}
				 onChange={handleFieldChange}
				/>
			</div>
		</form>
	)
}
