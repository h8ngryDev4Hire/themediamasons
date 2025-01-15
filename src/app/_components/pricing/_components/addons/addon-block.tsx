import { Addon } from "@def/definitions";
import { bangers, gudeaBold, gudeaThin } from "@ui/fonts";
import Image from "next/image";
import { useContext } from "react";
import { AddonsContext, AddonsMasterContext } from "./addons";

type CompliantAddon = Omit<Addon, 'pricing'>

interface Props extends CompliantAddon {}

export default function AddonBlock( { name, description, iconUrl } : Props ) {
	const { transitionContext }  = useContext(AddonsContext) as AddonsMasterContext 
	const { transitionState } = transitionContext

	return (
		<div 
		 id="addon-block" 
		 className={`
		 max-sm:h-[8rem] h-[9rem] md:h-[11rem] lg:h-[14rem] xl:h-[14rem] 
		 max-sm:w-[8rem] w-[9rem] md:w-[11rem] lg:w-[14rem] xl:w-[14rem] 
		 p-1 md:p-[1rem] lg:p-[1rem] xl:p-[1rem]
		 rounded-xl 
		 bg-white bg-opacity-10
		 flex flex-col 
		 items-center 
		 justify-center lg:justify-between xl:justify-between
		 sm:space-y-[1rem] md:space-y-[1rem] space-y-0
		 text-white text-center
		 trans-ease-all
		 ${ transitionState ? "blur scale-50" : "scale-100 blur-none" }
		`}>	
			<h2 
			 className={`
			 ${bangers.className} 
			 max-sm:text-base text-base md:text-lg lg:text-lg xl:text-lg
			`}>{name}</h2>
			<Image 
			 src={iconUrl}
			 height={50}
			 width={50}
			 alt={""}
			 className=""
			/>
			<span 
			 className={`
			 ${gudeaBold.className} text-base
			 max-sm:hidden sm:hidden md:hidden lg:block xl:block
			`}>{description}</span>
		</div>
	)
}
