import Image from 'next/image'
import { bangers, gudeaThin } from '@ui/fonts.ts'

interface Params {
	name: string;
	desc: string;
	imgSrc: string;
}

export default function ServiceBlock({ name, desc, imgSrc }: Params) {
	return (
		<div className="flex flex-col items-center">
			{/* Service icon */}
			<div className="mb-4 flex justify-center">
				<div className="relative w-24 h-24 flex items-center justify-center">
					<Image
						src={imgSrc}
						width={96}
						height={96}
						alt={`${name} service icon`}
						className="object-contain"
					/>
				</div>
			</div>
			
			{/* Service title */}
			<h3 className={`
				${bangers.className}
				text-xl md:text-2xl 
				text-center mb-3
				text-white
			`}>
				{name}
			</h3>
			
			{/* Service description */}
			<p className={`
				${gudeaThin.className}
				text-gray-300
				text-center
				text-base
				leading-relaxed
			`}>
				{desc}
			</p>
		</div>
	)
}
