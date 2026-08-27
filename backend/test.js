require('dotenv').config();

fetch('http://localhost:5000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'LiveTest', favoriteCategory: 'Dinner' })
})
.then(r => r.json())
.then(data => console.log('✅ RESPONSE:', JSON.stringify(data, null, 2)))
.catch(e => console.error('❌ ERROR:', e.message));
