console.log('🎵 Enhanced Spotify Clone with Stunning Visual Effects 🎵');

let currentSong = null;
let songs = [];
let currentSongIndex = 0;
let isPlaying = false;
let currentVolume = 0.5;
let currentTime = 0;
let duration = 0;
let currFolder = '';
let isShuffle = false;
let isRepeat = false;

// Enhanced Visual Effects
function createVisualEffects() {
    // Add ripple effect on card clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card')) {
            createRippleEffect(e);
        }
    });

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Hide loading screen immediately when DOM is ready
    hideLoadingScreen();
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Hide loading screen quickly
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Add loaded class to body for any additional animations
                document.body.classList.add('loaded');
            }, 300);
        }, 100); // Very fast loading
    }
}

function createRippleEffect(e) {
    const card = e.target.closest('.card');
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(29, 185, 84, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .card {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

const sampleAlbums = [
  {
    id: "chill-vibes",
    title: "Chill Vibes",
    description: "Relaxing music for any mood",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    songs: [
      {
        title: " Light It Up",
        artist: "Robin Hustin",
        duration: 185,
        file: "songs/chillvibes/LightItUp.mp3",
      },
      {
        title: "Wildflower",
        artist: "Billie Eilish",
        duration: 260,
        file: "songs/chillvibes/Wildflower.mp3",
      },
      {
        title: "Perfect",
        artist: "Ed Sheeran",
        duration: 263,
        file: "songs/chillvibes/Perfect.mp3",
      },
      {
        title: "Shivers",
        artist: "Ed Sheeran",
        duration: 208,
        file: "songs/chillvibes/Shivers.mp3",
      },
    ],
  },
  {
    id: "punjabi-hits",
    title: "Punjabi Hits",
    description: "Timeless punjabi hit anthems",
    cover:
      //   "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
      "https://img.freepik.com/premium-psd/bhangra-dancers-performing-punjabi-wedding-with-drums-vector-illustration-music-poster-idea_1020495-430602.jpg",

    songs: [
      {
        title: " Winning Speech",
        artist: "Karan Aujla",
        duration: 227,
        file: "songs/punjabihits/WinningSpeech.mp3",
      },
      {
        title: "Jee Ni Lagda",
        artist: "Karan Aujla",
        duration: 482,
        file: "songs/punjabihits/JeeNiLagda.mp3",
      },
      {
        title: "Together",
        artist: "Subh",
        duration: 149,
        file: "songs/punjabihits/Together.mp3",
      },
      {
        title: "Call Aundi",
        artist: "Yo Yo Honey Singh",
        duration: 216, 
        file: "songs/punjabihits/CallAundi.mp3",
      },
    ],
  },
  {
    id: "pop-hits",
    title: "Pop Hits",
    description: "The biggest pop songs of the year",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    songs: [
      {
        title: "Blinding Lights",
        artist: "The Weeknd",
        duration: 203,
        file: "songs/pophits/BlindingLights.mp3",
      },
      {
        title: "As It Was",
        artist: "Harry Styles",
        duration: 163,
        file: "songs/pophits/AsItWas.mp3",
      },
      {
        title: "Anti-Hero",
        artist: "Taylor Swift",
        duration: 214,
        file: "songs/pophits/AntiHero.mp3",
      },
      {
        title: "Sapphire",
        artist: "Ed Sheeran",
        duration: 178,
        file: "songs/pophits/Sapphire.mp3",
      },
    ],
  },
  {
    id: "hip-hop-bangers",
    title: "Hip-Hop Bangers",
    description: "The hottest hip-hop tracks",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf6y6X4Rxd6zYHbh2B2KmBazs_HX88mlOyhA&s",
    songs: [
      {
        title: "HUMBLE",
        artist: "Kendrick Lamar",
        duration: 177,
        file: "songs/hiphop/Humble.mp3",
      },
      {
        title: "Gods Plan",
        artist: "Drake",
        duration: 199,
        file: "songs/hiphop/Gods-Plan.mp3",
      },
      {
        title: "Sicko Mode",
        artist: "Travis Scott",
        duration: 314,
        file: "songs/hiphop/Sicko.mp3",
      },
      {
        title: "Old Town Road",
        artist: "Lil Nas X",
        duration: 157,
        file: "songs//hiphop/OldTown.mp3",
      },
    ],
  },
  {
    id: "bollywood",
    title: "Bollywood Hits",
    description: "The new bollywood tracks",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmTUwURfokygCu9r1dO4F8GPgpi_AiohC3vw&s",
    songs: [
      {
        title: "Saiyaara",
        artist: "Faheem",
        duration: 370,
        file: "songs/saiyaara/Saiyaara.mp3",
      },
      {
        title: "Dhun",
        artist: "Arijit Singh",
        duration: 276,
        file: "songs/saiyaara/Dhun.mp3",
      },
      {
        title: "Humsafar",
        artist: "Sachet Tandon",
        duration: 322,
        file: "songs/saiyaara/Humsafar.mp3",
      },
      {
        title: "Barbaad",
        artist: "Jubin Nautiyal",
        duration: 357,
        file: "songs/saiyaara/Barbaad.mp3",
      },
    ],
  },
];

function secondsToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Create real audio object
function createAudio(songData) {
    const audio = new Audio(songData.file);
    audio.volume = currentVolume;
    console.log("Created audio with volume:", currentVolume, "Actual audio volume:", audio.volume);
    audio.addEventListener('ended', nextSong);
    return audio;
}

function loadSong(index, pause = false) {
    if (!songs[index]) return;

    currentSongIndex = index;
    const song = songs[index];

    if (currentSong) {
        currentSong.pause();
    }

    currentSong = createAudio(song);
    currentTime = 0;
    duration = song.duration;

    document.getElementById('currentSongTitle').textContent = song.title;
    document.getElementById('currentArtist').textContent = song.artist;
    document.getElementById('totalTime').textContent = secondsToMinutesSeconds(duration);
    document.getElementById('currentTime').textContent = "00:00";

    if (!pause) {
        playMusic();
    }

    updateProgressBar();
}

function playMusic() {
    const playBtn = document.getElementById("play");

    if (!currentSong) return;

    if (currentSong.paused) {
        currentSong.play();
        playBtn.src = "img/pause.svg";
        playBtn.classList.add("playing");
        isPlaying = true;
        
        // Add beautiful visual effects when playing
        addPlayingEffects();
        
        // Update currently playing song in list
        updatePlayingSongInList();
    } else {
        currentSong.pause();
        playBtn.src = "img/play.svg";
        playBtn.classList.remove("playing");
        isPlaying = false;
        
        // Remove playing effects
        removePlayingEffects();
    }

    updatePlaybackTime();
}

function addPlayingEffects() {
    const playBtn = document.getElementById("play");
    const playbar = document.querySelector(".playbar");
    
    // Add glow effect to play button
    if (playBtn) {
        playBtn.style.boxShadow = "0 0 30px rgba(29, 185, 84, 0.8)";
    }
    
    // Add subtle animation to playbar
    if (playbar) {
        playbar.style.background = "linear-gradient(135deg, rgba(29, 185, 84, 0.1), rgba(10, 10, 10, 0.95), rgba(139, 92, 246, 0.1))";
    }
}

function removePlayingEffects() {
    const playBtn = document.getElementById("play");
    const playbar = document.querySelector(".playbar");
    
    if (playBtn) {
        playBtn.style.boxShadow = "";
    }
    
    if (playbar) {
        playbar.style.background = "";
    }
}

function updatePlayingSongInList() {
    // Remove previous playing indicators
    document.querySelectorAll('.songList ul li').forEach(li => {
        li.classList.remove('playing');
    });
    
    // Add playing indicator to current song
    const songItems = document.querySelectorAll('.songList ul li');
    if (songItems[currentSongIndex]) {
        songItems[currentSongIndex].classList.add('playing');
    }
}

function updatePlaybackTime() {
    const interval = setInterval(() => {
        if (currentSong && !currentSong.paused) {
            currentTime = currentSong.currentTime;
            updateProgressBar();
        }
        if (!currentSong || currentSong.paused) {
            clearInterval(interval);
        }
    }, 200);
}

function nextSong() {
    if (isRepeat) {
        loadSong(currentSongIndex);
    } else if (isShuffle) {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * songs.length);
        } while (nextIndex === currentSongIndex && songs.length > 1);
        loadSong(nextIndex);
    } else {
        loadSong((currentSongIndex + 1) % songs.length);
    }
}

function previousSong() {
    if (currentSongIndex > 0) {
        loadSong(currentSongIndex - 1);
    } else {
        loadSong(songs.length - 1);
    }
}

function updateProgressBar() {
    if (!duration) return;
    const progress = (currentTime / duration) * 100;
    document.querySelector(".circle").style.left = progress + "%";
    document.getElementById('currentTime').textContent = secondsToMinutesSeconds(currentTime);
}

function loadAlbum(album) {
    currFolder = album.id;
    songs = album.songs;
    displaySongs();
    if (songs.length > 0) {
        loadSong(0);
    }
}

function displayAlbums() {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    sampleAlbums.forEach(album => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.folder = album.id;

        card.innerHTML = `
            <div class="play">
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" />
                </svg>
            </div>
            <img src="${album.cover}" alt="${album.title}">
            <h2>${album.title}</h2>
            <p>${album.description}</p>
        `;

        card.addEventListener('click', () => {
            loadAlbum(album);
        });

        cardContainer.appendChild(card);
    });
}

