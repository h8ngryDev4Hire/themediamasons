'use client'

import { useState, useEffect, useRef } from 'react'
import Headline from './_components/call-to-action/headline.tsx'
import Navigator from '@components/common/navigator/navigator.tsx'
import PricingTiers from './_components/pricing-tiers/pricing-tiers.tsx'
import Splash from './_components/splash/spash.tsx'
import CallToAction from './_components/call-to-action/call-to-action.tsx'


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
		<>
			<Navigator floating={false}/>

			<Splash/>

			<div 
			 id="pricing-container" 
			 className={`
				 flex flex-col h-full md:min-h-[1564px] min-h-[2387px] w-screen items-center justify-center 
				 my-[10rem] top-0 left-0
			`}>

			
				
				<main 
				 id="main-content" 
				 className="z-content flex flex-col  md:w-[75%] w-full items-center justify-center space-y-[7rem]"
				>
					<Headline message={
						<>
						Pricing That Fits 
						<b><em className={``}> Every </em></b> 
						Creator&apos;s Needs!
						</> 
					}/>

					<PricingTiers/>

					<CallToAction 
					 ref={demoSectionRef} 
					 visible={demoIsVisible}
					/>
				</main>
			</div>
		</>
	)
}




