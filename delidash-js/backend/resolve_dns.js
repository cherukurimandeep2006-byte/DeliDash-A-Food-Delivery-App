import dns from 'dns';
import util from 'util';

const resolve4 = util.promisify(dns.resolve4);

dns.setServers(['8.8.8.8']);

const shards = [
  'cluster0-shard-00-00.i3b3yq5.mongodb.net',
  'cluster0-shard-00-01.i3b3yq5.mongodb.net',
  'cluster0-shard-00-02.i3b3yq5.mongodb.net'
];

async function resolveAll() {
  console.log('Resolving IPs...');
  for (const shard of shards) {
    try {
      const addresses = await resolve4(shard);
      console.log(`${shard}:${addresses[0]}`);
    } catch (err) {
      console.error(`Failed to resolve ${shard}:`, err.message);
    }
  }
}

resolveAll();
