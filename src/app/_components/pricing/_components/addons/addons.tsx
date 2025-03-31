import { Core, Sanity, Routes } from '@def/definitions'
import AddonBlock from './addon-block'
import { createContext, useEffect, useState } from 'react'
import AddonSelector from './addon-selector'
import useTransition, { UseTransition } from '@hooks/useTransition'


export interface AddonsMasterContext {
	categoriesContext : Core.StateHook<string[]>
	selectedCategoryContext: Core.StateHook<string>
	transitionContext: UseTransition 
	functions : Core.CoreFunctions 
}

export const AddonsContext = createContext<any>(undefined)

export default function Addons() {

	const [ addons, setAddons ] = useState<Sanity.Addon[]>([])
	const [ currentAddonIndex, setCurrentAddonIndex ] = useState(0)

	const MasterContext : AddonsMasterContext = {
		categoriesContext: useState<string[]>([]),
		selectedCategoryContext: useState(''),
		transitionContext: useTransition({ speed: 'trans-ease' }),
		functions: {}
	}
	const [ selectedCategory, setSelectedCategory ] = MasterContext.selectedCategoryContext 
	const [ categories, setCategories ] = MasterContext.categoriesContext
	const { transitionState } = MasterContext.transitionContext

	// Function to navigate to next addon
	const nextAddon = () => {
		const categoryAddons = addons.filter(addon => addon.category === selectedCategory)
		setCurrentAddonIndex((prev) => (prev + 1) % categoryAddons.length)
	}

	// Function to navigate to previous addon
	const prevAddon = () => {
		const categoryAddons = addons.filter(addon => addon.category === selectedCategory)
		setCurrentAddonIndex((prev) => (prev - 1 + categoryAddons.length) % categoryAddons.length)
	}

	useEffect(()=> {
		(async ()=> {
			try {
				const payload : Routes.FetchRequest = {
					content: 'serviceAddons'
				}

				const response = await fetch('/api/fetch/', {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				})

				const data : Routes.UnknownResponse = await response.json()

				if (!response.ok || !data.successful) {
					throw new Error(data.error)
				}

				const addonSuiteData : Sanity.AddonSuite = data.data

				if (!addonSuiteData) {
					throw new Error('Request successful yet no data was recieved.')
				} else {
					const categories : string[] = []
					const addons : Sanity.Addon[] = []

					addonSuiteData.forEach( category => {
						categories.push(category.category)

						category.addons.forEach( addon => {
							addons.push(addon)
						})
					})

					setCategories(categories)
					setAddons(addons)
				}

			} catch(error) {
				console.error(error)
			}
		})()
	},[])

	useEffect(()=> {
		if (categories.length > 0) {
			setSelectedCategory(categories[1])
		}
	},[categories])

	useEffect(() => {
		// Reset current addon index when category changes
		setCurrentAddonIndex(0)
	}, [selectedCategory])

	// Get the filtered addons for the current category
	const categoryAddons = addons.filter(addon => addon.category === selectedCategory)
	// Get the addon to display in carousel view
	const displayedAddon = categoryAddons[currentAddonIndex]

	return (
		<section 
		 id="addons-section" 
		 className={`
		 w-full
		 h-auto sm:h-[18rem] md:h-[20rem] lg:h-[23rem] xl:h-[25rem] 
		 flex flex-col items-center justify-center
		 rounded-xl
		 bg-white bg-opacity-10
		 p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6
		`}>
		<AddonsContext.Provider value={MasterContext}>
			<section 
			 id="addon-category-selection" 
			 className={`
			 flex items-center justify-between
			 w-full max-w-full overflow-x-auto
			`}>
				<AddonSelector/>
			</section>
			
			{/* Desktop view - grid layout for addons */}
			<section 
			 id="addon-display-desktop" 
			 className={`
			 hidden sm:flex items-center justify-center
			 space-x-4 md:space-x-6 lg:space-x-8
			 w-full overflow-x-auto py-2
			`}>
			{addons.map( ( addon,key ) => {
				if (addon.category === selectedCategory) return (
					<AddonBlock 
					 key={key}
					 name={addon.name} 
					 description={addon.description}
					 iconUrl={addon.iconUrl}
					/>
				)
			})}
			</section>
			
			{/* Mobile view - carousel layout for addons */}
			<section 
			 id="addon-display-mobile" 
			 className={`
			 flex sm:hidden 
			 flex-col
			 items-center justify-center
			 w-full
			`}>
				{/* Only render if we have addons and a selected category */}
				{displayedAddon && (
					<div className="flex flex-row items-center justify-center w-full">
						{/* Previous button */}
						<button 
							onClick={prevAddon}
							className="flex-shrink-0 flex items-center justify-center w-8 h-8 mr-2 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-full shadow-lg hover:bg-black/60 transition-all duration-300 focus:outline-none z-10"
							aria-label="Previous add-on"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-purple-400">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						
						{/* Current addon */}
						<div className="flex justify-center transition-all duration-300 ease-in-out transform scale-110">
							<AddonBlock 
								name={displayedAddon.name} 
								description={displayedAddon.description}
								iconUrl={displayedAddon.iconUrl}
							/>
						</div>
						
						{/* Next button */}
						<button 
							onClick={nextAddon}
							className="flex-shrink-0 flex items-center justify-center w-8 h-8 ml-2 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-full shadow-lg hover:bg-black/60 transition-all duration-300 focus:outline-none z-10"
							aria-label="Next add-on"
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-purple-400">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				)}
				
				{/* Addon indicators */}
				{categoryAddons.length > 0 && (
					<div className="flex justify-center mt-4 w-full">
						{categoryAddons.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentAddonIndex(index)}
								className={`w-2 h-2 mx-1 rounded-full focus:outline-none transition-all duration-300 ${
									index === currentAddonIndex ? 'bg-purple-500' : 'bg-purple-500/30'
								}`}
								aria-label={`Go to add-on ${index + 1}`}
							/>
						))}
					</div>
				)}
			</section>
		</AddonsContext.Provider>
		</section>
	)
}
