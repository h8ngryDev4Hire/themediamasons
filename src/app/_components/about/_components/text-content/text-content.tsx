import { AboutTextContent } from "@def/sanity";
import { bangers, gudeaBold, gudeaThin } from "@ui/fonts";

export default function TextContent({ name, description, quote }: AboutTextContent) {
	return (
		<div className="space-y-4">
			{/* Section title */}
			<h3 className={`${bangers.className} text-xl md:text-2xl font-bold text-white`}>
				{name}
			</h3>
			
			{/* Quote */}
			<blockquote className="pl-4 border-l-4 border-purple-500/50 my-4">
				<p className={`${gudeaBold.className} text-lg md:text-xl text-gray-300 italic`}>
					"{quote.text}"
				</p>
				<footer className={`${gudeaThin.className} text-sm text-gray-400 mt-2`}>
					— {quote.author}
				</footer>
			</blockquote>
			
			{/* Description */}
			<p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
				{description}
			</p>
		</div>
	)
}
