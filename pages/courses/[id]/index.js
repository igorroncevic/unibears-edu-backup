import React from 'react'
import CoursesDetailsSidebar from '@/components/Courses/CoursesDetailsSidebar'
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from 'react-tabs'
resetIdCounter()
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import CoursesCurriculum from '@/components/Courses/CoursesCurriculum'

const Details = ({ course, user }) => {
    return (
        <div className="courses-details-area pb-100">
            <div className="courses-details-image">
                <img src={course.coverPhoto} alt={course.title} />
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
                                                        <img src={`${course.user.profilePhoto ? course.user.profilePhoto : "/images/advisor/advisor2.jpg"}`} alt={course.user.name} />
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
                        <CoursesDetailsSidebar {...course} loggedInUser={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}

Details.auth = {
    role: 'smh'
};

Details.getInitialProps = async (ctx) => {
    const { id } = ctx.query
    const url = `${baseUrl}/api/v1/courses/course/${id}`
    const response = await axios.get(url);
    // TODO Here you can attach unibears count required for this course
    // Details.auth.count = 10;
    Details.metadata = {
        title: response.data.course.title || "",
        description: response.data.course.overview || "",
    };
    return response.data
}

export default Details
