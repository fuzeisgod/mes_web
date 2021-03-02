import CryptoJS from 'crypto-js'

let salt: string = 'chzx';

export const encryptAES = function (pwd): string {
    return CryptoJS.AES.encrypt(pwd, salt).toString();
}

export const decryptAES = function (ciphertext) {
    let bytes = CryptoJS.AES.decrypt(ciphertext, salt);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}