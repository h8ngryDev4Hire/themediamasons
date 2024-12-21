import addonPricingData from '@data/json/addonPricingData.json'
import { Addon, AddonSuite, CoreFunctions, StateHook } from '@def/definitions'
import { gudeaBold } from '@ui/fonts'
import AddonBlock from './addon-block'
import { createContext, useEffect, useState } from 'react'
import AddonSelector from './addon-selector'
import useTransition, { UseTransition } from '@hooks/useTransition'

type ExtractedAddons = [[ string,string ],[ string, Addon[] ]]

export interface AddonsMasterContext {
	categoriesContext : StateHook<string[]>
	selectedCategoryContext: StateHook<string>
	transitionContext: UseTransition 
	functions : CoreFunctions 
}

export const AddonsContext = createContext(undefined)

export default function Addons() {
	const addonSuite : AddonSuite = addonPricingData.addons

	const [ addons, setAddons ] = useState<Addon[]>([])

	const MasterContext : AddonsMasterContext = {
		categoriesContext: useState<string[]>([]),
		selectedCategoryContext: useState(''),
		transitionContext: useTransition({ speed: 'trans-ease' }),
		functions: {}
	}
	const [ selectedCategory, setSelectedCategory ] = MasterContext.selectedCategoryContext 
	const [ categories, setCategories ] = MasterContext.categoriesContext
	const { transitionState } = MasterContext.transitionContext

	const extractAndTransform = (addonSuite : AddonSuite) => {
		const categorySet : string[] = []
		const addonSet : Addon[] = []

		addonSuite.forEach( addon => {
			const [[ ,category ],[ ,options ]] = Object.entries(addon) as ExtractedAddons	

			const addons = options.map( opt => {
				opt.category = category
				return opt
			})	
			categorySet.push(category)
			addonSet.push(...addons)
		})

		setCategories(categorySet)
		setAddons(addonSet)
	}


	useEffect(()=> extractAndTransform(addonSuite),[])

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
					 svg={addon.svg}
					/>
				)
			})}
			</section>
		</AddonsContext.Provider>
		</section>
	)
}
