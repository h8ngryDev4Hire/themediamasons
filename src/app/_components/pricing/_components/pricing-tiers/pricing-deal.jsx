import { bangers } from '@ui/fonts.ts';
import Image from 'next/image';
export default function PricingDeal(_a) {
    var discount = _a.discount;
    var IMAGE_PATH = "/svg/slash.svg";
    return (<div id="" className={"flex items-center justify-center relative"}>
			<h1 id="deal-price" className={"\n\t\t\t\t ".concat(bangers.className, " \n\t\t\t\t text-lg text-opacity-80 text-white absolute mt-[1rem]\n\t\t\t")}>
				{discount.toLocaleString()}
			</h1>
			<div id="svg-wrapper" className={"absolute mt-[1rem] rotate-[20deg]"}>
				<Image src={IMAGE_PATH} width={25} height={25} alt={""}/>
			</div>

		</div>);
}
