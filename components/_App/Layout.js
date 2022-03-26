import React, { useEffect, useState } from 'react'
import Head from "next/head"
import { ToastProvider } from 'react-toast-notifications'
import { Toaster } from 'react-hot-toast'
import Router, { useRouter } from 'next/router'
import Navbar from './Navbar'
import Footer from './Footer'
import Preloader from './Preloader'
import { APP_NAME, defaultMetadata, getMetadata } from '@/utils/routing';

const Layout = ({ children, componentMetadata }) => {
    const router = useRouter();
    const [metadata, setMetadata] = useState(defaultMetadata);
    const [previousMetadata, setPreviousMetadata] = useState(defaultMetadata);

    const [loader, setLoader] = useState(true)
    useEffect(() => {
        const { title, description } = getMetadata(router.pathname, componentMetadata);
        setMetadata({ title, description });

        console.log(title);
        console.log(componentMetadata);

        setTimeout(() => {
            setLoader(false)
        }, 1000);
    }, [componentMetadata, router])

    Router.events.on('routeChangeStart', () => {
        setLoader(true)
    })
    Router.events.on('routeChangeComplete', () => {
        setPreviousMetadata({
            title: metadata.title,
            description: metadata.description
        })

        const { title, description } = getMetadata(router.pathname, componentMetadata);
        setMetadata({ title, description });

        setLoader(false)
    })
    Router.events.on('routeChangeError', () => {
        setMetadata({
            title: previousMetadata.title,
            description: previousMetadata.description
        });

        setLoader(false)
    })

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="og:title" property="og:title" content={APP_NAME}></meta>
                <meta name="twitter:card" content={APP_NAME}></meta>
                <link rel="canonical" href="https://www.unibears.edu/"></link>
            </Head>

            {loader && <Preloader />}

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <ToastProvider
                placement='bottom-right'
                autoDismissTimeout={10000}
                autoDismiss
            >

                <div className="layout-wrapper-flex">
                    <Navbar />
                    <main className="layout-main-flex">
                        {children}
                    </main>
                    <Footer />
                </div>
            </ToastProvider>
        </>
    );
}
/* Move this logic to Auth.js
Layout.getInitialProps = wrapper.getInitialAppProps({}) => {
    // TODO: Check user's wallet address from Redux 
    if (!token) {
        // if a user not logged in then user can't access those pages
        const isProtectedRoute = ctx.pathname === '/become-a-teacher'
            || ctx.pathname === '/my-courses'
            || ctx.pathname === '/teacher/courses'

        if (isProtectedRoute) {
            redirectUser(ctx, '/authentication');
        }
    } else {
        // if a user logged in then user can't access those pages
        const ifLoggedIn = ctx.pathname === '/authentication'
            || ctx.pathname === '/reset-password'
        if (ifLoggedIn) {
            redirectUser(ctx, '/')
        }
    }
} */

export default Layout;