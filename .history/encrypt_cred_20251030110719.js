const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('your-secret-key', 'salt', 32); // Replace with your own secret
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encrypted, iv: iv.toString('hex') };
}

const userId = 'prodquote3@mailinator.com';
const password = 'Ug/e@2hAA';

const encryptedUserId = encrypt(userId);
const encryptedPassword = encrypt(password);

fs.writeFileSync('cypress/secure-creds.json', JSON.stringify({
  CALIX_USER_ID: encryptedUserId,
  CALIX_PASSWORD: encryptedPassword
}, null, 2));

console.log('Credentials encrypted and saved.');