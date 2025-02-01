import { Routes } from "@def/definitions"
import sanityQuery from "@lib/queries/util"
import { NextResponse } from "next/server"
import * as Queries from '@lib/queries/standard'
import * as SanitySchemas from '@def/sanity'
import { ZodSchema } from "zod"

export async function POST( request: Request ) {
	try {
		let query : string;
		let schema : ZodSchema


		const json = await request.json()

		const { content } = Routes.FetchRequestSchema.parse(json)


		switch (content) {
			case 'pricingTiers': {
				query = Queries.pricingQuery
				schema = SanitySchemas.PricingTierListSchema
				break
			}
			case 'serviceAddons': {
				query = Queries.addonsQuery
				schema = SanitySchemas.AddonSuiteSchema
				break
			}
			case 'serviceList': {
				query = Queries.servicesQuery
				schema = SanitySchemas.ServiceBlockArraySchema
				break
			}
			case 'heroCta': {
				query = Queries.heroCtasQuery
				schema = SanitySchemas.HeroCtaArraySchema
				break
			}
			case 'about': {
				query = Queries.aboutQuery
				schema = SanitySchemas.AboutTextContentArraySchema
				break
			}
			default: {
				throw new Error('Invalid Content Type received')
			}
		}

		const { data, error } = await sanityQuery(query, schema)

		if (error) throw new Error(error) 

		if (data) {
			return NextResponse.json<Routes.SuccessResponse>({
				successful: true,
				data
			})
		} else throw new Error('No error recieved yet data value was returned empty')

	} catch ( error : unknown ) {
		return NextResponse.json<Routes.FailureResponse>({
			successful: false,
			error: error
		},{ status: 400 })
	}
}


