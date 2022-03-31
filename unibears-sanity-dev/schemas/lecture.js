export default {
    name: 'lecture',
    title: 'Lecture',
    type: 'object', // Objects cannot be created by themselves outside documents.
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'source',
            title: 'Video Content',
            type: 'string'
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'blockContent',
        }
    ]
}
