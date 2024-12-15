'use client';
import { bangers, gudeaThin } from "@ui/fonts";
import NewsletterInvite from "./newsletterInvite";
import useModal from "@hooks/useModal";
import { useEffect, useState } from "react";
export var signature = 'newsletter-modal';
export default function NewsletterModal() {
    var message = "\n\t\tNeed constant Updates / Insights / Tips about the Web Development Industry?\n\t\tSign up today to join our emailing list!\n\t";
    var closeModal = useModal().closeModal;
    var _a = useState(false), newsletterModalState = _a[0], setNewsletterModalState = _a[1];
    var exitModal = function () {
        setNewsletterModalState(false);
        closeModal({ timeout: 1000 });
    };
    useEffect(function () {
        setNewsletterModalState(true);
    }, []);
    return (<div id="newsletter-modal-wrapper" className={"\n\t\t\tfixed z-modal bottom-0 left-0 h-full w-screen\n\t\t\tflex justify-center pointer-events-none\n\t\t"}>
			<div id="newsletter-invite" className={"\n\t\t\t\t h-[20rem] w-full mt-auto relative\n\t\t\t\t flex items-center justify-center\n\t\t\t\t trans-ease-all-md\n\t\t\t\t ".concat(newsletterModalState ? "translate-y-0" : "translate-y-[100%]", "\n\t\t\t")}>
				<div id="newsletter-content" className={"\n\t\t\t\t\th-[8rem] md:w-[50vw] w-[80vw] rounded-lg bg-zinc-600 bg-opacity-95\n\t\t\t\t\tflex items-center justify-center\n\t\t\t\t\tp-[1rem] pointer-events-auto\n\t\t\t\t"}>
					<section id="text-content" className={"\n\t\t\t\t\t\ttext-white\n\t\t\t\t\t\tmd:w-[60%] w-[50%]\n\t\t\t\t\t"}>
						<h1 id="title" className={"".concat(bangers.className, "  text-2xl")}>Join Our Newsletter!</h1>
						<p className={"".concat(gudeaThin.className, " text-opacity-75 md:text-base text-[1rem]")}>{message}</p>
					</section>

					<section id="invite" className={"\n\t\t\t\t\t\t md:w-[35%] w-[45%]\n\t\t\t\t\t\t flex justify-center items-center\n\t\t\t\t\t"}>
						<NewsletterInvite />
					</section>
					<section id="exit" className={"\n\t\t\t\t\t\t flex ml-auto mb-auto w-auto\n\t\t\t\t\t\t text-3xl text-white text-opacity-75 font-extrabold\n\t\t\t\t\t\t trans-ease hover:text-red-300 hover:text-opacity-100\n\t\t\t\t\t"}>
						<button id="exit-btn" onClick={exitModal}>&times;
						 </button>
					</section>

				</div>	
			</div>
		</div>);
}
