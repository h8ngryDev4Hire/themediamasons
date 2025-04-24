import { groq } from 'next-sanity'

/**
 * Query to get all testimonials ordered by their display order
 */
export const getAllTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    position,
    quote,
    rating,
    "imageUrl": image.asset->url,
    sourceUrl,
    websiteUrl
  }
`

/**
 * Query to get a specific number of featured testimonials
 */
export const getFeaturedTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc)[0...3] {
    _id,
    name,
    position,
    quote,
    rating,
    "imageUrl": image.asset->url,
    sourceUrl,
    websiteUrl
  }
` 