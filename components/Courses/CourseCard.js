import React from 'react'
import Link from 'next/link'

import { PathNames } from '@/utils/routing'

const CourseCard = ({
    id, title, price, overview, profilePhoto, lessons, user
}) => {
    return (
        <div className="col-lg-6 col-md-12">
            <div className="single-courses-box">
                <div className="courses-image">
                    <Link href={PathNames.CoursesId} as={PathNames.CoursesIdFilled(id)}>
                        <a className="d-block image">
                            <img src={profilePhoto} alt={title} />
                        </a>
                    </Link>
                </div>
                <div className="courses-content">
                    <div className="course-author d-flex align-items-center">
                        <img src={`${user.profilePhoto ? user.profilePhoto : "/images/user1.jpg"}`} className="rounded-circle" alt={user.name} />
                        <span>{user.name}</span>
                    </div>

                    <h3>
                        <Link href={PathNames.CoursesId} as={PathNames.CoursesIdFilled(id)}>
                            <a>{title}</a>
                        </Link>
                    </h3>

                    <p>{overview.slice(0, 190).trim()}...</p>
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                        <li>
                            <i className='flaticon-agenda'></i> {parseInt(lessons)} Lessons
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
