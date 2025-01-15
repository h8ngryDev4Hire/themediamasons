export default {
  name: 'pricing',
  title: 'Pricing Tiers',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'codeName',
      title: 'Code Name',
      type: 'string',
      options: {
        list: [
          { title: 'Starter', value: 'starter' },
          { title: 'Enterprise', value: 'enterprise' },
          { title: 'Business', value: 'business' },
          { title: 'Custom', value: 'custom' },
          { title: 'CTA', value: 'cta' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'original',
          title: 'Original Price',
          type: 'number',
          validation: (Rule: any) => Rule.required().positive()
        },
        {
          name: 'discounted',
          title: 'Discounted Price',
          type: 'number',
          validation: (Rule: any) => Rule.required().positive()
        }
      ]
    },
    {
      name: 'perks',
      title: 'Perks',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    }
  ]
}
