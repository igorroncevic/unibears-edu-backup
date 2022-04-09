import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link"

import Image from "@/components/Common/CustomImage";

const Index = () => {
	const [t] = useTranslation("common");

	return (
		<div className="main-banner-area">
			<div className="container-fluid">
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-12">
						<div className="main-banner-content-style-two">
							<h1>{t("home.title")}</h1>
							<p>{t("home.subtitle")}</p>
							<Link href="/authentication">
								<a className="default-btn">
									<i className="flaticon-user"></i>{t("home.joinForFree")}<span></span>
								</a>
							</Link>
						</div>
					</div>
					<div className="col-lg-6 col-md-12">
						<div className="main-banner-image-style-two">
							<Image src="/images/banner-img4.png" alt="image" />
						</div>
					</div>
				</div>
			</div>
			<div className="banner-shape1">
				<Image src="/images/banner-shape1.png" alt="image" />
			</div>
			<div className="banner-shape2">
				<Image src="/images/banner-shape2.png" alt="image" />
			</div>
			<div className="banner-shape3">
				<Image src="/images/banner-shape3.png" alt="image" />
			</div>
			<div className="bulb">
				<Image src="/images/bulb.png" alt="image" />
			</div>
		</div>
	)
}

export default Index;