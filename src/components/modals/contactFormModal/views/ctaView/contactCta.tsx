import { useContext } from 'react'
import SubmitButton from './contactForm/submitButton'
import { contactFormContext } from './contactForm/contactForm'

export default function ContactCta() {
	// The context is now provided by the parent component (CtaView)
	const formContext = useContext(contactFormContext)
	
	return (	
		<section 
		 id="cta" 
		 className={`
			flex flex-col justify-between w-full h-full
			text-white text-opacity-80
			max-sm:text-sm
		`}>
			<div className="space-y-4">
				<h2 
				className={`
				text-opacity-100 
				text-xl text-white
				`}>24 Hour Guarantee!</h2>
				<p className="leading-relaxed">{`
					We may be busy, but we will always make time to respond! 
					Busy schedule? Let's setup a time that works for you!
				`}</p>
				<p className="leading-relaxed">{`
					Need to reschedule? We get it! 
					Flexibility is important to us! 
					We can always find another time!
				`}</p>
			</div>
			
			{/* Submit button moved from contact form */}
			<div 
			 className={`
			 flex w-full items-center justify-center 
			 max-sm:mb-0 sm:mb-0 mb-[2rem]
			 max-sm:mt-6 sm:mt-6 mt-0
			`}>
				<SubmitButton />
			</div>
		</section>
	)
}
