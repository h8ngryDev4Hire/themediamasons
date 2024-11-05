'use client'

import { useState, useEffect } from 'react'
import { gudeaThin, gudeaBold, bangers } from '@ui/fonts.ts'
import Button from './button.tsx'


interface Params {
	name: string;
	price: number;
	perks: Array<string>
	description: string
	animated?: number | boolean 
	discounted?: JSX.Element | boolean
}

export default function Tier( { name, price, perks, description, animated = false, discounted = false } : Params ) {
	const [ dollars, cents ] = price.toLocaleString().split('.')
	
	const [ introStarted, setIntroState ] = useState(false)


	useEffect(()=>{  
		if (animated) { 
			console.log(animated ? true : false)
			setIntroState(true) 
		}
	},[])

	return (
		<div 
		 id="pricing-tier" 
		 className={`
			 ${gudeaThin.className}
			 md:py-[5rem] md:px-[1.5rem] p-[1.5rem] 
			 md:max-w-[25rem] max-w-[95vw] 
			 md:space-y-[2.5rem] space-y-[1rem]
			 md:space-x-0 space-x-[4.5rem]
			 flex md:flex-col 
			 md:items-center md:justify-center  
			 bg-zinc-800 rounded-xl text-white
			 trans-ease-md-all    
			 ${ animated 
				 ? `${ introStarted ? "" : "-translate-y-[50%] opacity-0" }` 
				 : `` 
			 }`}
		style={{ animationDelay: `${animated ? animated + 's' : animated}` }}
		>
			<div id="" className={``}></div>
			<div 
			 id="tier-top-half" 
			 className={`
				flex flex-col space-y-[2.5rem]
				justify-center md:pb-[5rem] pb-[5rem] 
			`}>
				<section 
				 id="tier-name-section" 
				 className={` `}
				>
					<span id="" className={`flex justify-between  space-x-3`}>
						<h2 
						 id="tier-name" 
						 className={`${bangers.className} text-5xl`}
						>
						{name}
						</h2>
						<h3 className={`${gudeaBold.className} text-xl`}>Tier</h3>
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
				flex flex-col space-y-[2.5rem]
			`}>
				<section 
				 id="tier-perks-section" 
				 className={``}
				>
					<ol className={`
						min-h-[20rem] list-disc px-5 flex flex-col space-y-[.5rem]

					`}>
					{perks.map( (perk, id) => {
						return (
							<li 
							 key={id} 
							 id="perk" 
							 className={`text-xl`}
							>
							{perk}
							</li>
						)	
					})}
					</ol>

				</section>

				
				<span id="tier-description-section" className={`text-base`}>{description}</span>
				
				<span 
				 id="pricing-btn-wrapper" 
				 className={`
					 flex justify-center  
					 md:pt-[4rem]  
				`}>
					<Button/>
				</span>
			</div>
		</div>
	)
}
