const { GraphQLInputObjectType } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');



/**
 * @name exports
 * @summary Duration Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'Duration_Input',
	description: 'Base StructureDefinition for Duration Type.',
	fields: () => extendSchema(require('./quantity.input'))
});
