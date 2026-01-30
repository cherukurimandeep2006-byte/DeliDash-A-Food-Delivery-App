import dns from 'dns';
import util from 'util';

const resolve4 = util.promisify(dns.resolve4);

async function test() {
    try {
        console.log('Resolving google.com...');
        const google = await resolve4('google.com');
        console.log('google.com:', google);

        console.log('Resolving mongodb shard...');
        const shard = await resolve4('cluster0-shard-00-00.i3b3yq5.mongodb.net');
        console.log('shard:', shard);
    } catch (err) {
        console.error('DNS Error:', err);
    }
}

test();
