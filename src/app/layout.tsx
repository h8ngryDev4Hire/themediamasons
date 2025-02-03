'use client'

import React, { Suspense, useEffect } from 'react'
import '@ui/globals.css'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import { Core, Sanity } from '@def/definitions'
import useModal from '@hooks/useModal'
import Background from '@components/background/background.tsx'
import  ContactFormModal from '@components/modals/contactFormModal/contactFormModal.tsx'
import  { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx'
import NewsletterModal, { signature } from '@components/modals/newsletterModal/newsletterModal'
import LayoutFooter from '@components/footer/footer'


interface RootLayoutProps {
	children : React.ReactNode
}


const Responsiveness = dynamic(() => import('./responsiveness'), { ssr: false })


function RootLayout({children} : RootLayoutProps ) : JSX.Element {
	const { modalState, openModal } = useModal()
	const searchParams = useSearchParams()

	
	useEffect(()=> {
		const signature  = searchParams.get('modal') as Core.ModalIdentifier

			switch(signature) {
				case 'contact-modal': {
					openModal({
						signature: signature,
						disableScroll: true,
						metadata: 'url'
					})
					break;
				}
				case 'newsletter-modal': {
					break;
				}
				default: {
					break;
				}
			}
	},[searchParams])

	return (
		<>
				<Background/>
				<main className="overflow-x-hidden">
				{children}
				</main>
				{ modalState && modalState.name === SIGNATURE && 
					<ContactFormModal 
					 metadata={modalState.metadata as Sanity.ServicePackage}
					/> }
				{ modalState && modalState.name === signature && <NewsletterModal/> }
				<LayoutFooter/>
		</>
	)
}


// For compliance with useSearchParams() hook
export default function Layout({ children } : RootLayoutProps) {
	return (
		<html lang="en">
			<head>
			<Script
			 src="https://www.googletagmanager.com/gtag/js?id=G-L8M6Z41GM3"
			 strategy="afterInteractive"
			/>
			<Script id="google-analytics">{`
  			 window.dataLayer = window.dataLayer || [];
  			 function gtag(){dataLayer.push(arguments);}
  			 gtag('js', new Date());

  			 gtag('config', 'G-L8M6Z41GM3');
			`}</Script>
			</head>
			<title>The Media Masons</title>
			<body className="bg-black max-w-full overflow-x-hidden overscroll-none">
			<Suspense>
			<RootLayout>
			{children}
			</RootLayout>
			</Suspense>
			</body>
		</html>
	) 
}
