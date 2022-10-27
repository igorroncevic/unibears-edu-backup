import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { toPlainText } from '@portabletext/react';
import AccordionComponent from '../../../../components/Accordion/Accordion';
import { CourseProps } from '../../../../components/Courses/CourseCard';
import Lecture from '../../../../components/Lectures/Lecture';
import Head from '../../../../components/_App/CustomHead';
import Preloader from '../../../../components/_App/Preloader';
import { AppState } from '../../../../redux/store';
import {
    courseNotFound,
    getCourseLectures,
    getCoursePaths,
} from '../../../../services/course.service';
import {
    defaultMetadata,
    getMetadata,
    PATH_NAMES,
    Route,
} from '../../../../utils/routing';
import { toastErrorImportant } from '../../../../utils/toasts';

export interface StaticParams {
    params: { slug: string };
}

const Lectures = ({ course }: CourseProps) => {
    const router = useRouter();
    const [t] = useTranslation('toasts');
    const { langCode } = useSelector((state: AppState) => state.user);

    const [show, setShow] = useState(true);
    const [metadata, setMetadata] = useState(defaultMetadata);

    // TODO: Perhaps set title to be current lecture title? A bit complicated because active lecture is set in a component.
    useEffect(() => {
        if (course?.title[langCode] === courseNotFound.title) {
            if (router.isReady) {
                toastErrorImportant(
                    t('error.courseUnavailable', { ns: 'toasts' })
                );
                router.push(PATH_NAMES.CoursesIndex);
            }
        } else {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course, langCode, router]);

    if (
        !course ||
        (course && course.title[langCode] === courseNotFound.title)
    ) {
        return <Preloader />;
    }

    return (
        <>
            <Head title={metadata.title} description={metadata.description} />
            <div className="lectures-grid shadow min-vh-100 nomargin pb-5 bg-light">
                {show && (
                    <div className="accordion-grid-item min-w-400">
                        <AccordionComponent course={course} />
                    </div>
                )}
                <div className="nopadding">
                    <div
                        style={{
                            transform: `rotate(${show ? '180deg' : '0deg'})`,
                        }}
                    >
                        <button
                            onClick={() =>
                                setShow((prevState: boolean) => !prevState)
                            }
                            className="btn btn-light"
                            type="button"
                        >
                            <i className="flaticon-right-chevron"></i>
                        </button>
                    </div>
                </div>
                <div className="lecture-grid-item">
                    <Lecture />
                </div>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const slugs = await getCoursePaths();

    const paths = slugs.map((slug: string) => ({
        params: { slug },
    }));

    return {
        paths,
        fallback: true, // If page was not pre-rendered at build time, Next.js will generate that page.
    };
}

export async function getStaticProps({ params }: StaticParams) {
    const course: any = await getCourseLectures(params.slug);

    const auth = {
        requiredCollectionItems: course.requiredCollectionItems,
    };

    return { props: { course, auth }, revalidate: 10 * 60 };
}

export default Lectures;
