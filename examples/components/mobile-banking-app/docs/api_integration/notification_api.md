# Notification API Integration

The Mobile Banking App integrates with the Notification API to send push notifications and in-app messages to users.

## API Endpoints

- `POST /notifications`: Send a new notification
- `GET /notifications`: Retrieve notifications for a user
- `PUT /notifications/{id}/read`: Mark a notification as read

## Authentication

- Uses JWT (JSON Web Tokens) for authentication
- Requires a valid JWT in the Authorization header

## Data Models