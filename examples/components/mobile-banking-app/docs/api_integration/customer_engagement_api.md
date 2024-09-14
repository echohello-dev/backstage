# Customer Engagement API Integration

The Mobile Banking App integrates with the Customer Engagement API to provide personalized user experiences and support features.

## API Endpoints

- `GET /customer/{id}`: Retrieve customer information
- `GET /supportTickets`: List support tickets for a customer
- `POST /supportTickets`: Create a new support ticket
- `PUT /supportTickets/{id}`: Update an existing support ticket

## Authentication

- Uses OAuth 2.0 for secure API access
- Requires valid access token in the Authorization header

## Error Handling

- Implements robust error handling for API failures
- Provides user-friendly error messages for common issues

## Data Models