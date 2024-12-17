'use client'

import { useState, useEffect } from 'react'
import { gudeaThin, gudeaBold, bangers } from '@ui/fonts.ts'
import Button from './button.tsx'
import { PricingTier, ServicePackage } from '@def/definitions.ts';


type CompliantPricingTier = Omit<PricingTier, 'price'>

interface Props extends CompliantPricingTier {
	price: number
	animated?: number | boolean 
	discounted?: JSX.Element | boolean
}


export default function Tier( { name, codeName, price, perks, description, animated = false, discounted = false } : Props ) {
	const [ dollars, cents ] = price.toLocaleString().split('.')
	const plan  = codeName 
	
	const [ introStarted, setIntroState ] = useState(false)


	useEffect(()=>{  
		if (animated) { 
			setIntroState(true) 
		}
	},[])

	return (
		<div 
		 id="pricing-tier" 
		 className={`
			 ${gudeaThin.className}
			 py-[1rem] md:py-[3rem] lg:py-[1.5rem]
			 px-[1rem] md:px-[1rem] lg:px-[1rem]
			 p-[1rem] 
			 w-[80vw] xl:w-[25vw]
			 h-auto xl:h-[50rem] 
			 space-y-0 md:space-y-[1rem] 
			 space-x-[3rem] lg:space-x-[4.5rem] xl:space-x-0 
			 flex 
			 md:flex-row lg:flex-row xl:flex-col 
			 md:items-center 
			 md:justify-center  
			 bg-zinc-800 rounded-xl text-white
			 trans-ease-md-all    
			 ${ animated 
				 ? `${ introStarted ? "" : "-translate-y-[50%] opacity-0" }` 
				 : `` 
			 }`}
		style={{ animationDelay: `${animated ? animated + 's' : animated}` }}
		>
			<div 
			 id="tier-top-half" 
			 className={`
			 flex flex-col 
			 space-y-[1.5rem]
			 justify-center 
			 sm:pb-[10rem] md:pb-[12rem] lg:pb-[15rem] xl:pb-[2rem]
			 pl-[1rem] md:pl-[4rem] lg:pl-[4rem] xl:pl-0
			`}>
				<section 
				 id="tier-name-section" 
				 className={` 
				`}>
					<span 
					 id="tier"
					 className={`
					 flex justify-between  
					 space-x-3 sm:space-x-0
					 flex-row sm:flex-col
					`}>
						<h2 
						 id="tier-name" 
						 className={`
						 ${bangers.className} 
						 text-3xl lg:text-4xl xl:text-4xl
						 text-nowrap
						`}>
						{name}
						</h2>
						<h3 className={`${gudeaBold.className} text-xl`}><i>Tier</i></h3>
					</span>

					<h4>Originally was...</h4>
				</section>

				<section 
				 id="tier-pricing-section" 
				 className={`flex space-x-1 w-full justify-center`}
				>
					<h1 
					 id="dollar-amt" 
					 className={`${gudeaBold.className} text-6xl`}
					>${dollars}</h1>
					<h6 
					 id="cent-amt" 
					 className={`${gudeaBold.className} text-base mt-1`}
					>{cents}</h6>
					<span 
					 id="discount-wrapper" 
					 className={`
						 translate-x-[6rem] -translate-y-[2.5rem] 
						 h-[2.5rem] w-[10rem] absolute 
					 `}>
					 {discounted}
					</span>

				</section>

			</div>

			<div 
			 id="tier-bottom-half"
			 className={`
			 flex flex-col 
			 space-y-[2rem]
			 md:w-[45%] lg:w-[45%] xl:w-auto
			 py-[1rem] xl:py-0
			`}>
				<section 
				 id="tier-perks-section" 
				 className={`
				 flex
				 items-center xl:items-baseline
				 justify-end xl:justify-normal
				`}>
					<ol 
					 className={`
					 list-disc px-[2.5rem] 
					 flex flex-col 
					 space-y-[.5rem]
					`}>
					{perks.map( (perk, id) => {
						return (
							<li 
							 key={id} 
							 id="perk" 
							 className={`
							 md:text-base lg:text-lg xl:text-lg
							`}>
							{perk}
							</li>
						)	
					})}
					</ol>

				</section>

				
				<span 
				 id="tier-description-section" 
				 className={`
				 text-base text-center
				 md:-translate-x-[45%] lg:-translate-x-[40%] xl:-translate-x-[0%]
				`}>{description}</span>
				
				<span 
				 id="pricing-btn-wrapper" 
				 className={`
				 flex justify-center  
				 md:pt-[1rem]  
				 md:-translate-x-[45%] lg:-translate-x-[40%] xl:-translate-x-[0%]
				`}>
					<Button selectedPlan={plan}/>
				</span>
			</div>
		</div>
	)
}
