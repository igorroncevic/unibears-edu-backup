export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
    {
      name: 'bannerPhoto',
      title: 'Course Banner (1920x500)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'thumbnail',
      title: 'Course Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'coursePreview',
      title: 'Course Preview',
      type: 'string', // link to video
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
    },
    {
      name: 'lectures',
      title: 'Lectures',
      type: 'array',
      of: [{ type: 'lecture' }]
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(3000)
    }
  ],

  // Preview in Sanity Studio
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
