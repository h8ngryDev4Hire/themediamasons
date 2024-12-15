import { useContext } from 'react';
import Link from 'next/link';
import { gudeaBold } from '@ui/fonts.ts';
import { NavigatorContext } from './navigator.tsx';
export default function NavBtn(_a) {
    var name = _a.name, href = _a.href;
    var isFloating = useContext(NavigatorContext)[0];
    return (<button id="navigator-btn" className="h-full w-[6rem] p-[0.4rem]">

			<Link href={href}>
			<span id="" className={"\n\t\t\t\t".concat(gudeaBold.className, " \n\t\t\t  \t").concat(isFloating
            ? "bg-opacity-30 md:scale-125 scale-100 hover:text-purple-300"
            : "bg-opacity-100 hover:text-red-400", "\n\t\t\t  \ttrans-ease-all bg-zinc-800 block h-full w-full content-center rounded-md \n\t\t\t  \ttext-base text-white  hover:scale-[.90] text-center")}>
				{name}	
			</span>

		</Link>
		</button>);
}
