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
		 flex
		 bg-zinc-800
		 rounded-xl 
		 items-center justify-center
		 group
		 text-white
		 trans-ease-all
		 ${ isFloating 
			  ? "bg-opacity-30 md:scale-125 scale-100 hover:text-purple-400 hover:scale-[.90]" 
			  : "bg-opacity-100 hover:text-orange-400 hover:scale-[.90]" 
		 }
		 ${ isFloating ? "p-[0.2rem]" : "p-[0.4rem]" }
		`}>

			<Link 
			 href={href}
			 className={`
			 w-full 
			 ${gudeaBold.className} 
			 trans-ease-all  
			 text-base    
			 text-center
			`}>
			{name}	
			</Link>
		</button>
	)
}
