# When to use

[Next.js docs](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly) say that `getStaticProps` should not use API routes because they themselves are run on server-side (during build-time) and they won't be sent to the browser anyways (which is the point of using API routes), therefore using them in `getStaticProps`/`getStaticPaths` is redundant.
