import { Toaster } from 'react-hot-toast';
import usePageData from '../../customHooks/usePageData';

import Head from './CustomHead';
import Footer from './Footer';
import Navbar from './Navbar';
import Preloader from './Preloader';

interface LayoutProps {
    children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
    const [metadata, loader] = usePageData();
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
