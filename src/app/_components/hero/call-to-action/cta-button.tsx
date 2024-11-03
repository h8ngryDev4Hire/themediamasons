
import useModal from '@api/hooks/useModal.ts'
import { gudeaBold } from '@ui/fonts.ts'


interface Props {
	message : string
}

export default function CtaButton({ message } : Props ) {
	const { openModal } = useModal()	

	return (
		<button 
		 id="cta-btn" 
		 className={`
			 w-[12rem] h-[3rem] 
			 bg-white bg-opacity-15 rounded-lg trans-ease hover:scale-[.90]
			 text-white text-xl
			 ${gudeaBold.className}
		 `}
		 onClick={openModal}
		>
		{message}
		</button>
	)
}
