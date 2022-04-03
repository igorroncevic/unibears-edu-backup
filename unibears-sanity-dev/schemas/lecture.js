export default {
    name: 'lecture',
    title: 'Lecture',
    type: 'object', // Objects cannot be created by themselves outside documents.
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => [
                Rule.required().min(4).warning("Lecture title is too short (<4 characters)."),
                Rule.required().max(150).error("Lecture title is too long (>150 characters)."),
            ]
        },
        {
            name: 'source',
            title: 'Video Content',
            description: "Full link to Vimeo video content.",
            type: 'string',
            validation: Rule => Rule.required().error("Course must have video content."),
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'blockContent',
        }
    ]
}
