import mongoose from 'mongoose';

const baseHosts = 'mtm-aws-aps1-6-m0-22-shard-00-00.kj3z6.mongodb.net:27017,mtm-aws-aps1-6-m0-22-shard-00-01.kj3z6.mongodb.net:27017,mtm-aws-aps1-6-m0-22-shard-00-02.kj3z6.mongodb.net:27017';
const user = 'hiteshkatta7_db_user';
const pass = '3Tu2L65geSSVE9du';

const uris = [
    `mongodb://${user}:${pass}@${baseHosts}/?ssl=true&authSource=admin`,
    `mongodb://${user}:${pass}@${baseHosts}/test?ssl=true&authSource=admin`,
    `mongodb://${user}:${pass}@${baseHosts}/?ssl=true`,
    `mongodb://${user}:${pass}@${baseHosts}/?ssl=true&directConnection=true&authSource=admin`
];

async function test() {
    for (const uri of uris) {
        console.log(`Testing URI: ${uri.replace(pass, '****')}`);
        try {
            if (mongoose.connection.readyState !== 0) {
                await mongoose.disconnect();
            }
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
            console.log('SUCCESS!');
            process.exit(0);
        } catch (err) {
            console.log(`FAILED: ${err.message}`);
        }
    }
    process.exit(1);
}

test();
