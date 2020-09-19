import { Logger, ConsoleLogger } from '../errorHandling/Logging';
import lodash = require('lodash');
import { Transaction } from '../Transaction';
import { ErrorHandlers } from './../errorHandling/errorHandlers/ErrorHandlers';
import { Reflect } from '../meta/Reflect';
import { Service } from '../../services/Service';
import * as multer from 'multer';
import { BadParameterError } from '../errorHandling/Error';

let reflect = new Reflect();
const swaggerApi = require('swagger-node-express');
const restAPiErrorHandler = ErrorHandlers.getRestAPIErrorHandler();

export interface Routes {
}
export interface RestOptions {
	route: string
}

/**
 * add swagger docs to an endpoint
 * @remarks look here for more information https://www.npmjs.com/package/swagger-node-express
 */
export function swagger(spec: Endpoint) {
	return function (target: Object, propertyKey: string | symbol) {
		reflect.defineMetadata('rest:swagger', spec, target, propertyKey);
	}
}

export interface Endpoint {
    /**
     * short description, a summary
     */
	summary: string;

    /*
    method: string;*/

    /**
     * the pattern of the path, IE: '/pet.{format}/{petId}'
     */
	path: string;

    /**
     * the name of the type
     */
	type: string;

    /**
     * information about the operation
     */
	description?: string;

    /**
     * addtional comments about the operation
     */
	notes?: string;

    /**
     * "parameters" : [swagger.pathParam("petId", "ID of pet that needs to be fetched", "string")],
     */
	parameters?: Array<any>;

    /**
     * list of possible errors
     */
	errorResponses?: Array<any>;

    /**
     * a friendly name
     */
	nickname?: string;

    /**
     * models definition
     */
	models?: {};
}

export function get(options: RestOptions) {
	return rest(options, 'get');
}

export function post(options: RestOptions) {
	return rest(options, 'post');
}

export function put(options: RestOptions) {
	return rest(options, 'put');
}

export function patch(options: RestOptions) {
	return rest(options, 'patch');
}

export function del(options: RestOptions) {
	return rest(options, 'delete');
}

export function rest(options: RestOptions, httpVerb: string) {
	return function (target: Object, propertyKey: any) {

		if (target == null) {
			throw new Error(`Please ensure dependent types are placed before usage, error occured on ${propertyKey}`);
		}

		let meta = {
			httpVerb: httpVerb
		}

		for (let key in options) {
			if (options.hasOwnProperty(key)) {
				let element = options[key];
				meta[key] = element;
			}
		}

		reflect.defineMetadata('rest:path', meta, target, propertyKey);
		return target;
	}
}

export interface BodyOptions {
	param: string
}

export function body(options: BodyOptions) {
	return function (target: Object, propertyKey: string | symbol) {

		if (options == null) {
			throw new Error(`please ensure you provide options to the body decorator`);
		}

		reflect.defineMetadata('rest:body', options, target, propertyKey);
		return target;
	}
}

export interface RequestOptions {
    /**
     * This is the name of the parameter in your function at you would like to populate
     */
	param: string,
    /**
     * This is the property on the requrest (req) object i.e. files - req.files
     */
	prop: string
}

export function request(options: RequestOptions | RequestOptions[]) {
	return function (target: Object, propertyKey: string | symbol) {

		if (options == null) {
			throw new Error(`please ensure you provide options to the request decorator`);
		}

		let optionsArray: RequestOptions[] = null;

		if (options instanceof Array) {
			optionsArray = <RequestOptions[]>options;
		} else {
			optionsArray = [<RequestOptions>options];
		}

		reflect.defineMetadata('rest:request', optionsArray, target, propertyKey);
		return target;
	}
}

export function routes(target: Function) {
	target.prototype._type = 'mmsapplayer.routes';
}

export interface RoutesRegistryConfig {
	express: any;
	swagger: any;
	ApiDocumentsEnabled: boolean
}

export class RoutesRegister {
	logger: Logger = new ConsoleLogger();
	txn: Transaction = new Transaction();

	private _express: any;
	private _swagger: any;
	private _apiDocsEnabled: boolean;

	constructor(config: RoutesRegistryConfig) {
		this._express = config.express;
		this._swagger = config.swagger;
		this._apiDocsEnabled = config.ApiDocumentsEnabled;
	}

