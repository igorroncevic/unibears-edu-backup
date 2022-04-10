import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "@/components/Common/CustomImage";

import { PathNames } from "@/utils/routing";
import { useTranslation } from "react-i18next";

const Custom404 = () => {
	const router = useRouter()
	const [t] = useTranslation("common");

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push(PathNames.Index);
		}, 10 * 1000);

		return () => clearTimeout(timer);
	}, [router])

	return (
		<div className="error-area">
			<div className="d-table">
				<div className="d-table-cell">
					<div className="container">
						<div className="error-content">
							{/* <Image src="/images/error.png" alt="image" /> */}
							<h3>{t("404.title")}</h3>
							<p>{t("404.description.paragraph1")}</p>
							<p>{t("404.description.paragraph2")}</p>

							<div className="btn-box">
								<Link href={PathNames.CoursesIndex}>
									<a className="default-btn">
										<i className="flaticon-home"></i> {t("homePage")} <span></span>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Custom404;