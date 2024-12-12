'use client'

import { useEffect, useState } from "react"

export default function ProgressBar(){
	const [ progress, setProgress ] = useState<number>(0)

	const calculateScrollToProgress = () => {
		const height = document.documentElement.scrollHeight - window.innerHeight
		const scroll = window.scrollY
		const percentage = ( scroll / height ) * 100

		setProgress(percentage)
	}

	useEffect(()=>{
		// Initial call to properly populate 
		// progress bar
		calculateScrollToProgress()

		window.addEventListener('scroll', calculateScrollToProgress)

		return () => window.removeEventListener('scroll', calculateScrollToProgress)
	},[])

	return (
		<div 
		 id="progress-bar" 
		 className={`
		 relative w-screen h-[.5rem]
		`}>
			<div 
			 id="progress" 
			 style={{ width: `${progress}%` }}
			 className={`
			 absolute left-0
			 bg-gradient-to-r from-purple-500 to-orange-400
			 h-[50%]
			`}/>
			<div 
			 id="progress" 
			 style={{ width: `${progress}%` }}
			 className={`
			 absolute left-0 blur
			 bg-gradient-to-r from-purple-500 to-orange-400
			 h-full
			`}/>
		</div>
	)
}
