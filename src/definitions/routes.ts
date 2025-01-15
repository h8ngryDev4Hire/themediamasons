import { z } from 'zod'
import { SanityCodenameSchema } from './sanity'

export const SuccessResponseSchema = z.object({
	successful: z.literal(true),
	data: z.any().optional()
})

export const FailureResponseSchema = z.object({
	successful: z.literal(false),
	error: z.any(),
	data: z.any().optional()
})

export const UnknownResponseSchema = z.object({
	successful: z.boolean(),
	error: z.any().optional(),
	data: z.any().optional()
})

// fetch-content route request schema
export const FetchRequestSchema = z.object({
	content: SanityCodenameSchema
})


export type SuccessResponse = z.infer<typeof SuccessResponseSchema>
export type FailureResponse = z.infer<typeof FailureResponseSchema>
export type UnknownResponse = z.infer<typeof UnknownResponseSchema>
export type FetchRequest = z.infer<typeof FetchRequestSchema>
