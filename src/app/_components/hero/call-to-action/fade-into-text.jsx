'use client';
import { useState, useEffect } from 'react';
import { gudeaBold } from '@ui/fonts.ts';
export default function FadeIntoText(_a) {
    var text = _a.text;
    var _b = useState(false), displayed = _b[0], setDisplay = _b[1];
    useEffect(function () {
        setDisplay(true);
    }, []);
    return (<h2 id="fade-into-text" className={"".concat(gudeaBold.className, " \n\t\t\t\t transform transition-all duration-1000 ease-in-out \n\t\t\t\t ").concat(displayed ? "opacity-100 -translate-y-[0%]" : "opacity-0 -translate-y-[100%]", " \n\t\t\t\t text-white text-opacity-70 md:text-3xl text-2xl font-mono")}>
			 {text}
			</h2>);
}
