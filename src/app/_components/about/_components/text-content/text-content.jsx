'use client';
import Laptop3D from "@components/three/laptop";
import { gudeaBold, gudeaThin } from "@ui/fonts";
import { useEffect, useState } from "react";
export default function TextContent() {
    var _a = useState(''), mission = _a[0], setMission = _a[1];
    var _b = useState(''), values = _b[0], setValues = _b[1];
    var getQueryParams = function (param) {
        return '/api/fetch-text-content?filename=' + param;
    };
    useEffect(function () {
        fetch(getQueryParams('mission'))
            .then(function (res) { return res.json(); })
            .then(function (data) { return setMission(data.successful ? data.content : ''); });
        fetch(getQueryParams('values'))
            .then(function (res) { return res.json(); })
            .then(function (data) { return setValues(data.successful ? data.content : ''); });
    }, []);
    return (<section id="text-content" className={"space-y-[2.5rem]"}>
			<aside id="subject" className={"\n\t\t\t\t w-[45%] h-full float-right \n\t\t\t\t md:flex hidden items-center justify-center\n\t\t\t"}>
				<Laptop3D width={500} height={500}/>
			</aside>

			<blockquote id="values-quote" className={"flex flex-col text-white"}>
				<h1 className={"\n\t\t\t\t ".concat(gudeaBold.className, " text-2xl\n\t\t\t\t")}><i>{"\"A website without SEO is like a car with no gas.\""}</i>
				</h1>
				<span className={"".concat(gudeaThin.className, " ml-[1rem] text-opacity-60")}><i>~ Paul Cookson</i></span>
			</blockquote>
			<p id="text-content" className={"\n\t\t\t text-white text-base\n\t\t\t text-opacity-80 whitespace-pre-wrap\n\t\t\t"}>{mission}</p>

			<blockquote id="values-quote" className={"flex flex-col text-white"}>
				<h1 className={"\n\t\t\t\t ".concat(gudeaBold.className, " text-2xl\n\t\t\t\t")}><i>{"\"Good design is obvious. Great design is transparent.\""}</i>
				</h1>
				<span className={"".concat(gudeaThin.className, " ml-[1rem] text-opacity-60")}><i>~ Joe Sparano</i></span>
			</blockquote>

			<p id="text-content" className={"\n\t\t\t text-white text-base \n\t\t\t text-opacity-80 whitespace-pre-wrap\n\t\t\t"}>{values}</p>
		</section>);
}
