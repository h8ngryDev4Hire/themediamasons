import Navigator from '@components/common/navigator/navigator.tsx'
import ContentFactory from '@components/three/contentFactory/contentFactory.tsx'


export default function Services() {

	return (
		<>
			<Navigator floating={false}/>
			<div id="services-container" className={`relative flex min-h-[45rem] min-w-screen`}>
			{/* <ContentFactory/> */}
			</div>
		</>
	)
}
