export default {
  name: 'serviceList',
  title: 'Service List',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'icon',
      title: 'Service Icon',
      type: 'image',
      options: {
        hotspot: true, // Enables UI for selecting focal point
        accept: 'image/svg+xml' // Limit to SVG uploads
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }
      ]
    }
  ]
}
