'use client';

import { useState, useEffect } from 'react'
import { gudeaBold } from '@ui/fonts.ts'

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
			 ${gudeaBold.className} 
			 bg-gradient-to-r from-purple-700 via-orange-500 to-yellow-500 text-transparent bg-clip-text
			 text-center 
			 text-3xl md:text-3xl lg:text-4xl xl:text-4xl
			 px-[2rem]
			`}>
				{message}				
			</h1>
		</section>

	)
}
