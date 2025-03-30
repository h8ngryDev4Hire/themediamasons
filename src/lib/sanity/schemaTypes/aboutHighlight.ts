export default {
  name: 'aboutHighlight',
  title: 'About Highlight',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'componentType',
      title: 'Component Type',
      type: 'string',
      options: {
        list: [
          { title: 'Laptop', value: 'laptop' },
          { title: 'Globe', value: 'globe' },
          { title: 'DNA Helix', value: 'dnaHelix' }
        ],
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'order',
      title: 'Order',
      description: 'Used to control display order (ascending)',
      type: 'number',
      initialValue: 0,
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'componentType'
    }
  }
} 