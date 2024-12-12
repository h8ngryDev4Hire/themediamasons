import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request : NextRequest) {
	try{
		const params = request.nextUrl.searchParams
		const filename = params.get('filename')

		if (!filename) {
			return NextResponse.json({ successful: false, }, { status: 400 })
		}

		const file = await fs.readFile(process.cwd() + `/src/data/text/${filename}.txt`, 'ascii')

		return NextResponse.json({
			successful: true,
			content: file
		})
	} catch(error){
		return NextResponse.json({ successful: false }, { status: 404 })
	}
}
