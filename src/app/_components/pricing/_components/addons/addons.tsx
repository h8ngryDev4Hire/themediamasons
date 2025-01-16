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

	const MasterContext : AddonsMasterContext = {
		categoriesContext: useState<string[]>([]),
		selectedCategoryContext: useState(''),
		transitionContext: useTransition({ speed: 'trans-ease' }),
		functions: {}
	}
	const [ selectedCategory, setSelectedCategory ] = MasterContext.selectedCategoryContext 
	const [ categories, setCategories ] = MasterContext.categoriesContext
	const { transitionState } = MasterContext.transitionContext



	
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



	return (
		<section 
		 id="addons-section" 
		 className={`
		 w-[90vw] md:w-full lg:w-full xl:w-[80vw]
		 h-[18rem] md:h-[20rem] lg:h-[23rem] xl:h-[25rem] 
		 flex flex-col items-center justify-center
		 rounded-xl
		 bg-white bg-opacity-10
		 p-[1.5rem] space-y-[2rem]
		`}>
		<AddonsContext.Provider value={MasterContext}>
			<section 
			 id="addon-category-selection" 
			 className={`
			 flex items-center justify-between
			 w-full
			`}>
				<AddonSelector/>
			</section>
			<section 
			 id="addon-display" 
			 className={`
			 flex items-center justify-center
			 space-x-[3rem]
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
		</AddonsContext.Provider>
		</section>
	)
}
