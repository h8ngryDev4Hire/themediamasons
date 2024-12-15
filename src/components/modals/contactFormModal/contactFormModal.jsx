'use client';
import { useState, useEffect, createContext } from 'react';
import useModal from '@hooks/useModal.ts';
import { gudeaBold } from '@ui/fonts.ts';
import CtaView from './views/ctaView/ctaView';
import SubmissionView from './views/submissionView/submissionView';
export var SIGNATURE = 'contact-modal';
var ERROR_TIMEOUT = 5000;
export var ContactFormModalContext = createContext(undefined);
export var exitModalContext = createContext(undefined);
export default function ContactFormModal(_a) {
    var metadata = _a.metadata;
    var closeModal = useModal().closeModal;
    var contactFormModalContext = {
        modal: useState(false),
        content: useState(false),
        plan: useState(metadata),
        phase: useState('contact-info'),
        error: useState(false)
    };
    var _b = contactFormModalContext.modal, formState = _b[0], setFormState = _b[1];
    var _c = contactFormModalContext.content, contentState = _c[0], setContentState = _c[1];
    var _d = contactFormModalContext.phase, phase = _d[0], setPhase = _d[1];
    var _e = contactFormModalContext.plan, plan = _e[0], setPlan = _e[1];
    var _f = contactFormModalContext.error, error = _f[0], setError = _f[1];
    var exitModal = function () {
        setContentState(false);
        setFormState(false);
        closeModal({
            timeout: 1000
        });
    };
    var registerKeystroke = function (event) {
        if (event.key === 'Escape') {
            exitModal();
        }
    };
    useEffect(function () {
        // modal intro transition
        setFormState(true);
        setTimeout(function () { setContentState(true); }, 500);
        // event listener init for `esc` key action
        window.addEventListener('keydown', registerKeystroke);
        return function () { return window.removeEventListener('keydown', registerKeystroke); };
    }, []);
    useEffect(function () {
        if (error instanceof Error) {
            var timer_1 = setTimeout(function () { return setError(false); }, ERROR_TIMEOUT);
            return function () { return clearTimeout(timer_1); };
        }
    }, [error]);
    return (<div id="contact-form-modal-wrapper" className={"\n\t\t\t ".concat(formState ? "" : "opacity-0", " trans-ease-md\n\t\t\t fixed z-modal top-0 left-0 h-full w-screen  \n\t\t\t flex items-center justify-center  \n\t\t\t bg-black bg-opacity-40\n\t\t")}>
			<ContactFormModalContext.Provider value={contactFormModalContext}>
				<exitModalContext.Provider value={exitModal}>
				<div id="contact-form-modal" className={"\n\t\t\t\t ".concat(gudeaBold.className, "\n\t\t\t\t ").concat(formState ? "md:h-[30rem] h-[40rem]" : "h-0", "\n\t\t\t\t trans-ease-all-md\n\t\t\t\t flex  md:w-[50%] w-[95vw] \n\t\t\t\t text-white rounded-xl p-[1rem]\n\t\t\t\t bg-gradient-to-bl from-zinc-800 to-zinc-900\n\t\t\t\t overflow-hidden\n\t\t\t\t")}>
				{phase === 'contact-info' && <CtaView contentState={contentState}/>}
				{phase === 'thank-you' && <SubmissionView />}
				</div>
				</exitModalContext.Provider>
			</ContactFormModalContext.Provider>
		</div>);
}
