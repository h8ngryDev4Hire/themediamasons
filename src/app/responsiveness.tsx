export default function Responsiveness() {
	return (
		<div 
		 id="responsive-modal" 
		 className={`
		 fixed w-screen h-screen
		 top-0 left-0
		 flex flex-col justify-end items-center
		 pb-[5rem]
		 z-modal
		 pointer-events-none
		`}>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-red-600
			 absolute
			 text-center text-white text-2xl
			 opacity-0
			 sm:opacity-100 md:opacity-0 lg:opacity-0 xl:opacity-0
			`}>
			SM Breakpoint
			</div>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-blue-600
			 absolute
			 text-center text-white text-2xl
			 opacity-0
			 sm:opacity-0 md:opacity-100 lg:opacity-0 xl:opacity-0
			`}>
			MD Breakpoint
			</div>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-green-600
			 absolute
			 text-center text-white text-2xl
			 opacity-0
			 sm:opacity-0 md:opacity-0 lg:opacity-100 xl:opacity-0
			`}>
			LG Breakpoint
			</div>
			<div 
			 className={`
			 w-[50%] h-[3rem]
			 rounded-full
			 bg-yellow-600
			 absolute
			 text-center text-white text-2xl
			 opacity-0
			 sm:opacity-0 md:opacity-0 lg:opacity-0 xl:opacity-100
			`}>
			XL Breakpoint
			</div>
		</div>
	)
}
