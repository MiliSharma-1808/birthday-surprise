const songs = [
    { title: "Tumse Jo Mila Nahi", src: "song1.mp3" },
    { title: "Agar Tum Saath Ho", src: "song2.mp3" },
    { title: "Tu Hain Toh", src: "song3.mp3" },
    { title: "Satranga", src: "song4.mp3" },
    { title: "Zara Zara", src: "song9.mp3" },
    { title: "Lag Ja Gale Se Phir", src: "song6.mp3" },
    { title: "Perfect", src: "song11.mp3" },
    { title: "Tum Prem Ho", src: "song5.mp3" },
    { title: "Ram Aayenge", src: "song8.mp3" },
    { title: "Janani Me Ram Doot Hanuman", src: "song10.mp3" },
    { title: "Ram Siya Ram", src: "song7.mp3" },
    { title: "Song 12", src: "song12.mp3" },
    { title: "Song 13", src: "song13.mp3" }
  ];

let currentSongIndex = null;
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const nowPlaying = document.getElementById("now-playing");
const playPauseBtn = document.getElementById("play-pause-btn");
const mainPlayBtn = document.getElementById("main-play-btn");
const songItems = document.querySelectorAll(".song-list ul li");
const seekBar = document.getElementById("seek-bar");

function playAudio(index) {
    currentSongIndex = index;
    audioSource.src = songs[index].src;
    nowPlaying.textContent = "Now Playing: " + songs[index].title;
    audioPlayer.load();
    audioPlayer.play();
    updateButtons(true);
    updateSongIcons();
}

function togglePlayPause() {
    if (currentSongIndex === null) {
        playAudio(0);
    } else if (audioPlayer.paused) {
        audioPlayer.play();
        updateButtons(true);
    } else {
        audioPlayer.pause();
        updateButtons(false);
    }
    updateSongIcons();
}

function updateButtons(isPlaying) {
    playPauseBtn.textContent = isPlaying ? "⏸" : "▶";
    mainPlayBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play";
}

function updateSongIcons() {
    songItems.forEach((item, idx) => {
        const icon = item.querySelector("span");
        icon.textContent = (idx === currentSongIndex && !audioPlayer.paused) ? "⏸" : "▶";
    });
}

function nextSong() {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
        playAudio(currentSongIndex + 1);
    }
}

function prevSong() {
    if (currentSongIndex !== null && currentSongIndex > 0) {
        playAudio(currentSongIndex - 1);
    }
}

audioPlayer.addEventListener("timeupdate", () => {
    if (!isNaN(audioPlayer.duration)) {
        seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});

seekBar.addEventListener("input", (event) => {
    if (!isNaN(audioPlayer.duration)) {
        const seekTime = (event.target.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    }
});

playPauseBtn.addEventListener("click", togglePlayPause);
mainPlayBtn.addEventListener("click", togglePlayPause);
audioPlayer.addEventListener("ended", nextSong);
