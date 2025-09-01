# AppARG - Mobile App

A React Native mobile application built with Expo, featuring a complete authentication flow with identity verification. The app is designed for deployment on both Android and iOS platforms.

## Features

### Phase 1 - Authentication Flow

- **Splash Screen**: 2-second loading screen with baby pink background and lightning bolt logo
- **Login**: Email/phone + password authentication with validation
- **Sign Up Flow**: Multi-step secure registration process
  - Email/phone verification with OTP
  - Strong password creation with requirements
  - Document verification (ID upload + selfie)
- **Identity Verification**: Complete KYC process for secure account creation
- **Modern UI**: Clean, Mercado Pago-inspired design with baby pink branding

## Design & Branding

- **Primary Color**: Baby pink (#FFB6C1)
- **Text Colors**: Dark gray/black for optimal readability
- **Logo**: Lightning bolt (⚡) - placeholder ready for custom asset
- **Style**: Simple, clean, and modern interface

## Technology Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for smooth screen transitions
- **Expo Camera** for document and selfie capture
- **Cross-platform** compatibility (Android & iOS)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── navigation/          # Navigation configuration
├── screens/            # App screens
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── OTPVerificationScreen.tsx
│   ├── CreatePasswordScreen.tsx
│   ├── DocumentVerificationScreen.tsx
│   └── MainScreen.tsx
├── types/              # TypeScript type definitions
├── utils/              # Utilities and constants
│   └── colors.ts       # Color palette
└── navigation/
    └── AppNavigator.tsx
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AppARG
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Running on Devices

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Web (for testing)
```bash
npm run web
```

## Deployment

### Android (Google Play Store)

1. Build the Android APK:
```bash
expo build:android
```

2. Or use EAS Build:
```bash
npx eas build --platform android
```

### iOS (App Store)

1. Build the iOS app:
```bash
expo build:ios
```

2. Or use EAS Build:
```bash
npx eas build --platform ios
```

## App Configuration

The app is configured in `app.json` with:

- **Bundle ID**: `com.apparg.mobile`
- **Package Name**: `com.apparg.mobile`
- **Version**: 1.0.0
- **Permissions**: Camera access for document verification
- **Splash Screen**: Baby pink background (#FFB6C1)

## Authentication Flow

1. **Splash Screen** (2 seconds)
2. **Login/Sign Up** selection
3. **Sign Up Process**:
   - Email/phone input
   - OTP verification
   - Password creation
   - Document verification
   - Identity verification complete
4. **Main App** access

## Security Features

- Strong password requirements
- OTP verification for email/phone
- Document verification (ID + selfie)
- Secure navigation flow
- Input validation and sanitization

## Customization

### Adding Your Logo

Replace the lightning bolt emoji (⚡) in `SplashScreen.tsx` with your custom logo asset:

1. Add your logo to the `assets/` folder
2. Update the `lightningBolt` component in `SplashScreen.tsx`
3. Import and use your logo image

### Color Scheme

Modify colors in `src/utils/colors.ts` to match your brand:

```typescript
export const Colors = {
  primary: '#YOUR_COLOR', // Your primary color
  // ... other colors
};
```

## Future Enhancements

- Backend integration
- Push notifications
- Biometric authentication
- Advanced security features
- Additional app functionality

## Development Notes

- Frontend-only implementation (no backend)
- Simulated API calls for demonstration
- Ready for backend integration
- Clean, extensible code structure
- TypeScript for better development experience

## Support

For questions or support, please refer to the React Native and Expo documentation:

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

## License

This project is private and proprietary.

