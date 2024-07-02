import axios from "axios";
import crypto from "crypto";
import NodeCache from "node-cache";

// Initialize cache with a TTL of 1 minute
const otpCache = new NodeCache({ stdTTL: 60 });

interface WhatsappOTPConfig {
  whatsappApiUrl: string;
  whatsappApiToken: string;
  fromNumber: string;
}

export class WhatsappOTP {
  private config: WhatsappOTPConfig;

  constructor(config: WhatsappOTPConfig) {
    this.config = config;
  }

  generateOTP(length: number = 6): string {
    const otp = crypto
      .randomBytes(length / 2)
      .toString("hex")
      .slice(0, length);
    return otp;
  }

  async sendOTP(toNumber: string): Promise<void> {
    const otp = this.generateOTP();
    otpCache.set(toNumber, otp);

    const message = `Your OTP code is ${otp}`;

    try {
      await axios.post(
        this.config.whatsappApiUrl,
        {
          messaging_product: "whatsapp",
          to: toNumber,
          type: "text",
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.whatsappApiToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Failed to send OTP via WhatsApp", error);
      throw new Error("Failed to send OTP via WhatsApp");
    }
  }

  verifyOTP(toNumber: string, otp: string): boolean {
    const cachedOTP = otpCache.get<string>(toNumber);

    if (cachedOTP === otp) {
      otpCache.del(toNumber);
      return true;
    } else {
      return false;
    }
  }
}
