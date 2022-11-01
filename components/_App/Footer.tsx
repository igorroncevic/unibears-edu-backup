import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { PATH_NAMES } from '../../utils/routing';

// this needs to be date when project started; not current year
const currentYear = new Date().getFullYear();

function Footer() {
    const [t] = useTranslation('common');

    return (
        <footer className="footer-area">
            <div className="container">
                <div className="footer-bottom-area">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <p>
                                <i className="bx bx-copyright" />
                                {currentYear} Project EDU
                            </p>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <ul>
                                <li>
                                    <Link href={PATH_NAMES.PrivacyPolicy}>
                                        {t('footer.privacyPolicy')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={PATH_NAMES.TermsOfService}>
                                        {t('footer.tos')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
