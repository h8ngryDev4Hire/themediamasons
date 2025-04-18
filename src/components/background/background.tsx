export default function Background() : JSX.Element {
	return (
		<div id="background"
		className="fixed z-background top-0 left-0 h-screen w-screen overflow-hidden">
			<div id="" className={`w-screen h-[25%] bg-gradient-to-b from-red-900  to-black`}/>
			<div id="" className={`w-screen h-[50%] bg-black`}/>
			<div id="" className={`w-screen h-[25%] bg-gradient-to-b from-black to-indigo-950`}/>
		</div>
	)	
}

	//		TODO: Add these back in once responsiveness transition is finished
