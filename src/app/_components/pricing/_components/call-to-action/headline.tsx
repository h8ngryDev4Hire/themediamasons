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
				 ${gudeaThin.className} 
				 bg-gradient-to-r from-purple-700 via-orange-500 to-yellow-500 text-transparent bg-clip-text
				 text-center 
				 max-sm:text-2xl text-3xl md:text-4xl lg:text-4xl xl:text-4xl 
			`}>
				{message}				
			</h1>
		</section>

	)
}
