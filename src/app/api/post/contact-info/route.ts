import { UserContent } from '@def/definitions'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

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

		// Send email notification using Resend
		const resend = new Resend(process.env.RESEND_API_KEY)
		
		await resend.emails.send({
			from: 'lead-bot@themediamasons.com',  
			to: 'arodriguez@themediamasons.com',
			subject: 'New Contact Form Submission',
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${data.name}</p>
				<p><strong>Email:</strong> ${data.email}</p>
				<p><strong>Phone:</strong> ${data.phone}</p>
				<p><strong>Message:</strong> ${data.message || 'N/A'}</p>
				${data.plan ? `<p><strong>Selected Plan:</strong> ${data.plan.title || 'N/A'}</p>` : ''}
			`,
		})

		return NextResponse.json({
			successful: true	
		},{
			status: 201
		})
	} catch(error: any) {
		console.error('Error processing contact form or sending email:', error)
		return NextResponse.json({
			error: error.message
		},{
			status: 400
		})
	}
} 
