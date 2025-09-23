# 🎵 Spotify Clone - Frontend

A modern, responsive music player interface built with HTML, CSS, and JavaScript.

## 🚀 Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **User Authentication**: Login and signup with MongoDB backend
- **Music Player**: Play, pause, skip, shuffle, and repeat functionality
- **Playlist Management**: Create and manage your music playlists
- **Search Functionality**: Search through your music library
- **User Profile**: View and manage your profile information
- **Volume Control**: Adjust playback volume
- **Progress Bar**: Seek to any position in the song

## 📁 Project Structure

```
frontend/
├── index.html          # Main music player interface
├── login.html          # User login page
├── signup.html         # User registration page
├── profile.html        # User profile page
├── favicon.ico         # Website icon
├── package.json        # Frontend configuration
├── css/
│   ├── style.css       # Main application styles
│   ├── auth.css        # Authentication page styles
│   └── utility.css     # Utility classes
├── js/
│   ├── script.js       # Main application logic
│   └── auth.js         # Authentication handling
├── img/                # UI icons and images
└── songs/              # Music files organized by genre
    ├── chillvibes/
    ├── hiphop/
    ├── pophits/
    ├── punjabihits/
    └── saiyaara/
```

## 🛠️ Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python (for local development server) or any HTTP server
- Backend server running on http://localhost:5000

### Running the Frontend

#### Option 1: Using Python HTTP Server
```bash
cd frontend
python -m http.server 3000
```
Then open: http://localhost:3000

#### Option 2: Using Node.js HTTP Server
```bash
cd frontend
npx http-server -p 3000
```

#### Option 3: Using Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 4: Direct File Opening
Simply double-click `index.html` to open in your browser
(Note: Some features may not work due to CORS restrictions)

## 🔗 Backend Integration

The frontend communicates with the backend API running on `http://localhost:5000/api`

### API Endpoints Used:
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-token` - Token verification
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/stats` - Update user statistics

### Configuration
The API URL is configured in `js/auth.js`:
```javascript
this.apiUrl = 'http://localhost:5000/api';
```

## 🎨 Customization

### Adding New Songs
1. Add your music files to the appropriate genre folder in `songs/`
2. Update the `sampleAlbums` array in `js/script.js`
3. Add song metadata (title, artist, duration, file path)

### Styling
- Main styles: `css/style.css`
- Authentication styles: `css/auth.css`
- Utility classes: `css/utility.css`

### Color Scheme
The app uses a Spotify-inspired dark theme:
- Primary: #1db954 (Spotify Green)
- Background: #191414 (Dark)
- Secondary: #333333 (Dark Grey)

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Adapted layout with hamburger menu
- **Mobile**: Optimized for touch interaction

## 🔐 Authentication Flow

1. **New Users**: Sign up → Create account → Auto login → Main app
2. **Existing Users**: Login → Token verification → Main app
3. **Persistent Sessions**: JWT tokens stored in localStorage
4. **Logout**: Clear tokens → Redirect to login

## 🎵 Music Player Features

### Controls
- Play/Pause toggle
- Previous/Next track navigation
- Shuffle mode
- Repeat mode
- Volume control with mute
- Seek bar for track navigation

### Playlists
- Browse curated playlists
- View song lists
- Play entire playlists
- Search functionality

## 🚀 Deployment

### For Development
```bash
npm run dev
# or
npm start
```

### For Production
1. Build static files (no build process needed - pure HTML/CSS/JS)
2. Deploy to any static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting

### Environment Variables
Update the API URL in `js/auth.js` for production:
```javascript
this.apiUrl = 'https://your-backend-domain.com/api';
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend server is running
   - Check API URL in `js/auth.js`
   - Use HTTP server, don't open files directly

2. **Songs Not Playing**
   - Check file paths in `js/script.js`
   - Ensure audio files exist in `songs/` directories
   - Verify browser audio permissions

3. **Authentication Not Working**
   - Verify backend server is running on port 5000
   - Check browser console for errors
   - Clear localStorage if needed

4. **Responsive Issues**
   - Check browser zoom level
   - Verify CSS media queries
   - Test in different browsers

## 📄 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Enjoy your music! 🎶**