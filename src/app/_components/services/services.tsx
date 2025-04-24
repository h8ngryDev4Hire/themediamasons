'use client'

import React, { useEffect, useState } from 'react'
import { bangers } from '@ui/fonts'
import { useReveal } from '@lib/hooks/useReveal'
import { Globe, Code, Paintbrush, Wrench } from 'lucide-react'
import ServiceBlock from './service-block'
import { Sanity } from '@def/definitions'
import { LucideIcon } from 'lucide-react'
import { servicesQuery } from '@lib/queries/standard'
import sanityQuery from '@lib/queries/util'

type ServiceData = {
	name: string;
	description: {
		short: string;
		long: string;
	};
	dataPoints: string[];
	iconType: 'lucide' | 'custom';
	lucideIcon?: string | null;
	customIconUrl?: string | null;
	Icon?: LucideIcon; // For backward compatibility during transition
}

export default function Services() {
	const [sectionRef, revealed] = useReveal({
		threshold: 0.1
	})
	const [services, setServices] = useState<ServiceData[]>([])
	const [loading, setLoading] = useState(true)

	// Fetch services from Sanity
	useEffect(() => {
		const fetchServices = async () => {
			try {
				// Fetch services from Sanity
				const { data, error } = await sanityQuery(servicesQuery, Sanity.ServiceBlockArraySchema);
				
				if (error) {
					throw error;
				}
				
				if (data && data.length > 0) {
					// Add Icon component references for backward compatibility
					const enhancedServices = data.map(service => {
						let Icon: LucideIcon | undefined = undefined;
						
						// Map lucideIcon strings to actual components for rendering
						if (service.iconType === 'lucide' && service.lucideIcon) {
							switch (service.lucideIcon) {
								case 'code':
									Icon = Code;
									break;
								case 'globe':
									Icon = Globe;
									break;
								case 'paintbrush':
									Icon = Paintbrush;
									break;
								case 'wrench':
									Icon = Wrench;
									break;
								default:
									break;
							}
						}
						
						return {
							...service,
							dataPoints: service.dataPoints || [], // Ensure dataPoints is always an array
							Icon
						};
					});
					
					setServices(enhancedServices);
				} else {
					// Fallback to hardcoded data if no services found in Sanity
					setServices([
						{
							name: "Website Development",
							description: {
								short: "Custom, responsive websites built with modern technologies that load fast and convert visitors into customers. From simple landing pages to complex multi-page sites.",
								long: "We create tailored websites that perfectly represent your brand and business goals. Our websites are built with modern technologies that ensure fast loading times, mobile responsiveness, and high conversion rates. Whether you need a simple landing page or a complex multi-page site, we deliver beautiful, functional websites that engage your audience and drive results."
							},
							dataPoints: [
								"Responsive design for all devices",
								"SEO optimization built-in",
								"Fast loading speeds",
								"Content management systems",
								"Analytics integration",
								"Secure hosting solutions"
							],
							iconType: 'lucide',
							lucideIcon: 'code',
							Icon: Code
						},
						{
							name: "Web Application Development",
							description: {
								short: "Powerful, scalable web applications with robust functionality. We build custom solutions that solve complex business problems and streamline operations.",
								long: "Our web application development service delivers powerful, scalable solutions tailored to your business needs. We focus on creating applications with robust functionality that solve complex problems and streamline operations. Our development approach prioritizes performance, security, and user experience to ensure your application delivers value from day one and scales with your business."
							},
							dataPoints: [
								"Custom functionality development",
								"Scalable architecture",
								"Integration with existing systems",
								"User authentication and authorization",
								"Database design and management",
								"Real-time data processing"
							],
							iconType: 'lucide',
							lucideIcon: 'globe',
							Icon: Globe
						},
						{
							name: "Web Design",
							description: {
								short: "Beautiful, intuitive designs that captivate your audience. Our designs prioritize user experience while maintaining your brand identity across all digital touchpoints.",
								long: "Our web design services combine aesthetics with functionality to create beautiful, intuitive interfaces that captivate your audience. We prioritize user experience, carefully crafting each element to guide visitors through your site naturally. Every design maintains your brand identity consistently across all digital touchpoints, ensuring your website not only looks great but also converts visitors into customers."
							},
							dataPoints: [
								"UI/UX design",
								"Responsive layouts",
								"Brand consistency",
								"Interactive elements",
								"Accessibility compliance",
								"Visual hierarchy optimization"
							],
							iconType: 'lucide',
							lucideIcon: 'paintbrush',
							Icon: Paintbrush
						},
						{
							name: "Tech Support",
							description: {
								short: "Professional technical support for your devices. We provide troubleshooting, maintenance, and optimization services to keep your devices running smoothly.",
								long: "Our tech support services provide professional assistance for all your digital needs. From troubleshooting issues to performing routine maintenance and optimization, we ensure your devices and websites run smoothly. Our team of experts is available to solve problems quickly and efficiently, minimizing downtime and maximizing performance for your business."
							},
							dataPoints: [
								"24/7 support availability",
								"Remote troubleshooting",
								"Performance optimization",
								"Security updates and patches",
								"Data backup solutions",
								"System health monitoring"
							],
							iconType: 'lucide',
							lucideIcon: 'wrench',
							Icon: Wrench
						}
					]);
				}
			} catch (error) {
				console.error("Error fetching services:", error);
				// Keep using fallback data on error
			} finally {
				setLoading(false);
			}
		};
		
		fetchServices();
	}, []);

	if (loading) {
		return (
			<section className="w-full py-12 md:py-20 flex justify-center items-center">
				<div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
			</section>
		);
	}

	return (
		<section 
			id="services" 
			ref={sectionRef}
			className={`
				w-full py-12 md:py-20
				flex flex-col items-center
				transition-all duration-1000 ease-in-out
				opacity-100
			`}
		>
			<div className="text-center mb-10 md:mb-16">
				<h2 className={`
					text-5xl 
					font-bold mb-4
					bg-clip-text text-transparent 
					bg-gradient-to-r from-purple-700 via-orange-500 to-yellow-500
					${bangers.className}
				`}>
					Our Services
				</h2>
				<p className="text-gray-300 max-w-2xl mx-auto text-2xl">
					Professional <span className="font-extrabold">Web Solutions</span> for Your Business Growth
				</p>
			</div>

			{/* Services rows */}
			<div className="w-full max-w-5xl px-4 flex flex-col gap-6">
				{services.length > 0 ? (
					services.map((service, index) => (
						<ServiceBlock 
							key={index}
							name={service.name}
							description={service.description}
							dataPoints={service.dataPoints}
							iconType={service.iconType}
							lucideIcon={service.lucideIcon}
							customIconUrl={service.customIconUrl}
							Icon={service.Icon}
						/>
					))
				) : (
					<div className="text-center text-white py-10">
						<p>No services found. Please check the console for errors.</p>
					</div>
				)}
			</div>
		</section>
	)
}
