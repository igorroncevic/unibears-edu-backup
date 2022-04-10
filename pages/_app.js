import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/animate.min.css";
import "../styles/boxicons.min.css";
import "../styles/meanmenu.min.css";
import "../styles/flaticon.css";
import "react-accessible-accordion/dist/fancy-example.css"
import "../node_modules/react-modal-video/css/modal-video.min.css";
import "react-tabs/style/react-tabs.css";
import "../styles/style.css";
import "../styles/overrides.css";
import "../styles/responsive.css";

import "../translations/config.js"; // init translation

import { useMemo, useEffect } from "react";
import Layout from "../components/_App/Layout";
import Auth from "@/components/_App/Auth";
import { wrapper, store } from "./../redux/store";
import { Provider } from "react-redux";

// Solana
import { createTheme, ThemeProvider } from "@material-ui/core";
import { clusterApiUrl } from "@solana/web3.js";
import {
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	SolletExtensionWalletAdapter,
	SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

/*
	Mainnet = "mainnet-beta",
	Testnet = "testnet",
	Devnet = "devnet"
*/
const network = process.env.REACT_APP_SOLANA_NETWORK || "devnet";

// TODO: Remove?
const theme = createTheme({
	overrides: {
		MuiButtonBase: {
			root: {
				justifyContent: "flex-start",
			},
		},
		MuiButton: {
			root: {
				textTransform: undefined,
				padding: 0,
				color: "#fff",
			},
			startIcon: {
				marginRight: 8,
			},
			endIcon: {
				marginLeft: 8,
			},
		},
	},
});

const MyApp = ({ Component, pageProps }) => {
	const endpoint = useMemo(() => clusterApiUrl(network), []);

	useEffect(() => {
		if (typeof document !== undefined) {
			import("bootstrap/dist/js/bootstrap");
		}
	}, []);

	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new SlopeWalletAdapter(),
			new SolflareWalletAdapter({ network }),
			new SolletWalletAdapter({ network }),
			new SolletExtensionWalletAdapter({ network }),
		],
		[]
	);

	return (
		<ThemeProvider theme={theme}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect={true}>
					<WalletDialogProvider>
						<Provider store={store}>
							<Layout {...pageProps}>
								{
									// If component requires auth, check it.
									pageProps.auth ? (
										<Auth {...pageProps}>
											<Component {...pageProps} />
										</Auth>
									) : (
										<Component {...pageProps} />
									)
								}
							</Layout>
						</Provider>
					</WalletDialogProvider>
				</WalletProvider>
			</ConnectionProvider>
		</ThemeProvider>
	);
};

export default wrapper.withRedux(MyApp);
