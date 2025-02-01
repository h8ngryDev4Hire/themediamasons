import { UserContent } from '@def/definitions'
import { NextResponse } from 'next/server'


export async function POST( request : Request )  {
	try {
		const data = await request.json()
		const result = UserContent.ClientContactInformationSchema.safeParse(data)

		if (!result.success) {
			return NextResponse.json({
				successful: false,
				error: result.error.issues[0].message,
			},{
				status: 400
			})
		}

		return NextResponse.json({
			successful: true	
		},{
			status: 201
		})
	} catch(error: any) {
		return NextResponse.json({
			error: error.message
		},{
			status: 400
		})
	}
} 
