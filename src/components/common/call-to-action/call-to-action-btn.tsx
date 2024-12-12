import useModal from '@hooks/useModal.ts'
import { gudeaBold } from '@ui/fonts.ts'


interface Props {
	message : string,
	modalId: string,
	metadata?: any
}

export default function CtaButton({ message, modalId, metadata } : Props ) {
	const { openModal, closeModal, modalState } = useModal()	

	const handleButtonClick = () => {
		if (modalState) closeModal()
			openModal({ 
				signature: modalId,
				disableScroll: true,
				metadata: metadata
			})
	}

	return (
		<button 
		 id="cta-btn" 
		 className={`
			 w-[12rem] h-[3rem] 
			 bg-white bg-opacity-15 rounded-lg trans-ease hover:scale-[.90]
			 text-white text-xl
			 ${gudeaBold.className}
		 `}
		 onClick={ handleButtonClick }
		>
		{message}
		</button>
	)
}
