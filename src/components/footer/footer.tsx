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
			 flex items-center justify-center
			 space-x-[3rem] h-[75%]
			`}>
				<AppTitle/>
				<div 
				 id="divider" 
				 className={`
				 w-[.25rem] h-[20%]
				 rounded-xl bg-white
				 bg-opacity-40
				`}/>
				<Link 
				 id="email" 
				 href={"mailto:letswork@themediamasons.com"}
				 className={`
				 text-2xl text-white flex-shrink
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
			 text-base font-sans
			`}>
			 <i>Copyright The Media Masons 2024 &copy;</i>
			</span>
		</footer>
	)
}