'use client'
import { useEffect, useState } from "react";
import TextContent from "./_components/text-content/text-content";
import { bangers, gudeaBold } from "@ui/fonts";
import Laptop3D from "@components/three/laptop";
import { AboutTextContentArray } from "@def/sanity";
import { FetchRequest, UnknownResponse } from "@def/routes";



export default function About() {
	const [ transition, setTransition ] = useState(false)
	const [ aboutTextContent, setAboutTextContent ] = useState<AboutTextContentArray>([])

	useEffect(()=>{
		setTransition(true)
	},[])

	useEffect(()=> {
		( async () => {
			try {
				const payload : FetchRequest = {
					content: 'about'
				}

				const response = await fetch('/api/fetch/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				})

				const data : UnknownResponse = await response.json()

				if (!response.ok || !data.successful) {
					throw new Error(data.error)
				}

				const aboutData : AboutTextContentArray = data.data

				if (!aboutData) {
					throw new Error('Request successful yet no data was recieved.')
				} else {
					setAboutTextContent(aboutData)
				}
			} catch(error) {

			}
		})()	
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
						{aboutTextContent.map( ( block,key ) => (
								<TextContent
								 key={key}
								 name={block.name}
								 description={block.description}
								 quote={block.quote}
								/>
						))}
						</section>
					</div>
				</main>
			</div>
		</>
	)
}
