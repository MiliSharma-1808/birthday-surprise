window.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("background-music");

    const savedTime = localStorage.getItem("musicTime");
    const musicStopped = localStorage.getItem("musicStopped");

    if (musicStopped !== "true" && savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    // Start music muted (allowed), then attempt unmute
    music.muted = true;
    music.play().then(() => {
        console.log("Muted autoplay started");

        // Try to unmute after a short time
        setTimeout(() => {
            music.muted = false;
            music.volume = 0.5; // smooth audio fade-in
        }, 1000);

    }).catch((err) => {
        console.log("Autoplay failed. Waiting for click...");
        // Wait for user click, just once
        document.body.addEventListener("click", () => {
            music.muted = false;
            music.play();
        }, { once: true });
    });

    // Save current position for return visit
    setInterval(() => {
        if (!music.paused) {
            localStorage.setItem("musicTime", music.currentTime.toString());
        }
    }, 1000);
});

function openGift(url) {
    const music = document.getElementById('background-music');
    if (music && !music.paused) {
        music.pause();
        music.currentTime = 0;
        localStorage.setItem("musicStopped", "true");
        localStorage.removeItem("musicTime");
    }
    window.location.href = url;
}
