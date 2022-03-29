export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      // Profession (e.g. Head of Data Science, Pierian Data Inc.)
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
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
    },
  },
}
