# Testing

This document outlines the testing practices for the Mobile Banking App.

## Testing Framework

We use Jest as our primary testing framework, along with React Native Testing Library for component testing.

## Types of Tests

1. **Unit Tests**: For testing individual functions and components in isolation.
2. **Integration Tests**: For testing interactions between different parts of the app.
3. **End-to-End Tests**: For testing complete user flows using Detox.

## Writing Tests

- Place test files next to the code they're testing with a `.test.js` suffix.
- Use descriptive test names that explain the expected behavior.
- Follow the Arrange-Act-Assert pattern in your tests.

Example:
