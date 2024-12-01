console.log("Starting JavaScript");

async function getsongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }
  return songs;
}

async function main() {
  let s = await getsongs();
  console.log(s);

  // Ensure .songlist and <ul> exist
  let songlist = document.querySelector(".songlist");
  if (!songlist) {
    console.error("No .songlist element found in the DOM.");
    return;
  }
  let songul = songlist.getElementsByTagName("ul")[0];
  if (!songul) {
    console.error("No <ul> found inside .songlist.");
    return;
  }

  // Populate song list with only song names
  for (const song of s) {
    // Extract song name by removing the URL and file extension
    let songName = song
      .substring(song.lastIndexOf("/") + 1) // Get the part after the last slash
      .replace(".mp3", "")                 // Remove the file extension
      .replaceAll("%20", " ");             // Replace encoded spaces with actual spaces
    songul.innerHTML += `<li>${songName}</li>`;
  }

  // Ensure there are songs to play
  if (!s || s.length === 0) {
    console.error("No songs found.");
    return; 
  }

  // Play the first song
  let p = new Audio(s[0]);
  // p.play();
  p.addEventListener("loadeddata", () => {
    console.log(p.duration, p.currentSrc, p.currentTime);
  });
}

main(); 
