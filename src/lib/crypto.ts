import { createCipheriv, createDecipheriv, createHash } from "crypto";

const algorithm = "aes-192-cbc";

export function encrypt(key: string, iv: string, data: string) {
  const cipher = createCipheriv(
    algorithm,
    key.substring(0, 24),
    iv.substring(0, 16),
  );

  return cipher.update(data, "utf8", "hex") + cipher.final("hex");
}
export function decrypt(key: string, iv: string, cipher: string) {
  const decipher = createDecipheriv(
    algorithm,
    key.substring(0, 24),
    iv.substring(0, 16),
  );

  return decipher.update(cipher, "hex", "utf8") + decipher.final("utf8");
}
