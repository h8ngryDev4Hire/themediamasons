'use client'

import Navigator from "@components/common/navigator/navigator";
import { useEffect, useState } from "react";
import TextContent from "./_components/text-content/text-content";


export default function About() {
	const [ transition, setTransition ] = useState(false)

	useEffect(()=>{
		setTransition(true)
	},[])

	return (
		<>
			<Navigator floating={false}/>
			<div 
			 id="about-container" 
			 className={`
				 relative z-content flex  w-screen md:h-screen h-[90rem] items-center justify-center
				 py-[12rem] md:py-[5rem]
			`}>

				<main 
				 id="main-content" 
				 className={`
					trans-ease-all
					flex w-[60vw] h-full items-center justify-center bg-white
					p-[3rem] rounded-xl   
					${transition ? "bg-opacity-10" : "bg-opacity-50"}
					md:space-x-[5rem] md:mt-[7rem]
				`}>
					<div 
					 id="about-section" 
					 className={`
						  w-full flex items-center justify-center
						 mb-[10rem]
					`}>
						<TextContent/>
					</div>
				</main>
			</div>
		</>
	)
}
