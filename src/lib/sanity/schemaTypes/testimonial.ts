export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'position',
      title: 'Position/Company',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Client Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5)
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image'
    }
  }
}