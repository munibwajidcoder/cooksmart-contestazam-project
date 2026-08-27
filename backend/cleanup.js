require('dotenv').config();
const mongoose = require('mongoose');
const UserPreference = require('./models/UserPreference');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected.');
  
  const result = await UserPreference.deleteMany({ 
    name: { $in: ['TestUser', 'BrowserTest', 'Munib (Test User)'] } 
  });
  console.log('Deleted test records:', result.deletedCount);
  
  const remaining = await UserPreference.find({});
  console.log('Remaining records:', remaining.length);
  remaining.forEach(r => console.log(' - Name:', r.name, '| Category:', r.favoriteCategory));
  
  process.exit(0);
})();
