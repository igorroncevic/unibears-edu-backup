/* eslint-disable @next/next/no-img-element */
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useWalletAdapter from '../../customHooks/useWalletAdapter';

import { getAuth } from '../../redux/selectors';
import { shortenAddress } from '../../utils/blockchain';
import Spinner from './Spinner';

function WalletButton() {
    const [t] = useTranslation(['common', 'toasts']);

    const { address } = useSelector(getAuth);
    const [loading, setWalletLoading, wallet] = useWalletAdapter();

    if (loading)
        return (
            <div className="default-btn wallet-spinner">
                <div className="wallet-button">
                    <Spinner />
                </div>
            </div>
        );

    return !loading && address ? (
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
