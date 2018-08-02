const DateTimeScalar = require('../scalars/datetime.scalar');
const CodeScalar = require('../scalars/code.scalar');
const DateScalar = require('../scalars/date.scalar');
const { GraphQLObjectType, GraphQLEnumType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

// TODO: Verify this is the correct resourceType
let FamilyMemberHistoryResourceType = new GraphQLEnumType({
	name: 'FamilyMemberHistoryResourceType',
	values: {
		FamilyMemberHistory: { value: 'FamilyMemberHistory' }
	}
});

/**
 * @name exports
 * @summary FamilyMemberHistory Schema
 */
module.exports = new GraphQLObjectType({
	name: 'FamilyMemberHistory',
	description: 'Base StructureDefinition for FamilyMemberHistory Resource.',
	fields: () => extendSchema(require('./domainresource.schema'), {
		resourceType: {
			type: new GraphQLNonNull(FamilyMemberHistoryResourceType),
			description: 'Type of this resource'
		},
		identifier: {
			type: new GraphQLList(require('./identifier.schema')),
			description: 'This records identifiers associated with this family member history record that are defined by business processes and/ or used to refer to it when a direct URL reference to the resource itself is not appropriate (e.g. in CDA documents, or in written / printed documentation).'
		},
		patient: {
			type: new GraphQLNonNull(require('./reference.schema')),
			description: 'The person who this history concerns.'
		},
		date: {
			type: DateTimeScalar,
			description: 'The date (and possibly time) when the family member history was taken.'
		},
		_date: {
			type: require('./element.schema'),
			description: 'The date (and possibly time) when the family member history was taken.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/history-status
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'A code specifying a state of a Family Member History record.'
		},
		_status: {
			type: require('./element.schema'),
			description: 'A code specifying a state of a Family Member History record.'
		},
		name: {
			type: GraphQLString,
			description: 'This will either be a name or a description; e.g. \'Aunt Susan\', \'my cousin with the red hair\'.'
		},
		_name: {
			type: require('./element.schema'),
			description: 'This will either be a name or a description; e.g. \'Aunt Susan\', \'my cousin with the red hair\'.'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/v3-FamilyMember
		relationship: {
			type: new GraphQLNonNull(require('./codeableconcept.schema')),
			description: 'The type of relationship this person has to the patient (father, mother, brother etc.).'
		},
		// TODO: ValueSetReference: http://hl7.org/fhir/ValueSet/administrative-gender
		gender: {
			type: CodeScalar,
			description: 'Administrative Gender - the gender that the relative is considered to have for administration and record keeping purposes.'
		},
		_gender: {
			type: require('./element.schema'),
			description: 'Administrative Gender - the gender that the relative is considered to have for administration and record keeping purposes.'
		},
		bornPeriod: {
			type: require('./period.schema'),
			description: 'The actual or approximate date of birth of the relative.'
		},
		bornDate: {
			type: DateScalar,
			description: 'The actual or approximate date of birth of the relative.'
		},
		_bornDate: {
			type: require('./element.schema'),
			description: 'The actual or approximate date of birth of the relative.'
		},
		bornString: {
			type: GraphQLString,
			description: 'The actual or approximate date of birth of the relative.'
		},
		_bornString: {
			type: require('./element.schema'),
			description: 'The actual or approximate date of birth of the relative.'
		},
		ageQuantity: {
			type: require('./quantity.schema'),
			description: 'The actual or approximate age of the relative at the time the family member history is recorded.'
		},
		ageRange: {
			type: require('./range.schema'),
			description: 'The actual or approximate age of the relative at the time the family member history is recorded.'
		},
		ageString: {
			type: GraphQLString,
			description: 'The actual or approximate age of the relative at the time the family member history is recorded.'
		},
		_ageString: {
			type: require('./element.schema'),
			description: 'The actual or approximate age of the relative at the time the family member history is recorded.'
		},
		deceasedBoolean: {
			type: GraphQLBoolean,
			description: 'Deceased flag or the actual or approximate age of the relative at the time of death for the family member history record.'
		},
		_deceasedBoolean: {
			type: require('./element.schema'),
			description: 'Deceased flag or the actual or approximate age of the relative at the time of death for the family member history record.'
		},
		deceasedQuantity: {
			type: require('./quantity.schema'),
			description: 'Deceased flag or the actual or approximate age of the relative at the time of death for the family member history record.'
		},
		deceasedRange: {
			type: require('./range.schema'),
			description: 'Deceased flag or the actual or approximate age of the relative at the time of death for the family member history record.'
		},
		deceasedDate: {
			type: DateScalar,
			description: 'Deceased flag or the actual or approximate age of the relative at the time of death for the family member history record.'
		},
		_deceasedDate: {
			type: require('./element.schema'),
			description: 'Deceased flag or the actual or approximate age of the relative at the time of death for the family member history record.'
		},
		deceasedString: {
			type: GraphQLString,
			description: 'Deceased flag or the actual or approximate age of the relative at the time of death for the family member history record.'
		},
		_deceasedString: {
			type: require('./element.schema'),
			description: 'Deceased flag or the actual or approximate age of the relative at the time of death for the family member history record.'
		},
		note: {
			type: require('./annotation.schema'),
			description: 'This property allows a non condition-specific note to the made about the related person. Ideally, the note would be in the condition property, but this is not always possible.'
		},
		condition: {
			type: new GraphQLList(require('./familymemberhistorycondition.schema')),
			description: 'The significant Conditions (or condition) that the family member had. This is a repeating section to allow a system to represent more than one condition per resource, though there is nothing stopping multiple resources - one per condition.'
		}
	})
});
