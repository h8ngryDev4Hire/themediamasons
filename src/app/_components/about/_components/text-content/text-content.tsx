import { AboutTextContent, AboutTextContentArray } from "@def/sanity";
import { gudeaBold, gudeaThin } from "@ui/fonts";


export default function TextContent({ name, description, quote } : AboutTextContent) {
	return (

			<>
			<blockquote 
			 id={`${name.toLowerCase}-quote`}
			 className={`
			 flex flex-col text-white
       			 text-center md:text-left
			`}>
				<h1 
				 className={`
				 ${gudeaBold.className} text-2xl
				`}><i>{`"${quote.text}"`}</i>
				</h1>
				<span 
				 className={`
				 ${gudeaThin.className} ml-[1rem] text-opacity-60
				`}><i>{`~ ${quote.author}`}</i></span>
			</blockquote>

			<p 
			 id="text-content" 
			 className={`
       			 text-white 
			 text-sm sm:text-[1.1rem]
			 text-opacity-80 whitespace-pre-wrap
			 leading-normal
      			 text-left indent-8
			`}>{description}</p>
		</>
	)
}
