'use client';
import { useState, createContext, useEffect } from 'react';
import NavBtn from './nav-btn.tsx';
import NavCenter from './nav-center.tsx';
import ProgressBar from '@components/progress-bar/progress-bar.tsx';
export var NavigatorContext = createContext([]);
export default function Navigator(_a) {
    var floating = _a.floating;
    var _b = useState(floating), isFloating = _b[0], setFloatState = _b[1];
    useEffect(function () { setFloatState(floating); });
    return (<div id="navigator-container" className={"\n\t\t\t ".concat(isFloating ? "p-[1rem] " : "", " \n\t\t\t trans-ease-all fixed top-0 w-screen h-[5rem] \n\t\t\t z-layout flex flex-col\n\t\t\t overflow-x-hidden\n\t\t")}>
	      		<nav id="navigator-top" className={" \n\t\t\t  \ttransition-all duration-300 ease-in-out\n\t\t\t  \t".concat(isFloating ? "bg-opacity-0 rounded-xl" : "bg-opacity-100 rounded-none", " \n\t          \t  \tflex flex-grow  h-[4rem] bg-zinc-900 p-1 \n\t\t\t\titems-center justify-center\n\t        \t ")}>
				<NavigatorContext.Provider value={[isFloating]}>
	        			<section id="nav-left-section" className={"\n\t\t\t\t\t \ttransition-transform duration-300 ease-in-out transform\n\t\t\t\t\t \t".concat(isFloating ?
            "space-x-[3rem] md:space-x-[10rem]" :
            "hidden md:flex space-x-[4rem]", " flex h-full flex-grow items-center justify-center\n\t\t\t\t\t")}>
	          				<NavBtn name={"Pricing"} href={"/#pricing"}/>
	          				<NavBtn name={"About"} href={"/#about"}/>
	        			</section>
	        			<section id="nav-center-section" className={"\n\t\t\t\t\t\t h-full w-[15rem] flex\n\t\t\t\t\t\t ".concat(isFloating ?
            "hidden md:flex opacity-0 pointer-events-none" :
            " opacity-100", " trans-ease-all\n\t\t\t\t\t")}>
	          				<NavCenter />	
	        			</section>
	        			<section id="nav-right-section" className={"\n\t\t\t\t\t \ttransition-transform duration-300 ease-in-out transform\n\t\t\t\t\t \t".concat(isFloating ?
            "space-x-[3rem] md:space-x-[10rem]" :
            "hidden md:flex space-x-[4rem]", " flex h-full flex-grow items-center justify-center\n\t\t\t\t\t")}>
	          				<NavBtn name={"Services"} href={"/#services"}/>
	          				<NavBtn name={"Contact"} href={"/#contact"}/>
	        			</section>
				</NavigatorContext.Provider>
	      		</nav>

			{!isFloating && <ProgressBar />}
		</div>);
}
