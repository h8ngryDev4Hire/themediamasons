

import { useState, useEffect, useRef } from 'react'
import Headline from './headline.tsx'
import ServiceBlock from './service-block.tsx'
import serviceListData from '@data/json/serviceListData.json'

const TOP_ROW_SERVICE_DATA = serviceListData.services.slice(0,3)
const BOTTOM_ROW_SERVICE_DATA = serviceListData.services.slice(3,6)


export default function Services() {
	const [ isVisible, setVisibleState ] = useState(false)

	const serviceListRef = useRef<HTMLDivElement>(null)


	useEffect(()=>{
		const observer = new IntersectionObserver( ([ entry ]) =>{
				setVisibleState(entry.isIntersecting)
			},{
				root: null,
				rootMargin: '0px',
				threshold: 0
			})

		if (serviceListRef.current) observer.observe(serviceListRef.current)

		return () => { if (serviceListRef.current) observer.unobserve(serviceListRef.current) }
	
	},[])


	return (
		<div 
		 id="services" 
		 className={`
			 flex flex-col w-full items-center justify-center space-y-[6rem]
			 trans-ease-all-md transform min-h-[1000px]
		 `} 
		 ref={serviceListRef}
		>
			{isVisible && 
				<Headline 
				 message={<>
				 Scale <b className={`font-extrabold`}>UP </b> 
				 your <b>Digital Presence</b> with our Services!
				</>}/>
			}

			<section 
			 id="services-list" 
			 className={`
				md:flex-col flex-row flex 
				md:space-y-[5rem] space-x-[4rem] md:space-x-0
				w-screen
				${ isVisible ? "" : "opacity-0" } 
			`}>
				<section 
				 id="top-row" 
				 className={`
					 md:flex-row flex-col md:space-x-[5rem] space-y-[2rem] md:space-y-0 
					 flex items-center justify-center h-[65%]
				`}>
					{TOP_ROW_SERVICE_DATA.map( (service, id) => {
						return (
							<ServiceBlock
							 key={id}
							 name={service.name}
							 desc={service.desc}
							 imgSrc={service.imgSrc}
							/>	
						)
					})}
				</section>	
				<section 
				 id="bottom-row" 
				 className={`
					 md:flex-row flex-col md:space-x-[5rem] space-y-[2rem] md:space-y-0 
					 flex items-center justify-center h-[65%]
				`}>
					{BOTTOM_ROW_SERVICE_DATA.map( (service, id) => {
						return (
							<ServiceBlock
							 key={id}
							 name={service.name}
							 desc={service.desc}
							 imgSrc={service.imgSrc}
							/>	
						)
					})}
				</section>	
			</section>
		</div>

	)
}
