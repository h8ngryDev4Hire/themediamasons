import MatrixScape from '@components/three/matrixscape.tsx'
import CallToAction from './call-to-action/call-to-action.tsx'

export default function Hero() {
	return (
		<header id="hero" className=" w-full min-h-[45rem] z-content items-center justify-center">
			<div id="cta-container" className="absolute inset-0 md:mb-[20rem] mb-[5rem] flex w-auto items-center justify-center">
				<CallToAction/>
			</div>

			<div id="matrixscape-container" className="min-h-[45rem]">
				<MatrixScape/>
			</div>

		</header>
	)
}



