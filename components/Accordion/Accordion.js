import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import {
	findTopicAndLectureIndex,
	setNextAndPreviousLecture,
} from "@/utils/common";
import { PathNames } from "@/utils/routing";
import {
	lectureChange,
	updatePreviousAndNextLecture,
} from "../../redux/actions/course.actions";

function AccordionComponent({ course }) {
	const { langCode } = useSelector(state => state.user);
	const router = useRouter();
	const dispatch = useDispatch();

	const [topics, setTopics] = useState(course.topics);
	const [openTopics, setOpenTopics] = useState([]);
	const [active, setActive] = useState();

	useEffect(() => {
		setTopics(course.topics);
	}, [course]);

	const handleActiveLecture = (activeTopic, lecture) => {
		if (lecture) {
			setActive(lecture);
			setOpenTopics([...openTopics, activeTopic]);
			dispatch(lectureChange(lecture));
			router.push({
				pathname: PathNames.LectureCoursesIdFilled(course.slug),
				query: { active: lecture.id },
			});
		}
	};

	useEffect(() => {
		if (router.isReady) {
			// if router.query.active does not exist, set first lecture from first topic as active
			if (
				!router.query.active &&
				topics.length > 0 &&
				topics[0].lectures?.length > 0
			) {
				handleActiveLecture(topics[0].id, topics[0].lectures[0]);
				setPreviousAndNextLecture(0, 0);
			}

			// read the router active value
			if (active?.id !== router.query.active) {
				const { topicIndex, lectureIndex } = findTopicAndLectureIndex(
					topics,
					router.query.active
				);
				handleActiveLecture(
					topics[topicIndex].id,
					topics[topicIndex].lectures[lectureIndex]
				);
				setPreviousAndNextLecture(topicIndex, lectureIndex);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady]);


	const handleTopicClick = (id) => {
		if (openTopics.includes(id)) {
			const topicsFiltered = openTopics.filter((topicId) => topicId !== id);
			setOpenTopics(topicsFiltered);
		} else {
			setOpenTopics([...openTopics, id]);
		}
	};

	const getLectureClassname = (lecture) => {
		return `lecture-name-duration d-flex justify-content-between
      ${(router.query.active || active.id) === lecture.id ? "active-lecture" : ""}`;
	};

	const setPreviousAndNextLecture = (topicIndex, lectureIndex) => {
		const data = setNextAndPreviousLecture(topics, topicIndex, lectureIndex);
		dispatch(updatePreviousAndNextLecture(data));
	};

	const onLectureClick = (lecture, topicIndex, lectureIndex) => {
		dispatch(lectureChange(lecture));
		setPreviousAndNextLecture(topicIndex, lectureIndex);
	};

	return (
		<div className="accordion-wrapper">
			{topics.length > 0 && active && (
				<Accordion defaultActiveKey={openTopics} alwaysOpen>
					{topics.map((topic, topicIndex) => (
						<Accordion.Item eventKey={topic.id} key={topic.id}>
							<Accordion.Header onClick={() => handleTopicClick(topic.id)}>
								{topic.title[langCode]}
							</Accordion.Header>
							<Accordion.Body>
								{topic.lectures.map((lecture, lectureIndex) => {
									return (
										<Link
											key={lecture.id}
											href={{
												pathname: PathNames.LectureCoursesIdFilled(course.slug),
												query: { active: lecture.id },
											}}
											replace
										>
											<a
												className={getLectureClassname(lecture)}
												onClick={() =>
													onLectureClick(lecture, topicIndex, lectureIndex)
												}
											>
												<span>{lecture.title[langCode]}</span>
												<span>{lecture.duration}</span>
											</a>
										</Link>
									);
								})}
							</Accordion.Body>
						</Accordion.Item>
					))}
				</Accordion>
			)}
		</div>
	);
}

export default AccordionComponent;
