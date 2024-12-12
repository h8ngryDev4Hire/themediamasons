'use client';

import { useState, useEffect } from 'react'
import { gudeaBold, gudeaThin } from '@ui/fonts.ts'

interface Params {
	message: string | React.ReactNode
}

export default function Headline( { message } : Params ) {
	const [ intro, setIntro ] = useState(false)

	useEffect(()=>{ setIntro(true) },[])	


	return (
		<section 
		 id="pricing-heading" 
		 className={`
			 trans-ease-all-md 
			 ${ intro ? "" : "-translate-y-[100%] opacity-0" }
		`}>
			<h1 
			 id="pricing-catcher" 
			 className={`
				 ${gudeaThin.className} text-white text-4xl text-center
			`}>
				{message}				
			</h1>
		</section>

	)
}
