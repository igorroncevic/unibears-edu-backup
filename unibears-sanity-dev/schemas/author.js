export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'Author\'s full name.',
      type: 'string',
      validation: Rule => [
        Rule.required().min(6).warning("Your name is too short (<6 characters)."),
        Rule.required().max(60).error("Your name is too long (>60 characters)."),
      ]
    },
    {
      name: 'title',
      title: 'Title',
      description: 'Author\'s position within the organization. Example: Profession (e.g. Head of Data Science, Pierian Data Inc.)',
      type: 'string',
      validation: Rule => [
        // TODO: Check how this length (6-100) applies to Instructor info in /courses/[slug]
        Rule.required().min(6).warning("Your title is too short (<6 characters)."),
        Rule.required().max(100).error("Your name is too long (>100 characters)."),
      ]
    },
    {
      name: 'profilePhoto',
      title: 'Profile Photo',
      description: "Recommended dimensions are 500x500 pixels.",
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required().error("Author's profile photo is required.")
    },
    // TODO: Add length validation for Author's bio.
    // TODO: Experiment with blockcontent, make it as minimal as possible.
    {
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profilePhoto',
      subtitle: 'title'
    },
  },
}
