import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import Image from "@/components/Common/CustomImage";
import PortableText from "@/components/Common/CustomPortableText";

import { PathNames } from "@/utils/routing"
import { displayCategories } from "@/services/category.service";

const CourseCard = ({ course }) => {
	const { langCode } = useSelector(state => state.user);

	return (
		<div className="col-lg-6 col-md-12">
			<div className="single-courses-box">
				<div className="courses-image">
					<Link href={PathNames.CoursesId} as={PathNames.CoursesIdFilled(course.slug)}>
						<a className="d-block image">
							<Image
								src={course.thumbnail ? course.thumbnail : ""}
								alt={course.title[langCode]}
							/>
						</a>
					</Link>
				</div>
				<div className="courses-content">
					<div className="course-author d-flex align-items-center">
						<Image
							src={course.author && course.author.profilePhoto ? course.author.profilePhoto : "/images/user1.jpg"}
							className="rounded-circle"
							alt={course.author && course.author.name ? course.author.name : "Author Profile Picture"}
						/>
						<span className="course-author-name">{course.author.name}</span>
					</div>

					<h3>
						<Link href={PathNames.CoursesId} as={PathNames.CoursesIdFilled(course.slug)}>
							<a>{course.title[langCode]}</a>
						</Link>
					</h3>

					<PortableText content={course.overview ? course.overview[langCode] : ""} />
					<ul className="courses-box-footer d-flex justify-content-between align-items-center">
						<li>
							{/* TODO: Add appropriate icon */}
							<i className='flaticon-agenda'></i> {course.categories ? displayCategories(course.categories, langCode) : ""}
						</li>
						<li>
							{/* TODO: Add some more data to make design look nicer */}
							<i className='flaticon-agenda'></i> Required Unibears: {course.requiredUnibearsCount}
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default CourseCard
