// Pricing Tiers Query
export const pricingQuery = `*[_type == "pricing"] | order(price.discounted asc) {
  name,
  codeName,
  price,
  perks,
  description
}`
 
// Service List Query
export const servicesQuery = `*[_type == "serviceList"] {
  name,
  description,
  dataPoints,
  iconType,
  lucideIcon,
  "customIconUrl": customIcon.asset->url
}`

// Hero CTAs Query
export const heroCtasQuery = `*[_type == "cta" && active == true] | order(order asc) {
  question,
  action
}`

// About Content Query
export const aboutQuery = `*[_type == "about"] | order(orderAsc) {
  name,
  quote,
  description
}`

// About Highlights Query
export const aboutHighlightsQuery = `*[_type == "aboutHighlight"] | order(order asc) {
  title,
  description,
  componentType,
  order
}`

// Addons with Categories Query
export const addonsQuery = `*[_type == "addonCategory"] {
    category,
    "addons": *[_type == "addons" && references(^._id)] {
      name,
      description,
      "category": ^.category,
      "iconUrl": icon.asset->url
    }
}`

// Testimonials Query
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  position,
  quote,
  rating,
  "imageUrl": image.asset->url,
  sourceUrl,
  websiteUrl
}`
