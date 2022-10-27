const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
    // pwa: {
    //     disable: process.env.NODE_ENV === 'development',
    //     // dest: 'public',
    //     register: true,
    //     sw: '/sw.js',
    // },
    // Docs: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    webpack: (config) => {
        config.optimization.runtimeChunk = 'single';

        // Important: return the modified config
        return config;
    },
    env: {
        JWT_SECRET: 'djhfghbdsgrasklkajsdgf',
        REACT_APP_SOLANA_NETWORK: 'mainnet-beta',
        SOLANA_RPC_HOST:
            /* "https://api.mainnet-beta.solana.com", */
            'https://blue-withered-frog.solana-mainnet.quiknode.pro/f543142ee13d636789d3639441b873fd7332acd8/', //"https://solana-api.projectserum.com",
    },
    images: {
        domains: ['res.cloudinary.com', 'cdn.sanity.io', 'localhost'],
    },
    reactStrictMode: true,
    staticPageGenerationTimeout: 120,
    swcMinify: true, // using Terser with SWC for faster minifies
});
