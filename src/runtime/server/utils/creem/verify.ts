import * as crypto from "crypto";

export function generateSignature(payload: string, secret: string): string {
  const computedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return computedSignature;
}
