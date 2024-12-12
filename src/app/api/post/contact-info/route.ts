import { ClientContactInformation } from '@def/definitions'
import { NextRequest, NextResponse } from 'next/server'


export async function POST( request : Request )  {
	try {
		const data : ClientContactInformation = await request.json()


	//	return NextResponse.redirect(new URL('/', request.url), {
	//		status: 301	
	//	})
		return NextResponse.json({
			successful: true	
		},{
			status: 201
		})
	} catch(error) {
		return NextResponse.json({
			error: error.message
		},{
			status: 500
		})
	}
} 
