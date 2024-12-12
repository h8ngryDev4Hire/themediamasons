import { NextRequest } from "next/server";

export function middleware( request: NextRequest ) {
	console.log('This msg came from the middleware')
}
