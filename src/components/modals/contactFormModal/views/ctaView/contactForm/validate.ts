import { ClientContactInformation } from "@def/definitions";

const patterns = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	phone: /^\+?[\d\s-()]{10,}$/, 
	name: /^[a-zA-Z\s\-']{2,50}$/
}


export default function validate( payload : ClientContactInformation ) : true | Error {
	try {
		if (!patterns.name.test(payload.name)) throw new Error('Please provide a valid name.')
			console.log('name field validated')
		if (!patterns.phone.test(payload.phone)) throw new Error('Please provide a valid number.')
			console.log('phone field validated')
		if (!patterns.email.test(payload.email)) throw new Error('Please provide a valid email.')
			console.log('email field validated')

		if (payload?.company) {
			if (!patterns.name.test(payload.company)) throw new Error('Please provide a valid company name.')
				console.log('company field validated')
		}
		
		return true
	} catch(error) {
		return error
	}
}
