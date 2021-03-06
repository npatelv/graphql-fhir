const {
	GraphQLList,
	GraphQLString,
	GraphQLInputObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');

/**
 * @name exports
 * @summary NutritionOrdersupplement Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'NutritionOrdersupplement_Input',
	description: '',
	fields: () => ({
		_id: {
			type: require('./element.input.js'),
			description:
				'unique id for the element within a resource (for internal references).',
		},
		id: {
			type: IdScalar,
			description:
				'unique id for the element within a resource (for internal references).',
		},
		extension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element. In order to make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element, and that modifies the understanding of the element that contains it. Usually modifier elements provide negation or qualification. In order to make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/supplement-type
		type: {
			type: require('./codeableconcept.input.js'),
			description:
				'The kind of nutritional supplement product required such as a high protein or pediatric clear liquid supplement.',
		},
		_productName: {
			type: require('./element.input.js'),
			description:
				"The product or brand name of the nutritional supplement such as 'Acme Protein Shake'.",
		},
		productName: {
			type: GraphQLString,
			description:
				"The product or brand name of the nutritional supplement such as 'Acme Protein Shake'.",
		},
		schedule: {
			type: new GraphQLList(require('./timing.input.js')),
			description:
				'The time period and frequency at which the supplement(s) should be given.',
		},
		quantity: {
			type: require('./quantity.input.js'),
			description: 'The amount of the nutritional supplement to be given.',
		},
		_instruction: {
			type: require('./element.input.js'),
			description:
				'Free text or additional instructions or information pertaining to the oral supplement.',
		},
		instruction: {
			type: GraphQLString,
			description:
				'Free text or additional instructions or information pertaining to the oral supplement.',
		},
	}),
});
