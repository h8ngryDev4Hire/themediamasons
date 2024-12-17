import { useContext } from 'react'
import Link from 'next/link'
import { gudeaBold } from '@ui/fonts.ts'
import { NavigatorContext } from './navigator.tsx'

interface Params  {
	name : string;
	href : string
}



export default function NavBtn({ name, href } : Params ) : JSX.Element {
	const [ isFloating ] = useContext(NavigatorContext)



	return (
		<button 
		 id="navigator-btn" 
		 className={`
		 h-full 
		 w-[6rem] 
		 ${ isFloating ? "p-[0.2rem]" : "p-[0.4rem]" }
		`}>

			<Link href={href}>
			<span 
			 id="" 
			 className={`
				${gudeaBold.className} 
			  	${ isFloating 
				  	? "bg-opacity-30 md:scale-125 scale-100 hover:text-purple-300" 
				  	: "bg-opacity-100 hover:text-red-400" 
			  	}
			  	trans-ease-all bg-zinc-800 block h-full w-full content-center rounded-md 
			  	text-base text-white  hover:scale-[.90] text-center`
			}>
				{name}	
			</span>

		</Link>
		</button>
	)
}
