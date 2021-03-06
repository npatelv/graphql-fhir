const {
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInputObjectType,
} = require('graphql');
const CodeScalar = require('../scalars/code.scalar.js');

/**
 * @name exports
 * @summary ValueSetcomposeincludefilter Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'ValueSetcomposeincludefilter_Input',
	description: '',
	fields: () => ({
		_id: {
			type: require('./element.input.js'),
			description:
				'unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		id: {
			type: GraphQLString,
			description:
				'unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
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
		_property: {
			type: require('./element.input.js'),
			description:
				'A code that identifies a property defined in the code system.',
		},
		property: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'A code that identifies a property defined in the code system.',
		},
		_op: {
			type: require('./element.input.js'),
			description:
				'The kind of operation to perform as a part of the filter criteria.',
		},
		// valueSetReference: http://hl7.org/fhir/ValueSet/filter-operator
		op: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				'The kind of operation to perform as a part of the filter criteria.',
		},
		_value: {
			type: require('./element.input.js'),
			description:
				"The match value may be either a code defined by the system, or a string value, which is a regex match on the literal string of the property value when the operation is 'regex', or one of the values (true and false), when the operation is 'exists'.",
		},
		value: {
			type: new GraphQLNonNull(CodeScalar),
			description:
				"The match value may be either a code defined by the system, or a string value, which is a regex match on the literal string of the property value when the operation is 'regex', or one of the values (true and false), when the operation is 'exists'.",
		},
	}),
});
