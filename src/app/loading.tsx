import React from 'react'
import LoadingProgressBar from '@components/loading/progress-bar.tsx'

export default function Loading() : JSX.Element {
	return (
		<LoadingProgressBar minDisplayTime={3000} />
	)
}
