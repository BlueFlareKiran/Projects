let progress = document.getElementById("progress");
let song = document.getElementById("song");
let crnticon = document.getElementById("crtlicon");

// Update progress slider on metadata load
song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

// Update progress slider dynamically as song plays
song.ontimeupdate = function () {
    progress.value = song.currentTime;
};

// Play/pause functionality
function playPause() {
    if (crnticon.classList.contains("fa-pause")) {
        song.pause();
        crnticon.classList.remove("fa-pause");
        crnticon.classList.add("fa-play");
    } else {
        song.play();
        crnticon.classList.remove("fa-play");
        crnticon.classList.add("fa-pause");
    }
}

// Update song time when progress slider is changed
progress.oninput = function () {
    song.currentTime = progress.value;
};
if(song.play()){
    setInterval(()=>{
        progress.value=song.currentTime;
    },500);
}
