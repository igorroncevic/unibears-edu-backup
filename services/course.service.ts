import { Course } from '../redux/reducers/course.reducer';
import { sanityClient, urlFor } from '../sanity.config';

const courseFields = `'id': _id, 'slug': slug.current, title, bannerPhoto, thumbnail, coursePreview, publishedAt, overview, duration, lectures, requiredCollectionItems`;
const coursePreviewFields = `'id': _id, 'slug': slug.current, title, thumbnail, overview, "numLectures": count(lectures), requiredCollectionItems`;
const authorFields = `name, profilePhoto`;
const courseLecturesFields = `'id': _id, 'slug': slug.current, title, overview, requiredCollectionItems`;
const lectureFields = `'id': _key, title, overview, source`;
const topicFields = `'id': _key, title`;

export const courseNotFound = {
    title: 'Not Found',
    author: { bio: {} },
    topics: [{ overview: {}, lectures: [{ overview: {} }] }],
    categories: [],
    requiredCollectionItems: 0,
};

export const findAllCourses = async () => {
    const query = `*[_type == "course" && dateTime(now()) > dateTime(publishedAt)] | order(_createdAt desc) {
        ${coursePreviewFields},
        author -> {${authorFields}},
        categories[] -> { name }
      }`;

    const courses: Course[] = await sanityClient.fetch(query);

    return courses.map((course) => _transformCourse(course));
};

export const findCourseBySlug = async (slug: string) => {
    const query = `*[_type == "course" && slug.current == $slug && dateTime(now()) > dateTime(publishedAt)][0]{
        ${courseFields},
        topics[] | order(_createdAt desc) {
            ${topicFields},
            lectures[] | order(_createdAt desc) {${lectureFields}}
        },
        author -> {${authorFields}, title, bio},
        categories[] -> { name }
    }`;

    const course = await sanityClient.fetch(query, { slug });

    return _transformCourse(course);
};

export const getCoursePaths = async () => {
    const query = `*[_type == "course" && dateTime(now()) > dateTime(publishedAt)]{
        'slug': slug.current
    }`;

    const paths = await sanityClient.fetch(query);

    return paths.map((slug: any) => slug.slug);
};

export const getCourseLectures = async (slug: string) => {
    const query = `*[_type == "course" && slug.current == $slug && dateTime(now()) > dateTime(publishedAt)][0]{
        ${courseLecturesFields}, 
        topics[] | order(_createdAt desc) {
            ${topicFields},
            lectures[] | order(_createdAt desc) {${lectureFields}}
        },
        author -> {${authorFields}}
     }`;

    const course = await sanityClient.fetch(query, { slug });

    return _transformCourse(course);
};

const _transformCourse = (course: Course) => {
    // Course was not found
    if (!course) {
        return courseNotFound;
    }

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
        course.publishedAt = new Date(course.publishedAt)
            .toDateString()
            .substring(4);
    }

    // if (course.categories && Array.isArray(course.categories)) {
    // 	course.categories = course.categories.map((category) => category.name); // Retain this for filtering purposes.
    // }

    // TODO: Standardize this format.
    if (course.duration && typeof course.duration === 'number') {
        // Duration is in minutes (defined in schema)
        const hours = Math.floor(course.duration / 60);
        const minutes = course.duration % 60;

        let duration = '';
        if (minutes > 0) {
            duration = `${minutes}min`;
        }

        if (hours > 0) {
            hours === 1
                ? (duration = `${hours}hr ${duration}`)
                : (duration = `${hours}hrs ${duration}`);
        }

        course.duration = duration;
    }

    return course;
};
