import { bangers } from "@ui/fonts";
import { useState } from "react";

export default function NewsletterInvite() {
	const [ email, setEmail ] = useState('')

	const handleInputChange = (event : React.ChangeEvent<HTMLInputElement> ) => {
		setEmail(event.target.value)
	} 

	return (
		<div 
		 id="newsletter-invite" 
		 className={`
			flex flex-col 
			space-y-[1rem]
			w-full md:h-[50%] h-[75%]
		`}>
			<input 
			 id="email-input" 
			 type="email"
			 name="email"
			 placeholder="your@email.com"
			 onChange={handleInputChange}
			 value={email}
			 required
			 className={`
				trans-ease-all
				rounded-xl py-1 px-3 bg-opacity-30 bg-white	
				text-white border-transparent border-2 
				focus:border-purple-400 focus:outline-none
				md:scale-100 scale-[.85] md:ml-0 ml-auto
			`}/>
			
			<button 
			 id="submit-btn" 
			 className={`
				text-white text-opacity-85
				rounded-xl bg-zinc-400 flex-grow
				p-2 w-[50%] ml-auto
				md:scale-100 scale-[.85]
				${bangers.className}
			`}>Sign Me Up!</button>
		</div>
	)
}
