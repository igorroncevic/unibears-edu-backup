import { useWalletDialog } from '@solana/wallet-adapter-material-ui';
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../redux/selectors';

import {
    setCollectionItemCount,
    web3AuthSuccess,
} from '../redux/reducers/auth.reducer';
import { getCollectionItemsCount } from '../services/solana.service';
import { toastSuccess } from '../utils/toasts';

const useWalletAdapter = () => {
    const [t] = useTranslation(['common', 'toasts']);
    const dispatch = useDispatch();
    const { address } = useSelector(getAuth);

    const {
        wallet,
        connected,
        publicKey,
    }: {
        wallet: Wallet | null;
        connected: boolean;
        publicKey: PublicKey | null;
    } = useWallet();

    // used to manipulate loading state when closing it using dialog x
    const { open } = useWalletDialog();

    const [loading, setWalletLoading] = useState(false);

    useEffect(() => {
        if (loading && !open) {
            setWalletLoading(false);
        }
    }, [open, loading]);

    // TODO: This is triggered very often, check if it can be optimized.
    useEffect(() => {
        if (wallet?.adapter) {
            setWalletLoading(true);
            const walletAddress = publicKey?.toBase58();

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
    return [loading, setWalletLoading, wallet];
};

export default useWalletAdapter;
