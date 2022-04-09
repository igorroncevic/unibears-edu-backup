import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import { PathNames } from "@/utils/routing";

const CoursesCurriculum = ({ courseSlug, lectures }) => {
	const [t] = useTranslation("courses");

	return (
		<div className="courses-curriculum">
			<h3>{t("lectures")}</h3>
			{/* TODO: Fix now with changed model that has topics in it. */}
			{lectures ? (
				<ul>
					{lectures.map(lecture => (
						<li key={lecture.id}>
							<Link href={PathNames.LecturesId} as={PathNames.LectureCoursesIdFilled(courseSlug)}>
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
				<h3>{t("noLectures")}</h3>
			)}

		</div>
	)
}

export default CoursesCurriculum
