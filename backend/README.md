# 🎵 Spotify Clone - Backend API

A robust Node.js backend with MongoDB integration providing authentication, user management, and music playlist APIs.

## 🚀 Features

- **User Authentication**: JWT-based secure authentication
- **Password Security**: Bcrypt password hashing
- **Database Integration**: MongoDB with Mongoose ODM
- **API Security**: Rate limiting, CORS protection, input validation
- **User Management**: Profile management and statistics tracking
- **Playlist Management**: Create, read, update, delete playlists
- **Error Handling**: Comprehensive error handling and logging

## 📁 Project Structure

```
backend/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .env.example          # Environment variables template
├── test-connection.js     # MongoDB connection tester
├── setup-helper.js       # Setup guidance script
├── models/
│   ├── User.js           # User database schema
│   └── Playlist.js       # Playlist database schema
├── routes/
│   ├── auth.js           # Authentication endpoints
│   ├── user.js           # User management endpoints
│   └── music.js          # Music/playlist endpoints
└── middleware/
    └── auth.js           # JWT authentication middleware
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB credentials:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotify-clone?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

3. **Test MongoDB Connection**
   ```bash
   node test-connection.js
   ```

4. **Start the Server**
   ```bash
   # Development mode (auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## 📊 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | - | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | - | ✅ |
| `PORT` | Server port | 5000 | ❌ |
| `NODE_ENV` | Environment mode | development | ❌ |
| `CLIENT_URL` | Frontend URL for CORS | * | ❌ |

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
Register a new user
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "emailOrUsername": "john@example.com",
  "password": "securepassword123"
}
```

#### POST `/api/auth/verify-token`
Verify JWT token (requires Authorization header)

#### POST `/api/auth/logout`
Logout user (client-side token removal)

### User Routes (`/api/user`) - Protected

#### GET `/api/user/profile`
Get user profile information

#### PUT `/api/user/profile`
Update user profile
```json
{
  "username": "newusername",
  "email": "newemail@example.com",
  "preferences": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "push": false
    }
  }
}
```

#### PUT `/api/user/stats`
Update user statistics
```json
{
  "songsPlayed": 150,
  "playlistsCreated": 5,
  "totalListeningTime": 1200
}
```

#### DELETE `/api/user/account`
Delete user account

### Music Routes (`/api/music`)

#### GET `/api/music/playlists` - Protected
Get user's playlists

#### POST `/api/music/playlists` - Protected
Create new playlist
```json
{
  "name": "My Awesome Playlist",
  "description": "Best songs ever",
  "isPublic": true,
  "songs": [
    {
      "title": "Song Title",
      "artist": "Artist Name",
      "duration": 180,
      "file": "path/to/song.mp3"
    }
  ]
}
```

#### GET `/api/music/playlists/:id`
Get specific playlist (public or owned)

#### PUT `/api/music/playlists/:id` - Protected
Update playlist (owner only)

#### DELETE `/api/music/playlists/:id` - Protected
Delete playlist (owner only)

#### GET `/api/music/public-playlists`
Get public playlists with pagination

## 🔐 Authentication

### JWT Token Structure
```json
{
  "userId": "user_mongodb_id",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Headers for Protected Routes
```
Authorization: Bearer your-jwt-token-here
```

### Token Expiration
- Default: 7 days
- Automatically renewed on successful requests

## 📋 Database Schema

### User Model
```javascript
{
  username: String (unique, 3-30 chars),
  email: String (unique, valid email),
  password: String (hashed with bcrypt),
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
    totalListeningTime: Number (minutes)
  },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Playlist Model
```javascript
{
  name: String (required, max 100 chars),
  description: String (max 500 chars),
  owner: ObjectId (ref: User),
  songs: [{
    title: String,
    artist: String,
    duration: Number (seconds),
    file: String,
    addedAt: Date
  }],
  isPublic: Boolean,
  coverImage: String,
  tags: [String],
  followers: [ObjectId],
  totalDuration: Number (calculated),
  playCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security Features

### Authentication Security
- Password hashing with bcrypt (cost factor: 12)
- JWT tokens with expiration
- Token-based authentication for protected routes

### API Security
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable origin whitelist
- **Input Validation**: Express-validator for request validation
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Sanitized error responses

### Database Security
- **Input Sanitization**: Mongoose schema validation
- **Connection Security**: Encrypted MongoDB Atlas connections
- **User Data Protection**: Sensitive data exclusion in responses

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secret (32+ characters)
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Set up proper CORS origins
- [ ] Enable MongoDB Atlas backups
- [ ] Set up monitoring and logging
- [ ] Use HTTPS in production

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Monitoring & Logging

### Health Check
```
GET /api/health
```
Returns server status and database connection info.

### Error Logging
- Console logging for development
- Structured logging recommended for production
- MongoDB Atlas provides connection monitoring

## 🔧 Development Tools

### Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
node test-connection.js  # Test MongoDB connection
node setup-helper.js     # Setup guidance
```

### Testing API
Use tools like:
- Postman
- Thunder Client (VS Code)
- curl commands
- Frontend integration

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   ```bash
   node test-connection.js
   ```
   - Check connection string format
   - Verify username/password
   - Ensure IP whitelist includes your IP
   - Check cluster status in MongoDB Atlas

2. **Authentication Errors**
   - Verify JWT_SECRET is set
   - Check token format in Authorization header
   - Ensure user exists in database

3. **CORS Errors**
   - Update CLIENT_URL in .env
   - Check frontend URL matches CORS configuration
   - Verify request headers

4. **Port Already in Use**
   - Change PORT in .env
   - Kill existing processes: `netstat -ano | findstr :5000`

### Debug Mode
Set `NODE_ENV=development` for detailed error messages.

## 📈 Performance

### Optimization Tips
- Use database indexes for frequent queries
- Implement response caching for static data
- Use connection pooling (handled by Mongoose)
- Monitor query performance in MongoDB Atlas

### Scaling
- Horizontal scaling with load balancers
- Database replica sets for read scaling
- Microservices architecture for larger applications

---

**API Server Ready! 🚀**