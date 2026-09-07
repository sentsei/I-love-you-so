const music =
    document.getElementById("music");

const startScreen =
    document.getElementById("startScreen");

const startButton =
    document.getElementById("startButton");

const playButton =
    document.getElementById("playButton");

const backButton =
    document.getElementById("backButton");

const forwardButton =
    document.getElementById("forwardButton");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const visualizer =
    document.getElementById("visualizer");

const hearts =
    document.getElementById("hearts");


let heartTimer = null;




for (let i = 0; i < 40; i++) {

    const bar =
        document.createElement("span");

    bar.classList.add("bar");

    bar.style.animationDelay =
        `${i * -0.05}s`;

    visualizer.appendChild(bar);
}




function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {

        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${secondsPart}`;
}




async function playMusic() {

    try {

        await music.play();

        playButton.textContent =
            "❚❚";

        visualizer.classList.add(
            "playing"
        );

        startHearts();

    }

    catch (error) {

        alert(
            "Please put iloveyouso.mp3 beside index.html."
        );

    }
}




function pauseMusic() {

    music.pause();

    playButton.textContent =
        "▶";

    visualizer.classList.remove(
        "playing"
    );

    stopHearts();
}




startButton.addEventListener(
    "click",
    async function () {

        startScreen.classList.add(
            "hide"
        );

        await playMusic();

    }
);




playButton.addEventListener(
    "click",
    function () {

        if (music.paused) {

            playMusic();

        }

        else {

            pauseMusic();

        }

    }
);




backButton.addEventListener(
    "click",
    function () {

        music.currentTime =
            Math.max(
                0,
                music.currentTime - 10
            );

    }
);




forwardButton.addEventListener(
    "click",
    function () {

        music.currentTime =
            Math.min(
                music.duration || 0,
                music.currentTime + 10
            );

    }
);




music.addEventListener(
    "loadedmetadata",
    function () {

        duration.textContent =
            formatTime(
                music.duration
            );

    }
);




music.addEventListener(
    "timeupdate",
    function () {

        currentTime.textContent =
            formatTime(
                music.currentTime
            );


        if (music.duration) {

            progress.value =
                (
                    music.currentTime /
                    music.duration
                ) * 100;

        }

    }
);




progress.addEventListener(
    "input",
    function () {

        if (music.duration) {

            music.currentTime =
                (
                    progress.value / 100
                ) *
                music.duration;

        }

    }
);




volume.addEventListener(
    "input",
    function () {

        music.volume =
            Number(volume.value);

    }
);




music.addEventListener(
    "ended",
    function () {

        playButton.textContent =
            "▶";

        visualizer.classList.remove(
            "playing"
        );

        stopHearts();

        progress.value = 0;

    }
);




function createHeart() {

    const heart =
        document.createElement("span");

    heart.classList.add(
        "floatingHeart"
    );


    const symbols = [
        "♡",
        "♥",
        "♡",
        "♡"
    ];


    heart.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    heart.style.left =
        Math.random() * 100 +
        "vw";


    heart.style.fontSize =
        12 +
        Math.random() * 25 +
        "px";


    heart.style.animationDuration =
        5 +
        Math.random() * 5 +
        "s";


    hearts.appendChild(heart);


    setTimeout(
        function () {

            heart.remove();

        },
        11000
    );
}




function startHearts() {

    if (heartTimer) return;

    createHeart();

    heartTimer =
        setInterval(
            createHeart,
            450
        );
}




function stopHearts() {

    clearInterval(
        heartTimer
    );

    heartTimer = null;
}




document.addEventListener(
    "keydown",
    function (event) {

        if (
            !startScreen.classList.contains(
                "hide"
            )
            &&
            (
                event.key === "Enter"
                ||
                event.code === "Space"
            )
        ) {

            event.preventDefault();

            startButton.click();

        }

    }
);




music.volume = 0.75;
