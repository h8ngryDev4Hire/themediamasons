'use client'

import { useState, useEffect } from 'react';

// Define the props for the component
interface ChatResponseProps {
  text: string;
  typingSpeed?: number;
}

export default function TextStream( { text, typingSpeed = 30 } : ChatResponseProps )  {
	const [displayResponse, setDisplayResponse] = useState<string>('');
	const [completedTyping, setCompletedTyping] = useState<boolean>(false);

	useEffect(() => {
		setCompletedTyping(false);
	    	setDisplayResponse('');
	    	let i = 0;
	
	    	const intervalId = setInterval(() => {
	      		setDisplayResponse(text.slice(0, i));
	      		i++;
	      		if (i > text.length) {
	        		clearInterval(intervalId);
	        		setCompletedTyping(true);
	      		}
	    	}, typingSpeed);
	
	    	return () => clearInterval(intervalId);
	}, [text, typingSpeed]);
	
	const CursorSVG = () => (
		<svg
	      	 viewBox="8 4 8 16"
	      	 xmlns="http://www.w3.org/2000/svg"
	      	 className="inline-block w-[1ch] animate-flicker mb-1"
	    	>
	      		<rect x="10" y="6" width="4" height="12" fill="currentColor" />
	    	</svg>
	);
	
	return (
		<div className="relative flex font-mono text-lg text-white text-center">
	      		<p>{displayResponse}</p>
	      		{!completedTyping && <CursorSVG/>}
	    	</div>
	  );
};

