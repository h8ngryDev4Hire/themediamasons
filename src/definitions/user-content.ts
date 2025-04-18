import { z } from 'zod'
import { ServicePackageSchema } from './sanity';


// ClientContactInformation schema
export const ClientContactInformationSchema = z.object({
	name: z.string()
    		.min(2, "Name must be at least 2 characters")
    		.max(50, "Name must be less than 50 characters"),
  	email: z.string()
    		.email("Invalid email format"),
  	phone: z.string()
    		.regex(/^\+?[\d\s-()]{10,}$/, "Invalid phone number format"),
  	message: z.string()
    		.max(500, "Message must be less than 500 characters")
    		.optional(),
  	plan: ServicePackageSchema.optional()
});


// NewsletterSubscription schema
export const NewsletterSubscriptionSchema = z.object({
  	email: z.string().email("Invalid email format")
});


export type ClientContactInformation = z.infer<typeof ClientContactInformationSchema>;
export type NewsletterSubscription = z.infer<typeof NewsletterSubscriptionSchema>;
