import { gudeaBold } from "@ui/fonts";

export default function Contact() {
	return (
		<section 
		 id="contact" 
		 className={`
		 w-full h-auto
		 flex items-center justify-center
		 text-white
		 space-x-[2rem] md:space-x-[5rem]
		`}>
			<span className={`text-5xl mt-[1rem]`}>ꜜ ꜜ ꜜ</span>
			<h1 className={`${gudeaBold.className}  text-2xl`}>
			 Have a Question? Email us!
			</h1>
			<span className={`text-5xl mt-[1rem]`}>ꜜ ꜜ ꜜ</span>
		</section>
	)
}
