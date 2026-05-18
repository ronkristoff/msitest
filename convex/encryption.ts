const ALGORITHM = { name: "AES-GCM", length: 256 };
const KEY_LENGTH = 32;
const IV_LENGTH = 12;

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getKey(): Promise<CryptoKey> {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex) throw new Error("ENCRYPTION_KEY env var is not set");
  const rawKey = hexToBytes(keyHex);
  if (rawKey.length !== KEY_LENGTH) throw new Error("ENCRYPTION_KEY must be 32 bytes");
  return await crypto.subtle.importKey(
    "raw",
    rawKey as BufferSource,
    ALGORITHM,
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encrypt(plaintext: string): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encoded = new TextEncoder().encode(plaintext);
  const encrypted = await crypto.subtle.encrypt(
    { ...ALGORITHM, iv: iv as BufferSource },
    key,
    encoded as BufferSource,
  );
  return `${bytesToHex(iv)}:${bytesToHex(new Uint8Array(encrypted))}`;
}

export async function decrypt(ciphertext: string): Promise<string> {
  const key = await getKey();
  const parts = ciphertext.split(":");
  if (parts.length !== 2) throw new Error("Invalid ciphertext format");
  const iv = hexToBytes(parts[0]);
  const encrypted = hexToBytes(parts[1]);
  const decrypted = await crypto.subtle.decrypt(
    { ...ALGORITHM, iv: iv as BufferSource },
    key,
    encrypted as BufferSource,
  );
  return new TextDecoder().decode(decrypted);
}
