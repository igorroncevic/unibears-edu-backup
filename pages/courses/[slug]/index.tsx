import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { resetIdCounter, Tab, TabList, TabPanel, Tabs } from 'react-tabs';
resetIdCounter();

import { toPlainText } from '@portabletext/react';
import Image from '../../../components/Common/CustomImage';
import PortableText from '../../../components/Common/CustomPortableText';
import { CourseProps } from '../../../components/Courses/CourseCard';
import CoursesCurriculum from '../../../components/Courses/CoursesCurriculum';
import CoursesDetailsSidebar from '../../../components/Courses/CoursesDetailsSidebar';
import Instructor from '../../../components/Courses/Instructor';
import Head from '../../../components/_App/CustomHead';
import Preloader from '../../../components/_App/Preloader';
import { changeLastVisitedCourse } from '../../../redux/actions/course.actions';
import { AppState } from '../../../redux/reducers/reducers';
import {
    courseNotFound,
    findCourseBySlug,
    getCoursePaths,
} from '../../../services/course.service';
import {
    defaultMetadata,
    getMetadata,
    PATH_NAMES,
    Route,
} from '../../../utils/routing';
import { toastErrorImportant } from '../../../utils/toasts';
import { StaticParams } from './lectures';

const Details = ({ course }: CourseProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [t] = useTranslation(['courses', 'toasts']);
    const { langCode } = useSelector((state: AppState) => state.user);
    const [metadata, setMetadata] = useState(defaultMetadata);

    useEffect(() => {
        if (course) {
            if (course.title[langCode] === courseNotFound.title) {
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
                dispatch(changeLastVisitedCourse({ slug: course.slug }));
            }
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
        <div className="courses-details-area pb-100">
            <Head title={metadata.title} description={metadata.description} />

            {/* TODO: Maybe reduce required photo height from 500px to 400px? To make more info on the page visible. */}
            <div className="course-details-banner">
                <Image
                    src={course.bannerPhoto ? course.bannerPhoto : ''}
                    alt={course.title[langCode]}
                    className="course-details-banner-img"
                />
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="courses-details-desc">
                            <Tabs>
                                <TabList>
                                    <Tab>{t('overview')}</Tab>
                                    <Tab>{t('curriculum')}</Tab>
                                    <Tab>{t('instructor')}</Tab>
                                </TabList>

                                <TabPanel>
                                    <div className="courses-overview">
                                        <h3>{t('courseDescription')}</h3>
                                        <PortableText
                                            content={
                                                course.overview
                                                    ? course.overview[langCode]
                                                    : ''
                                            }
                                        />
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <CoursesCurriculum course={course} />
                                </TabPanel>

                                <TabPanel>
                                    <Instructor author={course.author} />
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <CoursesDetailsSidebar course={course} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const slugs = await getCoursePaths();

    const paths = slugs.map((slug: string) => ({
        params: { slug },
    }));

    return {
        paths,
        // TODO: Consider switching to blocking: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
        fallback: true, // If page was not pre-rendered at build time, Next.js will generate that page.
    };
}

export async function getStaticProps({ params }: StaticParams) {
    const course = await findCourseBySlug(params.slug);

    return {
        props: { course },
        revalidate: 10 * 60, // Regenerate page every 10 minutes, since it won't update that often.
    };
}

export default Details;
