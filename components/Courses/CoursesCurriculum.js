import React from 'react'
import Link from 'next/link'

import { PathNames } from '@/utils/routing'

const CoursesCurriculum = ({ lectures }) => {
    return (
        <div className="courses-curriculum">
            <h3>Lectures</h3>
            {lectures ? (
                <ul>
                    {lectures.map(lecture => (
                        <li key={lecture.id}>
                            <Link href={PathNames.CoursesIndex}>
                                <a
                                    className="d-flex justify-content-between align-items-center"
                                    onClick={e => e.preventDefault()}
                                >
                                    <span className="courses-name">{lecture.title}</span>
                                    <div className="courses-meta">
                                        <span className="status locked"><i className="flaticon-password"></i></span>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <h3>No Lectures</h3>
            )}

        </div>
    )
}

export default CoursesCurriculum
