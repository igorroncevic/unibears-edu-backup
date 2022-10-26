import { sanityClient } from '../sanity.config';

const legalDocumentFields = `'id': _id, name, legalType, content`;

export const LEGAL_TYPES = {
    PP: 'PP',
    TOS: 'TOS',
};

export const findLegalDocumentByType = async (legalType: string) => {
    const query = `*[_type == "legalDocument" && legalType == $legalType][0] {
        ${legalDocumentFields},
      }`;

    return await sanityClient.fetch(query, { legalType });
};
