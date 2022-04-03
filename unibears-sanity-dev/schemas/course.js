export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => [
        // TODO: Check how ultra long names fit in CourseDetailsSidebar
        Rule.required().min(10).warning("Name is too short (<10 characters)."),
        Rule.required().max(100).error("Name is too long (>100 characters)."),
      ]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error("Course must have a slug."),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: Rule => Rule.required().error("Course must have an author."),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: Rule => Rule.required().error("Course must have at least 1 category."),
    },
    {
      name: 'bannerPhoto',
      title: 'Course Banner (1920x500)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error("Course must have a banner photo."),
    },
    {
      name: 'thumbnail',
      title: 'Course Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error("Course must have a thumbnail."),
    },
    {
      name: 'coursePreview',
      title: 'Course Preview',
      type: 'string', // link to video
      validation: Rule => Rule.required().error("Course must have a trailer video link."),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required().error("Course must have a set publish date."),
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
    },
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'topic' }],
      validation: Rule => Rule.required().error("Course must have at least 1 topic."),
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(3000).error("Course must have a set duration in minutes.")
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
