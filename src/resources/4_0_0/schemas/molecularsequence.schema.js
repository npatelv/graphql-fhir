const {
	GraphQLNonNull,
	GraphQLEnumType,
	GraphQLList,
	GraphQLUnionType,
	GraphQLInt,
	GraphQLString,
	GraphQLObjectType,
} = require('graphql');
const IdScalar = require('../scalars/id.scalar.js');
const UriScalar = require('../scalars/uri.scalar.js');
const CodeScalar = require('../scalars/code.scalar.js');

/**
 * @name exports
 * @summary MolecularSequence Schema
 */
module.exports = new GraphQLObjectType({
	name: 'MolecularSequence',
	description: 'Raw data describing a biological sequence.',
	fields: () => ({
		resourceType: {
			type: new GraphQLNonNull(
				new GraphQLEnumType({
					name: 'MolecularSequence_Enum_schema',
					values: { MolecularSequence: { value: 'MolecularSequence' } },
				}),
			),
			description: 'Type of resource',
		},
		_id: {
			type: require('./element.schema.js'),
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		id: {
			type: IdScalar,
			description:
				'The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.',
		},
		meta: {
			type: require('./meta.schema.js'),
			description:
				'The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.',
		},
		_implicitRules: {
			type: require('./element.schema.js'),
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		implicitRules: {
			type: UriScalar,
			description:
				'A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.',
		},
		_language: {
			type: require('./element.schema.js'),
			description: 'The base language in which the resource is written.',
		},
		language: {
			type: CodeScalar,
			description: 'The base language in which the resource is written.',
		},
		text: {
			type: require('./narrative.schema.js'),
			description:
				"A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it 'clinically safe' for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
		},
		contained: {
			type: new GraphQLList(require('./resourcelist.schema')),
			description:
				'These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.',
		},
		extension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				'May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.',
		},
		modifierExtension: {
			type: new GraphQLList(require('./extension.schema.js')),
			description:
				"May be used to represent additional information that is not part of the basic definition of the resource and that modifies the understanding of the element that contains it and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.  Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
		},
		identifier: {
			type: new GraphQLList(require('./identifier.schema.js')),
			description:
				'A unique identifier for this particular sequence instance. This is a FHIR-defined id.',
		},
		_type: {
			type: require('./element.schema.js'),
			description: 'Amino Acid Sequence/ DNA Sequence / RNA Sequence.',
		},
		type: {
			type: CodeScalar,
			description: 'Amino Acid Sequence/ DNA Sequence / RNA Sequence.',
		},
		_coordinateSystem: {
			type: require('./element.schema.js'),
			description:
				'Whether the sequence is numbered starting at 0 (0-based numbering or coordinates, inclusive start, exclusive end) or starting at 1 (1-based numbering, inclusive start and inclusive end).',
		},
		coordinateSystem: {
			type: new GraphQLNonNull(GraphQLInt),
			description:
				'Whether the sequence is numbered starting at 0 (0-based numbering or coordinates, inclusive start, exclusive end) or starting at 1 (1-based numbering, inclusive start and inclusive end).',
		},
		patient: {
			type: new GraphQLUnionType({
				name: 'MolecularSequencepatient_patient_Union',
				description:
					'The patient whose sequencing results are described by this resource.',
				types: () => [require('./patient.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Patient') {
						return require('./patient.schema.js');
					}
				},
			}),
			description:
				'The patient whose sequencing results are described by this resource.',
		},
		specimen: {
			type: new GraphQLUnionType({
				name: 'MolecularSequencespecimen_specimen_Union',
				description: 'Specimen used for sequencing.',
				types: () => [require('./specimen.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Specimen') {
						return require('./specimen.schema.js');
					}
				},
			}),
			description: 'Specimen used for sequencing.',
		},
		device: {
			type: new GraphQLUnionType({
				name: 'MolecularSequencedevice_device_Union',
				description:
					'The method for sequencing, for example, chip information.',
				types: () => [require('./device.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Device') {
						return require('./device.schema.js');
					}
				},
			}),
			description: 'The method for sequencing, for example, chip information.',
		},
		performer: {
			type: new GraphQLUnionType({
				name: 'MolecularSequenceperformer_performer_Union',
				description:
					'The organization or lab that should be responsible for this result.',
				types: () => [require('./organization.schema.js')],
				resolveType(data) {
					if (data && data.resourceType === 'Organization') {
						return require('./organization.schema.js');
					}
				},
			}),
			description:
				'The organization or lab that should be responsible for this result.',
		},
		quantity: {
			type: require('./quantity.schema.js'),
			description:
				'The number of copies of the sequence of interest. (RNASeq).',
		},
		referenceSeq: {
			type: require('./molecularsequencereferenceseq.schema.js'),
			description:
				'A sequence that is used as a reference to describe variants that are present in a sequence analyzed.',
		},
		variant: {
			type: new GraphQLList(require('./molecularsequencevariant.schema.js')),
			description:
				'The definition of variant here originates from Sequence ontology ([variant_of](http://www.sequenceontology.org/browser/current_svn/term/variant_of)). This element can represent amino acid or nucleic sequence change(including insertion,deletion,SNP,etc.)  It can represent some complex mutation or segment variation with the assist of CIGAR string.',
		},
		_observedSeq: {
			type: require('./element.schema.js'),
			description:
				'Sequence that was observed. It is the result marked by referenceSeq along with variant records on referenceSeq. This shall start from referenceSeq.windowStart and end by referenceSeq.windowEnd.',
		},
		observedSeq: {
			type: GraphQLString,
			description:
				'Sequence that was observed. It is the result marked by referenceSeq along with variant records on referenceSeq. This shall start from referenceSeq.windowStart and end by referenceSeq.windowEnd.',
		},
		quality: {
			type: new GraphQLList(require('./molecularsequencequality.schema.js')),
			description:
				'An experimental feature attribute that defines the quality of the feature in a quantitative way, such as a phred quality score ([SO:0001686](http://www.sequenceontology.org/browser/current_svn/term/SO:0001686)).',
		},
		_readCoverage: {
			type: require('./element.schema.js'),
			description:
				'Coverage (read depth or depth) is the average number of reads representing a given nucleotide in the reconstructed sequence.',
		},
		readCoverage: {
			type: GraphQLInt,
			description:
				'Coverage (read depth or depth) is the average number of reads representing a given nucleotide in the reconstructed sequence.',
		},
		repository: {
			type: new GraphQLList(require('./molecularsequencerepository.schema.js')),
			description:
				"Configurations of the external repository. The repository shall store target's observedSeq or records related with target's observedSeq.",
		},
		pointer: {
			type: new GraphQLList(
				new GraphQLUnionType({
					name: 'MolecularSequencepointer_pointer_Union',
					description:
						'Pointer to next atomic sequence which at most contains one variant.',
					types: () => [require('./molecularsequence.schema.js')],
					resolveType(data) {
						if (data && data.resourceType === 'MolecularSequence') {
							return require('./molecularsequence.schema.js');
						}
					},
				}),
			),
			description:
				'Pointer to next atomic sequence which at most contains one variant.',
		},
		structureVariant: {
			type: new GraphQLList(
				require('./molecularsequencestructurevariant.schema.js'),
			),
			description: 'Information about chromosome structure variation.',
		},
	}),
});
