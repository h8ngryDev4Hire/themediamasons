'use client';
import React from 'react';
import '@ui/globals.css';
import Background from '@components/background/background.tsx';
import useModal from '@hooks/useModal';
import ContactFormModal from '@components/modals/contactFormModal/contactFormModal.tsx';
import { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx';
import NewsletterModal, { signature } from '@components/modals/newsletterModal/newsletterModal';
import LayoutFooter from '@components/footer/footer';
export default function RootLayout(_a) {
    var children = _a.children;
    var _b = useModal(), modalState = _b.modalState, openModal = _b.openModal;
    //	useEffect(()=>{
    //		setTimeout(()=> {
    //			openModal({ signature: signature })
    //		}, 2000)
    //	},[])
    return (<html lang="en">
			<title>The Media Masons</title>
			<body className="bg-black max-w-screen overflow-x-hidden">
				<Background />
				{children}
				{modalState && modalState.name === SIGNATURE &&
            <ContactFormModal metadata={modalState.metadata}/>}
				{modalState && modalState.name === signature && <NewsletterModal />}
				<LayoutFooter />
			</body>
		</html>);
}
