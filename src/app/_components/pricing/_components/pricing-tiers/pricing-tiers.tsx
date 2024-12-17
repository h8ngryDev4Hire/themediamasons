import pricingData from '@data/json/pricingTierData.json'
import Tier from './tiers/tiers.tsx'
import PricingDeal from './pricing-deal.tsx'
import { PricingTier } from '@def/definitions.ts'



export default function PricingTiers() {
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
		{pricingData.tiers.map( (tier : PricingTier, id : number) => {
			return (
				<Tier
				 key={id}
				 codeName={tier.codeName}
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
