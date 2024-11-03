'use client'

import React, { useState, useEffect } from 'react'
import { gudeaThin } from '@ui/fonts.ts'
import SubmitButton from './submitButton.tsx'

export default function ContactForm() {
	const [ name, setName ] = useState('')
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [company, setCompany] = useState('');	

	const handleFieldChange = (e : React.ChangeEvent<HTMLInputElement> ) => {
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
			case 'company':
				setCompany(value)
				break
		}
	}

	return (
		<form id="contact-form" className={`flex flex-col items-end p-[1rem] space-y-[1rem]`}>
			<div className={`space-x-2`}>
				<label className={`after:content-['*'] after:text-red-500 after:ml-1`}>Name</label>
				<input
				 id="name"
				 type="text"
				 name="name"
				 placeholder="John Smith"
				 className={`
					trans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 
					focus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none`}
				 required
				 onChange={handleFieldChange}
				/>
			</div>
			<div className={`space-x-2`}>
				<label className={`after:content-['*'] after:text-red-500 after:ml-1`}>Email</label>
				<input
				 id="email"
				 type="email"
				 name="email"
				 placeholder="john.smith@email.com"
				 className={`
					trans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 
					focus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none`}

				 required
				 onChange={handleFieldChange}
				/>
			</div>
			<div className={`space-x-2`}>
				<label className={`after:content-['*'] after:text-red-500 after:ml-1`}>Phone</label>
				<input
				 id="phone"
				 type="tel"
				 name="phone"
				 placeholder="(000) 000 - 0000"
				 className={` 
					trans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 
					focus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none`}
				 required
				 onChange={handleFieldChange}
				/>
			</div>
			<div className={`space-x-2`}>
				<label>Company</label>
				<input
				 id="company"
				 type="text"
				 name="company"
				 placeholder="ACME.Inc (Optional)"
				 className={` 
					trans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 
					focus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none`}
				 onChange={handleFieldChange}
				/>
			</div>
			<div className={`flex h-[5rem] w-full items-center justify-center p-2`}>
				<SubmitButton/>
			</div>
		</form>
	)
}
