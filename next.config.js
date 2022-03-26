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
    env: {
        JWT_SECRET: "djhfghbdsgrasklkajsdgf",
        REACT_APP_SOLANA_NETWORK: "devnet",
        REACT_APP_SOLANA_RPC_HOST: "https://explorer-api.devnet.solana.com"
    },
    reactStrictMode: true,
    staticPageGenerationTimeout: 120,
})