'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

import Navigator from '@components/common/navigator/navigator.tsx'
import ContentBlock from '@components/common/content-block/content-block.tsx'
import Transitioner from '@components/common/transitioner/transitioner.tsx'

import Hero from './_components/hero/hero.tsx' 
import ServicesList from './_components/services-list/services-list.tsx'


const ThreeObject = dynamic(() => import('@components/three/cube.tsx'), { ssr: false })

export default function Home() : JSX.Element {
	const heroRef = useRef(null)

	const [isFloating, setFloatState] = useState(true)

	

 	useEffect(() => {
		const observer = new IntersectionObserver( ([entry]) => {
	        	// When Hero is not visible, set isFloating to true
				setFloatState(entry.isIntersecting)
	      		},{
	        		root: null,
	        		rootMargin: '0px',
	        		threshold: 0,
	      		})
	
	    	if (heroRef.current) { observer.observe(heroRef.current) }
	
		return () => {
	      		if (heroRef.current) observer.unobserve(heroRef.current)
		}
	}, [])

	return (
		<>
			<Navigator floating={isFloating}/>
			<div 
			 id="home-container"
			 className={`
				 h-full w-screen flex flex-col 
			 	items-center justify-center mb-[10rem] mt-[15rem] space-y-[25rem]
			`}>
					{/*
					<div 
					 id="matrix-container" 
					 className={`
					 	absolute top-0 left-0 z-[100] w-screen min-h-[76rem]
					`}>


						<ContentFactory/>	
					</div>

					*/}
				<div 
				 id="hero-intersection-container" 
				 className="w-full h-full flex" 
				 ref={heroRef}
				>
					<Hero/>
					<div id="hero-to-content" className="z-content min-w-full absolute mt-[15rem]">
						<Transitioner size={60}/>
					</div>
				</div>

				<main 
				 id="main-content"
				 className="z-content w-[75%] md:space-y-[10rem] space-y-[4rem]"
				>
					<ServicesList/>			

					<ContentBlock 
					 title={"Your Vision, Our Expertise."} 
					 description={`
						 We meticulously craft each frame to amplify your unique voice, 
						 ensuring your content stands out in the digital landscape. Let 
						 us handle the edit, so you can focus on what you do best – creating 
						 captivating content that resonates with your audience.
						 `} 
					 media={<ThreeObject/>}
					/>
					<ContentBlock 
					 title={"Less Time Editing, More Time Creating."} 
					 description={`
						 We meticulously craft each frame to amplify your unique voice, 
						 ensuring your content stands out in the digital landscape. Let 
						 us handle the edit, so you can focus on what you do best – creating 
						 captivating content that resonates with your audience.
						 `} 
					 media={<ThreeObject/>}
					 reverse={true}
					/>
				</main>

			</div>

		</>

	)
}


