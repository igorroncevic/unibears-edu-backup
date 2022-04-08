import React from "react";
import { useSelector } from "react-redux";
import PortableText from "../Common/CustomPortableText";
import Navigation from "./Navigation";
import Video from "./Video";

function Lecture({ topics }) {
	const lecture = useSelector((state) => state.course.activeLecture);
	const { langCode } = useSelector(state => state.user);

	return lecture ? (
		<div className="container">
			<h2 className="font-weight-light py-3"> {lecture.title[langCode]} </h2>
			<Video source={lecture.source} />
			<div className="p-4">
				<PortableText content={lecture.overview ? lecture.overview[langCode] : ""} />
			</div>
			<h3> Additional docs </h3>
			<div> File </div>
			<hr />
			<Navigation topics={topics} />
		</div>
	) : (
		<>Loading...</>
	);
}

export default Lecture;
