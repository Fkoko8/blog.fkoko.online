import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'readingTime',
      type: 'text',
    },
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'text',
      admin: {
        description: 'Use an image URL for now. Media uploads can be connected later.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Paragraph', value: 'paragraph' },
            { label: 'Heading', value: 'heading' },
            { label: 'Quote', value: 'quote' },
            { label: 'Stats', value: 'stats' },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'value', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'relatedRideId',
      type: 'text',
    },
  ],
}