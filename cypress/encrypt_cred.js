const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-cbc';
const secret = 'your-strong-secret-key'; // Replace with your own secret
const key = crypto.scryptSync(secret, 'salt', 32);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encrypted, iv: iv.toString('hex') };
}

const userId = 'prodquote3@mailinator.com';
const password = 'Ug/e@2hAA';

const encryptedUserId = encrypt(userId);
const encryptedPassword = encrypt(password);

const output = {
  CALIX_USER_ID: encryptedUserId,
  CALIX_PASSWORD: encryptedPassword
};

fs.writeFileSync('./cypress/secure-creds.json', JSON.stringify(output, null, 2));
console.log('Encrypted credentials saved to cypress/secure-creds.json');