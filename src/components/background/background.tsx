export default function Background() : JSX.Element {
	return (
		<div id="background"
		className="fixed z-background top-0 left-0 h-screen w-screen">
			<div id="" className="w-full h-[25%] bg-gradient-to-b from-red-950 to-black"/>
			<div id="" className="w-full h-[50%] bg-black"/>
			<div id="" className="w-full h-[25%] bg-gradient-to-b from-black to-indigo-950"/>
		</div>
	)	
}
