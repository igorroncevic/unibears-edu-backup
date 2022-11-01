import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PortableText from '../components/Common/CustomPortableText';
import PageBanner from '../components/Common/PageBanner';
import Preloader from '../components/_App/Preloader';
import { getUser } from '../redux/selectors';
import {
    findLegalDocumentByType,
    LEGAL_TYPES,
} from '../services/legalDocuments.service';
import { DocumentProps } from './privacy-policy';

function TermsOfService({ document }: DocumentProps) {
    const { langCode } = useSelector(getUser);
    const [t] = useTranslation('common');

    if (!document) {
        return <Preloader />;
    }

    return (
        <>
            <PageBanner pageTitle={t('footer.tos')} />

            <div className="terms-of-service-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="terms-of-service-content">
                                {/* <Image src="/images/courses/courses2.jpg" alt="image" /> */}
                                {document.content ? (
                                    <PortableText
                                        content={document.content[langCode]}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const document = await findLegalDocumentByType(LEGAL_TYPES.TOS);

    return {
        props: { document },
        revalidate: 3 * 60 * 60, // TODO: Regenerate page every 3 hours, in the beginning. Later, increase it to 24hrs+.
    };
}

export default TermsOfService;
