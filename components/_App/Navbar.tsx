import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PATH_NAMES } from '../../utils/routing';
import WalletButton from '../Common/WalletButton';
import Language from './Language';

const mobileDevices =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

function Navbar() {
    const [t] = useTranslation(['common', 'toasts']);
    const [menu, setMenu] = useState(true);

    useEffect(() => {
        if (!mobileDevices.test(navigator.userAgent)) {
            const elementId = document.getElementById('navbar');

            const addSticky = () => {
                if (elementId) {
                    if (window.scrollY > 50) {
                        elementId.classList.add('is-sticky');
                    } else {
                        elementId.classList.remove('is-sticky');
                    }
                }
            };

            document.addEventListener('scroll', addSticky);
            window.scrollTo(0, 0);

            return () => document.removeEventListener('scroll', addSticky);
        }
    }, []);

    const toggleNavbar = () => {
        setMenu(!menu);
    };

    const classOne = menu
        ? 'collapse navbar-collapse'
        : 'collapse navbar-collapse show';
    const classTwo = menu
        ? 'navbar-toggler navbar-toggler-right collapsed'
        : 'navbar-toggler navbar-toggler-right';

    return (
        <div id="navbar" className="navbar-area">
            <div className="learning-platform-nav">
                <div className="container-fluid">
                    <div className="navbar navbar-expand-lg navbar-light">
                        <a className="navbar-brand" href={PATH_NAMES.Index}>
                            <Image
                                src="/images/logo-black.svg"
                                alt="logo"
                                width="150px"
                                height="75px"
                            />
                        </a>

                        <button
                            onClick={toggleNavbar}
                            className={classTwo}
                            type="button"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="icon-bar top-bar" />
                            <span className="icon-bar middle-bar" />
                            <span className="icon-bar bottom-bar" />
                        </button>

                        <div className={classOne} id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a
                                        href={PATH_NAMES.MintPage}
                                        className="nav-link"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {t('navbar.buyUnibear')}
                                    </a>
                                </li>
                                <li className="nav-item megamenu">
                                    <a
                                        className="nav-link"
                                        href={PATH_NAMES.CoursesIndex}
                                    >
                                        {t('navbar.courses')}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Language />
                                </li>
                            </ul>

                            <div className="others-option d-flex align-items-center">
                                <div className="option-item">
                                    <WalletButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
