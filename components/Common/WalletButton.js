/* eslint-disable @next/next/no-img-element */
import Spinner from "./Spinner";
import { shortenAddress } from "@/utils/blockchain";

const WalletButton = ({ wallet, address, walletLoading }) => {
	if (walletLoading || !address) {
		// If wallet is still connecting, display a loader.
		return (
			<div className="wallet-button">
				<Spinner />
			</div>
		)
	}

	return (
		<div className="wallet-button">
			{/* Needs to be img since styling is very poor with next/image */}
			<img className="wallet-button-icon" src={wallet.adapter.icon} alt={wallet.adapter.name} />
			{shortenAddress(address || "")}
		</div>
	)
}

export default WalletButton;