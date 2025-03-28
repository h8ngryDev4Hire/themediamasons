import { schemaCodenames } from '@lib/sanity/schemaTypes';
import { z } from 'zod'


// All Sanity Schema codenames
export const SanityCodenameSchema = z.enum(schemaCodenames)


// Service Package schema
export const ServicePackageSchema = z.enum([
  'starter',
  'enterprise',
  'business',
  'custom',
  'cta'
]);


// Hero CTA Schema
export const HeroCtaSchema = z.object({
	question: z.string(),
	action: z.string()
})


// Hero CTA Array Schema
export const HeroCtaArraySchema = z.array(HeroCtaSchema)


// Service Block schema
export const ServiceBlockSchema = z.object({
	name: z.string(),
	description: z.string(),
	iconUrl: z.string().url()
})

export const ServiceBlockArraySchema = z.array(ServiceBlockSchema)


// PricingTier schema
export const PricingTierSchema = z.object({
	name: z.string(),
  	codeName: ServicePackageSchema,
  	price: z.object({
    		original: z.number().positive(),
		discounted: z.number().positive()
  	}),
  	perks: z.array(z.string()),
  	description: z.string()
});


// PricingTier Array Schema
export const PricingTierListSchema = z.array(PricingTierSchema)


// Addon schema
export const AddonSchema = z.object({
  	name: z.string(),
  	description: z.string(),
  	pricing: z.object({
    		start: z.number().positive(),
    		minimum: z.number().positive()
  	}).optional(),
  	iconUrl: z.string().url(),
  	category: z.string().optional()
});


// AddonCategory schema
export const AddonCategorySchema = z.object({
  	category: z.string(),
  	addons: z.array(AddonSchema)
});


// AddonSuite type
export const AddonSuiteSchema = z.array(AddonCategorySchema);


export const AboutTextContentSchema = z.object({
	name: z.string(),
	description: z.string(),
	quote: z.object({
		text: z.string(),
		author: z.string()
	})
})

export const AboutTextContentArraySchema = z.array(AboutTextContentSchema)


export type SanityCodename = z.infer<typeof SanityCodenameSchema>
export type ServicePackage = z.infer<typeof ServicePackageSchema>;
export type HeroCta = z.infer<typeof HeroCtaSchema>
export type HeroCtaArray = z.infer<typeof HeroCtaArraySchema>
export type ServiceBlock = z.infer<typeof ServiceBlockSchema>
export type ServiceBlockArray = z.infer<typeof ServiceBlockArraySchema>
export type PricingTier = z.infer<typeof PricingTierSchema>;
export type PricingTierList = z.infer<typeof PricingTierListSchema>
export type Addon = z.infer<typeof AddonSchema>;
export type AddonCategory = z.infer<typeof AddonCategorySchema>;
export type AddonSuite = z.infer<typeof AddonSuiteSchema>;
export type AboutTextContent = z.infer<typeof AboutTextContentSchema>
export type AboutTextContentArray = z.infer<typeof AboutTextContentArraySchema>

export type Testimonial = {
  _id: string
  name: string
  position?: string
  quote: string
  rating: number
  imageUrl?: string
}

// Testimonial schema
export const TestimonialSchema = z.object({
  _id: z.string(),
  name: z.string(),
  position: z.string().optional(),
  quote: z.string(),
  rating: z.number().min(1).max(5),
  imageUrl: z.string().url().optional()
});

// Testimonial Array Schema
export const TestimonialArraySchema = z.array(TestimonialSchema);
