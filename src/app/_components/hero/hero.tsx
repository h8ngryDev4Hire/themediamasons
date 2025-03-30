import dynamic from 'next/dynamic'

import CallToAction from './call-to-action/call-to-action.tsx'

const MatrixScape = dynamic(() => import('@components/three/matrixscape.tsx'), { ssr: false })

export default function Hero() {
	return (
		<header id="hero" className=" w-full min-h-[45rem] z-content items-center justify-center">
			<div 
			 id="cta-container" 
			 className={`
			 absolute inset-0 
			 max-sm:mb-[16rem] sm:mb-[25rem] md:mb-[10rem] lg:mb-[10rem] xl:mb-[10rem]  
			 flex w-auto items-center justify-center
			`}>
				<CallToAction/>
			</div>

			<div 
			 id="matrixscape-container" 
			 className={`
			 max-sm:min-h-[30rem] min-h-[35rem] lg:min-h-[40rem]  xl:min-h-[45rem]
			 max-sm:mt-[7rem]
			`}>
				<MatrixScape/>
			</div>

		</header>
	)
}



