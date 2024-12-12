import { ServicePackage } from '@def/definitions';
import useModal from '@hooks/useModal';
import { gudeaBold } from '@ui/fonts.ts'
import { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx'

interface Props {
	selectedPlan: ServicePackage; 
}

export default function Button( { selectedPlan } : Props )  {
	const { openModal, closeModal, modalState } = useModal()

	const handleButtonClick = () => {
		if (modalState) closeModal()
			openModal({
				signature: SIGNATURE,
				disableScroll: true,
				metadata:  selectedPlan 
			})
	}

	return (
		<button 
		 id="cta-button" 
		 onClick={handleButtonClick}
		 className={`
		 trans-ease w-[10rem] h-[4rem] 
		 hover:scale-[.85] relative
		 flex flex-col items-center justify-center
		`}>
			<p 
			 id="pricing-btn" 
			 className={`
			 ${gudeaBold.className} 
			 text-center text-xl text-white
			 bg-zinc-600
			 w-full h-full rounded-xl p-1
			 z-foreground
			 flex items-center justify-center
			 hover:bg-gradient-to-tr from-orange-500 to-purple-500
			 trans-ease-all
			`}>Get Started</p>
			<span 
			 id="glow" 
			 className={`
			 absolute blur 
			 trans-ease-all
			 h-[105%] w-[105%]
			 bg-gradient-to-tr from-red-400 to-purple-800
			`}/>
		</button>
	)
}
