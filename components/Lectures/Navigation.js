import {
	lectureChange,
	updatePreviousAndNextLecture,
} from "@/redux/actions/course.actions";
import {
	findTopicAndLectureIndex,
	setNextAndPreviousLecture,
} from "@/utils/common";
import { PathNames } from "@/utils/routing";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Navigation({ topics }) {
	const previous = useSelector((state) => state.course.activeLecture?.previous);
	const next = useSelector((state) => state.course.activeLecture?.next);

	const dispatch = useDispatch();

	const onNavigationClick = (lecture) => {
		const { topicIndex, lectureIndex } = findTopicAndLectureIndex(
			topics,
			lecture.id
		);
		dispatch(lectureChange(topics[topicIndex].lectures[lectureIndex]));
		const data = setNextAndPreviousLecture(topics, topicIndex, lectureIndex);
		dispatch(updatePreviousAndNextLecture(data));
	};

	return (
		previous &&
    next && (
			<div className="container d-flex justify-content-between">
				<button
					onClick={() => {}}
					className="btn btn-light d-flex flex-row"
					type="button"
					disabled={!previous.lecture}
				>
					<div style={{ transform: "rotate(180deg)", paddingLeft: "5px" }}>
						<i className="flaticon-right-chevron"></i>
					</div>
					<Link
						href={{
							pathname: PathNames.LectureCoursesIdFilled("test-course"),
							query: { active: previous.lecture && previous.lecture.id },
						}}
					>
						<a onClick={() => onNavigationClick(previous.lecture)}>Previous</a>
					</Link>
				</button>
				<button
					onClick={() => {}}
					className="btn btn-light d-flex flex-row"
					type="button"
					disabled={!next.lecture}
				>
					<Link
						href={{
							pathname: PathNames.LectureCoursesIdFilled("test-course"),
							query: { active: next.lecture && next.lecture.id },
						}}
					>
						<a onClick={() => onNavigationClick(next.lecture)}>Next</a>
					</Link>
					<div style={{ paddingLeft: "5px" }}>
						<i className="flaticon-right-chevron"></i>
					</div>
				</button>
			</div>
		)
	);
}

export default Navigation;
