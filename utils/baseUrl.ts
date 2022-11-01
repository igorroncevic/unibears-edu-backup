const getBaseUrl = () => {
    let baseUrl = 'http://localhost:3000';

    if (process.env.NODE_ENV === 'production') {
        if (process.env.NEXT_PUBLIC_DOMAIN) {
            baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
        } else {
            baseUrl = 'http://localhost:3040';
        }
    }
    return baseUrl;
};

export default getBaseUrl;
