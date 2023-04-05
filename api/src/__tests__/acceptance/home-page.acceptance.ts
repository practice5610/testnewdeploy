import { Client } from '@loopback/testlab';

import { BoomPlatformApiApplication } from '../..';
import { givenEmptyDatabase } from '../helpers/database.helpers';
import { setupApplication } from './test-helper';

// Enabling this is keeping the test runner from completing its process.
xdescribe('HomePage', () => {
  let app: BoomPlatformApiApplication;
  let client: Client;

  before(givenEmptyDatabase);
  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
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
