import { bangers } from '@ui/fonts.ts';
import { useContext } from 'react';
import { ContactFormModalContext, exitModalContext } from '../../contactFormModal';
import ContactCta from './contactCta';
import ContactForm from './contactForm/contactForm';
export default function CtaView(_a) {
    var contentState = _a.contentState;
    var modalError = useContext(ContactFormModalContext).error;
    var error = modalError[0], setError = modalError[1];
    var exitModal = useContext(exitModalContext);
    return (<div id="contact-form-content" className={"\n\t\t trans-ease ".concat(contentState ? "" : "opacity-0", " \n\t\t flex flex-col flex-grow mb-[1rem]\n\t\t")}>
			<section id="modal-title-section" className={"\n\t\t\t flex justify-between  w-full p-2\n\t\t\t"}>  
				<h2 id="modal-title" className={"".concat(bangers.className, " text-3xl")}>Let&apos;s Get In Touch!
				</h2>

				<button id="exit-modal-btn" className={"size-fit flex items-center justify-center"} onClick={exitModal}>
					<span className={"\n\t\t\t\t\t trans-ease hover:text-red-400 \n\t\t\t\t\t text-center font-[1000] text-3xl\n\t\t\t\t\t"}>
					 &times;
					</span>
				</button>
			</section>
			<section id="content-section" className={"\n\t\t\t flex md:flex-row flex-col flex-grow \n\t\t\t space-x-[1rem] mb-[1rem] \n\t\t\t items-center justify-center\n\t\t\t"}>
				<section id="cta-section" className={"\n\t\t\t\t md:h-full h-[50%] w-full \n\t\t\t\t space-y-[1rem] p-[1rem]\n\t\t\t\t"}>
					<ContactCta />
				</section>

				<span id="content-divider" className={"\n\t\t\t\t flex md:h-[75%] h-[.5rem] md:w-[.5rem] w-[75%] md:mb-[2rem] \n\t\t\t\t bg-white bg-opacity-10 rounded-xl\n\t\t\t\t"}/>

				<section id="contact-form-section" className={"\n\t\t\t\t flex flex-col h-full md:p-[2rem] items-center justify-center flex-grow\n\t\t\t\t"}>
					<span id="error-box" className="h-[1rem] -translate-y-[1rem] text-red-300">
						{error instanceof Error && error.message}
					</span>
					<ContactForm />
				</section>
			</section>
		</div>);
}
