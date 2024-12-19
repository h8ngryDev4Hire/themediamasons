'use client'

import { useState, useEffect } from 'react'
import { gudeaBold } from '@ui/fonts.ts'


interface Params {
	text : string
}


export default function FadeIntoText({ text } : Params ) {

	const [ displayed, setDisplay ] = useState(false)

	useEffect(()=>{ 
		setDisplay(true)
	},[])

	return (
			<h2 
			 id="fade-into-text" 
			 className={`
			 ${gudeaBold.className} 
			 transform transition-all duration-1000 ease-in-out 
			 ${displayed ? "opacity-100 -translate-y-[0%]" : "opacity-0 -translate-y-[100%]"} 
			 text-white text-opacity-70 font-mono
			 max-sm:text-xl md:text-3xl text-2xl 
			 w-[100vw]
			 text-center
			`}>
			 {text}
			</h2>
	)	
}
