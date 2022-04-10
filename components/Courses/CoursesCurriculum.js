import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import { PathNames } from "@/utils/routing";
import { useSelector } from "react-redux";

const CoursesCurriculum = ({ course }) => {
	const [t] = useTranslation("courses");
	const { langCode } = useSelector((state) => state.user);
	const { unibersCount } = useSelector((state) => state.auth);

	return (
		<div className="courses-curriculum">
			{course?.topics?.map(topic => {
				return <><h3>{topic.title[langCode]}</h3>
					<ul>
						{topic.lectures?.map(lecture => (
							<li key={lecture.id}>
								<Link href={{
									pathname: PathNames.LectureCoursesIdFilled(course.slug),
									query: { active: lecture.id },
								}}>
									<a
										className="d-flex justify-content-between align-items-center"
									>
										<span className="courses-name">{lecture.title[langCode]}</span>
										<div className="courses-meta">
											{unibersCount < course.requiredUnibearsCount &&
											<span className="status locked"> <i className="flaticon-password"></i></span>
											}
										</div>
									</a>
								</Link>
							</li>
						))}
					</ul>
				</>
			})
			}
			{!course?.topics && <h3>{t("noLectures")}</h3>}
		</div>
	)
}

export default CoursesCurriculum
