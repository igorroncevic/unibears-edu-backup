export default {
    name: 'topic',
    title: 'Topic',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
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
        }
    ]
}
