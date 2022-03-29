import createImageUrlBuilder from '@sanity/image-url';
import {
    createCurrentUserHook,
    createClient
} from 'next-sanity';

export const config = {
    /**
     * ~~~ TODO: Change these once we move to real Sanity project ~~~
     * 
     * Find your project ID and dataset in `sanity.json` in your studio project.
     * These are considered “public”, but you can use environment variables
     * if you want differ between local dev and production.
     * https://nextjs.org/docs/basic-features/environment-variables
     * 
     * Important: .env.local - information can be leaked to the public
     * BUT: next.config.json - env variables are only accessible by Nextjs
     * Since Sanity data is not sensitive, we can put it in .env.local
     * 
     **/
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2022-03-27", // or today's date for latest
    /**
     * Set useCdn to `false` if your application require the freshest possible
     * data always (potentially slightly slower and a bit more expensive).
     * Authenticated request (like preview) will always bypass the CDN
     **/
    useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

/**
* Set up a helper function for generating Image URLs with only the asset
* reference data in your document.
* Read more: https://www.sanity.io/docs/image-url
**/
export const urlFor = (source) => createImageUrlBuilder(sanityClient).image(source);

// Not used often - Helper function for using the current logged in user account.
export const useCurrentUser = createCurrentUserHook(config);
