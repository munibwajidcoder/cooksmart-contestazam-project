const fs = require('fs');

const replacements = {
  'Lassi with Paratha': '/images/lassi_paratha_3d.jpg',
  'Omelette with Naan': '/images/omelette_naan_3d.jpg',
  'Daal Chawal': '/images/daal_chawal_3d.jpg',
  'Siri Paye': 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&q=80',
  'Chana Pulao': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
  'Palak Paneer / Gosht': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80',
  'Seekh Kebab with Roti': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
  'Chapli Kebab': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
  'Chicken Tikka Masala': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
  'Dahi Bhalla / Baray': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  'Chana Chaat': 'https://images.unsplash.com/photo-1551881192-002e02ad3d87?w=800&q=80',
  'Aloo Tikki': 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&q=80',
  'Khoya Barfi': 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=800&q=80',
  'Chicken Roll / Shawarma': 'https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=800&q=80',
  'White Sauce Pasta': 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
  'Creamy Garlic Pasta': 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
  'Chicken Tikka Pasta': 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80',
  'Cheesy Baked Pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
  'Red Sauce Arrabiata Pasta': 'https://images.unsplash.com/photo-1598866594230-a7c126c152ea?w=800&q=80',
  'Spicy Karahi Pasta': 'https://images.unsplash.com/photo-1626844131082-256783844137?w=800&q=80',
  'Desi Mac & Cheese': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
  'Pakistani Style Lasagna': 'https://images.unsplash.com/photo-1626844131082-256783844137?w=800&q=80'
};

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  
  let currentName = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    if (nameMatch) {
      currentName = nameMatch[1];
    }

    if (line.includes('image:') && currentName && replacements[currentName]) {
      newLines.push(`    image: '${replacements[currentName]}',`);
      currentName = null;
    } else {
      newLines.push(line);
    }
  }

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Updated ${filePath}`);
};

processFile('src/data/pakistaniRecipes.js');
processFile('src/data/recipesData.js');
