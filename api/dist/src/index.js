"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.ExpressServer = exports.BoomPlatformApiApplication = void 0;
require('dotenv').config();
const server_1 = require("./server");
Object.defineProperty(exports, "ExpressServer", { enumerable: true, get: function () { return server_1.ExpressServer; } });
const application_1 = require("./application");
Object.defineProperty(exports, "BoomPlatformApiApplication", { enumerable: true, get: function () { return application_1.BoomPlatformApiApplication; } });
async function main(options = {}) {
    const server = new server_1.ExpressServer(options);
    await server.boot();
    await server.start();
    // let webhookUri = "https://hooks.slack.com/services/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";
    // let slack = new Slack();
    // slack.setWebhook(webhookUri);
    // slack.webhook({
    //   channel: "#general",
    //   username: "webhookbot",
    //   icon_emoji: ":ghost:",
    //   text: "test message, test message"
    // }, function(err, response) {
    //   console.log(response);
    // });
    console.log(`Server is running at ${server.host}:${server.port}`);
    console.log(`Try ${server.host}:${server.port}/api/v1/ping`);
}
exports.main = main;
//# sourceMappingURL=index.js.map