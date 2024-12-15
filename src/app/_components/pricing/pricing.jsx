'use client';
import { useState, useEffect, useRef } from 'react';
import Headline from './_components/call-to-action/headline.tsx';
import PricingTiers from './_components/pricing-tiers/pricing-tiers.tsx';
import Splash from './_components/splash/spash.tsx';
import CallToAction from './_components/call-to-action/call-to-action.tsx';
import Transitioner from '@components/common/transitioner/transitioner.tsx';
import Addons from './_components/addons/addons.tsx';
export default function Pricing() {
    var _a = useState(false), demoIsVisible = _a[0], setDemoState = _a[1];
    var demoSectionRef = useRef(null);
    useEffect(function () {
        var observer = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            setDemoState(entry.isIntersecting);
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0
        });
        if (demoSectionRef.current)
            observer.observe(demoSectionRef.current);
        return function () { if (demoSectionRef.current)
            observer.unobserve(demoSectionRef.current); };
    }, []);
    useEffect(function () {
    }, []);
    return (<div>
			<div id="splash-container" className={"\n\t\t\t relative\n\t\t\t w-screen\n\t\t\t"}>
				<div className="relative translate-y-[13rem] z-foreground">
					<Transitioner size={40}/>
				</div>
				<div id="pricing">
					<Splash />
				</div>
			</div>

			<div id="main-content-container" className={"\n\t\t\t\t flex flex-col \n\t\t\t\t h-full md:min-h-[1564px] min-h-[2387px] \n\t\t\t\t w-screen items-center justify-center \n\t\t\t\t my-[10rem] top-0 left-0\n\t\t\t"}>

			
				
				<main id="main-content" className={"\n\t\t\t\t z-content   md:w-[75%] w-full space-y-[4rem]\n\t\t\t\t flex flex-col items-center justify-center\n\t\t\t\t"}>
					<Headline message={<>
						Pricing That Fits 
						<b><em className={""}> Every </em></b> 
						Business&apos;s Needs!
						</>}/>

					<PricingTiers />
					<Addons />	
					<CallToAction ref={demoSectionRef} visible={demoIsVisible}/>
				</main>
			</div>
		</div>);
}
