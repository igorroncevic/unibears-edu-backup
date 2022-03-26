const path = require('path')
const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        // dest: 'public',
        register: true,
        sw: '/sw.js'
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    // Docs: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.optimization.runtimeChunk = "single";

        // Important: return the modified config
        return config
    },
    env: {
        JWT_SECRET: "djhfghbdsgrasklkajsdgf",
        REACT_APP_SOLANA_NETWORK: "devnet",
        REACT_APP_SOLANA_RPC_HOST: "https://explorer-api.devnet.solana.com"
    },
    images: {
        domains: ["res.cloudinary.com", "localhost"],
    },
    reactStrictMode: true,
    staticPageGenerationTimeout: 120,
    swcMinify: true // using Terser with SWC for faster minifies
})