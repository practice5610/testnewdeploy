"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_helpers_1 = require("../helpers/database.helpers");
const test_helper_1 = require("./test-helper");
// Enabling this is keeping the test runner from completing its process.
xdescribe('HomePage', () => {
    let app;
    let client;
    before(database_helpers_1.givenEmptyDatabase);
    before('setupApplication', async () => {
        ({ app, client } = await test_helper_1.setupApplication());
    });
    after(async () => {
        await app.stop();
    });
    it('exposes a default home page', async () => {
        await client
            .get('/')
            .expect(200)
            .expect('Content-Type', /text\/html/);
    });
    it('exposes self-hosted explorer', async () => {
        await client
            .get('/explorer/')
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .expect(/<title>LoopBack API Explorer/);
    });
});
//# sourceMappingURL=home-page.acceptance.js.map