//import Matrix from '@components/three/matrix.tsx'
import dynamic from 'next/dynamic'
import Transitioner from '@components/common/transitioner/transitioner.tsx'

const Matrix = dynamic(() => import('@components/three/matrix.tsx'), { ssr: false })

export default function Splash() {
	return (
		<>
		<div id="matrix-container" className={`absolute top-0 left-0 z-background w-screen min-h-[76rem]`}>
			<Matrix/>
		</div>
		<div id="hero-to-demo" className={`z-content min-w-full absolute mt-[40rem]`}>
			<Transitioner size={50}/>	
		</div>
		</>

	)
}





