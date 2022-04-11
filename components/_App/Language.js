import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { languageChange } from "@/redux/actions/user.actions";
import { LANGUAGE_CODES } from "@/redux/constants/constants";

const languages = [
	{
		name: "Serbian",
		shortName: LANGUAGE_CODES.sr,
		src: "/images/languages/sr.svg",
	},
	{
		name: "English",
		shortName: LANGUAGE_CODES.en,
		src: "/images/languages/en.svg",
	},
];


const Language = () => {
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation("common");

	const [showLanguages, setShowLanguages] = useState(false);
	const [chosenLanguage, setChosenLanguage] = useState();

	useEffect(() => {
		setLanguage(localStorage.getItem("i18nextLng") || LANGUAGE_CODES.en);
	}, []);

	useEffect(() => {
		if (Object.keys(LANGUAGE_CODES).includes(i18n.language)) {
			dispatch(languageChange({ language: i18n.language }));
		}
	}, [i18n.language])

	const changeLanguage = (language) => {
		dispatch(languageChange({ language: language.shortName }));
		i18n.changeLanguage(language.shortName);
		setLanguage(language.shortName);
		showLanguagesHandler();
	};

	const setLanguage = (lang) => {
		setChosenLanguage(languages.find((l) => l.shortName === lang));
	};

	const showLanguagesHandler = () => {
		setShowLanguages((prevState) => !prevState);
	};

	const getLanguageHTML = (language) => {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img src={language.src} alt={`language_${language.shortName}`}/>
				
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
								chosenLanguage.shortName && (
									<li
										onClick={() => changeLanguage(language)}
										key={language.shortName}>
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
};

export default Language;