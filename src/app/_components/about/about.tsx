'use client'


import { useEffect, useState } from "react";
import TextContent from "./_components/text-content/text-content";
import { bangers, gudeaBold } from "@ui/fonts";


export default function About() {
	const [ transition, setTransition ] = useState(false)

	useEffect(()=>{
		setTransition(true)
	},[])

	return (
		<>
			<div 
			 id="about" 
			 className={`
			 relative z-content md:h-screen h-auto 
			 flex flex-col
			 items-center justify-center
			 py-[12rem] md:py-[1rem]
			 md:mt-[7rem]
			 space-y-[2rem]
			`}>
				<h1 
				 id="title"
				 className={`
				 ${bangers.className} 
				 w-full
				 text-white
				 max-sm:text-center text-start
				 text-4xl md:text-4xl lg:text-5xl xl:text-5xl 
				`}>About The Media Masons
				</h1>

				<main 
				 id="main-content" 
				 className={`
					trans-ease-all
					flex 
					max-sm:w-full w-[75vw] 
					h-auto items-center justify-center bg-white
					px-[3rem] 
					py-[1rem] rounded-xl   
					${transition ? "bg-opacity-10" : "bg-opacity-50"}
					md:space-x-[5rem] 
				`}>
					<div 
					 id="about-section" 
					 className={`
					 w-full 
					 flex flex-col items-center justify-center
					 mb-[4rem]
					`}>
	
						<TextContent/>
					</div>
				</main>
			</div>
		</>
	)
}
