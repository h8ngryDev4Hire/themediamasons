'use client'

import { useState, useEffect, useRef } from 'react'
import Headline from './_components/headline/headline.tsx'
import Navigator from '@components/common/navigator/navigator.tsx'
import PricingTiers from './_components/pricing-tiers/pricing-tiers.tsx'
import Splash from './_components/splash/spash.tsx'


export default function Pricing() {
	const [ demoIsVisible, setDemoState ] = useState(false)

	const demoSectionRef = useRef(null)

	
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
			 className={`flex flex-col top-0 left-0 h-full w-screen items-center justify-center my-[10rem]`}
			>

			
				
				<main 
				 id="main-content" 
				 className="z-content flex flex-col  md:w-[75%] w-full items-center justify-center space-y-[7rem]"
				>
					<Headline message={
						<>
						Pricing That Fits 
						<b><em className={``}> Every </em></b> 
						Creator's Needs!
						</> 
					}/>

					<PricingTiers/>



					<section 
					 id="demo-section" 
					 className={`w-full flex flex-col items-center justify-center p-[1rem] space-y-[5rem]`} 
					 ref={demoSectionRef}
					>
					{demoIsVisible && 
						<Headline message={
							<>
							Intrigued but 
							<b><em> STILL </em></b> 
							not sold? Get a free demo scheduled with us!
							</>
						}/>				
					}
						<div id="" className={`flex w-full h-[5rem]`}>
						</div>
					</section>



				</main>
			</div>
		</>
	)
}




