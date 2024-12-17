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
			 md:mb-[20rem] mb-[15rem] 
			 flex w-auto items-center justify-center
			`}>
				<CallToAction/>
			</div>

			<div id="matrixscape-container" className="min-h-[45rem]">
				<MatrixScape/>
			</div>

		</header>
	)
}



