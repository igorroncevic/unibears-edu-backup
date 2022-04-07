import React, { useState } from "react";
import Accordion from "@/components/Accordion/Accordion";
import Lecture from "@/components/Lectures/Lecture";
import { getCoursePaths, getCourseLectures } from "@/services/course.service";

const Lectures = ({ course }) => {
	const [show, setShow] = useState(true);

	return course ? (
		<>
			<div className="lectures-grid shadow min-vh-100 nomargin nopadding bg-light">
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
	) : (
		<>Loading...</>
	);
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

	return { props: { course, auth } };
}

export default Lectures;
