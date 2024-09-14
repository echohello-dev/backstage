# Core Banking API Integration

The Mobile Banking App integrates with the Core Banking API to perform essential banking operations such as account management, fund transfers, and balance inquiries.

## API Endpoints

- `GET /accounts`: Retrieve a list of user accounts
- `GET /accounts/{id}`: Get details of a specific account
- `POST /transfers`: Initiate a fund transfer
- `GET /transactions`: Retrieve transaction history

## Authentication

- Uses OAuth 2.0 for secure API access
- Requires valid access token in the Authorization header

## Error Handling

- Implements robust error handling for API failures
- Provides user-friendly error messages for common issues

## Data Models