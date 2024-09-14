# formatCurrency

The formatCurrency function formats a number as a currency string.

## Usage

Here's how to use the formatCurrency function:

import { formatCurrency } from '@your-org/utility-functions-library';

const amount = 1234.56;
const formattedAmount = formatCurrency(amount);
console.log(formattedAmount); // "$1,234.56"

## Parameters

| Parameter | Type   | Description                    |
|-----------|--------|--------------------------------|
| amount    | number | The amount to format           |
| currency  | string | (Optional) Currency code (default: 'USD') |

## Returns

A string representing the formatted currency amount.

## Example with Custom Currency

Here's an example using a custom currency:

const amount = 1000;
const formattedAmount = formatCurrency(amount, 'EUR');
console.log(formattedAmount); // "€1,000.00"