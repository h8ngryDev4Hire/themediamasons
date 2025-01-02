'use client'

import { GenericCallback } from '@def/definitions';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';


interface CloseModalOptions {
	timeout? : number
	callbackFn?: GenericCallback 
}

interface OpenModalOptions {
	signature: string
	disableScroll?: boolean,
	metadata?: any
}

interface ModalState {
	name: string;	
	metadata?: string
}

const OPEN_MODAL_EVENT = 'openContactForm';
const CLOSE_MODAL_EVENT = 'closeContactForm';

export default function useModal() {
	const [modalState, setModalState] = useState<false|ModalState>(false);

	const router = useRouter()

  	const openModal = useCallback(( options : OpenModalOptions ) => {
  			window.dispatchEvent(new CustomEvent(OPEN_MODAL_EVENT, { 
				detail: { options } 
			}));
  	}, []);

  	const closeModal = useCallback(
		(  options? : CloseModalOptions ) => 
	{
		if (typeof options !== 'undefined') {
			if ( typeof options.callbackFn === 'function' ) options.callbackFn()

  	  		window.dispatchEvent(new CustomEvent(CLOSE_MODAL_EVENT, { 
				detail: { options } 
			}));
		} else {
  	  		window.dispatchEvent(new CustomEvent(CLOSE_MODAL_EVENT));
		}
  	}, []);



  	const openHandler = (event : CustomEvent) => {
		const options = event.detail.options

		const payload : ModalState = { 
			name: options.signature, 
			metadata: options?.metadata
		}

		setModalState(payload)

		if (typeof document !== 'undefined' && options?.disableScroll) document.body.style.overflowY = "hidden"
	}

    	const closeHandler = ( event : CustomEvent ) => {
		const options = event.detail?.options

		if (options && options.timeout) {
			console.log('options supplied: ', options)
			const timer = options.timeout
			setTimeout(() => { setModalState(false) }, timer )
		} else {
			setModalState(false)
		}

		const url = location.href.replace(/(\?|&)modal=[^&]+(&|$)/, '')
		router.push(url)

		if (typeof document !== 'undefined') document.body.style.overflowY = "auto"
	}

  	useEffect(() => {


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
