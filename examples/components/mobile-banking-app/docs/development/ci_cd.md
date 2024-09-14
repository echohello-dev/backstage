# Continuous Integration and Deployment (CI/CD)

This document outlines the CI/CD processes for the Mobile Banking App.

## CI/CD Pipeline

We use GitHub Actions for our CI/CD pipeline. The pipeline is defined in `.github/workflows/main.yml`.

## Continuous Integration

On every pull request and push to the main branch, the following steps are automatically executed:

1. **Linting**: ESLint is run to ensure code quality.
2. **Type Checking**: TypeScript type checking is performed.
3. **Unit Tests**: All unit tests are run using Jest.
4. **Integration Tests**: Integration tests are executed.
5. **Build**: The app is built for both iOS and Android platforms.

## Continuous Deployment

### Staging Deployment

When a pull request is merged into the `develop` branch:

1. A new build is created with a unique version number.
2. The app is deployed to TestFlight (iOS) and Google Play Internal Testing Track (Android).
3. QA team is notified for testing.

### Production Deployment

When a new release is created on GitHub:

1. A production build is created with the release version number.
2. The app is deployed to the App Store and Google Play Store.
3. Release notes are automatically generated and posted.

## Environment Management

- We use different environment configurations for development, staging, and production.
- Environment-specific variables are managed using `.env` files and react-native-config.

## Monitoring and Alerts

- We use Crashlytics for crash reporting.
- Performance monitoring is done using Firebase Performance Monitoring.
- Alerts are set up for critical issues and sent to the development team via Slack.

## Security Checks

- Dependency vulnerability scanning is performed using Dependabot.
- Code scanning for security issues is done using GitHub's CodeQL.

## Best Practices

- Keep the `main` branch always deployable.
- Use feature flags for gradual rollout of new features.
- Perform code reviews for all changes before merging.
- Regularly update dependencies and address security alerts promptly.

## Useful Commands

- Trigger manual build: `npm run build`
- Run local CI checks: `npm run ci-check`

For more detailed information on our CI/CD processes, please refer to the internal development wiki.