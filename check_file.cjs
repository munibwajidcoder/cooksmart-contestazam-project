const fs = require('fs');
const b = fs.readFileSync('public/images/hero_burger.png').slice(0, 12);
console.log('hex:', b.toString('hex'));
console.log('ascii:', b.slice(0,4).toString('ascii'));
// PNG magic: 89504e47
// WEBM magic: 1a45dfa3
// JPEG magic: ffd8ff
