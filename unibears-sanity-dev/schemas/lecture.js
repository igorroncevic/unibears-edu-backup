export default {
    name: 'lecture',
    title: 'Lecture',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        // TODO: Slugify lecture to take its title, not course title
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
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'blockContent',
        },
        {
            name: 'videoContent',
            title: 'Video Content',
            type: 'string'
        }
    ],
    // Preview in Sanity Studio
    preview: {
        select: {
            title: 'title',
            media: 'mainImage'
        }
    }
}
