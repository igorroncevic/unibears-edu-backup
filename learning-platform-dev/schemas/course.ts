const titleRules = (rule) => {
	return [
		rule.required().min(10).warning("Name is too short (<10 characters)."),
		rule.required().max(100).error("Name is too long (>100 characters)."),
	];
};

export default {
	name: "course",
	title: "Course",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "localeString",
			validation: (Rule) =>
				Rule.fields({
					// TODO: Check how ultra long names fit in CourseDetailsSidebar
					en: (fieldRule) => titleRules(fieldRule),
					sr: (fieldRule) => titleRules(fieldRule),
				}),
		},
		{
			name: "slug",
			title: "Slug",
			description:
				"Slugs can be customized too, but it's not recommended for uniqueness purposes. Example: this-is-a-slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			// TODO: Add uniqueness checks. Not required this early tho.
			// https://www.sanity.io/docs/slug-type#isUnique-3dd89e75a768
			validation: (Rule) => Rule.required().error("Course must have a slug."),
		},
		{
			name: "author",
			title: "Author",
			type: "reference",
			to: { type: "author" },
			validation: (Rule) =>
				Rule.required().error("Course must have an author."),
		},
		{
			name: "categories",
			title: "Categories",
			description: "Course should have 1-2 categories, 3 at most.",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
			validation: (Rule) =>
				Rule.required()
					.max(3)
					.error("Course must have at least 1 and up to 3 categories."),
		},
		{
			name: "bannerPhoto",
			title: "Course Banner (1920x500)",
			description:
				"Recommended banner dimensions are 1920x500, as of right now.",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) =>
				Rule.required().error("Course must have a banner photo."),
		},
		{
			name: "thumbnail",
			title: "Course Thumbnail",
			description:
				"Course thumbnail does not have dimension requirements, as of right now.",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) =>
				Rule.required().error("Course must have a thumbnail."),
		},
		{
			name: "coursePreview",
			title: "Course Preview",
			description:
				"Important: Only insert video id ({video_id} in example) and not the full link. Example: vimeo.com/{video_id}, vimeo.com/{channel_id}/{video_id}",
			type: "string", // link to video
			validation: (Rule) =>
				Rule.required().error("Course must have a trailer video link."),
		},
		{
			name: "publishedAt",
			title: "Published at",
			description: "Course will be visible only after this time.",
			type: "datetime",
			validation: (Rule) =>
				Rule.required().error("Course must have a set publish date."),
		},
		{
			name: "overview",
			title: "Overview",
			type: "localeBlockContent",
		},
		{
			name: "topics",
			title: "Topics",
			description: "Topics are used to group lectures under a similar theme.",
			type: "array",
			of: [{ type: "topic" }],
			validation: (Rule) =>
				Rule.required().error("Course must have at least 1 topic."),
		},
		{
			name: "duration",
			title: "Duration (minutes)",
			description: "Used for displaying course length in the details page.",
			type: "number",
			validation: (Rule) =>
				Rule.required()
					.min(0)
					.max(3000)
					.error("Course must have a set duration in minutes."),
		},
		{
			name: "requiredCollectionItems",
			title: "Required amount of collection items",
			description:
				"Amount of colelction NFTs user needs to own in order to access this course.",
			type: "number",
			validation: (Rule) =>
				Rule.required()
					.min(0)
					.max(10)
					.error("Course must have a number of required collection items."),
		},
	],

	// Preview in Sanity Studio
	preview: {
		select: {
			title: "title.en",
			author: "author.name",
			media: "thumbnail",
		},
		prepare(selection) {
			const { author } = selection;
			return Object.assign({}, selection, {
				subtitle: author && `by ${author}`,
			});
		},
	},
};
