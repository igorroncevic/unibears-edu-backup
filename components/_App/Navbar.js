import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import { authSuccess, setUnibearsCount } from "@/redux/actions/auth.actions.js";
import { toastSuccess } from "@/utils/toasts";
import { PathNames } from "@/utils/routing";
import solanaService from "@/services/solana.service";

import Image from "@/components/Common/CustomImage";
import Language from "./Language";
import WalletButton from "../Common/WalletButton";

const Navbar = () => {
	const [t] = useTranslation(["common", "toasts"]);
	const dispatch = useDispatch();
	const { address } = useSelector(state => state.auth);

	const [menu, setMenu] = useState(true);
	const { wallet, connected } = useWallet();
	const [walletLoading, setWalletLoading] = useState(false);

	// TODO: This is triggered very often, check if it can be optimized.
	useEffect(() => {
		if (wallet?.adapter) {
			(async function () {
				setWalletLoading(true);
				const walletAddress = wallet.adapter.publicKey?.toBase58();

				const count = await solanaService.getUnibearsCount(walletAddress)

				// Sometimes address isn't immediately found
				if (walletAddress) {
					dispatch(setUnibearsCount({ count: count }));
					dispatch(authSuccess({ address: walletAddress }));
					toastSuccess(t("success.login", { ns: "toasts" }), { id: "login" });
					setWalletLoading(false);
				}
			})()
		}
	}, [wallet, connected]);

	useEffect(() => {
		const elementId = document.getElementById("navbar");

		const addSticky = () => {
			if (window.scrollY > 70) {
				elementId.classList.add("is-sticky");
			} else {
				elementId.classList.remove("is-sticky");
			}
		}

		document.addEventListener("scroll", addSticky);
		window.scrollTo(0, 0);

		return () => document.removeEventListener("scroll", addSticky);
	}, [])

	const toggleNavbar = () => {
		setMenu(!menu)
	}

	const classOne = menu ? "collapse navbar-collapse" : "collapse navbar-collapse show";
	const classTwo = menu ? "navbar-toggler navbar-toggler-right collapsed" : "navbar-toggler navbar-toggler-right";

	return (
		<div id="navbar" className="navbar-area">
			<div className="edemy-nav">
				<div className="container-fluid">
					<div className="navbar navbar-expand-lg navbar-light">

						<Link href={PathNames.Index}>
							<a onClick={toggleNavbar} className="navbar-brand">
								<Image src="/images/logo.png" alt="logo" />
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
									<Link href={PathNames.Index}>
										<a onClick={e => e.preventDefault()} className="nav-link">
											{t("navbar.buyUnibear")}
										</a>
									</Link>
								</li>
								<li className="nav-item megamenu">
									<Link href={PathNames.CoursesIndex}>
										<a className="nav-link">
											{t("navbar.courses")}
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Language />
								</li>
							</ul>

							<div className="others-option d-flex align-items-center">
								<div className="option-item">
									{wallet ? (
										<div className="user-dropdown">
											<Link href={PathNames.Index}>
												<a onClick={e => e.preventDefault()} className="default-btn">
													<WalletButton wallet={wallet} address={address} walletLoading={walletLoading} />
												</a>
											</Link>

											{/* Removing for now since disconnecting wallet and account change is unsupported. */}
											{/* <ul className="dropdown-menu">
												<li className="nav-item">
													<Link href={PathNames.Index}>
														<a className="nav-link" onClick={e => { e.preventDefault() }}>
															Logout
														</a>
													</Link>
												</li>
											</ul> */}
										</div>
									) : (
										<WalletDialogButton>
											<div className="default-btn">
												<i className="flaticon-user"></i> {`${t("navbar.connect")} ${t("navbar.wallet")}`}
											</div>
										</WalletDialogButton>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
