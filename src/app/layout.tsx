'use client'

import React, { Suspense, useEffect, useState } from 'react'
import '@ui/globals.css'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import { Core, Sanity } from '@def/definitions'
import useModal from '@hooks/useModal'
import Background from '@components/background/background.tsx'
import ContactFormModal from '@components/modals/contactFormModal/contactFormModal.tsx'
import { SIGNATURE } from '@components/modals/contactFormModal/contactFormModal.tsx'
import NewsletterModal, { signature } from '@components/modals/newsletterModal/newsletterModal'
import ServiceDetailsModal, { SIGNATURE as SERVICE_DETAILS_SIGNATURE } from '@components/modals/serviceDetailsModal/serviceDetailsModal'
import LayoutFooter from '@components/footer/footer'
import LoadingProgressBar from '@components/loading/progress-bar.tsx'

// Metadata is exported from metadata.ts for improved SEO
// No need to declare it here as Next.js will use the metadata.ts file

interface RootLayoutProps {
	children : React.ReactNode
}

const Responsiveness = dynamic(() => import('./responsiveness'), { ssr: false })

function RootLayout({children} : RootLayoutProps ) : JSX.Element {
	const { modalState, openModal } = useModal()
	const searchParams = useSearchParams()
	const [isLoading, setIsLoading] = useState(true)

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
				case 'service-details-modal': {
					openModal({
						signature: signature,
						disableScroll: true,
						metadata: searchParams.get('metadata')
					})
					break;
				}
				default: {
					break;
				}
			}
	},[searchParams])

	return (
		<>
			{isLoading && <LoadingProgressBar onLoadingComplete={() => setIsLoading(false)} />}
			<Background/>
			<main className="overflow-x-hidden">
			{children}
			</main>
			{ modalState && modalState.name === SIGNATURE && 
				<ContactFormModal 
				 metadata={modalState.metadata as Sanity.ServicePackage}
				/> }
			{ modalState && modalState.name === signature && <NewsletterModal/> }
			{ modalState && modalState.name === SERVICE_DETAILS_SIGNATURE && 
				<ServiceDetailsModal 
					metadata={modalState.metadata}
				/> }
			<LayoutFooter/>
		</>
	)
}

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
			
			{/* JSON-LD structured data for SEO */}
			<Script id="schema-structured-data" type="application/ld+json">{`
				{
					"@context": "https://schema.org",
					"@type": "ProfessionalService",
					"name": "The Media Masons",
					"description": "Professional web development and digital solutions for businesses. We build custom websites and web applications that drive growth.",
					"url": "https://themediamasons.com",
					"logo": "https://themediamasons.com/logo.png",
					"sameAs": [
						"https://twitter.com/themediamasons",
						"https://www.linkedin.com/company/the-media-masons"
					],
					"address": {
						"@type": "PostalAddress",
						"addressCountry": "US"
					},
					"priceRange": "$$",
					"service": [
						{
							"@type": "Service",
							"name": "Website Development",
							"description": "Custom, responsive websites built with modern technologies that load fast and convert visitors into customers."
						},
						{
							"@type": "Service",
							"name": "Web Application Development",
							"description": "Powerful, scalable web applications with robust functionality that solve complex business problems."
						},
						{
							"@type": "Service",
							"name": "Web Design",
							"description": "Beautiful, intuitive designs that captivate your audience and prioritize user experience."
						}
					]
				}
			`}</Script>
			</head>
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
