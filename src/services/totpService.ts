// services/totpService.ts

/**
 * A simplified implementation of Base32 encoding/decoding, necessary for TOTP secrets.
 */
const base32 = {
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  encode: function(buffer: ArrayBuffer): string {
    let bits = 0;
    let bitLength = 0;
    let result = '';
    const view = new Uint8Array(buffer);
    for (let i = 0; i < view.length; i++) {
      bits = (bits << 8) | view[i];
      bitLength += 8;
      while (bitLength >= 5) {
        result += this.chars[(bits >>> (bitLength - 5)) & 31];
        bitLength -= 5;
      }
    }
    if (bitLength > 0) {
      result += this.chars[(bits << (5 - bitLength)) & 31];
    }
    return result;
  },
  decode: function(encoded: string): ArrayBuffer {
    encoded = encoded.toUpperCase().replace(/=+$/, '');
    const bits = encoded.split('').map(char => {
      const index = this.chars.indexOf(char);
      if (index === -1) {
        throw new Error('Invalid base32 character');
      }
      return index;
    });

    let bitLength = 0;
    const buffer = new Uint8Array(Math.floor(encoded.length * 5 / 8));
    let bufferIndex = 0;
    let value = 0;

    for (let i = 0; i < bits.length; i++) {
      value = (value << 5) | bits[i];
      bitLength += 5;
      if (bitLength >= 8) {
        buffer[bufferIndex++] = (value >>> (bitLength - 8)) & 255;
        bitLength -= 8;
      }
    }
    return buffer.buffer;
  }
};

/**
 * Generates a cryptographically secure 160-bit secret key, encoded in Base32.
 */
export function generateSecret(): string {
  const buffer = window.crypto.getRandomValues(new Uint8Array(20)); // 20 bytes = 160 bits
  return base32.encode(buffer.buffer);
}

/**
 * Generates the otpauth:// URL for the QR code.
 */
export function generateOtpAuthUrl(secret: string, email: string, issuer: string = 'Lyr-IA'): string {
  const label = `${issuer}:${email}`;
  const encodedLabel = encodeURIComponent(label);
  const encodedIssuer = encodeURIComponent(issuer);
  return `otpauth://totp/${encodedLabel}?secret=${secret}&issuer=${encodedIssuer}`;
}

/**
 * Generates a QR code image URL from the otpauth URL.
 */
export function generateQrCodeUrl(otpAuthUrl: string): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpAuthUrl)}`;
}


/**
 * Generates a 6-digit HOTP code for a given secret and counter.
 * This is the core of the TOTP algorithm.
 */
async function generateHOTP(secretBuffer: ArrayBuffer, counter: number): Promise<string> {
  const counterBuffer = new ArrayBuffer(8);
  const view = new DataView(counterBuffer);
  // The counter is a 64-bit integer, but JavaScript numbers are safe up to 53 bits.
  // This is not an issue for TOTP's practical lifespan. We set the lower 32 bits.
  view.setUint32(4, counter, false); 

  const key = await window.crypto.subtle.importKey(
    'raw',
    secretBuffer,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );

  const signature = await window.crypto.subtle.sign('HMAC', key, counterBuffer);
  const signatureBytes = new Uint8Array(signature);

  // Dynamic truncation
  const offset = signatureBytes[signatureBytes.length - 1] & 0x0f;
  const binary =
    ((signatureBytes[offset] & 0x7f) << 24) |
    ((signatureBytes[offset + 1] & 0xff) << 16) |
    ((signatureBytes[offset + 2] & 0xff) << 8) |
    (signatureBytes[offset + 3] & 0xff);

  const otp = binary % 1000000;
  return otp.toString().padStart(6, '0');
}

/**
 * Verifies a user-provided 6-digit code against the secret key.
 */
export async function verifyCode(secret: string, code: string): Promise<boolean> {
  if (!/^\d{6}$/.test(code)) return false;

  const secretBuffer = base32.decode(secret);
  const timeStep = 30; // 30-second window
  const counter = Math.floor(Date.now() / 1000 / timeStep);

  // Check the current time step, as well as the previous and next ones
  // to account for clock drift between server and client.
  for (let i = -1; i <= 1; i++) {
    const generatedCode = await generateHOTP(secretBuffer, counter + i);
    if (generatedCode === code) {
      return true;
    }
  }
  return false;
}
