'use client'

import { bangers, gudeaThin } from "@ui/fonts";
import NewsletterInvite from "./newsletterInvite";
import useModal from "@hooks/useModal";
import { useEffect, useState } from "react";


export const signature = 'newsletter-modal' 

export default function NewsletterModal() {
	const message = `
		Need constant Updates / Insights / Tips about the Web Development Industry?
		Sign up today to join our emailing list!
	`

	const { closeModal } = useModal()

	const [ newsletterModalState, setNewsletterModalState ] = useState(false)

	const exitModal = () => {
		setNewsletterModalState(false)
		closeModal({ timeout: 1000 })
	}

	useEffect(()=> {
		setNewsletterModalState(true)
	},[])

	return (
		<div 
		 id="newsletter-modal-wrapper" 
		 className={`
			fixed z-modal bottom-0 left-0 h-full w-screen
			flex justify-center pointer-events-none
		`}>
			<div 
			 id="newsletter-invite" 
			 className={`
				 h-[20rem] w-full mt-auto relative
				 flex items-center justify-center
				 trans-ease-all-md
				 ${ newsletterModalState ? "translate-y-0" : "translate-y-[100%]" }
			`}>
				<div 
				 id="newsletter-content" 
				 className={`
					h-[8rem] md:w-[50vw] w-[80vw] rounded-lg bg-zinc-600 bg-opacity-95
					flex items-center justify-center
					p-[1rem] pointer-events-auto
				`}>
					<section 
					 id="text-content" 
					 className={`
						text-white
						md:w-[60%] w-[50%]
					`}>
						<h1 id="title" className={`${bangers.className}  text-2xl`}>Join Our Newsletter!</h1>
						<p className={`${gudeaThin.className} text-opacity-75 md:text-base text-[1rem]`}>{message}</p>
					</section>

					<section 
					 id="invite" 
					 className={`
						 md:w-[35%] w-[45%]
						 flex justify-center items-center
					`}>
						<NewsletterInvite/>
					</section>
					<section 
					 id="exit" 
					 className={`
						 flex ml-auto mb-auto w-auto
						 text-3xl text-white text-opacity-75 font-extrabold
						 trans-ease hover:text-red-300 hover:text-opacity-100
					`}>
						<button 
						 id="exit-btn" 
						 onClick={exitModal}
						 >&times;
						 </button>
					</section>

				</div>	
			</div>
		</div>
	)
}
