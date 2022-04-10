import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast"
import Router, { useRouter } from "next/router"

import Head from "@/components/_App/CustomHead";
import Navbar from "./Navbar"
import Footer from "./Footer"
import Preloader from "./Preloader"

import { defaultMetadata, getMetadata } from "@/utils/routing";

const Layout = ({ children }) => {
	const router = useRouter();

	const { langCode } = useSelector(state => state.user);

	const [metadata, setMetadata] = useState(defaultMetadata);
	const [previousMetadata, setPreviousMetadata] = useState(defaultMetadata);
	const [loader, setLoader] = useState(true)

	useEffect(() => {
		const routeChangeStart = () => {
			setLoader(true)
		}

		const routeChangeComplete = () => {
			setPreviousMetadata({
				title: metadata.title,
				description: metadata.description
			})

			const { title, description } = getMetadata(router.pathname, {}, langCode);
			setMetadata({ title, description });

			setLoader(false);
		}

		const routeChangeError = () => {
			setMetadata({
				title: previousMetadata.title,
				description: previousMetadata.description
			});

			setLoader(false)
		}

		Router.events.on("routeChangeStart", routeChangeStart);
		Router.events.on("routeChangeComplete", routeChangeComplete)
		Router.events.on("routeChangeError", routeChangeError)

		return () => {
			router.events.off("routeChangeStart", routeChangeStart);
			router.events.off("routeChangeComplete", routeChangeComplete);
			router.events.off("routeChangeError", routeChangeError);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const { title, description } = getMetadata(router.pathname, {}, langCode);
		setMetadata({ title, description });

		setTimeout(() => {
			setLoader(false)
		}, 1000);
	}, [router, langCode])

	return (
		<>
			<Head
				title={metadata.title}
				description={metadata.description}
			/>
			{loader && <Preloader />}
			<Toaster
				reverseOrder={false}
			/>
			<div className="layout-wrapper-flex">
				<Navbar />
				<main className="layout-main-flex">
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
}

export default Layout;