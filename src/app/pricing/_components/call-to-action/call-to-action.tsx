import { ForwardedRef, forwardRef, useState  } from "react"
import Headline from "./headline"
import CtaButton from "@components/common/call-to-action/call-to-action-btn"
import { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx'

interface Props {
	visible: boolean
}

//export default function CallToAction({ ref, visible } : Props ) {
//}

const CallToAction = forwardRef<HTMLElement, Props>( function CallToAction( 
	{ visible } : Props, 
	ref : ForwardedRef<HTMLElement>
) {

	return (
		<section 
		 id="demo-section" 
		 className={`w-full flex flex-col items-center justify-center p-[1rem] space-y-[5rem]`} 
		 ref={ref}
		>
		{ visible ? ( 
			<>
			<Headline message={
				<>
				Intrigued but 
				<b><em> STILL </em></b> 
				not sold? Get a free demo scheduled with us!
				</>
			}/>				
			<div id="" className={`flex w-full h-[5rem] justify-center items-center`}>
				<CtaButton 
				 message={'Schedule Now!'}
				 modalId={SIGNATURE}
				/>			
			</div>
			</>
		) : (<div className="min-h-[232px]"/>)}

		</section>

	)
	
})

export default CallToAction
