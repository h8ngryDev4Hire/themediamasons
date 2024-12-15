'use client';
import React from 'react';
export default function LoadingProgressBar() {
    return (<div id="loading-progress-bar-container" className="h-[.25rem] w-[20rem] relative m-1">
			<div id="loading-progress-bar" className={"bg-green-500 h-full w-full"}/>
		</div>);
}
