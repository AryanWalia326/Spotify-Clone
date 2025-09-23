# Spotify Clone - Authentication System

## Overview
This Spotify clone now includes a complete authentication system with user registration, login, and profile management.

## Features
- **User Registration**: Create new accounts with username, email, and password
- **User Login**: Secure login with email/username and password
- **User Profile**: View and manage user profile information
- **Session Management**: Persistent login sessions using localStorage
- **Password Security**: Password validation with strength requirements
- **Responsive Design**: Mobile-friendly authentication pages

## Files Added/Modified

### New Files:
- `login.html` - Login page
- `signup.html` - Registration page
- `profile.html` - User profile page
- `css/auth.css` - Styling for authentication pages
- `js/auth.js` - Authentication logic and utilities

### Modified Files:
- `index.html` - Added user menu and authentication buttons
- `css/style.css` - Added styling for user menu and profile button
- `js/script.js` - Integrated authentication functionality

## How to Use

### For Users:
1. **Sign Up**: Click the "Sign up" button and create a new account
2. **Login**: Click the "Log in" button and enter your credentials
3. **Profile**: Once logged in, click the "Profile" button to view your profile
4. **Logout**: Click the "Log out" button to end your session

### For Developers:
The authentication system uses localStorage to store user data and sessions. In a production environment, this should be replaced with a proper backend API.

## Authentication Flow

1. **Registration**: Users create accounts with validation for:
   - Username (minimum 3 characters, unique)
   - Email (valid format, unique)
   - Password (minimum 8 characters, contains letters and numbers)
   - Terms and Privacy acceptance

2. **Login**: Users authenticate with:
   - Email or username
   - Password
   - Optional "Remember me" functionality

3. **Session Management**: 
   - User data stored in localStorage
   - Automatic redirect to login if not authenticated
   - Persistent sessions across browser sessions

## Data Storage
Currently uses browser localStorage with the following keys:
- `spotifyCloneUsers` - Array of all registered users
- `spotifyCloneCurrentUser` - Currently logged-in user data

## Security Features
- Password strength validation
- Email format validation
- Duplicate email/username prevention
- Form validation with real-time feedback
- Secure logout functionality

## Customization
You can easily customize:
- Validation rules in `js/auth.js`
- Styling in `css/auth.css`
- User interface elements in the HTML files

## Future Enhancements
- Backend API integration
- Password reset functionality
- Email verification
- Social media login
- Two-factor authentication
- User preferences and settings

## Demo Accounts
You can create test accounts to explore the functionality. All data is stored locally in your browser.

---

**Note**: This is a demo authentication system using localStorage. For production use, implement proper backend authentication with encrypted passwords and secure session management.