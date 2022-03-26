import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import { PathNames } from '@/utils/routing'

/*
import { getUnibearsCount } from 'redux/actions/auth.actions'; 
import { useSelector } from 'react-redux';
*/

const Courses = ({ courses }) => {
    // TODO: Call Sanity with this parameter
    // const { unibearsCount } = useSelector(state => state.unibearsCount);

    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner
                pageTitle="Courses"
            />

            <div className="courses-area courses-section pt-100 pb-70">
                <div className="container">
                    <div className="edemy-grid-sorting row align-items-center">
                        <div className="col-lg-8 col-md-6 result-count">
                            <p>We found <span className="count">{courses.length}</span> courses available for you</p>
                        </div>
                    </div>

                    <div className="row">

                        {courses ? courses.map(course => (
                            <div className="col-lg-4 col-md-6" key={course.id}>
                                <div className="single-courses-box">
                                    <div className="courses-image">
                                        {/* use slugs */}
                                        <Link href={PathNames.CoursesId} as={PathNames.CoursesIdFilled(course.id)}>
                                            <a className="d-block image">
                                                <img src={course.profilePhoto} alt={course.title} />
                                            </a>
                                        </Link>
                                    </div>

                                    <div className="courses-content">
                                        <div className="course-author d-flex align-items-center">
                                            <img src={`${course.user.profilePhoto ? course.user.profilePhoto : "/images/user1.jpg"}`} className="rounded-circle" alt={course.user.name} />
                                            <span>{course.user.name}</span>
                                        </div>

                                        <h3 title={course.title}>
                                            <Link href={PathNames.CoursesId} as={PathNames.CoursesIdFilled(course.id)}>
                                                <a>{course.title.slice(0, 21).trim()}...</a>
                                            </Link>
                                        </h3>

                                        <p>{course.overview.slice(0, 100)}...</p>

                                        <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                                            <li>
                                                <i className='flaticon-agenda'></i> {parseInt(course.lessons)} Lessons
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <h2>Empty</h2>
                        )}

                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

Courses.getInitialProps = async () => {
    const url = `${baseUrl}/api/v1/courses/homepage-courses`
    const response = await axios.get(url)
    return response.data
}

// TODO: Probably not the place to put it, maybe only on login.
/* export const getServerSideProps = wrapper.getServerSideProps(async({ req, store }) => {
    await store.dispatch(getUnibearsCount());
}); */

export default Courses