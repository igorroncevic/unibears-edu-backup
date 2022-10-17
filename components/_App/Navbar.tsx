import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import Language from "./Language";
import WalletButton from "../Common/WalletButton";
import { PATH_NAMES } from "../../utils/routing";
import Image from "next/image";

const mobileDevices =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const Navbar = () => {
	const [t] = useTranslation(["common", "toasts"]);
	const [menu, setMenu] = useState(true);

	useEffect(() => {
		if (!mobileDevices.test(navigator.userAgent)) {
			const elementId = document.getElementById("navbar");

			const addSticky = () => {
				if (elementId) {
					if (window.scrollY > 50) {
						elementId.classList.add("is-sticky");
					} else {
						elementId.classList.remove("is-sticky");
					}
				}
			};

			document.addEventListener("scroll", addSticky);
			window.scrollTo(0, 0);

			return () => document.removeEventListener("scroll", addSticky);
		}
	}, []);

	const toggleNavbar = () => {
		setMenu(!menu);
	};

	const classOne = menu
		? "collapse navbar-collapse"
		: "collapse navbar-collapse show";
	const classTwo = menu
		? "navbar-toggler navbar-toggler-right collapsed"
		: "navbar-toggler navbar-toggler-right";

	return (
		<div id="navbar" className="navbar-area">
			<div className="edemy-nav">
				<div className="container-fluid">
					<div className="navbar navbar-expand-lg navbar-light">
						<Link href={PATH_NAMES.Index}>
							<a className="navbar-brand">
								<Image src="/images/logo-black.svg" alt="logo" />
							</a>
						</Link>

						<button
							onClick={toggleNavbar}
							className={classTwo}
							type="button"
							data-toggle="collapse"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="icon-bar top-bar"></span>
							<span className="icon-bar middle-bar"></span>
							<span className="icon-bar bottom-bar"></span>
						</button>

						<div className={classOne} id="navbarSupportedContent">
							<ul className="navbar-nav">
								<li className="nav-item">
									<a
										href={PATH_NAMES.MintPage}
										className="nav-link"
										target="_blank"
										rel="noreferrer"
									>
										{t("navbar.buyUnibear")}
									</a>
								</li>
								<li className="nav-item megamenu">
									<Link href={PATH_NAMES.CoursesIndex}>
										<a className="nav-link">{t("navbar.courses")}</a>
									</Link>
								</li>
								<li className="nav-item">
									<Language />
								</li>
							</ul>

							<div className="others-option d-flex align-items-center">
								<div className="option-item">
									<WalletButton />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
