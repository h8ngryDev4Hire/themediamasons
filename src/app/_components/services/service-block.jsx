import Image from 'next/image';
import { bangers, gudeaThin } from '@ui/fonts.ts';
export default function ServiceBlock(_a) {
    var name = _a.name, desc = _a.desc, imgSrc = _a.imgSrc;
    return (<span id="service-block" className={"\n\t\t\t flex flex-col md:w-[18rem] w-[15rem] md:h-[18rem] h-[15rem]\n\t\t\t items-center justify-center\n\t\t\t bg-white bg-opacity-20 rounded-xl py-auto px-[1rem]\n\t\t\t md:space-y-[.5rem] space-y-[.25rem]\n\t\t"}>
			<h1 id="service-title" className={"\n\t\t\t\t ".concat(bangers.className, "\n\t\t\t\t text-white md:text-2xl text-lg\n\t\t\t\t text-center\n\t\t\t")}>
				{name}
			</h1>	
			
			<Image src={imgSrc} width={100} height={100} alt={""}/>

			<article id="service-desc" className={"\n\t\t\t\t".concat(gudeaThin.className, "\n\t\t\t\ttext-white md:text-base text-[0.75rem] text-center\n\t\t\t")}>
			{desc}
			</article>	
		</span>);
}
