/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from './Spinner';
import { AppState } from '../../redux/reducers/reducers';
import {
    authSuccess,
    setCollectionItemCount,
} from '../../redux/actions/auth.actions';
import { toastSuccess } from '../../utils/toasts';
import solanaService from '../../services/solana.service';
import { shortenAddress } from '../../utils/blockchain';

const WalletButton = () => {
    const [t] = useTranslation(['common', 'toasts']);

    const dispatch = useDispatch();
    const { address } = useSelector((state: AppState) => state.auth);

    const { wallet, connected }: { wallet: Wallet | null; connected: boolean } =
        useWallet();
    const [walletLoading, setWalletLoading] = useState(false);

    // TODO: This is triggered very often, check if it can be optimized.
    useEffect(() => {
        if (wallet?.adapter) {
            setWalletLoading(true);
            const walletAddress = wallet.adapter.publicKey?.toBase58();

            // Sometimes address isn't immediately found
            if (walletAddress && !address) {
                solanaService
                    .getCollectionItemsCount(walletAddress)
                    .then((count) => {
                        dispatch(
                            setCollectionItemCount({
                                collectionItemsCount: count,
                            })
                        );
                        dispatch(authSuccess({ address: walletAddress }));
                        toastSuccess(t('success.login'));
                        setWalletLoading(false);
                    })
                    .catch((err) => {
                        setWalletLoading(false);
                    });
            } else {
                setWalletLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, connected]);

    return walletLoading ? (
        <a
            onClick={(e) => e.preventDefault()}
            className="default-btn wallet-spinner"
        >
            <div className="wallet-button">
                <Spinner />
            </div>
        </a>
    ) : address ? (
        <div className="user-dropdown">
            <a
                onClick={(e) => e.preventDefault()}
                className="default-btn wallet-button"
            >
                {/* Needs to be img since styling is very poor with next/image */}
                <img
                    className="wallet-button-icon"
                    src={wallet?.adapter.icon}
                    alt={wallet?.adapter.name}
                />
                {shortenAddress(address || '')}
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
                <i className="flaticon-user"></i>{' '}
                {`${t('navbar.connect')} ${t('navbar.wallet')}`}
            </div>
        </WalletDialogButton>
    );
};

export default WalletButton;
