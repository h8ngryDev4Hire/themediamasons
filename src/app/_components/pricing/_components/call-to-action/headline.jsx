'use client';
import { useState, useEffect } from 'react';
import { gudeaThin } from '@ui/fonts.ts';
export default function Headline(_a) {
    var message = _a.message;
    var _b = useState(false), intro = _b[0], setIntro = _b[1];
    useEffect(function () { setIntro(true); }, []);
    return (<section id="pricing-heading" className={"\n\t\t\t trans-ease-all-md \n\t\t\t ".concat(intro ? "" : "-translate-y-[100%] opacity-0", "\n\t\t")}>
			<h1 id="pricing-catcher" className={"\n\t\t\t\t ".concat(gudeaThin.className, " text-white text-4xl text-center\n\t\t\t")}>
				{message}				
			</h1>
		</section>);
}
