export default {
  name: 'cta',
  title: 'Hero Call to Actions',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'CTA Question',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'action',
      title: 'CTA Action Text',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'active',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to control whether this CTA should be displayed',
      initialValue: true
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'action'
    }
  }
}
