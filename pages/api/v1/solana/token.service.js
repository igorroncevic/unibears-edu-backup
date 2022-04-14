import axios from "axios";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, } from "@solana/spl-token";

// Thanks to Jrej: https://www.youtube.com/watch?v=2HnpSxxef4c
const tokenService = {
	getTokenAccounts: async (connection, pubKeyString) => {
		let accounts = []
		if (pubKeyString) {
			accounts = await connection.getParsedProgramAccounts(
				TOKEN_PROGRAM_ID,
				{
					filters: [
						{ dataSize: 165 },
						{
							memcmp: {
								offset: 32,
								bytes: pubKeyString,
							},
						},
					],
				}
			);
		}

		// console.log(`Found ${accounts?.length} account(s) for pubKey ${pubKeyString}.`);
		return accounts;
	},
	getTokenData: async (connection, token) => {
		try {
			if (token && token.mint) {
				const mintPubkey = new PublicKey(token.mint);
				const tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
				const tokenData = await Metadata.load(connection, tokenmetaPubkey);
				return tokenData;
			}
		} catch (error) {
			// console.log("Could not find account: ", token.mint)
			// console.log(error); // TODO: Simplify or remove. Always return error for non-NFT tokens.
			return null;
		}
	},
	getMetaData: async (tokenData) => {
		let metaData = {};
		if (tokenData) {
			const metaDataUri = tokenData.data?.data?.uri;

			const response = await axios.get(metaDataUri)
				.then(res => res.data)
				.catch(err => { console.log(err) })

			if (response && response.image) {
				metaData = response;
			}
		}
		return metaData;
	},
}

export default tokenService;