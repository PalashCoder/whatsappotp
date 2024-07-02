<h1 align="center">Welcome to Whataspp OTP Service</h1>

## Usages

```
import { WhatsappOTP } from 'useWhatsappOTP';

const otpService = new WhatsappOTP({
  whatsappApiUrl: 'https://api.your-whatsapp-provider.com/v1/messages',
  whatsappApiToken: 'YOUR_API_TOKEN',
  fromNumber: 'YOUR_WHATSAPP_NUMBER'
});

async function main() {
  const userPhoneNumber = 'USER_PHONE_NUMBER';

  // Send OTP
  await otpService.sendOTP(userPhoneNumber);

  // Simulate user input for OTP
  const userInputOTP = 'USER_INPUT_OTP';

  // Verify OTP
  if (otpService.verifyOTP(userPhoneNumber, userInputOTP)) {
    console.log('OTP is correct');
  } else {
    console.log('Invalid OTP');
  }
}

main();
```