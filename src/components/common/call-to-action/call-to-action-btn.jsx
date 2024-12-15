import useModal from '@hooks/useModal.ts';
import { gudeaBold } from '@ui/fonts.ts';
export default function CtaButton(_a) {
    var message = _a.message, modalId = _a.modalId, metadata = _a.metadata;
    var _b = useModal(), openModal = _b.openModal, closeModal = _b.closeModal, modalState = _b.modalState;
    var handleButtonClick = function () {
        if (modalState)
            closeModal();
        openModal({
            signature: modalId,
            disableScroll: true,
            metadata: metadata
        });
    };
    return (<button id="cta-btn" className={"\n\t\t\t w-[12rem] h-[3rem] \n\t\t\t bg-white bg-opacity-15 rounded-lg trans-ease hover:scale-[.90]\n\t\t\t text-white text-xl\n\t\t\t ".concat(gudeaBold.className, "\n\t\t ")} onClick={handleButtonClick}>
		{message}
		</button>);
}
