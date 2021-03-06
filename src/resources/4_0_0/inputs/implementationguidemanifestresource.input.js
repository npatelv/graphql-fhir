const {
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLInputObjectType,
} = require('graphql');
const CanonicalScalar = require('../scalars/canonical.scalar.js');
const UrlScalar = require('../scalars/url.scalar.js');

/**
 * @name exports
 * @summary ImplementationGuidemanifestresource Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'ImplementationGuidemanifestresource_Input',
	description: '',
	fields: () => ({
		_id: {
			type: require('./element.input.js'),
			description:
				'Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		id: {
			type: GraphQLString,
			description:
				'Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.',
		},
		extension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.input.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the element and that modifies the understanding of the element in which it is contained and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		reference: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Where this resource is found.',
		},
		_exampleBoolean: {
			type: require('./element.input.js'),
			description:
				'If true or a reference, indicates the resource is an example instance.  If a reference is present, indicates that the example is an example of the specified profile.',
		},
		exampleBoolean: {
			type: GraphQLBoolean,
			description:
				'If true or a reference, indicates the resource is an example instance.  If a reference is present, indicates that the example is an example of the specified profile.',
		},
		_exampleCanonical: {
			type: require('./element.input.js'),
			description:
				'If true or a reference, indicates the resource is an example instance.  If a reference is present, indicates that the example is an example of the specified profile.',
		},
		exampleCanonical: {
			type: CanonicalScalar,
			description:
				'If true or a reference, indicates the resource is an example instance.  If a reference is present, indicates that the example is an example of the specified profile.',
		},
		_relativePath: {
			type: require('./element.input.js'),
			description:
				'The relative path for primary page for this resource within the IG.',
		},
		relativePath: {
			type: UrlScalar,
			description:
				'The relative path for primary page for this resource within the IG.',
		},
	}),
});
