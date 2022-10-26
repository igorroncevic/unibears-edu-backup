import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import '../node_modules/react-modal-video/css/modal-video.min.css';
import '../styles/animate.min.css';
import '../styles/boxicons.min.css';
import '../styles/flaticon.css';
import '../styles/meanmenu.min.css';
import '../styles/overrides.css';
import '../styles/responsive.css';
import '../styles/style.css';

import '../translations/config.js'; // init translation

import { useEffect, useMemo } from 'react';
import Layout from '../components/_App/Layout';
import { store, wrapper } from '../redux/store';

// Solana
import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolflareWalletAdapterConfig,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Cluster, clusterApiUrl } from '@solana/web3.js';

import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';

import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { Provider } from 'react-redux';
import Auth from '../components/_App/Auth';

/*
	Mainnet = "mainnet-beta",
	Testnet = "testnet",
	Devnet = "devnet"
*/
const network = process.env.REACT_APP_SOLANA_NETWORK || 'devnet';

const MyApp = ({ Component, pageProps }: any) => {
    const endpoint = useMemo(() => clusterApiUrl(network as Cluster), []);

    useEffect(() => {
        if (document) {
            // @ts-ignore
            import('bootstrap/dist/js/bootstrap');
        }
    }, []);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({
                network,
            } as SolflareWalletAdapterConfig),
            new SolletWalletAdapter({ network } as SolflareWalletAdapterConfig),
            new SolletExtensionWalletAdapter({
                network,
            } as SolflareWalletAdapterConfig),
        ],
        []
    );

    return (
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
    );
};

export default wrapper.withRedux(MyApp);
