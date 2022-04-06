import React from "react";
import Link from "next/link";

import { PathNames } from "@/utils/routing";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer-area">
			<div className="container">
				<div className="footer-bottom-area">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-6">
							<p><i className='bx bx-copyright'></i>{currentYear} Unibears EDU by <a target="_blank" rel="noreferrer" href="https://envytheme.com/">EnvyTheme</a></p>
						</div>

						<div className="col-lg-6 col-md-6">
							<ul>
								<li>
									<Link href={PathNames.PrivacyPolicy}>
										<a>Privacy Policy</a>
									</Link>
								</li>
								<li>
									<Link href={PathNames.TermsOfService}>
										<a>Terms & Conditions</a>
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