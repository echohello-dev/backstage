# Utility Functions Library

This library provides a collection of utility functions for our digital banking applications.

## Available Functions

- formatCurrency: Format a number as currency
- validateEmail: Validate an email address
- maskAccountNumber: Mask sensitive account numbers
- calculateInterest: Calculate interest based on principal and rate

## Installation

To install the Utility Functions Library, run the following command:

npm install @your-org/utility-functions-library

## Usage

Here's an example of how to use functions from the library:

import { formatCurrency, maskAccountNumber } from '@your-org/utility-functions-library';

const amount = 1234.56;
console.log(formatCurrency(amount)); // "$1,234.56"

const accountNumber = "1234567890";
console.log(maskAccountNumber(accountNumber)); // "XXXXXX7890"

For more detailed documentation on each function, please refer to the specific function pages.
