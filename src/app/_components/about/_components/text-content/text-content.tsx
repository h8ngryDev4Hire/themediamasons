'use client'

import Laptop3D from "@components/three/laptop";
import { gudeaBold, gudeaThin } from "@ui/fonts";
import { useEffect, useState } from "react";


export default function TextContent() {
	const [ mission, setMission ] = useState<string>('')
	const [ values, setValues ] = useState<string>('')



	const getTextContent = async ( directive : 'mission' | 'values' ) => {
		try {
			const response : Response = await fetch(`/text/${directive}.txt`)
			const file = await response.text()

			directive === 'mission' ? setMission(file) : setValues(file)
		} catch(error) {
			setMission('')
			setValues('')
		}
	}

	useEffect(()=> {
		getTextContent('mission')
		getTextContent('values')
	},[])

	return (
		<section id="text-content" className={`space-y-[2.5rem]`}>
			<aside 
			 id="subject" 
			 className={`
				 w-[45%] h-full float-right 
				 md:flex hidden items-center justify-center
			`}>
				<Laptop3D width={500} height={500}/>
			</aside>

			<blockquote id="values-quote" className={`flex flex-col text-white`}>
				<h1 
				 className={`
				 ${gudeaBold.className} text-2xl
				`}><i>{`"A website without SEO is like a car with no gas."`}</i>
				</h1>
				<span className={`${gudeaThin.className} ml-[1rem] text-opacity-60`}><i>~ Paul Cookson</i></span>
			</blockquote>
			<p 
			 id="text-content" 
			 className={`
			 text-white text-base
			 text-opacity-80 whitespace-pre-wrap
			`}>{mission}</p>

			<blockquote id="values-quote" className={`flex flex-col text-white`}>
				<h1 
				 className={`
				 ${gudeaBold.className} text-2xl
				`}><i>{`"Good design is obvious. Great design is transparent."`}</i>
				</h1>
				<span className={`${gudeaThin.className} ml-[1rem] text-opacity-60`}><i>~ Joe Sparano</i></span>
			</blockquote>

			<p 
			 id="text-content" 
			 className={`
			 text-white text-base 
			 text-opacity-80 whitespace-pre-wrap
			`}>{values}</p>
		</section>
	)
}
