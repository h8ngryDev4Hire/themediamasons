'use client'

import React, { useEffect } from 'react'
import '@ui/globals.css'
import Background from '@components/background/background.tsx'
import useModal from '@api/hooks/useModal'
import  ContactFormModal from '@components/modals/contactFormModal/contactFormModal.tsx'
import  { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx'
import NewsletterModal, { signature } from '@components/modals/newsletterModal/newsletterModal'


interface RootLayoutProps {
	children : React.ReactNode
}


export default function RootLayout({children} : RootLayoutProps ) : JSX.Element {
	const { modalState, openModal } = useModal()

	useEffect(()=>{
		console.log('modalState: ', modalState)
	},[modalState])

	useEffect(()=>{
		setTimeout(()=> {
			openModal({ signature: signature })
		}, 2000)
	},[])


	
	return (
		<html lang="en">
			<title>The Media Masons</title>
			<body className="bg-black">
				<Background/>
				{children}
				{ modalState && modalState.name === SIGNATURE && <ContactFormModal/> }
				{ modalState && modalState.name === signature && <NewsletterModal/> }
			</body>
		</html>
	)
}


