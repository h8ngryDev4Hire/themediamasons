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
		<section id="text-content" className={`     
		 space-y-4 sm:space-y-[1.5rem] md:space-y-[2.5rem]
     		 w-full
		`}>
			<aside 
			 id="subject" 
			 className={`
        		 w-full md:w-[45%]
        		 h-full float-none md:float-right 
        		 hidden md:hidden lg:flex xl:flex
			 items-center justify-center
			`}>
				<Laptop3D width={500} height={500}/>
			</aside>

			<blockquote 
			 id="values-quote" 
			 className={`       
			 flex flex-col text-white
       			 text-center md:text-left
			`}>
				<h1 
				 className={`
         			 ${gudeaBold.className} 
         			 text-xl sm:text-2xl md:text-2xl
				`}><i>{`"A website without SEO is like a car with no gas."`}</i>
				</h1>
				<span 
				 className={`         
				 ${gudeaThin.className} 
         			 ml-0 md:ml-[1rem] 
         			 text-opacity-60
				`}><i>~ Paul Cookson</i></span>
			</blockquote>
			<p 
			 id="text-content" 
			 className={`
      			 text-white 
      			 text-sm sm:text-base
      			 text-opacity-80 whitespace-pre-wrap
      			 text-left indent-8
			`}>{mission}</p>

			<blockquote 
			 id="values-quote" 
			 className={`
			 flex flex-col text-white
       			 text-center md:text-left
			`}>
				<h1 
				 className={`
				 ${gudeaBold.className} text-2xl
				`}><i>{`"Good design is obvious. Great design is transparent."`}</i>
				</h1>
				<span 
				 className={`
				 ${gudeaThin.className} ml-[1rem] text-opacity-60
				`}><i>~ Joe Sparano</i></span>
			</blockquote>

			<p 
			 id="text-content" 
			 className={`
       			 text-white 
			 text-sm sm:text-base
			 text-opacity-80 whitespace-pre-wrap
      			 text-left indent-8
			`}>{values}</p>
		</section>
	)
}
