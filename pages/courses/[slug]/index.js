import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useRouter } from "next/router";
resetIdCounter();

import Head from "@/components/_App/CustomHead";
import Image from "@/components/Common/CustomImage";
import PortableText from "@/components/Common/CustomPortableText";
import CoursesDetailsSidebar from "@/components/Courses/CoursesDetailsSidebar";
import CoursesCurriculum from "@/components/Courses/CoursesCurriculum";
import Preloader from "@/components/_App/Preloader";
import AuthorSocials from "@/components/Courses/AuthorSocials";

import { blockContentToPlainText } from "react-portable-text";
import { defaultMetadata, getMetadata, PathNames } from "@/utils/routing";
import { getCoursePaths, findCourseBySlug, courseNotFound } from "@/services/course.service";
import { toastErrorImportant } from "@/utils/toasts";
import { changeLastVisitedCourse } from "@/redux/actions/course.actions";

const Details = ({ course }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [t] = useTranslation(["courses", "toasts"]);
	const { langCode } = useSelector(state => state.user);
	const [metadata, setMetadata] = useState(defaultMetadata)

	useEffect(() => {
		if (course) {
			if (course.title === courseNotFound.title) {
				if (router.isReady) {
					toastErrorImportant(t("error.courseUnavailable", { ns: "toasts" }));
					router.push(PathNames.CoursesIndex);
				}
			} else {
				const componentMetadata = {
					title: course.title[langCode],
					description: course.overview ? blockContentToPlainText(course.overview[langCode]) : defaultMetadata.description
				};

				const { title, description } = getMetadata(PathNames.CoursesId, componentMetadata);
				setMetadata({ title, description });
				dispatch(changeLastVisitedCourse({ slug: course.slug }));
			}
		}
	}, [course, langCode, router])

	if (!course || (course && course.title === courseNotFound.title)) {
		return <Preloader />
	}

	return (
		<div className="courses-details-area pb-100">
			<Head
				title={metadata.title}
				description={metadata.description}
			/>

			{/* TODO: Maybe reduce required photo height from 500px to 400px? To make more info on the page visible. */}
			<div className="course-details-banner">
				<Image src={course.bannerPhoto ? course.bannerPhoto : ""} alt={course.title[langCode]} />
			</div>

			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-md-12">
						<div className="courses-details-desc">
							<Tabs>
								<TabList>
									<Tab>{t("overview")}</Tab>
									<Tab>{t("curriculum")}</Tab>
									<Tab>{t("instructor")}</Tab>
								</TabList>

								<TabPanel>
									<div className="courses-overview">
										<h3>{t("courseDescription")}</h3>
										<PortableText content={course.overview ? course.overview[langCode] : ""} />
									</div>
								</TabPanel>

								<TabPanel>
									<CoursesCurriculum course={course} />
								</TabPanel>

								{/* TODO: Extract Instructor info to a separate component */}
								<TabPanel>
									<div className="courses-instructor">
										<div className="single-advisor-box">
											<div className="row align-items-center">
												<div className="col-lg-4 col-md-4">
													<div className="advisor-image">
														<Image src={`${course.author.profilePhoto ? course.author.profilePhoto : "/images/advisor/advisor2.jpg"}`} alt={course.author.name} />
													</div>
												</div>

												<div className="col-lg-8 col-md-8">
													<div className="advisor-content">
														<h3>{course.author.name}</h3>
														<span className="sub-title">{course.author.title || ""}</span>
														<PortableText
															content={course.author.bio[langCode]}
														/>

														{/* <AuthorSocials/> */}
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
						<CoursesDetailsSidebar course={course} />
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getStaticPaths() {
	const slugs = await getCoursePaths();

	const paths = slugs.map(slug => ({
		params: { slug },
	}));

	return {
		paths,
		// TODO: Consider switching to blocking: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
		fallback: true // If page was not pre-rendered at build time, Next.js will generate that page.
	}
}

export async function getStaticProps({ params }) {
	const course = await findCourseBySlug(params.slug);

	return {
		props: { course },
		revalidate: 10 * 60 // Regenerate page every 10 minutes, since it won't update that often. 
	}
}

export default Details
