import pricingData from '@data/json/pricingTierData.json';
import Tier from './tiers/tiers.tsx';
import PricingDeal from './pricing-deal.tsx';
export default function PricingTiers() {
    return (<div id="pricing-tier-wrapper" className={"\n\t\t\t flex md:flex-row flex-col md:space-x-[3rem] space-x-0\n\t\t\t md:space-y-0 space-y-[3rem]\n\t\t\t items-center justify-center\n\t\t"}>
		{pricingData.tiers.map(function (tier, id) {
            return (<Tier key={id} codeName={tier.codeName} name={tier.name} price={tier.price.discounted} perks={tier.perks} description={tier.description} animated={id * .1} discounted={<PricingDeal discount={tier.price.original}/>}/>);
        })}
		</div>);
}
