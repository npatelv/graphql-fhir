// Schemas
const NutritionOrderSchema = require('../../schemas/nutritionorder.schema');
const BundleSchema = require('../../schemas/bundle.schema');

// Arguments
const NutritionOrderArgs = require('../../parameters/nutritionorder.parameters');
const CommonArgs = require('../../parameters/common.parameters');

const {
	nutritionorderResolver,
	nutritionorderListResolver,
	nutritionorderInstanceResolver
} = require('./resolver');

/**
 * @name exports.NutritionOrderQuery
 * @summary NutritionOrder Query.
 */
module.exports.NutritionOrderQuery = {
	args: Object.assign({}, CommonArgs, NutritionOrderArgs),
	description: 'Query for a single NutritionOrder',
	resolve: nutritionorderResolver,
	type: NutritionOrderSchema
};

/**
 * @name exports.NutritionOrderListQuery
 * @summary NutritionOrderList Query.
 */
module.exports.NutritionOrderListQuery = {
	args: Object.assign({}, CommonArgs, NutritionOrderArgs),
	description: 'Query for multiple NutritionOrders',
	resolve: nutritionorderListResolver,
	type: BundleSchema
};

/**
 * @name exports.NutritionOrderInstanceQuery
 * @summary NutritionOrderInstance Query.
 */
module.exports.NutritionOrderInstanceQuery = {
	description: 'Get information about a single NutritionOrder',
	resolve: nutritionorderInstanceResolver,
	type: NutritionOrderSchema
};