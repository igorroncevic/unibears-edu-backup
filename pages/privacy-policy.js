import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Preloader from "@/components/_App/Preloader";
import PageBanner from "../components/Common/PageBanner";
import Image from "@/components/Common/CustomImage";
import PortableText from "@/components/Common/CustomPortableText";

import { LEGAL_TYPES, findLegalDocumentByType } from "@/services/legalDocuments.service";

const PrivacyPolicy = ({ document }) => {
	const { langCode } = useSelector(state => state.user);
	const [t] = useTranslation("common");

	if (!document) {
		return <Preloader />
	}

	return (
		<React.Fragment>
			<PageBanner pageTitle={t("footer.privacyPolicy")} />

			<div className="privacy-policy-area ptb-100">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-12">
							<div className="privacy-policy-content">
								{/* <Image src="/images/courses/courses1.jpg" alt="image" /> */}
								{document.content ?
									(<PortableText content={document.content[langCode]} />)
									: ""
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export async function getStaticProps() {
	const document = await findLegalDocumentByType(LEGAL_TYPES.PP);

	return {
		props: { document },
		revalidate: 3 * 60 * 60 // TODO: Regenerate page every 3 hours, in the beginning. Later, increase it to 24hrs+.
	}
}

export default PrivacyPolicy;