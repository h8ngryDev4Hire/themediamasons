

export default function ContactCta() {
	return (	
		<section 
		 id="cta" 
		 className={`
			justify-start flex flex-col w-full space-y-[1rem]
			text-white text-opacity-80
		`}>
			<h2 className="text-opacity-100 text-xl">24 Hour Guarantee!</h2>
			<p>{`
				We may be busy, but we will always make time to respond! 
				Busy schedule? Let's setup a time that works for you!
			`}</p>
			<p>{`
				Need to reschedule? We get! flexibility is important to us! 
				We can always find another time!
			`}</p>

		</section>
	)
}
