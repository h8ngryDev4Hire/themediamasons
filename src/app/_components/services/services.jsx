import { useState, useEffect, useRef } from 'react';
import Headline from './headline.tsx';
import ServiceBlock from './service-block.tsx';
import serviceListData from '@data/json/serviceListData.json';
var TOP_ROW_SERVICE_DATA = serviceListData.services.slice(0, 3);
var BOTTOM_ROW_SERVICE_DATA = serviceListData.services.slice(3, 6);
export default function Services() {
    var _a = useState(false), isVisible = _a[0], setVisibleState = _a[1];
    var serviceListRef = useRef(null);
    useEffect(function () {
        var observer = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            setVisibleState(entry.isIntersecting);
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0
        });
        if (serviceListRef.current)
            observer.observe(serviceListRef.current);
        return function () { if (serviceListRef.current)
            observer.unobserve(serviceListRef.current); };
    }, []);
    return (<div id="services" className={"\n\t\t\t flex flex-col w-full items-center justify-center space-y-[6rem]\n\t\t\t trans-ease-all-md transform min-h-[1000px]\n\t\t "} ref={serviceListRef}>
			{isVisible &&
            <Headline message={<>
				 Scale <b className={"font-extrabold"}>UP </b> 
				 your <b>Digital Presence</b> with our Services!
				</>}/>}

			<section id="services-list" className={"\n\t\t\t\tmd:flex-col flex-row flex \n\t\t\t\tmd:space-y-[5rem] space-x-[4rem] md:space-x-0\n\t\t\t\tw-screen\n\t\t\t\t".concat(isVisible ? "" : "opacity-0", " \n\t\t\t")}>
				<section id="top-row" className={"\n\t\t\t\t\t md:flex-row flex-col md:space-x-[5rem] space-y-[2rem] md:space-y-0 \n\t\t\t\t\t flex items-center justify-center h-[65%]\n\t\t\t\t"}>
					{TOP_ROW_SERVICE_DATA.map(function (service, id) {
            return (<ServiceBlock key={id} name={service.name} desc={service.desc} imgSrc={service.imgSrc}/>);
        })}
				</section>	
				<section id="bottom-row" className={"\n\t\t\t\t\t md:flex-row flex-col md:space-x-[5rem] space-y-[2rem] md:space-y-0 \n\t\t\t\t\t flex items-center justify-center h-[65%]\n\t\t\t\t"}>
					{BOTTOM_ROW_SERVICE_DATA.map(function (service, id) {
            return (<ServiceBlock key={id} name={service.name} desc={service.desc} imgSrc={service.imgSrc}/>);
        })}
				</section>	
			</section>
		</div>);
}
