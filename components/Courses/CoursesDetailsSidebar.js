import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ModalVideo = dynamic(import("react-modal-video"));
import Image from "@/components/Common/CustomImage";

const CoursesDetailsSidebar = ({ course }) => {
	const [display, setDisplay] = useState(false);

	useEffect(() => {
		setDisplay(true);
	}, []);

	const [isOpen, setIsOpen] = useState(true);
	const openModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{/* TODO: If you want to change the video need to update videoID */}
			{display ? (
				<ModalVideo
					channel="vimeo"
					isOpen={!isOpen}
					videoId={course.coursePreview ? course.coursePreview : "293581795"}
					onClose={() => setIsOpen(!isOpen)}
				/>
			) : (
				""
			)}

			<div className="courses-details-info">
				<div className="image">
					<Image
						src={course.thumbnail ? course.thumbnail : ""}
						alt={course.title}
					/>
					<div
						onClick={(e) => {
							e.preventDefault();
							openModal();
						}}
						className="link-btn popup-youtube"
					></div>

					<div className="content">
						<i className="flaticon-play"></i>
						<span>Course Preview</span>
					</div>
				</div>

				<ul className="info">
					<li className="price">
						<div className="d-flex justify-content-between align-items-center">
							{course.title}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								<i className="flaticon-teacher"></i> Instructor
							</span>
							{course.author.name}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								<i className="flaticon-time"></i> Duration
							</span>
							{course.duration}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								{/* TODO: Maybe change the icon to fit in with others */}
								<i className="flaticon-calendar"></i> Published
							</span>
							{course.publishedAt}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								{/* TODO: Add a proper icon for categories */}
								<i className="flaticon-distance-learning"></i> Categories
							</span>
							{course.categories}
						</div>
					</li>
				</ul>

				<div className="btn-box">
					<button className="default-btn">
						{/* TODO: Use this button to navigate to first lesson if user has enough Unibears? */}
						<i className="flaticon-tag"></i> Start Course
						<span></span>
					</button>
				</div>
			</div>
		</>
	);
};

export default CoursesDetailsSidebar;
