import mongoose from 'mongoose';

const baseHosts = 'mtm-aws-aps1-6-m0-22-shard-00-00.kj3z6.mongodb.net:27017,mtm-aws-aps1-6-m0-22-shard-00-01.kj3z6.mongodb.net:27017,mtm-aws-aps1-6-m0-22-shard-00-02.kj3z6.mongodb.net:27017';
const user = 'hiteshkatta7_db_user';
const pass = '3Tu2L65geSSVE9du';

const authSources = ['admin', 'test', 'files_db']; // Common defaults or guessed

async function test() {
    console.log('Testing authentication sources...');

    for (const source of authSources) {
        const uri = `mongodb://${user}:${pass}@${baseHosts}/?ssl=true&authSource=${source}`;
        console.log(`\nPossible Auth Source: ${source}`);
        try {
            await mongoose.disconnect();
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
            console.log('>>> SUCCESS! Connected with authSource=' + source);
            console.log('Suggest updating .env with: &authSource=' + source);
            process.exit(0);
        } catch (err) {
            console.log(`Failed (${err.message})`);
            // console.log(err);
        }
    }

    console.log('\nAll auth sources failed. Credentials likely invalid or user disabled.');
    process.exit(1);
}

test();
