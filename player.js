class MusicPlayer {
    constructor(playlist) {
        // DOM elements
        this.albumCover = document.getElementById("albumCover");
        this.songTitle = document.getElementById("songTitle");
        this.artist = document.getElementById("artist");
        this.progress = document.getElementById("progress");
        this.ctrlIcon = document.getElementById("ctrlIcon");
        this.playBtn = document.getElementById("playBtn");
        this.nextBtn = document.getElementById("nextBtn");
        this.prevBtn = document.getElementById("prevBtn");

        // Playlist & state
        this.playlist = playlist;
        this.currentIndex = 0;
        this.currentSong = document.getElementById(this.playlist[this.currentIndex].id);

        // Event listeners
        this.playBtn.addEventListener("click", () => this.playPause());
        this.nextBtn.addEventListener("click", () => this.nextSong());
        this.prevBtn.addEventListener("click", () => this.prevSong());
        this.progress.addEventListener("input", () => this.seek());

        // Update progress and autoplay next
        this.currentSong.addEventListener("timeupdate", () => this.updateProgress());
        this.currentSong.addEventListener("ended", () => this.nextSong());

        // Load first song
        this.loadSong();
    }

    loadSong() {
        // Pause all songs
        this.playlist.forEach(s => document.getElementById(s.id).pause());

        this.currentSong = document.getElementById(this.playlist[this.currentIndex].id);

        // Update UI
        this.songTitle.textContent = this.playlist[this.currentIndex].title;
        this.artist.textContent = this.playlist[this.currentIndex].artist;
        this.albumCover.src = this.playlist[this.currentIndex].cover;

        // Reset progress
        this.progress.value = 0;
        this.currentSong.currentTime = 0;

        // Play song
        this.currentSong.play().catch(() => {
            console.log("Click play to start music"); // handles autoplay restrictions
        });

        this.ctrlIcon.classList.add("fa-pause");
        this.ctrlIcon.classList.remove("fa-play");

        // Update event listeners for the new song
        this.currentSong.addEventListener("timeupdate", () => this.updateProgress());
        this.currentSong.addEventListener("ended", () => this.nextSong());
    }

    playPause() {
        if (this.currentSong.paused) {
            this.currentSong.play();
            this.ctrlIcon.classList.add("fa-pause");
            this.ctrlIcon.classList.remove("fa-play");
        } else {
            this.currentSong.pause();
            this.ctrlIcon.classList.remove("fa-pause");
            this.ctrlIcon.classList.add("fa-play");
        }
    }

    updateProgress() {
        if (!isNaN(this.currentSong.duration)) {
            this.progress.max = this.currentSong.duration;
            this.progress.value = this.currentSong.currentTime;
        }
    }

    seek() {
        this.currentSong.currentTime = this.progress.value;
    }

    nextSong() {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.loadSong();
    }

    prevSong() {
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadSong();
    }
}

// Playlist array
const playlist = [
    { id: "song1", title: "Can't Tell Me Nothing", artist: "Kanye West", cover: "Media/kanye-west-graduation.jpeg" },
    { id: "song2", title: "I Wonder", artist: "Kanye West", cover: "Media/kanye-west-graduation.jpeg" },
    { id: "song3", title: "Everything I Am", artist: "Kanye West", cover: "Media/kanye-west-graduation.jpeg" },
    { id: "song4", title: "Flashing Lights", artist: "Kanye West", cover: "Media/kanye-west-graduation.jpeg" },
    { id: "song5", title: "Homecoming (Explicit Version)", artist: "Kanye West", cover: "Media/kanye-west-graduation.jpeg" },
    { id: "song6", title: "Cherry Waves", artist: "Deftones", cover: "Media/Saturday_night_wrist.jpg" }
];

// Initialize player
const player = new MusicPlayer(playlist);
