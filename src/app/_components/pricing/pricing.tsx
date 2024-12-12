'use client'

import { useState, useEffect, useRef } from 'react'
import Headline from './_components/call-to-action/headline.tsx'
import PricingTiers from './_components/pricing-tiers/pricing-tiers.tsx'
import Splash from './_components/splash/spash.tsx'
import CallToAction from './_components/call-to-action/call-to-action.tsx'
import Transitioner from '@components/common/transitioner/transitioner.tsx'
import Addons from './_components/addons/addons.tsx'


export default function Pricing() {
	const [ demoIsVisible, setDemoState ] = useState(false)

	const demoSectionRef = useRef<HTMLElement>(null)

	
	useEffect(()=>{
		const observer = new IntersectionObserver( ([entry])=>{
				setDemoState(entry.isIntersecting)
			},{
				root: null,
				rootMargin: '0px',
				threshold: 0
			})

		if (demoSectionRef.current) observer.observe(demoSectionRef.current)

		return () => { if (demoSectionRef.current) observer.unobserve(demoSectionRef.current) }
	},[])

	
	useEffect(()=>{
	}, [])


	return (
		<div>
			<div 
			 id="splash-container" 
			 className={`
			 relative
			 w-screen
			`}>
				<div className="relative translate-y-[13rem] z-foreground">
					<Transitioner size={40}/>
				</div>
				<div id="pricing">
					<Splash/>
				</div>
			</div>

			<div 
			 id="main-content-container" 
			 className={`
				 flex flex-col 
				 h-full md:min-h-[1564px] min-h-[2387px] 
				 w-screen items-center justify-center 
				 my-[10rem] top-0 left-0
			`}>

			
				
				<main 
				 id="main-content" 
				 className={`
				 z-content   md:w-[75%] w-full space-y-[4rem]
				 flex flex-col items-center justify-center
				`}>
					<Headline message={
						<>
						Pricing That Fits 
						<b><em className={``}> Every </em></b> 
						Business&apos;s Needs!
						</> 
					}/>

					<PricingTiers/>
					<Addons/>	
					<CallToAction 
					 ref={demoSectionRef} 
					 visible={demoIsVisible}
					/>
				</main>
			</div>
		</div>
	)
}




