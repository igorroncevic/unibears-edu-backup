// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Types
import topic from './types/topic';
import lecture from './types/lecture';
import blockContent from './types/blockContent';
import localeString from './types/localeString';
import localeBlockContent from './types/localeBlockContent';

// Schemas
import category from './category';
import author from './author';
import course from './course';
import legalDocument from './legalDocument';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'default',
	types: schemaTypes.concat([
		author,
		course,
		category,
		legalDocument,
		// When added to this list, object types can be used as
		// { type: 'typename' } in other document schemas
		blockContent,
		topic,
		lecture,
		localeString,
		localeBlockContent
	]),
});
