GraphQL-FHIR
============
> A secure GraphQL implementation for the [HL7 FHIR specification](https://www.hl7.org/fhir/) based on the current implementation guide for [GraphQL with FHIR](https://build.fhir.org/graphql.html) and developed with Node.js and Express.

## Prerequisites

You should have a basic understanding of working in Node.js and at least a basic understanding of what GraphQL is and how it works.

## Getting Started

1. Installation
```shell
git clone https://github.com/Asymmetrik/graphql-fhir.git
cd graphql-fhir
yarn install
```
2. Usage
```shell
# For development
yarn nodemon
# For testing, this will watch all files
# and rerun the tests on change
yarn test
# Run the tests once and generate coverage
yarn test --coverage
# Run the linter
yarn lint
```
3. View `http://localhost:3000/3_0_1/$graphiql` to explore the available queries and mutations in the graphiql interface. The standard graphql endpoint is available at `http://localhost:3000/3_0_1/$graphql`.


## Next Steps
See the [Architecture](#architecture) section below to get an understanding of how this project is laid out and where things are. We will be adding support to more versions/profiles in the future, but we currently support DSTU2 base (1.0.2) and STU3 base (3.0.1). We enable all resources by default, but give you a way to disable capabilities per resource so you can customize your server's capabilities or slowly add more features over time.


### Architecture

The current folder structure can be seen below. It's designed this way so we can support multiple versions simultaneously and because we plan to generate a lot of this code from [Structure Definitions](https://www.hl7.org/fhir/structuredefinition.html). Specifically everything in `src/resources` will be generated from structure definitions, which will make it very easy to control what your server can and can't do. The code generation tool we used for this will be open sourced soon.

```shell
src
|- config.js
|  # config.js contains application configuration. Be careful when editing this file unless you have
|  # read the code and understand what you are doing. This section is subject to change as we work on
|  # making this repo a little more stable.
|- index.js
|  # index.js is the entry to the application. It grabs the server class and builds the graphql server.
|- src/lib
|  # src/lib directory contains the winston logger and server class. Documentation for these classes
|  # can be seen in code. The server instance is passed to graphql resolvers via context.
|- src/middleware
|  # src/middleware contains various middleware for express. There is an authentication stub that will
|  # eventually be used to connect to OAuth or Smart on FHIR. It currently just calls next and shows
|  # how we can look at the incoming query and make decisions on whether or not to allow the request.
|- src/scripts
|  # src/scripts contains development and test scripts.
|- src/utils
|  # src/utils contains various utilities for routing, error handling and formatting, resolving file
|  # locations in the application, and working with graphql schemas (such as extending fields from
|  # other schemas and validating data against an json).
|- src/resources
|  # src/resources contains all the FHIR resource code for declaring schemas, parameters, custom
|  # types, enums, queries, mutations, resolvers, and what operations you want to support.
|  |- 3_0_1
|  |  # 3_0_1 contains all code related to resources on FHIR version 3.0.1. We may have various
|  |  # version folders alongside this in the future.
|  |  |- inputs
|  |  |  # inputs contains input schemas. This defines inputs for all resource types so they can
|  |  |  # be used as arguments when creating resources, which allows validation on write.
|  |  |- parameters
|  |  |  # parameters defines what arguments can be provided to search operations.
|  |  |- scalars
|  |  |  # scalars contains some custom FHIR types and map to types defined in structure definitions.
|  |  |  # This allows types like datetime, instant, and code to be used as input and output types.
|  |  |  # as well as stricter enforcement on fhir primitives.
|  |  |- schemas
|  |  |  # schemas contains all the output schemas. These will cover all resources from
|  |  |  # BackboneElement to Patient. This currently has the minimum number of schemas to support
|  |  |  # Patient profiles.
|  |  |- profiles
|  |  |  # profiles contains all the queries and mutations for GraphQL. It also contains the
|  |  |  # resolvers, which is where query logic should go, and a index file declaring which
|  |  |  # operations you want to support on the profile.
|  |  |  |- patient
|  |  |  |  # Code for the patient profile will be here. All the files here will eventually be
|  |  |  |  # generated.  You will most likely be using index.js and resolver.js.
|  |  |  |  |- index.js
|  |  |  |  |  # Look at the current version for an example. Initially Read, ReadList, Create,
|  |  |  |  |  # Update, Delete, and InstanceRead are supported. You can remove any one of these
|  |  |  |  |  # operations if you do not want to support them. The server will locate all
|  |  |  |  |  # profiles and add any operations defined in the index.js files.
|  |  |  |  |- mutation.js
|  |  |  |  |  # mutation.js will be generated. Mutations are defined here but included in the app
|  |  |  |  |  # via the index.js file. You should not need to change this file unless your adding
|  |  |  |  |  # nested queries or directive support.
|  |  |  |  |- query.js
|  |  |  |  |  # query.js will be generated. Queries are defined here but included in the app
|  |  |  |  |  # via the index.js file. You should not need to change this file unless your adding
|  |  |  |  |  # nested queries or directive support.
|  |  |  |  |- resolver.js
|  |  |  |  |  # resolver.js contains query logic. This is where you will query your backend and
|  |  |  |  |  # return FHIR formatted data to GraphQL. GraphQL will validate data coming back
|  |  |  |  |  # from your data source and pass the results or errors back to the client.
```

### Config

In `src/config` there are a couple of different things you can configure at the moment. We will be adding more features to this in the future so please be aware that this section is subject to change.

#### Versions

There is a `VERSION` constant in `src/config`. This defines the versions your application can use. It is highly encouraged not to use versions like 'STU3', rather you should use something like '3_0_1' or '3.0.1'. STU3 can be misleading because there are many minor versions and profiles under that umbrella. The versions here also correspond to a resource folder. So for example, if you see 3_0_1 in the VERSION constant, there is also a `src/resources/3_0_1` directory which contains all the code to support that version.

Every key that is present in the VERSION constant will activate that version of FHIR resources for your server. So if your version const looks like this:

```javascript
const VERSION = {
	'1_0_2': '1_0_2',
	'3_0_1': '3_0_1'
};
```

Then your GraphQL server will support both versions at `/1_0_2/$graphql` and `/3_0_1/$graphql`. If you only want to support DSTU2 (1.0.2), then remove the STU3 (3.0.1) key.

### Configuring capabilities

Under `src/resources`, there are version specific directories. In each one, there is a `profiles` directory which contains an `index.js` file that declares that profiles capability. So for example, if you wanted to customize the Patient profile in STU3 (3.0.1), you would edit `src/resources/3_0_1/profiles/patient/index.js`. You can decide whether you want to support a query, list query, create, update, delete, and instance read, or nothing at all.

Supporting nothing is the easiest, just delete the directory or comment out everything in the index.js file. If you want to disable specific capabilities, comment out those in the index.js file. For example, here is a sample patient profile with comments explaining what features you can disable.

```javascript
module.exports = {
	// Comment out to disable all basic queries
	query: {
		// Comment out to disable individual patient read
		Patient: PatientQuery,
		// Comment out to disable querying a bundle of patients
		PatientList: PatientListQuery
	},
	// Comment out to disable all mutations
	mutation: {
		// Comment out to disable creating patients
		PatientCreate: PatientCreateMutation,
		// Comment out to disable updating patients
		PatientUpdate: PatientUpdateMutation,
		// Comment out to disable deleting patients
		PatientDelete: PatientDeleteMutation
	},
	// Comment out to disable instance read, this endpoint would take no arguments
	// and just outfields the user wants back. So /3_0_1/Patient/2/$graphql would
	// be enabled and can return data for patient with unique id 2
	instance_query: {
		name: 'Patient',
		path: '/3_0_1/Patient/:id',
		query: PatientInstanceQuery
	}
}
```

### Connecting to a data source

There is a function stubbed out in `src/lib/server` called `initializeDatabaseConnection`. You can add connection code here. Keep in mind that if your connection code is asynchronous, you will need to modify the code in `src/index` to account for that. Just to give you an idea of what I mean, here is an untested example that demonstrates connecting to mongo (note that some code is specific to mongo's implementation):

```javascript
// In src/lib/server.js

// These methods typically return self for chaining, but we need to return a promise
// or use async/await, for this example, I will use promises
initializeDatabaseConnection (options = {}) {
	// Make sure to use an arrow function so we can access this
	return new Promise((resolve, reject) => {
		let { url, db_name, mongo_options } = options;
		MongoClient.connect(url, mongo_options, (err, client) => {
			if (err) { return reject(err); }
			// store this db instance on the server, this
			// is critical for accessing the connection later
			this.client = client;
			this.db = client.db(db_name);
			return resolve();
		});
	});
}

// In src/index.js, modify the code to look something like this

// Start buliding our server
let server = new FHIRServer(SERVER_CONFIG)
	.configureMiddleware()
	.configureHelmet()
	.setProfileRoutes()
	.setErrorRoutes();

server.initializeDatabaseConnection({
	// Add your mongo hostname below
	url: 'mongodb://' + mongo_hostname,
	db_name: 'my_mongo_database_name',
	mongo_options: { auto_reconnect: true }
})
.then(() => {
	server.listen(SERVER_CONFIG.port);
	server.logger.info('FHIR Server listening on localhost:' + SERVER_CONFIG.port);
})
.catch(err => {
	server.logger.error('Fatal Error connecting to Mongo.');
});


// Now, because we pass the server through to your resolvers via context, 
// you can access your database connection in all of your resolvers

// This will be available to all resolvers in the same manner, but here is an
// example of getting this db in a patient resolver

// In src/resources/3_0_1/profiles/patient/resolver.js
module.exports.patientResolver = function patientResolver (root, args, context, info) {
	let { server, req, res, version } = context;
	let { db, client, logger } = server;
	// In graphql, you can return data, a promise, or an array of promises.
	// Let's do a fake id query, a real resolver needs much more capability than this
	return new Promise((resolve, reject) => {
		db.find({ id: args._id }, (err, patient) => {
			// Use our special error handlers to make your error a operation outcome
			// and place it in a GraphQL error, note this particular detail is subject
			// to change while we entertain ideas for more flexible and easy to use errors
			if (err) {
				// This is where knowledge of FHIR comes in, you need to know which kind of
				// error to throw based on the err, let's assume a simple internal server
				// error for this example
				let error = errorUtils.internal(version, err.message);
				// Log the error
				logger.error(error);
				// reject it so GraphQL can return a proper GraphQL Error
				// This is really important as we need to return errors in a format
				// compatible with both specifications, FHIR and GraphQL
				reject(errorUtils.formatErrorForGraphQL(error));
			}
			else {
				resolve(patient);
			}
		});
	});
};

```

## Roadmap for the future

### Short term goals:

- [ ] Authentication Initializers and passport support
- [ ] Better documentation on setup and configurations
- [x] Change return format for ResourceList queries to a FHIR Bundle instead of a GraphQLList
- [ ] Implementation guides and demos
- [ ] Support for more resources
	- [ ] Starting with support for the USCore resources, but we will eventually be able to include any resource we would like.
- [ ] Support for more versions
	- [x] DSTU2 (1.0.2) is coming soon. We are updating our generator which will generate all the necessary schemas, parameters, scalars, input types, and GraphQL code.
	- [x] STU3 (3.0.1).
	- [ ] R4
	
### Long term goals:

- Open source our resource generator. This will potentially allow for you to support any resource with a valid structure definition and only generate the resources/versions you want.
- You can currently introspect the server with a GraphQL introspection query. There is no documentation yet on how Capability Statements should be supported in the spec, so once the proper mechanism for this is determined, we will make sure to support it.
