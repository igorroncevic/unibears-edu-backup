import { Category } from '../redux/reducers/course.reducer';
import { Lang, LANGUAGE_CODES } from '../redux/reducers/user.reducer';
import { sanityClient } from '../sanity.config';

export const categoriesFields = `'id': _id, name`;

export const findAllCategories = async () => {
    const query = `*[_type == "category"]{
        name
    }`;

    const categories = await sanityClient.fetch(query);

    return categories.map((category: Category) => category);
};

export const displayCategories = (categories: Category[], langCode: Lang) => {
    if (!categories) return '';

    let stringified = '';
    categories.forEach((category, i) => {
        const categoryName = category.name[langCode];
        if (i === 0) {
            stringified = categoryName;
        } else {
            stringified += `, ${categoryName}`;
        }
    });
    return stringified;
};

export const categoriesFilterTranslated = (
    categories: Category[],
    langCode: Lang
) => {
    return categories.map((category) => category.name[langCode]); // Retain this for filtering purposes.
};

export const allCategoriesFilterTranslated = (langCode: Lang) => {
    switch (langCode) {
        case LANGUAGE_CODES.en:
            return 'All';
        case LANGUAGE_CODES.sr:
            return 'Svi';
        default:
            return 'All';
    }
};
