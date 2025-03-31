import { Sanity } from "@def/definitions";
import { bangers, gudeaBold, gudeaThin } from "@ui/fonts";
import Image from "next/image";
import { useContext } from "react";
import { AddonsContext, AddonsMasterContext } from "./addons";

type CompliantAddon = Omit<Sanity.Addon, 'pricing'>

interface Props extends CompliantAddon {}

export default function AddonBlock( { name, description, iconUrl } : Props ) {
	const { transitionContext }  = useContext(AddonsContext) as AddonsMasterContext 
	const { transitionState } = transitionContext

	return (
		<div 
		 id="addon-block" 
		 className={`
		 max-sm:h-[8rem] h-[9rem] md:h-[11rem] lg:h-[12rem] xl:h-[13rem] 
		 max-sm:w-[8rem] w-[9rem] md:w-[10rem] lg:w-[12rem] xl:w-[13rem] 
		 p-1 md:p-3 lg:p-4
		 rounded-xl 
		 bg-white bg-opacity-10
		 flex flex-col 
		 items-center 
		 justify-center lg:justify-between xl:justify-between
		 sm:space-y-2 md:space-y-3 space-y-1
		 text-white text-center
		 trans-ease-all
		 shrink-0
		 ${ transitionState ? "blur scale-50" : "scale-100 blur-none" }
		`}>	
			<h2 
			 className={`
			 ${bangers.className} 
			 max-sm:text-base text-base md:text-lg lg:text-lg xl:text-lg
			 px-1
			`}>{name}</h2>
			<Image 
			 src={iconUrl}
			 height={40}
			 width={40}
			 alt={""}
			 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
			/>
			<span 
			 className={`
			 ${gudeaBold.className} text-xs sm:text-sm
			 max-sm:hidden sm:hidden md:hidden lg:block xl:block
			 line-clamp-2 px-1
			`}>{description}</span>
		</div>
	)
}