	register(routes: Routes) {

		//need to confirm that we do not need this
		//else this is to deal with sopeing issues.
		let express = this._express;
		let swagger = this._swagger;
		let apiDocsEnabled = this._apiDocsEnabled;

		let type = routes.constructor.prototype;

		let restPathMeta = reflect.getOwnMetadata('rest:path', type);
		let restBodyMeta = reflect.getOwnMetadata('rest:body', type);
		let restRequestMeta = reflect.getOwnMetadata('rest:request', type);
		let restSwaggerMeta = reflect.getOwnMetadata('rest:swagger', type);
		//TODO: Ensure restRequestMeta is an array

		let handle = (funcName, restBody, restRequest, restPath, restSwag, ctrl, ctrlType) => {

			let bodyName = '';
			let restOptions = restPath[funcName];
			let bodyOptions = restBody[funcName];
			let restSwagger = restSwag[funcName];
			restSwagger.nickname = funcName;
			let requestOptions: RequestOptions[] = restRequest[funcName];

			let t = Object.getOwnPropertyDescriptor(ctrlType, funcName);

			let paramNames = this.getParamNames(t.value);

			if (bodyOptions != null) {
				bodyName = bodyOptions.param;
			}

			let routeHandler = (req, res, next) => {
				Service.getYMLConfig();
				let args = [];

				let txnPromise: Promise<string> = new Promise<string>((r) => { r(); });

				if (lodash.includes(paramNames, '_txnId')) {
					//Need to provide _txnid
					txnPromise = this.txn.getTransaction().then((id: string) => { return id; });
				}

				txnPromise.then((txnId) => {

					paramNames.forEach((paramName) => {

						let arg = null;

						if (paramName === '_txnId') {
							arg = txnId;
						}

						if (paramName === '_res') {
							arg = res;
						}

						if (paramName === bodyName) {
							arg = req.body
						} else if (req.params[paramName] !== undefined) {
							arg = req.params[paramName];
						}

						if (paramName === 'file') {
							let storage = multer.diskStorage({
								//multers disk storage settings
								destination: (req, file, cb) => {
									cb(null, '../Spealz_Webserver/uploads')
								},
								filename: (req, file, cb) => {
									cb(null, file.originalname);
								}
							});

							let upload = multer({
								//multer settings
								storage: storage,
								fileFilter: (req, file, callback) => {
									//file filter
									if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
										return callback(new Error('You can only upload xls or xlsx file'));
									}
									callback(null, true);
								}
							}).single('file');

							upload(req, res, (err) => {
								if (err) {
									throw err;
								}

								/** Multer gives us file info in req.file object */
								if (!req.files.file) {
									throw new BadParameterError("Please upload a xls or xlsx file");
								}
							})
							arg = req.files.file
						}

						if (arg === null) {
							arg = req.query[paramName];
						}

						if (arg === undefined) {
							let option: RequestOptions = lodash.find(requestOptions, (m) => { return m.param === paramName });
							if (option) {
								let prop = option.prop;
								arg = req[prop];
							}
						}
						args.push(arg);
					});

                    /**
                     * Error handling for routes functions
                     */

					try {

						ctrl[funcName].apply(ctrl, args).then((data) => {

							if (data != null) {
								if (res.req &&
									res.req.headers &&
									res.req.headers['content-type']) {
									res.set('Content-Type', res.req.headers['content-type']);
									return res.send(data);
								} else {
									return res.json(data);
								}
							} else {
								next();
							}

						}, (err) => {
							restAPiErrorHandler.handleError(err, req, res, false);
						}).catch((err) => {

							if (err && err.name === "oscError") {
								restAPiErrorHandler.handleError(err, req, res, false);
							} else {
								restAPiErrorHandler.handleError(err, req, res, true);
							}
						});

					} catch (error) {
						restAPiErrorHandler.handleError(error, req, res, true);
					};

				});
			}

			this.logger.info(`registered ${ctrlType && (ctrlType.constructor && ctrlType.constructor.name || ctrlType.toString()) || 'Unknown'} for route: ${restOptions.httpVerb}:${restOptions.route}`);

			if (restSwagger && apiDocsEnabled) {
				let action = {
					'spec': restSwagger,
					'action': routeHandler
				}


				let helloWorld = {
					'spec': {
						path: "/helloWorld/{name}",
						notes: "says hello",
						method: "GET",
						summary: "hello world",
						parameters: [],
						responseMessages: [],
						nickname: "sayHello"
					},
					'spec2': {
						path: "/helloWorld/{name}",
						notes: "says hello",
						method: "GET",
						summary: "hello world",
						parameters: [],
						responseMessages: [],
						nickname: "sayHello"
					}
				};

				swagger[`add${restOptions.httpVerb.toUpperCase()}`](action);
			}
			else {
				express[restOptions.httpVerb](restOptions.route, routeHandler);
			}
		};

		for (let functionName in restPathMeta) {
			if (restPathMeta.hasOwnProperty(functionName)) {
				handle(functionName, restBodyMeta, restRequestMeta, restPathMeta, restSwaggerMeta, routes, type);
			}
		}
	}

	private getParamNames(func: any) {
		let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
		let ARGUMENT_NAMES = /([^\s,]+)/g;
		let fnStr = func.toString().replace(STRIP_COMMENTS, '');
		let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
		if (result === null) {
			result = [];
		}
		return result;
	}
}
