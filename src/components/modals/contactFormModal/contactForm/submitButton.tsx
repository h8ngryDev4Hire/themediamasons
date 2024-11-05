'use client'

import { bangers } from '@ui/fonts.ts'

export default function SubmitButton() {
	return (
		<button 
		 id="submit-btn" 
		 className={`${bangers.className} trans-ease h-[2.5rem] w-[8rem] rounded-xl bg-zinc-500 text-center hover:scale-[.90]`}
		 >
			Submit
		</button>
	)
}
