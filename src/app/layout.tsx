'use client'

import React from 'react'
import '@ui/globals.css'
import Background from '@components/background/background.tsx'
import useModal from '@api/hooks/useModal'
import ContactFormModal from '@components/contactFormModal/contactFormModal.tsx'


interface RootLayoutProps {
	children : React.ReactNode
}


export default function RootLayout({children} : RootLayoutProps ) : JSX.Element {
	const { modalState } = useModal()

	
	return (
		<html lang="en">
			<title>The Media Masons</title>
			<body className="bg-black">
				<Background/>
				{children}
				{ modalState && <ContactFormModal/> }
			</body>
		</html>
	)
}


