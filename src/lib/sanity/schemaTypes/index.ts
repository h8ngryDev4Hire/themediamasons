import { type SchemaTypeDefinition } from 'sanity'

import pricingTiers from './pricingTiers'
import serviceList from './serviceList'
import serviceAddons from './serviceAddons'
import serviceAddonsCategories from './serviceAddonsCategories'
import heroCta from './heroCta'
import about from './about'
import testimonial from './testimonial'
import aboutHighlight from './aboutHighlight'


export const schema: { types: SchemaTypeDefinition[] } = {
	types: [ 
		serviceList, 
		pricingTiers,
		serviceAddons,
		serviceAddonsCategories,
		heroCta,
		about,
		testimonial,
		aboutHighlight
	],
}

export const schemaCodenames = [
	'serviceList',
	'pricingTiers',
	'serviceAddons',
	'serviceAddonsCategories',
	'heroCta',
	'about',
	'testimonial',
	'aboutHighlight'
] as const 
