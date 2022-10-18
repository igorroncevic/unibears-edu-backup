const LANDING_PAGE_ROUTE = "/";
const COURSES_ROUTE = "/courses";
const COURSE_ROUTE = "/courses/[slug]";
const LECTURES_ROUTE = "/courses/[slug]/lectures";
const PRIVACY_POLICY_ROUTE = "/privacy-policy";
const TERMS_OF_SERVICE_ROUTE = "/terms-of-service";

export type Route =
	| typeof LANDING_PAGE_ROUTE
	| typeof COURSES_ROUTE
	| typeof COURSE_ROUTE
	| typeof LECTURES_ROUTE
	| typeof PRIVACY_POLICY_ROUTE
	| typeof TERMS_OF_SERVICE_ROUTE;

export interface ComponentMetadata {
	title: string;
	description: string;
}

interface LanguageTranslation {
	en: string;
	sr: string;
}

interface PageMetadata {
	title: LanguageTranslation;
	description: LanguageTranslation;
}

interface PageMetadataFunction {
	title: (name: string) => string;
	description: (description: string) => string;
}

export const APP_NAME = "App EDU";

const landingPageData: PageMetadata = {
	title: {
		en: APP_NAME,
		sr: APP_NAME,
	},
	description: {
		en: "Learn about all about NFTs and their use cases in the real world!",
		sr: "Naučite sve o NFT-ovima i njihovoj primeni u stvarnom svetu!",
	},
};

const coursesPageData: PageMetadata = {
	title: {
		en: `Courses | ${APP_NAME}`,
		sr: `Kursevi | ${APP_NAME}`,
	},
	description: {
		en: `${APP_NAME} courses on various subjects.`,
		sr: `${APP_NAME} kursevi o različitim temama.`,
	},
};

const coursePageData: PageMetadataFunction = {
	title: (name: string) => (name ? `${name} | ${APP_NAME}` : APP_NAME),
	description: (description: string) =>
		description
			? description
			: "Learn about all about NFTs and their use cases in the real world!",
};

const lecturesPageData: PageMetadataFunction = {
	title: (name: string) => (name ? `${name} | ${APP_NAME}` : APP_NAME),
	description: (description: string) =>
		description
			? description
			: "Learn about all about NFTs and their use cases in the real world!",
};

const privacyPolicyPageData: PageMetadata = {
	title: {
		en: `Privacy Policy | ${APP_NAME}`,
		sr: `Polisa Privatnosti | ${APP_NAME}`,
	},
	description: {
		en: `${APP_NAME} Privacy Policy`,
		sr: `${APP_NAME} Polisa Privatnosti`,
	},
};

const termsOfServicePageData: PageMetadata = {
	title: {
		en: `Terms of Service | ${APP_NAME}`,
		sr: `Uslovi Korišćenja | ${APP_NAME}`,
	},
	description: {
		en: `${APP_NAME} Terms of Service`,
		sr: `${APP_NAME} Uslovi Korišćenja`,
	},
};

const getPageMetadata = (route: Route): PageMetadata | PageMetadataFunction => {
	switch (route) {
		case LANDING_PAGE_ROUTE:
			return landingPageData;
		case COURSES_ROUTE:
			return coursesPageData;
		case COURSE_ROUTE:
			return coursePageData;
		case LECTURES_ROUTE:
			return lecturesPageData;
		case PRIVACY_POLICY_ROUTE:
			return privacyPolicyPageData;
		case TERMS_OF_SERVICE_ROUTE:
			return termsOfServicePageData;
		default:
			landingPageData;
	}
	return landingPageData;
};

export const PATH_NAMES = {
	Index: "/",
	CoursesIndex: "/courses",
	CoursesId: "/courses/[slug]",
	LecturesId: "/courses/[slug]/lectures",
	CoursesIdFilled: (slug: string) => `/courses/${slug}`,
	LectureCoursesIdFilled: (slug: string) => `/courses/${slug}/lectures`,
	PrivacyPolicy: "/privacy-policy",
	TermsOfService: "/terms-of-service",
	// change to new url
	MintPage: "https://mint.unibears.io",
	AppDomain: "https://unibears.edu",
};

export const defaultMetadata = {
	title: landingPageData.title.en,
	description: landingPageData.description.en,
};

export const getMetadata = (
	path: Route,
	componentMetadata: ComponentMetadata | undefined,
	langCode: "en" | "sr"
) => {
	let { title, description } = defaultMetadata;
	const { title: getTitle, description: getDescription } = getPageMetadata(
		path
	) as PageMetadataFunction;

	if (typeof getTitle === "function") {
		const titleParam = componentMetadata?.title || "";
		title = getTitle(titleParam);
	} else {
		title = getTitle[langCode];
	}

	if (typeof getDescription === "function") {
		const descriptionParam = componentMetadata?.description || "";
		description = getDescription(descriptionParam);
	} else {
		description = getDescription[langCode];
	}

	return { title, description };
};
