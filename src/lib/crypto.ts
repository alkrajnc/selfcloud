import { createCipheriv, createDecipheriv, createHash, hash } from "crypto";
import * as jose from "jose";
const algorithm = "aes-192-cbc";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

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

export const signToken = async (user: User) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = await new jose.SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("selfcloud")
    .setExpirationTime("24h")
    .sign(secret);

  return token;
};

type Payload = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  iat: number;
  iss: string;
  exp: number;
};

export const verifyToken = async (token: string | null) => {
  try {
    if (token === null) {
      return { auth: false, payload: null };
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const verified = await jose.jwtVerify(token, secret, {
      issuer: "selfcloud",
    });
    if (verified.payload && verified.protectedHeader) {
      return { auth: true, payload: verified.payload as Payload };
    }
    return { auth: false, payload: null };
  } catch (error) {
    return { auth: false, payload: null };
  }
};

export function calculateCacheHash(value: string) {
  return hash("sha1", value).toString();
}
