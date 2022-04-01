import moment from 'moment';

import { sanityClient, urlFor } from 'sanity.config';

const courseFields = `'id': _id, 'slug': slug.current, title, bannerPhoto, thumbnail, coursePreview, publishedAt, overview, duration, lectures`;
const coursePreviewFields = `'id': _id, 'slug': slug.current, title, thumbnail, overview, "numLectures": count(lectures)`;
const authorFields = `name, profilePhoto`;
const courseLecturesFields = `'id': _id, 'slug': slug.current, title, overview`;
const lectureFields = `'id': _key, title, overview, source`;
const topicFields = `'id': _key, title`;

// TODO: Add sorting to queries

export const findAllCourses = async () => {
    const query = `*[_type == "course"]{
        ${coursePreviewFields},
        author -> {${authorFields}},
        categories[] -> { name }
      }`

    const courses = await sanityClient.fetch(query);

    return courses.map(course => _transformCourse(course));
}

export const findCourseBySlug = async (slug) => {
    const query = `*[_type == "course" && slug.current == $slug][0]{
        ${courseFields},
        author -> {${authorFields}, title, bio},
        categories[] -> { name }
    }`;

    const course = await sanityClient.fetch(query, { slug });

    return _transformCourse(course);
}

export const getCoursePaths = async () => {
    const query = `*[_type == "course"]{
        'slug': slug.current
    }`;

    const paths = await sanityClient.fetch(query);

    return paths.map(slug => slug.slug);
}

export const getCourseLectures = async (slug) => {
    const query = `*[_type == "course" && slug.current == $slug][0]{
        ${courseLecturesFields}, 
        topics[]{
            ${topicFields},
            lectures[]{${lectureFields}}
        },
        author -> {${authorFields}}
     }`;

    const course = await sanityClient.fetch(query, { slug });

    return _transformCourse(course);
}

const _transformCourse = (course) => {
    if (!course) return {};

    if (course.thumbnail) {
        course.thumbnail = urlFor(course.thumbnail).url();
    }

    if (course.bannerPhoto) {
        course.bannerPhoto = urlFor(course.bannerPhoto).url();
    }

    if (course.author && course.author.profilePhoto) {
        course.author.profilePhoto = urlFor(course.author.profilePhoto).url();
    }

    // TODO: Standardize this format.
    if (course.publishedAt) {
        course.publishedAt = moment(course.publishedAt).format("Do MMM YYYY");
    }

    if (course.categories && Array.isArray(course.categories)) {
        course.categoriesFilter = course.categories.map(category => category.name); // Retain this for filtering purposes.

        let categories = "";
        for (let i = 0; i < course.categories.length; i++) {
            const categoryName = course.categories[i].name;
            if (i == 0) {
                categories = categoryName;
                continue;
            }
            categories += `, ${categoryName}`;
        }

        course.categories = categories;
    }

    // TODO: Standardize this format.
    if (course.duration && typeof course.duration === "number") {
        // Duration is in minutes (defined in schema)
        const hours = Math.floor(course.duration / 60);
        const minutes = course.duration % 60;

        let duration = "";
        if (minutes > 0) {
            duration = `${minutes}min`;
        }

        if (hours > 0) {
            hours === 1 ?
                duration = `${hours}hr ${duration}` :
                duration = `${hours}hrs ${duration}`;
        }

        course.duration = duration;
    }

    return course;
}
