/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

import PageBanner from "@/components/Common/PageBanner";
import CourseCard from "@/components/Courses/CourseCard";

import { findAllCourses } from "services/course.service";
import { findAllCategories, categoriesFilterTranslated, allCategoriesFilterTranslated } from "services/category.service";

const Index = ({ courses, categories }) => {
	const { langCode } = useSelector(state => state.user);

	const [allCourses, setAllCourses] = useState(courses);
	const [displayCourses, setDisplayCourses] = useState(courses);

	const [allCategories, setAllCategories] = useState(["All", ...categoriesFilterTranslated(categories, langCode)]);
	const [categoryFilter, setCategoryFilter] = useState("All");

	useEffect(() => {
		const allCategoriesFilterTemp = allCategoriesFilterTranslated(langCode);

		const allCategoriesTemp = [allCategoriesFilterTemp, ...categoriesFilterTranslated(categories, langCode)];

		setAllCategories([...allCategoriesTemp]);
		setCategoryFilter(allCategoriesFilterTemp);
	}, []);

	useEffect(() => {
		switch (categoryFilter) {
			case allCategoriesFilterTranslated(langCode):
				setDisplayCourses(allCourses);
				break;
			default:
				const filtered = allCourses.filter(course => course.categories.some(category => category[langCode] == categoryFilter));
				setDisplayCourses(filtered);
				break;
		}
	}, [categoryFilter]);

	const handleCategorySelect = (e) => {
		setCategoryFilter(e);
	}

	return (
		<React.Fragment>
			<PageBanner
				pageTitle="Courses"
			/>

			<div className="courses-area courses-section pt-100 pb-70">
				<div className="container">
					<div className="edemy-grid-sorting row align-items-center">
						<div className="col-lg-8 col-md-6 result-count">
							<p>We found <span className="count">{displayCourses && displayCourses.length ? displayCourses.length : 0}</span> courses available for you</p>
						</div>
						<div className="col-lg-4 col-md-6 categories-filter">
							<span>Category:</span>
							<Dropdown className="dropdown-button-custom" onSelect={handleCategorySelect}>
								<Dropdown.Toggle>{categoryFilter}</Dropdown.Toggle>
								<Dropdown.Menu>
									{allCategories.map(category => (
										<Dropdown.Item key={category} eventKey={category}>
											{category}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>

					<div className="row">
						{displayCourses.length ? displayCourses.map(course => (
							<CourseCard course={course} key={course.id} />
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
	const courses = await findAllCourses();
	const categories = await findAllCategories();

	return {
		props: { courses, categories },
		revalidate: 10 * 60 // Regenerate page every 10 minutes, since it won't update that often.
	}
}

export default Index;