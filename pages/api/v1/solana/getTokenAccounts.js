import Cors from "cors";
import initMiddleware from "@/utils/init-middleware";

import { Connection } from "@solana/web3.js";
import tokenService from "./token.service";

// Initialize the cors middleware
const cors = initMiddleware(
	// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
	Cors({
		methods: ["POST"],
		// origin: "*" // TODO: Check if needed
	})
)

const getTokenMetadata = async (req, res) => {
	await cors(req, res)

	const { pubKey } = req.body
	const endpoint = process.env.SOLANA_RPC_HOST;

	//connect
	const connection = new Connection(endpoint, { commitment: "confirmed", disableRetryOnRateLimit: true });

	//get accounts
	const accounts = await tokenService.getTokenAccounts(connection, pubKey);

	if (accounts?.length > 0) {
		//reformat the account with only token information.
		const tokenList = accounts.map(accountInfo => accountInfo?.account?.data?.parsed?.info);
		//filter out tokens owned previously but no longer in wallet.
		const ownedTokens = tokenList.filter(token => token.owner === pubKey && parseInt(token.tokenAmount?.amount) > 0);

		//get token data
		const ownedTokenData = [];
		for (const token of ownedTokens) {
			const tokenData = await tokenService.getTokenData(connection, token);
			if (tokenData) {
				ownedTokenData.push(tokenData);
			}
		}
		// console.log(`Found ${ownedTokens?.length} tokenData for pubKey ${pubKey}.`);

		//get meta data
		const metaDataList = [];
		for (const tokenData of ownedTokenData) {
			const metaData = await tokenService.getMetaData(tokenData);
			if (metaData) {
				metaDataList.push(metaData);
			}
		}
		// console.log(`Found ${metaDataList?.length} metaData for pubKey ${pubKey}.`);

		const metadataMinimized = metaDataList
			.filter(metadata => {
				const creators = metadata.properties?.creators;
				if (!Array.isArray(creators)) {
					return false;
				}

				const creator = creators[0]?.address;
				return metadata.symbol === "UB" && creator === "92uUbmitkgazPpMR5XRD5ZErfoh7MrkiyEt1jqgCB4XJ"
			})
			.map(metadata => {
				return {
					name: metadata.name,
				}
			})

		// console.log(pubKey + " owns " + metadataMinimized.length + " Unibears.")
		res.status(200).send(metadataMinimized);
	} else {
		console.error("Found no accounts for " + pubKey + ".")
		res.status(200).send([]);
	}
}

export default getTokenMetadata;