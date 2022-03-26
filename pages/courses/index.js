import React from 'react'
import axios from 'axios'
import PageBanner from '@/components/Common/PageBanner'
import baseUrl from '@/utils/baseUrl'
import CourseCard from '@/components/Courses/CourseCard'

const Index = (props) => {
    return (
        <React.Fragment>
            <PageBanner
                pageTitle="Courses"
            />

            <div className="courses-area courses-section pt-100 pb-70">
                <div className="container">
                    <div className="edemy-grid-sorting row align-items-center">
                        <div className="col-lg-8 col-md-6 result-count">
                            <p>We found <span className="count">{props.courses && props.courses.length}</span> courses available for you</p>
                        </div>
                    </div>

                    <div className="row">

                        {props.courses.length ? props.courses.map(course => (
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

export async function getStaticProps() {
    const url = `${baseUrl}/api/v1/courses`
    const response = await axios.get(url)
    return {
        props: {
            courses: response.data.courses
        },
        revalidate: 10 * 60 // Regenerate page every 10 minutes, since it won't update that often.
    }
}

export default Index;