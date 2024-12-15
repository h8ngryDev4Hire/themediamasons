'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navigator from '@components/common/navigator/navigator.tsx'
import Transitioner from '@components/common/transitioner/transitioner.tsx'
import Hero from './_components/hero/hero.tsx' 
import About from './_components/about/about.tsx'
import Pricing from './_components/pricing/pricing.tsx'
import Services from './_components/services/services.tsx'
import Contact from './_components/contact/contact.tsx'
import { bangers } from '@ui/fonts.ts'

const ThreeObject = dynamic(() => import('@components/three/cube.tsx'), { ssr: false })



export default function Home() : JSX.Element {
	const heroRef = useRef(null)

	const [isFloating, setFloatState] = useState(true)

	

 	useEffect(() => {
		const ref = heroRef.current

		const observer = new IntersectionObserver( ([entry]) => {
	        	// When Hero is not visible, set isFloating to true
				setFloatState(entry.isIntersecting)
	      		},{
	        		root: null,
	        		rootMargin: '0px',
	        		threshold: 0,
	      		})
	
	    	if (ref) { observer.observe(ref) }
	
		return () => {
	      		if (ref) observer.unobserve(ref)
		}
	}, [])

	return (
		<>
			<Navigator floating={isFloating}/>
			<div 
			 id="home-container"
			 className={`
         h-full w-screen flex flex-col 
         items-center justify-center 
         mb-[5rem] sm:mb-[7rem] md:mb-[10rem] 
         mt-[8rem] sm:mt-[10rem] md:mt-[15rem] 
         space-y-[12rem] sm:space-y-[15rem] md:space-y-[25rem]
         snap-x 
			`}>

				<div 
				 id="hero-intersection-container" 
				 ref={heroRef}
				 className={`
           w-full h-full flex 
           px-4 sm:px-6 md:px-0
				`}>
					<Hero/>
					<div 
					 id="hero-to-content" 
					 className={`
             z-content min-w-full absolute 
             mt-[8rem] sm:mt-[10rem] md:mt-[15rem]
					`}>
						<Transitioner size={60}/>
					</div>
				</div>

				<main 
				 id="main-content"
				 className={`
           w-[90%] sm:w-[85%] md:w-[75%] 
           space-y-[2rem] sm:space-y-[3rem] md:space-y-[10rem]
           flex flex-col items-center justify-center
           px-4 sm:px-6 md:px-0
	   z-content
	   overflow-y-clip h-full
				`}>
					<div className="snap-proximity w-auto h-auto">
					<Services/>
					</div>
					<div className="snap-proximity w-auto h-auto">
					<About/>
					</div>
					<div className="snap-proximity w-auto h-auto">
					<Pricing/>
					</div>
					<div className="snap-proximity w-auto h-auto">
					<Contact/>
					</div>
				</main>

			</div>

		</>

	)
}


