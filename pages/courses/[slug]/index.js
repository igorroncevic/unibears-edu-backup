import React, { useState, useEffect } from 'react';
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from 'react-tabs';
resetIdCounter();

import Head from '@/components/_App/CustomHead';
import Image from '@/components/Common/CustomImage';
import PortableText from '@/components/Common/CustomPortableText';
import CoursesDetailsSidebar from '@/components/Courses/CoursesDetailsSidebar';
import CoursesCurriculum from '@/components/Courses/CoursesCurriculum';
import Preloader from '@/components/_App/Preloader';

import { defaultMetadata, getMetadata, PathNames } from '@/utils/routing';
import { getCoursePaths, findCourseBySlug } from '@/services/course.service';
import { blockContentToPlainText } from 'react-portable-text';
import AuthorSocials from '@/components/Courses/AuthorSocials';

const Details = ({ course }) => {
    const [metadata, setMetadata] = useState(defaultMetadata)

    useEffect(() => {
        const componentMetadata = {
            title: course.title,
            description: blockContentToPlainText(course.overview)
        };

        const { title, description } = getMetadata(PathNames.CoursesId, componentMetadata);
        setMetadata({ title, description });
    }, [course])

    if (!course) {
        return <Preloader />
    }

    return (
        <div className="courses-details-area pb-100">
            <Head
                title={metadata.title}
                description={metadata.description}
            />

            {/* TODO: Maybe reduce required photo height from 500px to 400px? To make more info on the page visible. */}
            <div className="course-details-banner">
                <Image src={course.bannerPhoto ? course.bannerPhoto : ""} alt={course.title} />
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="courses-details-desc">
                            <Tabs>
                                <TabList>
                                    <Tab>Overview</Tab>
                                    <Tab>Curriculum</Tab>
                                    <Tab>Instructor</Tab>
                                </TabList>

                                <TabPanel>
                                    <div className="courses-overview">
                                        <h3>Course Description</h3>
                                        <PortableText content={course.overview} />
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    {/* TODO: Now model uses topics, that have lectures combined. Fix this. */}
                                    <CoursesCurriculum courseSlug={course.slug} lectures={course.topics} />
                                </TabPanel>

                                {/* TODO: Extract Instructor info to a separate component */}
                                <TabPanel>
                                    <div className="courses-instructor">
                                        <div className="single-advisor-box">
                                            <div className="row align-items-center">
                                                <div className="col-lg-4 col-md-4">
                                                    <div className="advisor-image">
                                                        <Image src={`${course.author.profilePhoto ? course.author.profilePhoto : "/images/advisor/advisor2.jpg"}`} alt={course.author.name} />
                                                    </div>
                                                </div>

                                                <div className="col-lg-8 col-md-8">
                                                    <div className="advisor-content">
                                                        <h3>{course.author.name}</h3>
                                                        <span className="sub-title">{course.author.title || ""}</span>
                                                        <PortableText
                                                            content={course.author.bio}
                                                        />

                                                        {/* <AuthorSocials/> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
    )
}

Details.auth = {
    role: 'smh'
};

export async function getStaticPaths() {
    const slugs = await getCoursePaths();

    const paths = slugs.map(slug => ({
        params: { slug },
    }));

    return {
        paths,
        fallback: true // If page was not pre-rendered at build time, Next.js will generate that page.
    }
}

export async function getStaticProps({ params }) {
    const course = await findCourseBySlug(params.slug);

    // TODO Here you can attach unibears count required for this course
    // Details.auth.count = 10;
    return {
        props: { course },
        revalidate: 10 * 60 // Regenerate page every 10 minutes, since it won't update that often. 
    }
}

export default Details
