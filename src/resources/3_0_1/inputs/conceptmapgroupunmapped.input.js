const CodeScalar = require('../scalars/code.scalar');
const UriScalar = require('../scalars/uri.scalar');
const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');



/**
 * @name exports
 * @summary ConceptMapGroupUnmapped Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'ConceptMapGroupUnmapped_Input',
	description: 'What to do when there is no match in the mappings in the group.',
	fields: () => extendSchema(require('./backboneelement.input'), {
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/conceptmap-unmapped-mode
		mode: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'Defines which action to take if there is no match in the group. One of 3 actions is possible: use the unmapped code (this is useful when doing a mapping between versions, and only a few codes have changed), use a fixed code (a default code), or alternatively, a reference to a different concept map can be provided (by canonical URL).'
		},
		_mode: {
			type: require('./element.input'),
			description: 'Defines which action to take if there is no match in the group. One of 3 actions is possible: use the unmapped code (this is useful when doing a mapping between versions, and only a few codes have changed), use a fixed code (a default code), or alternatively, a reference to a different concept map can be provided (by canonical URL).'
		},
		code: {
			type: CodeScalar,
			description: 'The fixed code to use when the mode = \'fixed\'  - all unmapped codes are mapped to a single fixed code.'
		},
		_code: {
			type: require('./element.input'),
			description: 'The fixed code to use when the mode = \'fixed\'  - all unmapped codes are mapped to a single fixed code.'
		},
		display: {
			type: GraphQLString,
			description: 'The display for the code. The display is only provided to help editors when editing the concept map.'
		},
		_display: {
			type: require('./element.input'),
			description: 'The display for the code. The display is only provided to help editors when editing the concept map.'
		},
		url: {
			type: UriScalar,
			description: 'The canonical URL of the map to use if this map contains no mapping.'
		},
		_url: {
			type: require('./element.input'),
			description: 'The canonical URL of the map to use if this map contains no mapping.'
		}
	})
});
