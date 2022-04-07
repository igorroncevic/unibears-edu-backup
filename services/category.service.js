import { sanityClient } from "sanity.config";

export const categoriesFields = `'id': _id, name`;

export const findAllCategories = async () => {
	const query = `*[_type == "category"]{
        name
    }`;

	const categories = await sanityClient.fetch(query);

	return categories.map(category => category.name);
}