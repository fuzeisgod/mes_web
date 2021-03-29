import CryptoJS from 'crypto-js'

let salt: string = '12345678900000001234567890000000'; //32
/**************************************************************
*字符串加密
*   str：需要加密的字符串
****************************************************************/
export const encryptAES = function (str) {
    var KEY = salt;
    var key = CryptoJS.enc.Utf8.parse(KEY);
    var srcs = CryptoJS.enc.Utf8.parse(str);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var hexStr = encrypted.ciphertext.toString().toUpperCase();
    // hex
    var oldHexStr = CryptoJS.enc.Hex.parse(hexStr);
    // base64
    var base64Str = CryptoJS.enc.Base64.stringify(oldHexStr);
    return base64Str;
}
/**************************************************************
*字符串解密
*   str：需要解密的字符串
****************************************************************/
export const decryptAES = function (str) {
    var KEY = salt;
    var key = CryptoJS.enc.Utf8.parse(KEY);
    var srcs = str;
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
