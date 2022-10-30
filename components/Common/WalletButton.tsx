/* eslint-disable @next/next/no-img-element */
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
    setCollectionItemCount,
    web3AuthSuccess,
} from '../../redux/reducers/auth.reducer';
import { getAuth } from '../../redux/selectors';
import { getCollectionItemsCount } from '../../services/solana.service';
import { shortenAddress } from '../../utils/blockchain';
import { toastSuccess } from '../../utils/toasts';
import Spinner from './Spinner';

function WalletButton() {
    const [t] = useTranslation(['common', 'toasts']);

    const dispatch = useDispatch();
    const { address } = useSelector(getAuth);

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
                getCollectionItemsCount(walletAddress).then((count) => {
                    if (count < 0) {
                        setWalletLoading(false);
                    }
                    dispatch(
                        setCollectionItemCount({
                            collectionItemsCount: count,
                        })
                    );
                    dispatch(web3AuthSuccess({ address: walletAddress }));
                    toastSuccess(t('success.login'));
                    setWalletLoading(false);
                });
            } else {
                setWalletLoading(false);
            }
        } else {
            setWalletLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, connected]);

    if (walletLoading)
        return (
            <div className="default-btn wallet-spinner">
                <div className="wallet-button">
                    <Spinner />
                </div>
            </div>
        );

    return !walletLoading && address ? (
        <div className="user-dropdown">
            <button
                onClick={(e) => e.preventDefault()}
                className="default-btn wallet-button"
                type="button"
            >
                {/* Needs to be img since styling is very poor with next/image */}
                <img
                    className="wallet-button-icon"
                    src={wallet?.adapter.icon}
                    alt={wallet?.adapter.name}
                />
                {shortenAddress(address || '')}
            </button>

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
                <i className="flaticon-user" />{' '}
                {`${t('navbar.connect')} ${t('navbar.wallet')}`}
            </div>
        </WalletDialogButton>
    );
}

export default WalletButton;
