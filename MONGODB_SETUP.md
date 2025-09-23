# MongoDB Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB installation)

## Setup Steps

### 1. Configure MongoDB Connection

1. **Update your MongoDB connection string in `.env` file:**
   
   Replace `your_username` and `your_password` with your actual MongoDB credentials.

### 2. Install Backend Dependencies

Open PowerShell/Command Prompt and navigate to the backend directory:

```powershell
cd "c:\Users\aryan\OneDrive\Desktop\Semester-1\Web Development\Project-Spotify Clone\backend"
npm install
```

### 3. Set Environment Variables

1. Copy the `.env` file and update the following:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens (you can generate one online)
   - `PORT`: Server port (default is 5000)

### 4. Start the Backend Server

```powershell
# For development (with auto-restart)
npm run dev

# Or for production
npm start
```

The server will start on `http://localhost:5000`

### 5. Test the API

You can test the API endpoints using:

#### Health Check
```
GET http://localhost:5000/api/health
```

#### Register User
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login User
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "emailOrUsername": "test@example.com",
  "password": "password123"
}
```

### 6. Update Frontend Configuration

The frontend is already configured to connect to `http://localhost:5000/api`. If you change the backend port, update the `apiUrl` in `js/auth.js`.

## Available API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-token` - Verify JWT token
- `POST /api/auth/logout` - Logout user

### User Management
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)
- `PUT /api/user/stats` - Update user stats (requires auth)
- `DELETE /api/user/account` - Delete user account (requires auth)

### Music & Playlists
- `GET /api/music/playlists` - Get user playlists (requires auth)
- `POST /api/music/playlists` - Create playlist (requires auth)
- `GET /api/music/playlists/:id` - Get specific playlist
- `PUT /api/music/playlists/:id` - Update playlist (requires auth)
- `DELETE /api/music/playlists/:id` - Delete playlist (requires auth)
- `GET /api/music/public-playlists` - Get public playlists

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers

## Database Schema

### User Collection
```javascript
{
  username: String (unique, 3-30 chars),
  email: String (unique, valid email),
  password: String (hashed),
  profilePicture: String,
  isVerified: Boolean,
  preferences: {
    theme: String ('dark'|'light'),
    language: String,
    notifications: {
      email: Boolean,
      push: Boolean
    }
  },
  stats: {
    songsPlayed: Number,
    playlistsCreated: Number,
    totalListeningTime: Number
  },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Playlist Collection
```javascript
{
  name: String (required),
  description: String,
  owner: ObjectId (ref: User),
  songs: [{
    title: String,
    artist: String,
    duration: Number,
    file: String,
    addedAt: Date
  }],
  isPublic: Boolean,
  coverImage: String,
  tags: [String],
  followers: [ObjectId],
  totalDuration: Number,
  playCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify username and password

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill any process using port 5000: `netstat -ano | findstr :5000`

3. **CORS Errors**
   - Make sure the backend server is running
   - Check CLIENT_URL in `.env` matches your frontend URL

### Development Tips

1. Use MongoDB Compass to view your database
2. Enable MongoDB Atlas monitoring for performance insights
3. Use Postman or Thunder Client to test API endpoints
4. Check server logs for detailed error information

## Production Deployment

For production deployment:
1. Set `NODE_ENV=production` in `.env`
2. Use a strong JWT secret
3. Enable MongoDB Atlas backups
4. Use HTTPS for secure connections
5. Set up proper logging and monitoring

---

Your Spotify Clone now has a fully functional MongoDB backend! 🎉