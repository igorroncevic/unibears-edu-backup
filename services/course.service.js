import moment from 'moment';

import { sanityClient, urlFor } from 'sanity.config';

const coursePreviewFields = `'id': _id, slug, title, thumbnail, overview, "numLectures": count(lectures)`
const courseFields = `'id': _id, slug, title, bannerPhoto, thumbnail, coursePreview, publishedAt, overview, duration, lectures`
const authorFields = `name, profilePhoto`

export const findAllCourses = async () => {
    const query = `*[_type == "course"]{
        ${coursePreviewFields},
        author -> {${authorFields}}
      }`

    const courses = await sanityClient.fetch(query);

    return courses.map(course => _transformCourse(course));
}

export const findCourseBySlug = async (slug) => {
    const query = `*[_type == "course" && slug.current == "${slug}"][0]{
        ${courseFields},
        author -> {${authorFields}, title, bio}
    }`;

    const course = await sanityClient.fetch(query);

    return _transformCourse(course);
}

export const getCoursePaths = async () => {
    const query = `*[_type == "course"]{
        slug
    }`;

    const slugs = await sanityClient.fetch(query);

    // Because it is nested like [{ slug: {...} }, ...]
    return slugs.map(slug => slug.slug.current);
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

    if (course.slug) {
        course.slug = course.slug.current;
    }

    // TODO: Standardize this format.
    if (course.publishedAt) {
        course.publishedAt = moment(course.publishedAt).format("Do MMM YYYY");
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
