# React User Management Application

## Overview

This is a comprehensive User Management application built with React and Material-UI. The application demonstrates proficiency in React development, focusing on CREATE, READ, and UPDATE functionality for user management.

## Features

- 🆕 Add new users with a modal form
- ✏️ Edit existing user details
- 📝 Form validation for user inputs
- 🚨 Snackbar notifications for user actions
- 📱 Responsive design using Material-UI Grid system

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd WEEK1PROJECT
   ```

3. Install dependencies:
   ```bash
   npm install or yarn install
   ```

## Dependencies

The application uses the following key dependencies:

- `@mui/material`: UI component library
- `@mui/icons-material`: Material design icons
- `react`: JavaScript library for building user interfaces
- `react-dom`: React package for working with the DOM
- React Hooks
- Local State Management

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Application Structure

```
## Application Structure

src/
│
├── components/
│   └── UserManagement/
│       ├── UserManagement.jsx   # Main container component
│       │   ├── Header          # Title section
│       │   ├── AddUserButton   # New user button
│       │   ├── UsersList       # List of users
│       │   │   └── UserListItem # Individual user entry
│       │   ├── UserFormDialog  # Add/Edit modal
│       │   └── Notifications   # Snackbar alerts
│
├── App.js                      # Root component
└── index.js                    # Entry point
```

## Usage

### Adding a User

1. Click the "Add New User" button
2. Fill out the form in the modal:
   - Name (required)
   - Email (required, must be valid)
   - Phone (required)
3. Click "Add User" to save

### Editing a User

1. Click the edit icon (pencil) next to a user
2. Modify user details in the modal
3. Click "Update User" to save changes


## Form Validation

The application includes robust form validation:
- All fields are required
- Email must be in a valid format
- Immediate error feedback for invalid inputs

## Notifications

Snackbar notifications will appear for:
- Successfully adding a user
- Successfully updating a user

## Responsive Design

The application is fully responsive and works well on:
- Desktop browsers
- Tablets
- Mobile devices


Project Link: 'https://github.com/Eve-rine/WEEK1PROJECT'