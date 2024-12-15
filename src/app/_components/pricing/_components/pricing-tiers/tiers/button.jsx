import useModal from '@hooks/useModal';
import { gudeaBold } from '@ui/fonts.ts';
import { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx';
export default function Button(_a) {
    var selectedPlan = _a.selectedPlan;
    var _b = useModal(), openModal = _b.openModal, closeModal = _b.closeModal, modalState = _b.modalState;
    var handleButtonClick = function () {
        if (modalState)
            closeModal();
        openModal({
            signature: SIGNATURE,
            disableScroll: true,
            metadata: selectedPlan
        });
    };
    return (<button id="cta-button" onClick={handleButtonClick} className={"\n\t\t trans-ease w-[10rem] h-[4rem] \n\t\t hover:scale-[.85] relative\n\t\t flex flex-col items-center justify-center\n\t\t"}>
			<p id="pricing-btn" className={"\n\t\t\t ".concat(gudeaBold.className, " \n\t\t\t text-center text-xl text-white\n\t\t\t bg-zinc-600\n\t\t\t w-full h-full rounded-xl p-1\n\t\t\t z-foreground\n\t\t\t flex items-center justify-center\n\t\t\t hover:bg-gradient-to-tr from-orange-500 to-purple-500\n\t\t\t trans-ease-all\n\t\t\t")}>Get Started</p>
			<span id="glow" className={"\n\t\t\t absolute blur \n\t\t\t trans-ease-all\n\t\t\t h-[105%] w-[105%]\n\t\t\t bg-gradient-to-tr from-red-400 to-purple-800\n\t\t\t"}/>
		</button>);
}
