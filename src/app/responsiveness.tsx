import { useEffect, useState } from "react"

export default function Responsiveness() {
	const [ viewportX, setViewportX ] = useState<number>(window.innerWidth)

	useEffect(()=>{
		const handleViewportChange = () => setViewportX(window.innerWidth)
		window.addEventListener('resize', handleViewportChange)	

		return () => window.addEventListener('resize', handleViewportChange)
	},[])

	return (
		<div 
		 id="responsive-modal" 
		 className={`
		 fixed w-screen h-screen
		 top-0 left-0
		 flex flex-col justify-end items-center
		 pb-[5rem]
		 z-modal
		 pointer-events-none
		`}>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-zinc-600
			 absolute
			 text-center text-white text-2xl
			 opacity-100 sm:opacity-0 md:opacity-0 lg:opacity-0 xl:opacity-0
			`}>
			{`Breakpoint | ${viewportX}`}
			</div>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-red-600
			 absolute
			 text-center text-white text-2xl
			 opacity-0
			 sm:opacity-100 md:opacity-0 lg:opacity-0 xl:opacity-0
			`}>
			{`SM Breakpoint | ${viewportX}`}
			</div>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-blue-600
			 absolute
			 text-center text-white text-2xl
			 opacity-0
			 sm:opacity-0 md:opacity-100 lg:opacity-0 xl:opacity-0
			`}>
			{`MD Breakpoint | ${viewportX}`}
			</div>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-green-600
			 absolute
			 text-center text-white text-2xl
			 opacity-0
			 sm:opacity-0 md:opacity-0 lg:opacity-100 xl:opacity-0
			`}>
			{`LG Breakpoint | ${viewportX}`}
			</div>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-yellow-600
			 absolute
			 text-center text-white text-2xl
			 opacity-0
			 sm:opacity-0 md:opacity-0 lg:opacity-0 xl:opacity-100
			`}>
			{`XL Breakpoint | ${viewportX}`}
			</div>
		</div>
	)
}
