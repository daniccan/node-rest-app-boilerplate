const secretKey = "mySecretKey";
const CryptoJS = require("crypto-js");

let Encoder = {
  encrypt: (value) => {
    return CryptoJS.AES.encrypt(value, secretKey).toString();
  },

  decrypt: (value) => {
    return CryptoJS.AES.decrypt(value, secretKey).toString(CryptoJS.enc.Utf8);
  },
};

module.exports = Encoder;