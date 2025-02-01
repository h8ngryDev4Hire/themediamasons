import { z } from "zod";
import { Sanity } from "./definitions";


// QueryMapRegistry
export const QueryMapRegistrySchema = z.object({
	query: z.string(),
	schema: z.custom<z.ZodType>()
})
export type QueryMapRegistry = z.infer<typeof QueryMapRegistrySchema>


// QueryMapRecord
export const QueryMapSchema = z.record( Sanity.SanityCodenameSchema, QueryMapRegistrySchema )
export type QueryMap  = z.infer<typeof QueryMapSchema>


