export const APP_NAME = "Unibears EDU";

export const PathNames = {
	Index: "/",
	CoursesIndex: "/courses",
	CoursesId: "/courses/[slug]",
	LecturesId: "/courses/[slug]/lectures",
	CoursesIdFilled: (slug) => `/courses/${slug}`,
	LectureCoursesIdFilled: (slug) => `/courses/${slug}/lectures`,
	PrivacyPolicy: "/privacy-policy",
	TermsOfService: "/terms-of-service",
	MintPage: "https://mint.unibears.io"
};

export const PageMetadata = {
	pages: {
		"/": {
			title: {
				en: APP_NAME,
				sr: APP_NAME,
			},
			description: {
				en: "Learn about all about NFTs and their use cases in the real world!",
				sr: "Naučite sve o NFT-ovima i njihovoj primeni u stvarnom svetu!",
			},
		},
		"/courses": {
			title: {
				en: `Courses | ${APP_NAME}`,
				sr: `Kursevi | ${APP_NAME}`,
			},
			description: {
				en: `${APP_NAME} courses on various subjects.`,
				sr: `${APP_NAME} kursevi o različitim temama.`,
			}
		},
		"/courses/[slug]": {
			title: (name) => (name ? `${name} | ${APP_NAME}` : APP_NAME),
			description: (description) =>
				description
					? description
					: "Learn about all about NFTs and their use cases in the real world!",
		},
		"/courses/[slug]/lectures": {
			title: (name) => (name ? `${name} | ${APP_NAME}` : APP_NAME),
			description: (description) =>
				description
					? description
					: "Learn about all about NFTs and their use cases in the real world!",
		},
		"/privacy-policy": {
			title: {
				en: `Privacy Policy | ${APP_NAME}`,
				sr: `Polisa Privatnosti | ${APP_NAME}`,
			},
			description: {
				en: `${APP_NAME} Privacy Policy`,
				sr: `${APP_NAME} Polisa Privatnosti`,
			}
		},
		"/terms-of-service": {
			title: {
				en: `Terms of Service | ${APP_NAME}`,
				sr: `Uslovi Korišćenja | ${APP_NAME}`,
			},
			description: {
				en: `${APP_NAME} Terms of Service`,
				sr: `${APP_NAME} Uslovi Korišćenja`,
			}
		},
	},
};

export const defaultMetadata = {
	title: PageMetadata.pages[PathNames.Index].title["en"],
	description: PageMetadata.pages[PathNames.Index].description["en"],
};

export const getMetadata = (path, componentMetadata = {}, langCode) => {
	let title = "",
		description = "";
	if (PageMetadata.pages[path]) {
		const getTitle = PageMetadata.pages[path].title || defaultMetadata.title;
		const getDescription =
			PageMetadata.pages[path].description || defaultMetadata.description;

		if (typeof getTitle === "function") {
			const titleParam =
				componentMetadata && componentMetadata.title
					? componentMetadata.title
					: "";
			title = getTitle(titleParam);
		} else {
			title = getTitle[langCode];
		}

		if (typeof getDescription === "function") {
			const descriptionParam =
				componentMetadata && componentMetadata.title
					? componentMetadata.title
					: "";
			description = getDescription(descriptionParam);
		} else {
			description = getDescription[langCode];
		}
	} else {
		title = defaultMetadata.title;
		description = defaultMetadata.description;
	}

	return { title, description };
};
