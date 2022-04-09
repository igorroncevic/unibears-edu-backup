import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { PathNames } from "@/utils/routing";

const Footer = () => {
	const [t] = useTranslation("common");

	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer-area">
			<div className="container">
				<div className="footer-bottom-area">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-6">
							<p><i className='bx bx-copyright'></i>{currentYear} Unibears EDU</p>
						</div>

						<div className="col-lg-6 col-md-6">
							<ul>
								<li>
									<Link href={PathNames.PrivacyPolicy}>
										<a>{t("footer.privacyPolicy")}</a>
									</Link>
								</li>
								<li>
									<Link href={PathNames.TermsOfService}>
										<a>{t("footer.tos")}</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;