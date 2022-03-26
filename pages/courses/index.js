import React from 'react'
import axios from 'axios'
import PageBanner from '@/components/Common/PageBanner'
import baseUrl from '@/utils/baseUrl'
import CourseCard from '@/components/Courses/CourseCard'

const Index = ({ courses }) => {
    // console.log(courses);

    return (
        <React.Fragment>
            <PageBanner
                pageTitle="Courses"
            />

            <div className="courses-area courses-section pt-100 pb-70">
                <div className="container">
                    <div className="edemy-grid-sorting row align-items-center">
                        <div className="col-lg-8 col-md-6 result-count">
                            <p>We found <span className="count">{courses && courses.length}</span> courses available for you</p>
                        </div>
                    </div>

                    <div className="row">

                        {courses.length ? courses.map(course => (
                            <CourseCard {...course} key={course.id} />
                        )) : (
                            <h1>Not Found</h1>
                        )}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

Index.getInitialProps = async () => {
    const url = `${baseUrl}/api/v1/courses`
    const response = await axios.get(url)
    return response.data
}

export default Index;