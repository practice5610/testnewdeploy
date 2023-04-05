"use strict";
// This file is for reference only
Object.defineProperty(exports, "__esModule", { value: true });
const database_helpers_1 = require("../helpers/database.helpers");
const test_helper_1 = require("./test-helper");
// Enabling this is keeping the test runner from completing its process.
xdescribe('Users', () => {
    let app;
    let client;
    before(database_helpers_1.givenEmptyDatabase);
    before('setupApplication', async () => {
        ({ app, client } = await test_helper_1.setupApplication());
    });
    after(async () => {
        await app.stop();
    });
    it('fails creating existing user', async () => {
        // login validation needs to be set here
        await client
            .post('/admin/user')
            .send({
            email: 'julienash@gmail.com',
            password: '123456',
            role: 'admin',
        })
            .expect(200, function (err) {
            console.log(err);
        });
        /*
        // act
        const response = await client.get('/product/ink-pen');
    
        // assert
        expect(response.body).to.containEql(expected);
     
        */
    });
});
//# sourceMappingURL=user.acceptance.js.map