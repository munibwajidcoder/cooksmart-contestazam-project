const fs = require('fs');
const dir = 'C:/Users/New Rohaan Computers/.gemini/antigravity-ide/brain/5269dfea-b1e9-4287-bd98-0607215435c3/.user_uploaded';
const files = fs.readdirSync(dir);

files.forEach(f => {
  const b = fs.readFileSync(dir + '/' + f).slice(0, 4);
  const hex = b.toString('hex');
  let type = 'unknown';
  if (hex.startsWith('89504e47')) type = 'PNG';
  else if (hex.startsWith('ffd8ff')) type = 'JPEG';
  else if (hex.startsWith('1a45df')) type = 'WEBM';
  else if (hex.startsWith('47494638')) type = 'GIF';
  else if (hex.startsWith('52494646')) type = 'WEBP';
  if (type === 'PNG' || type === 'JPEG' || type === 'WEBP') {
    const size = fs.statSync(dir + '/' + f).size;
    console.log(type, size, f);
  }
});
