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

    const execMethod = async (method: string) => {
      const tx = client.createTransaction({
        method: {
          name: method,
          args: [],
        },
      });

      await tx.sign('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

      const receipt = await client.submitTransaction(tx);

      return receipt;
    };

    beforeEach(async () => {
      await client.deployContract();
    });

    it('start at zero', async () => {
      const value = await getCounter();

      expect(value).toBe(0);
    });

    it('increases by increment method', async () => {
      const before = await getCounter();
      await execMethod('increment');

      const after = await getCounter();

      expect(after - before).toBe(1);
    });
  });
});
