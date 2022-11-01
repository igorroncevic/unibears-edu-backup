const titleRules = (rule) => {
    return [
        rule
            .required()
            .min(4)
            .warning('Lecture title is too short (<4 characters).'),
        rule
            .required()
            .max(150)
            .error('Lecture title is too long (>150 characters).'),
    ];
};

export default {
    name: 'lecture',
    title: 'Lecture',
    type: 'object', // Objects cannot be created by themselves outside documents.
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'localeString',
            validation: (Rule) =>
                Rule.fields({
                    en: (fieldRule) => titleRules(fieldRule),
                    sr: (fieldRule) => titleRules(fieldRule),
                }),
        },
        {
            name: 'source',
            title: 'Video Content',
            description:
                'Full link to Vimeo video content. e.g. https://player.vimeo.com/video/226053498?h=a1599a8ee9',
            type: 'string',
            validation: (Rule) =>
                Rule.required().error('Course must have video content.'),
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'localeBlockContent',
        },
    ],
    preview: {
        select: {
            title: 'title.en',
        },
    },
};
