"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const tslib_1 = require("tslib");
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const p_event_1 = tslib_1.__importDefault(require("p-event"));
const application_1 = require("./application");
class ExpressServer {
    constructor(options = {}) {
        this.app = express_1.default();
        this.lbApp = new application_1.BoomPlatformApiApplication(options);
        //this.app.options('*', cors());
        this.app.use(cors_1.default(options.rest.cors));
        // Expose the front-end assets via Express, not as LB4 route
        this.app.use('/api', this.lbApp.requestHandler);
        // Custom Express routes
        // this.app.get('/', function (_req: Request, res: Response) {
        //   res.sendFile(path.join(__dirname, '../public'));
        // });
        // Serve static files in the public folder
        this.app.use(express_1.default.static('public'));
    }
    async boot() {
        await this.lbApp.boot();
    }
    async start() {
        await this.lbApp.start();
        this.port = this.lbApp.restServer.config.port || 3000;
        this.host = this.lbApp.restServer.config.host || 'localhost';
        this.server = this.app.listen(this.port, this.host);
        await p_event_1.default(this.server, 'listening');
    }
    // For testing purposes
    async stop() {
        if (!this.server)
            return;
        await this.lbApp.stop();
        this.server.close();
        await p_event_1.default(this.server, 'close');
        this.server = undefined;
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=server.js.map