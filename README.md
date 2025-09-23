# 🎵 Spotify Clone - Full Stack Music Application

A complete music streaming application inspired by Spotify, built with modern web technologies including a responsive frontend and a robust Node.js backend with MongoDB integration.

## 🌟 Overview

This project is a full-featured music player that replicates core Spotify functionality with user authentication, playlist management, and a beautiful responsive interface.

## 🏗️ Project Structure

```
Project-Spotify Clone/
├── frontend/                 # React-like frontend (HTML, CSS, JS)
│   ├── index.html           # Main music player interface
│   ├── login.html           # Authentication pages
│   ├── signup.html          
│   ├── profile.html         
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript logic
│   ├── img/                 # UI assets
│   └── songs/               # Music files
│
├── backend/                  # Node.js Express API
│   ├── server.js            # Main server file
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Authentication middleware
│   └── .env                 # Environment variables
│
├── docs/                    # Documentation
│   ├── MONGODB_SETUP.md     # Database setup guide
│   ├── AUTH_README.md       # Authentication guide
│   └── README_MONGODB.md    # MongoDB integration guide
│
└── README.md                # This file
```

## ✨ Features

### 🎧 Music Player
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Audio Controls**: Play, pause, skip, shuffle, repeat
- **Volume Control**: Adjustable volume with mute functionality
- **Progress Bar**: Seek to any position in tracks
- **Playlist Support**: Browse and play curated playlists

### 👤 User Management
- **User Registration**: Create new accounts with validation
- **Secure Login**: JWT-based authentication
- **Profile Management**: View and edit user profiles
- **User Statistics**: Track songs played, playlists created, listening time
- **Persistent Sessions**: Remember logged-in users

### 🎵 Music Features
- **Multiple Genres**: Pre-loaded with various music genres
- **Search Functionality**: Find songs quickly
- **Playlist Creation**: Create and manage personal playlists
- **Public Playlists**: Browse community playlists
- **Song Management**: Add/remove songs from playlists

### 🔐 Security
- **Password Hashing**: Secure bcrypt password storage
- **JWT Tokens**: Stateless authentication
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: API protection against abuse
- **CORS Protection**: Secure cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (free tier available)
- Modern web browser

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Project-Spotify\ Clone
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file with your MongoDB credentials:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spotify-clone
JWT_SECRET=your-super-secret-key
PORT=5000
NODE_ENV=development
```

Test MongoDB connection:
```bash
node test-connection.js
```

Start backend server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
python -m http.server 3000
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **LocalStorage**: Client-side data persistence
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Token authentication
- **Bcrypt**: Password hashing
- **Helmet**: Security middleware
- **Express-validator**: Input validation
- **CORS**: Cross-origin resource sharing

### Database
- **MongoDB Atlas**: Cloud-hosted database
- **Mongoose**: Object Document Mapper
- **Schema Validation**: Data integrity enforcement
- **Indexing**: Optimized query performance

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # Starts Python HTTP server
```

### API Testing
Use the health endpoint to verify setup:
```bash
curl http://localhost:5000/api/health
```

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-token` - Token verification

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/stats` - Update statistics

### Music & Playlists
- `GET /api/music/playlists` - Get user playlists
- `POST /api/music/playlists` - Create playlist
- `GET /api/music/public-playlists` - Browse public playlists

For detailed API documentation, see `backend/README.md`.

## 🚢 Deployment

### Production Deployment
1. **Frontend**: Deploy to static hosting (Netlify, Vercel, GitHub Pages)
2. **Backend**: Deploy to cloud platforms (Heroku, Railway, DigitalOcean)
3. **Database**: MongoDB Atlas (production cluster)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**🎶 Enjoy building your music streaming experience! 🎶**