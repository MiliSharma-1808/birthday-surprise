document.addEventListener("DOMContentLoaded", function () {
    const songs = document.querySelectorAll(".song");
    const audioPlayer = document.getElementById("audioPlayer");
    const songTitle = document.getElementById("songTitle");

    songs.forEach(song => {
        song.addEventListener("click", function () {
            const songSrc = this.getAttribute("data-src");
            const title = this.querySelector(".song-title").textContent;

            songTitle.textContent = title;
            audioPlayer.src = songSrc;
            audioPlayer.play();
        });
    });

    // Play/Pause Button
    document.getElementById("playPause").addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            this.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            this.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Seek Bar
    const progressBar = document.getElementById("progressBar");
    audioPlayer.addEventListener("timeupdate", function () {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    });

    progressBar.addEventListener("input", function () {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    });
});
