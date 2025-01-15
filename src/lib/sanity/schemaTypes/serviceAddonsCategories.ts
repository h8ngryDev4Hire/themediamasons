export default {
  name: 'addonCategory',
  title: 'Addon Categories',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Category Description',
      type: 'text'
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}
