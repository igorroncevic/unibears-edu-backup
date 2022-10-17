const nameRules = (rule) => {
	return [
		rule.required().min(3).error("Name is too short (<3 characters)."),
		rule.required().max(15).error("Name is too long (>15 characters)."),
	]
}

export default {
	name: 'category',
	title: 'Category',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Name',
			description: 'Name should be something clear and concise (3-15 letters).',
			type: 'localeString',
			// This rule validates all fields of localeString a.k.a. all languages
			validation: Rule => Rule.fields({
				en: fieldRule => nameRules(fieldRule),
				sr: fieldRule => nameRules(fieldRule)
			})
		},
		// TODO: Maybe add a preview icon to make it nicer in Sanity studio
	],
	// Preview in Sanity Studio
	preview: {
		select: {
			title: "name.en"
		},
	},
}
