const AWS = require('aws-sdk');
const kms = new AWS.KMS({
  region: process.env.keyRegion || 'us-east-1'
});

const getDecryptedValue = encryptedValue => new Promise((resolve, reject) => {
  kms.decrypt({
    CiphertextBlob: Buffer.from(encryptedValue, 'base64')
  }, (err, decrypted) => {
    if (err) {
      reject(err);
    } else {
      resolve(decrypted.Plaintext.toString());
    }
  });
});

module.exports = {
  getDecryptedValue
};
