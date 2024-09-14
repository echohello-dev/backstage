# Development Setup

This guide provides detailed instructions for setting up your development environment for the Mobile Banking App.

## Required Software

1. Node.js (v14 or later)
2. npm (v6 or later) or Yarn (v1.22 or later)
3. React Native CLI
4. Xcode (for iOS development, Mac only)
5. Android Studio (for Android development)
6. Visual Studio Code (recommended IDE)

## Environment Setup

1. Install Node.js and npm from [nodejs.org](https://nodejs.org/)

2. Install React Native CLI:
   ```bash
   npm install -g react-native-cli
   ```

3. For iOS development (Mac only):
   - Install Xcode from the App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

4. For Android development:
   - Download and install Android Studio
   - Install Android SDK
   - Set up Android environment variables (ANDROID_HOME)

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/mobile-banking-app.git
   cd mobile-banking-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install iOS dependencies (Mac only):
   ```bash
   cd ios && pod install && cd ..
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required API keys and configuration values

## Running the App

- For iOS (Mac only):
  ```bash
  npx react-native run-ios
  ```

- For Android:
  ```bash
  npx react-native run-android
  ```

## Troubleshooting

If you encounter any issues during setup, refer to the [Troubleshooting](../troubleshooting.md) guide or reach out to the development team.