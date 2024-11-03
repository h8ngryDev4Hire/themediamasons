import { bangers } from '@ui/fonts.ts'
import Image from 'next/image' 


interface Params {
	discount: number
}


export default function PricingDeal( { discount } : Params ) {
	const IMAGE_PATH = "/svg/slash.svg"

	return (
		<div id="" className={`flex items-center justify-center relative`}>
			<h1 
			 id="deal-price" 
			 className={`
				 ${bangers.className} 
				 text-lg text-opacity-80 text-white absolute mt-[1rem]
			`}>
				{discount.toLocaleString()}
			</h1>
			<div id="svg-wrapper" className={`absolute mt-[1rem] rotate-[20deg]`}>
				<Image
				 src={IMAGE_PATH}
				 width={25}
				 height={25}
				 alt={""}
				/>
			</div>

		</div>
	)
}
