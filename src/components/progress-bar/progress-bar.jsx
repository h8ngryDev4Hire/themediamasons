'use client';
import { useEffect, useState } from "react";
export default function ProgressBar() {
    var _a = useState(0), progress = _a[0], setProgress = _a[1];
    var calculateScrollToProgress = function () {
        var height = document.documentElement.scrollHeight - window.innerHeight;
        var scroll = window.scrollY;
        var percentage = (scroll / height) * 100;
        setProgress(percentage);
    };
    useEffect(function () {
        // Initial call to properly populate 
        // progress bar
        calculateScrollToProgress();
        window.addEventListener('scroll', calculateScrollToProgress);
        return function () { return window.removeEventListener('scroll', calculateScrollToProgress); };
    }, []);
    return (<div id="progress-bar" className={"\n\t\t relative w-screen h-[.5rem]\n\t\t"}>
			<div id="progress" style={{ width: "".concat(progress, "%") }} className={"\n\t\t\t absolute left-0\n\t\t\t bg-gradient-to-r from-purple-500 to-orange-400\n\t\t\t h-[50%]\n\t\t\t"}/>
			<div id="progress" style={{ width: "".concat(progress, "%") }} className={"\n\t\t\t absolute left-0 blur\n\t\t\t bg-gradient-to-r from-purple-500 to-orange-400\n\t\t\t h-full\n\t\t\t"}/>
		</div>);
}
