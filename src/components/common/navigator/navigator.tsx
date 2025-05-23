'use client'

import { useState, createContext, useEffect } from 'react'
import NavBtn from './nav-btn.tsx'
import NavCenter from './nav-center.tsx'
import ProgressBar from '@components/progress-bar/progress-bar.tsx'

interface Params {
	floating: boolean
}


export const NavigatorContext = createContext<any>(undefined)


export default function Navigator({floating} : Params ): JSX.Element {
	const [ isFloating, setFloatState ] = useState<boolean>(floating)

	useEffect(()=>{ setFloatState(floating) } )

	return (
		<div
		 id="navigator-container"
		 className={`
			 ${ isFloating ? "p-[1rem] " : "" } 
			 trans-ease-all fixed top-0 w-screen h-[5rem] 
			 z-layout flex flex-col
			 overflow-x-hidden
		`}>
	      		<nav 
	        	 id="navigator-top" 
			 className={` 
			  	transition-all duration-300 ease-in-out
			  	${ isFloating 
					? "bg-opacity-0 rounded-xl py-[.25rem]" 
					: "bg-opacity-100 rounded-none py-[.75rem]" 
				} 
	          	  	flex flex-grow  h-full bg-zinc-900 p-1 
				items-center justify-center
				max-sm:px-[.5rem] sm:px-[1rem] md:px-[2rem] lg:px-[3rem] xl:px-[9rem]
	        	 `}
	      		>
				<NavigatorContext.Provider value={[isFloating]}>
	        			<section 
					 id="nav-left-section" 
					 className={`
					 transition-transform duration-300 ease-in-out transform
					 ${ isFloating ? 
						"max-sm:space-x-1 space-x-[3rem] md:space-x-[10rem]" : 
						"hidden md:flex space-x-[4rem]" 
					 } flex h-full flex-grow items-center justify-center
					`}>
	          				<NavBtn name={"Pricing"} href={"/#pricing"}/>
	          				<NavBtn name={"About"} href={"/#about"}/>
	        			</section>
	        			<section 
					 id="nav-center-section" 
					 className={`
						 h-full w-[15rem] flex
						 ${isFloating ? 
							 "hidden md:flex opacity-0 pointer-events-none" : 
							 " opacity-100"
						 } trans-ease-all
					`}>
	          				<NavCenter/>	
	        			</section>
	        			<section 
					 id="nav-right-section" 
					 className={`
					 transition-transform duration-300 ease-in-out transform
					 ${ isFloating ? 
						"max-sm:space-x-1 space-x-[3rem] md:space-x-[10rem]" : 
						"hidden md:flex space-x-[4rem]" 
					 } flex h-full flex-grow items-center justify-center
					`}>
	          				<NavBtn name={"Services"} href={"/#services"}/>
	          				<NavBtn name={"Contact"} href={"/?modal=contact-modal"}/>
	        			</section>
				</NavigatorContext.Provider>
	      		</nav>

			{!isFloating && <ProgressBar/>}
		</div>
	)
}
