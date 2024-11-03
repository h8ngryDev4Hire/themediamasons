import { gudeaThin } from '@ui/fonts.ts'

interface ContentBlockProps {
	title: string
	description: string
	media: JSX.Element
	reverse?: boolean
}

export default function ContentBlock({ title, description, media, reverse=false } : ContentBlockProps ) : JSX.Element {
	return (
		<div 
		 id="content-block" 
		 className={`
			flex  flex-col md:space-x-5 space-y-5
			${ reverse ? "md:flex-row-reverse" : "md:flex-row " } w-full   p-3
		`}>
			<section 
			 id="text-content" 
			 className="trans-ease-all bg-white bg-opacity-10 rounded-lg p-10 space-y-5"
			>
				<h2 
				 id="content-title" 
				 className={`${gudeaThin.className} text-white text-2xl`}
				>
				{title}
				</h2>
				<p 
				 id="content-description" 
				 className="text-white text-[1rem] leading-[2rem]"
				>
				{description}
				</p>
			</section>	
			<section 
			 id="media-content" 
			 className="flex items-center justify-center"
			>
				{media}
			</section>
		</div>
	)
}
