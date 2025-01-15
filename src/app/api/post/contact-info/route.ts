import { ClientContactInformationSchema } from '@def/definitions'
import { NextRequest, NextResponse } from 'next/server'


export async function POST( request : Request )  {
	try {
		const data = await request.json()
		const result = ClientContactInformationSchema.safeParse(data)

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
			status: 500
		})
	}
} 
