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
		 ref={ref}
		 className={`
		 md:w-[90%] lg:w-full xl:w-full 
		 flex flex-col items-center justify-center p-[1rem] space-y-[5rem]
		`}>
		{ visible ? ( 
			<>
			<Headline message={
 				<div 
				 className={`
				 flex flex-col
				`}>
 					<span>
					{`Didn't see a package that`} 
 					<b><em> FITS </em></b> 
 					your specific challenge?
					</span>
				<span>{`Let's customize a solution just for you!`}</span>
 				</div>
			}/>				
			<div id="" className={`flex w-full h-[5rem] justify-center items-center`}>
				<CtaButton 
				 message={'Schedule Now!'}
				 modalId={SIGNATURE}
				 metadata={"custom"}
				/>			
			</div>
			</>
		) : (<div className="min-h-[232px]"/>)}

		</section>

	)
	
})

export default CallToAction
