import { gudeaBold } from '@ui/fonts.ts'

export default function Button()  {

	return (
		<button id="" className={`trans-ease w-[10rem] h-[4rem] rounded-xl bg-zinc-500 p-1 hover:scale-[.85] `}>
			<span id="pricing-btn" className={`${gudeaBold.className} text-center text-xl text-white`}>Get Started</span>
		</button>
	)
}
