const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'images');
fs.mkdirSync(dir, { recursive: true });

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
            reject(err);
        });
    });
}

async function run() {
    console.log('Downloading placeholder...');
    try {
        await download('https://picsum.photos/400', path.join(dir, 'hero-portrait.jpg'));
        console.log('Placeholder downloaded successfully!');
    } catch (e) {
        console.error('Error:', e);
    }
}
run();
