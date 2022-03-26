import React, { useEffect, useState } from 'react'
import Head from "next/head"
import { ToastProvider } from 'react-toast-notifications'
import { Toaster } from 'react-hot-toast'
import Router, { useRouter } from 'next/router'
import Navbar from './Navbar'
import Footer from './Footer'
import Preloader from './Preloader'
import { APP_NAME, PathNames, PageMetadata } from '@/utils/routing';

const defaultMetadata = {
    title: PageMetadata.pages[PathNames.Index].title,
    description: PageMetadata.pages[PathNames.Index].description
}

const Layout = ({ children, componentMetadata }) => {
    const router = useRouter();
    const [metadata, setMetadata] = useState(defaultMetadata);

    useEffect(() => {
        let title = "", description = "";
        if (PageMetadata.pages[router.pathname]) {
            const getTitle = PageMetadata.pages[router.pathname].title || defaultMetadata.title;
            const getDescription = PageMetadata.pages[router.pathname].description || defaultMetadata.description;

            if (typeof getTitle === 'function') {
                const titleParam = componentMetadata && componentMetadata.title ? componentMetadata.title : "";
                title = getTitle(titleParam);
            } else {
                title = getTitle;
            }

            if (typeof getDescription === 'function') {
                const descriptionParam = componentMetadata && componentMetadata.title ? componentMetadata.title : "";
                description = getDescription(descriptionParam);
            } else {
                description = getDescription;
            }
        }else{
            title = defaultMetadata.title;
            description = defaultMetadata.description;
        }

        setMetadata({
            title: title,
            description: description,
        })
    }, [router.pathname])

    const [loader, setLoader] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 1000);
    }, [])

    Router.events.on('routeChangeStart', () => {
        setLoader(true)
    })
    Router.events.on('routeChangeComplete', () => {
        setLoader(false)
    })
    Router.events.on('routeChangeError', () => {
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