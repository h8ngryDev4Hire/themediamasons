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
      type: 'object',
      fields: [
        {
          name: 'short',
          title: 'Short Description',
          type: 'text',
          description: 'Brief description displayed in service listings',
          validation: (Rule: any) => Rule.required().max(200)
        },
        {
          name: 'long',
          title: 'Long Description',
          type: 'text',
          description: 'Detailed description shown in the service modal',
          validation: (Rule: any) => Rule.required()
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'dataPoints',
      title: 'Service Features',
      description: 'Key features or benefits of this service',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(2).max(8)
    },
    {
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Lucide Icon', value: 'lucide' },
          { title: 'Custom SVG', value: 'custom' }
        ],
      },
      initialValue: 'lucide',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'lucideIcon',
      title: 'Lucide Icon',
      description: 'Select a Lucide icon',
      type: 'string',
      options: {
        list: [
          { title: 'Code (Website Development)', value: 'code' },
          { title: 'Globe (Web Application)', value: 'globe' },
          { title: 'Paintbrush (Web Design)', value: 'paintbrush' },
          { title: 'Wrench (Tech Support)', value: 'wrench' },
          { title: 'LayoutDashboard (Dashboard)', value: 'layoutDashboard' },
          { title: 'ShoppingCart (E-commerce)', value: 'shoppingCart' },
          { title: 'BrainCircuit (AI Solutions)', value: 'brainCircuit' },
          { title: 'Smartphone (Mobile Apps)', value: 'smartphone' },
          { title: 'Server (Hosting)', value: 'server' },
          { title: 'Shield (Security)', value: 'shield' },
          { title: 'Search (SEO)', value: 'search' },
          { title: 'BarChart (Analytics)', value: 'barChart' }
        ]
      },
      hidden: ({ parent }: { parent: { iconType: string } }) => parent?.iconType !== 'lucide',
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        // Only required if iconType is 'lucide'
        if (context.parent?.iconType === 'lucide' && !value) {
          return 'Required when using Lucide icons'
        }
        return true
      })
    },
    {
      name: 'customIcon',
      title: 'Custom Icon',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/svg+xml'
      },
      hidden: ({ parent }: { parent: { iconType: string } }) => parent?.iconType !== 'custom',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule: any) => Rule.custom((value: any, context: any) => {
            // Only required if there's an image
            if (context.document?.customIcon && !value) {
              return 'Alt text is required for the image'
            }
            return true
          })
        }
      ],
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        // Only required if iconType is 'custom'
        if (context.parent?.iconType === 'custom' && !value) {
          return 'Required when using custom icons'
        }
        return true
      })
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description.short',
      media: 'customIcon'
    },
    prepare({ title, subtitle, media }: any) {
      return {
        title,
        subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : '',
        media
      }
    }
  }
}
