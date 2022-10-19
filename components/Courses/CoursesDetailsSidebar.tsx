import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const ModalVideo = dynamic(import("react-modal-video"));
import Link from "next/link";

import { CourseProps } from "./CourseCard";
import { AppState } from "../../redux/reducers/reducers";
import Image from "../Common/CustomImage";
import { displayCategories } from "../../services/category.service";
import { PATH_NAMES } from "../../utils/routing";

const CoursesDetailsSidebar = ({ course }: CourseProps) => {
	const [t] = useTranslation("courses");
	const { langCode } = useSelector((state: AppState) => state.user);

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
					allowFullScreen
					ratio={"1:1"}
					animationSpeed={1}
					classNames={{
						modalVideoEffect: "modal-video-effect",
						modalVideo: "modal-video",
						modalVideoClose: "modal-video-close",
						modalVideoBody: "modal-video-body",
						modalVideoInner: "modal-video-inner",
						modalVideoIframeWrap: "modal-video-movie-wrap",
						modalVideoCloseBtn: "modal-video-close-btn",
					}}
					aria={{
						openMessage: "You just opened the modal video",
						dismissBtnMessage: "Close the modal by clicking here",
					}}
				/>
			) : (
				""
			)}
			<div className="courses-details-info">
				<div className="image">
					<Image
						src={course.thumbnail ? course.thumbnail : ""}
						alt={course.title[langCode]}
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
						<span>{t("coursePreview")}</span>
					</div>
				</div>
				<ul className="info">
					<li className="price">
						<div className="d-flex justify-content-between align-items-center">
							{course.title[langCode]}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								<i className="flaticon-teacher"></i> {t("instructor")}
							</span>
							{course.author.name}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								<i className="flaticon-time"></i> {t("duration")}
							</span>
							{course.duration}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								{/* TODO: Maybe change the icon to fit in with others */}
								<i className="flaticon-calendar"></i> {t("published")}
							</span>
							{course.publishedAt}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								{/* TODO: Add a proper icon for categories */}
								<i className="flaticon-agenda"></i> {t("categories")}
							</span>
							{displayCategories(course.categories, langCode)}
						</div>
					</li>
					<li>
						<div className="d-flex justify-content-between align-items-center">
							<span>
								{/* TODO: Add a proper icon for collection items count */}
								<i className="flaticon-web"></i> {t("requiredCollectionItems")}
							</span>
							{course.requiredCollectionItems}
						</div>
					</li>
				</ul>

				<div className="btn-box">
					<Link href={PATH_NAMES.LectureCoursesIdFilled(course.slug)} passHref>
						<button className="default-btn">
							{/* TODO: Use this button to navigate to first lesson if user has enough collection items? */}
							<i className="flaticon-tag"></i>
							{t("startCourse")}
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CoursesDetailsSidebar;
