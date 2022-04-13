/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "./Spinner";

import { authSuccess, setUnibearsCount } from "@/redux/actions/auth.actions.js";
import { toastSuccess } from "@/utils/toasts";
import { shortenAddress } from "@/utils/blockchain";
import solanaService from "@/services/solana.service";

const WalletButton = () => {
	const [t] = useTranslation(["common", "toasts"]);

	const dispatch = useDispatch();
	const { address } = useSelector(state => state.auth);

	const { wallet, connected } = useWallet();
	const [walletLoading, setWalletLoading] = useState(false);

	// TODO: This is triggered very often, check if it can be optimized.
	useEffect(() => {
		if (wallet?.adapter) {
			setWalletLoading(true);
			const walletAddress = wallet.adapter.publicKey?.toBase58();

			// Sometimes address isn't immediately found
			if (walletAddress && !address) {
				solanaService.getUnibearsCount(walletAddress)
					.then(count => {
						dispatch(setUnibearsCount({ count: count }));
						dispatch(authSuccess({ address: walletAddress }));
						toastSuccess(t("success.login", { ns: "toasts" }), { id: "login" });
						setWalletLoading(false);
					})
					.catch(err => {
						setWalletLoading(false);
					})
			} else {
				setWalletLoading(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet, connected]);

	return (
		walletLoading ? (
			<a onClick={e => e.preventDefault()} className="default-btn wallet-spinner">
				<div className="wallet-button">
					<Spinner />
				</div>
			</a>
		) :
			(address ? (
				<div className="user-dropdown">
					<a onClick={e => e.preventDefault()} className="default-btn wallet-button">
						{/* Needs to be img since styling is very poor with next/image */}
						<img className="wallet-button-icon" src={wallet.adapter.icon} alt={wallet.adapter.name} />
						{shortenAddress(address || "")}
					</a>

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
				<WalletDialogButton onClick={() => setWalletLoading(true)}>
					<div className="default-btn">
						<i className="flaticon-user"></i> {`${t("navbar.connect")} ${t("navbar.wallet")}`}
					</div>
				</WalletDialogButton>
			)
			))
}

export default WalletButton;