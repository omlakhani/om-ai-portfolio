const fs = require('fs');
const path = require('path');
const p1 = path.join(__dirname, 'src', 'assets', 'images', 'hero-portrait.png.png');
const p2 = path.join(__dirname, 'src', 'assets', 'images', 'hero-portrait.png');
if (fs.existsSync(p1)) {
    fs.renameSync(p1, p2);
    console.log('Renamed to hero-portrait.png');
} else {
    console.log('Not found: ' + p1);
}
