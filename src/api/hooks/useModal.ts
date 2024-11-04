'use client'

import { useState, useEffect, useCallback } from 'react';

const OPEN_MODAL_EVENT = 'openContactForm';
const CLOSE_MODAL_EVENT = 'closeContactForm';

export default function useModal() {
	const [modalState, setIsModalOpen] = useState(false);

  	const openModal = useCallback(() => {
  		window.dispatchEvent(new CustomEvent(OPEN_MODAL_EVENT));
  	}, []);

  	const closeModal = useCallback(() => {
  	  	window.dispatchEvent(new CustomEvent(CLOSE_MODAL_EVENT));
  	}, []);

  	useEffect(() => {
  	  	const openHandler = () => {
			setIsModalOpen(true);
			//if (document) document.body.style.overflow = "hidden"
		}
  	  	const closeHandler = () => {
			setIsModalOpen(false);
			//if (document) document.body.style.overflow = "auto"
		}

  	  	window.addEventListener(OPEN_MODAL_EVENT, openHandler);
  	  	window.addEventListener(CLOSE_MODAL_EVENT, closeHandler);

  	  	return () => {
  	    		window.removeEventListener(OPEN_MODAL_EVENT, openHandler);
  	    		window.removeEventListener(CLOSE_MODAL_EVENT, closeHandler);
  	  	};
  	}, []);

  	return {
  		modalState,
		openModal,
  	  	closeModal,
  	};
}
