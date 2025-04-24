import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'The Media Masons | Custom Web Development & Business Solutions',
	description: 'Professional web development, custom websites, and digital solutions for businesses. We craft responsive, SEO-optimized websites that drive growth and conversions.',
	keywords: [
		'web development', 
		'business websites', 
		'custom web solutions', 
		'responsive web design', 
		'professional web services', 
		'business web applications', 
		'SEO-optimized websites', 
		'website development', 
		'web application development',
		'web design services'
	],
	authors: [{ name: 'The Media Masons' }],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://themediamasons.com',
		title: 'The Media Masons | Custom Web Development & Business Solutions',
		description: 'Professional web development services and digital solutions that help businesses grow online with custom websites and web applications.',
		siteName: 'The Media Masons',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'The Media Masons - Web Development & Business Solutions'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'The Media Masons | Web Development Solutions',
		description: 'Custom websites and web applications for businesses looking to grow their online presence.',
		images: ['/twitter-image.png']
	},
	icons: {
		icon: '/favicon.png'
	}
}
