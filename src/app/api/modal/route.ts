import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request : NextRequest) {
	try{

		return NextResponse.json({
			successful: true,
		})
	} catch(error){
		console.log(error)
		return NextResponse.json({ successful: false }, { status: 404 })
	}
}
