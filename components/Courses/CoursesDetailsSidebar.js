import React from "react";
import dynamic from "next/dynamic";
const ModalVideo = dynamic(import("react-modal-video"));
import Image from '@/components/Common/CustomImage';

const CoursesDetailsSidebar = ({
	user,
	profilePhoto,
	lessons,
	duration,
	title,
}) => {
	const [display, setDisplay] = React.useState(false);

	React.useEffect(() => {
		setDisplay(true);
	}, []);

	const [isOpen, setIsOpen] = React.useState(true);
	const openModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<React.Fragment>
			{/* If you want to change the video need to update videoID */}
			{display ? (
				<ModalVideo
					channel="youtube"
					isOpen={!isOpen}
					videoId="bk7McNUjWgw"
					onClose={() => setIsOpen(!isOpen)}
				/>
			) : (
				""
			)}

			<div className="courses-details-info">
				<div className="image">
					<Image src={profilePhoto} alt={title} />

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
							{title}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								<i className="flaticon-teacher"></i> Instructor
							</span>
							{user.name}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								<i className="flaticon-time"></i> Duration
							</span>
							{duration}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								<i className="flaticon-distance-learning"></i>{" "}
								Lessons
							</span>
							{parseInt(lessons)}
						</div>
					</li>
				</ul>

				<div className="btn-box">
					<button
						className="default-btn"
					>
						<i className="flaticon-tag"></i> Start Course
						<span></span>
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

export default CoursesDetailsSidebar;
