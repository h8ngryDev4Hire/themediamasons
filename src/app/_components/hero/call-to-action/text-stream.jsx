'use client';
import { useState, useEffect } from 'react';
export default function TextStream(_a) {
    var text = _a.text, _b = _a.typingSpeed, typingSpeed = _b === void 0 ? 30 : _b;
    var _c = useState(''), displayResponse = _c[0], setDisplayResponse = _c[1];
    var _d = useState(false), completedTyping = _d[0], setCompletedTyping = _d[1];
    useEffect(function () {
        setCompletedTyping(false);
        setDisplayResponse('');
        var i = 0;
        var intervalId = setInterval(function () {
            setDisplayResponse(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(intervalId);
                setCompletedTyping(true);
            }
        }, typingSpeed);
        return function () { return clearInterval(intervalId); };
    }, [text, typingSpeed]);
    var CursorSVG = function () { return (<svg viewBox="8 4 8 16" xmlns="http://www.w3.org/2000/svg" className="inline-block w-[1ch] animate-flicker mb-1">
	      		<rect x="10" y="6" width="4" height="12" fill="currentColor"/>
	    	</svg>); };
    return (<div className="relative flex font-mono text-lg text-white text-center">
	      		<p>{displayResponse}</p>
	      		{!completedTyping && <CursorSVG />}
	    	</div>);
}
;
