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
  'cta',
  'url'
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
	description: z.object({
		short: z.string(),
		long: z.string()
	}),
	dataPoints: z.array(z.string()).optional(),
	iconType: z.enum(['lucide', 'custom']),
	lucideIcon: z.string().optional().nullable(),
	customIconUrl: z.string().url().optional().nullable()
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

// Component type for 3D visualizations
export const ComponentTypeSchema = z.enum(['laptop', 'globe', 'dnaHelix'])

// About Highlight schema
export const AboutHighlightSchema = z.object({
	title: z.string(),
	description: z.string(),
	componentType: ComponentTypeSchema,
	order: z.number()
})

export const AboutHighlightArraySchema = z.array(AboutHighlightSchema)

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
export type ComponentType = z.infer<typeof ComponentTypeSchema>
export type AboutHighlight = z.infer<typeof AboutHighlightSchema>
export type AboutHighlightArray = z.infer<typeof AboutHighlightArraySchema>

// Testimonial schema
export const TestimonialSchema = z.object({
  _id: z.string(),
  name: z.string(),
  position: z.string().optional().nullable(),
  quote: z.string(),
  rating: z.number().min(1).max(5),
  imageUrl: z.string().url().optional().or(z.null()),
  sourceUrl: z.string().url().optional().nullable(),
  websiteUrl: z.string().url()
});

// Testimonial Array Schema
export const TestimonialArraySchema = z.array(TestimonialSchema);

// Replace the direct Testimonial type definition with the inferred one
export type Testimonial = z.infer<typeof TestimonialSchema>
// Add the TestimonialArray type
export type TestimonialArray = z.infer<typeof TestimonialArraySchema>
