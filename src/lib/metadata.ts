import type { Metadata } from 'next'

type OpenGraphType = 
  | 'website' 
  | 'article' 
  | 'book' 
  | 'profile' 
  | 'music.song' 
  | 'music.album' 
  | 'music.playlist' 
  | 'music.radio_station' 
  | 'video.movie' 
  | 'video.episode' 
  | 'video.tv_show' 
  | 'video.other'

/**
 * Generates SEO metadata for dynamic pages based on content
 * 
 * @param title The page title
 * @param description The page description
 * @param imageUrl Optional OG image URL
 * @param type Content type (default: website)
 * @returns Metadata object for Next.js
 */
export function generateMetadata({
  title, 
  description, 
  imageUrl = '/og-image.png',
  type = 'website'
}: {
  title: string
  description: string
  imageUrl?: string
  type?: OpenGraphType
}): Metadata {
  // Create base title with site name
  const fullTitle = `${title} | The Media Masons`
  
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl]
    }
  }
}

/**
 * Creates structured data for service pages
 * 
 * @param serviceName Name of the service
 * @param description Service description
 * @returns JSON-LD string for the service
 */
export function generateServiceSchema(serviceName: string, description: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceName,
    'description': description,
    'provider': {
      '@type': 'ProfessionalService',
      'name': 'The Media Masons',
      'url': 'https://themediamasons.com'
    }
  })
}

/**
 * Creates JSON-LD schema for FAQ sections
 * 
 * @param questions Array of question/answer pairs
 * @returns JSON-LD string for FAQs
 */
export function generateFAQSchema(questions: {question: string, answer: string}[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map(qa => ({
      '@type': 'Question',
      'name': qa.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': qa.answer
      }
    }))
  })
} 