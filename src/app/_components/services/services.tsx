

import { useState, useEffect, useRef } from 'react'
import Headline from './headline.tsx'
import ServiceBlock from './service-block.tsx'
import { FetchRequest, UnknownResponse } from '@def/routes.ts'
import { ServiceBlockArray } from '@def/sanity.ts'



export default function Services() {
	const [ isVisible, setVisibleState ] = useState(false)
	const [ serviceBlocks, setServiceBlocks ] = useState<ServiceBlockArray>([])

	const serviceListRef = useRef<HTMLDivElement>(null)


	useEffect(()=> {
		(async ()=> {
			try {
				const payload : FetchRequest = {
					content: 'serviceList'
				}

				const response = await fetch('/api/fetch/', {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				})

				const data : UnknownResponse = await response.json()

				if (!response.ok || !data.successful) {
					throw new Error(data.error)
				}

				const serviceBlockData : ServiceBlockArray = data.data

				if (!serviceBlockData) {
					throw new Error('Request successful yet no data was recieved.')
				} else {
					setServiceBlocks(serviceBlockData)
				}
			} catch (error) {

			}
		})()
	},[])

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
				max-sm:flex-col flex-row md:flex-row lg:flex-col xl:flex-col 
				max-sm:space-y-[2rem] md:space-y-0 lg:space-y-[3rem]
				max-sm:space-x-0 space-x-[4rem] md:space-x-[2rem] lg:space-x-0
				w-screen
				${ isVisible ? "" : "opacity-0" } 
			`}>
				<section 
				 id="top-row" 
				 className={`
					 md:flex-col lg:flex-row xl:flex-row flex-col 
					 max-sm:space-y-[2rem] space-y-[2rem] md:space-y-[2rem] lg:space-y-0
					 lg:space-x-[3rem]
					 flex items-center justify-center h-[65%]
				`}>
					{serviceBlocks.slice(0,3).map( (service, id) => {
						return (
							<ServiceBlock
							 key={id}
							 name={service.name}
							 desc={service.description}
							 imgSrc={service.iconUrl}
							/>	
						)
					})}
				</section>	
				<section 
				 id="bottom-row" 
				 className={`
					 md:flex-col lg:flex-row xl:flex-row flex-col 
					 max-sm:space-y-[2rem] space-y-[2rem] md:space-y-[2rem] lg:space-y-0
					 lg:space-x-[3rem]
					 flex items-center justify-center h-[65%]
				`}>
					{serviceBlocks.slice(3,6).map( (service, id) => {
						return (
							<ServiceBlock
							 key={id}
							 name={service.name}
							 desc={service.description}
							 imgSrc={service.iconUrl}
							/>	
						)
					})}
				</section>	
			</section>
		</div>

	)
}
