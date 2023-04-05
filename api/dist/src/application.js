"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoomPlatformApiApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const cron_1 = require("@loopback/cron");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const loopback4_spring_1 = require("loopback4-spring");
const path = tslib_1.__importStar(require("path"));
const rate_limit_redis_1 = tslib_1.__importDefault(require("rate-limit-redis"));
const authorization_1 = require("./authorization");
const constants_1 = require("./constants");
const loopback4_ratelimiter_1 = require("./loopback4-ratelimiter");
const sequence_1 = require("./sequence");
const sequenceWithoutRedis_1 = require("./sequenceWithoutRedis");
//import { MerchantTransactionCronJob } from './cronJobs/merchantTransaction.cronjob';
const rateLimitKeyGen_1 = require("./utils/rateLimitKeyGen");
class BoomPlatformApiApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(constants_1.REDIS_ENABLED ? sequence_1.MySequence : sequenceWithoutRedis_1.MySequenceWithoutRedis);
        // Set up default home page
        this.static('/', path.join(__dirname, '../../public'));
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: `/explorer`,
        });
        //this.bind(RestBindings.ERROR_WRITER_OPTIONS).to({ debug: true }); // this only must be enable for debugging for development no production
        //this.bind(RestBindings.ERROR_WRITER_OPTIONS).to({ safeFields: ['name', 'message', 'status', 'statusCode'] }); // All the errors that we can get back
        this.bind(rest_1.RestBindings.ERROR_WRITER_OPTIONS).to({ safeFields: ['name', 'message'] });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.component(authorization_1.AuthorizationComponent);
        this.component(loopback4_spring_1.SpringComponent);
        this.component(cron_1.CronComponent);
        //this.add(createBindingFromClass(MerchantTransactionCronJob));
        if (constants_1.REDIS_ENABLED) {
            // Customize loopback4-ratelimiter configuration
            // The settings applied are applied to each route, the count is per route
            this.bind('RateLimitSecurityBindings.CONFIG').to({
                // *** Changed to String to fix injection issue, this was done on api\src\loopback4-ratelimiter\providers\ratelimit-action.provider.ts too
                store: new rate_limit_redis_1.default({
                    client: require('redis').createClient(constants_1.REDIS_CONFIGURATION),
                }),
                name: 'redis',
                windowMs: 1 * 60 * 1000,
                max: 60,
                message: '[MAIN] You have exceeded the 10 requests in 1 minute limit!',
                /*handler: function (req: any, res: any, next: any) { // Left these for debugging later, these will be used on decorators too if we don´t them overwrite
                console.log('application handler', req.originalUrl);
                console.log('application limit', req.rateLimit.limit);
                console.log('application current', req.rateLimit.current);
                console.log('application remaining ', req.rateLimit.remaining);
                console.log('application options ', options);
                next();
                //res.status(options.statusCode).send(options.message);
              },
              onLimitReached: function (req: any, res: any, options: any) {
                console.log('onLimitReached', req.originalUrl);
              },*/
                keyGenerator: rateLimitKeyGen_1.rateLimitKeyGen,
            });
            this.component(loopback4_ratelimiter_1.RateLimiterComponent);
        }
        this.on('stateChanged', (data) => {
            console.log('Application State Changed: ', data);
        });
        this.projectRoot = __dirname;
        // Customize @loopback/boot Boot Conventions here
        this.bootOptions = {
            controllers: {
                // Customize Controller Boot Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.BoomPlatformApiApplication = BoomPlatformApiApplication;
//# sourceMappingURL=application.js.map