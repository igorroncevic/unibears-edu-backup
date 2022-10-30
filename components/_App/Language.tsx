import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
    Lang,
    languageChange,
    LANGUAGE_CODES,
} from '../../redux/reducers/user.reducer';

interface LanguageData {
    name: string;
    shortName: Lang;
    src: string;
}

const languages: LanguageData[] = [
    {
        name: 'Serbian',
        shortName: LANGUAGE_CODES.sr,
        src: '/images/languages/sr.svg',
    },
    {
        name: 'English',
        shortName: LANGUAGE_CODES.en,
        src: '/images/languages/en.svg',
    },
];

function Language() {
    const dispatch = useDispatch();
    const { i18n } = useTranslation('common');

    const [showLanguages, setShowLanguages] = useState(false);
    const [chosenLanguage, setChosenLanguage] = useState();

    const setLanguage = (lang: Lang) => {
        setChosenLanguage(languages.find((l) => l.shortName === lang));
    };

    useEffect(() => {
        setLanguage(
            (localStorage.getItem('i18nextLng') as Lang) || LANGUAGE_CODES.en
        );
    }, []);

    useEffect(() => {
        if (Object.keys(LANGUAGE_CODES).includes(i18n.language)) {
            dispatch(languageChange({ langCode: i18n.language as Lang }));
        }
    }, [i18n.language, dispatch]);

    const showLanguagesHandler = () => {
        setShowLanguages((prevState: any) => !prevState);
    };

    const changeLanguage = (language: LanguageData) => {
        dispatch(languageChange({ langCode: language.shortName }));
        i18n.changeLanguage(language.shortName);
        setLanguage(language.shortName);
        showLanguagesHandler();
    };

    const getLanguageHTML = (language: LanguageData) => {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={language.src} alt={`language_${language.shortName}`} />
        );
    };

    return (
        <div className="language_wrapper">
            <div className="box" onClick={showLanguagesHandler}>
                {chosenLanguage && getLanguageHTML(chosenLanguage)}
            </div>
            {showLanguages && (
                <div className="languages">
                    <ul>
                        {languages.map((language) => {
                            return (
                                language.shortName !==
                                    chosenLanguage?.shortName && (
                                    <li
                                        onClick={() => changeLanguage(language)}
                                        key={language.shortName}
                                    >
                                        {getLanguageHTML(language)}
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
