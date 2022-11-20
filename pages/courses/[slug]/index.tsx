import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { resetIdCounter, Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import PortableText from '../../../components/Common/CustomPortableText';
import { CourseProps } from '../../../components/Courses/CourseCard';
import CoursesCurriculum from '../../../components/Courses/CoursesCurriculum';
import CoursesDetailsSidebar from '../../../components/Courses/CoursesDetailsSidebar';
import Instructor from '../../../components/Courses/Instructor';
import Head from '../../../components/_App/CustomHead';
import Preloader from '../../../components/_App/Preloader';
import useCourse from '../../../customHooks/useCourse';
import { getUser } from '../../../redux/selectors';
import {
    findCourseBySlug,
    getCoursePaths,
} from '../../../services/course.service';
import { StaticParams } from './lectures';

resetIdCounter();

function Details({ course }: CourseProps) {
    const [t] = useTranslation(['courses', 'toasts']);
    const { langCode } = useSelector(getUser);
    const [metadata] = useCourse(course);

    if (!course) {
        return <Preloader />;
    }

    return (
        <div className="courses-details-area pb-100">
            <Head title={metadata.title} description={metadata.description} />

            {/* TODO: Maybe reduce required photo height from 500px to 400px? To make more info on the page visible. */}
            <div className="course-details-banner">
                <Image
                    src={course.bannerPhoto ? course.bannerPhoto : ''}
                    layout="fill"
                    objectFit="cover"
                    alt={course.title[langCode]}
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
}

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
