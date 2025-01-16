'use client'

import Tier from './tiers/tiers.tsx'
import PricingDeal from './pricing-deal.tsx'
import { Routes, Sanity } from '@def/definitions.ts'
import { useEffect, useState } from 'react'


export default function PricingTiers() {
	const [ pricingTiers, setPricingTiers ] = useState<Sanity.PricingTier[]>([])


	useEffect(()=>{
		(async() => {
			try {
				const payload : Routes.FetchRequest = {
					content: 'pricingTiers'
				}

				const response = await fetch('/api/fetch/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				})

				const data : Routes.UnknownResponse = await response.json()

				if (!response.ok || !data.successful) {
					throw new Error(data.error)
				}

				const pricingTierData = data.data

				if (!pricingTierData) {
					throw new Error('Request successful yet no data was recieved.')
				}
				else {
					setPricingTiers(pricingTierData)
				}

			} catch(error : unknown) {
				console.error(error)
			}
		})()
	},[])

	return (
		<div 
		 id="pricing-tier-wrapper" 
		 className={`
		 flex 
		 flex-col md:flex-col lg:flex-col xl:flex-row  
		 space-x-0 md:space-x-0 lg:space-x-0 xl:space-x-[3rem] 
		 space-y-[3rem] md:space-y-[2rem] lg:space-y-[4rem] xl:space-y-0 
		 items-center justify-center
		`}>
		{pricingTiers.map( (tier , id ) => {
			return (
				<Tier
				 key={id}
				 codeName={tier.codeName as Sanity.ServicePackage}
				 name={tier.name}
				 price={tier.price.discounted}
				 perks={tier.perks}
				 description={tier.description}
				 animated={ id * .1 } 
				 discounted={
					 <PricingDeal discount={tier.price.original}/>
				}/>
			)
		})}
		</div>
	)
}
