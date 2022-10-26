// TODO: Return this when going to production
/* const baseUrl = process.env.NODE_ENV === "production"
	? "https://edemy-react.envytheme.com"
	: "http://localhost:3000"; */
const baseUrl =
    process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_DOMAIN
            ? process.env.NEXT_PUBLIC_DOMAIN
            : 'http://localhost:3040'
        : 'http://localhost:3000';

export default baseUrl;
