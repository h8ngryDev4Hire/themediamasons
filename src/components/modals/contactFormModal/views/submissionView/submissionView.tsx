import { bangers, gudeaBold } from "@ui/fonts";
import Image from "next/image";
import { useContext } from "react";
import { ContactFormModalContext, exitModalContext } from "../../contactFormModal";


export default function SubmissionView() {
	const { content } = useContext(ContactFormModalContext)
	const [ contentState, setContentState ] = content

	const exitModal = useContext(exitModalContext)

	return (
		<div 
		 id="submission-view" 
		 className={`
		 flex flex-col items-center justify-start
		 w-full h-full p-[2rem]
		 space-y-[2rem] trans-ease-all
		 ${contentState ? "" : "opacity-0"}
		`}>
			<h1 
			 id="title" 
			 className={`
			 w-full h-[3rem] 
			 text-3xl text-start
			 ${bangers.className}
			`}>
			 {`Thank you!`}
			</h1>
			<section 
			 id="logo" 
			 className={`
			 w-[30%] h-[30%]
			 flex items-center justify-center
			`}>
				<Image
				 width={50}
				 height={50}
				 src={"/svg/smiling-macintosh.svg"}
				 alt={""}
				 className={`
				 opacity-80 w-full h-full
				`}/>
			</section>
			<span 
			 id="message" 
			 className={`
			 ${gudeaBold.className} 
			 text-xl text-center w-[50%]
			`}>{`
				We will be in contact with you shortly!
				In the meantime, check out the services 
				we offer!
			`}</span>
			<button 
			 id="finish-btn"
			 onClick={exitModal}
			 className={`
			 h-[4rem] w-[8rem] 
			 rounded-xl p-1
			 bg-zinc-600 text-2xl
			 trans-ease-all
			 ${bangers.className}
			 hover:bg-orange-400
			 hover:scale-75
			`}>
				Finish
			</button>
		</div>
	)
}
