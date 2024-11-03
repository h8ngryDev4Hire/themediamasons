import Image from 'next/image'
import { bangers, gudeaThin } from '@ui/fonts.ts'

interface Params {
	name: string;
	desc: string;
	imgSrc: string;
}


export default function ServiceBlock( { name, desc, imgSrc } : Params ) {
	return (
		<span 
		 id="service-block" 
		 className={`
			 flex flex-col md:w-[20rem] w-[15rem] md:h-[20rem] h-[15rem]
			 items-center justify-center
			 bg-white bg-opacity-20 rounded-xl p-[1.5rem] 
			 md:space-y-[1rem] space-y-[.5rem]
		`}>
			<h1 
			 id="service-title" 
			 className={`
				 ${bangers.className}
				 text-white md:text-2xl text-lg
			`}>
				{name}
			</h1>	
			
			<Image
			 src={imgSrc}
			 width={100}
			 height={100}
			 alt={""}
			/>

			<article 
			 id="service-desc" 
			 className={`
				${gudeaThin.className}
				text-white md:text-base text-[0.75rem] text-center
			`}>
			{desc}
			</article>	
		</span>
	)
}
