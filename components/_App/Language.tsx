import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useLanguage, {
    LanguageData,
    languages,
} from '../../customHooks/useLanguage';
import { languageChange } from '../../redux/reducers/user.reducer';

function LanguageImage({ language }: { language: LanguageData }) {
    return (
        <Image
            src={language.src}
            alt={`language_${language.shortName}`}
            width="30px"
            height="20px"
        />
    );
}

function Language() {
    const dispatch = useDispatch();
    const { i18n } = useTranslation('common');

    const [showLangMenu, setShowLangMenu] = useState(false);
    const [language, setLanguage] = useLanguage();

    const showLanguagesHandler = () => {
        setShowLangMenu((prevState: any) => !prevState);
    };

    const changeLanguage = (lang: LanguageData) => {
        dispatch(languageChange({ langCode: lang.shortName }));
        i18n.changeLanguage(lang.shortName);
        setLanguage(lang.shortName);
        showLanguagesHandler();
    };

    return (
        <div className="language_wrapper">
            <div className="box" onClick={showLanguagesHandler}>
                {language && <LanguageImage language={language} />}
            </div>
            {showLangMenu && (
                <div className="languages">
                    <ul>
                        {languages.map((lang: LanguageData) => {
                            return (
                                lang.shortName !== language?.shortName && (
                                    <li
                                        onClick={() => changeLanguage(lang)}
                                        key={lang.shortName}
                                    >
                                        <LanguageImage language={lang} />
                                    </li>
                                )
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Language;
