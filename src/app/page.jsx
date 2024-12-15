'use client';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigator from '@components/common/navigator/navigator.tsx';
import Transitioner from '@components/common/transitioner/transitioner.tsx';
import Hero from './_components/hero/hero.tsx';
import About from './_components/about/about.tsx';
import Pricing from './_components/pricing/pricing.tsx';
import Services from './_components/services/services.tsx';
import Contact from './_components/contact/contact.tsx';
var ThreeObject = dynamic(function () { return import('@components/three/cube.tsx'); }, { ssr: false });
export default function Home() {
    var heroRef = useRef(null);
    var _a = useState(true), isFloating = _a[0], setFloatState = _a[1];
    useEffect(function () {
        var ref = heroRef.current;
        var observer = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            // When Hero is not visible, set isFloating to true
            setFloatState(entry.isIntersecting);
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        });
        if (ref) {
            observer.observe(ref);
        }
        return function () {
            if (ref)
                observer.unobserve(ref);
        };
    }, []);
    return (<>
			<Navigator floating={isFloating}/>
			<div id="home-container" className={"\n         h-full w-screen flex flex-col \n         items-center justify-center \n         mb-[5rem] sm:mb-[7rem] md:mb-[10rem] \n         mt-[8rem] sm:mt-[10rem] md:mt-[15rem] \n         space-y-[12rem] sm:space-y-[15rem] md:space-y-[25rem]\n         snap-x overflow-x-hidden\n\t\t\t"}>

				<div id="hero-intersection-container" ref={heroRef} className={"\n           w-full h-full flex \n           px-4 sm:px-6 md:px-0\n\t\t\t\t"}>
					<Hero />
					<div id="hero-to-content" className={"\n             z-content min-w-full absolute \n             mt-[8rem] sm:mt-[10rem] md:mt-[15rem]\n\t\t\t\t\t"}>
						<Transitioner size={60}/>
					</div>
				</div>

				<main id="main-content" className={"\n           w-[90%] sm:w-[85%] md:w-[75%] \n           space-y-[2rem] sm:space-y-[3rem] md:space-y-[10rem]\n           flex flex-col items-center justify-center\n           px-4 sm:px-6 md:px-0\n\t   z-content\n\t   overflow-y-clip h-full\n\t\t\t\t"}>
					<div className="snap-proximity w-auto h-auto">
					<Services />
					</div>
					<div className="snap-proximity w-auto h-auto">
					<About />
					</div>
					<div className="snap-proximity w-auto h-auto">
					<Pricing />
					</div>
					<div className="snap-proximity w-auto h-auto">
					<Contact />
					</div>
				</main>

			</div>

		</>);
}
