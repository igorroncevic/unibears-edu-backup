import React, { useState, useEffect } from 'react';
import Head from '@/components/_App/CustomHead';
import axios from 'axios';
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from '@/components/Common/CustomImage';
import CoursesDetailsSidebar from '@/components/Courses/CoursesDetailsSidebar';
import baseUrl from '@/utils/baseUrl';
import CoursesCurriculum from '@/components/Courses/CoursesCurriculum';
import { defaultMetadata, getMetadata, PathNames } from '@/utils/routing';
resetIdCounter();

const Details = ({ course, user }) => {
    const [metadata, setMetadata] = useState(defaultMetadata)

    useEffect(() => {
        const componentMetadata = {
            title: course.title,
            description: course.overview
        };

        const { title, description } = getMetadata(PathNames.CoursesId, componentMetadata);
        setMetadata({ title, description });
    }, [course])

    return (
        <div className="courses-details-area pb-100">
            <Head
                title={metadata.title}
                description={metadata.description}
            />

            <Image src={course.coverPhoto} alt={course.title} />

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
                                        <p>{course.overview}</p>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <CoursesCurriculum videos={course.videos} />
                                </TabPanel>

                                {/* Instructor info */}
                                <TabPanel>
                                    <div className="courses-instructor">
                                        <div className="single-advisor-box">
                                            <div className="row align-items-center">
                                                <div className="col-lg-4 col-md-4">
                                                    <div className="advisor-image">
                                                        <Image src={`${course.user.profilePhoto ? course.user.profilePhoto : "/images/advisor/advisor2.jpg"}`} alt={course.user.name} />
                                                    </div>
                                                </div>

                                                <div className="col-lg-8 col-md-8">
                                                    <div className="advisor-content">
                                                        <h3>{course.user.name}</h3>
                                                        <span className="sub-title">{course.user.designation || "Empty"}</span>
                                                        <p>{course.user.about || "Empty"}</p>

                                                        <ul className="social-link">
                                                            <li>
                                                                <a href={course.user.fb_url || '#'} className="d-block" rel='noreferrer' target="_blank">
                                                                    <i className='bx bxl-facebook'></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href={course.user.tw_url || '#'} className="d-block" rel='noreferrer' target="_blank">
                                                                    <i className='bx bxl-twitter'></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href={course.user.insta_url || '#'} className="d-block" rel='noreferrer' target="_blank">
                                                                    <i className='bx bxl-instagram'></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href={course.user.in_url || '#'} className="d-block" rel='noreferrer' target="_blank">
                                                                    <i className='bx bxl-linkedin'></i>
                                                                </a>
                                                            </li>
                                                        </ul>
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
                        <CoursesDetailsSidebar {...course} />
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
    const url = `${baseUrl}/api/v1/courses`
    const response = await axios.get(url)
    const paths = response.data.courses.map(course => ({
        params: { id: course.id },
    }));

    return {
        paths,
        fallback: true // If page was not pre-rendered at build time, Next.js will generate that page.
    }
}

export async function getStaticProps({ params }) {
    const { id } = params // matching what's returned in getStaticPaths
    const url = `${baseUrl}/api/v1/courses/course/${id}`
    const response = await axios.get(url);
    // console.log(response.data);
    // TODO Here you can attach unibears count required for this course
    // Details.auth.count = 10;
    return {
        props: {
            course: response.data.course,
        },
        revalidate: 10 * 60 // Regenerate page every 10 minutes, since it won't update that often. 
    }
}

export default Details
