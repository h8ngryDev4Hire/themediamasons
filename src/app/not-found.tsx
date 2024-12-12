'use client'

import { useState, useEffect } from 'react'

export default function NotFound()  {
	const [ msg, setMsg ] = useState<string>('')

	//const requestedResource = document ? `"${document.location.pathname}"` : "" 

	useEffect(()=>{
		setMsg(`The page your system requested is non-existent.`)
	},[])

	return (
		<div id="404-page"
		className="h-screen w-screen flex items-center justify-center">
			<main id="404-stack"
			className="flex-col w-[20] absolute">
				<h1 id="404-banner"
				className=" text-[20rem] font-bold text-white">404</h1>
				<section id="404-msg"
				className="text-white font-bold text-center">
				{msg}
				</section>
				<div id="404-line"
				className="h-2 w-full bg-red-300"></div>
			</main>

		</div>
	)
} 
