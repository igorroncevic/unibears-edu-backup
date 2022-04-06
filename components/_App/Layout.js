import React, { useEffect, useState } from "react"
import Head from "@/components/_App/CustomHead";
import { ToastProvider } from "react-toast-notifications"
import { Toaster } from "react-hot-toast"
import Router, { useRouter } from "next/router"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Preloader from "./Preloader"
import { APP_NAME, defaultMetadata, getMetadata } from "@/utils/routing";

const Layout = ({ children, componentMetadata }) => {
	const router = useRouter();
	const [metadata, setMetadata] = useState(defaultMetadata);
	const [previousMetadata, setPreviousMetadata] = useState(defaultMetadata);

	const [loader, setLoader] = useState(true)
	useEffect(() => {
		const { title, description } = getMetadata(router.pathname, componentMetadata);
		setMetadata({ title, description });

		setTimeout(() => {
			setLoader(false)
		}, 1000);
	}, [componentMetadata, router])

	Router.events.on("routeChangeStart", () => {
		setLoader(true)
	})
	Router.events.on("routeChangeComplete", () => {
		setPreviousMetadata({
			title: metadata.title,
			description: metadata.description
		})

		const { title, description } = getMetadata(router.pathname, componentMetadata);
		setMetadata({ title, description });

		setLoader(false)
	})
	Router.events.on("routeChangeError", () => {
		setMetadata({
			title: previousMetadata.title,
			description: previousMetadata.description
		});

		setLoader(false)
	})

	return (
		<>
			<Head
				title={metadata.title}
				description={metadata.description}
			/>
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

export default Layout;