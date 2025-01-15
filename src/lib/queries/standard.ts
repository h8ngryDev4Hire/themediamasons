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
  "iconUrl": icon.asset->url
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
