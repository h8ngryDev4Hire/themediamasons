import AppTitle from "@components/common/app-title/app-title";
import { bangers } from "@ui/fonts";
import Link from "next/link";

export default function LayoutFooter() {
	return (
		<footer 
		 id="footer" 
		 className={`
		 z-layout relative
		 flex flex-col items-center justify-center
		 w-screen h-[20rem] p-[.5rem]
		 bg-gradient-to-b
		 from-zinc-900 to-zinc-950
		 space-x-[3rem]
		`}>
			<section 
			 id="main-content" 
			 className={`
			 flex 
			 max-sm:flex-col
			 items-center justify-center
			 max-sm:space-x-0 space-x-[3rem] 
			 max-sm:space-y-[1rem] space-y-0
			 h-[75%]
			`}>
				<AppTitle/>
				<div 
				 id="divider" 
				 className={`
				 max-sm:w-[80%] w-[.25rem] 
				 max-sm:h-[.25rem] h-[20%]
				 rounded-xl bg-white
				 bg-opacity-40
				`}/>
				<Link 
				 id="email" 
				 href={"mailto:letswork@themediamasons.com"}
				 className={`
				 max-sm:text-xl text-2xl 
				 text-white flex-shrink
				 ${bangers.className}
				 trans-ease-all
				 hover:text-purple-400
				`}>letswork@themediamasons.com</Link>
			</section>
			<span 
			 id="copyright" 
			 className={`
			 w-full flex-shrink
			 text-white text-opacity-40
			 max-sm:text-sm text-base 
			 font-sans
			`}>
			 <i>Copyright The Media Masons 2024 &copy;</i>
			</span>
		</footer>
	)
}
