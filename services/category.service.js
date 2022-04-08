import { LANGUAGE_CODES } from "@/redux/constants/constants";
import { sanityClient } from "sanity.config";

export const categoriesFields = `'id': _id, name`;

export const findAllCategories = async () => {
	const query = `*[_type == "category"]{
        name
    }`;

	const categories = await sanityClient.fetch(query);

	return categories.map(category => category.name);
}

export const displayCategories = (categories, langCode) => {
	if (!categories) return "";

	let stringified = "";
	for (let i = 0; i < categories.length; i++) {
		const categoryName = categories[i][langCode];
		if (i == 0) {
			stringified = categoryName;
			continue;
		}
		stringified += `, ${categoryName}`;
	}

	return stringified;
}

export const categoriesFilterTranslated = (categories, langCode) => {
	return categories.map(category => category[langCode]); // Retain this for filtering purposes.
}

export const allCategoriesFilterTranslated = (langCode) => {
	switch (langCode) {
		case LANGUAGE_CODES.en:
			return "All"
		case LANGUAGE_CODES.sr:
			return "Svi"
		default:
			return "All"
	}
}
