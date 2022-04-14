export default {
	name: 'legalDocument',
	title: 'Legal Documents',
	type: 'document',
	fields: [
		{
			title: "Name of the document",
			name: "name",
			description: "Examples: Terms of Service, Privacy Policy etc.",
			type: "string"
		},
		{
			name: "legalType",
			title: "Type of Legal Document",
			description: "Examples: TOS (Terms of Service), PP (Privacy Policy) etc.",
			type: "string"
		},
		{
			name: 'content',
			title: 'Content',
			type: 'localeBlockContent',
		},
	],
	// Preview in Sanity Studio
	preview: {
		select: {
			title: "name"
		},
	},
}
