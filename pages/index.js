import React from "react";
import { useTranslation } from "react-i18next";

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
							<a onClick={e => e.preventDefault()} className="default-btn">
								<i className="flaticon-user"></i>{t("home.joinForFree")}<span></span>
							</a>
						</div>
					</div>
					<div className="col-lg-6 col-md-12">
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index;