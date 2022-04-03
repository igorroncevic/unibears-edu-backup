export default {
    name: 'topic',
    title: 'Topic',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => [
                Rule.required().min(4).warning("Topic title is too short (<4 characters)."),
                Rule.required().max(60).error("Topic title is too long (>60 characters)."),
            ]
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
            of: [{ type: 'lecture' }],
            validation: Rule => Rule.required().error("Topic must have at least 1 lecture."),
        }
    ]
}
