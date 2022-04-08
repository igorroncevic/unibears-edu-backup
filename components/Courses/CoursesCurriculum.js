import React from "react"
import Link from "next/link"

import { PathNames } from "@/utils/routing"

const CoursesCurriculum = ({ courseSlug, lectures }) => {
	return (
		<div className="courses-curriculum">
			<h3>Lectures</h3>
			{/* TODO: Fix now with changed model that has topics in it. */}
			{lectures ? (
				<ul>
					{lectures.map(lecture => (
						<li key={lecture.id}>
							<Link href={PathNames.LecturesId} as={PathNames.LecturesIdFilled(courseSlug, lecture.id)}>
								<a
									className="d-flex justify-content-between align-items-center"
									onClick={e => e.preventDefault()}
								>
									<span className="courses-name">{lecture.title[langCode]}</span>
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
