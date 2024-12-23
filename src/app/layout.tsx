'use client'

import React from 'react'
import '@ui/globals.css'
import Background from '@components/background/background.tsx'
import useModal from '@hooks/useModal'
import  ContactFormModal from '@components/modals/contactFormModal/contactFormModal.tsx'
import  { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx'
import NewsletterModal, { signature } from '@components/modals/newsletterModal/newsletterModal'
import LayoutFooter from '@components/footer/footer'
import { ServicePackage } from '@def/definitions'
import dynamic from 'next/dynamic'


interface RootLayoutProps {
	children : React.ReactNode
}


const Responsiveness = dynamic(() => import('./responsiveness'), { ssr: false })


export default function RootLayout({children} : RootLayoutProps ) : JSX.Element {
	const { modalState, openModal } = useModal()



	return (
		<html lang="en">
			<title>The Media Masons</title>
			<body className="bg-black max-w-screen overflow-x-hidden overscroll-y-contain">
				<Background/>
				{children}
				{ modalState && modalState.name === SIGNATURE && 
				<ContactFormModal metadata={modalState.metadata as ServicePackage}/> }
				{ modalState && modalState.name === signature && <NewsletterModal/> }
				<LayoutFooter/>
			</body>
		</html>
	)
}


