import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import PortableText from "../components/Common/CustomPortableText";

import PageBanner from "../components/Common/PageBanner";
import Preloader from "../components/_App/Preloader";
import { Translation } from "../redux/reducers/course.reducer";
import { AppState } from "../redux/reducers/reducers";
import {
	findLegalDocumentByType,
	LEGAL_TYPES,
} from "../services/legalDocuments.service";

export interface DocumentProps {
	document: { content: Translation };
}

const PrivacyPolicy = ({ document }: DocumentProps) => {
	const { langCode } = useSelector((state: AppState) => state.user);
	const [t] = useTranslation("common");

	if (!document) {
		return <Preloader />;
	}

	return (
		<Fragment>
			<PageBanner pageTitle={t("footer.privacyPolicy")} />

			<div className="privacy-policy-area ptb-100">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-12">
							<div className="privacy-policy-content">
								{/* <Image src="/images/courses/courses1.jpg" alt="image" /> */}
								{document.content ? (
									<PortableText content={document.content[langCode]} />
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export async function getStaticProps() {
	const document = await findLegalDocumentByType(LEGAL_TYPES.PP);

	return {
		props: { document },
		revalidate: 3 * 60 * 60, // TODO: Regenerate page every 3 hours, in the beginning. Later, increase it to 24hrs+.
	};
}

export default PrivacyPolicy;
