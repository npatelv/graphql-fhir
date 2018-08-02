// Schemas
const ProcessResponseSchema = require('../../schemas/processresponse.schema');
const BundleSchema = require('../../schemas/bundle.schema');

// Arguments
const ProcessResponseArgs = require('../../parameters/processresponse.parameters');
const CommonArgs = require('../../parameters/common.parameters');

const {
	processresponseResolver,
	processresponseListResolver,
	processresponseInstanceResolver
} = require('./resolver');

/**
 * @name exports.ProcessResponseQuery
 * @summary ProcessResponse Query.
 */
module.exports.ProcessResponseQuery = {
	args: Object.assign({}, CommonArgs, ProcessResponseArgs),
	description: 'Query for a single ProcessResponse',
	resolve: processresponseResolver,
	type: ProcessResponseSchema
};

/**
 * @name exports.ProcessResponseListQuery
 * @summary ProcessResponseList Query.
 */
module.exports.ProcessResponseListQuery = {
	args: Object.assign({}, CommonArgs, ProcessResponseArgs),
	description: 'Query for multiple ProcessResponses',
	resolve: processresponseListResolver,
	type: BundleSchema
};

/**
 * @name exports.ProcessResponseInstanceQuery
 * @summary ProcessResponseInstance Query.
 */
module.exports.ProcessResponseInstanceQuery = {
	description: 'Get information about a single ProcessResponse',
	resolve: processresponseInstanceResolver,
	type: ProcessResponseSchema
};
