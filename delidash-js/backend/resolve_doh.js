import https from 'https';
import fs from 'fs';

function queryDns(name, type) {
    return new Promise((resolve, reject) => {
        const url = `https://dns.google/resolve?name=${name}&type=${type}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function resolve() {
    const serviceName = '_mongodb._tcp.cluster0.i3b3yq5.mongodb.net';

    try {
        console.log(`Querying SRV for ${serviceName}...`);
        const srvRes = await queryDns(serviceName, 'SRV');

        if (!srvRes.Answer) {
            console.error('No SRV records found:', srvRes);
            return;
        }

        const targets = srvRes.Answer.map(a => {
            // SRV data format: priority weight port target
            const parts = a.data.split(' ');
            return {
                priority: parts[0],
                weight: parts[1],
                port: parts[2],
                target: parts[3].endsWith('.') ? parts[3].slice(0, -1) : parts[3]
            };
        });

        console.log('Found targets:', targets);

        const hosts = [];
        for (const t of targets) {
            console.log(`Resolving A for ${t.target}...`);
            const aRes = await queryDns(t.target, 'A');
            if (aRes.Answer) {
                const ip = aRes.Answer[0].data;
                console.log(`  ${t.target} -> ${ip}`);
                hosts.push(`${ip}:${t.port}`);
            } else {
                console.warn(`  No A record for ${t.target}`);
            }
        }

        if (hosts.length > 0) {
            const result = {
                hosts: hosts,
                targets: targets,
                suggestedConnectionString: `mongodb://${hosts.join(',')}/?ssl=true&directConnection=true`
            };

            fs.writeFileSync('backend/mongo_ips.json', JSON.stringify(result, null, 2));
            console.log('Results written to backend/mongo_ips.json');
        }

    } catch (err) {
        console.error('Error:', err);
    }
}

resolve();
