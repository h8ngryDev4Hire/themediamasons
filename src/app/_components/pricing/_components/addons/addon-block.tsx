import { Addon } from "@def/definitions";
import { bangers, gudeaBold, gudeaThin } from "@ui/fonts";
import Image from "next/image";
import { useContext } from "react";
import { AddonsContext, AddonsMasterContext } from "./addons";

type CompliantAddon = Omit<Addon, 'pricing'>

interface Props extends CompliantAddon {

}

export default function AddonBlock( { name, description, svg } : Props ) {
	const { transitionContext } : AddonsMasterContext = useContext(AddonsContext)
	const { transitionState } = transitionContext

	return (
		<div 
		 id="addon-block" 
		 className={`
		 h-[14rem] w-[14rem] p-[1rem]
		 rounded-xl 
		 bg-white bg-opacity-10
		 flex flex-col 
		 items-center justify-between
		 text-white text-center
		 trans-ease-all
		 ${ transitionState ? "blur scale-50" : "scale-100 blur-none" }
		`}>	
			<h2 className={`${bangers.className} text-lg`}>{name}</h2>
			<Image 
			 src={svg}
			 height={50}
			 width={50}
			 alt={""}
			 className=""
			/>
			<span className={`${gudeaBold.className} text-base`}>{description}</span>
		</div>
	)
}
