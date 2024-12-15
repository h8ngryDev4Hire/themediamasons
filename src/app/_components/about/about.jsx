'use client';
import { useEffect, useState } from "react";
import TextContent from "./_components/text-content/text-content";
import { bangers } from "@ui/fonts";
export default function About() {
    var _a = useState(false), transition = _a[0], setTransition = _a[1];
    useEffect(function () {
        setTransition(true);
    }, []);
    return (<>
			<div id="about" className={"\n\t\t\t relative z-content md:h-screen h-[90rem] \n\t\t\t flex flex-col\n\t\t\t items-center justify-center\n\t\t\t py-[12rem] md:py-[1rem]\n\t\t\t md:mt-[7rem]\n\t\t\t space-y-[2rem]\n\t\t\t"}>
				<h1 id="title" className={"\n\t\t\t\t ".concat(bangers.className, " \n\t\t\t\t w-full\n\t\t\t\t text-5xl text-white\n\t\t\t\t")}>About The Media Masons
				</h1>

				<main id="main-content" className={"\n\t\t\t\t\ttrans-ease-all\n\t\t\t\t\tflex w-[75vw] h-full items-center justify-center bg-white\n\t\t\t\t\tpx-[3rem] py-[1rem] rounded-xl   \n\t\t\t\t\t".concat(transition ? "bg-opacity-10" : "bg-opacity-50", "\n\t\t\t\t\tmd:space-x-[5rem] \n\t\t\t\t")}>
					<div id="about-section" className={"\n\t\t\t\t\t w-full \n\t\t\t\t\t flex flex-col items-center justify-center\n\t\t\t\t\t mb-[4rem]\n\t\t\t\t\t"}>
	
						<TextContent />
					</div>
				</main>
			</div>
		</>);
}
