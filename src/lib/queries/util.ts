import { client } from "@lib/sanity/lib/client"
import { z } from "zod"

export default async function sanityQuery<T>
	(query : string, schema : z.ZodType<T>) : 
	Promise<{ data: T | null, error: any }>
{
	try {
		const raw = await client.fetch(query)
		//console.log('raw data: ', raw)

		const validated = schema.parse(raw)
		//console.log('validated')

		return {
			data: validated,
			error: null
		}
	} catch(error : unknown){
		error instanceof z.ZodError ?
			console.log('error validating data from query()') :
			console.error('error fetching data from query().')

		console.error(error)

		return { 
			data: null,
			error
		}
	}
}


