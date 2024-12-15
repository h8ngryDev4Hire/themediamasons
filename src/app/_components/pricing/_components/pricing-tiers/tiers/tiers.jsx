'use client';
import { useState, useEffect } from 'react';
import { gudeaThin, gudeaBold, bangers } from '@ui/fonts.ts';
import Button from './button.tsx';
export default function Tier(_a) {
    var name = _a.name, codeName = _a.codeName, price = _a.price, perks = _a.perks, description = _a.description, _b = _a.animated, animated = _b === void 0 ? false : _b, _c = _a.discounted, discounted = _c === void 0 ? false : _c;
    var _d = price.toLocaleString().split('.'), dollars = _d[0], cents = _d[1];
    var plan = codeName;
    var _e = useState(false), introStarted = _e[0], setIntroState = _e[1];
    useEffect(function () {
        if (animated) {
            setIntroState(true);
        }
    }, []);
    return (<div id="pricing-tier" className={"\n\t\t\t ".concat(gudeaThin.className, "\n\t\t\t md:py-[3rem] md:px-[1rem] p-[1rem] \n\t\t\t md:max-w-[25rem] max-w-[95vw] \n\t\t\t md:space-y-[1rem] space-y-[1rem]\n\t\t\t md:space-x-0 space-x-[4.5rem]\n\t\t\t flex md:flex-col \n\t\t\t md:items-center md:justify-center  \n\t\t\t bg-zinc-800 rounded-xl text-white\n\t\t\t trans-ease-md-all    \n\t\t\t ").concat(animated
            ? "".concat(introStarted ? "" : "-translate-y-[50%] opacity-0")
            : "")} style={{ animationDelay: "".concat(animated ? animated + 's' : animated) }}>
			<div id="" className={""}></div>
			<div id="tier-top-half" className={"\n\t\t\t\tflex flex-col space-y-[1.5rem]\n\t\t\t\tjustify-center md:pb-[2rem] pb-[5rem] \n\t\t\t"}>
				<section id="tier-name-section" className={" "}>
					<span id="" className={"flex justify-between  space-x-3"}>
						<h2 id="tier-name" className={"".concat(bangers.className, " text-4xl")}>
						{name}
						</h2>
						<h3 className={"".concat(gudeaBold.className, " text-xl")}><i>Tier</i></h3>
					</span>

					<h4>Originally was...</h4>
				</section>

				<section id="tier-pricing-section" className={"flex space-x-1 w-full justify-center"}>
					<h1 id="dollar-amt" className={"".concat(gudeaBold.className, " text-6xl")}>${dollars}</h1>
					<h6 id="cent-amt" className={"".concat(gudeaBold.className, " text-base mt-1")}>{cents}</h6>
					<span id="discount-wrapper" className={"\n\t\t\t\t\t\t translate-x-[6rem] -translate-y-[2.5rem] \n\t\t\t\t\t\t h-[2.5rem] w-[10rem] absolute \n\t\t\t\t\t "}>
					 {discounted}
					</span>

				</section>

			</div>

			<div id="tier-bottom-half" className={"\n\t\t\t flex flex-col space-y-[2rem]\n\t\t\t"}>
				<section id="tier-perks-section" className={""}>
					<ol className={"\n\t\t\t\t\t min-h-[20rem] list-disc px-[2.5rem] \n\t\t\t\t\t flex flex-col space-y-[.5rem]\n\t\t\t\t\t"}>
					{perks.map(function (perk, id) {
            return (<li key={id} id="perk" className={"text-lg"}>
							{perk}
							</li>);
        })}
					</ol>

				</section>

				
				<span id="tier-description-section" className={"text-base text-center"}>{description}</span>
				
				<span id="pricing-btn-wrapper" className={"\n\t\t\t\t\t flex justify-center  \n\t\t\t\t\t md:pt-[1rem]  \n\t\t\t\t"}>
					<Button selectedPlan={plan}/>
				</span>
			</div>
		</div>);
}
