// MasterContext is used for whenever a parent component for a feature has
// multiple useState hooks that must be utilized by multiple children
export type GenericCallback = ( ...args : any[] ) => any
export type StateHook<T> = [T, React.Dispatch<React.SetStateAction<T>>]
export type MasterContext = Record< string, StateHook<any>>
export interface CoreFunctions {
	[key : string] : (...args : any[]) => any
}



/*
 * PricingTier Types & Definitions
 */
export interface PricingTier {
	name: string;
	codeName: ServicePackage;
	price: {
		original: number;
		discounted: number;
	}
	perks: Array<string>;
	description: string;
}

export type ServicePackage = 'starter' | 'enterprise' | 'business' | 'custom' | 'cta'



/*
 * AddonsPricing Types & Interfaces
 */
export interface Addon {
	name: string;
	description: string;
	pricing: {
		start: number;
		minimum: number;
	}
	svg: string
	category?: string
}

export interface AddonCategory {
  category: string;
  options: Addon[];
}

export type AddonSuite = AddonCategory[];



/*
 * ClientContactInformation Types & Interfaces
 */
export interface ClientContactInformation{
	name: string;
	email: string;
	phone: string;
	company?: string;
	plan?: ServicePackage
}


//
export interface NewsletterSubscription {
	email: string;
}


/*
 * Modal IDs
 */
export type ModalIdentifier = 'contact-modal' | 'newsletter-modal' 
