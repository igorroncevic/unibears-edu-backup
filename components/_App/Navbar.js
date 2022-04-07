import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import { shortenAddress } from "@/utils/blockchain";
import { authSuccess, setUnibearsCount } from "@/redux/actions/auth.actions.js";
import { toastSuccess } from "@/utils/toasts";
import { PathNames } from "@/utils/routing";
import solanaService from "@/services/solana.service";

import Image from "@/components/Common/CustomImage";

const Navbar = () => {
	const dispatch = useDispatch();
	const { address } = useSelector(state => state.auth);

	const [menu, setMenu] = useState(true);
	const wallet = useAnchorWallet();

	// TODO: This is triggered very often, check if it can be optimized.
	useEffect(() => {
		if (wallet) {
			(async function () {
				const walletAddress = wallet.publicKey.toBase58();

				const count = await solanaService.getUnibearsCount(walletAddress)

				dispatch(setUnibearsCount({ count: count }));
				dispatch(authSuccess({ address: walletAddress }));
				toastSuccess("Successfully logged in.\nYou own " + count + " Unibears.");
			})()
		}
	}, [wallet, dispatch]);

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

	const displayWalletAddress = () => {
		return <p>Wallet {shortenAddress(address || "")}</p>
	}

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
											Buy Unibear
										</a>
									</Link>
								</li>

								<li className="nav-item megamenu">
									<Link href={PathNames.CoursesIndex}>
										<a className="nav-link">
											Courses
										</a>
									</Link>
								</li>
							</ul>

							<div className="others-option d-flex align-items-center">
								<div className="option-item">
									{wallet ? (
										<div className="user-dropdown">
											<Link href={PathNames.Index}>
												<a onClick={e => e.preventDefault()} className="default-btn">
													<i className="flaticon-user"></i> {displayWalletAddress()} <span></span>
												</a>
											</Link>

											<ul className="dropdown-menu">
												<li className="nav-item">
													<Link href={PathNames.Index}>
														<a className="nav-link" onClick={e => { e.preventDefault() }}>
															Logout
														</a>
													</Link>
												</li>
											</ul>
										</div>
									) : (
										<WalletDialogButton>
											<div className="default-btn">
												<i className="flaticon-user"></i> Connect Wallet
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
