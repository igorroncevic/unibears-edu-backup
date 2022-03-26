export const APP_NAME = "Unibears EDU";

export const PathNames = {
    Index: "/",
    CoursesIndex: "/courses",
    CoursesId: "/courses/[id]",
    CoursesIdFilled: (id) => `/courses/${id}`,
    PrivacyPolicy: "/privacy-policy",
    TermsOfService: "/terms-of-service",
}

export const PageMetadata = {
    pages: {
        "/": {
            title: APP_NAME,
            description: "Learn about all about NFTs and their use cases in the real world!"
        },
        "/courses": {
            title: `Courses | ${APP_NAME}`,
            description: `${APP_NAME} courses on various subjects.`
        },
        "/courses/[id]": {
            title: (name) => name ? `${name} | ${APP_NAME}` : APP_NAME,
            description: description => description ? description : "Learn about all about NFTs and their use cases in the real world!"
        },
        "/privacy-policy": {
            title: `Privacy Policy | ${APP_NAME}`,
            description: `${APP_NAME} Privacy Policy`
        },
        "/terms-of-service": {
            title: `Terms of Service | ${APP_NAME}`,
            description: `${APP_NAME} Terms of Service`
        }
    }
};

export const defaultMetadata = {
    title: PageMetadata.pages[PathNames.Index].title,
    description: PageMetadata.pages[PathNames.Index].description
}

export const getMetadata = (path, componentMetadata = {}) => {
    let title = "", description = "";
    if (PageMetadata.pages[path]) {
        const getTitle = PageMetadata.pages[path].title || defaultMetadata.title;
        const getDescription = PageMetadata.pages[path].description || defaultMetadata.description;

        if (typeof getTitle === 'function') {
            const titleParam = componentMetadata && componentMetadata.title ? componentMetadata.title : "";
            title = getTitle(titleParam);
        } else {
            title = getTitle;
        }

        if (typeof getDescription === 'function') {
            const descriptionParam = componentMetadata && componentMetadata.title ? componentMetadata.title : "";
            description = getDescription(descriptionParam);
        } else {
            description = getDescription;
        }
    } else {
        title = defaultMetadata.title;
        description = defaultMetadata.description;
    }

    return { title, description };
}
