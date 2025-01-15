export default {
name: 'about',
title: 'About Content',
type: 'document',
fields: [
  {
    name: 'name',
    title: 'Section Name',
    type: 'string',
    validation: (Rule: any) => Rule.required()
  },
  {
    name: 'quote',
    title: 'Featured Quote',
    type: 'object',
    fields: [
      {
	name: 'text',
	title: 'Quote Text',
	type: 'text',
	validation: (Rule: any) => Rule.required()
      },
      {
	name: 'author',
	title: 'Quote Author',
	type: 'string',
	validation: (Rule: any) => Rule.required()
      }
    ]
  },
  {
    name: 'description',
    title: 'Section Description',
    type: 'text',
    validation: (Rule: any) => Rule.required()
  },
],
preview: {
  select: {
    title: 'name',
    subtitle: 'quote.author'
  }
}
}
