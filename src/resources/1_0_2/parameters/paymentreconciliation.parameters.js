const TokenScalar = require('../scalars/token.scalar');

/**
 * @name exports
 * @static
 * @summary Arguments for the paymentreconciliation query
 */
module.exports = {
	identifier: {
		type: TokenScalar,
		description: 'The business identifier of the Explanation of Benefit. See http://hl7.org/fhir/SearchParameter/paymentreconciliation-identifier.'
	}
};
