function openGift(page) {
    window.location.href = page;
}

// Party popper animation
$(document).ready(function() {
    $(".party-popper img").hide().fadeIn(1000).delay(2000).fadeOut(1000);

    // Start floating balloons on the sides
    $(".balloon-left").css({
        left: "5%",
        animationDuration: (Math.random() * 3 + 4) + "s"
    });

    $(".balloon-right").css({
        right: "5%",
        animationDuration: (Math.random() * 3 + 4) + "s"
    });
});


function playPoemAudio() {
    let audio = document.getElementById("poemAudio");
    audio.play();
}
