import getBaseUrl from '../utils/baseUrl';

export const getCollectionItemsCount = async (address: string) => {
    const url = `${getBaseUrl()}/api/v1/solana/getTokenAccounts`;
    const payload = { pubKey: address };
    let response: any = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    response.json().then((data: any) => {
        response = data;
    });

    if (response.status === 200) {
        return response.data?.length ? response.data.length : 0;
    }
    return -1;
};
