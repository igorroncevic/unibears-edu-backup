import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import Head from "@/components/_App/CustomHead";
import Accordion from "@/components/Accordion/Accordion";
import Lecture from "@/components/Lectures/Lecture";
import Preloader from "@/components/_App/Preloader";

import { toPlainText } from "@portabletext/react";
import { getCoursePaths, getCourseLectures, courseNotFound } from "@/services/course.service";
import { defaultMetadata, getMetadata, PathNames } from "@/utils/routing";
import { toastErrorImportant } from "@/utils/toasts";

const Lectures = ({ course }) => {
	const router = useRouter();
	const [t] = useTranslation("toasts");
	const { langCode } = useSelector(state => state.user);

	const [show, setShow] = useState(true);
	const [metadata, setMetadata] = useState(defaultMetadata);

	// TODO: Perhaps set title to be current lecture title? A bit complicated because active lecture is set in a component.
	useEffect(() => {
		if (course?.title === courseNotFound.title) {
			if (router.isReady) {
				toastErrorImportant(t("error.courseUnavailable", { ns: "toasts" }));
				router.push(PathNames.CoursesIndex);
			}
		} else {
			const componentMetadata = {
				title: course.title[langCode],
				description: course.overview ? toPlainText(course.overview[langCode]) : defaultMetadata.description
			};

			const { title, description } = getMetadata(PathNames.CoursesId, componentMetadata);
			setMetadata({ title, description });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [course, langCode, router])

	if (!course || (course && course.title === courseNotFound.title)) {
		return <Preloader />
	}

	return (
		<>
			<Head
				title={metadata.title}
				description={metadata.description}
			/>
			<div className="lectures-grid shadow min-vh-100 nomargin pb-5 bg-light">
				{show && (
					<div className="accordion-grid-item min-w-400">
						<Accordion course={course} />
					</div>
				)}
				<div className="nopadding">
					<div style={{ transform: `rotate(${show ? "180deg" : "0deg"})` }}>
						<button
							onClick={() => setShow((prevState) => !prevState)}
							className="btn btn-light"
							type="button"
						>
							<i className="flaticon-right-chevron"></i>
						</button>
					</div>
				</div>
				<div className="lecture-grid-item">
					<Lecture topics={course.topics} />
				</div>
			</div>
		</>
	)
}

export async function getStaticPaths() {
	const slugs = await getCoursePaths();

	const paths = slugs.map((slug) => ({
		params: { slug },
	}));

	return {
		paths,
		fallback: true, // If page was not pre-rendered at build time, Next.js will generate that page.
	};
}

export async function getStaticProps({ params }) {
	const course = await getCourseLectures(params.slug);

	const auth = {
		requiredUnibearsCount: course.requiredUnibearsCount,
	};

	return { props: { course, auth }, revalidate: 10 * 60 };
}

export default Lectures;
