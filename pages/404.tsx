import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "../components/Common/CustomImage";
import { PATH_NAMES } from "../utils/routing";

const Custom404 = () => {
	const router = useRouter();
	const [t] = useTranslation("common");

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push(PATH_NAMES.Index);
		}, 10 * 1000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="error-area">
			<div className="container">
				<div className="error-content">
					<div className="error-logo">
						<Image src="/images/logo-white.svg" alt="image" />
					</div>
					<h3>{t("404.title")}</h3>
					<p>{t("404.description.paragraph1")}</p>
					<p>{t("404.description.paragraph2")}</p>

					<div className="btn-box">
						<Link href={PATH_NAMES.CoursesIndex}>
							<a className="default-btn">
								<i className="flaticon-home"></i> {t("homePage")} <span></span>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Custom404;
