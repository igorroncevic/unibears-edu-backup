import NextHead from 'next/head';
import { APP_NAME, ComponentMetadata, PATH_NAMES } from '../../utils/routing';

function Head({ title, description }: ComponentMetadata) {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="og:title" property="og:title" content={APP_NAME} />
            <meta name="twitter:card" content={APP_NAME} />
            <link rel="canonical" href={PATH_NAMES.AppDomain} />
        </NextHead>
    );
}

export default Head;
