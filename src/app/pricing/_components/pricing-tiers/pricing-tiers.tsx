import pricingData from '@data/pricingTierData.json'
import Tier from './tiers/tiers.tsx'
import PricingDeal from './pricing-deal.tsx'



export default function PricingTiers() {

	return (
		<div 
		 id="pricing-tier-wrapper" 
		 className={`
			 flex md:flex-row flex-col md:space-x-[3rem] space-x-0
			 md:space-y-0 space-y-[3rem]
			 items-center justify-center
		`}>
		{pricingData.tiers.map( (tier,id) => {
			return (
				<Tier
				 key={id}
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
