import {
  Client, Provider, ProviderRegistry,
} from '@blockstack/clarity';

describe('Counter', () => {
  let client: Client;
  let provider: Provider;

  beforeEach(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client('SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.counter', 'counter', provider);
  });

  it('has valid syntax', async () => {
    await client.checkContract();
  });
});