function displaySongs(songList = songs) {
    const container = document.getElementById('songListContainer');
    container.innerHTML = '';

    songList.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img class="invert" width="34" src="img/music.svg" alt="">
            <div class="info">
                <div>${song.title}</div>
                <div>${song.artist}</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div>
        `;

        // Use index of original songs array
        li.addEventListener('click', () => {
            const songIndex = songs.indexOf(song);
            if (songIndex !== -1) {
                loadSong(songIndex);
                playMusic();
            }
        });

        container.appendChild(li);
    });
}

function setupEventListeners() {
    document.getElementById("play").addEventListener("click", playMusic);
    document.getElementById("next").addEventListener("click", nextSong);
    document.getElementById("previous").addEventListener("click", previousSong);

    // Seekbar click
    const seekbar = document.querySelector(".seekbar");
    const circle = document.querySelector(".circle");

    seekbar.addEventListener("click", (e) => {
        if (!duration || !currentSong) return;
        const rect = seekbar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        currentSong.currentTime = duration * percent;
        currentTime = currentSong.currentTime;
        updateProgressBar();
    });

    // Drag functionality
    let isDragging = false;
    circle.addEventListener("mousedown", (e) => {
        isDragging = true;
        e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
        if (!isDragging || !duration || !currentSong) return;
        const rect = seekbar.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;
        percent = Math.min(Math.max(percent, 0), 1);
        currentSong.currentTime = duration * percent;
        currentTime = currentSong.currentTime;
        updateProgressBar();
    });
    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Volume slider
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeIcon = document.getElementById("volumeIcon");
    
    console.log("Volume slider element:", volumeSlider);
    console.log("Volume icon element:", volumeIcon);
    
    if (volumeSlider) {
        volumeSlider.addEventListener("input", (e) => {
            const volume = parseInt(e.target.value) / 100;
            currentVolume = volume;
            console.log("Volume slider changed to:", volume);
            console.log("Current song exists:", !!currentSong);
            if (currentSong) {
                currentSong.volume = volume;
                console.log("Applied volume to current song:", currentSong.volume);
            }
            if (volumeIcon) {
                volumeIcon.src = volume === 0 ? "img/mute.svg" : "img/volume.svg";
            }
        });
        console.log("Volume slider event listener attached");
    } else {
        console.error("Volume slider element not found!");
    }

    // Volume icon
    if (volumeIcon) {
        volumeIcon.addEventListener("click", () => {
            console.log("Volume icon clicked. Current volume:", currentVolume);
            if (currentVolume > 0) {
                if (volumeSlider) volumeSlider.value = 0;
                currentVolume = 0;
                volumeIcon.src = "img/mute.svg";
                console.log("Muted");
            } else {
                if (volumeSlider) volumeSlider.value = 50;
                currentVolume = 0.5;
                volumeIcon.src = "img/volume.svg";
                console.log("Unmuted to 50%");
            }
            if (currentSong) {
                currentSong.volume = currentVolume;
                console.log("Applied volume to current song:", currentSong.volume);
            }
        });
        console.log("Volume icon event listener attached");
    } else {
        console.error("Volume icon element not found!");
    }
    

    // Mobile menu
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Play/pause with spacebar
    window.addEventListener("keydown", function (e) {
    // Prevent scrolling if space is pressed outside an input
        if (e.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
            e.preventDefault();
            playMusic();
        }
    });

// Sidebar search focus logic
const sidebarSearchBtn = document.getElementById("sidebarSearchBtn");
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredSongs = songs.filter(song =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        );
        displaySongs(filteredSongs);
    });
}
if (sidebarSearchBtn && searchInput) {
    sidebarSearchBtn.addEventListener("click", () => {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
        isShuffle = !isShuffle;
        shuffleBtn.style.filter = isShuffle
            ? "invert(50%) sepia(100%) saturate(500%) hue-rotate(100deg)"
            : "invert(1)";
    });
}

if (repeatBtn) {
    repeatBtn.addEventListener("click", () => {
        isRepeat = !isRepeat;
        repeatBtn.style.filter = isRepeat
            ? "invert(50%) sepia(100%) saturate(500%) hue-rotate(300deg)"
            : "invert(1)";
    });
}


}

// Authentication functionality
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('spotifyCloneUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('spotifyCloneCurrentUser')) || null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    logout() {
        localStorage.removeItem('spotifyCloneCurrentUser');
        this.currentUser = null;
        updateAuthUI();
    }
}

const authManager = new AuthManager();

function updateAuthUI() {
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const welcomeText = document.getElementById('welcomeText');

    if (authManager.isLoggedIn()) {
        // User is logged in
        signupBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        userMenu.style.alignItems = 'center';
        userMenu.style.gap = '15px';
        welcomeText.textContent = `Welcome, ${authManager.getCurrentUser().username}!`;
    } else {
        // User is not logged in
        signupBtn.style.display = 'block';
        loginBtn.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

function setupAuthEventListeners() {
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileBtn = document.getElementById('profileBtn');

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                authManager.logout();
            }
        });
    }
}

function main() {
    // Hide loading screen immediately
    createVisualEffects();
    
    displayAlbums();
    if (sampleAlbums.length > 0) {
        loadAlbum(sampleAlbums[0]);
    }
    setupEventListeners();
    setupAuthEventListeners();
    updateAuthUI();
    
    // Initialize volume slider
    const volumeSlider = document.getElementById("volumeSlider");
    if (volumeSlider) {
        volumeSlider.value = currentVolume * 100;
        console.log("🎵 Initialized volume slider to:", currentVolume * 100);
    }
    
    // Add welcome animation
    setTimeout(() => {
        console.log("🌟 Welcome to the most beautiful Spotify clone! 🌟");
        showWelcomeAnimation();
    }, 500);
}

function showWelcomeAnimation() {
    // Hide loading screen with beautiful animation
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    const title = document.querySelector('.spotifyPlaylists h1');
    if (title) {
        title.style.transform = 'translateY(-20px)';
        title.style.opacity = '0';
        setTimeout(() => {
            title.style.transform = 'translateY(0)';
            title.style.opacity = '1';
            title.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 1200);
    }
    
    // Animate cards with stagger effect (faster loading)
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.transform = 'translateY(30px)';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            }, index * 50); // Much faster staggered animation
        });
    }, 200); // Start animation much sooner
}

// Start the app as soon as DOM is ready (not waiting for images/resources)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    // DOM is already ready
    main();
}
