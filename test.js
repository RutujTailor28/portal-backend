const crypto = require('crypto');

const resetToken = crypto.randomBytes(20).toString('hex');

console.log(resetToken);

const gen = crypto.createHash('sha256').update(resetToken).digest('hex');

console.log(gen);
