import AppTitle from "@components/common/app-title/app-title";
import { bangers } from "@ui/fonts";
import Link from "next/link";
export default function LayoutFooter() {
    return (<footer id="footer" className={"\n\t\t z-layout relative\n\t\t flex flex-col items-center justify-center\n\t\t w-screen h-[20rem] p-[.5rem]\n\t\t bg-gradient-to-b\n\t\t from-zinc-900 to-zinc-950\n\t\t space-x-[3rem]\n\t\t"}>
			<section id="main-content" className={"\n\t\t\t flex items-center justify-center\n\t\t\t space-x-[3rem] h-[75%]\n\t\t\t"}>
				<AppTitle />
				<div id="divider" className={"\n\t\t\t\t w-[.25rem] h-[20%]\n\t\t\t\t rounded-xl bg-white\n\t\t\t\t bg-opacity-40\n\t\t\t\t"}/>
				<Link id="email" href={"mailto:letswork@themediamasons.com"} className={"\n\t\t\t\t text-2xl text-white flex-shrink\n\t\t\t\t ".concat(bangers.className, "\n\t\t\t\t trans-ease-all\n\t\t\t\t hover:text-purple-400\n\t\t\t\t")}>letswork@themediamasons.com</Link>
			</section>
			<span id="copyright" className={"\n\t\t\t w-full flex-shrink\n\t\t\t text-white text-opacity-40\n\t\t\t text-base font-sans\n\t\t\t"}>
			 <i>Copyright The Media Masons 2024 &copy;</i>
			</span>
		</footer>);
}
