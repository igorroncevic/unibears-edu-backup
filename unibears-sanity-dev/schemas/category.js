export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'Name should be something clear and concise (3-15 letters).',
      type: 'string',
      validation: Rule => [
        // TODO: Check how ultra long names fit in CourseDetailsSidebar
        Rule.required().min(3).warning("Name is too short (<2 characters)."),
        Rule.required().max(15).error("Name is too long (>15 characters)."),
      ]
    },
    // TODO: Maybe add a preview icon to make it nicer in Sanity studio
  ],
}
