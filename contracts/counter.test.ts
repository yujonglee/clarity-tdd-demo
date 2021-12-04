import {
  Client, Provider, ProviderRegistry, Result,
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

  describe('Deployed instance of contract', () => {
    const getCounter = async () => {
      const query = client.createQuery({
        method: { name: 'get-counter', args: [] },
      });
      const receipt = await client.submitQuery(query);
      const result = Result.unwrapInt(receipt);

      return result;
    };

    beforeEach(async () => {
      await client.deployContract();
    });

    it('start at zero', async () => {
      const value = await getCounter();

      expect(value).toBe(0);
    });
  });
});
