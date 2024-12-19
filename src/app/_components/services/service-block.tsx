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
			 max-sm:block flex flex-col 
			 max-sm:w-[85vw] md:w-[18rem] w-[15rem] 
			 max-sm:h-[10rem] md:h-[18rem] h-[15rem]
			 items-center 
			 max-sm:justify-between justify-center
			 bg-white bg-opacity-20 rounded-xl 
			 max-sm:py-[1rem] py-auto 
			 px-[1rem]
			 max-sm:space-y-[1rem] md:space-y-[.5rem] 
			 space-y-[.25rem]
		`}>
			<h1 
			 id="service-title" 
			 className={`
				 ${bangers.className}
				 text-white md:text-2xl text-lg
				 max-sm:text-start text-center
				 max-sm:px-[1rem] 
			`}>
				{name}
			</h1>	
			
				<Image
				 src={imgSrc}
				 width={100}
				 height={100}
				 alt={""}
				 className={`
			 max-sm:w-[40%]
			 max-sm:h-[50%]
			 float-left
				`}/>




			<article 
			 id="service-desc" 
			 className={`
				${gudeaThin.className}
				text-white 
				max-sm:text-sm sm:text-sm md:text-base  
				max-sm:text-start text-center
			`}>
			{desc}
			</article>	
		</span>
	)
}
