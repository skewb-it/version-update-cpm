import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

export const secretKey = "SECretKey@SKEWb#DeveloperServPrtl*321@$";


@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, secretKey.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    if (textToDecrypt == '' || textToDecrypt == null) {
      return null;
    }
    return CryptoJS.AES.decrypt(textToDecrypt, secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

}
