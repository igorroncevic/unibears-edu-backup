import axios from "axios";
import baseUrl from "../utils/baseUrl";

class SolanaService {
	async getCollectionItemsCount(address: string) {
		const url = `${baseUrl}/api/v1/solana/getTokenAccounts`;
		const payload = { pubKey: address };
		const response = await axios.post(url, payload);

		if (response.status === 200) {
			return response.data?.length ? response.data.length : 0;
		} else {
			return 0;
		}
	}
}

const solanaService = new SolanaService();
export default solanaService;
