import { toPlainText } from '@portabletext/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeLastVisitedCourse,
    Course,
} from '../redux/reducers/course.reducer';
import { getUser } from '../redux/selectors';
import {
    defaultMetadata,
    getMetadata,
    PATH_NAMES,
    Route,
} from '../utils/routing';
import { toastErrorImportant } from '../utils/toasts';

const useCourse = (course: Course) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [t] = useTranslation(['courses', 'toasts']);
    const { langCode } = useSelector(getUser);
    const [metadata, setMetadata] = useState(defaultMetadata);

    useEffect(() => {
        if (course) {
            const componentMetadata = {
                title: course.title[langCode],
                description: course.overview
                    ? toPlainText(course.overview[langCode])
                    : defaultMetadata.description,
            };

            const { title, description } = getMetadata(
                PATH_NAMES.CoursesId as Route,
                componentMetadata,
                langCode
            );
            setMetadata({ title, description });
            dispatch(changeLastVisitedCourse({ slug: course.slug }));
        }

        if (!course && router.isReady) {
            toastErrorImportant(t('error.courseUnavailable', { ns: 'toasts' }));
            router.push(PATH_NAMES.CoursesIndex);
        }
    }, [course, langCode, router, dispatch, t]);
    return [metadata];
};

export default useCourse;
