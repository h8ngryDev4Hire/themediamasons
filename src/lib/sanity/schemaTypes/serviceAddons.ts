export default {
  name: 'addons',
  title: 'Service Addons',
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
      name: 'pricing',
      title: 'Pricing Details',
      type: 'object',
      fields: [
        {
          name: 'start',
          title: 'Starting Price',
          type: 'number',
          validation: (Rule: any) => Rule.required().positive()
        },
        {
          name: 'minimum',
          title: 'Minimum Price',
          type: 'number',
          validation: (Rule: any) => Rule.required().positive().custom((minimum: number, context: any) => {
            const start = context.parent?.start
            return minimum <= start ? true : 'Minimum price must be less than or equal to starting price'
          })
        }
      ]
    },
    {
      name: 'icon',
      title: 'Addon Icon',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/svg+xml'
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'addonCategory' }],
      validation: (Rule: any) => Rule.required()
    },

  ],
  orderings: [
    {
      title: 'Category and Order',
      name: 'categoryAndOrderAsc',
      by: [
        {field: 'category.name', direction: 'asc'},
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'icon'
    }
  }
}
