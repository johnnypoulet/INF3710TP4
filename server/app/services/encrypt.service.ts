import { injectable } from "inversify";
import * as crypto from "crypto";
import { PrivateKey, CryptoAlogrithm } from "../secret"
import "reflect-metadata";

@injectable()
export class EncryptService {
    key: Buffer;
    alogrithm: string;
    public constructor() {
        this.alogrithm = CryptoAlogrithm;
        this.key = Buffer.from(PrivateKey, 'hex');
    }

    public encrypt(messageToEncrypt: string) {
        const iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(this.alogrithm, Buffer.from(this.key), iv);
        let encrypted = cipher.update(messageToEncrypt);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ":" + encrypted.toString('hex');
    }

    public decrypt(messageToDecrypt: string) {
        const iv = Buffer.from(messageToDecrypt.split(":")[0], 'hex');
        const encryptedText = Buffer.from(messageToDecrypt.split(":")[1], 'hex');
        const decipher = crypto.createDecipheriv(this.alogrithm, Buffer.from(this.key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

}
