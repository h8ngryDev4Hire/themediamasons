import ThreeObject from "@components/three/cube";
import { gudeaBold } from "@ui/fonts";

export default function TextContent() {
	const latin = `
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique
		sapien ac erat tincidunt, sit amet dignissim lectus vulputate. Donec id
	 	iaculis velit. Aliquam vel malesuada erat. Praesent non magna ac massa
		aliquet tincidunt vel in massa. Phasellus feugiat est vel leo finibus
		congue.   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique
	 	sapien ac erat tincidunt, sit amet dignissim lectus vulputate. Donec id
		iaculis velit. Aliquam vel malesuada erat. Praesent non magna ac massa
		aliquet tincidunt vel in massa. Phasellus feugiat est vel leo finibus
		congue.
	`

	return (
		<section id="text-content" className={`space-y-[2rem]`}>
			<aside 
			 id="subject" 
			 className={`
				 w-[50%] h-full float-right 
				 md:flex hidden items-center justify-center
			`}>
				<ThreeObject/>	
			</aside>

			<h1 id="mission" className={`${gudeaBold.className} text-white text-3xl`}>Our Mission</h1>
			<p id="text-content" className={`text-white text-base text-opacity-80`}>{latin}</p>
			<h1 id="values" className={`${gudeaBold.className} text-white text-3xl`}>Our Values</h1>
			<p id="text-content" className={`text-white text-base text-opacity-80`}>{latin}</p>
		</section>
	)
}
