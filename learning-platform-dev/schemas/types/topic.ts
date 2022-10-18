const titleRules = (rule) => {
	return [
		rule.required().min(4).warning("Topic title is too short (<4 characters)."),
		rule.required().max(60).error("Topic title is too long (>60 characters)."),
	]
}

export default {
	name: 'topic',
	title: 'Topic',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'localeString',
			validation: Rule => Rule.fields({
				en: fieldRule => titleRules(fieldRule),
				sr: fieldRule => titleRules(fieldRule)
			})
		},
		{
			name: 'overview',
			title: 'Overview',
			type: 'localeBlockContent',
		},
		{
			name: 'lectures',
			title: 'Lectures',
			type: 'array',
			of: [{ type: 'lecture' }],
			validation: Rule => Rule.required().error("Topic must have at least 1 lecture."),
		}
	],
	preview: {
		select: {
			title: "title.en"
		},
	},
}
