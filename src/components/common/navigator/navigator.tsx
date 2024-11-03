'use client'

import { useState, createContext, useEffect } from 'react'
import NavBtn from './nav-btn.tsx'
import NavCenter from './nav-center.tsx'

interface Params {
	floating: boolean
}


export const NavigatorContext = createContext()


export default function Navigator({floating} : Params ): JSX.Element {
	const [ isFloating, setFloatState ] = useState<boolean>(floating)

	useEffect(()=>{ setFloatState(floating) })

	return (
		<div
		 id="navigator-container"
		 className={`
			 ${ isFloating ? "p-[1rem] " : "" } 
			 trans-ease-all fixed flex top-0 w-full h-[5rem] z-layout 
		`}>
	      		<nav 
	        	 id="navigator-top" 
			 className={` 
			  	transition-all duration-300 ease-in-out
			  	${ isFloating ? "bg-opacity-0 rounded-xl" : "bg-opacity-100 rounded-none" } 
	          	  	flex flex-grow  h-[4rem] bg-zinc-900 p-1 
				items-center justify-center
	        	 `}
	      		>
				<NavigatorContext.Provider value={[isFloating]}>
	        			<section 
					 id="nav-left-section" 
					 className={`
					 	transition-transform duration-300 ease-in-out transform
					 	${ isFloating ? 
							"space-x-[3rem] md:space-x-[10rem]" : 
							"hidden md:flex space-x-[4rem]" 
						} flex h-full flex-grow items-center justify-center
					`}>
	          				<NavBtn name={"Pricing"} href={"/pricing"}/>
	          				<NavBtn name={"About"} href={"/about"}/>
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
							"space-x-[3rem] md:space-x-[10rem]" : 
							"hidden md:flex space-x-[4rem]" 
						} flex h-full flex-grow items-center justify-center
					`}>
	          				<NavBtn name={"Services"} href={"/services"}/>
	          				<NavBtn name={"Blog"} href={""}/>
	        			</section>
				</NavigatorContext.Provider>
	      		</nav>
		</div>
	)
}
