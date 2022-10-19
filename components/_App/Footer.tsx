import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PATH_NAMES } from "../../utils/routing";

const currentYear = new Date().getFullYear();

const Footer = () => {
	const [t] = useTranslation("common");

	return (
		<footer className="footer-area">
			<div className="container">
				<div className="footer-bottom-area">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-6">
							<p>
								<i className="bx bx-copyright"></i>
								{currentYear} Project EDU
							</p>
						</div>

						<div className="col-lg-6 col-md-6">
							<ul>
								<li>
									<Link href={PATH_NAMES.PrivacyPolicy}>
										<a>{t("footer.privacyPolicy")}</a>
									</Link>
								</li>
								<li>
									<Link href={PATH_NAMES.TermsOfService}>
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
};

export default Footer;
