import React from "react";
import { useTranslation } from "react-i18next";

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
						</div>
					</div>
					<div className="col-lg-6 col-md-12">
						<div className="main-banner-image-style-two">
							<Image src="/images/unibear-edu.png" alt="image" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index;
