import '../styles/bootstrap.min.css'
import '../styles/animate.min.css'
import '../styles/boxicons.min.css'
import '../styles/meanmenu.min.css'
import '../styles/flaticon.css'
import 'react-accessible-accordion/dist/fancy-example.css'
import '../node_modules/react-modal-video/css/modal-video.min.css'
import 'react-tabs/style/react-tabs.css'
import '../styles/style.css'
import '../styles/overrides.css'
import '../styles/responsive.css'

import { useMemo } from 'react';
import Layout from '../components/_App/Layout';
import Auth from '@/components/_App/Auth';
import { wrapper, store } from './../redux/store';
import { Provider } from 'react-redux';

// Solana 
import { createTheme, ThemeProvider } from "@material-ui/core";
import { clusterApiUrl } from "@solana/web3.js";
import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets';

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

const theme = createTheme({
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: 0,
                color: "#fff"
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
                            <Layout {...pageProps} componentMetadata={Component.metadata}>
                                {
                                    // If component requires auth, check it.
                                    Component.auth ?
                                        (
                                            <Auth {...pageProps} auth={Component.auth} >
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
    )
}

/* MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        pageProps
    }
} */

export default wrapper.withRedux(MyApp);