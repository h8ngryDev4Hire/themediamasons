

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
				flex items-center justify-center
				flex-row md:flex-row lg:flex-col xl:flex-col 
				md:space-y-0 lg:space-y-[3rem]
				space-x-[4rem] md:space-x-[2rem] lg:space-x-0
				w-screen
				${ isVisible ? "" : "opacity-0" } 
			`}>
				<section 
				 id="top-row" 
				 className={`
					 md:flex-col lg:flex-row xl:flex-row flex-col 
					 space-y-[2rem] md:space-y-[2rem] lg:space-y-0
					 lg:space-x-[3rem]
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
					 md:flex-col lg:flex-row xl:flex-row flex-col 
					 space-y-[2rem] md:space-y-[2rem] lg:space-y-0
					 lg:space-x-[3rem]
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
