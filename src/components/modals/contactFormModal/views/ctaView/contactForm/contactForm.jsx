'use client';
import React, { useState, useEffect, createContext, useContext } from 'react';
import SubmitButton from './submitButton.tsx';
import { ContactFormModalContext } from '@components/modals/contactFormModal/contactFormModal.tsx';
export var contactFormContext = createContext(undefined);
export default function ContactForm() {
    var pkg = useContext(ContactFormModalContext).plan;
    var plan = pkg[0], setPlan = pkg[1];
    var _a = useState(''), name = _a[0], setName = _a[1];
    var _b = useState(''), email = _b[0], setEmail = _b[1];
    var _c = useState(''), phone = _c[0], setPhone = _c[1];
    var _d = useState(''), company = _d[0], setCompany = _d[1];
    var _e = useState({}), contactContextPayload = _e[0], setContactContextPayload = _e[1];
    var handleFieldChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'company':
                setCompany(value);
                break;
        }
    };
    useEffect(function () {
        var payload = {
            name: name,
            phone: phone,
            email: email,
            company: company,
            plan: plan
        };
        setContactContextPayload(payload);
    }, [name, phone, email, company]);
    return (<contactFormContext.Provider value={[contactContextPayload, setContactContextPayload]}>
			<form id="contact-form" className={"flex flex-col items-end pb-[1rem] space-y-[1rem]"}>
				<div className={"space-x-2"}>
					<label className={"after:content-['*'] after:text-red-500 after:ml-1"}>Name</label>
					<input id="name" type="text" name="name" placeholder="John Smith" className={"\n\t\t\t\t\t\ttrans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 \n\t\t\t\t\t\tfocus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none"} required onChange={handleFieldChange}/>
				</div>
				<div className={"space-x-2"}>
					<label className={"after:content-['*'] after:text-red-500 after:ml-1"}>Email</label>
					<input id="email" type="email" name="email" placeholder="john.smith@email.com" className={"\n\t\t\t\t\t\ttrans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 \n\t\t\t\t\t\tfocus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none"} required onChange={handleFieldChange}/>
				</div>
				<div className={"space-x-2"}>
					<label className={"after:content-['*'] after:text-red-500 after:ml-1"}>Phone</label>
					<input id="phone" type="tel" name="phone" placeholder="(000) 000 - 0000" className={" \n\t\t\t\t\t\ttrans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 \n\t\t\t\t\t\tfocus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none"} required onChange={handleFieldChange}/>
				</div>
				<div className={"space-x-2"}>
					<label>Company</label>
					<input id="company" type="text" name="company" placeholder="ACME.Inc (Optional)" className={" \n\t\t\t\t\t\ttrans-ease-all text-gray-800 rounded-lg px-2 border-transparent border-2 \n\t\t\t\t\t\tfocus:border-purple-100 focus:ring-4 focus:ring-indigo-300 focus:outline-none"} onChange={handleFieldChange}/>
				</div>
				<div className={"flex h-[5rem] w-full items-center justify-center p-2"}>
					<SubmitButton />
				</div>
			</form>
		</contactFormContext.Provider>);
}
