import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors';

import { defaultMetadata, getMetadata, Route } from '../../utils/routing';
import Head from './CustomHead';
import Footer from './Footer';
import Navbar from './Navbar';
import Preloader from './Preloader';

interface LayoutProps {
    children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const { langCode } = useSelector(getUser);

    const [metadata, setMetadata] = useState(defaultMetadata);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const { title, description } = getMetadata(
            router.pathname as Route,
            undefined,
            langCode
        );
        setMetadata({ title, description });

        const routeChangeStart = () => {
            setLoader(true);
        };

        const routeChangeComplete = () => {
            setLoader(false);
        };

        const routeChangeError = () => {
            setLoader(false);
        };

        Router.events.on('routeChangeStart', routeChangeStart);
        Router.events.on('routeChangeComplete', routeChangeComplete);
        Router.events.on('routeChangeError', routeChangeError);

        return () => {
            router.events.off('routeChangeStart', routeChangeStart);
            router.events.off('routeChangeComplete', routeChangeComplete);
            router.events.off('routeChangeError', routeChangeError);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { title, description } = getMetadata(
            router.pathname as Route,
            undefined,
            langCode
        );
        setMetadata({ title, description });

        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, [router.pathname, langCode]);

    return (
        <>
            <Head title={metadata.title} description={metadata.description} />
            {loader && <Preloader />}
            <Toaster reverseOrder={false} />
            <div className="layout-wrapper-flex">
                <Navbar />
                <main className="layout-main-flex">{children}</main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
