import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
    Lang,
    languageChange,
    LANGUAGE_CODES,
} from '../redux/reducers/user.reducer';

export interface LanguageData {
    name: string;
    shortName: Lang;
    src: string;
}

export const languages: LanguageData[] = [
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

const useLanguage = () => {
    const dispatch = useDispatch();
    const { i18n } = useTranslation('common');
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

    return [chosenLanguage, setLanguage];
};

export default useLanguage;
