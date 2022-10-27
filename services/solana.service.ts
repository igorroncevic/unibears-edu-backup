import baseUrl from '../utils/baseUrl';

class SolanaService {
    async getCollectionItemsCount(address: string) {
        const url = `${baseUrl}/api/v1/solana/getTokenAccounts`;
        const payload = { pubKey: address };
        // const response = await axios.post(url, payload);
        let response: any = await fetch(url, { method: 'POST' });
        response.json().then((data: any) => {
            response = data;
        });

        if (response.status === 200) {
            return response.data?.length ? response.data.length : 0;
        } else {
            return 0;
        }
    }
}

const solanaService = new SolanaService();
export default solanaService;
